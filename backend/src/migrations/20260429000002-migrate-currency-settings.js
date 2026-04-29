'use strict';

const crypto = require('crypto');

/**
 * Migrate currency from Settings (currency_code/currency_symbol) to the
 * new Currencies + ExchangeRates master data.
 *
 *  1. Read existing currency_code + currency_symbol from Settings.
 *  2. Insert a Currency row (isBase=true, isActive=true).
 *  3. Insert the initial ExchangeRate row (rate=1.0, effectiveDate=today).
 *  4. Delete the two legacy Settings rows.
 *  5. Insert base_currency_code Setting (isEditable=false — managed via
 *     the Currencies module's Set Base flow).
 */

function currencyName(code) {
  // Tiny seed dictionary so the auto-migrated row reads sensibly. Anything
  // unknown falls back to the code itself; admins can rename in the UI.
  const map = {
    AED: 'UAE Dirham',
    USD: 'US Dollar',
    EUR: 'Euro',
    GBP: 'British Pound',
    SAR: 'Saudi Riyal',
    INR: 'Indian Rupee',
  };
  return map[code] || code;
}

function defaultDecimals(code) {
  // Most currencies are 2dp. A few exceptions (KWD/BHD/OMR = 3, JPY = 0)
  // matter for accounting; document as we encounter them.
  const threeDp = new Set(['KWD', 'BHD', 'OMR', 'JOD', 'TND']);
  const zeroDp  = new Set(['JPY', 'KRW', 'VND', 'CLP']);
  if (threeDp.has(code)) return 3;
  if (zeroDp.has(code))  return 0;
  return 2;
}

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    // Read the legacy currency settings (default to AED if missing).
    const [legacyRows] = await queryInterface.sequelize.query(
      `SELECT "settingKey", "value" FROM "Settings"
        WHERE "settingKey" IN ('currency_code', 'currency_symbol');`,
    );
    const legacy = Object.fromEntries(legacyRows.map((r) => [r.settingKey, r.value]));
    const code = (legacy.currency_code || 'AED').toUpperCase();
    const symbol = legacy.currency_symbol || code;

    // Insert base currency.
    const currencyID = crypto.randomUUID();
    await queryInterface.bulkInsert('Currencies', [{
      currencyID,
      code,
      name: currencyName(code),
      symbol,
      decimalPlaces: defaultDecimals(code),
      isBase: true,
      displayOrder: 0,
      createdBy: null,
      updatedBy: null,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
      isActive: true,
    }]);

    // Insert initial exchange rate (base = 1.0, no expiry).
    await queryInterface.bulkInsert('ExchangeRates', [{
      exchangeRateID: crypto.randomUUID(),
      currencyID,
      rate: 1.0,
      effectiveDate: today,
      expiryDate: null,
      source: 'system',
      notes: 'Initial rate created by migration when promoting Settings.currency_code to base currency.',
      createdBy: null,
      updatedBy: null,
      createdAt: now,
      updatedAt: now,
      isDeleted: false,
    }]);

    // Drop the two legacy Settings rows.
    await queryInterface.sequelize.query(
      `DELETE FROM "Settings" WHERE "settingKey" IN ('currency_code', 'currency_symbol');`,
    );

    // Insert base_currency_code setting. isEditable=false because base
    // currency changes go through the dedicated Set Base flow on the
    // Currencies module (atomic flip + audit). Direct edits would skip
    // that flow and leave the Currencies table out of sync.
    await queryInterface.bulkInsert('Settings', [{
      settingID: crypto.randomUUID(),
      category: 'localization',
      settingKey: 'base_currency_code',
      value: code,
      valueType: 'STRING',
      displayLabel: 'Base Currency',
      description: 'ISO 4217 code of the base currency. Manage in Currencies → Set as Base.',
      isPublic: true,
      isEditable: false,
      displayOrder: 10,
      createdBy: null,
      updatedBy: null,
      createdAt: now,
      updatedAt: now,
    }]);
  },

  async down(queryInterface) {
    // Re-create the two legacy rows from the current base currency.
    const now = new Date();
    const [baseRows] = await queryInterface.sequelize.query(
      `SELECT "code", "symbol" FROM "Currencies"
        WHERE "isBase" = true AND "isDeleted" = false LIMIT 1;`,
    );
    const code = baseRows[0]?.code || 'AED';
    const symbol = baseRows[0]?.symbol || 'د.إ';

    await queryInterface.sequelize.query(
      `DELETE FROM "Settings" WHERE "settingKey" = 'base_currency_code';`,
    );

    await queryInterface.bulkInsert('Settings', [
      {
        settingID: crypto.randomUUID(),
        category: 'localization',
        settingKey: 'currency_code',
        value: code,
        valueType: 'STRING',
        displayLabel: 'Currency Code',
        description: 'ISO 4217 code used for quotes and invoices.',
        isPublic: false,
        isEditable: true,
        displayOrder: 10,
        createdBy: null, updatedBy: null,
        createdAt: now, updatedAt: now,
      },
      {
        settingID: crypto.randomUUID(),
        category: 'localization',
        settingKey: 'currency_symbol',
        value: symbol,
        valueType: 'STRING',
        displayLabel: 'Currency Symbol',
        description: 'Glyph rendered next to currency values.',
        isPublic: false,
        isEditable: true,
        displayOrder: 20,
        createdBy: null, updatedBy: null,
        createdAt: now, updatedAt: now,
      },
    ]);

    await queryInterface.sequelize.query('DELETE FROM "ExchangeRates";');
    await queryInterface.sequelize.query('DELETE FROM "Currencies";');
  },
};
