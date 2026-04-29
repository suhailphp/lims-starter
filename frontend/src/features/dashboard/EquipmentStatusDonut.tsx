/* DOMAIN — Equipment status donut.
 *
 * Vendor reference: vendor/src/pages/main-module/ai-dashboard/agentChart.tsx +
 * its host card at ai-dashboard/index.tsx:399-446. The defining visual cues
 * are `borderRadius: 15` + `borderWidth: 4` + a single-color hue ladder
 * (e.g. `#7A13F0` → `#EDE6FF`), which produces gapped, rounded segments
 * and reads as "modern" vs the multi-color slice donut.
 *
 * Vendor renders the center number as an absolute-positioned filled
 * circle ON TOP of the chart — not a chart.js plugin — so it stays
 * pixel-perfect across resizes. We do the same. */
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import {
  IconCircleCheck,
  IconAlertTriangle,
  IconAlertOctagon,
  IconCircleOff,
} from '@tabler/icons-react'
import { useAppSelector } from '@/hooks/useAppSelector'
import type { DashboardEquipmentStatus } from '@/types/dashboard'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  status: DashboardEquipmentStatus
}

interface Bucket {
  label: string
  value: number
  color: string
  textClass: string
  Icon: typeof IconCircleCheck
}

export function EquipmentStatusDonut({ status }: Props) {
  /* Read theme from Redux so the segment-border color (which has to
   * match the host card surface) re-paints when dark mode toggles.
   * Vendor hardcodes `#fff` here; we read `--color-white` instead so
   * the gaps blend in both themes. */
  const theme = useAppSelector((s) => s.theme.mode)
  const surfaceColor =
    typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement)
          .getPropertyValue('--color-white')
          .trim() || '#ffffff'
      : '#ffffff'

  /* Hue ladder — single primary color stepping down through the 4-tone
   * primary scale, matching vendor's [#7A13F0, #C5ACFF, #DED1FF, #EDE6FF].
   * Final bucket (Inactive) gets a neutral so it reads as "out of pool". */
  const buckets: Bucket[] = [
    {
      label: 'Active',
      value: status.valid,
      color: '#7A13F0',
      textClass: 'text-primary',
      Icon: IconCircleCheck,
    },
    {
      label: 'Due Soon',
      value: status.dueSoon,
      color: '#C5ACFF',
      textClass: 'text-primary-300',
      Icon: IconAlertTriangle,
    },
    {
      label: 'Overdue',
      value: status.overdue,
      color: '#DED1FF',
      textClass: 'text-primary-200',
      Icon: IconAlertOctagon,
    },
    {
      label: 'Inactive',
      value: status.inactive + status.unknown,
      color: '#EDE6FF',
      textClass: 'text-primary-100',
      Icon: IconCircleOff,
    },
  ]

  /* chart.js with all-zero data renders nothing. Seed a neutral 1-slice
   * placeholder so the ring still draws when the lab is brand-new. */
  const allZero = buckets.every((b) => b.value === 0)
  const datasetData = allZero ? [1] : buckets.map((b) => b.value)
  const datasetColors = allZero ? ['#EDE6FF'] : buckets.map((b) => b.color)

  const data: ChartData<'doughnut'> = {
    labels: allZero ? ['No data'] : buckets.map((b) => b.label),
    datasets: [
      {
        data: datasetData,
        backgroundColor: datasetColors,
        borderWidth: 4,
        borderColor: surfaceColor,
        borderRadius: 15,
        hoverBorderWidth: 0,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    rotation: -90,
    circumference: 360,
    layout: { padding: 0 },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: !allZero },
    },
  }

  return (
    <>
      <div className="relative mb-5">
        <div className="h-68">
          <Doughnut key={theme} data={data} options={options} />
        </div>
        {/* Center label — pixel-pinned circle, vendor pattern */}
        <div className="size-30 bg-primary-50 absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center flex-col text-center rounded-full">
          <h3 className="text-xl max-lg:text-lg mb-1 text-gray-900">
            {status.total}
          </h3>
          <p className="text-default text-xs">Equipment</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-4">
        {buckets.map((b) => (
          <div key={b.label} className="text-center">
            <span
              aria-hidden
              className={`inline-block size-2.5 rounded-full mb-2`}
              style={{ backgroundColor: b.color }}
            />
            <p className="mb-1 text-xs text-default truncate">{b.label}</p>
            <h3 className="text-lg max-lg:text-base text-gray-900">{b.value}</h3>
          </div>
        ))}
      </div>
    </>
  )
}
