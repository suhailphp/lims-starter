'use strict';

module.exports = (sequelize, DataTypes) => {
  const Method = sequelize.define(
    'Method',
    {
      methodID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      testID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: 'Methods',
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

  Method.associate = (models) => {
    Method.belongsTo(models.Test, {
      foreignKey: 'testID',
      as: 'test',
    });
  };

  const { applyAuditHooks } = require('../utils/auditHooks');
  const { applyAuditLogging } = require('../utils/auditableModel');
  applyAuditHooks(Method);
  applyAuditLogging(Method, 'method');

  return Method;
};
