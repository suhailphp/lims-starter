# LIMS Project

> **Starter template note**: This is a starter template extracted from a
> working LIMS project. Replace domain-specific master data modules
> (Tests, Equipment, Methods, OcmElement, Specifications, Sources,
> SourceTypes, Categories, Units) with your project's entities. Foundation
> modules (Auth, Users, Settings, Currency, Tax Rates, Search,
> Notifications, Activity/Audit, Dashboard, Attachments) and all locked
> patterns are intended to be kept as-is.

## Table of Contents

**Foundations**
- [Project Context](#project-context)
- [Workflow & Collaboration](#workflow--collaboration-locked) — git ownership, per-task protocol
- [Roles](#roles-5--locked) — 5 roles enumerated
- [Stack](#stack)

**UI patterns**
- [Frontend Theme Rule](#frontend-theme-rule) — Dreams AI vendor reuse
- [Form Pattern Rule](#form-pattern-rule) — modals over pages
- [View Pattern Rule](#view-pattern-rule) — click-name-to-view
- [Toast Notification Rule](#toast-notification-rule)

**Cross-cutting standards**
- [Postman Collection Standards](#postman-collection-standards-locked-2026-04-29)
- [Documentation Requirements](#documentation-requirements-locked)
- [Execution Order](#execution-order-per-module--locked)

**Backend rules**
- [Backend Virtual Fields Rule](#backend-virtual-fields-rule) — VIRTUAL not getterMethods
- [Activity & Audit Logging](#activity--audit-logging-rule-locked-2026-04-28) — 14 audited models
- [Attachment Pattern Rule](#attachment-pattern-rule)
- [Notifications Rule](#notifications-rule-locked-2026-04-28) — scopes + multi-notification
- [Admin Dashboard Rule](#admin-dashboard-rule-locked-2026-04-28)
- [Settings Rule](#settings-rule-locked-2026-04-28)
- [Tenant Branding Rule](#tenant-branding-rule-locked)
- [Currency Rule](#currency-rule-locked-2026-04-29) — multi-currency snapshot pattern
- [Tax Rate Rule](#tax-rate-rule-locked-2026-04-29) — per-quote selection + atomic Set-Default
- [Search Rule](#search-rule-locked-2026-04-29) — global search + `?view=` deep-link
- [Backend Update Rule](#backend-update-rule) — `auditedUpdate`
- [Domain rules](#rules) — sample/report/quote numbering, soft delete, audit fields

**Module build state**
- [Module Build Order](#module-build-order)
- [Frontend Build Order](#frontend-build-order)
- [Sidebar Structure](#sidebar-structure)
- [Master Data UI Replication Rule](#master-data-ui-replication-rule)

**Reference**
- [Critical Files Reference](#critical-files-reference)
- [Deferred Items](#deferred-items-consolidated)
- [Current Work](#current-work)
- [Docs](#docs)

## Project Context
Commercial Laboratory Information Management System for oil, water, 
and lubricant testing operations.

## Workflow & Collaboration (LOCKED)

**Division of labor**:
- **User** handles ALL git operations: commits, branches, PRs, merges,
  pushes. Claude **never** runs `git add` / `git commit` / `git push` /
  branch ops on its own initiative.
- **Claude (CLI)** builds code, runs migrations, runs the dev server,
  hits endpoints with curl when needed, writes module docs / Postman
  collections / ADRs, and updates this file when a pattern locks.
- **Claude (web chat)** plans modules, briefs the CLI, reviews output.

**Per-task protocol**:
1. Investigate vendor + existing code first.
2. Show a plan (file structure + endpoints + open questions) BEFORE
   building.
3. Wait for approval — don't pre-emptively write code while questions
   are open.
4. Build phase by phase; pause at each phase boundary for testing.
5. Brief responses. End-of-turn summary = 1–2 sentences.
6. Update docs (module doc, Postman, CLAUDE.md, ADR) in the SAME task,
   not later.

## Roles (5 — LOCKED)

| Role         | Scope                                                  |
|--------------|--------------------------------------------------------|
| ADMIN        | Full access. Settings, Users, Currencies, all writes.  |
| MANAGER      | Lab oversight + result approvals + reports sign-off.   |
| TECHNICIAN   | Lab work — sample intake, worksheets, results entry.   |
| RECEPTIONIST | Front-office — quotes, customers, sample receiving.    |
| CUSTOMER     | Portal-only — sees their own customer's data.          |

`<RoleBadge>` (`src/features/users/RoleBadge.tsx`) renders the pill
color per role: ADMIN red, MANAGER primary, TECHNICIAN warning,
RECEPTIONIST gray, CUSTOMER info. Backend role guard:
`requireRole(['ADMIN', 'MANAGER'])` from `middleware/requireRole.js`.

## Stack
- Backend: Node.js + Express + Sequelize + PostgreSQL
- Frontend: React + TypeScript + Vite + Redux + Tailwind
- Theme: Dreams AI (integrated as vendor layer — see Frontend Theme Rule below)

## Frontend Theme Rule
We use Dreams AI as the visual foundation. **Reuse vendor styles; do not
recreate them.**

Layout:
- `/frontend/src/styles/vendor/style.css` — vendor CSS, source of truth (do not edit)
- `/frontend/src/styles/custom/` — overrides + LIMS-specific only
- `/frontend/vendor/` — REFERENCE ONLY (read it; never import from it)

Workflow when building any new component:
1. Find vendor's equivalent in `/frontend/vendor/src/components/`.
2. Use vendor's exact class names and DOM hierarchy.
3. Adapt only the data (LIMS menu items, table columns, etc.).
4. Custom CSS only when vendor doesn't cover the case OR LIMS-specific.

Pre-installed theme libraries (use without installing):
- `react-select` — searchable dropdowns
- `flatpickr` — date / range pickers
- `apexcharts` + `react-apexcharts` — charts
- `react-helmet-async` — page titles
- `@tabler/icons-react` — icons
- `primereact` + `primeicons` — heavy data tables / advanced inputs

Reference: `/docs/decisions/ADR-frontend-theme-integration.md`

## Form Pattern Rule
- **Default**: all CRUD forms use modal dialogs (Add / Edit / Delete-confirm).
- **Vendor references** (always read these before building):
  - Table list page → `/frontend/vendor/src/pages/systems-security/users-roles/users.tsx`
  - Form-in-modal → `/frontend/vendor/src/pages/systems-security/users-roles/userModal.tsx`
  - Inputs catalog (selects, dates, checkboxes, radios, etc.) → `/frontend/vendor/src/pages/ui-elements/form-ui/formElements.tsx`
  - Delete-confirm modal → simple variant from `/frontend/vendor/src/pages/ui-elements/base-ui/uiModals.tsx`
- **Always check the inputs catalog** before adding a new field type. Do not reinvent input styling.
- Validation: react-hook-form + Zod, schemas mirror the backend, errors render inline beneath the field.
- Submit button disables while validating and during the API call.
- Map backend errors (409 duplicate, 422 validation) to field-level or banner messages.
- **Dedicated pages only for**: user profile (My Account), settings, multi-step wizards, complex layouts (uploads + previews). Everything else → modal.
- **`handleSubmit` MUST have an `onInvalid` callback (LOCKED 2026-05-08).**
  Bare `handleSubmit(onSuccess)` silently no-ops on validation failure —
  the user sees a dead Save button. Always wire the shared utility:
  ```ts
  import { createInvalidHandler } from '@/utils/formErrors'
  const onSubmit = handleSubmit(
    async (values) => { /* save */ },
    createInvalidHandler('YourFormName', setError),
  )
  ```
  Render `<FormErrorBanner error={errors.root} />` at the top of the form
  body. Pages that already display errors via local state should pipe
  `summarizeFormErrors(errs)` into the same setter (see LoginPage,
  ChangePasswordPage, UserResetPasswordDialog).
- **FKSelect / EnumSelect onChange uses `||` not `??` (LOCKED 2026-05-08).**
  `onChange={(v) => field.onChange(v || '')}` for string fields with
  empty-string sentinel; `onChange={(v) => field.onChange(v || null)}`
  for nullable fields. Same for payload coercion before the API call:
  `defaultUnitID: data.defaultUnitID || null`. Never use `?? ''` /
  `?? null` — `??` lets falsy ghost values leak through to Zod and
  causes silent submit failures.
- See `/docs/patterns/form-pattern.md` for the full rules + reasoning.

## View Pattern Rule
- **Click a record's name in any list table → opens a View modal** (read-only).
- View modal shows ALL the record's fields in a labeled two-column grid, plus audit timestamps and a status pill.
- Modal header = the record's primary identifier (Customer name, Test name, "Method ASTM D93-25 (Flash Point)", etc.).
- Footer actions: **Edit** (primary, switches to Edit modal), **Delete** (danger, role-gated), **Close** (secondary).
- Action menu inside each table row still has direct Edit / Delete shortcuts that skip the View step.
- Same pattern across all 10 master-data pages. Same component shape, same transitions.
- View, Add, Edit, and Delete all use **centered modals** (vendor's `bg-white border border-border-color rounded-lg p-6` frame). Drawer / side-panel variants only when an entity has 30+ fields — none do today.

## Toast Notification Rule
- Library: `react-hot-toast` (vendor ships no toast pattern; we picked the smallest one with a clean global API).
- Mount: a single `<Toaster {...toasterOptions} />` lives in `src/App.tsx`. Don't add another.
- Import surface: always go through `import { toast } from '@/lib/toast'` — never import `react-hot-toast` directly.
- Wire on every mutation:
  - Success → `toast.success('Customer "Acme" created')` — past-tense, names the record.
  - Failure → `toast.error('Failed to delete customer: ...')` — keeps the inline form/banner error too; toast is the **also**, not the **only**.
- Position: top-right, 3.5 s default, 5 s for errors. Configured in `src/lib/toast.ts`.
- Do not toast on field-level validation errors — those render inline beneath the field.

## Postman Collection Standards (LOCKED 2026-04-29)

Every collection in `/docs/postman/<Module>.postman_collection.json` MUST
follow this shape so a new dev can run any module's smokes the same way.

**Reference collections** (copy this shape verbatim): `Auth`, `User`,
`Currencies`.

### ALWAYS

- **First item is `Login as admin (seeds {{accessToken}})`** — POST
  `{{baseUrl}}/auth/login` with body `{ "email": "{{adminEmail}}",
  "password": "{{adminPassword}}" }`. Test script saves the token via
  `pm.collectionVariables.set('accessToken', body.data.accessToken)`.
- **Variables** (collection-level, not environment) — at minimum:
  ```
  baseUrl       http://localhost:3033/api
  adminEmail    admin@lims.local
  adminPassword Admin123
  accessToken   (empty, populated by Login)
  ```
  Plus entity IDs captured from earlier requests (e.g. `aedID`,
  `usdID`).
- **Pre-request script** auto-attaches `Authorization: Bearer
  {{accessToken}}` to every non-login request and sets
  `Content-Type: application/json`:
  ```js
  pm.request.headers.upsert({ key: 'Content-Type', value: 'application/json' });
  const path = pm.request.url.getPath();
  const isLogin = /\/auth\/login$/.test(path);
  if (!isLogin) {
    const token = pm.collectionVariables.get('accessToken');
    if (token) pm.request.headers.upsert({ key: 'Authorization', value: 'Bearer ' + token });
  }
  ```
- **Test scripts assert expected status code** AND a meaningful
  property (e.g. `pm.test('409 Conflict', () => pm.response.to.have.status(409))`
  + `pm.test('error mentions base currency', ...)`).
- **Capture entity IDs** with `pm.collectionVariables.set('xID',
  body.data.xID)` from CREATE/LIST responses; downstream requests
  reference `{{xID}}`.
- **Cleanup request at the end** when the smoke mutates global state
  (Set Base, role flips, etc.) so the suite is rerunnable.
- **Use `pm.collectionVariables`** for token + IDs — NOT
  `pm.environment.set`. Cross-collection consistency depends on this.
- **Numbered request names when run order matters** (`1. List ...`,
  `2. DELETE ...`). Login is unnumbered (always first, never the
  smoke under test).

### NEVER

- Don't require the user to manually paste a token. Login auto-seeds it.
- Don't use `pm.environment.set` — every other LIMS collection uses
  `pm.collectionVariables`. Mixing the two breaks Run Folder.
- Don't hardcode IDs in URLs — capture and reference via variables.
- Don't skip the cleanup step on suites that flip global state.
- Don't ship a collection without smoke tests for every endpoint the
  module exposes (incl. negative paths — 401/403/404/409/422).

### When adding a new module

1. Copy `Currencies.postman_collection.json` as the template.
2. Update `info.name` and `info.description` (list all routes + the
   intended run order).
3. Replace request items with the module's smoke set.
4. Verify JSON parses: `node -e "JSON.parse(require('fs').readFileSync('docs/postman/<Name>.postman_collection.json','utf8'))"`.
5. Manually Run Folder once before declaring the module done.

## Documentation Requirements (LOCKED)

Every module MUST ship with:
1. **Module doc** — `/docs/modules/<NN>-<name>.md`. Sections:
   *Overview*, *Schema*, *Endpoints*, *Patterns / invariants*,
   *Frontend notes*, *Open TODOs*. Plain English, no marketing copy.
2. **Postman collection** — `/docs/postman/<Module>.postman_collection.json`,
   following the standards above.
3. **CLAUDE.md update** — IF the module locks a new pattern (FK select,
   dialog flow, audit opt-out, etc.). Add a `## <Name> Rule (LOCKED
   <date>)` section. If it just reuses an existing locked pattern, no
   CLAUDE.md change is needed beyond bumping `Module Build Order`.
4. **ADR** — `/docs/decisions/ADR-<short-name>.md` if an architectural
   decision was made (storage strategy, library choice, schema shape).
   Skip ADRs for routine CRUD work.

**Timing**: Docs ship in the SAME task as the code. Don't defer.
A reviewer reading the PR should see the module doc + Postman + any
ADR alongside the diff, not a TODO comment.

## Execution Order (per module — LOCKED)

1. **Investigate** — vendor (`/frontend/vendor/src/`), existing locked
   patterns (`/docs/patterns/`), prior similar modules.
2. **Plan** — present file structure, endpoints, open questions.
   Identify reusable components vs. new ones.
3. **Approval gate** — wait for the user's go-ahead. Don't write code
   while clarifying questions are open.
4. **Backend** — migrations → models → service → controller / routes →
   wire into `app.js` → `npm run migrate` → boot smoke.
5. **Backend test gate** — Postman smoke collection. Pause for the
   user to verify before touching the UI.
6. **Frontend** — types → api → queries → pages / dialogs → routes →
   sidebar → toast wiring.
7. **Frontend test gate** — manual UI walkthrough including dark mode
   + keyboard accessibility.
8. **Docs** — module doc, Postman, ADR, CLAUDE.md (in that order).
9. **Brief sign-off** — one-paragraph "ready for review" summary.

## Backend Virtual Fields Rule
- For **computed/derived fields** that need to appear in API responses
  (e.g. `Equipment.calibrationStatus`), use `DataTypes.VIRTUAL` as a
  regular attribute — NOT `getterMethods` in the model options.
- Sequelize 6's `toJSON()` (called by `res.json()`) **does NOT serialize
  `getterMethods` results** — verified empirically 2026-04-27 when
  Equipment's calibrationStatus came through as undefined on the
  frontend despite working via direct property access.
- VIRTUAL fields don't exist in the DB schema (no migration needed) but
  ARE included in `toJSON()` output.
- Pattern:
  ```js
  myComputed: {
    type: DataTypes.VIRTUAL,
    get() { return /* ...derived from this.* */; },
  }
  ```

## Activity & Audit Logging Rule (locked 2026-04-28)

Two distinct systems, do NOT merge them. See
`/docs/decisions/ADR-useractivity-vs-auditlog.md`.

**UserActivity** — user-facing personal feed (Profile page).
- Manual writes from auth + user controllers via
  `services/activityLogger.js` (`logActivity({ userID, actionType, label,
  description, metadata, req })`).
- Action types live in `models/UserActivity.js#ACTION_TYPES`. Adding a new
  one = add to that array + the corresponding controller call.
- Self-edits log to the user's own feed; admin actions on other users
  (PASSWORD_RESET) log to the TARGET user's feed.

**AuditLog** — system-wide forensic data-change log.
- Automatic via Sequelize hooks. Each audited model calls
  `applyAuditLogging(Model, entityType, { excludeFields? })` after
  `applyAuditHooks` in its definition file.
- 15 models currently audited: User, Attachment, Customer, Category,
  SourceType, Source, Equipment, OcmElement, Specification, Unit, Test,
  Method, Currency, ExchangeRate, TaxRate.
- **CRITICAL** `excludeFields`: `User: ['password']`,
  `Attachment: ['fileData', 'dataUrl']`. Always-stripped:
  `createdAt/updatedAt/deletedAt`. Adding a new sensitive field requires
  adding to the model's exclude list.
- **Soft-delete recognition**: `isDeleted: false → true` flip is
  translated to `action: 'DELETE'` automatically. No manual handling
  needed in controllers.
- **`skipAudit: true` opt-out** for system-internal writes that aren't
  user-initiated mutations:
  - `User.registerFailedLogin`/`registerSuccessfulLogin` (lockout/lastLoginAt bumps).
  - `auth.controller.changePassword user.save()` (PASSWORD_CHANGED
    UserActivity is canonical; AuditLog row would only show
    passwordChangedAt diff — duplicative).
  - RefreshToken updates need NO opt-out — RefreshToken isn't audited.

**AsyncLocalStorage request context** carries `userId/ipAddress/userAgent/requestId`
into hooks. Mounted via `middleware/requestContext.js` in `app.js`;
`requireJwtAuth` updates `ctx.userId` post-auth. See
`/docs/decisions/ADR-async-local-storage-request-context.md`.

**Endpoints**:
- `GET /api/users/me/activities` — self UserActivity feed (any auth).
- `GET /api/users/:userID/activities` — admin/manager/self.
- `GET /api/users/me/timeline?filter=all|activities|changes` — **unified**
  feed merging UserActivities + own AuditLogs, used by the Profile page
  activity card. Each item carries a `source` discriminator
  (`user_activity` vs `audit_log`) so the renderer picks the right shape.
- `GET /api/audit-logs` (and `/:entityType/:entityID/history`,
  `/:auditLogID`) — ADMIN/MANAGER only.

References: `/docs/modules/00-activity-logging.md`.

## Attachment Pattern Rule
- Small images (user photos, customer logos, equipment images) live in
  the `Attachments` table as base64 TEXT. **No filesystem, no S3.** Add
  filesystem storage only when test result PDFs arrive (separate
  decision at that time).
- **Hard delete only** on `Attachments`. No `isDeleted` / `deletedAt` /
  `isActive` columns. The model deliberately does NOT call
  `applyAuditHooks` — only two inline `beforeCreate` / `beforeUpdate`
  hooks for `createdBy` / `updatedBy`. Reason: attachments are file
  storage, not business records — audit lives on the parent entity.
- **Replace = hard delete in transaction.** When a parent's FK flips
  (e.g. `Users.profilePhotoAttachmentID` changes), the parent
  controller wraps the update + `Attachment.destroy({ where: { id: oldID } })`
  in `db.sequelize.transaction(...)`. No orphans, no history table.
- **Direct FK on owning entity.** `Users.profilePhotoAttachmentID UUID NULL
  REFERENCES Attachments ON DELETE SET NULL`. Future entities follow the
  same pattern. Multi-attachment uses junction tables (`belongsToMany`).
- **`dataUrl` VIRTUAL** is the read primitive — `data:${mimeType};base64,${fileData}`.
  Sequelize 6 `toJSON()` serializes VIRTUAL but not `getterMethods`
  (already a locked rule above; same lesson here).
- **Always `required: false`** when including the Attachment association;
  most rows don't have a photo.
- Frontend: `<Avatar photo={...} name={...} size="sm|md|lg" />` for
  display; `<AttachmentUpload ... />` for picking (deferred upload —
  picks file, caller decides when to POST).
- Reference: `/docs/modules/00-attachments.md`,
  `/docs/decisions/ADR-attachments-storage-strategy.md`.

## Notifications Rule (locked 2026-04-28)

Lab-agnostic foundation. See `/docs/modules/00-notifications.md` and
`/docs/decisions/ADR-notification-routing-architecture.md`.

**Two-table model**:
- `Notifications` — immutable message body. No `updatedAt`. Created via
  `services/notificationService.js#notify(...)` only — controllers never
  hit the model directly. **`skipAudit: true` on every create** (the
  notification IS the record; AuditLog would duplicate it).
- `NotificationRecipients` — per-user delivery + read/dismiss state.
  **Not registered with `applyAuditLogging`** — read/dismiss flips are
  high-churn and would flood AuditLog. Same opt-out logic as
  `Attachment`.

**Three audience scopes**:
- `PERSONAL` → `userIDs: [...]` directly.
- `CUSTOMER` → all active CUSTOMER users with `customerID` (+ optional
  `additionalUserIDs`).
- `LAB` → all active users matching `roles: [...]` (+ optional
  `additionalUserIDs`).

A `Set` de-dupes across resolver paths. Empty audience → no-op (skip
Notification insert). Notification + recipients written in one
transaction.

**Multi-notification per event is intentional**: when a single business
event has multiple audiences (customer / lab oversight / technician),
emit MULTIPLE notifications, each tuned. The service is designed for
repeated calls per event — see ADR for the worked "Report Ready"
example.

**Per-module notification rules are discussed AND approved BEFORE
implementation.** For each future module:
1. List events that should notify someone.
2. For each event, list audiences + per-audience framing.
3. Choose scope + type + priority per audience.
4. Wire `notify(...)` calls fire-and-forget.

**Call-site pattern** — always fire-and-forget so a notification failure
never blocks the parent request:
```js
notifyUser(user.userID, { type, priority, title, message, link, ... })
  .catch((err) => console.error('[notify] foo failed', { ...err }));
```

**Self-exclusion (locked 2026-04-28)** — when the call passes
`triggeredBy` explicitly, the resolver drops that user from the
recipient set. Always pass `triggeredBy: req.user.userID` for
broadcast events so the actor doesn't notify themselves. Genuine
self-events (welcome, account-locked, self password-change) skip
`triggeredBy` so the user still receives their own notification —
the resolver checks `opts.triggeredBy`, not the implicit `ctx.userId`
fallback. Worked example for LAB broadcast: see
`equipment.controller.create` and `/docs/modules/00-notifications.md#worked-example`.

**Endpoints** (all JWT, self-only):
- `GET /api/notifications/me?page&limit&unreadOnly&type&priority`
- `GET /api/notifications/me/unread-count` (bell-badge poll)
- `PUT /api/notifications/:id/read`
- `PUT /api/notifications/me/read-all`
- `DELETE /api/notifications/:id` (soft dismiss; defaultScope hides)

**Frontend pattern**:
- Bell badge polls `useUnreadCount` every 30 s; pauses in background tabs.
- Mark-read on item CLICK only (not hover).
- Bell badge format: `1`–`99` then `99+`.
- Type → icon + color via `notificationIcons.ts` using vendor CSS vars
  (auto-flips dark mode).
- Vendor classes (`notification-dropdown`, `notification-item`,
  `notifi-scroll`) reused verbatim — `style.css:583` provides scroll
  height.

**90-day cleanup of soft-deleted recipient rows** is a TODO scheduled
job — not yet built. Adding before we have load data is premature.

## Admin Dashboard Rule (locked 2026-04-28)

Demo-grade overview at `/dashboard`. ADMIN only — non-admins see a
small "Coming Soon" card.

**Backend** — single aggregated endpoint, no per-widget calls:
- `GET /api/dashboard/admin-stats` (`requireJwtAuth + requireRole(['ADMIN'])`).
- All metrics fetched via `Promise.all` of cheap `Model.count()` queries
  + two `GROUP BY day` queries (last 7 days) + two equipment alert
  queries + two recent-activity queries.
- **Activity dedupe** — `UserActivity` rows in
  `{PROFILE_UPDATED, PHOTO_UPDATED, PASSWORD_CHANGED, PASSWORD_RESET}`
  have an `AuditLog` mirror; counting both double-counts. The chart and
  recent-activity feed include ALL `AuditLog` rows + `UserActivity`
  rows where `actionType IN ('LOGIN','LOGOUT','LOGIN_FAILED')` only.
- **AuditLog actor lookup** — `AuditLog.userID` has no FK by design
  (audit survives user purge). Fetch users in a separate
  `User.findAll({ where: { userID: Op.in } })` and map back. Don't add
  a `belongsTo(User)` association.

**Frontend** — patterns to reuse for any future role dashboards
(MANAGER, TECHNICIAN):
- Query: `useAdminDashboard({ enabled })` with 60 s `refetchInterval`,
  `refetchIntervalInBackground: false`, `placeholderData: prev`. Pass
  `enabled: false` for non-target roles so 403s don't fire on a poll.
- Charts: **chart.js@^4.5.1 + react-chartjs-2@^5.3.1**, vendor versions.
  apexcharts stays installed for future widgets that prefer it; we did
  not migrate.
- Donut center label: read CSS vars at draw time + `key={theme}` on the
  chart so a dark-mode toggle forces a redraw.
- Vendor reference: System Dashboard (`vendor/src/pages/main-module/
  system-dashboard`). Vendor's `storageChart.tsx` is a stylized gauge
  — for a true distribution donut, swap to standard multi-slice
  Doughnut (same library, normal config).
- Equipment alerts row reuses the vendor "API Endpoints Status" pattern
  verbatim; status badges map Healthy/Warning/Critical → VALID /
  DUE_SOON / OVERDUE.

**Future role dashboards** = separate endpoints with their own role
guards (each tightly scoped), NOT a multi-role blob. Don't merge.

References: `/docs/modules/00-dashboard.md`,
`/docs/postman/Dashboard.postman_collection.json`.

## Settings Rule (locked 2026-04-28)

Lab-agnostic key/value store at `/api/settings`. Single `Settings`
table; categories `tenant` / `localization` / `system` / `workflow`;
27 seeded rows. **No new migrations needed for new settings — just
INSERT a row.**

**Backend cache** (`services/settingsService.js`):
- In-memory `Map<settingKey, row>`, loaded at boot via
  `initSettingsCache()` from `server.js` BEFORE the listener binds.
- Every write (`updateSetting` / `bulkUpdate` / `uploadLogo`) calls
  `refreshCache()` so the next read is current.
- Hot-path readers MUST pass a fallback: `getSetting(key, fallback)`.
  Examples: `User.registerFailedLogin` reads `max_login_attempts` (5),
  `account_lockout_minutes` (30); `uploadImage` middleware reads
  `max_attachment_size_kb` (500).
- **Lazy-require `db` inside service functions** to avoid the circular
  dep `User.js → settingsService → db (models/index.js) → User.js`.
  Top-level `require('../models')` in this service breaks boot.
- Cache scope = per Node process. Document, don't fix until
  horizontally scaling.

**Endpoints**:
- `GET /api/settings/public` — UNAUTH. Used by SettingsContext on app
  boot so the login page can render lab name/logo before sign-in.
  IMAGE rows get an embedded `attachment.dataUrl`.
- All others: ADMIN-only via `requireRole(['ADMIN'])`.
- `PUT /api/settings/:key` rejects with **403 + AppError** when
  `isEditable=false`. Use `AppError(msg, 403)` not raw `Error` —
  the global handler reads `AppError.statusCode`, plain `.status` is
  ignored and surfaces as 500.

**`isEditable=false` rows**: `sample_serial_format`,
`report_number_format`. The UI shows them with a "System" badge and
a disabled input. Backend rejects writes. Flip to `true` in the
seeded migration when the consuming module ships.

**Adding a new live system setting**:
1. Add row to `seed-initial-settings` migration (or insert via
   another migration if the seed has run).
2. Add a `settingsService.getSetting('your_key', fallback)` call in
   the consumer.
3. Document under "Live system settings" in
   `/docs/modules/00-settings.md`.
4. Pick a sane hardcoded fallback — settings outage must not block
   the consumer.

**Frontend**:
- `useTenantSettings()` is the only correct way to read lab name /
  short name / logo / website. **Never hardcode a lab name.**
  `src/config/tenant.ts` was deleted — don't recreate it.
- `<SettingsProvider>` wraps the route tree in `App.tsx`.
- Settings page = ONE route `/settings` with a 4-item left rail
  (URL-driven via `?section=lab|localization|system|workflow`). Vendor
  ships separate routes per section; we collapse them.
- Each form follows vendor's `bg-white shadow rounded-md p-5 border`
  card + `border-b` subsection bands + Cancel/Save footer (see
  `SectionFormFrame.tsx`).
- Saves are bulk: a form computes a diff vs `original` snapshot and
  POSTs only changed keys to `PUT /api/settings/bulk`.
- Lab logo upload goes through the dedicated
  `POST /api/settings/lab-logo` endpoint (transactional replace +
  hard-delete of the prior Attachment), NOT the generic
  `/api/attachments` route.
- Admin user-dropdown shows the Settings link only when
  `user.role === 'ADMIN'`. Sidebar Administration section lists
  Users + Settings.

References: `/docs/modules/00-settings.md`,
`/docs/postman/Settings.postman_collection.json`.

## Tenant Branding Rule (LOCKED)

Lab name, short name, logo, and website come from the `tenant`
category of `Settings` — never hardcoded.

**Source rows**:
- `tenant.lab_name` — header + reports.
- `tenant.lab_short_name` — sidebar logo + browser tab.
- `tenant.lab_logo_attachment_id` — `IMAGE` valueType, `dataUrl`
  embedded by `/api/settings/public`.
- `tenant.lab_website` — login page link.

**Read path**:
- Frontend: `useTenantSettings()` hook (from `SettingsContext`).
  ALWAYS use this; `src/config/tenant.ts` was deleted on purpose —
  don't recreate it.
- Login page: reads `/api/settings/public` (unauth) so branding shows
  before sign-in.

**Write path**:
- Logo upload: `POST /api/settings/lab-logo` (multipart, transactional
  Attachment replace + hard-delete). NOT the generic `/api/attachments`.
- Other fields: `PUT /api/settings/bulk` from the Lab Settings form.

**ALWAYS**: read tenant strings via `useTenantSettings()`.
**NEVER**: write `Prime Lab`, `LIMS`, hex brand colors, etc., into
component code. If a placeholder is needed during a transient render,
fall back to `'Loading...'` or empty string — never to a hardcoded
brand name.

## Currency Rule (LOCKED 2026-04-29)

Multi-currency foundation. Lab-agnostic. Built BEFORE Quotes / Invoices
so transactional modules can rely on a stable rate-snapshot pattern.

**Two-table model**:
- `Currencies` — master data (UUID PK, ISO-4217 `code`, name, symbol,
  decimalPlaces ∈ {0,2,3,4}, `isBase`, displayOrder, full audit).
- `ExchangeRates` — historical (UUID PK, currencyID FK, `rate`
  DECIMAL(15,6), effectiveDate, expiryDate nullable, source default
  `'manual'`, notes).

**DB invariants** (partial unique indexes):
- One row per code (case-insensitive, non-deleted).
- At most one base currency.

**Rate convention** (LOCKED — future quote math depends on this):
- `rate = units of THIS currency per 1 unit of base`.
- Base currency rate is **always 1.000000** (implicit; no row required
  but the seed inserts one for documentation).
- Example: AED is base → AED rate=1.0, USD rate≈0.27, EUR rate≈0.25.
- Quote math: `unitPrice = basePrice * rate`.

**Snapshot pattern for transactions** (LOCKED — Quotes/Invoices/Reports):
At quote/invoice creation time, snapshot `currencyID + rate +
exchangeRateDate` onto the parent row AND store both `priceBase` and
`price` per line. Snapshots are immutable; **never** re-read live rates
to recompute historical documents. See
`/docs/decisions/ADR-multi-currency-snapshot-rate.md` (TBD).

**Base currency rules** (enforced in controller):
- First currency created auto-becomes base.
- Base **cannot be deleted** (409).
- Base **cannot be deactivated** (409).
- Base **cannot have rates added** (rate is implicit 1.0; 409).
- Base flip is atomic via `currencyService.setBaseCurrency()` —
  unsets prior base, sets new, syncs `Settings.base_currency_code`,
  refreshes settings cache.

**Rate history** (open-ended pattern):
- Latest rate has `expiryDate = NULL` ("currently active").
- Adding a new rate closes the prior open row by setting its
  `expiryDate` to the new `effectiveDate`. Lookup uses
  `effectiveDate <= date AND (expiryDate IS NULL OR expiryDate > date)`.
- New rates **cannot** predate the current open-ended rate (409).
  Backfill UX = `softDelete` the bad row + create a fresh one.

**Service API** (`backend/src/services/currencyService.js`):
```js
getBaseCurrency()
getBaseCurrencyOrThrow()
getCurrentRate(currencyID)               // null for missing, synthetic for base
getRateOnDate(currencyID, date)
createExchangeRate(currencyID, payload, userId)
setBaseCurrency(targetCurrencyID, userId)
```

**Settings integration**:
- `Settings.base_currency_code` is `isEditable=false` — direct PUT
  rejected. Managed exclusively by the Currency Set-Base flow.

**Endpoints** (all `requireJwtAuth`; writes ADMIN-only):
- `GET    /api/currencies`                        list (currentRate attached)
- `GET    /api/currencies/:id`                    detail
- `GET    /api/currencies/:id/exchange-rates`     history
- `GET    /api/currencies/:id/rate-on-date/:date` historical lookup
- `POST   /api/currencies`                        create
- `PUT    /api/currencies/:id`                    update
- `DELETE /api/currencies/:id`                    soft delete
- `POST   /api/currencies/:id/exchange-rates`     add rate (closes prior)
- `PUT    /api/currencies/:id/set-as-base`        atomic flip + setting sync

Reference: `/docs/postman/Currencies.postman_collection.json`.

## Tax Rate Rule (LOCKED 2026-04-29)

Lab-agnostic tax rate master data. Built BEFORE Quotes / Invoices so
transactional modules lock against a stable contract. Customers do NOT
have linked tax rates — tax is selected **per quote/invoice**. Customers
carry only a `trn VARCHAR(20)` string for invoice display.

**Schema** (`TaxRates` table):

- `taxRateID` UUID PK, `code` VARCHAR(20), `name` VARCHAR(100),
  `rate` DECIMAL(5,2), `type` ENUM('PERCENTAGE') (FIXED reserved),
  `isDefault` BOOLEAN, `description` TEXT NULL, `displayOrder` INTEGER,
  full audit + soft-delete.
- **DB invariants** (partial unique indexes):
  - `LOWER(code)` unique among non-deleted rows.
  - At most one default tax rate (`isDefault WHERE isDefault=true`).
- **Code regex**: `^[A-Z0-9_]+$`. Backend Zod auto-uppercases on input.

**Seed** (4 rows, in migration):
- `VAT_5` (UAE Standard VAT 5%, default), `EXEMPT` (0%), `VAT_10`
  (Standard 10%), `GCC_5` (GCC Standard 5%).

**Default tax rate invariants** (controller):
- Default cannot be deleted (409).
- Default cannot be deactivated (409).
- `isDefault` is NOT in PUT body — strict Zod schema rejects (use
  `set-default` endpoint).
- First created row when no default exists auto-becomes default.

**Set-Default flow** (`taxRateService.setDefaultTaxRate`) — mirrors
Currency Set-Base exactly:
1. Lock + reject if target inactive.
2. Lock + flip current default off.
3. Flip target default on.
4. Update `Settings.default_tax_rate_code` row direct (bypasses
   `settingsService.updateSetting` so the txn handle propagates).
5. `setImmediate` → `settingsService.refreshCache()` post-commit.

**Snapshot pattern for transactions** (LOCKED — Quotes/Invoices/Reports):
At quote/invoice creation time, snapshot
`{ taxRateCode, taxRate (numeric value at submit time) }` onto the
parent row + per-line `taxAmount`. Snapshots are immutable; **never**
re-read live rates to recompute historical documents. Same reasoning as
Currency snapshot. ADR: `/docs/decisions/ADR-tax-rate-architecture.md`.

**Two sources of "the default"** — both are kept in sync atomically:
- `TaxRate.isDefault=true` row → drives the Tax Rates page UI badge +
  set-default flow + DB-level uniqueness.
- `Settings.default_tax_rate_code` → drives Quote/Invoice form
  pre-selection without an extra fetch.

**Endpoints** (all `requireJwtAuth`; reads any user, writes ADMIN):
- `GET    /api/tax-rates`                   list (search + isActive + isDefault + sort)
- `GET    /api/tax-rates/:id`               detail
- `POST   /api/tax-rates`                   create
- `PUT    /api/tax-rates/:id`               update (rejects isDefault)
- `DELETE /api/tax-rates/:id`               soft delete
- `PUT    /api/tax-rates/:id/set-default`   atomic flip + settings sync

**Customer TRN field** (added in this task):
- `Customers.trn VARCHAR(20) NULL`. Optional. Alphanumeric only
  (`^[A-Za-z0-9]+$`). Surfaced in Customer Form Dialog (after Phone)
  and Customer View Dialog (Billing section). Not in the list table.

**Settings additions** (5 keys, all isPublic=false):
- `tenant.bank_name`, `tenant.bank_branch`, `tenant.bank_account_number`,
  `tenant.bank_iban` (Lab Information → Bank Details subsection).
- `workflow.default_tax_rate_code` (Workflow Defaults → Tax subsection,
  populated from `/api/tax-rates?isActive=true`).

**Reusing for any future "one-of-N flag" entity**: same pattern as
Method's `isDefault` per Test, Currency's `isBase`. Single partial
unique index + service-layer atomic flip. If the flag also drives a
Settings row, the flip writes BOTH inside one transaction and refreshes
the settings cache `setImmediate` after commit.

References: `/docs/modules/00-tax-rates.md`,
`/docs/decisions/ADR-tax-rate-architecture.md`,
`/docs/postman/TaxRates.postman_collection.json`.

## Search Rule (LOCKED 2026-04-29)

Lab-agnostic global search. Single endpoint, single page. Built BEFORE
the starter-template copy so the header ⌘K shortcut is functional.

**Endpoint** (`requireJwtAuth`):
- `GET /api/search?q=<term>&category=<all|customers|users|tests|methods|equipment|categories|sources|currencies>`
- Phase 1 role gate: ADMIN/MANAGER → full results; others → empty
  payload. Per-entity role filtering (CUSTOMER scoping) lands with
  Quotes / Samples / Reports.

**Validation**:
- `q` required, 2-200 chars (trimmed). 422 otherwise.
- `category` default `'all'`; enum-validated against
  `searchService.SUPPORTED_CATEGORIES`.

**Response shape** — `category=all` returns
`resultsByCategory: { <cat>: { count, results: [...] } }` with empty
buckets omitted (5/bucket cap). Single-category mode returns flat
`results: [...]` (50 cap).

**Per-result shape** (every category):
```ts
{ id, type, name, subtitle, isActive, link: '/<entity>?view=<id>' }
```

**Adding a new entity to search**:
1. Add a `shape<Entity>` + a fetcher entry inside
   `services/searchService.js#buildCategoryQueries`.
2. Append the category key to `SUPPORTED_CATEGORIES`. Zod enum picks it
   up automatically.
3. Document the field set in `/docs/modules/00-search.md`.

**Frontend** (`/search` route):
- `SearchResultsPage.tsx` owns the live input + 300 ms debounce. URL
  contract: `?q=<term>&category=<cat>`.
- Header search is a real input with a neutral search-icon button
  *inside* the right edge (same slot the ⌘K kbd lived in; vendor topbar
  tokens — `bg-(--topbar-input-bg) text-(--topbar-input-icon)`). Type +
  Enter OR click icon → `navigate('/search?q=<v>')`; the same submit on
  `/search` updates `?q=` with `replace: true` so back still returns to
  the launching page. Empty / 1-char queries → icon button disabled
  (`opacity-50 cursor-not-allowed`) and Enter is a no-op. Both inputs
  (header + page) seed from `?q=`; the URL is the single source of
  truth — they never talk to each other directly.
- Page-level `SearchInput` mirrors the same pattern (rounded input,
  neutral icon-button inside the right edge, no glued primary button —
  the previous primary-blue rectangle didn't fit visually) and exposes
  an `onSubmit(v)` callback fired on Enter or icon click; the page
  wires it to an immediate `setParams({ q: v }, { replace: true })` so
  the submit bypasses the 300 ms debounce.
- Header input re-syncs from URL on route/URL change UNLESS focused (so
  it doesn't stomp on what the user is typing).
- Global ⌘K via `useKeyboardShortcut('k', ..., { meta: true })` mounted
  in `Header.tsx` focuses the header input — but no-ops on `/search`,
  where the page hook claims ⌘K to focus the (more prominent) page
  input. Both hooks `preventDefault`; only one acts per page.
- Vendor reference: `/vendor/src/pages/application/search-result/
  searchResult.tsx`. Page frame, tab-pill filter row, section-header
  layout, and 2-column card grid are reused; per-card kebab dropdown
  is dropped (entity CRUD belongs on the entity page).
- Match highlighting is inline (regex-escape + `<mark className="text-
  primary bg-transparent font-semibold">`); no external library.
- Inactive rows still appear, marked with a small "Inactive" badge.

**`?view=<id>` + `?search=<q>` deep-link contract** (LOCKED — required
for any list page that wants to be a search target):
1. Page reads `params.get('view')` and seeds `viewingId` from it.
2. `useEffect([viewParam])` keeps `viewingId` in sync (back/forward).
3. `closeView()` clears the modal AND the URL param via
   `setParams(..., { replace: true })`.
4. Fallback `useEntity(id)` fetch when the row isn't on the current
   paginated page (search may target an entity 7 pages back).
5. `SearchResultCard` appends `&search=<q>` to every result link so the
   destination list also pre-filters its table — closing the modal
   leaves the user in context, not on a generic page-1 list.

**Field-overlap rule** when adding a new entity to global search:
verify the list endpoint's `search` clause is at least as broad as the
global search service's field set for that entity. Otherwise a result
the user clicked from global may not appear in the pre-filtered list,
producing a "found here, missing there" inconsistency. Current state:
Customers (list ⊇ global), Tests (equal), Users (equal) — all safe.

Currently wired: `/customers?view=`, `/tests?view=`, and
`/users?view=`. The remaining 5 list pages (Methods, Equipment,
Categories, Sources, Currencies, + any new module) follow the same
mechanical pattern — copy the four blocks above. Until then, clicking
a result for those entities just navigates to the list page.

References: `/docs/modules/00-search.md`,
`/docs/postman/Search.postman_collection.json`.

## Backend Update Rule
- All PUT controllers use `instance.auditedUpdate(payload, userId)` (added by
  `applyAuditHooks` to every model prototype). **Bare `instance.update()` for a
  user-edit save is a regression** — it can leave `updatedAt` frozen when
  payload values match current row.
- System-internal updates (`RefreshToken.update({ revokedAt })`, cascade resets,
  etc.) keep using bare `.update()`. Not user clicks → no audit bump.
- Reference: `/docs/decisions/ADR-backend-audited-update-pattern.md`

## Rules
- Sample numbers: LS-YYYYMMDD-XXXXX (reset daily)
- Report numbers: RP-YYYYMMDD-XXXXX (reset daily)
- Quote numbers: QT-YYYYMMDD-XXXXX (reset daily)
- UUID primary keys on all models
- 4dp for Density, 3dp for Viscosity, 0dp for Flash Point and Sulphur
- Soft delete only (isDeleted flag), separate from isActive status
- All audit fields on every table (createdBy, updatedBy, deletedBy)
- Every result mutation writes to AuditLog
- Versioning on FinalResult and Report (isLatest flag)

## Module Build Order
0. Activity Logging         ✅ Complete (UserActivity + AuditLog backends shipped 2026-04-28; Module 8 UI deferred)
0. Attachments              ✅ Complete (DB-base64; User photos shipped 2026-04-28)
0. Notifications            ✅ Complete (two-table + scope routing; bell + dropdown + page; 4 initial event hooks shipped 2026-04-28)
0. Currency                 ✅ Complete (multi-currency foundation: Currencies + ExchangeRates + open-ended history + atomic Set-Base; shipped 2026-04-29)
0. Search                   ✅ Complete (global search across 8 entities + ⌘K + `/search` page + `?view=` deep-link contract; shipped 2026-04-29)
0. Tax Rates                ✅ Complete (master data + per-quote selection + atomic Set-Default + Customer.trn + bank settings; shipped 2026-04-29)
1. Master Data              ✅ Complete (10 APIs; User CRUD moved to Auth module)
2. Auth & User Management   ✅ Complete (JWT + User CRUD + photos; ADR-006 stub removed)

## Frontend Build Order
1. Foundation (Phase 1)     ✅ Complete (Vite + RTK + TanStack Query + Tailwind v4 + Axios)
2. Login + Auth Flow        ✅ Complete (login page, JWT integration, boot refresh, mustChangePassword)
3. Main Layout              ✅ Complete (Dreams AI theme integrated, sidebar + header)
4. Customers CRUD           ✅ Complete (TEMPLATE for remaining 9 master-data pages)
5. Master Data replication  ✅ Complete (9/9 + Customer template = all 10 master-data pages: Customer, SourceTypes, Sources, Categories, Equipment, OcmElements, Specifications, Units, Tests, Methods — all with FilterMenu + Activate/Deactivate toggle)
6. Users CRUD               ✅ Complete (Admin/Manager-only; role badge + lockout indicator + dual-mode reset-password modal with one-shot temp password reveal; self-row gating)
7. Profile page             ✅ Complete (vendor profile.tsx adapted: cover banner + pencil-overlay avatar + activity feed; Module 02 Phase 9)
8. Admin Dashboard          ✅ Complete (System Dashboard variant; chart.js@4.5.1; ADMIN-only)
9. Settings                 ✅ Complete (key/value store; 4 categories; live system settings)
10. Currency UI             ✅ Complete (Currencies page + 5 dialogs: View/Add/Edit/Delete/UpdateRate/SetBase; rate history timeline; Localization form integrated; shipped 2026-04-29)
11. Global Search UI        ✅ Complete (`/search` page + tab-pill filter + 2-column card grid + inline match highlighting + ⌘K + `?view=` auto-open on Customers/Tests; shipped 2026-04-29)
12. Tax Rates UI            ✅ Complete (Tax Rates page + 4 dialogs: View/Add/Edit/Delete + SetDefault with implications copy; Customer TRN field; Settings Bank Details + Default Tax dropdown; shipped 2026-04-29)

## Sidebar Structure
Two-column vendor sidebar. Left-column icons map to right-column section panels:
- 🏠 Home → Dashboard
- 👥 Customers → Customers, Sources, Source Types
- 📦 Master Data → Categories, Units, Tests, Methods, Specifications, Equipment, OCM Elements, Currencies, Tax Rates
- ⚙️ Administration → Users, Settings

Source Types and Sources sit under **Customers** (not Master Data) because they
describe where customers source their oil from — lab manager mental model groups
them with customers.

Active-section detection follows route prefix: `/source-types` and `/sources`
activate the Customers section.

## Master Data UI Replication Rule
The Customer page (Phase 4) is the **locked template** for all 10 master-data
screens. **Don't innovate during replication. Match the Customer pattern
verbatim and only swap data fields + entity-specific validation.**

What changes per entity: field names, validation, table columns, view/form
field display, labels, route.
What stays (locked patterns):
- File layout under `src/features/<entity>/` + `src/pages/<Entity>Page.tsx`
- Vendor classes, table card wrapper, search position, pagination footer
- Dialog structure (View / Form / Delete) and Radix `Dialog` primitive
- URL-driven state machine (page/limit/sort/order/search) with 300 ms debounce
- TanStack Query hooks with `placeholderData: (prev) => prev`
- **Loading**: skeleton rows on initial load (no rows yet) + thin `h-1` indeterminate top progress bar on refetch (sort/page/search). Driven by `isLoading` vs `isFetching`. Don't use PrimeReact's built-in `loading` prop.
- **Form submit**: `<fieldset disabled={isSubmitting} className="contents">` wraps inputs; submit button shows spinner + "Saving..." (or "Update <Entity>" / "Add <Entity>" when idle). Modal stays open until response.
- **No autoFocus on form fields**: with `mode: 'onTouched'`, autoFocus + click-away-before-typing fires premature "<field> is required" errors. Open modal with no focus; user picks where to start. Latent bug in pure-text forms; visible the moment an FK select is added.
- **Delete confirm**: spinner + "Deleting..." while pending; Cancel disabled too.
- Toast format (past-tense, names the record)
- Backend update via `instance.auditedUpdate(payload, userId)`

**Don't re-investigate vendor for replicated pages.** Customer already did
that. If you find yourself debugging cascade layers, table borders, or modal
patterns again, stop — copy from Customer.

**FK pattern (locked 2026-04-27 — Sources):**
- `<FKSelect>` (`src/components/ui/FKSelect.tsx`) wraps `react-select` with
  vendor-aligned styles. Use it for all FK dropdowns AND filter bars — never
  reach for raw react-select again.
- Lookup queries: reuse the entity's existing `use<Entity>` hook with
  `{ limit: 100, sort: 'name', order: 'asc' }` (TanStack caches across
  consumers).
- RHF wiring uses `<Controller>` (FKSelect is not a native input).
- Edit-mode FK lock: pass `isDisabled={isEdit}` for FKs the backend won't
  accept on PUT.

**Enum + filter chip patterns (locked 2026-04-27 — Categories):**
- `<EnumSelect>` (`src/components/ui/EnumSelect.tsx`) — thin wrapper around
  FKSelect with `isSearchable={false}` for static enum dropdowns (3–5
  values). Use this for `type`, `calibrationStatus`, `role`, etc. Never use
  native `<select>` (browser styling breaks form rhythm).
- Filter chip row: small enum filters (≤5 values) render as clickable chips
  above the table — `All` chip always present to clear; URL-driven; resets
  `?page=1` on chip click. Use the filter-bar (FKSelect dropdowns) for FK
  filters or 6+ values.

**Date/Time picker patterns (locked 2026-04-27 — Equipment):**
- `<DateTimePicker>` (`src/components/ui/DateTimePicker.tsx`) — date /
  datetime / range modes. Output: `"YYYY-MM-DD"` / `"YYYY-MM-DDTHH:mm"` /
  `{ from, to }`.
- `<TimePicker>` (`src/components/ui/TimePicker.tsx`) — time-only fields.
  Output: `"HH:mm"`.
- Both wrap PrimeReact `<Calendar />` (vendor's actual choice; flatpickr
  package.json entry is unused leftover). `appendTo="self"` to dodge the
  Radix Dialog pointer-events trap. Always wrap in `<Controller>`.
- Never use native `<input type="date">` or third-party flatpickr.

**Cross-field validation (locked 2026-04-27 — OcmElement):**
- Use Zod `superRefine` for rules where one field's validity depends on
  another (numeric ranges, end ≥ start, etc.). Mirror the backend's
  superRefine exactly.
- Attach `path: ['<offendingField>']` to each issue so errors render
  inline beneath the bad input — never use a banner for cross-field rules.
- Collect all violations in one pass; don't chain `.refine()`.

**Dark mode rules (locked 2026-04-27):**
- **Theme tokens flip via `[data-theme="dark"]`** on `<html>`. Vendor's
  `style.css:1365` defines all dark-mode CSS vars (`--color-white`,
  `--color-dark`, `--color-gray-*`, etc.). Tailwind v4 utilities like
  `bg-white`, `text-dark`, `text-gray-900` emit `var(--color-*)` and flip
  automatically — use them.
- **Use vendor variables, NEVER hardcoded hex.** `text-dark`/`text-default`
  for body text, `bg-white`/`bg-light` for surfaces, `border-border-color`
  for dividers. Hardcoded `text-black`, `text-[#212529]`, `bg-[#fff]` won't
  flip.
- **PrimeReact dark mode**: lara-light-indigo theme bakes light hex colors
  into selectors that ignore our vars. Override file at
  `src/styles/custom/primereact-dark.css` maps PrimeReact selectors back to
  vendor's dark vars under `[data-theme="dark"]`. Add to it whenever a new
  PrimeReact component leaks light styles in dark mode.
- **Opacity-modified `text-white/N` and `bg-white/N` are a trap**. Tailwind
  v4 emits `color-mix(var(--color-white), N%)` which goes DARK in dark
  mode (since `--color-white` is dark there). Vendor's spot-fix at
  `style.css:1438` only covers plain `.text-white`. For permanent
  white-on-dark surfaces (e.g. login brand panel), wrap in
  `className="brand-panel"` — `utilities.css` re-emits the opacity
  variants as literal `rgba(255,255,255,N)` in that scope.

**Users page patterns (locked 2026-04-28):**
- `<RoleBadge>` (`src/features/users/RoleBadge.tsx`) — color-coded pill per
  role (ADMIN red, MANAGER primary, TECHNICIAN warning, RECEPTIONIST gray,
  CUSTOMER info). Reuse for any future role display.
- `<UserResetPasswordDialog>` — two-step flow: form (radio: generate vs
  type) → result panel that reveals server-returned `tempPassword` ONCE
  with copy-to-clipboard. No success toast on reset; the panel IS the
  feedback. The result is shown only on this view; if the admin closes
  before copying, they must re-reset.
- **Self-row gating** — when a list page targets data the signed-in user
  shouldn't act on themselves (themselves as a User row, future "edit my
  own role" cases), hide Edit/Activate-Deactivate/Reset/Delete in the
  action menu and render a subtle "You" placeholder. Backend still 403s
  if circumvented (cannot delete self, etc.).
- **Conditional FK in form** — when a field's relevance depends on another
  field's value (`customerID` only when `role=CUSTOMER`), render the
  FKSelect conditionally on the watched value AND clear it via
  `setValue` when it becomes irrelevant, so the cross-field Zod rule
  passes silently. Mirror the backend `superRefine`.
- **Belongs-to include** — when adding `include` for a `belongsTo` whose
  target has a default scope, set `required: false` to force LEFT JOIN.
  Otherwise Sequelize generates an INNER JOIN and rows with a NULL FK
  disappear. Bug seen 2026-04-28 with User → Customer (admin users have
  null customerID and were filtered out of GET /api/users).

**FilterMenu + Activate/Deactivate toggle (locked 2026-04-27 — MANDATORY for all list pages):**
- `<FilterMenu>` (`src/components/ui/FilterMenu.tsx`) is the SINGLE filter
  pattern for every master-data and module list page. Header reads
  `[Title] [Search] [Filter] [Sort]`; Filter opens a dropdown with one
  section per declared filter (chips for enums, FKSelect for FK lookups);
  batch Apply commits all changes at once. Never put filter rows above
  the table. Never inline `<FilterChip>` helpers per page.
- Action menu on every row has `Edit / Activate-Deactivate / Delete` (in
  that order). Activate/Deactivate uses `useToggleActive<Entity>` with
  optimistic UI: status pill flips immediately; full-payload PUT fires;
  on error → rollback + error toast; no confirmation dialog (low-stakes,
  reversible).
- These two patterns are MANDATORY for all future modules: Quotes, Samples,
  Reports, Audit Logs, etc. Don't reinvent.

**Build order rule:**
When building related master-data pages, build entities WITHOUT foreign
keys FIRST, THEN entities that reference them. Avoids creating test data
without proper FK references.

Actual FK dependency graph (verified against `backend/src/models/`):
- **Standalone (no FKs)**: Customer, Category, SourceType, Equipment, OcmElement, Specification
- **Single FK**: Unit → Category, Test → Category
- **3 FKs**: Source → Customer + SourceType + Category
- **Chain**: Method → Test

Recommended build order: Customer ✅ → SourceTypes ✅ → Categories ✅ →
Equipment / OcmElement / Specification (standalone, any order) → Units (→
Category) → Tests (→ Category) → Sources ✅ (→ Customer/SourceType/Category)
→ Methods (→ Test). Sources shipped early because the cross-customer view
was needed for FK pattern lock-in.

References:
- `/docs/modules/frontend-04-customers.md` — phase 4 ship summary
- `/docs/patterns/master-data-page.md` — full template spec (incl. FK + filter pattern)

## Critical Files Reference

**Backend utilities** (`/backend/src/`):
- `utils/auditHooks.js` — `applyAuditHooks(Model)` + `auditedUpdate` /
  `softDelete` prototypes.
- `utils/auditableModel.js` — `applyAuditLogging(Model, entityType,
  { excludeFields? })`. Owns soft-delete recognition + skipAudit opt-out.
- `utils/requestContext.js` — AsyncLocalStorage wrapper carrying
  `userId / ipAddress / userAgent / requestId` to hooks.
- `utils/errors.js` — `AppError`, `NotFoundError`, `ConflictError`,
  `UnauthorizedError`, `ForbiddenError`. Use `AppError(msg, statusCode)`
  — global handler reads `.statusCode`, NOT `.status`.
- `utils/pagination.js` — `parsePagination`, `buildMeta`.

**Backend services** (`/backend/src/services/`):
- `activityLogger.js` — `logActivity({ userID, actionType, ... })`.
- `notificationService.js` — `notify(...)` with PERSONAL/CUSTOMER/LAB
  scopes. Always fire-and-forget.
- `settingsService.js` — in-memory cache + `getSetting(key, fallback)`.
  Lazy `require('../models')` inside functions (circular dep).
- `currencyService.js` — base/current-rate lookups + atomic Set Base.
- `taxRateService.js` — default lookup + atomic Set-Default (mirrors
  currencyService Set-Base; updates `Settings.default_tax_rate_code`).

**Backend middleware** (`/backend/src/middleware/`):
- `requireJwtAuth.js` — sets `req.user`, updates ALS context.
- `requireRole.js` — `requireRole(['ADMIN', 'MANAGER'])` chain.
- `validate.js` — `validate({ body, query, params })` with Zod schemas.
- `requestContext.js` — top-level ALS bootstrap.

**Frontend shared** (`/frontend/src/`):
- `contexts/SettingsContext.tsx` — `<SettingsProvider>` +
  `useTenantSettings()` (the only correct way to read lab name/logo).
- `lib/toast.ts` — `import { toast } from '@/lib/toast'` (never import
  `react-hot-toast` directly).
- `components/ui/Dialog.tsx` — Radix wrapper for all modals.
- `components/ui/FormField.tsx` — `inputClass`, `textareaClass`.
- `components/ui/FKSelect.tsx` — vendor-styled react-select wrapper.
- `components/ui/EnumSelect.tsx` — short fixed enum dropdown.
- `components/ui/DateTimePicker.tsx` / `TimePicker.tsx`.
- `components/ui/FilterMenu.tsx` — single filter pattern for list pages.
- `components/ui/PageHeader.tsx` — breadcrumbs + actions slot.
- `components/ui/AttachmentUpload.tsx` / `Avatar.tsx`.

**Pattern docs**:
- `/docs/patterns/master-data-page.md` — locked template for list pages.
- `/docs/decisions/` — every architectural decision (read before
  proposing changes that touch any locked area).

## Deferred Items (consolidated)

Tracked here so a future session doesn't re-investigate something we
deliberately left out.

**Per ADR-008 (auth scope)**:
- `helmet` middleware — security headers not yet applied at the
  Express layer.
- Rate limiting — no per-IP throttle on `/auth/login`. Lockout covers
  per-account brute force; per-IP is a separate concern.
- Email verification flow — accounts are admin-created; no self-signup.
- Password-reset email service — admin in-app reset only (one-shot
  temp password reveal, see Users page rule).

**Notifications**:
- 90-day cleanup job for soft-deleted `NotificationRecipients` rows.
  Add when load data justifies it; premature today.

**Currency**:
- Quote-side child-count check on currency delete (Parent Deletion
  Policy). Wire when Quotes module ships.
- Per-day FX feed (`source: 'api'`, e.g. `fixer.io`). Schema is ready
  (`source` is a free VARCHAR(50)); UI + cron job deferred.

**Activity / Audit**:
- Module 8 (Audit Logs UI) — backend ready; no frontend yet.

**Equipment**:
- Calibration scheduled alerts (cron-based, nightly scan for
  `calibrationStatus = DUE_SOON / OVERDUE`). Not built — gate on a
  cron / scheduler decision.

**Settings cache**:
- Horizontal scaling story — current cache is per-Node-process. Swap
  to Redis PUB/SUB or broadcast invalidation when more than one app
  server runs.

**Future modules** (post-LIMS-launch):
- Chat module — see `/docs/future/chat-module-spec.md` if present.
- WebSocket transport for real-time notifications (current bell uses
  30s polling).

## Current Work
**Module 00 — Tax Rates (per-quote tax selection foundation)** ✅ **COMPLETE (2026-04-29).**
Built BEFORE Quotes / Invoices so transactional modules lock against
a stable contract. Customers do NOT carry tax rates — tax is selected
per quote/invoice. Customers carry only a `trn VARCHAR(20)` string for
invoice display.

Schema: `TaxRates` table with partial unique indexes (case-insensitive
code uniqueness + single default). Seed: VAT_5 (default), EXEMPT,
VAT_10, GCC_5. Default cannot be deleted, deactivated, or modified
via PUT (use `/set-default`).

Atomic Set-Default flow (`taxRateService.setDefaultTaxRate`) flips
both the `isDefault` row AND `Settings.default_tax_rate_code` in one
transaction; settings cache refreshes post-commit. Mirrors Currency
Set-Base pattern exactly.

Customer model gained `trn VARCHAR(20) NULL` (alphanumeric, optional).
Settings gained 5 new keys: 4 bank details under tenant
(`bank_name/branch/account_number/iban`) + `default_tax_rate_code`
under workflow. All isPublic=false.

Frontend: `/tax-rates` master-data page reuses Currency template +
SetDefaultTaxRateDialog with implications copy. Customer Form Dialog
gained TRN input. Customer View Dialog shows TRN in Billing section.
Settings: Lab Information form gained "Bank Details" subsection;
Workflow Defaults gained "Tax" subsection with FKSelect dropdown
populated from `/api/tax-rates?isActive=true`.

Verified end-to-end (2026-04-29) via curl + 17-request Postman:
- 4 seed rows, VAT_5 default; isDefault filter returns only VAT_5.
- DELETE default → 409; PUT isActive=false on default → 409.
- POST cst_12 (lowercase) after CST_12 created → 409 (case-insensitive guard).
- PUT body with isDefault=true → 422.
- Set CST_12 as default → 200; VAT_5 flips false; settings cache flips to CST_12.
- Restore VAT_5 → setting flips back atomically.
- Customer create with TRN round-trips on create + GET.
- Customer create with `"100 366 4578"` (spaces) → 422.

References: `/docs/modules/00-tax-rates.md`,
`/docs/decisions/ADR-tax-rate-architecture.md`,
`/docs/postman/TaxRates.postman_collection.json`.

**Module 00 — Currency (multi-currency foundation)** ✅ **COMPLETE (2026-04-29).**
Lab-agnostic foundation built BEFORE Quotes / Invoices / Reports so
transactional modules lock against a stable contract from day one.

Two-table architecture: `Currencies` (master data, partial unique
indexes for one-base-currency + case-insensitive code) +
`ExchangeRates` (open-ended history; latest row has `expiryDate=NULL`,
auto-closed when newer rate inserted). Rate convention: `rate = units
of THIS currency per 1 BASE unit`. Snapshot pattern for transactions:
freeze `currencyID + rate + exchangeRateDate` on the parent row +
both `priceBase` and `price` per line. Historical docs never re-read
live rates.

Backend: 9 endpoints (4 read, 5 write — ADMIN-only writes). Atomic
Set-Base flow (`currencyService.setBaseCurrency`) flips both currency
rows + syncs `Settings.base_currency_code` + refreshes settings cache.
Base currency cannot be deleted, deactivated, or have rates added
(409 each). First currency auto-becomes base. Currency + ExchangeRate
both audited (audited model count: 12 → 14).

Frontend: `/currencies` page reuses master-data template (FilterMenu,
optimistic activate/deactivate, View / Add / Edit / Delete modals,
URL-driven state, skeleton + progress bar). Plus three currency-only
dialogs: Update Rate (closes prior open row), Set as Base (with
implications copy), and a Rate History timeline in the View modal.
Localization form rewritten — Currency subsection now displays the
base code read-only with a "Manage Currencies →" link (currency_code/
currency_symbol settings deleted in migration).

Verified end-to-end (2026-04-29) via Postman (13 requests):
- AED base; `currentRate.rate = '1.000000'`, `source = 'base'`.
- DELETE base → 409; Deactivate base → 409.
- POST USD without `initialRate` → 422; with `initialRate=0.27` → 201.
- Add USD rate effective 2026-05-15 → prior row closed.
- `rate-on-date` returns the right row for both 2026-05-01 (0.27) and
  2026-05-20 (0.28).
- Set USD as base → AED's isBase flips false; USD's flips true;
  `/api/settings/public` shows `base_currency_code = USD`.
- Add rate to USD (now base) → 409.
- Cleanup restored AED as base.

References: `/docs/modules/00-currency.md`,
`/docs/decisions/ADR-multi-currency-snapshot-rate.md`,
`/docs/postman/Currencies.postman_collection.json`.

**Module 00 — Notifications** ✅ **COMPLETE (2026-04-28).**
Lab-agnostic notification foundation, built BEFORE Sample Intake so
every later module can reuse it.

Two-table model (`Notifications` + `NotificationRecipients`) with
scope-based audience routing (PERSONAL / CUSTOMER / LAB). Multi-
notification per event is the documented pattern — single events can
emit multiple notifications tuned per audience.

Initial events wired:
- User created → INFO/LOW welcome → `/dashboard`.
- Self password change → INFO/MEDIUM security → `/profile`.
- Account locked (5th failed login) → ERROR/CRITICAL warning.
- Admin password reset → WARNING/HIGH to target → `/change-password`.

Frontend: real `<NotificationBell />` with numeric badge (1–99 then
"99+"), vendor-styled dropdown (recent 10, All/Unread tabs, mark-all),
full `/notifications` page with FilterMenu (read state + type +
priority) and pagination. Mark-read on click only.

Backend smoke (verified 2026-04-28 with curl):
- Create user → recipient row inserted; new user sees Welcome on first login.
- Self password change → MEDIUM Password Changed notification.
- 5 wrong-password attempts → CRITICAL Account Locked appears alongside
  LOGIN_FAILED activities.
- Admin reset → target user sees HIGH Password Reset; `triggeredBy`
  carries the admin's userID.
- Mark-read / mark-all / soft-dismiss / unread-count all behave correctly;
  defaultScope hides dismissed rows.

References: `/docs/modules/00-notifications.md`,
`/docs/decisions/ADR-notification-routing-architecture.md`,
`/docs/postman/Notifications.postman_collection.json`.

**Module 02 Phase 9 — Profile page + Activity/Audit logging foundation** ✅ **COMPLETE (2026-04-28).**
Two systems shipped:
- **UserActivity** — user-facing feed (Profile page). Manual logs from
  auth + user controllers. Surfaces in `/profile` activity feed.
- **AuditLog** — automatic data-change tracking via Sequelize hooks on
  12 models. Backend ready; UI deferred to Module 8 (Audit Logs).

Profile page: vendor `profile.tsx` adapted with cover banner gradient,
pencil-overlay avatar (new `AttachmentUpload` variant), activity feed
with date grouping and dashed connector. Header dropdown gains "View
Profile". Backend self-update allowlist now includes
`profilePhotoAttachmentID` so users can manage their own photo.

Verified end-to-end via curl:
- LOGIN → UserActivity row.
- Customer UPDATE → AuditLog `before/after` diff (only changed fields).
- User UPDATE → no `password` substring or `$2b$` hash in JSON.
- Soft-delete → `action: 'DELETE'` recognized from isDeleted flip.
- Login/logout cycle → 0 AuditLog rows added (RefreshToken not audited;
  user.save() opted out via `skipAudit: true`).

References: `/docs/modules/00-activity-logging.md`,
`/docs/decisions/ADR-useractivity-vs-auditlog.md`,
`/docs/decisions/ADR-async-local-storage-request-context.md`.

**Module 00 — Attachments + User profile photos** ✅ **COMPLETE (2026-04-28).**
Attachments table (base64 in DB), `Users.profilePhotoAttachmentID` FK,
hard-delete on replace inside a transaction, dual auth/me/login response
include of `profilePhoto`. Reusable `<Avatar>` + `<AttachmentUpload>`
components. Vendor dashed-box visual + real drag-drop. Backend smoke:
upload → assign → replace (old hard-deleted) → null (current
hard-deleted) → list returns dataUrl. See `/docs/modules/00-attachments.md`
and `/docs/decisions/ADR-attachments-storage-strategy.md`.

**Frontend Phase 6 — Users CRUD** ✅ **COMPLETE (2026-04-28).**
Users page replaces the placeholder under Administration. Reuses the locked
master-data template (FilterMenu, Activate/Deactivate, View/Add/Edit/Delete
modals, URL-driven state, debounced search, skeleton + progress bar) plus
Users-specific patterns: RoleBadge, dual-mode reset-password modal with
one-shot temp password reveal, conditional `customerID` FK (CUSTOMER role
only), self-row action gating, lockout indicator on Status pill. Backend
edit: `User.findAndCountAll` and `findByPk` now `include` Customer with
`required: false` so LEFT JOIN keeps admin/staff rows visible.

**Frontend Phase 5 — Master Data replication** ✅ **COMPLETE (2026-04-27).**
All 10 master-data pages shipped: Customer (template), SourceTypes, Sources,
Categories, Equipment, OcmElements, Specifications, Units, Tests, Methods —
each with FilterMenu, Activate/Deactivate optimistic toggle, dark mode
support, View / Add / Edit / Delete modals, URL-driven state, debounced
search, skeleton + thin progress-bar loading, full keyboard accessibility.

Locked patterns added during Phase 5:
- FKSelect (FK dropdowns) + EnumSelect (enum dropdowns)
- DateTimePicker + TimePicker (date / time / datetime / range)
- FilterMenu (unified filter dropdown with batch Apply — replaces older
  per-page chip / filter-bar patterns)
- Activate/Deactivate toggle with optimistic UI (full-payload PUT)
- No-autoFocus rule (prevents premature `mode: 'onTouched'` errors)
- Dual-shape backend endpoints (flat + nested) for FK-bearing master-data
  (Sources, Units, Tests, Methods) — flat used by master-data pages,
  nested kept for parent-detail views and existing API consumers
- Zod `superRefine` for cross-field validation
- `DataTypes.VIRTUAL` for computed API fields (NOT `getterMethods` — those
  don't serialize via Sequelize 6 `toJSON()`)
- Textarea pattern (Method description) — `textareaClass()` from FormField
- isDefault sibling-flip transaction (Method) — backend handles it on flat
  POST too; UI just sends the value

Backend: Module 01 (Master Data, all 10 APIs) and Module 02 (Auth + User
CRUD) shipped. Dual-shape additions on 2026-04-27: Sources, Units, Tests,
Methods all got flat `GET/POST /api/<entities>` endpoints to support the
master-data global views.

## Docs
See /docs folder for architecture and module details:
- /docs/architecture/overview.md
- /docs/architecture/database-schema.md
- /docs/architecture/api-conventions.md
- /docs/modules/ — per-module specifications
- /docs/decisions/ — Architectural Decision Records (ADRs)
