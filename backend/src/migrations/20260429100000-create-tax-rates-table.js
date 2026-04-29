'use strict';

const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaxRates', {
      taxRateID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment: 'Uppercase alphanumeric + underscore. e.g. VAT_5, EXEMPT.',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      rate: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        comment: 'Percentage value (0.00–999.99). e.g. 5.00 = 5%.',
      },
      type: {
        type: Sequelize.ENUM('PERCENTAGE'),
        allowNull: false,
        defaultValue: 'PERCENTAGE',
        comment: "'FIXED' reserved for future; only PERCENTAGE used in v1.",
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Exactly one row may have isDefault=true (enforced by partial unique index + service layer).',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdBy: { type: Sequelize.UUID, allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedBy: { type: Sequelize.UUID, allowNull: true },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedBy: { type: Sequelize.UUID, allowNull: true },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
      isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });

    // Code is globally unique among non-deleted rows. LOWER() matches the
    // case-insensitive guard already used on Currencies.
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_tax_rates_code_unique
        ON "TaxRates" (LOWER("code"))
        WHERE "isDeleted" = false;
    `);

    // At most one default tax rate at any time.
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_tax_rates_single_default
        ON "TaxRates" ("isDefault")
        WHERE "isDefault" = true AND "isDeleted" = false;
    `);

    await queryInterface.addIndex('TaxRates', ['isDeleted', 'isActive'], {
      name: 'idx_tax_rates_status',
    });

    // Seed initial four tax rates.
    const now = new Date();
    await queryInterface.bulkInsert('TaxRates', [
      {
        taxRateID: crypto.randomUUID(),
        code: 'VAT_5',
        name: 'UAE Standard VAT 5%',
        rate: 5.00,
        type: 'PERCENTAGE',
        isDefault: true,
        description: null,
        displayOrder: 1,
        createdBy: null,
        updatedBy: null,
        createdAt: now,
        updatedAt: now,
        isDeleted: false,
        isActive: true,
      },
      {
        taxRateID: crypto.randomUUID(),
        code: 'EXEMPT',
        name: 'Tax Exempt (0%)',
        rate: 0.00,
        type: 'PERCENTAGE',
        isDefault: false,
        description: null,
        displayOrder: 2,
        createdBy: null,
        updatedBy: null,
        createdAt: now,
        updatedAt: now,
        isDeleted: false,
        isActive: true,
      },
      {
        taxRateID: crypto.randomUUID(),
        code: 'VAT_10',
        name: 'Standard 10%',
        rate: 10.00,
        type: 'PERCENTAGE',
        isDefault: false,
        description: null,
        displayOrder: 3,
        createdBy: null,
        updatedBy: null,
        createdAt: now,
        updatedAt: now,
        isDeleted: false,
        isActive: true,
      },
      {
        taxRateID: crypto.randomUUID(),
        code: 'GCC_5',
        name: 'GCC Standard 5%',
        rate: 5.00,
        type: 'PERCENTAGE',
        isDefault: false,
        description: null,
        displayOrder: 4,
        createdBy: null,
        updatedBy: null,
        createdAt: now,
        updatedAt: now,
        isDeleted: false,
        isActive: true,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_tax_rates_code_unique;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_tax_rates_single_default;');
    await queryInterface.dropTable('TaxRates');
    // Drop the ENUM type Postgres creates for the type column.
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_TaxRates_type";');
  },
};
