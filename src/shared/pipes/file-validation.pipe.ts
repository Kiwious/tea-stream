import {
	BadRequestException,
	Injectable,
	type PipeTransform
} from '@nestjs/common'
import type { FileUpload } from 'graphql-upload/processRequest.js'

import { validateFileFormat, validateFileSize } from '../utils/file.util'

@Injectable()
export class FileValidationPipe implements PipeTransform {
	public async transform(
		value: Promise<FileUpload> | FileUpload
	): Promise<FileUpload> {
		const file = await value

		if (!file?.filename || typeof file.createReadStream !== 'function') {
			throw new BadRequestException('File not loaded')
		}

		const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']
		const isFileFormatValid = validateFileFormat(
			file.filename.toLowerCase(),
			allowedFormats
		)

		if (!isFileFormatValid) {
			throw new BadRequestException('Unsupported file type')
		}

		const isFileSizeValid = await validateFileSize(
			file.createReadStream(),
			10 * 1024 * 1024
		)

		if (!isFileSizeValid) {
			throw new BadRequestException("File size can't exceed 10 MB")
		}

		return file
	}
}
