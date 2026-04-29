'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Original create-table set both a column-level UNIQUE (auto-named "Users_email_key")
    // and a named unique index "idx_users_email". Drop both before creating the partial unique.
    await queryInterface.removeIndex('Users', 'idx_users_email');
    await queryInterface.sequelize.query(
      'ALTER TABLE "Users" DROP CONSTRAINT IF EXISTS "Users_email_key";',
    );

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX idx_users_email_unique
        ON "Users" (LOWER("email"))
        WHERE "isDeleted" = false;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP INDEX IF EXISTS idx_users_email_unique;',
    );
    await queryInterface.sequelize.query(
      'ALTER TABLE "Users" ADD CONSTRAINT "Users_email_key" UNIQUE ("email");',
    );
    await queryInterface.addIndex('Users', ['email'], {
      name: 'idx_users_email',
      unique: true,
    });
  },
};
