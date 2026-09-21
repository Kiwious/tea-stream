import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RedisStore } from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'

import { CoreModule } from './core.module'
import { RedisService } from './core/redis/redis.service'
import { parseBoolean } from './shared/utils/parse-boolean.util'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule)
	const config = app.get(ConfigService)
	const redis = app.get(RedisService)

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')))
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(
		session({
			secret: config.getOrThrow<string>('SESSION_SECRET'),
			name: config.getOrThrow<string>('SESSION_NAME'),
			resave: false,
			saveUninitialized: false,
			cookie: {
				domain: config.getOrThrow<string>('SESSION_DOMAIN'),
				maxAge:
					config.getOrThrow<number>('SESSION_MAX_AGE_DAYS') *
					24 *
					60 *
					60 *
					1000,
				httpOnly: parseBoolean(
					config.getOrThrow<string>('SESSION_HTTP_ONLY')
				),
				secure: parseBoolean(
					config.getOrThrow<string>('SESSION_SECURE')
				),
				sameSite: 'lax'
			},
			store: new RedisStore({
				client: redis.client,
				prefix: config.getOrThrow<string>('SESSION_FOLDER')
			})
		})
	)

	app.enableCors({
		origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
		credentials: true,
		exposedHeaders: ['set-cookie']
	})
	const port = config.getOrThrow<number>('APPLICATION_PORT')
	await app.listen(port)
}
bootstrap()
