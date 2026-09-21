import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MinLength
} from 'class-validator'

@InputType()
export class CreateUserInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/)
	username!: string

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
}
