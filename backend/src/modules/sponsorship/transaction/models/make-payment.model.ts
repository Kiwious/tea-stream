import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MakePaymentModel {
	@Field(() => String)
	url!: string
}
