import { Module } from '@nestjs/common'

import { VerificationResolver } from './verification.resolver'
import { VerificationService } from './verification.service'

@Module({
	providers: [VerificationResolver, VerificationService],
	exports: [VerificationService]
})
export class VerificationModule {}
