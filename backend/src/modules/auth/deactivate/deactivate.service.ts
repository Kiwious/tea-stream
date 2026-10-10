import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'
import type { SessionData } from 'express-session'

import type { User } from '@/prisma/generated/browser'
import { TokenType } from '@/prisma/generated/enums'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { RedisService } from '@/src/core/redis/redis.service'
import { checkTokenExpired } from '@/src/shared/utils/check-token-expired.util'
import { generateToken } from '@/src/shared/utils/generate-token.util'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import { destroySession } from '@/src/shared/utils/session.util'

import { MailService } from '../../libs/mail/mail.service'
import { TelegramService } from '../../libs/telegram/telegram.service'

import { DeactivateAccountInput } from './inputs/deactivate-account.input'

@Injectable()
export class DeactivateService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly mailService: MailService,
		private readonly telegramService: TelegramService,
		private readonly redisService: RedisService
	) {}

	public async deactivate(
		req: Request,
		input: DeactivateAccountInput,
		user: User,
		userAgent: string
	) {
		const { pin, email, password } = input
		if (user.email !== email) {
			throw new BadRequestException('E-Mail invalid')
		}

		const isValidPassword = await verify(user.password, password)

		if (!isValidPassword) {
			throw new BadRequestException('Invalid password')
		}

		if (!pin) {
			await this.sendDeactivateToken(req, user, userAgent)
			return { message: 'Confirmation code is required' }
		}

		await this.validateDeactivateToken(req, pin)
		return { user }
	}

	private async validateDeactivateToken(req: Request, token: string) {
		const existingToken = await this.prismaService.token.findUnique({
			where: { token, type: TokenType.DEACTIVATE_ACCOUNT }
		})
		if (!existingToken) {
			throw new NotFoundException('Token not found')
		}

		checkTokenExpired(existingToken)

		if (!existingToken.userId) {
			throw new NotFoundException('User not found')
		}

		const user = await this.prismaService.user.update({
			where: { id: existingToken.userId },
			data: {
				isDeactivated: true,
				deactivatedAt: new Date()
			}
		})

		await this.prismaService.token.delete({
			where: { id: existingToken.id, type: TokenType.DEACTIVATE_ACCOUNT }
		})

		await this.clearSessions(user.id)

		return destroySession(req, this.configService)
	}

	private async sendDeactivateToken(
		req: Request,
		user: User,
		userAgent: string
	) {
		const deactivateToken = await generateToken(
			this.prismaService,
			user,
			TokenType.DEACTIVATE_ACCOUNT,
			false
		)

		const metadata = getSessionMetadata(req, userAgent)

		await this.mailService.sendDeactivateToken(
			user.email,
			deactivateToken.token,
			metadata
		)

		if (
			deactivateToken.user?.notificationSettings?.telegramNotifications &&
			deactivateToken.user.telegramId
		) {
			await this.telegramService.sendDeactivateToken(
				deactivateToken.user.telegramId,
				deactivateToken.token,
				metadata
			)
		}

		return true
	}

	private async clearSessions(userId: string) {
		if (!userId) throw new NotFoundException('User not found')

		const keys = await this.redisService.client.keys('*')

		for (const key of keys) {
			const sessionData = await this.redisService.client.get(key)
			if (!sessionData) return

			const session = JSON.parse(sessionData) as SessionData

			if (session.userId === userId) {
				await this.redisService.client.del(key)
			}
		}
	}
}
