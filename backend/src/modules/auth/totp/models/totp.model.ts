import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TotpModel {
	@Field(() => String)
	qrcodeUrl!: string

	@Field(() => String)
	secret!: string
}
