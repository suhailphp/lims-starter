/* DOMAIN — mirrors backend backend/src/modules/source/source.validation.js */
import { z } from 'zod'

const trimmedNullable = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Must be ${max} characters or fewer`)
    .nullable()
    .optional()
    .transform((v) => (v == null || v === '' ? null : v))

export const sourceFormSchema = z.object({
  customerID: z
    .string({ message: 'Customer is required' })
    .uuid('Customer is required'),
  sourceTypeID: z
    .string({ message: 'Source type is required' })
    .uuid('Source type is required'),
  categoryID: z
    .string({ message: 'Category is required' })
    .uuid('Category is required'),
  sourceName: z
    .string()
    .trim()
    .min(1, 'Source name is required')
    .max(200, 'Must be 200 characters or fewer'),
  equipmentName: trimmedNullable(200),
  componentType: trimmedNullable(100),
  model: trimmedNullable(100),
  make: trimmedNullable(100),
  isActive: z.boolean().optional(),
})

export type SourceFormValues = z.infer<typeof sourceFormSchema>
