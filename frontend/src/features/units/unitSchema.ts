/* DOMAIN — mirrors backend backend/src/modules/unit/unit.validation.js */
import { z } from 'zod'

export const unitFormSchema = z.object({
  categoryID: z
    .string({ message: 'Category is required' })
    .uuid('Category is required'),
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Must be 100 characters or fewer'),
  symbol: z
    .string()
    .trim()
    .min(1, 'Symbol is required')
    .max(30, 'Must be 30 characters or fewer'),
  isActive: z.boolean().optional(),
})

export type UnitFormValues = z.infer<typeof unitFormSchema>
