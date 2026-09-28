import { ConfigService } from '@nestjs/config'
import * as dotenv from 'dotenv'

import { ENV_FILE_PATH } from './env-path.util'

dotenv.config({ path: ENV_FILE_PATH })

export function isDev(configService: ConfigService) {
	return configService.getOrThrow<string>('NODE_ENV') === 'development'
}

export const IS_DEV_ENV = process.env.NODE_ENV === 'development'
