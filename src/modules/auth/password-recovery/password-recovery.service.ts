import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'argon2'
import type { Request } from 'express'

import { TokenType } from '@/prisma/generated/enums'
import { PrismaService } from '@/src/core/prisma/prisma.service'
import { checkTokenExpired } from '@/src/shared/utils/check-token-expired.util'
import { generateToken } from '@/src/shared/utils/generate-token.util'
import { getSessionMetadata } from '@/src/shared/utils/session-metadata.util'
import { saveSession } from '@/src/shared/utils/session.util'

import { MailService } from '../../libs/mail/mail.service'

import { NewPasswordInput } from './inputs/new-password.input'
import { ResetPasswordInput } from './inputs/reset-password.input'

@Injectable()
export class PasswordRecoveryService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService
	) {}

	public async resetPassword(
		req: Request,
		input: ResetPasswordInput,
		userAgent: string
	) {
		const { email } = input

		const user = await this.prismaService.user.findUnique({
			where: { email }
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		const resetToken = await generateToken(
			this.prismaService,
			user,
			TokenType.PASSWORD_RESET
		)

		const metadata = getSessionMetadata(req, userAgent)
		await this.mailService.sendPasswordResetToken(
			email,
			resetToken.token,
			metadata
		)

		return true
	}

	public async newPassword(input: NewPasswordInput) {
		const { password, token } = input
		const existingToken = await this.prismaService.token.findUnique({
			where: { token, type: TokenType.PASSWORD_RESET }
		})
		if (!existingToken) {
			throw new NotFoundException('Token not found')
		}

		checkTokenExpired(existingToken)

		if (!existingToken.userId) {
			throw new NotFoundException('User not found')
		}

		await this.prismaService.user.update({
			where: { id: existingToken.userId },
			data: {
				password: await hash(password)
			}
		})

		await this.prismaService.token.delete({
			where: { id: existingToken.id, type: TokenType.PASSWORD_RESET }
		})
		return true
	}
}
