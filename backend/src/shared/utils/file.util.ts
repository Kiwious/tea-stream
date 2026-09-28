import { ReadStream } from 'fs'

export function validateFileFormat(
	fileName: string,
	allowedFileFormats: string[]
) {
	const fileParts = fileName.split('.')
	const extension = fileParts[fileParts.length - 1]
	return allowedFileFormats.includes(extension)
}

export async function validateFileSize(
	fileStream: ReadStream,
	allowedFileSizeInBytes: number
) {
	return new Promise<boolean>((resolve, reject) => {
		let fileSizeInBytes = 0

		fileStream
			.on('data', (data: Buffer | string) => {
				fileSizeInBytes += Buffer.byteLength(data)
			})
			.on('end', () => {
				resolve(fileSizeInBytes <= allowedFileSizeInBytes)
			})
			.on('error', err => {
				reject(err)
			})
	})
}
