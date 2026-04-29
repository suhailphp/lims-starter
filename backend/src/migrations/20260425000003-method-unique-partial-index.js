'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_methods_test_code
      ON "Methods" ("testID", LOWER("code"))
      WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_methods_test_code;');
  },
};
