import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { Stream } from '@/prisma/generated/browser'

import { UserModel } from '../../auth/account/models/user.model'
import { CategoryModel } from '../../category/models/category.model'

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

	@Field(() => UserModel)
	user!: UserModel

	@Field(() => String)
	userId!: string

	@Field(() => CategoryModel)
	category!: CategoryModel

	@Field(() => String)
	categoryId!: string

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
