import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(__dirname)

const config: CodegenConfig = {
	schema: process.env.NEXT_PUBLIC_SERVER_URL,
	documents: ['./graphql/**/*.graphql'],
	generates: {
		'./graphql/generated/output.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typed-document-node',
				'./graphql/codegen/apollo-hooks.cjs'
			]
		}
	},
	ignoreNoDocuments: true
}

export default config
