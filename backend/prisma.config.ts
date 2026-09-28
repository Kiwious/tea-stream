import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'
import { defineConfig, env } from 'prisma/config'

import { ENV_FILE_PATH } from './src/shared/utils/env-path.util'

expand(dotenv.config({ path: ENV_FILE_PATH }))

export default defineConfig({
	datasource: {
		url: env('POSTGRES_URI')
	}
})
