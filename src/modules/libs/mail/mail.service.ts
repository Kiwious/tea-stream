import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

import { AccountDeletionTemplate } from './templates/account.deletion.template'
import { DeactivateTemplate } from './templates/deactivate.template'
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

	public async sendDeactivateToken(
		email: string,
		token: string,
		metadata: SessionMetadata
	) {
		const html = await render(DeactivateTemplate({ token, metadata }))
		await this.sendMail(email, 'Deactivate account', html)
	}

	public async sendAccountDeletion(email: string) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(AccountDeletionTemplate({ domain }))
		await this.sendMail(email, 'Account deleted', html)
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
