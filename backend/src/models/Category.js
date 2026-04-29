'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      categoryID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('FUEL', 'LUBRICANT', 'WATER'),
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      deletedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: 'Categories',
      timestamps: true,
      paranoid: false,
      defaultScope: {
        where: { isDeleted: false },
      },
      scopes: {
        includeDeleted: {},
        activeOnly: {
          where: { isDeleted: false, isActive: true },
        },
      },
    },
  );

  Category.associate = (models) => {
    // Future associations:
    Category.hasMany(models.Unit, {
      foreignKey: 'categoryID',
      as: 'units',
    });
    Category.hasMany(models.Test, {
      foreignKey: 'categoryID',
      as: 'tests',
    });
    Category.hasMany(models.Source, {
      foreignKey: 'categoryID',
      as: 'sources',
    });
    // Category.hasMany(models.Unit, { foreignKey: 'categoryID', as: 'units' });
    // Category.hasMany(models.Test, { foreignKey: 'categoryID', as: 'tests' });
    // Category.hasMany(models.Source, { foreignKey: 'categoryID', as: 'sources' });
  };

  applyAuditHooks(Category);
  applyAuditLogging(Category, 'category');

  return Category;
};
