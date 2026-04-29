/* DOMAIN — calibrationStatus pill (shared by Table and View dialog). */
import type { CalibrationStatus } from '@/types/equipment'

const STATUS_LABEL: Record<CalibrationStatus, string> = {
  VALID: 'Valid',
  DUE_SOON: 'Due soon',
  OVERDUE: 'Overdue',
  UNKNOWN: 'Unknown',
}

const STATUS_CLASS: Record<CalibrationStatus, string> = {
  VALID: 'bg-success-50 text-success border-success',
  DUE_SOON: 'bg-warning-50 text-warning-700 border-warning',
  OVERDUE: 'bg-danger-50 text-danger-700 border-danger',
  UNKNOWN: 'bg-light text-default border-border-color',
}

export function CalibrationBadge({ status }: { status: CalibrationStatus }) {
  return (
    <span
      className={`inline-flex items-center badge rounded-lg text-xs font-medium border ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  )
}
