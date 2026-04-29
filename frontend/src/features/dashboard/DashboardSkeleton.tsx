/* DOMAIN — initial-load skeleton matching the production layout shape.
 *
 * Mirrors the 4 grid rows of DashboardPage so the page doesn't reflow
 * once data arrives. Lightweight; no animations beyond the standard
 * `animate-pulse` so it stays cheap in low-power dark-mode rendering. */

function Block({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-light/70 dark:bg-gray-700/40 rounded-lg animate-pulse ${className}`}
    />
  )
}

export function DashboardSkeleton() {
  return (
    <div>
      {/* KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className="h-32 mb-6" />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xl:col-span-8">
          <Block className="h-80 mb-6" />
        </div>
        <div className="xl:col-span-4">
          <Block className="h-80 mb-6" />
        </div>
      </div>

      {/* Secondary + alerts row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xl:col-span-5">
          <Block className="h-80 mb-6" />
        </div>
        <div className="xl:col-span-7">
          <Block className="h-80 mb-6" />
        </div>
      </div>

      {/* Activity table */}
      <Block className="h-72 mb-6" />
    </div>
  )
}
