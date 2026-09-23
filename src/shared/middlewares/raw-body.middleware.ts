import {
	BadRequestException,
	Injectable,
	type NestMiddleware
} from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'
import getRawBody from 'raw-body'

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (!req.readable) {
			return next(new BadRequestException('Request not readable'))
		}
		getRawBody(req, { encoding: 'utf-8' })
			.then(rawBody => {
				req.body = rawBody
				next()
			})
			.catch(error => {
				next(
					new BadRequestException('Error reading request body', error)
				)
			})
	}
}
