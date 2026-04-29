/* DOMAIN — Specification entity (mirrors backend backend/src/models/Specification.js) */

export interface Specification {
  specificationID: string
  name: string
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

/** POST /api/specifications + PUT /api/specifications/:id body. */
export interface SpecificationInput {
  name: string
  isActive?: boolean
}

/** GET /api/specifications query params. */
export interface SpecificationListParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  sort?: 'name' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface SpecificationListResponse {
  data: Specification[]
  meta: PageMeta
}
