import { MailerModule } from '@nestjs-modules/mailer'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { getGraphQLConfig } from './core/config/graphql.config'
import { getLiveKitConfig } from './core/config/livekit.config'
import { getMailerConfig } from './core/config/mailer.config'
import { PrismaModule } from './core/prisma/prisma.module'
import { RedisModule } from './core/redis/redis.module'
import { AccountModule } from './modules/auth/account/account.module'
import { DeactivateModule } from './modules/auth/deactivate/deactivate.module'
import { PasswordRecoveryModule } from './modules/auth/password-recovery/password-recovery.module'
import { ProfileModule } from './modules/auth/profile/profile.module'
import { SessionModule } from './modules/auth/session/session.module'
import { TotpModule } from './modules/auth/totp/totp.module'
import { VerificationModule } from './modules/auth/verification/verification.module'
import { CategoryModule } from './modules/category/category.module'
import { ChatModule } from './modules/chat/chat.module'
import { CronModule } from './modules/cron/cron.module'
import { FollowModule } from './modules/follow/follow.module'
import { LivekitModule } from './modules/libs/livekit/livekit.module'
import { MailModule } from './modules/libs/mail/mail.module'
import { StorageModule } from './modules/libs/storage/storage.module'
import { IngressModule } from './modules/stream/ingress/ingress.module'
import { StreamModule } from './modules/stream/stream.module'
import { WebhookModule } from './modules/webhook/webhook.module'
import { IS_DEV_ENV } from './shared/utils/is-dev.util'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
			expandVariables: true
		}),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			imports: [ConfigModule],
			useFactory: getGraphQLConfig,
			inject: [ConfigService]
		}),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMailerConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		RedisModule,
		AccountModule,
		SessionModule,
		MailModule,
		VerificationModule,
		PasswordRecoveryModule,
		TotpModule,
		DeactivateModule,
		CronModule,
		StorageModule,
		ProfileModule,
		StreamModule,
		IngressModule,
		LivekitModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getLiveKitConfig,
			inject: [ConfigService]
		}),
		WebhookModule,
		CategoryModule,
		ChatModule,
		FollowModule
	]
})
export class CoreModule {}
