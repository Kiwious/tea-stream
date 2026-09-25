import { Field, ID, ObjectType } from '@nestjs/graphql'

import { ChatMessage } from '@/prisma/generated/browser'

import { UserModel } from '../../auth/account/models/user.model'
import { StreamModel } from '../../stream/models/stream.model'

@ObjectType()
export class ChatMessageModel implements ChatMessage {
	@Field(() => ID)
	id!: string

	@Field(() => String)
	text!: string

	@Field(() => String)
	userId!: string

	@Field(() => UserModel)
	user!: UserModel

	@Field(() => String)
	streamId!: string

	@Field(() => StreamModel)
	stream!: StreamModel

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
