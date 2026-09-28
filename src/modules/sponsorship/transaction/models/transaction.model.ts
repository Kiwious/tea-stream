import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

import { Transaction, TransactionStatus } from '@/prisma/generated/browser'
import { UserModel } from '@/src/modules/auth/account/models/user.model'

registerEnumType(TransactionStatus, {
	name: 'TransactionStatus'
})

@ObjectType()
export class TransactionModel implements Transaction {
	@Field(() => ID)
	id!: string

	@Field(() => Number)
	amount!: number

	@Field(() => String)
	currency!: string

	@Field(() => String, { nullable: true })
	stripeSubscriptionId!: string | null

	@Field(() => TransactionStatus)
	status!: TransactionStatus

	@Field(() => UserModel)
	user!: UserModel

	@Field(() => String, { nullable: true })
	userId!: string | null

	@Field(() => Date)
	createdAt!: Date

	@Field(() => Date)
	updatedAt!: Date
}
