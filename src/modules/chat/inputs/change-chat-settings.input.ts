import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean } from 'class-validator'

@InputType()
export class ChangeChatSettingsInput {
	@Field(() => Boolean)
	@IsBoolean()
	isChatEnabled!: boolean

	@Field(() => Boolean)
	@IsBoolean()
	isChatFollowersOnly!: boolean

	@Field(() => Boolean)
	@IsBoolean()
	isChatPremiumFollowersOnly!: boolean
}
