'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');

/**
 * Setting — key/value configuration row.
 *
 * Single table for all categories (tenant / localization / system /
 * workflow). The (category, settingKey) pair is unique. Values are
 * stored as TEXT regardless of the logical type — `valueType` tells
 * the service how to coerce on read/write.
 *
 * Audit: hooks set createdBy/updatedBy + bumps updatedAt. NOT registered
 * with applyAuditLogging — the Setting row IS the configuration trail
 * (its updatedAt is the change timestamp; the previous value is gone by
 * design — settings aren't versioned). Add audit logging if regulators
 * demand a change history later.
 */
const VALUE_TYPES = ['STRING', 'NUMBER', 'BOOLEAN', 'JSON', 'IMAGE'];

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    'Setting',
    {
      settingID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      settingKey: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      valueType: {
        type: DataTypes.ENUM(...VALUE_TYPES),
        allowNull: false,
        defaultValue: 'STRING',
      },
      displayLabel: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isEditable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
    },
    {
      tableName: 'Settings',
      timestamps: true,
      paranoid: false,
    },
  );

  applyAuditHooks(Setting);
  return Setting;
};

module.exports.VALUE_TYPES = VALUE_TYPES;
