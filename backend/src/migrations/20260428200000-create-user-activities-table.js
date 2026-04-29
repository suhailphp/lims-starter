'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserActivities', {
      activityID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'userID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // user-centric feed; orphaned rows are useless
      },
      // Enum-ish — VARCHAR keeps schema flexible as we add new event types.
      // Application-side validation lives in the activityLogger.
      actionType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      actionLabel: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ipAddress: {
        type: Sequelize.STRING(45),  // IPv6-safe
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // No updatedAt — UserActivity rows are immutable. Same for AuditLogs.
    });

    // Hot path: "feed for this user, newest first".
    await queryInterface.addIndex('UserActivities', ['userID', 'createdAt'], {
      name: 'idx_user_activities_user_created',
    });
    await queryInterface.addIndex('UserActivities', ['actionType'], {
      name: 'idx_user_activities_type',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserActivities');
  },
};
