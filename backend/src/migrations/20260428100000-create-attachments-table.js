'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attachments', {
      attachmentID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fileName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      mimeType: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      // Raw bytes (pre-base64). Lets the UI render "245 KB" without decoding.
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      // Base64-encoded body. No `data:` prefix — the client prefixes on render.
      fileData: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    // No isDeleted/deletedAt — Attachments are file storage, not business
    // records. Replacement = hard delete. See ADR-attachments-storage-strategy.
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Attachments');
  },
};
