'use strict';

const { z } = require('zod');

const attachmentIdParamSchema = z.object({
  attachmentID: z.string().uuid(),
});

module.exports = { attachmentIdParamSchema };
