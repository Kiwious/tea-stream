import { Injectable, NotFoundException } from '@nestjs/common'
import type { Request } from 'express'

import { User } from '@/prisma/generated/browser'
import { TokenType } from '@/prisma/generated/enums'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { checkTokenExpired } from '@/src/shared/utils/check-token-expired.util'
import { generateToken } from '@/src/shared/utils/generate-token.util'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import { saveSession } from '@/src/shared/utils/session.util'

import { MailService } from '../../libs/mail/mail.service'

import { VerificationInput } from './inputs/verification.input'

@Injectable()
export class VerificationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService
	) {}

	public async verify(
		req: Request,
		input: VerificationInput,
		userAgent: string
	) {
		const { token } = input
		const existingToken = await this.prismaService.token.findUnique({
			where: { token, type: TokenType.EMAIL_VERIFY }
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
				isEmailVerified: true
			}
		})

		await this.prismaService.token.delete({
			where: { id: existingToken.id, type: TokenType.EMAIL_VERIFY }
		})

		const sessionMetadata = getSessionMetadata(req, userAgent)

		return saveSession(req, user, sessionMetadata)
	}

	public async sendVerificationToken(user: User) {
		const token = await generateToken(
			this.prismaService,
			user,
			TokenType.EMAIL_VERIFY
		)

		await this.mailService.sendVerificationToken(user.email, token.token)

		return true
	}
}
