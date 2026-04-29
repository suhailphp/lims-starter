/* DOMAIN — Currency + ExchangeRate (mirrors backend models). */

export interface ExchangeRate {
  exchangeRateID: string
  currencyID: string
  /** DECIMAL(15,6) — string from pg to preserve precision. */
  rate: string
  effectiveDate: string
  expiryDate: string | null
  source: string
  notes: string | null
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  deletedAt: string | null
  isDeleted: boolean
}

/** Returned by list/detail with the currentRate computed by the controller.
 *  For base currency the controller returns a synthetic
 *  { rate: '1.000000', effectiveDate: null, source: 'base' }. */
export type CurrentRate =
  | ExchangeRate
  | { rate: string; effectiveDate: null; source: 'base' }

export interface Currency {
  currencyID: string
  code: string
  name: string
  symbol: string
  decimalPlaces: 0 | 2 | 3 | 4
  isBase: boolean
  displayOrder: number
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  deletedAt: string | null
  /** Attached by GET /api/currencies and /api/currencies/:id. */
  currentRate?: CurrentRate | null
}

export interface CurrencyCreateInput {
  code: string
  name: string
  symbol: string
  decimalPlaces: 0 | 2 | 3 | 4
  displayOrder: number
  isActive?: boolean
  /** Required when not creating the first currency (which auto-becomes base). */
  initialRate?: number
  initialRateEffectiveDate?: string
}

export interface CurrencyUpdateInput {
  name: string
  symbol: string
  decimalPlaces: 0 | 2 | 3 | 4
  displayOrder: number
  isActive: boolean
}

export interface CurrencyListParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  isBase?: boolean
  sort?: 'code' | 'name' | 'displayOrder' | 'isBase' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface ExchangeRateListParams {
  page?: number
  limit?: number
  sort?: 'effectiveDate' | 'createdAt'
  order?: 'asc' | 'desc'
}

export interface ExchangeRateCreateInput {
  rate: number
  effectiveDate: string
  source?: string
  notes?: string
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface CurrencyListResponse {
  data: Currency[]
  meta: PageMeta
}

export interface ExchangeRateListResponse {
  data: ExchangeRate[]
  meta: PageMeta
}
