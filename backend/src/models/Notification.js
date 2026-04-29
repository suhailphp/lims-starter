'use strict';

/**
 * Notification — the message itself, decoupled from recipients.
 *
 * Two-table design (see ADR-notification-routing-architecture):
 *   - Notification = one row per emitted message.
 *   - NotificationRecipient = one row per (notification, user) with
 *     independent read/delete state.
 *
 * Notifications are immutable once created: no updatedAt, no soft delete.
 * Created via `services/notificationService.js#notify(...)`. Controllers
 * never instantiate this model directly.
 *
 * Audit: opted out via `skipAudit` on every create — the notification IS
 * the permanent record; double-logging is noise.
 */
const TYPES = ['INFO', 'SUCCESS', 'WARNING', 'ERROR'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
const SCOPES = ['PERSONAL', 'CUSTOMER', 'LAB'];

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      notificationID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { isIn: [TYPES] },
      },
      priority: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'LOW',
        validate: { isIn: [PRIORITIES] },
      },
      scope: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { isIn: [SCOPES] },
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      entityType: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      entityID: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      triggeredBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      tableName: 'Notifications',
      timestamps: true,
      updatedAt: false, // immutable
      paranoid: false,
    },
  );

  Notification.associate = (models) => {
    Notification.hasMany(models.NotificationRecipient, {
      foreignKey: 'notificationID',
      as: 'recipients',
    });
  };

  return Notification;
};

module.exports.TYPES = TYPES;
module.exports.PRIORITIES = PRIORITIES;
module.exports.SCOPES = SCOPES;
