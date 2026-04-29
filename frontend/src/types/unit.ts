/* DOMAIN — Unit entity (mirrors backend backend/src/models/Unit.js) */

export interface CategoryFK {
  categoryID?: string
  name: string
  type?: string
}

export interface Unit {
  unitID: string
  categoryID: string
  name: string
  symbol: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  // FK include from GET /api/units (listAll)
  category?: CategoryFK
}

/** POST /api/units body. */
export interface UnitInput {
  categoryID: string
  name: string
  symbol: string
  isActive?: boolean
}

/** PUT /api/units/:id body — same minus categoryID (cannot move units between categories). */
export interface UnitUpdateInput {
  name: string
  symbol: string
  isActive: boolean
}

/** GET /api/units query params (flat, master-data view). */
export interface UnitListParams {
  page?: number
  limit?: number
  search?: string
  categoryID?: string
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

export interface UnitListResponse {
  data: Unit[]
  meta: PageMeta
}
