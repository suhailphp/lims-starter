/* DOMAIN — 7-day activity line chart for the admin dashboard.
 *
 * Vendor reference: vendor/src/pages/main-module/system-dashboard/resourceChart.tsx.
 * Same chart.js Line component + tension/fill/borderWidth/pointRadius
 * settings, just one series instead of three. */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { DashboardActivityPoint } from '@/types/dashboard'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

interface Props {
  points: DashboardActivityPoint[]
}

function shortLabel(iso: string): string {
  // 'YYYY-MM-DD' → 'Apr 22'
  const d = new Date(iso + 'T00:00:00Z')
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  })
}

export function ActivityChart({ points }: Props) {
  const labels = points.map((p) => shortLabel(p.date))
  const counts = points.map((p) => p.count)

  const data = {
    labels,
    datasets: [
      {
        label: 'Events',
        data: counts,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderColor: '#6366f1',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#6366f1',
        pointHoverRadius: 5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 0 },
    interaction: { mode: 'index' as const, intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { display: true, color: 'rgba(148, 163, 184, 0.15)' },
        ticks: { precision: 0, font: { size: 11 } },
      },
      x: {
        border: { display: false },
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  }

  return <Line id="activity-chart" className="h-60!" data={data} options={options} />
}
