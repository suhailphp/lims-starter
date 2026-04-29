'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeIndex('Customers', 'idx_customers_email');

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_customers_email_unique
        ON "Customers" ("contactEmail")
        WHERE "contactEmail" IS NOT NULL AND "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_customers_email_unique;',
    );
    await queryInterface.addIndex('Customers', ['contactEmail'], {
      name: 'idx_customers_email',
    });
  },
};
