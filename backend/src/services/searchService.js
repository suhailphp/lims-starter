'use strict';

/* Global search service.
 *
 * Lab-agnostic. Lookups are case-insensitive ILIKE. `isDeleted=false` is
 * enforced via each model's defaultScope; inactive rows DO appear so admins
 * can find them to reactivate (UI marks them with an Inactive badge).
 *
 * Per-entity field set is the contract. Adding a new searchable field =
 * update the entity's `where` block here AND the module doc.
 */

const { Op } = require('sequelize');
const db = require('../models');

const PER_CATEGORY_LIMIT = 5;   // results per category in 'all' mode
const MAX_PER_CATEGORY   = 50;  // hard cap when a single category is requested

/* Phase 1 role gate. ADMIN + MANAGER only. CUSTOMER/RECEPTIONIST/TECHNICIAN
 * return an empty payload — full per-entity role rules land with the
 * transactional modules. */
function canSearch(role) {
  return role === 'ADMIN' || role === 'MANAGER';
}

/* ----- Category-specific shapers ----- */

function shapeCustomer(row) {
  return {
    id: row.customerID,
    type: 'customers',
    name: row.name,
    subtitle: [row.contactName, row.contactEmail].filter(Boolean).join(' · ') || null,
    isActive: row.isActive,
    link: `/customers?view=${row.customerID}`,
  };
}

function shapeUser(row) {
  const fullName = `${row.firstName} ${row.lastName}`.trim();
  return {
    id: row.userID,
    type: 'users',
    name: fullName || row.email,
    subtitle: `${row.role} · ${row.email}`,
    isActive: row.isActive,
    link: `/users?view=${row.userID}`,
  };
}

function shapeTest(row) {
  return {
    id: row.testID,
    type: 'tests',
    name: row.name,
    subtitle: row.resultType ? `Result type: ${row.resultType}` : null,
    isActive: row.isActive,
    link: `/tests?view=${row.testID}`,
  };
}

function shapeMethod(row) {
  return {
    id: row.methodID,
    type: 'methods',
    name: row.code,
    subtitle: row.description || null,
    isActive: row.isActive,
    link: `/methods?view=${row.methodID}`,
  };
}

function shapeEquipment(row) {
  const parts = [row.model, row.serialNumber].filter(Boolean);
  return {
    id: row.equipmentID,
    type: 'equipment',
    name: row.name,
    subtitle: parts.length ? parts.join(' · ') : null,
    isActive: row.isActive,
    link: `/equipment?view=${row.equipmentID}`,
  };
}

function shapeCategory(row) {
  return {
    id: row.categoryID,
    type: 'categories',
    name: row.name,
    subtitle: row.type || null,
    isActive: row.isActive,
    link: `/categories?view=${row.categoryID}`,
  };
}

function shapeSource(row) {
  const parts = [row.equipmentName, row.componentType].filter(Boolean);
  return {
    id: row.sourceID,
    type: 'sources',
    name: row.sourceName,
    subtitle: parts.length ? parts.join(' · ') : null,
    isActive: row.isActive,
    link: `/sources?view=${row.sourceID}`,
  };
}

function shapeCurrency(row) {
  return {
    id: row.currencyID,
    type: 'currencies',
    name: `${row.code} — ${row.name}`,
    subtitle: row.symbol ? `Symbol: ${row.symbol}` : null,
    isActive: row.isActive,
    link: `/currencies?view=${row.currencyID}`,
  };
}

/* ----- Per-category fetchers ----- */

function buildCategoryQueries(term, limit) {
  const like = `%${term}%`;
  const baseAttrs = (extra) => ['createdAt', 'updatedAt', ...extra];

  return {
    customers: () =>
      db.Customer.findAndCountAll({
        where: { name: { [Op.iLike]: like } },
        attributes: baseAttrs(['customerID', 'name', 'contactName', 'contactEmail', 'isActive']),
        order: [['name', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeCustomer) })),

    users: () =>
      db.User.findAndCountAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: like } },
            { lastName:  { [Op.iLike]: like } },
            { email:     { [Op.iLike]: like } },
          ],
        },
        attributes: baseAttrs(['userID', 'firstName', 'lastName', 'email', 'role', 'isActive']),
        order: [['firstName', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeUser) })),

    tests: () =>
      db.Test.findAndCountAll({
        where: { name: { [Op.iLike]: like } },
        attributes: baseAttrs(['testID', 'name', 'resultType', 'isActive']),
        order: [['name', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeTest) })),

    methods: () =>
      db.Method.findAndCountAll({
        where: {
          [Op.or]: [
            { code:        { [Op.iLike]: like } },
            { description: { [Op.iLike]: like } },
          ],
        },
        attributes: baseAttrs(['methodID', 'code', 'description', 'isActive']),
        order: [['code', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeMethod) })),

    equipment: () =>
      db.Equipment.findAndCountAll({
        where: {
          [Op.or]: [
            { name:         { [Op.iLike]: like } },
            { model:        { [Op.iLike]: like } },
            { serialNumber: { [Op.iLike]: like } },
          ],
        },
        attributes: baseAttrs(['equipmentID', 'name', 'model', 'serialNumber', 'isActive']),
        order: [['name', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeEquipment) })),

    categories: () =>
      db.Category.findAndCountAll({
        where: { name: { [Op.iLike]: like } },
        attributes: baseAttrs(['categoryID', 'name', 'type', 'isActive']),
        order: [['name', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeCategory) })),

    sources: () =>
      db.Source.findAndCountAll({
        where: {
          [Op.or]: [
            { sourceName:    { [Op.iLike]: like } },
            { equipmentName: { [Op.iLike]: like } },
            { model:         { [Op.iLike]: like } },
            { make:          { [Op.iLike]: like } },
          ],
        },
        attributes: baseAttrs(['sourceID', 'sourceName', 'equipmentName', 'componentType', 'model', 'make', 'isActive']),
        order: [['sourceName', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeSource) })),

    currencies: () =>
      db.Currency.findAndCountAll({
        where: {
          [Op.or]: [
            { code: { [Op.iLike]: like } },
            { name: { [Op.iLike]: like } },
          ],
        },
        attributes: baseAttrs(['currencyID', 'code', 'name', 'symbol', 'isActive']),
        order: [['code', 'ASC']],
        limit,
      }).then(({ rows, count }) => ({ count, results: rows.map(shapeCurrency) })),
  };
}

const SUPPORTED_CATEGORIES = [
  'customers',
  'users',
  'tests',
  'methods',
  'equipment',
  'categories',
  'sources',
  'currencies',
];

/* ----- Public API ----- */

async function search({ q, category = 'all', role }) {
  if (!canSearch(role)) {
    return {
      query: q,
      category,
      totalResults: 0,
      resultsByCategory: {},
    };
  }

  const term = q.trim();
  const queries = buildCategoryQueries(term, category === 'all' ? PER_CATEGORY_LIMIT : MAX_PER_CATEGORY);

  if (category !== 'all') {
    if (!SUPPORTED_CATEGORIES.includes(category)) {
      return { query: q, category, totalResults: 0, results: [] };
    }
    const { count, results } = await queries[category]();
    return {
      query: q,
      category,
      totalResults: count,
      results,
    };
  }

  // 'all' — parallel fetch, drop empty buckets.
  const entries = await Promise.all(
    SUPPORTED_CATEGORIES.map(async (cat) => [cat, await queries[cat]()]),
  );

  const resultsByCategory = {};
  let totalResults = 0;
  for (const [cat, { count, results }] of entries) {
    if (count === 0) continue;
    resultsByCategory[cat] = { count, results };
    totalResults += count;
  }

  return {
    query: q,
    category: 'all',
    totalResults,
    resultsByCategory,
  };
}

module.exports = {
  search,
  SUPPORTED_CATEGORIES,
};
