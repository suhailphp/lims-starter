'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeIndex('Categories', 'idx_categories_name');

    // Case-insensitive unique on non-deleted rows.
    // Soft-deleted "Diesel" can coexist with a freshly created "Diesel".
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_categories_name_unique
        ON "Categories" (LOWER("name"))
        WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_categories_name_unique;',
    );
    await queryInterface.addIndex('Categories', ['name'], {
      name: 'idx_categories_name',
    });
  },
};
