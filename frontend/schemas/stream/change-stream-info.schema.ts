import { z } from 'zod'

export const changeStreamInfoSchema = z.object({
	title: z.string(),
	categoryId: z.string()
})

export type ChangeStreamInfoSchemaType = z.infer<typeof changeStreamInfoSchema>
