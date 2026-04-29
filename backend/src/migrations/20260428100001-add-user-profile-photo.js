'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'profilePhotoAttachmentID', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'Attachments', key: 'attachmentID' },
      // SET NULL: if an attachment row is purged, the user keeps existing.
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Users', 'profilePhotoAttachmentID');
  },
};
