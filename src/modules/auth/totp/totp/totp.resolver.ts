import { Resolver } from '@nestjs/graphql'

import { TotpService } from './totp.service'

@Resolver('Totp')
export class TotpResolver {
	constructor(private readonly totpService: TotpService) {}
}
