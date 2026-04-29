'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OcmElements', {
      ocmElementID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Iron, Copper, Silicon, Aluminum etc',
      },
      symbol: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: 'Fe, Cu, Si, Al',
      },
      unit: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'ppm',
      },
      normalRangeMin: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      normalRangeMax: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      cautionRangeMin: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      cautionRangeMax: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      criticalRangeMin: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      criticalRangeMax: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: true,
      },
      createdBy: { type: Sequelize.UUID, allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedBy: { type: Sequelize.UUID, allowNull: true },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedBy: { type: Sequelize.UUID, allowNull: true },
      deletedAt: { type: Sequelize.DATE, allowNull: true },
      isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    });

    await queryInterface.addIndex('OcmElements', ['name'], {
      name: 'idx_ocm_elements_name',
    });
    await queryInterface.addIndex('OcmElements', ['symbol'], {
      name: 'idx_ocm_elements_symbol',
    });
    await queryInterface.addIndex('OcmElements', ['isDeleted', 'isActive'], {
      name: 'idx_ocm_elements_status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OcmElements');
  },
};
