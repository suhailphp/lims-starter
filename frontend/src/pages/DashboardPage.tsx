/* DOMAIN — Admin overview dashboard.
 *
 * Vendor reference: vendor/src/pages/main-module/system-dashboard/index.tsx.
 * Layout shape (4 grid rows): KPI / Activity+Distribution / Secondary+Alerts /
 * RecentActivity. Mounts real data from /api/dashboard/admin-stats; non-admins
 * see a small "coming soon" card. */
import { useMemo } from 'react'
import {
  IconBuildingStore,
  IconFlask2,
  IconScale,
  IconUsers,
  IconRefresh,
  IconLock,
  IconLayoutDashboard,
} from '@tabler/icons-react'
import { Helmet } from 'react-helmet-async'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAdminDashboard } from '@/features/dashboard/queries'
import { ActivityChart } from '@/features/dashboard/ActivityChart'
import { EquipmentStatusDonut } from '@/features/dashboard/EquipmentStatusDonut'
import { KpiCard } from '@/features/dashboard/KpiCard'
import { QuickStatsCard } from '@/features/dashboard/QuickStatsCard'
import { MasterDataDotList } from '@/features/dashboard/MasterDataDotList'
import { EquipmentAlertsList } from '@/features/dashboard/EquipmentAlertsList'
import { RecentActivityTable } from '@/features/dashboard/RecentActivityTable'
import { DashboardSkeleton } from '@/features/dashboard/DashboardSkeleton'

function NonAdminWelcome() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white rounded-lg border border-border-color p-8 max-w-md w-full text-center">
        <div className="size-14 mx-auto rounded-full bg-primary-50 text-primary flex items-center justify-center mb-4">
          <IconLayoutDashboard size={28} />
        </div>
        <h4 className="text-gray-900 mb-2">Dashboard</h4>
        <p className="text-sm text-default mb-4">
          A role-specific dashboard is on the way. For now, head to the
          relevant module from the sidebar.
        </p>
        <span className="inline-flex items-center text-xs text-default">
          <IconLock size={14} className="me-1" />
          Admin overview restricted
        </span>
      </div>
    </div>
  )
}

function lastUpdatedLabel(iso: string | undefined): string {
  if (!iso) return ''
  return new Date(iso).toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function DashboardPage() {
  const role = useAppSelector((s) => s.auth.user?.role)
  const isAdmin = role === 'ADMIN'

  const { data, isLoading, isFetching, refetch, error } = useAdminDashboard({
    enabled: isAdmin,
  })

  const breadcrumbs = useMemo(
    () => [{ label: 'Home', to: '/' }, { label: 'Dashboard' }],
    [],
  )

  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Dashboard · LIMS</title>
        </Helmet>
        <PageHeader breadcrumbs={breadcrumbs} />
        <NonAdminWelcome />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Dashboard · LIMS</title>
      </Helmet>

      <PageHeader
        breadcrumbs={breadcrumbs}
        actions={
          <>
            {data?.generatedAt && (
              <span className="text-xs text-default hidden sm:inline">
                Last updated {lastUpdatedLabel(data.generatedAt)}
              </span>
            )}
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="size-8 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center disabled:opacity-50"
              aria-label="Refresh dashboard"
              title="Refresh"
            >
              <IconRefresh size={16} className={isFetching ? 'animate-spin' : ''} />
            </button>
          </>
        }
      />

      {/* Thin top progress bar during background refetch — same pattern as
       * the master-data tables (CustomerTable.tsx:93). */}
      {isFetching && data && (
        <div className="h-1 w-full -mt-3 mb-3 overflow-hidden rounded-full bg-border-color">
          <div className="h-full w-1/3 bg-primary animate-[progress_1.2s_ease-in-out_infinite]" />
        </div>
      )}

      {isLoading || !data ? (
        error ? (
          <div className="bg-white rounded-lg border border-border-color p-8 text-center">
            <p className="text-gray-900 font-semibold mb-1">
              Couldn't load dashboard
            </p>
            <p className="text-sm text-default mb-4">
              {(error as { message?: string })?.message ?? 'Unexpected error'}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="btn bg-primary text-white border-primary"
            >
              Try again
            </button>
          </div>
        ) : (
          <DashboardSkeleton />
        )
      ) : (
        <DashboardContent data={data} />
      )}
    </>
  )
}

function DashboardContent({
  data,
}: {
  data: NonNullable<ReturnType<typeof useAdminDashboard>['data']>
}) {
  return (
    <>
      {/* Row 1 — KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6">
        <KpiCard
          label="Customers"
          value={data.metrics.customers}
          variant="primary"
          Icon={IconBuildingStore}
        />
        <KpiCard
          label="Tests"
          value={data.metrics.tests}
          variant="success"
          Icon={IconFlask2}
        />
        <KpiCard
          label="Equipment"
          value={data.metrics.equipment}
          variant="info"
          Icon={IconScale}
        />
        <KpiCard
          label="Users"
          value={data.metrics.users}
          variant="teal"
          Icon={IconUsers}
        />
      </div>

      {/* Row 2 — Activity line chart (col-7) + Equipment status donut (col-5) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xl:col-span-7 flex">
          <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] text-gray-900">
                Activity (last 7 days)
              </h2>
              <span className="text-xs text-default">
                Login + data changes
              </span>
            </div>
            <ActivityChart points={data.charts.activityLast7Days} />
          </div>
        </div>
        <div className="xl:col-span-5 flex">
          <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] text-gray-900">
                Equipment Status
              </h2>
              <span className="text-xs text-default">Calibration health</span>
            </div>
            <EquipmentStatusDonut status={data.equipmentStatus} />
          </div>
        </div>
      </div>

      {/* Row 3 — Quick Stats + Master Data + Equipment Calibration (3×col-4) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xl:col-span-4 flex">
          <QuickStatsCard stats={data.quickStats} />
        </div>
        <div className="xl:col-span-4 flex">
          <MasterDataDotList metrics={data.metrics} />
        </div>
        <div className="xl:col-span-4 flex">
          <EquipmentAlertsList
            overdue={data.equipmentAlerts.overdue}
            dueSoon={data.equipmentAlerts.dueSoon}
          />
        </div>
      </div>

      {/* Row 4 — Recent activity table (full width) */}
      <div className="grid grid-cols-1 gap-6">
        <RecentActivityTable items={data.recentActivity} />
      </div>
    </>
  )
}
