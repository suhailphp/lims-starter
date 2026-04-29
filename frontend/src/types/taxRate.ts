/* DOMAIN — TaxRate (mirrors backend models). */

export type TaxRateType = 'PERCENTAGE'

export interface TaxRate {
  taxRateID: string
  code: string
  name: string
  /** DECIMAL(5,2) — string from pg to preserve precision. */
  rate: string
  type: TaxRateType
  isDefault: boolean
  description: string | null
  displayOrder: number
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
  deletedAt: string | null
}

export interface TaxRateCreateInput {
  code: string
  name: string
  rate: number
  type?: TaxRateType
  description?: string | null
  displayOrder: number
  isActive?: boolean
}

export interface TaxRateUpdateInput {
  name: string
  rate: number
  type?: TaxRateType
  description?: string | null
  displayOrder: number
  isActive: boolean
}

export interface TaxRateListParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  isDefault?: boolean
  sort?: 'code' | 'name' | 'rate' | 'displayOrder' | 'isDefault' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface TaxRateListResponse {
  data: TaxRate[]
  meta: PageMeta
}
