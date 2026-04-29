'use strict';

const { z } = require('zod');
const { SUPPORTED_CATEGORIES } = require('../../services/searchService');

const searchQuerySchema = z
  .object({
    q: z
      .string()
      .trim()
      .min(2, 'Query must be at least 2 characters')
      .max(200, 'Query must be 200 characters or less'),
    category: z
      .enum(['all', ...SUPPORTED_CATEGORIES])
      .default('all'),
  })
  .strict();

module.exports = { searchQuerySchema };
