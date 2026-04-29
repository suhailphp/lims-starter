'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      customerID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      contactName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      contactEmail: {
        type: Sequelize.STRING(150),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
      contactPhone: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      paymentTermsDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30,
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });

    await queryInterface.addIndex('Customers', ['name'], {
      name: 'idx_customers_name',
    });
    await queryInterface.addIndex('Customers', ['isDeleted', 'isActive'], {
      name: 'idx_customers_status',
    });
    await queryInterface.addIndex('Customers', ['contactEmail'], {
      name: 'idx_customers_email',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  },
};