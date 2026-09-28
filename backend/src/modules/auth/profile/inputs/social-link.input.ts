import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class SocialLinkInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	title!: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	url!: string
}

@InputType()
export class SocialLinkOrderInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	id!: string

	@Field(() => Number)
	@IsNumber()
	@IsNotEmpty()
	position!: number
}
