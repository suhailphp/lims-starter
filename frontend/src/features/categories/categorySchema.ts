/* DOMAIN — mirrors backend backend/src/modules/category/category.validation.js */
import { z } from 'zod'

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Must be 100 characters or fewer'),
  type: z.enum(['FUEL', 'LUBRICANT', 'WATER'], {
    message: 'Type is required',
  }),
  isActive: z.boolean().optional(),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>
