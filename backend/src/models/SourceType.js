'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const SourceType = sequelize.define(
    'SourceType',
    {
      sourceTypeID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: 'SourceTypes',
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

  SourceType.associate = (models) => {
    SourceType.hasMany(models.Source, {
      foreignKey: 'sourceTypeID',
      as: 'sources',
    });
    // Future: SourceType.hasMany(models.Source, { foreignKey: 'sourceTypeID' });
  };

  applyAuditHooks(SourceType);
  applyAuditLogging(SourceType, 'sourceType');
  return SourceType;
};
