import { Module } from '@nestjs/common'

import { SubscriptionResolver } from './subscription.resolver'
import { SubscriptionService } from './subscription.service'

@Module({
	providers: [SubscriptionResolver, SubscriptionService]
})
export class SubscriptionModule {}
