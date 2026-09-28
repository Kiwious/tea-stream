import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

@InputType()
export class ChangePasswordInput {
	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	oldPassword!: string

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	newPassword!: string
}
