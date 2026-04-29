'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      customerID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contactName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      contactEmail: {
        type: DataTypes.STRING(150),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      contactPhone: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      trn: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      paymentTermsDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
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
      tableName: 'Customers',
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

  Customer.associate = (models) => {
    Customer.hasMany(models.User, {
      foreignKey: 'customerID',
      as: 'users',
    });
     Customer.hasMany(models.Source, {
       foreignKey: 'customerID',
       as: 'sources',
     });
    // Future associations added as models are created
  };

  applyAuditHooks(Customer);
  applyAuditLogging(Customer, 'customer');

  return Customer;
};
