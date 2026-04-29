'use strict';

/**
 * NotificationRecipient — per-user delivery + read/delete state.
 *
 * High-volume table (one row per user × notification). Deliberately NOT
 * audited: every read/dismiss flip would flood AuditLog with noise.
 * Same opt-out logic as Attachment — auxiliary state, not business records.
 *
 * Soft delete via isDeleted/deletedAt for per-user dismissal (other
 * recipients of the same notification still see it). 90-day cleanup of
 * read+isDeleted rows is a TODO — see ADR-notification-routing-architecture.
 */
module.exports = (sequelize, DataTypes) => {
  const NotificationRecipient = sequelize.define(
    'NotificationRecipient',
    {
      recipientID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      notificationID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'NotificationRecipients',
      timestamps: true,
      updatedAt: false,
      paranoid: false,
      defaultScope: {
        // Hide dismissed rows by default. Endpoints that need them (none
        // currently) can use `unscoped()`.
        where: { isDeleted: false },
      },
      scopes: {
        includeDeleted: {},
      },
    },
  );

  NotificationRecipient.associate = (models) => {
    NotificationRecipient.belongsTo(models.Notification, {
      foreignKey: 'notificationID',
      as: 'notification',
    });
    NotificationRecipient.belongsTo(models.User, {
      foreignKey: 'userID',
      as: 'user',
    });
  };

  return NotificationRecipient;
};
