'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.removeIndex('SourceTypes', 'idx_source_types_name');

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_source_types_name_unique
        ON "SourceTypes" (LOWER("name"))
        WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_source_types_name_unique;',
    );
    await queryInterface.addIndex('SourceTypes', ['name'], {
      name: 'idx_source_types_name',
    });
  },
};
