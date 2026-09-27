import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean } from 'class-validator'

@InputType()
export class ChangeNotificationSettingsInput {
	@Field(() => Boolean)
	@IsBoolean()
	siteNotifications!: boolean

	@Field(() => Boolean)
	@IsBoolean()
	telegramNotifications!: boolean
}
