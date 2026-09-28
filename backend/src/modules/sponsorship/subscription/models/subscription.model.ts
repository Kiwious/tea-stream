import { Field, ID, ObjectType } from '@nestjs/graphql'

import { SponsorshipSubscription } from '@/prisma/generated/browser'
import { UserModel } from '@/src/modules/auth/account/models/user.model'

import { PlanModel } from '../../plan/models/plan.model'

@ObjectType()
export class SubscriptionModel implements SponsorshipSubscription {
	@Field(() => ID)
	id!: string

	@Field(() => Date)
	expiresAt!: Date

	@Field(() => String, { nullable: true })
	channelId!: string | null

	@Field(() => UserModel)
	channel!: UserModel

	@Field(() => PlanModel)
	sponsorshipPlan!: PlanModel

	@Field(() => String, { nullable: true })
	sponsorshipPlanId!: string | null

	@Field(() => UserModel)
	user!: UserModel

	@Field(() => String, { nullable: true })
	userId!: string | null

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
