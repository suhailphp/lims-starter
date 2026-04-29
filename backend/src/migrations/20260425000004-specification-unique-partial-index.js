'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeIndex('Specifications', 'idx_specifications_name');

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_specifications_name_unique
        ON "Specifications" (LOWER("name"))
        WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_specifications_name_unique;',
    );
    await queryInterface.addIndex('Specifications', ['name'], {
      name: 'idx_specifications_name',
    });
  },
};
