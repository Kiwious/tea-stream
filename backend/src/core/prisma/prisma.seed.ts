import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
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

// Golden-angle hue spacing gives every user a distinct pastel color
function getPastelColor(index: number) {
	const hue = Math.round((index * 137.508) % 360)
	return `hsl(${hue}, 70%, 80%)`
}

async function uploadStreamThumbnail(username: string, index: number) {
	const key = `streams/${username}.webp`
	const buffer = await sharp({
		create: {
			width: 1280,
			height: 720,
			channels: 3,
			background: getPastelColor(index)
		}
	})
		.webp()
		.toBuffer()

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
			usernames.map(async (username, index) => {
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
				const thumbnailUrl = await uploadStreamThumbnail(
					username,
					index
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
