'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Customers', 'trn', {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: 'Tax Registration Number (UAE/GCC). Optional. Format varies by country.',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Customers', 'trn');
  },
};
