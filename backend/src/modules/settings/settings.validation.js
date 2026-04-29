'use strict';

const { z } = require('zod');

const settingKeyParam = z.object({
  settingKey: z.string().min(1).max(100),
});

const categoryParam = z.object({
  category: z.string().min(1).max(50),
});

/* The body for PUT /api/settings/:settingKey accepts any of:
 *   { value: <string|number|boolean|null|object> }
 * The service decides how to coerce based on the row's valueType. */
const updateBody = z.object({
  value: z
    .union([z.string(), z.number(), z.boolean(), z.record(z.any()), z.null()])
    .optional(),
});

const bulkBody = z
  .record(
    z.union([z.string(), z.number(), z.boolean(), z.record(z.any()), z.null()]),
  )
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'At least one setting key is required',
  });

module.exports = {
  settingKeyParam,
  categoryParam,
  updateBody,
  bulkBody,
};
