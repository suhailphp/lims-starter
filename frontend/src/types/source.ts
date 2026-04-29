/* DOMAIN — Source entity (mirrors backend backend/src/models/Source.js) */

export interface SourceFK {
  customerID?: string
  name: string
}

export interface SourceTypeFK {
  sourceTypeID?: string
  name: string
  label?: string
}

export interface CategoryFK {
  categoryID?: string
  name: string
}

export interface Source {
  sourceID: string
  customerID: string
  sourceTypeID: string
  categoryID: string
  sourceName: string
  equipmentName: string | null
  componentType: string | null
  model: string | null
  make: string | null
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  // FK includes from GET /api/sources (listAll)
  customer?: SourceFK
  sourceType?: SourceTypeFK
  category?: CategoryFK
}

/** POST /api/sources body. */
export interface SourceInput {
  customerID: string
  sourceTypeID: string
  categoryID: string
  sourceName: string
  equipmentName?: string | null
  componentType?: string | null
  model?: string | null
  make?: string | null
  isActive?: boolean
}

/** PUT /api/sources/:id body — same shape minus customerID (cannot move sources between customers). */
export interface SourceUpdateInput {
  sourceTypeID: string
  categoryID: string
  sourceName: string
  equipmentName?: string | null
  componentType?: string | null
  model?: string | null
  make?: string | null
  isActive: boolean
}

/** GET /api/sources query params (flat, master-data view). */
export interface SourceListParams {
  page?: number
  limit?: number
  search?: string
  customerID?: string
  sourceTypeID?: string
  categoryID?: string
  isActive?: boolean
  sort?: 'sourceName' | 'equipmentName' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface SourceListResponse {
  data: Source[]
  meta: PageMeta
}
