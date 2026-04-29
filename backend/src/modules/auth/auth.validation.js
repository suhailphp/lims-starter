'use strict';

const { z } = require('zod');

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .refine(
    (p) => /[a-zA-Z]/.test(p) && /[0-9]/.test(p),
    'Password must contain at least one letter and one number',
  );

const loginSchema = z.object({
  email: z.string().email().transform((s) => s.toLowerCase()),
  password: z.string().min(1, 'Password is required'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'refreshToken is required'),
});

const logoutSchema = refreshSchema;

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'currentPassword is required'),
  newPassword: passwordSchema,
});

module.exports = {
  loginSchema,
  refreshSchema,
  logoutSchema,
  changePasswordSchema,
};
