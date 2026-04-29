/* DOMAIN — Equipment entity (mirrors backend backend/src/models/Equipment.js) */

export type CalibrationStatus = 'VALID' | 'DUE_SOON' | 'OVERDUE' | 'UNKNOWN'

export interface Equipment {
  equipmentID: string
  name: string
  model: string | null
  serialNumber: string | null
  /** "YYYY-MM-DD" or null. Backend column is DATEONLY. */
  calibrationDueDate: string | null
  /** Virtual field — server-computed via Sequelize getterMethods. */
  calibrationStatus: CalibrationStatus
  isActive: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string | null
  updatedBy: string | null
  deletedBy: string | null
}

/** POST + PUT body. */
export interface EquipmentInput {
  name: string
  model?: string | null
  serialNumber?: string | null
  calibrationDueDate?: string | null
  isActive?: boolean
}

export interface EquipmentListParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  calibrationStatus?: CalibrationStatus
  sort?: 'name' | 'serialNumber' | 'calibrationDueDate' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
}

export interface PageMeta {
  total: number
  page: number
  limit: number
  totalPages?: number
}

export interface EquipmentListResponse {
  data: Equipment[]
  meta: PageMeta
}

export const CALIBRATION_STATUSES: CalibrationStatus[] = [
  'VALID',
  'DUE_SOON',
  'OVERDUE',
  'UNKNOWN',
]
