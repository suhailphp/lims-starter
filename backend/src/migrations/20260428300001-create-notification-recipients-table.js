'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotificationRecipients', {
      recipientID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      notificationID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Notifications', key: 'notificationID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'userID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      // Per-user dismissal. Soft-delete now; cleanup job (90-day purge of
      // read+isDeleted rows) is a TODO — see ADR-notification-routing-architecture.
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // No updatedAt — read/delete flips are tracked via readAt/deletedAt.
    });

    // One row per (notification, user). Defense against accidental
    // double-resolution if the same user matches multiple resolver paths.
    await queryInterface.addConstraint('NotificationRecipients', {
      fields: ['notificationID', 'userID'],
      type: 'unique',
      name: 'uq_notification_recipients_notif_user',
    });

    // Hot path: "my unread feed, newest first". Index covers the most
    // common query: WHERE userID = ? AND isRead = false ORDER BY createdAt DESC.
    await queryInterface.addIndex(
      'NotificationRecipients',
      ['userID', 'isRead', 'createdAt'],
      { name: 'idx_notification_recipients_user_read_created' },
    );
    await queryInterface.addIndex('NotificationRecipients', ['notificationID'], {
      name: 'idx_notification_recipients_notification',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('NotificationRecipients');
  },
};
