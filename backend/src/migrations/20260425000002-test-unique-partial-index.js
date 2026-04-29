'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_tests_category_name
      ON "Tests" ("categoryID", LOWER("name"))
      WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_tests_category_name;');
  },
};
