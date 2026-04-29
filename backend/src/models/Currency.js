'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define(
    'Currency',
    {
      currencyID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          isIso4217: (value) => {
            if (!/^[A-Z]{3}$/.test(value)) {
              throw new Error('code must be 3 uppercase letters');
            }
          },
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      symbol: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      decimalPlaces: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        validate: { isIn: [[0, 2, 3, 4]] },
      },
      isBase: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      displayOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: 'Currencies',
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

  Currency.associate = (models) => {
    Currency.hasMany(models.ExchangeRate, {
      foreignKey: 'currencyID',
      as: 'exchangeRates',
    });
  };

  applyAuditHooks(Currency);
  applyAuditLogging(Currency, 'currency');

  return Currency;
};
