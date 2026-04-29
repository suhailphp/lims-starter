# Starter Template

A working full-stack starter extracted from a production LIMS (Laboratory
Information Management System). It contains real implementations of the
patterns most SaaS projects need on day one — auth, users, settings,
attachments, search, notifications, audit logging, multi-currency, and a
master-data CRUD template — so you can clone, rename, and start building
your domain instead of rebuilding plumbing.

This starter keeps the original LIMS modules (Tests, Equipment, Methods,
etc.) as **working examples** of the locked patterns. Replace, rename, or
delete them per your domain.

See **[STARTER.md](./STARTER.md)** for a one-page guide to what's in here
and how to adapt it.

## Stack

- **Backend** — Node.js · Express 5 · Sequelize 6 · PostgreSQL · Zod · JWT
- **Frontend** — React 19 · TypeScript · Vite · Redux Toolkit · TanStack
  Query · Tailwind v4 · React Hook Form · Radix Dialog · PrimeReact
- **Theme** — Dreams AI admin template integrated as a vendor layer

## Quick start

```bash
# 1. Install
cd backend && npm install
cd ../frontend && npm install

# 2. Configure backend env
cd ../backend
cp .env.example .env       # edit DB_HOST, DB_NAME, JWT_SECRET, etc.

# 3. Create the database, then run migrations
npm run migrate

# 4. (Optional) seed a default admin
#    Migrations seed Settings + base Currency + the admin user.
#    Default login: admin@lims.local / Admin123 — change immediately.

# 5. Run
cd ../backend && npm run dev    # http://localhost:3033
cd ../frontend && npm run dev   # http://localhost:5173
```

## What's included

**Foundations (keep as-is)**
- **Auth** — JWT access + refresh tokens, account lockout, password
  reset (admin in-app, one-shot temp password reveal), `mustChangePassword`
  flow.
- **Users** — full CRUD, role badges, self-row gating, profile photos.
- **Profile** — vendor-style banner, avatar upload, activity feed.
- **Activity & Audit Logging** — two systems: `UserActivity` (manual,
  user-facing feed) + `AuditLog` (automatic Sequelize hooks on 14
  models). Detailed in `/docs/decisions/ADR-useractivity-vs-auditlog.md`.
- **Notifications** — two-table model with three audience scopes
  (PERSONAL / CUSTOMER / LAB), bell badge, dropdown, `/notifications`
  page.
- **Settings** — key/value store with 4 categories, in-memory cache,
  public unauth endpoint for pre-login branding, lab logo upload.
- **Currency** — multi-currency master data + open-ended exchange-rate
  history, atomic Set-Base flow, snapshot pattern for transactions.
- **Search** — global search across 8 entities, ⌘K shortcut, `/search`
  page, `?view=` deep-link contract.
- **Dashboard** — admin overview with chart.js donuts, equipment
  alerts, recent activity feed.
- **Attachments** — DB-base64 storage, transactional replace + hard
  delete, `<Avatar>` and `<AttachmentUpload>` components.

**Master-data CRUD pattern (locked template)**

Ten LIMS-specific master-data pages built from the same locked
template — Customer, SourceTypes, Sources, Categories, Equipment,
OcmElements, Specifications, Units, Tests, Methods. Each ships with:

- FilterMenu (chips + FK dropdowns + batch Apply)
- Activate/Deactivate with optimistic UI
- View / Add / Edit / Delete modals
- URL-driven state (page/limit/sort/order/search)
- Skeleton + thin progress-bar loading
- Full keyboard accessibility + dark mode

Use these as **examples** of the locked pattern. Replace with your own
domain entities (Vehicle, Service, Patient, Project, etc.) following
the same shape.

## Locked patterns

All architectural rules and patterns live in **[CLAUDE.md](./CLAUDE.md)**.
Read it before writing new code. Highlights:

- Form Pattern Rule (modals over pages)
- View Pattern Rule (click-name-to-view)
- Toast Notification Rule
- Backend Update Rule (`auditedUpdate` not bare `update`)
- Backend Virtual Fields Rule (use `DataTypes.VIRTUAL`, not
  `getterMethods`)
- Activity & Audit Logging Rule
- Attachment Pattern Rule
- Notifications Rule
- Settings + Tenant Branding Rule
- Currency Rule (snapshot pattern)
- Search Rule (`?view=` deep-link contract)
- Master-Data UI Replication Rule (`FKSelect`, `EnumSelect`,
  `DateTimePicker`, `FilterMenu`, dark-mode tokens)

Architectural Decision Records live under **`/docs/decisions/`**. Read the
relevant ADR before changing anything in a locked area.

## How to use as starter for a new project

1. Clone this repo into your new project directory.
2. Update tenant branding in
   `backend/src/migrations/20260428400001-seed-initial-settings.js`
   (`lab_name`, `lab_short_name`, currency, timezone, etc.) before the
   first `npm run migrate`.
3. Configure `backend/.env`: `DB_*`, `JWT_SECRET`, `JWT_REFRESH_SECRET`,
   `PORT`.
4. Run migrations + start servers.
5. Pick which master-data modules to **rename** (Equipment → Vehicle,
   Test → Service…), **replace** (delete + scaffold your own), or
   **keep** (Categories, Units often map cleanly).
6. Build your domain modules using the locked patterns. Copy
   `frontend/src/features/customers/` and
   `backend/src/{controllers,services,routes,models,migrations}` for the
   nearest match — don't reinvent.

See **[STARTER.md](./STARTER.md)** for the full customization checklist.

## Documentation map

- `/CLAUDE.md` — locked patterns + rules (read first)
- `/STARTER.md` — one-page starter guide
- `/docs/architecture/` — overview, DB schema, API conventions
- `/docs/decisions/` — ADRs (one per architectural decision)
- `/docs/modules/` — per-module specifications
- `/docs/patterns/` — locked UI/code patterns
- `/docs/postman/` — Postman smoke collections per module

## License

Adapt freely. No warranty.
