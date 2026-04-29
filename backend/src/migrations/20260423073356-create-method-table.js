'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Methods', {
      methodID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      testID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Tests',
          key: 'testID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      code: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.addIndex('Methods', ['testID'], { name: 'idx_methods_test' });
    await queryInterface.addIndex('Methods', ['code'], { name: 'idx_methods_code' });
    await queryInterface.addIndex('Methods', ['isDefault'], { name: 'idx_methods_default' });
    await queryInterface.addIndex('Methods', ['isDeleted', 'isActive'], {
      name: 'idx_methods_status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Methods');
  },
};
