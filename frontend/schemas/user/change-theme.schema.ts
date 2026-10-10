import { z } from 'zod'

export const changeThemeSchema = z.object({
	isDark: z.boolean()
})

export type ChangeThemeSchemaType = z.infer<typeof changeThemeSchema>
