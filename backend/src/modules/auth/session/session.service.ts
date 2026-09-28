import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { verify } from 'argon2'
import type { Request } from 'express'
import type { SessionData } from 'express-session'
import { TOTP } from 'otpauth'

import { PrismaService } from '@/src/core/prisma/prisma.service'
import { RedisService } from '@/src/core/redis/redis.service'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import { destroySession, saveSession } from '@/src/shared/utils/session.util'

import { VerificationService } from '../verification/verification.service'

import { LoginInput } from './inputs/login.input'

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService,
		private readonly verificationService: VerificationService
	) {}

	public async findByUser(req: Request) {
		const userId = req.session.userId
		if (!userId) throw new NotFoundException('User not found')

		const keys = await this.redisService.client.keys('*')
		const userSessions: (SessionData & { id?: string })[] = []

		for (const key of keys) {
			const sessionData = await this.redisService.client.get(key)
			if (!sessionData) return

			const session = JSON.parse(sessionData) as SessionData

			if (session.userId === userId) {
				userSessions.push({
					...session,
					id: key.split(':').at(1)
				})
			}
		}
		userSessions.sort(
			(a, b) =>
				new Date(b.createdAt ?? 0).getTime() -
				new Date(a.createdAt ?? 0).getTime()
		)

		return userSessions
		// return userSessions.filter(session => session.id !== req.session.id)
	}

	public async findCurrent(req: Request) {
		const sessionId = req.session.id
		const sessionData = await this.redisService.client.get(
			`${this.configService.getOrThrow<string>('SESSION_FOLDER')}${sessionId}`
		)
		if (!sessionData) return
		const session = JSON.parse(sessionData) as SessionData
		return {
			...session,
			id: sessionId
		}
	}

	public async login(req: Request, input: LoginInput, userAgent: string) {
		const { login, password, pin } = input
		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [
					{ username: { equals: login } },
					{ email: { equals: login } }
				]
			}
		})
		if (!user) throw new NotFoundException('User not found')

		const isValidPassword = await verify(user.password, password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Invalid Password')
		}

		if (!user.isEmailVerified) {
			await this.verificationService.sendVerificationToken(user)
			throw new BadRequestException(
				'Account not verified. Please check E-Mail for verification'
			)
		}
		if (user.isTotpEnabled) {
			if (!pin) {
				return { message: 'Pin code is required for authorization' }
			}
			const totp = new TOTP({
				issuer: 'TeaStream',
				label: `${user.email}`,
				algorithm: 'SHA1',
				digits: 6,
				secret: user.totpSecret!
			})

			const delta = totp.validate({ token: pin })

			if (delta === null) {
				throw new BadRequestException('Invalid code')
			}
		}

		const sessionMetadata = getSessionMetadata(req, userAgent)

		await saveSession(req, user, sessionMetadata)

		return { user }
	}
	public async logout(req: Request) {
		return await destroySession(req, this.configService)
	}

	public clearSession(req: Request) {
		req.res?.clearCookie(
			this.configService.getOrThrow<string>('SESSION_NAME')
		)

		return true
	}

	public async remove(req: Request, id: string) {
		if (req.session.id === id) {
			throw new ConflictException('Cant remove current session')
		}
		await this.redisService.client.del(
			`${this.configService.getOrThrow<string>('SESSION_FOLDER')}${id}`
		)
		return true
	}
}
