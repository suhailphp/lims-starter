'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Equipments', {
      equipmentID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      serialNumber: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      calibrationDueDate: {
        type: Sequelize.DATEONLY,
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

    await queryInterface.addIndex('Equipments', ['name'], {
      name: 'idx_equipments_name',
    });
    await queryInterface.addIndex('Equipments', ['serialNumber'], {
      name: 'idx_equipments_serial',
    });
    await queryInterface.addIndex('Equipments', ['calibrationDueDate'], {
      name: 'idx_equipments_calibration',
    });
    await queryInterface.addIndex('Equipments', ['isDeleted', 'isActive'], {
      name: 'idx_equipments_status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipments');
  },
};
