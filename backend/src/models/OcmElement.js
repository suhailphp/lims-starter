'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const OcmElement = sequelize.define(
    'OcmElement',
    {
      ocmElementID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'ppm',
      },
      normalRangeMin: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      normalRangeMax: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      cautionRangeMin: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      cautionRangeMax: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      criticalRangeMin: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      criticalRangeMax: {
        type: DataTypes.DECIMAL(12, 4),
        allowNull: true,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: 'OcmElements',
      timestamps: true,
      paranoid: false,
      defaultScope: {
        where: { isDeleted: false },
      },
      scopes: {
        includeDeleted: {},
        activeOnly: { where: { isDeleted: false, isActive: true } },
      },
    },
  );

  OcmElement.associate = (models) => {
    // Future: OcmElement.hasMany(models.OcmElementResult, { foreignKey: 'ocmElementID' });
  };

  applyAuditHooks(OcmElement);
  applyAuditLogging(OcmElement, 'ocmElement');
  return OcmElement;
};
