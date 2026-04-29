'use strict';

const { AppError } = require('../utils/errors');

/* `db` is lazy-required inside functions to avoid a circular dep:
 *   User.js → settingsService → db (models/index.js) → User.js
 * At top-level require time, db is the partially-initialized models
 * object and `db.Setting` is `undefined`. Looking up models on first
 * USE rather than first IMPORT keeps the module tree acyclic. */

/**
 * Settings service — typed access + in-memory cache.
 *
 * Per CLAUDE.md "Settings Rule": settings are read frequently from hot
 * paths (auth lockout, attachment size). A naive `Setting.findOne` per
 * read would add a query to every login attempt. We cache the entire
 * table in process memory; the cache is invalidated on every write.
 *
 * Cache scope: per Node process. With one app server (current state)
 * this is correct. If we ever scale horizontally, two options:
 *   - swap to Redis with PUB/SUB invalidation
 *   - keep in-memory but extend the writer to broadcast invalidation
 * For now, the limitation is documented in /docs/modules/00-settings.md.
 *
 * Public API:
 *   await initSettingsCache()         — call once at boot
 *   getSetting(key, fallback?)        — sync; coerced to valueType
 *   getSettingsByCategory(category)   — sync; array of full rows
 *   getPublicSettings()               — sync; array of public rows
 *   await refreshCache()              — invalidate + reload (after writes)
 *
 * `getSetting` always returns a value: if the cache is empty (e.g. early
 * boot crash) or the row is missing, the caller's fallback is returned.
 * Hot paths MUST pass a sane fallback so a settings outage never blocks
 * authentication.
 */

let cache = null; // Map<settingKey, row>
let initialized = false;

function coerce(value, valueType) {
  if (value === null || value === undefined) return null;
  switch (valueType) {
    case 'NUMBER': {
      const n = Number(value);
      return Number.isFinite(n) ? n : null;
    }
    case 'BOOLEAN':
      return value === 'true' || value === true || value === '1';
    case 'JSON':
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    case 'IMAGE':
    case 'STRING':
    default:
      return value;
  }
}

async function loadAll() {
  const db = require('../models');
  const rows = await db.Setting.findAll({
    order: [['category', 'ASC'], ['displayOrder', 'ASC']],
  });
  const map = new Map();
  rows.forEach((row) => {
    map.set(row.settingKey, row.toJSON());
  });
  return map;
}

async function initSettingsCache() {
  cache = await loadAll();
  initialized = true;
}

async function refreshCache() {
  cache = await loadAll();
  initialized = true;
}

function ensureInitialized() {
  if (!initialized || !cache) {
    /* Hot-path readers can call before init in edge cases (e.g. a test
     * that spins up the app without awaiting init). Lazy-fail to fallback
     * so we never throw inside auth. */
    return false;
  }
  return true;
}

function getSetting(key, fallback = null) {
  if (!ensureInitialized()) return fallback;
  const row = cache.get(key);
  if (!row) return fallback;
  const v = coerce(row.value, row.valueType);
  return v === null || v === undefined ? fallback : v;
}

function getSettingRow(key) {
  if (!ensureInitialized()) return null;
  return cache.get(key) || null;
}

function getAllSettings() {
  if (!ensureInitialized()) return [];
  return Array.from(cache.values()).sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.displayOrder - b.displayOrder;
  });
}

function getSettingsByCategory(category) {
  return getAllSettings().filter((r) => r.category === category);
}

function getPublicSettings() {
  return getAllSettings().filter((r) => r.isPublic);
}

/**
 * Update a single setting and refresh the cache. Coerces the incoming
 * value to its valueType's canonical string form before persisting.
 *
 * Rejects writes to `isEditable=false` rows so the API + UI agree.
 */
async function updateSetting(settingKey, value, userID) {
  const db = require('../models');
  const row = await db.Setting.findOne({ where: { settingKey } });
  if (!row) {
    throw new AppError(`Unknown setting: ${settingKey}`, 404);
  }
  if (!row.isEditable) {
    throw new AppError(
      `Setting "${settingKey}" is system-managed and cannot be edited`,
      403,
    );
  }
  /* All values stored as TEXT — stringify the incoming value uniformly.
   * The frontend sends type-correct payloads (number, boolean, etc.); we
   * round-trip through String() so the DB stays homogeneous. */
  let stored;
  if (value === null || value === undefined) {
    stored = null;
  } else if (row.valueType === 'JSON') {
    stored = typeof value === 'string' ? value : JSON.stringify(value);
  } else if (row.valueType === 'BOOLEAN') {
    stored = value ? 'true' : 'false';
  } else {
    stored = String(value);
  }
  await row.update({ value: stored, updatedBy: userID });
  await refreshCache();
  return row.reload();
}

async function bulkUpdate(payload, userID) {
  /* `payload` is a flat `{ key: value, ... }` object — same shape the UI
   * sends from a single form save. Process sequentially so a downstream
   * error doesn't leave a half-applied set; lab-scale settings are tiny
   * (under 30 rows) so we don't need a transaction or parallelism. */
  const updated = [];
  for (const [key, value] of Object.entries(payload)) {
    const row = await updateSetting(key, value, userID);
    updated.push(row.toJSON());
  }
  return updated;
}

module.exports = {
  initSettingsCache,
  refreshCache,
  getSetting,
  getSettingRow,
  getAllSettings,
  getSettingsByCategory,
  getPublicSettings,
  updateSetting,
  bulkUpdate,
};
