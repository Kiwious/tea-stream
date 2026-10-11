import { z } from 'zod'

export const createSponsorshipPlanSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
	price: z.coerce.number().positive()
})

export type CreateSponsorshipPlanSchemaInput = z.input<
	typeof createSponsorshipPlanSchema
>

export type CreateSponsorshipPlanSchemaType = z.infer<
	typeof createSponsorshipPlanSchema
>
