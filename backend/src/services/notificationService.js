'use strict';

const db = require('../models');
const { getContext } = require('../utils/requestContext');

/**
 * Notification service — single entry point for emitting notifications.
 *
 * Two-table model: insert one Notification, then resolve audience to a
 * set of userIDs and bulk-insert NotificationRecipient rows.
 *
 * Audience resolution by scope:
 *   PERSONAL: caller supplies `userIDs` directly.
 *   CUSTOMER: every active CUSTOMER user with the given `customerID`,
 *             plus optional `additionalUserIDs` (e.g. lab account manager).
 *   LAB:      every active user whose role is in `roles`,
 *             plus optional `additionalUserIDs`.
 *
 * Always fire-and-forget at call sites: errors are logged + swallowed
 * so notification failure never breaks the parent request. We DO surface
 * errors back to the caller's promise chain so explicit awaits can react,
 * but the convention in controllers is `.catch(...)`.
 *
 * `skipAudit: true` on the Notification create — see ADR-notification-routing-architecture
 * Q1: the notification IS the record; an AuditLog row would duplicate it.
 *
 * @param {Object} opts
 * @param {'PERSONAL'|'CUSTOMER'|'LAB'} opts.scope
 * @param {string[]} [opts.userIDs]            required for PERSONAL
 * @param {string} [opts.customerID]           required for CUSTOMER
 * @param {string[]} [opts.roles]              required for LAB
 * @param {string[]} [opts.additionalUserIDs]  cross-scope additions
 * @param {'INFO'|'SUCCESS'|'WARNING'|'ERROR'} opts.type
 * @param {'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'} [opts.priority='LOW']
 * @param {string} opts.title
 * @param {string} opts.message
 * @param {string|null} [opts.link]
 * @param {Object} [opts.metadata]
 * @param {string} [opts.entityType]
 * @param {string} [opts.entityID]
 * @param {string} [opts.triggeredBy]          userID of the actor who caused this
 * @returns {Promise<{ notification, recipientCount }>}
 */
async function notify(opts) {
  const {
    scope,
    userIDs,
    customerID,
    roles,
    additionalUserIDs,
    type,
    priority = 'LOW',
    title,
    message,
    link = null,
    metadata = {},
    entityType = null,
    entityID = null,
    triggeredBy,
  } = opts;

  const ctx = getContext();
  const actorID = triggeredBy ?? ctx.userId ?? null;

  // 1. Resolve audience BEFORE inserting the notification — if the audience
  //    is empty, skip insertion entirely. Avoids orphan Notification rows
  //    with zero recipients.
  //
  //    Self-exclusion: when `triggeredBy` is EXPLICITLY passed by the caller
  //    we drop that user from the recipient set — the actor knows what they
  //    just did, self-notifications are pure noise. We deliberately key off
  //    `opts.triggeredBy` and not the computed `actorID` (which falls back
  //    to ctx.userId), so genuine self-events without an explicit trigger
  //    (welcome, account-locked, self password-change) still reach the user.
  const recipientIDs = await resolveRecipients({
    scope,
    userIDs,
    customerID,
    roles,
    additionalUserIDs,
    excludeUserID: triggeredBy,
  });

  if (recipientIDs.length === 0) {
    return { notification: null, recipientCount: 0 };
  }

  // 2. Insert notification + recipients in one transaction so a half-
  //    delivered notification never exists.
  const result = await db.sequelize.transaction(async (t) => {
    const notification = await db.Notification.create(
      {
        type,
        priority,
        scope,
        title,
        message,
        link,
        metadata,
        entityType,
        entityID,
        triggeredBy: actorID,
        createdBy: actorID,
      },
      { transaction: t, skipAudit: true },
    );

    const rows = recipientIDs.map((userID) => ({
      notificationID: notification.notificationID,
      userID,
    }));
    await db.NotificationRecipient.bulkCreate(rows, { transaction: t });

    return { notification, recipientCount: rows.length };
  });

  return result;
}

async function resolveRecipients({
  scope,
  userIDs,
  customerID,
  roles,
  additionalUserIDs,
  excludeUserID,
}) {
  const set = new Set();

  if (scope === 'PERSONAL') {
    if (!Array.isArray(userIDs) || userIDs.length === 0) {
      throw new Error('notify: PERSONAL scope requires non-empty userIDs');
    }
    for (const id of userIDs) set.add(id);
  } else if (scope === 'CUSTOMER') {
    if (!customerID) {
      throw new Error('notify: CUSTOMER scope requires customerID');
    }
    const users = await db.User.findAll({
      where: { customerID, role: 'CUSTOMER', isActive: true },
      attributes: ['userID'],
    });
    for (const u of users) set.add(u.userID);
  } else if (scope === 'LAB') {
    if (!Array.isArray(roles) || roles.length === 0) {
      throw new Error('notify: LAB scope requires non-empty roles');
    }
    const users = await db.User.findAll({
      where: { role: roles, isActive: true },
      attributes: ['userID'],
    });
    for (const u of users) set.add(u.userID);
  } else {
    throw new Error(`notify: unknown scope '${scope}'`);
  }

  if (Array.isArray(additionalUserIDs)) {
    for (const id of additionalUserIDs) set.add(id);
  }

  // Self-exclusion last: even if the actor was added via additionalUserIDs,
  // an explicit triggeredBy still drops them.
  if (excludeUserID) set.delete(excludeUserID);

  return Array.from(set);
}

/**
 * Convenience wrapper: notify a single user. Most call sites use this
 * for PERSONAL events.
 */
function notifyUser(userID, options) {
  return notify({ ...options, scope: 'PERSONAL', userIDs: [userID] });
}

module.exports = { notify, notifyUser, resolveRecipients };
