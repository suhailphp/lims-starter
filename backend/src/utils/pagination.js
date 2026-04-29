'use strict';

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

function parsePagination(query = {}) {
  const page = Number.isFinite(query.page) && query.page > 0 ? query.page : 1;
  let limit = Number.isFinite(query.limit) && query.limit > 0 ? query.limit : DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;
  return { page, limit, offset: (page - 1) * limit };
}

function buildMeta({ total, page, limit }) {
  return {
    total,
    page,
    limit,
    totalPages: limit > 0 ? Math.ceil(total / limit) : 0,
  };
}

module.exports = { parsePagination, buildMeta, MAX_LIMIT, DEFAULT_LIMIT };
