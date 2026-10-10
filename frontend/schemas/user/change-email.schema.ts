import { z } from 'zod'

export const changeEmailSchema = z.object({
	email: z.string()
})

export type ChangeEmailSchemaType = z.infer<typeof changeEmailSchema>
