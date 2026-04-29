'use strict';

/**
 * AuditLog — system-wide forensic data-change log.
 *
 * Distinct from UserActivity: AuditLog is for compliance reviewers asking
 * "who changed what". One row per write across every audited model
 * (12 currently: Customer, Category, ..., User, Attachment).
 *
 * Written automatically by `utils/auditableModel.js` Sequelize hooks.
 * Controllers don't call it directly.
 *
 * Immutable: no updatedAt, no soft delete. The whole point of an audit
 * trail is that it cannot be edited or deleted.
 *
 * No FK on userID — audit must survive user purge (the trail is the
 * record of WHAT THEY DID, even after they're deleted).
 */
const ACTIONS = ['CREATE', 'UPDATE', 'DELETE'];

module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    'AuditLog',
    {
      auditLogID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      entityID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: { isIn: [ACTIONS] },
      },
      // For UPDATE: { before: { field: oldVal }, after: { field: newVal } }
      // For CREATE: { after: { ...full row } }
      // For DELETE: { before: { ...full row at time of delete } }
      changes: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {},
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
      tableName: 'AuditLogs',
      timestamps: true,
      updatedAt: false, // immutable
      paranoid: false,
    },
  );

  return AuditLog;
};

module.exports.ACTIONS = ACTIONS;
