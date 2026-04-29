'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /* Initial setting catalog. Each row carries its own type + label +
     * help text so the frontend can build a self-describing form without
     * a separate config file. `isPublic` rows are returned by
     * /api/settings/public (unauth) — keep this list tight: only what the
     * login + header pages need before auth completes. */
    const now = new Date();
    const rows = [
      /* ---------- tenant ---------- */
      ['tenant', 'lab_name',           'Demo Company',  'STRING','Lab Name', 'Display name shown in the header and on reports.', true, true, 10],
      ['tenant', 'lab_short_name',     'DEMO',          'STRING','Short Name', 'Compact label used in the sidebar logo and browser tab.', true, true, 20],
      ['tenant', 'lab_logo_attachment_id', null,         'IMAGE', 'Lab Logo', 'Replaces the placeholder logo on the header and login page.', true, true, 30],
      ['tenant', 'lab_address',        '',              'STRING','Address Line', 'Street address used on reports and PDFs.', false, true, 40],
      ['tenant', 'lab_city',           '',              'STRING','City', '', false, true, 50],
      ['tenant', 'lab_country',        '',              'STRING','Country', '', false, true, 60],
      ['tenant', 'lab_phone',          '',              'STRING','Phone', '', false, true, 70],
      ['tenant', 'lab_email',          '',              'STRING','Email', '', false, true, 80],
      ['tenant', 'lab_website',        '',              'STRING','Website', 'Public site link shown on the login page.', true, true, 90],
      ['tenant', 'lab_license_number', '',              'STRING','Lab License #', 'Regulatory license number printed on reports.', false, true, 100],
      ['tenant', 'lab_tax_number',     '',              'STRING','Tax Number', 'VAT / TRN number printed on quotes and invoices.', false, true, 110],

      /* ---------- localization ---------- */
      ['localization', 'currency_code',       'USD',         'STRING','Currency Code', 'ISO 4217 code used for quotes and invoices.', false, true, 10],
      ['localization', 'currency_symbol',     '$',           'STRING','Currency Symbol', 'Glyph rendered next to currency values.', false, true, 20],
      ['localization', 'timezone',            'UTC',         'STRING','Timezone', 'IANA timezone used for date formatting.', false, true, 30],
      ['localization', 'date_format',         'DD/MM/YYYY',  'STRING','Date Format', '', false, true, 40],
      ['localization', 'time_format',         '24h',         'STRING','Time Format', '12-hour or 24-hour clock.', false, true, 50],
      ['localization', 'decimal_separator',   '.',           'STRING','Decimal Separator', '', false, true, 60],
      ['localization', 'thousand_separator',  ',',           'STRING','Thousand Separator', '', false, true, 70],

      /* ---------- system (security + storage)  ----------
       * `password_min_length` and `session_timeout_minutes` are stored
       * but not yet wired — they exist so future modules can read them
       * without another migration. */
      ['system', 'session_timeout_minutes', '60',  'NUMBER', 'Session Timeout (min)', 'Idle timeout. Stored only — runtime wiring pending.', false, true, 10],
      ['system', 'max_login_attempts',     '5',   'NUMBER', 'Max Login Attempts', 'Failures before the account is locked. Live.', false, true, 20],
      ['system', 'account_lockout_minutes','30',  'NUMBER', 'Account Lockout (min)', 'Lockout duration after exceeding max attempts. Live.', false, true, 30],
      ['system', 'password_min_length',    '8',   'NUMBER', 'Password Minimum Length', 'Stored only — runtime wiring pending.', false, true, 40],
      ['system', 'max_attachment_size_kb', '500', 'NUMBER', 'Max Upload Size (KB)', 'Per-attachment size cap. Live.', false, true, 50],

      /* ---------- workflow (defaults for future modules) ---------- */
      ['workflow', 'sample_serial_prefix',       'LS',                            'STRING','Sample Serial Prefix', '', false, true, 10],
      ['workflow', 'sample_serial_format',       'PREFIX-YYYYMMDD-XXXXX',         'STRING','Sample Serial Format', 'Sample number template. Stored — wired during Sample Intake.', false, false, 20],
      ['workflow', 'report_number_format',       'RP-YYMMDD-XXX',                 'STRING','Report Number Format', 'Report number template. Stored — wired during Reports.', false, false, 30],
      ['workflow', 'default_quote_validity_days','30',                             'NUMBER','Quote Validity (days)', 'Default quote validity. Stored — wired during Quotes.', false, true, 40],
    ];

    const records = rows.map(([category, settingKey, value, valueType, displayLabel, description, isPublic, isEditable, displayOrder]) => ({
      settingID: require('crypto').randomUUID(),
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

  async down(queryInterface) {
    await queryInterface.bulkDelete('Settings', null, {});
  },
};
