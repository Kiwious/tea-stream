import { z } from 'zod'

export const resetPasswordSchema = z.object({
	email: z.email()
})

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
