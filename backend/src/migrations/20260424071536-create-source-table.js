'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sources', {
      sourceID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      sourceTypeID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SourceTypes',
          key: 'sourceTypeID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      customerID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'customerID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
      sourceName: {
        type: Sequelize.STRING(200),
        allowNull: false,
        comment: 'Vessel name / Site name / Unit name',
      },
      equipmentName: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Main Engine / Generator / etc',
      },
      componentType: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Engine / Gearbox / Turbocharger',
      },
      model: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      make: {
        type: Sequelize.STRING(100),
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

    await queryInterface.addIndex('Sources', ['sourceTypeID'], {
      name: 'idx_sources_type',
    });
    await queryInterface.addIndex('Sources', ['customerID'], {
      name: 'idx_sources_customer',
    });
    await queryInterface.addIndex('Sources', ['categoryID'], {
      name: 'idx_sources_category',
    });
    await queryInterface.addIndex('Sources', ['sourceName'], {
      name: 'idx_sources_name',
    });
    await queryInterface.addIndex('Sources', ['isDeleted', 'isActive'], {
      name: 'idx_sources_status',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sources');
  },
};
