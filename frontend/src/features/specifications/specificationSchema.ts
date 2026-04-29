/* DOMAIN — mirrors backend backend/src/modules/specification/specification.validation.js */
import { z } from 'zod'

export const specificationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(150, 'Must be 150 characters or fewer'),
  isActive: z.boolean().optional(),
})

export type SpecificationFormValues = z.infer<typeof specificationFormSchema>
