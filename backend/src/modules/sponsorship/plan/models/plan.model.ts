import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { SponsorshipPlan } from '@/prisma/generated/browser'
import { UserModel } from '@/src/modules/auth/account/models/user.model'

@ObjectType()
export class PlanModel implements SponsorshipPlan {
	@Field(() => ID)
	id!: string

	@Field(() => String)
	title!: string

	@Field(() => String, { nullable: true })
	description!: string | null

	@Field(() => Number)
	price!: number

	@Field(() => String)
	stripeProductId!: string

	@Field(() => String)
	stripePlanId!: string

	@Field(() => UserModel)
	channel!: UserModel

	@Field(() => String, { nullable: true })
	channelId!: string | null

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
