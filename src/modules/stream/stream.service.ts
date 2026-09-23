import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { FileUpload } from 'graphql-upload/processRequest.js'
import { AccessToken } from 'livekit-server-sdk'
import sharp from 'sharp'

import type { Prisma, User } from '@/prisma/generated/browser'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { StorageService } from '../libs/storage/storage.service'

import { ChangeStreamInfoInput } from './inputs/change-stream-info.input'
import { FiltersInput } from './inputs/filters.input'
import { GenerateStreamTokenInput } from './inputs/generate-stream-token.input'

@Injectable()
export class StreamService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly storageService: StorageService
	) {}

	public async findAll(input: FiltersInput = {}) {
		const { searchTerm, skip, take } = input
		const whereClause = searchTerm
			? this.findBySearchTermFilter(searchTerm)
			: undefined
		const streams = await this.prismaService.stream.findMany({
			take: take ?? 12,
			skip: skip ?? 0,
			where: {
				user: {
					isDeactivated: false
				},
				...whereClause
			},
			include: {
				user: true,
				category: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		return streams
	}

	public async findRandom() {
		const total = await this.prismaService.stream.count({
			where: {
				user: { isDeactivated: false }
			}
		})

		const randomIndexes = new Set<number>()
		const RANDOM_STREAMS_COUNT = 4

		while (randomIndexes.size < RANDOM_STREAMS_COUNT) {
			const randomIndex = Math.floor(Math.random() * total)
			randomIndexes.add(randomIndex)
		}

		const streams = await this.prismaService.stream.findMany({
			where: {
				user: {
					isDeactivated: false
				}
			},
			include: {
				user: true,
				category: true
			},
			skip: 0,
			take: total
		})

		return Array.from(randomIndexes).map(idx => streams[idx])
	}

	public async changeInfo(user: User, input: ChangeStreamInfoInput) {
		const { title, categoryId } = input

		await this.prismaService.stream.update({
			where: { userId: user.id },
			data: {
				title,
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})

		return true
	}

	public async changeThumbnail(user: User, file: FileUpload) {
		const stream = await this.findByUserId(user)
		if (stream?.thumbnailUrl) {
			await this.storageService.remove(stream.thumbnailUrl)
		}
		const chunks: Buffer[] = []

		for await (const chunk of file.createReadStream()) {
			chunks.push(chunk)
		}

		const buffer = Buffer.concat(chunks)
		const fileName = `/streams/${user.username}.webp`

		if (file.filename && file.filename.endsWith('.gif')) {
			const proccessedBuffer = await sharp(buffer, { animated: true })
				.resize(1920, 1080)
				.webp()
				.toBuffer()

			await this.storageService.upload(
				proccessedBuffer,
				fileName,
				'image/webp'
			)
		} else {
			const proccessedBuffer = await sharp(buffer)
				.resize(1920, 1080)
				.webp()
				.toBuffer()

			await this.storageService.upload(
				proccessedBuffer,
				fileName,
				'image/webp'
			)
		}

		await this.prismaService.stream.update({
			where: { userId: user.id },
			data: { thumbnailUrl: fileName }
		})

		return true
	}

	public async removeThumbnail(user: User) {
		const stream = await this.findByUserId(user)
		if (!stream?.thumbnailUrl) return

		await this.storageService.remove(stream.thumbnailUrl)

		await this.prismaService.stream.update({
			where: { userId: user.id },
			data: { thumbnailUrl: null }
		})

		return true
	}

	public async generateToken(input: GenerateStreamTokenInput) {
		const { channelId, userId } = input

		let self: { id: string; username: string }

		const user = await this.prismaService.user.findUnique({
			where: { id: userId }
		})

		if (user) {
			self = {
				id: user.id,
				username: user.username
			}
		} else {
			self = {
				id: userId,
				username: `Viewer ${Math.floor(Math.random() * 100000)}`
			}
		}

		const channel = await this.prismaService.user.findUnique({
			where: { id: channelId }
		})

		if (!channel) {
			throw new NotFoundException('Channel not found')
		}

		const isHost = self.id === channel.id

		const token = new AccessToken(
			this.configService.getOrThrow<string>('LIVEKIT_API_KEY'),
			this.configService.getOrThrow<string>('LIVEKIT_API_SECRET'),
			{
				identity: isHost ? `Host-${self.id}` : self.id.toString(),
				name: self.username
			}
		)

		token.addGrant({
			room: channel.id,
			roomJoin: true,
			canPublish: false
		})

		return { token: token.toJwt() }
	}

	private async findByUserId(user: User) {
		const stream = await this.prismaService.stream.findUnique({
			where: { userId: user.id }
		})
		return stream
	}

	private findBySearchTermFilter(
		searchTerm: string
	): Prisma.StreamWhereInput {
		return {
			OR: [
				{
					title: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					user: {
						username: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				}
			]
		}
	}
}
