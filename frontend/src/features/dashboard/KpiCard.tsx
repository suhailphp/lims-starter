/* DOMAIN — gradient KPI card.
 *
 * Vendor reference: vendor/src/pages/main-module/system-dashboard/index.tsx:55-141.
 * Same gradient header (color variant) + circular icon + label, white
 * body with big number + colored count delta. We don't have period-over-
 * period deltas yet, so the delta slot is a stable "Total" badge in the
 * brand color — keeps the visual rhythm without faking trend data. */
import type { Icon as TablerIcon } from '@tabler/icons-react'

export type KpiVariant = 'primary' | 'success' | 'info' | 'teal'

const HEADER_GRADIENT: Record<KpiVariant, string> = {
  primary: 'bg-primary-gradient-200',
  success: 'bg-success-gradient',
  info: 'bg-info-gradient',
  teal: 'bg-teal-gradient',
}

const ICON_BG: Record<KpiVariant, string> = {
  primary: 'bg-primary-600',
  success: 'bg-success-600',
  info: 'bg-info-600',
  teal: 'bg-teal-600',
}

const BADGE_TEXT: Record<KpiVariant, string> = {
  primary: 'text-primary',
  success: 'text-success',
  info: 'text-info',
  teal: 'text-teal',
}

interface Props {
  label: string
  value: number | string
  variant: KpiVariant
  Icon: TablerIcon
  /** Caption beside the value — defaults to "Total". */
  caption?: string
}

export function KpiCard({ label, value, variant, Icon, caption = 'Total' }: Props) {
  return (
    <div className="bg-white rounded-lg border border-border-color w-full mb-6">
      <div className={`${HEADER_GRADIENT[variant]} rounded-lg flex items-center p-5`}>
        <div
          className={`size-10 ${ICON_BG[variant]} rounded-full flex items-center justify-center text-white me-2 shrink-0`}
        >
          <Icon size={22} stroke={2} />
        </div>
        <p className="font-semibold text-white truncate">{label}</p>
      </div>
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-2xl max-lg:text-xl text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h2>
        <span className={`text-xs font-medium ${BADGE_TEXT[variant]}`}>{caption}</span>
      </div>
    </div>
  )
}
