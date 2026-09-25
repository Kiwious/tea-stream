import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Logger } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

import { PrismaClient } from '../prisma/generated/client'
import { categoriesData, usernames } from '../src/core/prisma/data.seed'

/**
 * Downloads placeholder artwork for the seeded categories, streams and
 * channels, then uploads it to S3 under the exact keys the seed writes
 * into the database.
 *
 *   npm run assets:fetch
 *   npm run assets:fetch -- --only=avatars --force
 *   npm run assets:fetch -- --dry-run
 *
 * Category art and stream thumbnails come from the public Steam CDN, so
 * they only exist for games that ship on Steam. Everything else is read
 * from `scripts/assets/` (see NON_STEAM below).
 */

const CACHE_DIR = join(__dirname, '.cache')
const LOCAL_ASSETS_DIR = join(__dirname, 'assets')

const CATEGORY_SIZE = { width: 600, height: 900 }
const STREAM_SIZE = { width: 1920, height: 1080 }
const AVATAR_SIZE = { width: 512, height: 512 }

/**
 * Steam app ids we already know. Anything missing here is looked up by
 * title through the public Steam search endpoint.
 */
const APP_ID_OVERRIDES: Record<string, number> = {
	'hearts-of-iron-iv': 394360,
	'dota-2': 570,
	'counter-strike-2': 730,
	rust: 252490,
	'war-thunder': 236390,
	'payday-3': 1272080,
	'geometry-dash': 322170,
	'arma-3': 107410,
	subnautica: 264710,
	satisfactory: 526870
}

/**
 * Categories with no Steam page. Drop your own artwork into
 * `scripts/assets/categories/<slug>.<ext>` for the category tile and
 * `scripts/assets/streams/<slug>/*.<ext>` for the stream thumbnail pool.
 */
const NON_STEAM = new Set([
	'just-chatting',
	'programming',
	'minecraft',
	'brawl-stars',
	'league-of-legends'
])

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

const logger = new Logger('FetchAssets')

const args = process.argv.slice(2)
const force = args.includes('--force')
const dryRun = args.includes('--dry-run')
const only = new Set(
	args
		.find(arg => arg.startsWith('--only='))
		?.slice('--only='.length)
		.split(',')
		.map(part => part.trim())
		.filter(Boolean) ?? ['categories', 'streams', 'avatars']
)

const s3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!
	}
})

const bucket = process.env.S3_BUCKET_NAME!

function pickRandom<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)]
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/** Fetches a URL once and keeps the bytes in `scripts/.cache`. */
async function download(url: string): Promise<Buffer> {
	const key = createHash('sha1').update(url).digest('hex')
	const cachePath = join(CACHE_DIR, key)

	if (!force) {
		try {
			return await readFile(cachePath)
		} catch {
			// not cached yet
		}
	}

	const response = await fetch(url)
	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText} for ${url}`)
	}

	const buffer = Buffer.from(await response.arrayBuffer())
	await writeFile(cachePath, buffer)

	return buffer
}

async function downloadJson<T>(url: string): Promise<T> {
	return JSON.parse((await download(url)).toString('utf8')) as T
}

/** Uploads with the same key shape the app itself uses (leading slash). */
async function upload(key: string, buffer: Buffer) {
	if (dryRun) {
		logger.log(`[dry-run] would upload ${key} (${buffer.length} bytes)`)
		return
	}

	await s3.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: buffer,
			ContentType: 'image/webp'
		})
	)

	logger.log(`Uploaded ${key}`)
}

async function toWebp(buffer: Buffer, size: { width: number; height: number }) {
	return sharp(buffer)
		.resize(size.width, size.height, { fit: 'cover', position: 'centre' })
		.webp({ quality: 85 })
		.toBuffer()
}

/** Reads `scripts/assets/<...segments>` and returns every image in it. */
async function readLocalPool(...segments: string[]): Promise<string[]> {
	try {
		const dir = join(LOCAL_ASSETS_DIR, ...segments)
		const entries = await readdir(dir)

		return entries
			.filter(entry =>
				IMAGE_EXTENSIONS.some(extension =>
					entry.toLowerCase().endsWith(extension)
				)
			)
			.map(entry => join(dir, entry))
	} catch {
		return []
	}
}

async function findLocalFile(
	directory: string,
	basename: string
): Promise<string | null> {
	const pool = await readLocalPool(directory)

	return (
		pool.find(path => {
			const name = path.split(/[\\/]/).pop()!.toLowerCase()
			return IMAGE_EXTENSIONS.some(
				extension => name === `${basename}${extension}`
			)
		}) ?? null
	)
}

interface SteamSearchResult {
	appid: string
	name: string
}

interface SteamAppDetails {
	[appId: string]: {
		success: boolean
		data?: {
			name: string
			screenshots?: { id: number; path_full: string }[]
		}
	}
}

async function resolveAppId(slug: string, title: string) {
	const override = APP_ID_OVERRIDES[slug]
	if (override) return override

	const results = await downloadJson<SteamSearchResult[]>(
		`https://steamcommunity.com/actions/SearchApps/${encodeURIComponent(title)}`
	)

	if (!results.length) return null

	logger.log(
		`Resolved "${title}" to ${results[0].name} (${results[0].appid})`
	)

	return Number(results[0].appid)
}

/**
 * Category art + the screenshot pool used for that category's streams.
 * Both come from the same Steam app, so they are fetched together.
 */
async function collectSteamArtwork(slug: string, title: string) {
	const appId = await resolveAppId(slug, title)
	if (!appId) {
		logger.warn(`No Steam app found for "${title}", skipping`)
		return null
	}

	const details = await downloadJson<SteamAppDetails>(
		`https://store.steampowered.com/api/appdetails?appids=${appId}`
	)
	// Steam keys the response by an arbitrary id (often a DLC) rather than
	// the app we asked for, so read the single entry it returns.
	const entry = Object.values(details)[0]

	if (!entry?.success || !entry.data) {
		logger.warn(`Steam returned no data for ${title} (app ${appId})`)
		return null
	}

	// Sanity check so a bad override or fuzzy search match is visible.
	logger.log(`${title} -> app ${appId} "${entry.data.name}"`)

	return {
		appId,
		coverUrl: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`,
		screenshots: (entry.data.screenshots ?? []).map(shot => shot.path_full)
	}
}

type Artwork = {
	cover: Buffer | null
	screenshots: string[]
	localScreenshots: string[]
}

async function buildArtworkIndex() {
	const index = new Map<string, Artwork>()

	for (const category of categoriesData) {
		const { slug, title } = category

		if (NON_STEAM.has(slug)) {
			const localCover = await findLocalFile('categories', slug)
			const localScreenshots = await readLocalPool('streams', slug)

			if (!localCover) {
				logger.warn(
					`${slug}: not on Steam and no scripts/assets/categories/${slug}.* found`
				)
			}
			if (!localScreenshots.length) {
				logger.warn(
					`${slug}: no stream thumbnails in scripts/assets/streams/${slug}/`
				)
			}

			index.set(slug, {
				cover: localCover ? await readFile(localCover) : null,
				screenshots: [],
				localScreenshots
			})

			continue
		}

		const artwork = await collectSteamArtwork(slug, title)

		index.set(slug, {
			cover: artwork ? await download(artwork.coverUrl) : null,
			screenshots: artwork?.screenshots ?? [],
			localScreenshots: []
		})

		// The appdetails endpoint is rate limited, so stay polite.
		await sleep(250)
	}

	return index
}

async function uploadCategories(index: Map<string, Artwork>) {
	for (const { slug } of categoriesData) {
		const cover = index.get(slug)?.cover
		if (!cover) continue

		await upload(
			`/categories/${slug}.webp`,
			await toWebp(cover, CATEGORY_SIZE)
		)
	}
}

/**
 * Reads the seeded streams so each thumbnail matches the category the
 * stream was actually assigned. Falls back to the raw username list with
 * a random category when the database is unreachable.
 */
async function resolveStreamTargets() {
	const prisma = new PrismaClient({
		adapter: new PrismaPg({ connectionString: process.env.POSTGRES_URI })
	})

	try {
		const streams = await prisma.stream.findMany({
			select: {
				user: { select: { username: true } },
				category: { select: { slug: true } }
			}
		})

		const targets = streams
			.filter(stream => stream.user && stream.category)
			.map(stream => ({
				username: stream.user!.username,
				slug: stream.category!.slug
			}))

		if (targets.length) return targets

		logger.warn('No seeded streams found, falling back to random pairing')
	} catch (error) {
		logger.warn(
			`Could not read streams from the database (${(error as Error).message}), falling back to random pairing`
		)
	} finally {
		await prisma.$disconnect()
	}

	return usernames.map(username => ({
		username,
		slug: pickRandom(categoriesData).slug
	}))
}

async function uploadStreamThumbnails(index: Map<string, Artwork>) {
	const targets = await resolveStreamTargets()

	for (const { username, slug } of targets) {
		const artwork = index.get(slug)

		if (artwork?.screenshots.length) {
			const buffer = await download(pickRandom(artwork.screenshots))
			await upload(
				`/streams/${username}.webp`,
				await toWebp(buffer, STREAM_SIZE)
			)
			continue
		}

		if (artwork?.localScreenshots.length) {
			const buffer = await readFile(pickRandom(artwork.localScreenshots))
			await upload(
				`/streams/${username}.webp`,
				await toWebp(buffer, STREAM_SIZE)
			)
			continue
		}

		logger.warn(`No thumbnail source for ${username} (${slug}), skipping`)
	}
}

async function uploadAvatars() {
	for (const username of usernames) {
		const buffer = await download(
			`https://api.dicebear.com/9.x/thumbs/png?seed=${encodeURIComponent(username)}&size=512`
		)

		await upload(
			`/channels/${username}.webp`,
			await toWebp(buffer, AVATAR_SIZE)
		)
	}
}

async function main() {
	await mkdir(CACHE_DIR, { recursive: true })

	if (dryRun) logger.log('Running in dry-run mode, nothing will be uploaded')

	const needsArtwork = only.has('categories') || only.has('streams')
	const index = needsArtwork ? await buildArtworkIndex() : new Map()

	if (only.has('categories')) await uploadCategories(index)
	if (only.has('streams')) await uploadStreamThumbnails(index)
	if (only.has('avatars')) await uploadAvatars()

	logger.log('Assets finished')
}

main().catch(error => {
	logger.error(error)
	process.exit(1)
})
