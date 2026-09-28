import { Module } from '@nestjs/common'

import { VerificationModule } from '../verification/verification.module'

import { AccountResolver } from './account.resolver'
import { AccountService } from './account.service'

@Module({
	imports: [VerificationModule],
	providers: [AccountResolver, AccountService]
})
export class AccountModule {}
