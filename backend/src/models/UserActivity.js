'use strict';

/**
 * UserActivity — user-facing personal feed (Profile page).
 *
 * Distinct from AuditLog: this powers a feed for the user themselves
 * ("Logged in", "Profile updated"). Includes auth events that don't
 * mutate any record. AuditLog is for forensic data-change tracking.
 *
 * Immutable: no updatedAt, no soft delete. Created by
 * `services/activityLogger.js` from controllers (NOT via Sequelize hooks
 * since LOGIN isn't a row mutation).
 */
const ACTION_TYPES = [
  'LOGIN',
  'LOGIN_FAILED',
  'LOGOUT',
  'PROFILE_UPDATED',
  'PHOTO_UPDATED',
  'PASSWORD_CHANGED',
  'PASSWORD_RESET',
];

module.exports = (sequelize, DataTypes) => {
  const UserActivity = sequelize.define(
    'UserActivity',
    {
      activityID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      actionType: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: { isIn: [ACTION_TYPES] },
      },
      actionLabel: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      userAgent: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      tableName: 'UserActivities',
      timestamps: true,
      // Override Sequelize's default to drop updatedAt — UserActivity rows
      // are immutable.
      updatedAt: false,
      paranoid: false,
    },
  );

  UserActivity.associate = (models) => {
    UserActivity.belongsTo(models.User, { foreignKey: 'userID', as: 'user' });
  };

  return UserActivity;
};

module.exports.ACTION_TYPES = ACTION_TYPES;
