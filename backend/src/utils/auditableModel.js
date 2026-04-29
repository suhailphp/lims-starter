'use strict';

const { getContext } = require('./requestContext');

/**
 * Attach AuditLog hooks to a Sequelize model.
 *
 * Usage (in the model definition file, after `applyAuditHooks`):
 *
 *   applyAuditLogging(Customer, 'customer');
 *
 * For models with sensitive fields, pass an exclusion list:
 *
 *   applyAuditLogging(User, 'user', {
 *     excludeFields: ['password'],
 *   });
 *
 * Behavior:
 *   - afterCreate  → INSERT AuditLog with action=CREATE, changes={ after: row }
 *   - afterUpdate  → INSERT AuditLog with action=UPDATE,
 *                    changes={ before: oldFields, after: newFields } — diff only.
 *                    If the update is a soft-delete (isDeleted flipped to true),
 *                    action becomes DELETE and changes carries `before` only.
 *   - afterDestroy → INSERT AuditLog with action=DELETE, changes={ before: row }
 *
 * Bail conditions (no audit row written):
 *   - No request context (CLI scripts, migrations, hooks running outside HTTP).
 *   - `options.skipAudit === true` (system-internal writes that opt out).
 *   - UPDATE where the only changed field is `updatedAt` (auditedUpdate's
 *     forced-bump is cosmetic, not a real change).
 *
 * Errors are caught and console.error'd so a logging failure cannot break
 * the parent transaction. Compliance trade-off discussed in
 * /docs/decisions/ADR-useractivity-vs-auditlog.md.
 */
function applyAuditLogging(Model, entityType, options = {}) {
  const excludeFields = new Set(options.excludeFields || []);
  // Always also strip these — never useful in audit, always present on
  // every audited model. Keeping audit JSON small + readable.
  for (const f of ['createdAt', 'updatedAt', 'deletedAt']) excludeFields.add(f);

  const pkAttr = Model.primaryKeyAttribute;

  Model.addHook('afterCreate', async (instance, opts) => {
    if (opts && opts.skipAudit) return;
    const ctx = getContext();
    if (!ctx.userId) return;

    try {
      const sequelize = Model.sequelize;
      const after = stripFields(instance.toJSON(), excludeFields);
      await sequelize.models.AuditLog.create({
        userID: ctx.userId,
        entityType,
        entityID: instance[pkAttr],
        action: 'CREATE',
        changes: { after },
        ipAddress: ctx.ipAddress,
        userAgent: ctx.userAgent,
      });
    } catch (err) {
      console.error('[audit] afterCreate failed', { entityType, message: err.message });
    }
  });

  Model.addHook('afterUpdate', async (instance, opts) => {
    if (opts && opts.skipAudit) return;
    const ctx = getContext();
    if (!ctx.userId) return;

    try {
      const changedFields = (instance.changed() || []).filter(
        (f) => !excludeFields.has(f),
      );
      // Filter out the cosmetic auditedUpdate timestamp bump — if the only
      // dirty field is updatedAt, no real data changed.
      if (changedFields.length === 0) return;

      const prev = instance._previousDataValues || {};
      const curr = instance.dataValues || {};

      // Soft-delete recognition: isDeleted flipped to true. Translate to DELETE.
      const isSoftDelete =
        changedFields.includes('isDeleted')
        && prev.isDeleted === false
        && curr.isDeleted === true;

      const sequelize = Model.sequelize;
      if (isSoftDelete) {
        const before = stripFields(prev, excludeFields);
        await sequelize.models.AuditLog.create({
          userID: ctx.userId,
          entityType,
          entityID: instance[pkAttr],
          action: 'DELETE',
          changes: { before },
          ipAddress: ctx.ipAddress,
          userAgent: ctx.userAgent,
        });
        return;
      }

      const before = {};
      const after = {};
      for (const field of changedFields) {
        before[field] = prev[field];
        after[field] = curr[field];
      }
      await sequelize.models.AuditLog.create({
        userID: ctx.userId,
        entityType,
        entityID: instance[pkAttr],
        action: 'UPDATE',
        changes: { before, after },
        ipAddress: ctx.ipAddress,
        userAgent: ctx.userAgent,
      });
    } catch (err) {
      console.error('[audit] afterUpdate failed', { entityType, message: err.message });
    }
  });

  Model.addHook('afterDestroy', async (instance, opts) => {
    if (opts && opts.skipAudit) return;
    const ctx = getContext();
    if (!ctx.userId) return;

    try {
      const sequelize = Model.sequelize;
      const before = stripFields(
        instance._previousDataValues || instance.dataValues || {},
        excludeFields,
      );
      await sequelize.models.AuditLog.create({
        userID: ctx.userId,
        entityType,
        entityID: instance[pkAttr],
        action: 'DELETE',
        changes: { before },
        ipAddress: ctx.ipAddress,
        userAgent: ctx.userAgent,
      });
    } catch (err) {
      console.error('[audit] afterDestroy failed', { entityType, message: err.message });
    }
  });
}

function stripFields(obj, exclude) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (exclude.has(k)) continue;
    out[k] = v;
  }
  return out;
}

module.exports = { applyAuditLogging };
