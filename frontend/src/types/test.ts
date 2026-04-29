/* DOMAIN — Test entity (mirrors backend backend/src/models/Test.js) */

export type TestResultType = 'NUMERIC' | 'TEXT' | 'THRESHOLD'

export interface CategoryFK {
  categoryID?: string
  name: string
  type?: string
}

export interface Test {
  testID: string
  categoryID: string
  name: string
  decimalPlaces: number
  resultType: TestResultType
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  // FK include from GET /api/tests (listAll)
  category?: CategoryFK
}

/** POST /api/tests body. */
export interface TestInput {
  categoryID: string
  name: string
  decimalPlaces?: number
  resultType?: TestResultType
  isActive?: boolean
}

/** PUT /api/tests/:id body — same minus categoryID (cannot move tests between categories). */
export interface TestUpdateInput {
  name: string
  decimalPlaces: number
  resultType: TestResultType
  isActive: boolean
}

/** GET /api/tests query params (flat, master-data view). */
export interface TestListParams {
  page?: number
  limit?: number
  search?: string
  categoryID?: string
  resultType?: TestResultType
  isActive?: boolean
  sort?: 'name' | 'resultType' | 'decimalPlaces' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface TestListResponse {
  data: Test[]
  meta: PageMeta
}
