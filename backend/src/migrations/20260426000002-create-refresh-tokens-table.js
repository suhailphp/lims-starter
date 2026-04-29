'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RefreshTokens', {
      tokenID: {
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
        onDelete: 'CASCADE',
      },
      tokenHash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      revokedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      replacedByTokenID: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      ipAddress: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      userAgent: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('RefreshTokens', ['tokenHash'], {
      name: 'idx_refresh_tokens_hash',
      unique: true,
    });
    await queryInterface.addIndex('RefreshTokens', ['userID'], {
      name: 'idx_refresh_tokens_user',
    });
    await queryInterface.addIndex('RefreshTokens', ['expiresAt'], {
      name: 'idx_refresh_tokens_expires',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('RefreshTokens');
  },
};
