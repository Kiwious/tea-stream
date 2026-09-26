import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { User } from '@/prisma/generated/browser'
import { FollowModel } from '@/src/modules/follow/models/follow.model'
import { StreamModel } from '@/src/modules/stream/models/stream.model'

import { SocialLinkModel } from '../../profile/models/social-link.model'

@ObjectType()
export class UserModel implements User {
	@Field(() => ID)
	id!: string

	@Field(() => String)
	email!: string

	@Field(() => String)
	password!: string

	@Field(() => String)
	username!: string

	@Field(() => String)
	displayName!: string

	@Field(() => String, { nullable: true })
	avatar!: string | null

	@Field(() => String, { nullable: true })
	bio!: string | null

	@Field(() => Boolean)
	isEmailVerified!: boolean

	@Field(() => Boolean)
	isVerified!: boolean

	@Field(() => Boolean)
	isTotpEnabled!: boolean

	@Field(() => String, { nullable: true })
	totpSecret!: string | null

	@Field(() => Boolean)
	isDeactivated!: boolean

	@Field(() => Date, { nullable: true })
	deactivatedAt!: Date | null

	@Field(() => [SocialLinkModel])
	socialLinks!: SocialLinkModel[]

	@Field(() => [FollowModel])
	followers!: FollowModel[]

	@Field(() => [FollowModel])
	followings!: FollowModel[]

	@Field(() => StreamModel)
	stream!: StreamModel

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
