'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Currencies', {
      currencyID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(3),
        allowNull: false,
        comment: 'ISO 4217 currency code (uppercase, 3 chars). e.g. AED, USD, EUR.',
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      symbol: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      decimalPlaces: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      isBase: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Exactly one row may have isBase=true (enforced by partial unique index + service layer).',
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

    // Code is globally unique among non-deleted rows. LOWER() because we
    // store uppercase but want a case-insensitive guard against drift.
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_currencies_code_unique
        ON "Currencies" (LOWER("code"))
        WHERE "isDeleted" = false;
    `);

    // At most one base currency at any time.
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_currencies_single_base
        ON "Currencies" ("isBase")
        WHERE "isBase" = true AND "isDeleted" = false;
    `);

    await queryInterface.addIndex('Currencies', ['isDeleted', 'isActive'], {
      name: 'idx_currencies_status',
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_currencies_code_unique;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_currencies_single_base;');
    await queryInterface.dropTable('Currencies');
  },
};
