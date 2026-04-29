'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeIndex('OcmElements', 'idx_ocm_elements_symbol');
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_ocm_elements_symbol_unique
        ON "OcmElements" (LOWER("symbol"))
        WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_ocm_elements_symbol_unique;',
    );
    await queryInterface.addIndex('OcmElements', ['symbol'], {
      name: 'idx_ocm_elements_symbol',
    });
  },
};
