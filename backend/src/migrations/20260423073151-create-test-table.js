'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tests', {
      testID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      categoryID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'categoryID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      decimalPlaces: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      resultType: {
        type: Sequelize.ENUM('NUMERIC', 'TEXT', 'THRESHOLD'),
        allowNull: false,
        defaultValue: 'NUMERIC',
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

    await queryInterface.addIndex('Tests', ['categoryID'], { name: 'idx_tests_category' });
    await queryInterface.addIndex('Tests', ['name'], { name: 'idx_tests_name' });
    await queryInterface.addIndex('Tests', ['isDeleted', 'isActive'], { name: 'idx_tests_status' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tests');
  },
};
