import { ConflictException, Injectable } from '@nestjs/common'
import type { FileUpload } from 'graphql-upload/processRequest.js'
import sharp from 'sharp'

import type { User } from '@/prisma/generated/browser'
import { PrismaService } from '@/src/core/prisma/prisma.service'

import { StorageService } from '../../libs/storage/storage.service'

import { ChangeProfileInfoInput } from './inputs/change-profile-info.input'

@Injectable()
export class ProfileService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly storageService: StorageService
	) {}

	public async changeAvatar(user: User, file: FileUpload) {
		if (user.avatar) {
			await this.storageService.remove(user.avatar)
		}
		const chunks: Buffer[] = []

		for await (const chunk of file.createReadStream()) {
			chunks.push(chunk)
		}

		const buffer = Buffer.concat(chunks)
		const fileName = `/channels/${user.username}.webp`

		if (file.filename && file.filename.endsWith('.gif')) {
			const proccessedBuffer = await sharp(buffer, { animated: true })
				.resize(512, 512)
				.webp()
				.toBuffer()

			await this.storageService.upload(
				proccessedBuffer,
				fileName,
				'image/webp'
			)
		} else {
			const proccessedBuffer = await sharp(buffer)
				.resize(512, 512)
				.webp()
				.toBuffer()

			await this.storageService.upload(
				proccessedBuffer,
				fileName,
				'image/webp'
			)
		}

		await this.prismaService.user.update({
			where: { id: user.id },
			data: { avatar: fileName }
		})

		return true
	}

	public async removeAvatar(user: User) {
		if (!user.avatar) return
		await this.storageService.remove(user.avatar)

		await this.prismaService.user.update({
			where: { id: user.id },
			data: { avatar: null }
		})

		return true
	}

	public async changeInfo(user: User, input: ChangeProfileInfoInput) {
		const { bio, displayName, username } = input

		const usernameExists = await this.prismaService.user.findUnique({
			where: { username }
		})

		if (usernameExists && username !== user.username) {
			throw new ConflictException('Username already in use')
		}

		await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				bio,
				displayName,
				username
			}
		})

		return true
	}
}
