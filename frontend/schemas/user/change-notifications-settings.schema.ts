import { z } from 'zod'

export const changeNotificationsSettingsSchema = z.object({
	siteNotifications: z.boolean(),
	telegramNotifications: z.boolean()
})

export type ChangeNotificationsSettingsSchemaType = z.infer<
	typeof changeNotificationsSettingsSchema
>
