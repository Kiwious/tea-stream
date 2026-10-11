import {
	HeadObjectCommand,
	PutObjectCommand,
	S3Client
} from '@aws-sdk/client-s3'
import { BadRequestException, Logger } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'argon2'
import dotenv from 'dotenv'
import sharp from 'sharp'

import { Prisma, PrismaClient } from '../../../prisma/generated/client'
import { ENV_FILE_PATH } from '../../shared/utils/env-path.util'

import { categoriesData, streamTitles, usernames } from './data.seed'

dotenv.config({ path: ENV_FILE_PATH })

const adapter = new PrismaPg({
	connectionString: process.env.POSTGRES_URI
})

const prisma = new PrismaClient({
	adapter,
	transactionOptions: {
		maxWait: 5000,
		timeout: 10000,
		isolationLevel: Prisma.TransactionIsolationLevel.Serializable
	}
})

const s3 = new S3Client({
	endpoint: process.env.S3_ENDPOINT,
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
	}
})

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function hueFromString(value: string) {
	let hash = 0
	for (const char of value) {
		hash = (hash * 31 + char.charCodeAt(0)) % 360
	}
	return hash
}

async function existsInStorage(key: string) {
	try {
		await s3.send(
			new HeadObjectCommand({
				Bucket: process.env.S3_BUCKET_NAME,
				Key: key
			})
		)
		return true
	} catch {
		return false
	}
}

async function generateStreamThumbnail(
	username: string,
	categoryTitle: string,
	streamTitle: string
) {
	const hue = hueFromString(username)
	const svg = `
		<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stop-color="hsl(${hue}, 70%, 45%)" />
					<stop offset="100%" stop-color="hsl(${(hue + 60) % 360}, 70%, 20%)" />
				</linearGradient>
			</defs>
			<rect width="1280" height="720" fill="url(#bg)" />
			<text x="64" y="120" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" fill-opacity="0.75">${escapeXml(categoryTitle.toUpperCase())}</text>
			<text x="64" y="600" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#ffffff">${escapeXml(streamTitle)}</text>
			<text x="64" y="660" font-family="Arial, sans-serif" font-size="36" fill="#ffffff" fill-opacity="0.85">@${escapeXml(username)}</text>
		</svg>`

	return sharp(Buffer.from(svg)).webp().toBuffer()
}

async function ensureStreamThumbnail(
	username: string,
	categoryTitle: string,
	streamTitle: string
) {
	const key = `streams/${username}.webp`
	if (await existsInStorage(key)) return key

	const buffer = await generateStreamThumbnail(
		username,
		categoryTitle,
		streamTitle
	)
	await s3.send(
		new PutObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
			Body: buffer,
			ContentType: 'image/webp'
		})
	)
	Logger.log(`Generated stream thumbnail for ${username}`)
	return key
}

async function main() {
	try {
		Logger.log('Beginning to fill database')

		await prisma.$transaction([
			prisma.user.deleteMany(),
			prisma.socialLink.deleteMany(),
			prisma.stream.deleteMany(),
			prisma.category.deleteMany()
		])

		await prisma.category.createMany({
			data: categoriesData
		})
		Logger.log('Categories successfully created')
		const categories = await prisma.category.findMany()
		const categoriesBySlug = Object.fromEntries(
			categories.map(category => [category.slug, category])
		)

		// Uploads happen outside the transaction so they don't hit its timeout
		const streamsData = await Promise.all(
			usernames.map(async username => {
				const category =
					categoriesBySlug[
						Object.keys(categoriesBySlug)[
							Math.floor(
								Math.random() *
									Object.keys(categoriesBySlug).length
							)
						]
					]
				const titles = streamTitles[category.slug]
				const title = titles[Math.floor(Math.random() * titles.length)]
				const thumbnailUrl = await ensureStreamThumbnail(
					username,
					category.title,
					title
				)

				return { username, category, title, thumbnailUrl }
			})
		)
		Logger.log('Stream thumbnails successfully prepared')

		await prisma.$transaction(async tx => {
			for (const {
				username,
				category,
				title,
				thumbnailUrl
			} of streamsData) {
				const userExists = await tx.user.findUnique({
					where: { username }
				})
				if (!userExists) {
					const createdUser = await tx.user.create({
						data: {
							email: `${username}@teastream.com`,
							password: await hash('12345678'),
							username,
							displayName: username,
							avatar: `channels/${username}.webp`,
							isEmailVerified: true,
							socialLinks: {
								createMany: {
									data: [
										{
											title: 'Telegram',
											url: `https://t.me/${username}`,
											position: 1
										},
										{
											title: 'YouTube',
											url: `https://youtube.com/@${username}`,
											position: 2
										}
									]
								}
							},
							notificationSettings: {
								create: {}
							}
						}
					})
					await tx.stream.create({
						data: {
							title,
							thumbnailUrl,
							user: {
								connect: {
									id: createdUser.id
								}
							},
							category: {
								connect: {
									id: category.id
								}
							}
						}
					})
					Logger.log(
						`User ${createdUser.username} and his streams were created successfully`
					)
				}
			}
		})
		Logger.log('DB filling has been completed successfully')
	} catch (error) {
		Logger.log(error)
		throw new BadRequestException('Error while performing database action')
	} finally {
		Logger.log('Disconnecting database connection')
		await prisma.$disconnect()
		Logger.log('Database successfully disconnected')
	}
}

main()
