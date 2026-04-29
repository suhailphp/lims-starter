

/* DOMAIN — OcmElement entity (mirrors backend backend/src/models/OcmElement.js) */

export interface OcmElement {
  ocmElementID: string
  name: string
  symbol: string
  unit: string
  /** All range fields are nullable. Backend stores DECIMAL(12,4); the API
   * returns them as numeric strings (Sequelize default for DECIMAL). */
  normalRangeMin: number | string | null
  normalRangeMax: number | string | null
  cautionRangeMin: number | string | null
  cautionRangeMax: number | string | null
  criticalRangeMin: number | string | null
  criticalRangeMax: number | string | null
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

export interface OcmElementInput {
  name: string
  symbol: string
  unit?: string
  normalRangeMin?: number | null
  normalRangeMax?: number | null
  cautionRangeMin?: number | null
  cautionRangeMax?: number | null
  criticalRangeMin?: number | null
  criticalRangeMax?: number | null
  isActive?: boolean
}

export interface OcmElementListParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  sort?: 'name' | 'symbol' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface OcmElementListResponse {
  data: OcmElement[]
  meta: PageMeta
}
