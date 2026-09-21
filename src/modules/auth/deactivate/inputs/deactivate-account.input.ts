import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	MinLength
} from 'class-validator'

@InputType()
export class DeactivateAccountInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email!: string

	@Field()
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password!: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Length(6, 6)
	pin?: string
}
