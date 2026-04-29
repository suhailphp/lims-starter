'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_units_category_name
      ON "Units" ("categoryID", LOWER("name"))
      WHERE "isDeleted" = false;
    `);

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_units_category_symbol
      ON "Units" ("categoryID", LOWER("symbol"))
      WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_units_category_name;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_units_category_symbol;');
  },
};
