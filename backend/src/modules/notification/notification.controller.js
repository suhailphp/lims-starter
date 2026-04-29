'use strict';

const db = require('../../models');
const { NotFoundError } = require('../../utils/errors');
const { parsePagination, buildMeta } = require('../../utils/pagination');

/**
 * GET /api/notifications/me
 *
 * Paginated list for the calling user. Joins Notification + NotificationRecipient
 * so each row carries both the message body and the per-user state.
 *
 * Filters: unreadOnly, type, priority.
 */
async function listMine(req, res) {
  const { page, limit, unreadOnly, type, priority } = req.validated.query;
  const { offset } = parsePagination({ page, limit });

  const recipientWhere = { userID: req.user.userID };
  if (unreadOnly) recipientWhere.isRead = false;

  const notificationWhere = {};
  if (type) notificationWhere.type = type;
  if (priority) notificationWhere.priority = priority;

  const { rows, count } = await db.NotificationRecipient.findAndCountAll({
    where: recipientWhere,
    include: [
      {
        model: db.Notification,
        as: 'notification',
        where: Object.keys(notificationWhere).length ? notificationWhere : undefined,
        required: true,
      },
    ],
    // Sort by the recipient's createdAt — same instant as the notification's
    // createdAt for that recipient (bulkCreate inside transaction).
    order: [['createdAt', 'DESC']],
    limit,
    offset,
  });

  res.json({
    success: true,
    data: rows,
    meta: buildMeta({ total: count, page, limit }),
  });
}

/**
 * GET /api/notifications/me/unread-count
 *
 * Bell badge polls this every 30 s. Cheap: covered by
 * idx_notification_recipients_user_read_created.
 */
async function unreadCount(req, res) {
  const count = await db.NotificationRecipient.count({
    where: { userID: req.user.userID, isRead: false },
  });
  res.json({ success: true, data: { count } });
}

/**
 * PUT /api/notifications/:notificationID/read
 *
 * Marks the calling user's recipient row as read. 404 if there is no
 * recipient row (the notification exists but wasn't sent to this user).
 */
async function markRead(req, res) {
  const { notificationID } = req.validated.params;
  const recipient = await db.NotificationRecipient.findOne({
    where: { notificationID, userID: req.user.userID },
  });
  if (!recipient) throw new NotFoundError('Notification');

  if (!recipient.isRead) {
    recipient.isRead = true;
    recipient.readAt = new Date();
    await recipient.save();
  }

  res.json({ success: true, data: recipient });
}

/**
 * PUT /api/notifications/me/read-all
 *
 * Bulk-marks every unread recipient row for the calling user as read.
 * Returns the number of rows updated for UI confirmation.
 */
async function markAllRead(req, res) {
  const [updated] = await db.NotificationRecipient.update(
    { isRead: true, readAt: new Date() },
    { where: { userID: req.user.userID, isRead: false } },
  );
  res.json({ success: true, data: { updated } });
}

/**
 * DELETE /api/notifications/:notificationID
 *
 * Soft-deletes the calling user's recipient row. Other recipients of the
 * same notification are unaffected.
 */
async function dismiss(req, res) {
  const { notificationID } = req.validated.params;
  const recipient = await db.NotificationRecipient.findOne({
    where: { notificationID, userID: req.user.userID },
  });
  if (!recipient) throw new NotFoundError('Notification');

  recipient.isDeleted = true;
  recipient.deletedAt = new Date();
  await recipient.save();

  res.status(204).send();
}

module.exports = { listMine, unreadCount, markRead, markAllRead, dismiss };
