import { Optional } from '@nestjs/common'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator'

@InputType()
export class ChangeProfileInfoInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
	username!: string

	@Field()
	@IsString()
	@IsNotEmpty()
	displayName!: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@Optional()
	@MaxLength(300)
	bio!: string
}
