/* DOMAIN — Quick Stats card with frosted-glass rows + rotating X-effect bg.
 *
 * Vendor reference: vendor/src/pages/main-module/analytics-dashboard/index.tsx:166-205.
 * The entire visual identity is:
 *   1. `bg-primary-gradient` outer card.
 *   2. Per-row `rounded-full bg-white/10 py-2 px-4` (frosted glass).
 *   3. Decorative `card-bg-05` PNG, absolute, behind the rows, with
 *      `mix-blend-luminosity` + slow rotation. This is the "X effect".
 *
 * Vendor uses `text-white` and `bg-white/10` literally — both are safe
 * here because the surface is the brand purple gradient in BOTH light and
 * dark modes, so white text always reads. (The CLAUDE.md "white-on-dark
 * trap" only applies to surfaces that flip on theme toggle.) */
import {
  IconActivity,
  IconUsers,
  IconAlertTriangle,
  IconLogin2,
  type Icon as TablerIcon,
} from '@tabler/icons-react'
import cardBg05 from '@/assets/img/bg/card-bg-05.png'
import type { DashboardQuickStats } from '@/types/dashboard'

interface Props {
  stats: DashboardQuickStats
}

interface Row {
  Icon: TablerIcon
  label: string
  value: string
}

function formatNumber(n: number): string {
  return n.toLocaleString()
}

export function QuickStatsCard({ stats }: Props) {
  const rows: Row[] = [
    {
      Icon: IconActivity,
      label: 'Activities Today',
      value: formatNumber(stats.activitiesToday),
    },
    {
      Icon: IconUsers,
      label: 'Active Users (24h)',
      value: formatNumber(stats.activeUsers24h),
    },
    {
      Icon: IconAlertTriangle,
      label: 'Pending Calibrations',
      value: formatNumber(stats.pendingCalibrations),
    },
    {
      Icon: IconLogin2,
      label: 'Recent Logins (Today)',
      value: formatNumber(stats.recentLoginsToday),
    },
  ]

  return (
    <div className="bg-primary-gradient rounded-lg p-5 mb-6 relative w-full overflow-hidden z-1">
      <h2 className="mb-5 text-white text-lg max-lg:text-[17px]">Quick Stats</h2>

      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-full bg-white/10 py-2 px-4 text-sm"
          >
            <span className="text-white inline-flex items-center min-w-0">
              <r.Icon size={16} stroke={1.75} className="me-2 shrink-0" />
              <span className="truncate">{r.label}</span>
            </span>
            <span className="text-white font-semibold ms-3 shrink-0">
              {r.value}
            </span>
          </div>
        ))}
      </div>

      {/* X effect — vendor's rotating decorative bg.
       *   - mix-blend-luminosity blends the image's brightness onto the
       *     gradient, keeping the purple cast.
       *   - animate-rotate-slow uses vendor's --animate-rotate-slow var
       *     (`spin 4s linear infinite`, declared in style.css:318).
       *   - -z-1 keeps it BEHIND the rows; overflow-hidden on the parent
       *     clips the rotation. */}
      <img
        src={cardBg05}
        alt=""
        aria-hidden
        className="absolute -top-10 end-0 -z-1 mix-blend-luminosity animate-rotate-slow max-md:hidden pointer-events-none select-none"
      />
    </div>
  )
}
