/* DOMAIN — Equipment calibration alerts list.
 *
 * Vendor reference: vendor/src/pages/main-module/system-dashboard/index.tsx:298-486
 * (API Endpoints Status). Each row mirrors the vendor pattern:
 *   [icon circle]  [primary line + sub-line]  [status badge]
 *
 * Maps:
 *   API endpoint name  → equipment name + model
 *   METHOD             → calibration due date label
 *   Healthy/Warning/Critical → Valid (DueSoon) / DueSoon / Overdue
 *
 * Clicking a row deep-links into the Equipment list pre-filtered by status. */
import { Link } from 'react-router-dom'
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCalendarTime,
  IconCircleCheck,
} from '@tabler/icons-react'
import type {
  DashboardEquipmentAlert,
  EquipmentCalibrationStatus,
} from '@/types/dashboard'

interface Props {
  overdue: DashboardEquipmentAlert[]
  dueSoon: DashboardEquipmentAlert[]
}

interface BadgeSpec {
  label: string
  className: string
}

const BADGE: Record<EquipmentCalibrationStatus, BadgeSpec> = {
  OVERDUE: {
    label: 'Overdue',
    className: 'bg-danger-50 text-danger border border-danger',
  },
  DUE_SOON: {
    label: 'Due Soon',
    className: 'bg-warning-50 text-warning border border-warning',
  },
  VALID: {
    label: 'Valid',
    className: 'bg-success-50 text-success border border-success',
  },
  UNKNOWN: {
    label: 'Unknown',
    className: 'bg-light text-default border border-border-color',
  },
}

function dateLabel(iso: string | null): string {
  if (!iso) return 'No date'
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function relativeFromToday(iso: string | null): string {
  if (!iso) return ''
  const due = new Date(iso + 'T00:00:00Z').getTime()
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const days = Math.round((due - today.getTime()) / (24 * 60 * 60 * 1000))
  if (days === 0) return 'today'
  if (days < 0) return `${Math.abs(days)}d overdue`
  return `in ${days}d`
}

function deepLink(status: EquipmentCalibrationStatus): string {
  return `/equipment?calibrationStatus=${status}`
}

function AlertRow({ alert }: { alert: DashboardEquipmentAlert }) {
  const badge = BADGE[alert.calibrationStatus]
  const isOverdue = alert.calibrationStatus === 'OVERDUE'
  return (
    <Link
      to={deepLink(alert.calibrationStatus)}
      className="block bg-white border border-border-color rounded-lg p-3 hover:border-primary transition-colors"
    >
      <div className="flex sm:items-center justify-between gap-2 flex-col sm:flex-row">
        <div className="flex items-center min-w-0">
          <div
            className={`size-10 rounded-full flex items-center justify-center shrink-0 text-2xl me-3 ${
              isOverdue ? 'bg-danger-50 text-danger' : 'bg-warning-50 text-warning'
            }`}
          >
            {isOverdue ? <IconAlertOctagon size={22} /> : <IconAlertTriangle size={22} />}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 mb-1 truncate">{alert.name}</p>
            <p className="inline-flex items-center text-xs text-default">
              <IconCalendarTime size={14} className="me-1" />
              {dateLabel(alert.calibrationDueDate)}
              <span className="mx-1.5">·</span>
              <span className={isOverdue ? 'text-danger' : 'text-warning'}>
                {relativeFromToday(alert.calibrationDueDate)}
              </span>
            </p>
          </div>
        </div>

        {(alert.model || alert.serialNumber) && (
          <div className="bg-light border border-border-color border-dashed rounded-lg py-1 px-2 max-w-xs">
            <p className="text-gray-900 text-xs truncate">
              {alert.model ?? '—'}
              {alert.serialNumber ? ` · ${alert.serialNumber}` : ''}
            </p>
          </div>
        )}

        <span
          className={`badge rounded-lg text-xs font-medium ${badge.className} shrink-0`}
        >
          {badge.label}
        </span>
      </div>
    </Link>
  )
}

export function EquipmentAlertsList({ overdue, dueSoon }: Props) {
  const combined = [...overdue, ...dueSoon]
  const isEmpty = combined.length === 0

  return (
    <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px] text-gray-900">
          <IconAlertTriangle size={20} className="me-2" />
          Equipment Calibration
        </h2>
        <Link
          to="/equipment"
          className="text-xs font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="size-12 rounded-full bg-success-50 text-success flex items-center justify-center mb-3">
            <IconCircleCheck size={28} />
          </div>
          <p className="font-semibold text-gray-900 mb-1">All equipment in compliance</p>
          <p className="text-xs text-default">
            No overdue or upcoming calibrations in the next 14 days.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {combined.map((alert) => (
            <AlertRow key={alert.equipmentID} alert={alert} />
          ))}
        </div>
      )}
    </div>
  )
}
