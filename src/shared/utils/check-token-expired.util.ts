import { BadRequestException } from '@nestjs/common'

import { Token } from '@/prisma/generated/browser'

export function checkTokenExpired(token: Token) {
	const hasExpired = new Date(token.expiresIn) < new Date()
	if (hasExpired) {
		throw new BadRequestException('Token expired')
	}
}
