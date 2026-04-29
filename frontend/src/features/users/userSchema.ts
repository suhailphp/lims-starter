/* DOMAIN — mirrors backend backend/src/modules/user/user.validation.js */
import { z } from 'zod'

export const ROLES = [
  'ADMIN',
  'MANAGER',
  'TECHNICIAN',
  'RECEPTIONIST',
  'CUSTOMER',
] as const

const passwordRule = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .refine(
    (p) => /[a-zA-Z]/.test(p) && /[0-9]/.test(p),
    'Password must contain at least one letter and one number',
  )

const baseFields = {
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(100, 'Must be 100 characters or fewer'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(100, 'Must be 100 characters or fewer'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Email is required')
    .max(150, 'Must be 150 characters or fewer')
    .email('Invalid email format'),
  role: z.enum(ROLES, { message: 'Role is required' }),
  customerID: z
    .string()
    .uuid('Customer is required')
    .nullable()
    .optional()
    .transform((v) => (v == null || v === '' ? null : v)),
  isActive: z.boolean().optional(),
}

/** Cross-field rule: CUSTOMER role requires customerID; everything else forbids it. */
function refineRoleCustomer<T extends { role: string; customerID: string | null | undefined }>(
  d: T,
  ctx: z.RefinementCtx,
) {
  if (d.role === 'CUSTOMER' && !d.customerID) {
    ctx.addIssue({
      code: 'custom',
      path: ['customerID'],
      message: 'Customer is required when role is CUSTOMER',
    })
  }
  if (d.role !== 'CUSTOMER' && d.customerID) {
    ctx.addIssue({
      code: 'custom',
      path: ['customerID'],
      message: 'Customer must be empty when role is not CUSTOMER',
    })
  }
}

export const userCreateFormSchema = z
  .object({
    ...baseFields,
    password: passwordRule,
  })
  .superRefine(refineRoleCustomer)

export const userUpdateFormSchema = z
  .object(baseFields)
  .superRefine(refineRoleCustomer)

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>
export type UserUpdateFormValues = z.infer<typeof userUpdateFormSchema>

/** Reset-password modal form. `mode` is UI-only; backend just sees newPassword? */
export const resetPasswordFormSchema = z
  .object({
    mode: z.enum(['generate', 'typed']),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((d, ctx) => {
    if (d.mode !== 'typed') return
    const pw = d.newPassword ?? ''
    const confirm = d.confirmPassword ?? ''
    const result = passwordRule.safeParse(pw)
    if (!result.success) {
      ctx.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message: result.error.issues[0]?.message ?? 'Invalid password',
      })
    }
    if (pw && confirm && pw !== confirm) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match',
      })
    }
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>
