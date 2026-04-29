# Module 00 — Admin Dashboard

Demo-grade overview screen mounted at `/dashboard`. Surfaces metrics,
trends, equipment alerts, and recent activity in a single role-gated
view. Built before the deeper feature dashboards (Sample Intake,
Reports) so the LIMS opens to a substantive landing page.

## What it does

- Single aggregated `GET /api/dashboard/admin-stats` endpoint.
- Four-row layout cloned from the Dreams AI **System Dashboard**
  (vendor reference: `frontend/vendor/src/pages/main-module/system-dashboard`).
- ADMIN-only. Other roles see a small "Coming Soon" card.
- 60 s background poll; manual refresh button (kept for visual parity
  with vendor's section headers and as a self-evident demo affordance).
- Skeletons during initial load; thin top progress bar during refetch
  (same `animate-[progress_…]` pattern as the master-data tables).

## Endpoint

`GET /api/dashboard/admin-stats` — `requireJwtAuth + requireRole(['ADMIN'])`.

```jsonc
{
  "success": true,
  "data": {
    "metrics": {
      "customers": 12, "tests": 8, "equipment": 21, "users": 14,
      "methods": 6, "categories": 5, "sources": 9, "sourceTypes": 3,
      "units": 11, "specifications": 4, "ocmElements": 19,
      "masterData": 113
    },
    "charts": {
      "activityLast7Days": [
        { "date": "2026-04-22", "count": 3 }, /* …7 contiguous days */
      ],
      "masterDataDistribution": [
        { "label": "Customers", "count": 12, "color": "#6366f1" },
        /* Tests, Methods, Equipment, Sources, OCM Elements */
      ],
      "distributionTotal": 75
    },
    "equipmentAlerts": {
      "overdue": [ /* up to 5, ordered by calibrationDueDate ASC */ ],
      "dueSoon": [ /* 0–14 days from now, up to 5 */ ]
    },
    "recentActivity": [ /* 10 items, mixed AuditLog + UserActivity */ ],
    "generatedAt": "2026-04-28T15:06:20.447Z"
  }
}
```

### Activity dedupe rule

A single user mutation (e.g. profile update) writes BOTH a `UserActivity`
row AND an `AuditLog` row. Counting both would double-count the same
business event. The chart and "Recent Activity" feed therefore include:

- **All** `AuditLog` rows in the window (the data-change forensic trail).
- **Only** `UserActivity` rows where `actionType IN ('LOGIN','LOGOUT',
  'LOGIN_FAILED')` — the auth events that have no AuditLog mirror.

`PROFILE_UPDATED`, `PHOTO_UPDATED`, `PASSWORD_CHANGED`, `PASSWORD_RESET`
UAs are intentionally excluded — their AuditLog counterpart is the
canonical entry for the dashboard.

### AuditLog actor lookup

`AuditLog.userID` has **no FK** to `Users` (the audit trail must survive
user purge — see `models/AuditLog.js`). To enrich audit rows with actor
info, the service issues a second `User.findAll` keyed on the userIDs
collected from the recent rows, then maps results back. No model
association added.

## Layout

| Row | Block | Vendor section reused |
|---|---|---|
| 1 | 4 KPI cards (Customers / Tests / Equipment / Users) | `index.tsx:55-141` (gradient KPIs) |
| 2 | Activity line (col-8) + Distribution donut (col-4) | `resourceChart.tsx` + custom Doughnut |
| 3 | Reference Data tiles (col-5) + Equipment Calibration list (col-7) | Network Traffic + API Endpoints Status |
| 4 | Recent Activity table (full-width) | AI Models Performance |

### Donut divergence

Vendor's `storageChart.tsx` is a stylized gauge (custom `gaugePointer`
plugin drawing a triangle). Wrong shape for a distribution chart. We
swap to a standard multi-slice `<Doughnut>` from the SAME library
(chart.js), with a lightweight `centerLabel` plugin painting the total
in the donut hole. Same vendor frame, normal config.

### Equipment alerts — visual reuse

The vendor "API Endpoints Status" rows map 1:1 to LIMS equipment
calibration alerts:

| Vendor | LIMS |
|---|---|
| Healthy badge | `VALID` |
| Warning badge | `DUE_SOON` (0–14 days from today) |
| Critical badge | `OVERDUE` |
| Endpoint method icon | Alert-triangle / alert-octagon icon |
| Path pill | Equipment model + serial pill |

Each row deep-links to `/equipment?calibrationStatus=<status>` so the
reader can drill into the filtered list with one click.

## Frontend file map

```
src/api/dashboard.ts                      # API client
src/types/dashboard.ts                    # Payload type
src/features/dashboard/
  queries.ts                              # useAdminDashboard (60s poll)
  ActivityChart.tsx                       # chart.js Line, 7-day series
  DistributionChart.tsx                   # chart.js Doughnut + centerLabel plugin
  KpiCard.tsx                             # 4-variant gradient KPI tile
  SecondaryMetricsCard.tsx                # 6 reference-data tiles
  EquipmentAlertsList.tsx                 # row list w/ status badges
  RecentActivityTable.tsx                 # mixed AuditLog + UserActivity feed
  DashboardSkeleton.tsx                   # initial-load skeleton
src/pages/DashboardPage.tsx               # assembly + role guard
```

## Dark mode

- All text uses vendor's CSS-var-backed utilities (`text-gray-900`,
  `text-default`, `bg-white`, `border-border-color`) so dark mode flips
  automatically (per CLAUDE.md "Dark mode rules").
- Donut center label reads `--color-dark` / `--color-default` at draw
  time. The chart is keyed on `theme` (Redux `theme.mode`) so a theme
  toggle forces a remount/redraw.
- KPI gradient headers keep `text-white` since the gradient itself is
  brand-colored in both themes (vendor pattern).

## Charts library

**chart.js@^4.5.1** + **react-chartjs-2@^5.3.1** — vendor versions, pinned
to match `frontend/vendor/package.json`. The pre-existing `apexcharts`
dependency stays for any future chart that needs it; we did not migrate
existing usages.

## Polling

- 60 s `refetchInterval`, paused in background tabs (matches the bell-
  badge `useUnreadCount` pattern in `notifications/queries.ts`).
- `placeholderData: (prev) => prev` so the previous payload stays
  visible during refetch (no flash of skeletons).
- Manual refresh button calls `refetch()` and shows a spin animation
  while `isFetching`.

## Role guard

- Backend: `requireRole(['ADMIN'])` returns **403** for non-admins.
- Frontend: page renders a small "Coming Soon" card for non-admins;
  `useAdminDashboard({ enabled: false })` short-circuits the request so
  non-admins don't fire 403s every 60 s.
- Future MANAGER/TECHNICIAN dashboards = separate endpoints with their
  own role guards (each tightly scoped per audience), not a multi-role
  blob endpoint.

## Verified end-to-end (2026-04-28)

- `GET /api/dashboard/admin-stats` — 200, full payload shape (curl).
- `GET /api/dashboard/admin-stats` no token — 401 (curl).
- `GET /api/dashboard/admin-stats` w/ TECHNICIAN token — 403 (curl).
- Frontend `tsc --noEmit` clean; vite dev compile-on-demand returns 200
  for all dashboard modules.

## References

- Vendor: `frontend/vendor/src/pages/main-module/system-dashboard/`
- Postman: `docs/postman/Dashboard.postman_collection.json`
- ADRs reused: `ADR-useractivity-vs-auditlog.md`,
  `ADR-frontend-theme-integration.md`,
  `ADR-attachments-storage-strategy.md`
