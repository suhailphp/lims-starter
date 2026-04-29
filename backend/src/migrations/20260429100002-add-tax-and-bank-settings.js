'use strict';

const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = [
      /* ---------- tenant: bank details (admin-only, not public) ---------- */
      ['tenant', 'bank_name',           '', 'STRING','Bank Name', 'Printed on quotes and invoices.', false, true, 200],
      ['tenant', 'bank_branch',         '', 'STRING','Bank Branch', '', false, true, 210],
      ['tenant', 'bank_account_number', '', 'STRING','Account Number', '', false, true, 220],
      ['tenant', 'bank_iban',           '', 'STRING','IBAN', 'International Bank Account Number.', false, true, 230],

      /* ---------- workflow: default tax rate (admin-only; auth required to read) ---------- */
      ['workflow', 'default_tax_rate_code', 'VAT_5', 'STRING','Default Tax Rate', 'Tax rate code applied to new quotes and invoices by default.', false, true, 50],
    ];

    const records = rows.map(([category, settingKey, value, valueType, displayLabel, description, isPublic, isEditable, displayOrder]) => ({
      settingID: crypto.randomUUID(),
      category,
      settingKey,
      value,
      valueType,
      displayLabel,
      description,
      isPublic,
      isEditable,
      displayOrder,
      createdBy: null,
      updatedBy: null,
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('Settings', records);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Settings', {
      settingKey: {
        [Sequelize.Op.in]: [
          'bank_name',
          'bank_branch',
          'bank_account_number',
          'bank_iban',
          'default_tax_rate_code',
        ],
      },
    });
  },
};
