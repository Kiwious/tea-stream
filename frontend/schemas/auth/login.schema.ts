import { z } from 'zod'

export const loginSchema = z.object({
	login: z.string().min(1),
	password: z.string().min(8),
	pin: z.string().optional()
})

export type LoginFormValues = z.infer<typeof loginSchema>
