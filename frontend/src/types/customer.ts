/* DOMAIN — Customer entity (mirrors backend backend/src/models/Customer.js) */

export interface Customer {
  customerID: string
  name: string
  address: string | null
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
  paymentTermsDays: number
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

/** POST /api/customers + PUT /api/customers/:id body. */
export interface CustomerInput {
  name: string
  address: string | null
  contactName: string | null
  contactEmail: string | null
  contactPhone: string | null
  paymentTermsDays?: number
  isActive?: boolean
}

/** GET /api/customers query params. */
export interface CustomerListParams {
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

export interface CustomerListResponse {
  data: Customer[]
  meta: PageMeta
}
