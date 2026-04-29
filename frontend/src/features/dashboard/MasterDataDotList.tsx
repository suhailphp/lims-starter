/* DOMAIN — Master-data distribution as 6 horizontal dot meters.
 *
 * Vendor reference: vendor/src/pages/main-module/analytics-dashboard/index.tsx:524-583
 * (Requests by Category). Replaces the Reference Data tile section AND
 * the old multi-color distribution donut — both were noisier than this
 * scannable list. */
import { IconChartScatter } from '@tabler/icons-react'
import { DotMeter } from './DotMeter'
import type { DashboardMetrics } from '@/types/dashboard'

interface Props {
  metrics: DashboardMetrics
}

export function MasterDataDotList({ metrics }: Props) {
  /* Six entities chosen during the planning round: Customers, Tests,
   * Methods, Equipment, Sources, Categories. Order is descending by
   * typical lab volume to keep the heaviest rows at the top — the
   * meter scale recomputes from the actual values per render. */
  const items = [
    { label: 'Customers', value: metrics.customers },
    { label: 'Tests', value: metrics.tests },
    { label: 'Methods', value: metrics.methods },
    { label: 'Equipment', value: metrics.equipment },
    { label: 'Sources', value: metrics.sources },
    { label: 'Categories', value: metrics.categories },
  ]
  const max = items.reduce((m, it) => Math.max(m, it.value), 0)

  return (
    <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
      <div className="mb-5">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px] text-gray-900">
          <IconChartScatter size={20} className="me-2" />
          Master Data Distribution
        </h2>
      </div>
      <div>
        {items.map((item) => (
          <DotMeter
            key={item.label}
            label={item.label}
            value={item.value}
            max={max}
            totalDots={10}
          />
        ))}
      </div>
    </div>
  )
}
