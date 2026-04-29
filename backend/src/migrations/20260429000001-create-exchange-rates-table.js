'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExchangeRates', {
      exchangeRateID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      currencyID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Currencies', key: 'currencyID' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      rate: {
        type: Sequelize.DECIMAL(15, 6),
        allowNull: false,
        comment: 'Units of THIS currency per 1 unit of base currency. Base currency rate is always 1.000000.',
      },
      effectiveDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: 'NULL = currently active rate. Set when a newer rate supersedes this one.',
      },
      source: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'manual',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    });

    await queryInterface.sequelize.query(`
      CREATE INDEX idx_exchange_rates_currency_effective
        ON "ExchangeRates" ("currencyID", "effectiveDate" DESC);
    `);

    await queryInterface.addIndex('ExchangeRates', ['effectiveDate', 'expiryDate'], {
      name: 'idx_exchange_rates_date_range',
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_exchange_rates_currency_effective;');
    await queryInterface.dropTable('ExchangeRates');
  },
};
