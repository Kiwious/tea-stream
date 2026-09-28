declare module 'graphql-upload/graphqlUploadExpress.js' {
	import type { RequestHandler } from 'express'

	interface GraphqlUploadExpressOptions {
		maxFieldSize?: number
		maxFileSize?: number
		maxFiles?: number
	}

	export default function graphqlUploadExpress(
		options?: GraphqlUploadExpressOptions
	): RequestHandler
}

declare module 'graphql-upload/processRequest.js' {
	import type { ReadStream } from 'node:fs'

	export interface FileUpload {
		filename: string
		mimetype: string
		encoding: string
		createReadStream(): ReadStream
	}
}

declare module 'graphql-upload/GraphQLUpload.js' {
	import type { GraphQLScalarType } from 'graphql'

	const GraphQLUpload: GraphQLScalarType
	export default GraphQLUpload
}
