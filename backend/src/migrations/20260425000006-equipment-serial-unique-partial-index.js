'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeIndex('Equipments', 'idx_equipments_serial');
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_equipments_serial_unique
        ON "Equipments" (LOWER("serialNumber"))
        WHERE "isDeleted" = false AND "serialNumber" IS NOT NULL;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_equipments_serial_unique;',
    );
    await queryInterface.addIndex('Equipments', ['serialNumber'], {
      name: 'idx_equipments_serial',
    });
  },
};
