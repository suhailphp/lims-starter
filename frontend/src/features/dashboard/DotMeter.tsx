/* DOMAIN — single-row dot meter (label + meter + value).
 *
 * Vendor reference: vendor/src/pages/main-module/analytics-dashboard/imageProgressChart.tsx
 * + its host rows in analytics-dashboard/index.tsx:524-583. Vendor uses a
 * chart.js Scatter plot to render dots, but a flex row of styled spans is
 * lighter, accessible, and visually identical at this scale. We keep
 * vendor's two-color scheme (`#7A13F0` filled, `#E5E7EB` empty). */

interface DotMeterProps {
  label: string
  value: number
  /** The largest value across the same list; the meter scales relative
   *  to this so the heaviest row fills 100%. */
  max: number
  totalDots?: number
}

export function DotMeter({ label, value, max, totalDots = 15 }: DotMeterProps) {
  const safeMax = Math.max(max, 1)
  const ratio = Math.min(1, Math.max(0, value / safeMax))
  /* At least one filled dot if the row has any value, so a "1" doesn't
   * appear empty when the max is in the hundreds. */
  const filled =
    value > 0
      ? Math.max(1, Math.round(ratio * totalDots))
      : 0

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-default">{label}</p>
        <p className="text-gray-900 font-semibold">{value.toLocaleString()}</p>
      </div>
      <div
        role="meter"
        aria-label={`${label}: ${value} of ${max}`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className="flex items-center gap-1.5"
      >
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`size-2 rounded-full ${
              i < filled ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
