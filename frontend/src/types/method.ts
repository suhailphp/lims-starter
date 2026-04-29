/* DOMAIN — Method entity (mirrors backend backend/src/models/Method.js) */

export interface CategoryFK {
  categoryID?: string
  name: string
  type?: string
}

export interface TestFK {
  testID?: string
  name: string
  categoryID?: string
  category?: CategoryFK
}

export interface Method {
  methodID: string
  testID: string
  code: string
  description: string | null
  isDefault: boolean
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  // FK include from GET /api/methods (listAll) — Test → Category nested
  test?: TestFK
}

/** POST /api/methods body. */
export interface MethodInput {
  testID: string
  code: string
  description?: string | null
  isDefault?: boolean
  isActive?: boolean
}

/** PUT /api/methods/:id body — same minus testID (cannot move methods between tests). */
export interface MethodUpdateInput {
  code: string
  description?: string | null
  isDefault: boolean
  isActive: boolean
}

/** GET /api/methods query params (flat, master-data view). */
export interface MethodListParams {
  page?: number
  limit?: number
  search?: string
  testID?: string
  isDefault?: boolean
  isActive?: boolean
  sort?: 'code' | 'isDefault' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface MethodListResponse {
  data: Method[]
  meta: PageMeta
}
