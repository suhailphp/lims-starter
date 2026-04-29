'use strict';

const { z } = require('zod');

const ROLES = ['ADMIN', 'RECEPTIONIST', 'TECHNICIAN', 'MANAGER', 'CUSTOMER'];

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .refine(
    (p) => /[a-zA-Z]/.test(p) && /[0-9]/.test(p),
    'Password must contain at least one letter and one number',
  );

const userCreateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().transform((s) => s.toLowerCase()),
  password: passwordSchema,
  role: z.enum(ROLES),
  customerID: z.string().uuid().nullable().optional(),
  isActive: z.boolean().optional().default(true),
}).superRefine((d, ctx) => {
  if (d.role === 'CUSTOMER' && !d.customerID) {
    ctx.addIssue({
      code: 'custom',
      path: ['customerID'],
      message: 'customerID is required when role is CUSTOMER',
    });
  }
  if (d.role !== 'CUSTOMER' && d.customerID) {
    ctx.addIssue({
      code: 'custom',
      path: ['customerID'],
      message: 'customerID must be null when role is not CUSTOMER',
    });
  }
});

// Update schema is permissive on field presence; the controller enforces:
//   - the role/customerID consistency rule (using merged values)
//   - the self-update field allowlist (firstName, lastName only)
// password is intentionally NOT updateable here — use /auth/change-password or /users/:id/reset-password
const userUpdateSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().transform((s) => s.toLowerCase()).optional(),
  role: z.enum(ROLES).optional(),
  customerID: z.string().uuid().nullable().optional(),
  isActive: z.boolean().optional(),
  // Admin-only — set or clear the user's profile photo. Owning entity
  // owns the FK; flipping this triggers hard delete of the prior attachment
  // in the controller (file storage, not a business record).
  profilePhotoAttachmentID: z.string().uuid().nullable().optional(),
});

const userIdParamSchema = z.object({
  userID: z.string().uuid(),
});

const userListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  role: z.enum(ROLES).optional(),
  isActive: z.preprocess(
    (v) => (v === 'true' ? true : v === 'false' ? false : v),
    z.boolean().optional(),
  ),
  customerID: z.string().uuid().optional(),
  sort: z.enum(['firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt', 'lastLoginAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

const userResetPasswordSchema = z.object({
  newPassword: passwordSchema.optional(),
});

module.exports = {
  userCreateSchema,
  userUpdateSchema,
  userIdParamSchema,
  userListQuerySchema,
  userResetPasswordSchema,
  ROLES,
};
