/* DOMAIN — curated currency list for the localization form.
 *
 * Picked to cover the lab's likely customer base: GCC + South Asia +
 * common reserve currencies. Adding more is a one-line edit. The
 * `symbol` field doubles as the default for `currency_symbol` when the
 * code changes — keeps the two settings in sync. */

export interface CurrencyOption {
  code: string
  name: string
  symbol: string
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'AED', name: 'UAE Dirham',         symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal',        symbol: 'ر.س' },
  { code: 'KWD', name: 'Kuwaiti Dinar',      symbol: 'د.ك' },
  { code: 'OMR', name: 'Omani Rial',         symbol: 'ر.ع.' },
  { code: 'BHD', name: 'Bahraini Dinar',     symbol: '.د.ب' },
  { code: 'QAR', name: 'Qatari Riyal',       symbol: 'ر.ق' },
  { code: 'JOD', name: 'Jordanian Dinar',    symbol: 'د.أ' },
  { code: 'EGP', name: 'Egyptian Pound',     symbol: 'ج.م' },
  { code: 'USD', name: 'US Dollar',          symbol: '$' },
  { code: 'EUR', name: 'Euro',               symbol: '€' },
  { code: 'GBP', name: 'Pound Sterling',     symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar',    symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar',  symbol: 'A$' },
  { code: 'INR', name: 'Indian Rupee',       symbol: '₹' },
  { code: 'PKR', name: 'Pakistani Rupee',    symbol: '₨' },
]
