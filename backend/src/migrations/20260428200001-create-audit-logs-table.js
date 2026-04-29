'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditLogs', {
      auditLogID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // Who. Deliberately NO FK constraint — audit must survive user purge
      // (compliance requirement: deleting a user does not erase their trail).
      userID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      // What entity. Polymorphic key — entityType chooses the target table,
      // entityID points to that row. No FK because polymorphic.
      entityType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      entityID: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      // CREATE / UPDATE / DELETE. VARCHAR(20) instead of ENUM so adding new
      // values (e.g. RESTORE) doesn't require a migration.
      action: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      // For UPDATE: { before: { field: oldValue }, after: { field: newValue } } — diff only.
      // For CREATE: { after: { ...full row } }.
      // For DELETE: { before: { ...full row at time of delete } }.
      // Audit-excluded fields (User.password, Attachment.fileData) are
      // stripped by the auditableModel factory before this is written.
      changes: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      ipAddress: {
        type: Sequelize.STRING(45),
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
    });

    // History of one record (Module 8 detail panel).
    await queryInterface.addIndex(
      'AuditLogs',
      ['entityType', 'entityID', 'createdAt'],
      { name: 'idx_audit_logs_entity_created' },
    );
    // What did this user change recently.
    await queryInterface.addIndex(
      'AuditLogs',
      ['userID', 'createdAt'],
      { name: 'idx_audit_logs_user_created' },
    );
    // Time-based scans for compliance reports.
    await queryInterface.addIndex('AuditLogs', ['createdAt'], {
      name: 'idx_audit_logs_created',
    });
    await queryInterface.addIndex('AuditLogs', ['action'], {
      name: 'idx_audit_logs_action',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('AuditLogs');
  },
};
