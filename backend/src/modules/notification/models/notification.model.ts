import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Notification, NotificationType } from '@/prisma/generated/browser'

registerEnumType(NotificationType, {
	name: 'NotificationType'
})

@ObjectType()
export class NotificationModel implements Notification {
	@Field(() => String)
	id!: string

	@Field(() => String)
	message!: string

	@Field(() => NotificationType)
	type!: NotificationType

	@Field(() => Boolean)
	isRead!: boolean

	@Field(() => String, { nullable: true })
	userId!: string | null

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
