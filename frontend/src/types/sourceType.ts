/* DOMAIN — SourceType entity (mirrors backend backend/src/models/SourceType.js) */

export interface SourceType {
  sourceTypeID: string
  name: string
  label: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

/** POST /api/source-types + PUT /api/source-types/:id body. */
export interface SourceTypeInput {
  name: string
  label: string
  isActive?: boolean
}

/** GET /api/source-types query params. */
export interface SourceTypeListParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  sort?: 'name' | 'label' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface SourceTypeListResponse {
  data: SourceType[]
  meta: PageMeta
}
