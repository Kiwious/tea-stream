import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'
import { defineConfig, env } from 'prisma/config'

expand(dotenv.config())

export default defineConfig({
	datasource: {
		url: env('POSTGRES_URI')
	}
})
