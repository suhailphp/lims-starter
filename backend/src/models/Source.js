'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const Source = sequelize.define(
    'Source',
    {
      sourceID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sourceTypeID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      customerID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      categoryID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      sourceName: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      equipmentName: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      componentType: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      model: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      make: {
        type: DataTypes.STRING(100),
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
      tableName: 'Sources',
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

  Source.associate = (models) => {
    Source.belongsTo(models.SourceType, {
      foreignKey: 'sourceTypeID',
      as: 'sourceType',
    });
    Source.belongsTo(models.Customer, {
      foreignKey: 'customerID',
      as: 'customer',
    });
    Source.belongsTo(models.Category, {
      foreignKey: 'categoryID',
      as: 'category',
    });
  };

  applyAuditHooks(Source);
  applyAuditLogging(Source, 'source');
  return Source;
};
