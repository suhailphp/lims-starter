/* DOMAIN — Category entity (mirrors backend backend/src/models/Category.js) */

export type CategoryType = 'FUEL' | 'LUBRICANT' | 'WATER'

export interface Category {
  categoryID: string
  name: string
  type: CategoryType
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

export interface CategoryListParams {
  page?: number
  limit?: number
  search?: string
  type?: CategoryType
  isActive?: boolean
  sort?: 'name' | 'type' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface CategoryListResponse {
  data: Category[]
  meta: PageMeta
}

/** POST /api/categories + PUT /api/categories/:id body. */
export interface CategoryInput {
  name: string
  type: CategoryType
  isActive?: boolean
}

export const CATEGORY_TYPES: CategoryType[] = ['FUEL', 'LUBRICANT', 'WATER']
