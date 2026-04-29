'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Specifications', {
      specificationID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
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

    await queryInterface.addIndex('Specifications', ['name'], {
      name: 'idx_specifications_name',
    });
    await queryInterface.addIndex('Specifications', ['isDeleted', 'isActive'], {
      name: 'idx_specifications_status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Specifications');
  },
};
