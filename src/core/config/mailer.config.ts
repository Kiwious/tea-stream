import type { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export function getMailerConfig(configService: ConfigService): MailerOptions {
	const port = Number(configService.getOrThrow<string>('MAIL_PORT'))

	return {
		transport: {
			host: configService.getOrThrow<string>('MAIL_HOST'),
			port,
			secure: port === 465, // 465 = implizites TLS, 587 = STARTTLS
			auth: {
				user: configService.getOrThrow<string>('MAIL_LOGIN'),
				pass: configService.getOrThrow<string>('MAIL_PASSWORD')
			}
		},
		defaults: {
			from: `"TeaStream" <${configService.getOrThrow<string>('MAIL_LOGIN')}>`
		}
	}
}
