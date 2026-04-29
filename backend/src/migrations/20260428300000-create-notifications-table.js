'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      notificationID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // Severity bucket — drives icon + color.
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      // Operational urgency. CRITICAL gets prominent display; LOW is muted.
      priority: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'LOW',
      },
      // How the audience was resolved when this row was created. Frozen
      // for traceability — re-running resolution later might pick a
      // different audience as users come and go.
      scope: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      // Where to navigate when clicked. Null = no navigation.
      link: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      // Optional polymorphic pointer to the entity that triggered this
      // notification. No FK because polymorphic.
      entityType: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      entityID: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      // Which user caused this notification to fire (e.g., admin who
      // reset another user's password). Null when system-generated.
      // No FK — same survival logic as AuditLog.userID.
      triggeredBy: {
        type: Sequelize.UUID,
        allowNull: true,
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
      // No updatedAt — Notification rows are immutable once created.
    });

    await queryInterface.addIndex('Notifications', ['createdAt'], {
      name: 'idx_notifications_created',
    });
    await queryInterface.addIndex('Notifications', ['entityType', 'entityID'], {
      name: 'idx_notifications_entity',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Notifications');
  },
};
