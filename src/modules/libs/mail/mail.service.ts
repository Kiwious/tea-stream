import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

import { ResetPasswordTemplate } from './templates/reset-password.template'
import { VerifyTemplate } from './templates/verification.template'

@Injectable()
export class MailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	public async sendVerificationToken(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(VerifyTemplate({ domain, token }))
		await this.sendMail(email, 'E-Mail Verification', html)
	}

	public async sendPasswordResetToken(
		email: string,
		token: string,
		metadata: SessionMetadata
	) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(
			ResetPasswordTemplate({ domain, token, metadata })
		)
		await this.sendMail(email, 'Password reset', html)
	}

	private async sendMail(
		email: string,
		subject: string,
		html: string
	): Promise<void> {
		await this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}
