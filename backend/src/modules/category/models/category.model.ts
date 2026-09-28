import { Field, ID, ObjectType } from '@nestjs/graphql'

import { Category } from '@/prisma/generated/browser'

import { StreamModel } from '../../stream/models/stream.model'

@ObjectType()
export class CategoryModel implements Category {
	@Field(() => ID)
	id!: string

	@Field(() => String)
	title!: string

	@Field(() => String)
	slug!: string

	@Field(() => String, { nullable: true })
	description!: string | null

	@Field(() => String)
	thumbnailUrl!: string

	@Field(() => [StreamModel])
	streams!: StreamModel[]

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
