import { BadRequestException, Logger } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'argon2'
import 'dotenv/config'

import { Prisma, PrismaClient } from '../../../prisma/generated/client'

import { categoriesData, streamTitles, usernames } from './data.seed'

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

		await prisma.$transaction(async tx => {
			for (const username of usernames) {
				const randomCategory =
					categoriesBySlug[
						Object.keys(categoriesBySlug)[
							Math.floor(
								Math.random() *
									Object.keys(categoriesBySlug).length
							)
						]
					]
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
							avatar: `/channels/${username}.webp`,
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
							}
						}
					})
					const randomTitles = streamTitles[randomCategory.slug]
					const randomTitle =
						randomTitles[
							Math.floor(Math.random() * randomTitles.length)
						]
					await tx.stream.create({
						data: {
							title: randomTitle,
							thumbnailUrl: `/streams/${createdUser.username}.webp`,
							user: {
								connect: {
									id: createdUser.id
								}
							},
							category: {
								connect: {
									id: randomCategory.id
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
