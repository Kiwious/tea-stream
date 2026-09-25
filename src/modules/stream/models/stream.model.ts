import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { Stream } from '@/prisma/generated/browser'

import { UserModel } from '../../auth/account/models/user.model'
import { CategoryModel } from '../../category/models/category.model'
import { ChatMessageModel } from '../../chat/models/chat-message.model'

@ObjectType()
export class StreamModel implements Stream {
	@Field(() => ID)
	id!: string

	@Field(() => String)
	title!: string

	@Field(() => String, { nullable: true })
	thumbnailUrl!: string | null

	@Field(() => String, { nullable: true })
	ingressId!: string | null

	@Field(() => String, { nullable: true })
	serverUrl!: string | null

	@Field(() => String, { nullable: true })
	streamKey!: string | null

	@Field(() => Boolean)
	isLive!: boolean

	@Field(() => Boolean)
	isChatEnabled!: boolean

	@Field(() => Boolean)
	isChatFollowersOnly!: boolean

	@Field(() => Boolean)
	isChatPremiumFollowersOnly!: boolean

	@Field(() => UserModel)
	user!: UserModel

	@Field(() => String)
	userId!: string

	@Field(() => CategoryModel)
	category!: CategoryModel

	@Field(() => String)
	categoryId!: string

	@Field(() => [ChatMessageModel])
	chatMessages!: ChatMessageModel[]

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
