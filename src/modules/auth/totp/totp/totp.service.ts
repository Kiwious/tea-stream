import { Injectable } from '@nestjs/common'
import { randomBytes } from 'crypto'
import { encode } from 'hi-base32'
import { TOTP } from 'otpauth'
import * as QRCode from 'qrcode'

import type { User } from '@/prisma/generated/browser'
import { PrismaService } from '@/src/core/prisma/prisma.service'

@Injectable()
export class TotpService {
	constructor(private readonly prismaService: PrismaService) {}

	public async generate(user: User) {
		const secret = encode(randomBytes(15))
			.replace(/=/g, '')
			.substring(0, 24)

		const totp = new TOTP({
			issuer: 'TeaStream',
			label: `${user.email}`,
			algorithm: 'SHA1',
			digits: 6,
			secret
		})

		const otpauthUrl = totp.toString()
		const qrCodeUrl = await QRCode.toDataURL(otpauthUrl)

		return { qrCodeUrl, secret }
	}
}
