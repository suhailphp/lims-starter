/* DOMAIN — mirrors backend backend/src/modules/method/method.validation.js */
import { z } from 'zod'

export const methodFormSchema = z.object({
  testID: z
    .string({ message: 'Test is required' })
    .uuid('Test is required'),
  code: z
    .string()
    .trim()
    .min(1, 'Code is required')
    .max(50, 'Must be 50 characters or fewer'),
  description: z
    .string()
    .max(2000, 'Must be 2000 characters or fewer')
    .optional()
    .or(z.literal('')),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
})

export type MethodFormValues = z.infer<typeof methodFormSchema>
