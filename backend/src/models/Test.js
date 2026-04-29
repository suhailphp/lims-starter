'use strict';

module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    'Test',
    {
      testID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      categoryID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      decimalPlaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      resultType: {
        type: DataTypes.ENUM('NUMERIC', 'TEXT', 'THRESHOLD'),
        allowNull: false,
        defaultValue: 'NUMERIC',
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: 'Tests',
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

  Test.associate = (models) => {
    Test.belongsTo(models.Category, {
      foreignKey: 'categoryID',
      as: 'category',
    });
    Test.hasMany(models.Method, {
      foreignKey: 'testID',
      as: 'methods',
    });
  };

  const { applyAuditHooks } = require('../utils/auditHooks');
  const { applyAuditLogging } = require('../utils/auditableModel');
  applyAuditHooks(Test);
  applyAuditLogging(Test, 'test');

  return Test;
};
