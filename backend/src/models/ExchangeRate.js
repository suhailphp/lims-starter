'use strict';

const { applyAuditHooks } = require('../utils/auditHooks');
const { applyAuditLogging } = require('../utils/auditableModel');

module.exports = (sequelize, DataTypes) => {
  const ExchangeRate = sequelize.define(
    'ExchangeRate',
    {
      exchangeRateID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      currencyID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      // DECIMAL comes back as a string from pg to preserve precision; the
      // controller / consumers should Number() it at the boundary if math
      // is needed. We keep the string in transport so JSON doesn't lose
      // trailing zeros (1.000000 → 1).
      rate: {
        type: DataTypes.DECIMAL(15, 6),
        allowNull: false,
        validate: { min: 0 },
      },
      effectiveDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'manual',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdBy: { type: DataTypes.UUID, allowNull: true },
      updatedBy: { type: DataTypes.UUID, allowNull: true },
      deletedBy: { type: DataTypes.UUID, allowNull: true },
      deletedAt: { type: DataTypes.DATE, allowNull: true },
      isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {
      tableName: 'ExchangeRates',
      timestamps: true,
      paranoid: false,
      defaultScope: {
        where: { isDeleted: false },
      },
      scopes: {
        includeDeleted: {},
      },
    },
  );

  ExchangeRate.associate = (models) => {
    ExchangeRate.belongsTo(models.Currency, {
      foreignKey: 'currencyID',
      as: 'currency',
    });
  };

  applyAuditHooks(ExchangeRate);
  applyAuditLogging(ExchangeRate, 'exchangeRate');

  return ExchangeRate;
};
