# Starter Guide

A one-page reference for using this template on a new project.

## What This Is

A working LIMS (Laboratory Information Management System) extracted as a
starter. It keeps real, shipped code as **working examples** of common
SaaS patterns — auth, RBAC, settings, attachments, audit logging,
notifications, multi-currency, global search, and a master-data CRUD
template — so a new project can clone and start on day one.

This is the opposite of a clean-slate boilerplate. The plumbing is
already wired against working modules. You delete or rename what doesn't
match your domain, then build new modules using the locked patterns.

## What's Included

**Foundations**
- Auth — JWT access + refresh, lockout, password reset, mustChangePassword
- Users — CRUD, roles (5), profile photos, self-row gating
- Profile page — vendor banner + avatar upload + activity feed
- Activity Logging — `UserActivity` (manual) + `AuditLog` (auto hooks on
  14 models)
- Notifications — two-table, scope-based (PERSONAL / CUSTOMER / LAB),
  bell + dropdown + `/notifications` page
- Settings — key/value store, 4 categories, public unauth endpoint, in-
  memory cache, lab logo upload
- Currency — multi-currency master + open-ended rate history + atomic
  Set-Base + snapshot pattern
- Search — global search across 8 entities + ⌘K + `/search` page +
  `?view=` deep-link contract
- Dashboard — admin overview, chart.js donuts, equipment alerts, recent
  activity
- Attachments — DB-base64, transactional replace, `<Avatar>` +
  `<AttachmentUpload>` components

**Master-data CRUD template (10 example pages)**
Customer, SourceTypes, Sources, Categories, Equipment, OcmElements,
Specifications, Units, Tests, Methods — each built from the same locked
template (FilterMenu, Activate/Deactivate, View/Add/Edit/Delete modals,
URL-driven state, skeleton loading, keyboard accessibility, dark mode).

## What To Customize

The 10 master-data modules are LIMS examples. For your domain:

- **Replace** — delete a module (e.g. `OcmElement`) and scaffold your
  own using the locked pattern. Copy `Customer` as the starting point.
- **Rename** — keep the structure, change the entity name. Common
  remaps:
  - `Equipment` → `Vehicle` / `Asset` / `Device`
  - `Test` → `Service` / `Procedure` / `Treatment`
  - `Method` → `Protocol` / `Standard`
  - `OcmElement` → (often delete; very LIMS-specific)
  - `Specification` → (often delete; LIMS-specific)
  - `Sources` / `SourceTypes` → (often delete; LIMS-specific)
  - `Categories` / `Units` → usually map cleanly to most domains
- **Delete** — remove what doesn't fit. The route registry, sidebar,
  search service, and dashboard widgets all need a small follow-up edit
  per removed entity. Grep for the entity name to find every site.

Tenant branding lives in `Settings`, not in code:
- `tenant.lab_name` — header + reports
- `tenant.lab_short_name` — sidebar + tab title
- `tenant.lab_logo_attachment_id` — logo (uploaded via UI)

Update the seeded defaults in
`backend/src/migrations/20260428400001-seed-initial-settings.js` before
the first migration run, OR change them via the Settings page after
login.

## What To Keep As-Is

These are universal SaaS plumbing — don't rebuild them:

- Auth, Users, Profile page, role guards
- Activity & Audit logging (both systems)
- Notifications service + frontend bell/page
- Settings store + tenant branding pipeline
- Currency module (if your app has prices)
- Global Search infrastructure (drop entities you don't have)
- Dashboard scaffold (replace widgets, keep the shell)
- Attachments table + components
- All locked patterns and ADRs in `/CLAUDE.md` and `/docs/decisions/`

## First Steps For New Project

1. **Clone** this repo into your new project directory.
2. **Update tenant defaults** — open
   `backend/src/migrations/20260428400001-seed-initial-settings.js` and
   set `lab_name`, `lab_short_name`, `currency_code`, `currency_symbol`,
   `timezone`, etc. for your domain. (Or skip and edit via the Settings
   UI after first login.)
3. **Configure `.env`** — copy `backend/.env.example` to
   `backend/.env`, set `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` /
   `DB_PASSWORD`, generate a `JWT_SECRET` and `JWT_REFRESH_SECRET`, set
   `PORT`.
4. **Install + migrate**:
   ```bash
   cd backend && npm install && npm run migrate
   cd ../frontend && npm install
   ```
5. **Boot smoke** — `npm run dev` in both directories. Log in with the
   seeded admin (`admin@lims.local` / `Admin123`) and **change the
   password immediately**.
6. **Customize master data** — pick one module to rename or replace
   (start with Customer; it's the template) and propagate the pattern.
7. **Build your domain modules** using the locked patterns. Copy from
   the nearest example; do not reinvent. Read the relevant rule in
   `/CLAUDE.md` before writing.
8. **Update sidebar + search service** as you add/remove entities.

## Key references

- `/CLAUDE.md` — locked patterns and rules
- `/README.md` — quick start + feature list
- `/docs/architecture/overview.md` — system overview
- `/docs/decisions/` — ADRs
- `/docs/patterns/master-data-page.md` — locked CRUD template spec
