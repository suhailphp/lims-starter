/* DOMAIN — Admin dashboard payload shape.
 * Mirrors backend/src/modules/dashboard/dashboard.service.js#getAdminStats. */

import type { Attachment } from '@/types/attachment'
import type { UserRole } from '@/types/user'

export type EquipmentCalibrationStatus =
  | 'VALID'
  | 'DUE_SOON'
  | 'OVERDUE'
  | 'UNKNOWN'

export interface DashboardActor {
  userID: string
  firstName: string
  lastName: string
  role: UserRole
  profilePhotoAttachmentID: string | null
  profilePhoto?: Attachment | null
}

export interface DashboardMetrics {
  customers: number
  tests: number
  equipment: number
  users: number
  methods: number
  categories: number
  sources: number
  sourceTypes: number
  units: number
  specifications: number
  ocmElements: number
  masterData: number
}

export interface DashboardActivityPoint {
  date: string // YYYY-MM-DD
  count: number
}

export interface DashboardDistributionSlice {
  label: string
  count: number
  color: string
}

export interface DashboardEquipmentAlert {
  equipmentID: string
  name: string
  model: string | null
  serialNumber: string | null
  calibrationDueDate: string | null
  calibrationStatus: EquipmentCalibrationStatus
}

export interface DashboardAuditActivity {
  source: 'audit_log'
  id: string
  createdAt: string
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  entityType: string
  entityID: string
  actor: DashboardActor | null
}

export interface DashboardUserActivity {
  source: 'user_activity'
  id: string
  createdAt: string
  actionType: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED'
  actionLabel: string
  actor: DashboardActor | null
}

export type DashboardActivity = DashboardAuditActivity | DashboardUserActivity

export interface DashboardEquipmentStatus {
  valid: number
  dueSoon: number
  overdue: number
  unknown: number
  inactive: number
  total: number
}

export interface DashboardQuickStats {
  activitiesToday: number
  activeUsers24h: number
  pendingCalibrations: number
  recentLoginsToday: number
}

export interface AdminDashboardData {
  metrics: DashboardMetrics
  charts: {
    activityLast7Days: DashboardActivityPoint[]
    masterDataDistribution: DashboardDistributionSlice[]
    distributionTotal: number
  }
  equipmentAlerts: {
    overdue: DashboardEquipmentAlert[]
    dueSoon: DashboardEquipmentAlert[]
  }
  equipmentStatus: DashboardEquipmentStatus
  quickStats: DashboardQuickStats
  recentActivity: DashboardActivity[]
  generatedAt: string
}
