# Module 00 — Currency (Multi-Currency Foundation)

Lab-agnostic master data + the rate-snapshot foundation every future
transactional module (Quotes, Invoices, Reports) will rely on. Built
BEFORE Sample Intake so quote math, customer pricing, and historical
re-pricing have a stable contract from day one.

## What it does

- Two-table architecture: `Currencies` (master data) + `ExchangeRates`
  (open-ended history).
- One — and only one — base currency at any time, enforced by a partial
  unique DB index AND controller logic.
- Atomic Set-Base flow keeps `Settings.base_currency_code` in sync so
  the rest of the app reads a single source of truth.
- Open-ended rate timeline: the latest rate has `expiryDate = NULL`
  ("currently active"); inserting a new rate auto-closes the prior row
  by setting its `expiryDate` to the new `effectiveDate`.
- Snapshot pattern: future Quote/Invoice rows freeze
  `currencyID + rate + exchangeRateDate` at creation time. Rates change
  later? Historical documents stay correct.
- ADMIN-only writes; any authed user can read.

## Schema

### `Currencies`

| Column | Type | Notes |
|---|---|---|
| `currencyID` | UUID PK | |
| `code` | VARCHAR(3) | ISO-4217 (`AED`, `USD`, `EUR`, …). Uppercase. |
| `name` | VARCHAR(100) | `UAE Dirham`, `US Dollar`. |
| `symbol` | VARCHAR(10) | `د.إ`, `$`, `€`. Display only. |
| `decimalPlaces` | INTEGER | One of `0 / 2 / 3 / 4` (JPY=0, KWD=3, BTC-style=4). |
| `isBase` | BOOLEAN | Exactly one row may be `true` at a time. |
| `displayOrder` | INTEGER | Default sort key. |
| `isActive` | BOOLEAN | Soft-disable; base cannot be deactivated. |
| audit fields | createdBy / updatedBy / deletedBy / deletedAt / isDeleted / timestamps | |

Indexes:

- **Partial unique** `LOWER(code) WHERE isDeleted = false` — one active
  row per code, case-insensitive.
- **Partial unique** `(isBase) WHERE isBase = true AND isDeleted = false`
  — DB-level guarantee of single base currency.
- `(isDeleted, isActive)` for filtered list queries.

### `ExchangeRates`

| Column | Type | Notes |
|---|---|---|
| `exchangeRateID` | UUID PK | |
| `currencyID` | UUID FK → Currencies | `ON DELETE RESTRICT`. |
| `rate` | DECIMAL(15,6) | Units of THIS currency per **1 unit of base**. |
| `effectiveDate` | DATEONLY | Date the rate becomes active. |
| `expiryDate` | DATEONLY NULL | `NULL` = currently active. Closed when a newer rate is inserted. |
| `source` | VARCHAR(50) | Free-form; default `'manual'`. Reserved values for future feeds: `'fixer.io'`, `'ecb'`, etc. |
| `notes` | TEXT NULL | Free-form. |
| audit fields | full set + soft delete | |

Indexes:

- `(currencyID, effectiveDate DESC)` for "latest rate" lookups.
- `(effectiveDate, expiryDate)` for date-range scans.

## Rate convention (LOCKED — Quote math depends on this)

```
rate = units of THIS currency per 1 unit of BASE
unitPrice = basePrice * rate
```

- Base currency rate is **always 1.0** — implicit. The seed inserts a
  `rate=1.0` row for documentation, but readers should rely on the
  synthetic value the controller injects.
- Example with AED as base:
  - AED rate = 1.000000
  - USD rate ≈ 0.272300 (1 AED = 0.27 USD)
  - EUR rate ≈ 0.250000

## Endpoints

All routes require `requireJwtAuth`. Writes additionally require
`requireRole(['ADMIN'])`.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/currencies` | any | Paginated; `currentRate` attached per row. |
| GET | `/api/currencies/:currencyID` | any | Includes `currentRate`. |
| GET | `/api/currencies/:currencyID/exchange-rates` | any | Full history, newest first. |
| GET | `/api/currencies/:currencyID/rate-on-date/:date` | any | Historical lookup; `date` = `YYYY-MM-DD`. |
| POST | `/api/currencies` | ADMIN | First currency auto-becomes base. Non-first MUST include `initialRate` (422 otherwise). |
| PUT | `/api/currencies/:currencyID` | ADMIN | Rejects `isActive=false` for base (409). |
| DELETE | `/api/currencies/:currencyID` | ADMIN | Soft delete. Rejects base (409). |
| POST | `/api/currencies/:currencyID/exchange-rates` | ADMIN | Adds a rate; auto-closes prior open row. Rejects when target is base (409). |
| PUT | `/api/currencies/:currencyID/set-as-base` | ADMIN | Atomic flip + `Settings.base_currency_code` sync + cache refresh. |

## Patterns / invariants

### Base currency rules (controller-enforced)

- **First currency created auto-becomes base.** No `initialRate`
  required — its rate is the implicit 1.0.
- **Base cannot be deleted.** `409 Conflict`.
- **Base cannot be deactivated.** `409 Conflict`. Activate something
  else as base first.
- **Base cannot have rates added.** `409 Conflict` — its rate is 1.0
  by definition.
- **Set-Base is atomic.** `currencyService.setBaseCurrency()` wraps:
  unset prior base → set target → update `Settings.base_currency_code`
  → refresh settings cache. All in one transaction.

### Open-ended rate timeline

- The latest row for a currency has `expiryDate = NULL` ("currently
  active").
- `POST /:id/exchange-rates` with `effectiveDate = X`:
  - Locks the open-ended row (`SELECT ... FOR UPDATE`).
  - Sets that row's `expiryDate = X`.
  - Inserts the new row with `expiryDate = NULL`.
- Lookup query: `effectiveDate <= date AND (expiryDate IS NULL OR expiryDate > date)`.
- **Cannot back-date below the open row's `effectiveDate`** (409). Fix
  bad rates by `softDelete` + create-new, not time-machine inserts.

### Snapshot pattern for transactions

LOCKED for Quotes / Invoices / Reports:

1. At creation time, read `currencyService.getCurrentRate(currencyID)`.
2. Snapshot **all three** onto the parent row:
   - `currencyID`
   - `exchangeRate` (the value at that moment)
   - `exchangeRateDate` (the lookup date)
3. Per line, store **both** `priceBase` (in base currency) and `price`
   (in the snapshot currency). Don't recompute from a live rate.
4. Reports / re-renders read the snapshot, NEVER `getCurrentRate`
   again for the same record.

See ADR `ADR-multi-currency-snapshot-rate.md`.

### Settings integration

- `Settings.base_currency_code` is `isEditable=false`. The generic
  `PUT /api/settings/:key` returns 403. The Set-Base flow is the only
  legitimate writer; it bypasses the editability guard inside the
  transaction.
- `useTenantSettings()` exposes the code through the existing
  SettingsContext. Localization form shows it read-only with a
  "Manage Currencies →" link to `/currencies`.

### Audit

- Both `Currency` and `ExchangeRate` are registered with
  `applyAuditLogging`. They join the audited-model count at 14 (was 12).
- Soft-delete recognition (`isDeleted: false → true → action: DELETE`)
  works automatically.
- Set-Base writes appear in AuditLog as TWO rows: prior base
  `isBase: true → false`, target `isBase: false → true`.

## Service API

`backend/src/services/currencyService.js`:

```js
getBaseCurrency()                              // null if none configured
getBaseCurrencyOrThrow()                       // throws AppError(500)
getCurrentRate(currencyID)                     // null for missing; synthetic for base
getRateOnDate(currencyID, date)                // null if no row spans date
createExchangeRate(currencyID, payload, userId)
setBaseCurrency(targetCurrencyID, userId)      // atomic flip + setting + cache
```

All functions lazy-`require('../models')` inside the body to avoid the
circular dep pattern documented in `settingsService.js`.

## Frontend

```
src/types/currency.ts                          # Currency + CurrentRate union (synthetic for base)
src/api/currencies.ts                          # 9 typed wrappers
src/features/currencies/
  currenciesQueries.ts                         # TanStack hooks (list, mutations, optimistic toggle, set-base)
  currencySchema.ts                            # Zod schemas (create + edit + add-rate); superRefine for conditional initialRate
  CurrencyTable.tsx                            # PrimeReact DataTable; "Base" pill; trims trailing zeros on display
  CurrencyViewDialog.tsx                       # Details + status + current rate + rate-history timeline + audit
  CurrencyFormDialog.tsx                       # Create / Edit (separate components); conditional Initial Rate field
  CurrencyDeleteDialog.tsx                     # Snapshot warning ("existing quotes keep their stored rate")
  UpdateRateDialog.tsx                         # Adds new rate; closes prior open row server-side
  SetBaseCurrencyDialog.tsx                    # Confirmation + bullet implications
src/pages/CurrenciesPage.tsx                   # List page; URL-driven; FilterMenu (status + base); EmptyState
```

### UI patterns reused

- **List page template** — same shape as the 10 master-data pages
  (FilterMenu, Activate/Deactivate optimistic toggle, View / Add /
  Edit / Delete modals, URL-driven state with debounced search,
  skeleton + thin progress bar).
- **Conditional form field** — `Initial Rate` rendered only when
  `hasBaseCurrency = true` (otherwise the new currency auto-becomes
  base and the rate is implicit). Zod `superRefine` enforces the rule.
- **Optimistic `useToggleActiveCurrency`** — full-payload PUT pattern
  identical to other master-data toggles.
- **Cross-cache invalidation** — `useSetBaseCurrency` invalidates both
  `['currencies']` and `['settings']` so tenant branding consumers
  re-read.

### Currency-specific UI

- **"Base" pill** in the Code column, with `IconStar`. Action menu
  hides Update Rate / Set as Base / Activate-Deactivate / Delete on
  the base row.
- **Rate History timeline** in the View dialog — dotted connector,
  current row pip-dot solid, historical pips outlined, last row
  labeled "Initial rate".
- **Set-Base confirmation** lists implications (rate becomes 1.0,
  prior base loses flag, historical docs unchanged, future quotes
  price against new base).
- **Trim trailing zeros** on rate display via `trimTrailingZeros`
  helper — DECIMAL(15,6) returns `'0.272300'` from PG; the column
  shows `0.2723`.

## Migrations + seed

1. `20260429000000-create-currencies-table.js` — table + partial unique
   indexes (LOWER(code), isBase).
2. `20260429000001-create-exchange-rates-table.js` — table + perf
   indexes; FK to Currencies with `ON DELETE RESTRICT`.
3. `20260429000002-migrate-currency-settings.js` — reads legacy
   `currency_code` / `currency_symbol` from Settings, creates the
   matching Currency row + a `rate=1.0` ExchangeRate, deletes the legacy
   keys, inserts `base_currency_code` (`isEditable=false`,
   `isPublic=true`).

The seed is idempotent (early-returns if a Currency row already exists)
so re-running the migration on a partially-applied DB is safe.

## Verified end-to-end (2026-04-29)

Backend smoke (Postman, 13 requests; see
`docs/postman/Currencies.postman_collection.json`):

- Login → `accessToken` auto-captured.
- `GET /api/currencies` → AED listed; `currentRate.rate = '1.000000'`,
  `source = 'base'`.
- `DELETE` base → `409`.
- Deactivate base → `409`.
- `POST` USD without `initialRate` → `422`.
- `POST` USD with `initialRate=0.27` → `201`; `usdID` captured.
- Add USD rate effective `2026-05-15` → previous row closed
  (`expiryDate = '2026-05-15'`).
- `GET .../rate-on-date/2026-05-01` → returns the 0.27 row.
- `GET .../rate-on-date/2026-05-20` → returns the 0.28 row.
- `PUT /:usdID/set-as-base` → AED's `isBase` flips false; USD's flips
  true; `/api/settings/public` shows `base_currency_code = USD`.
- `POST` rate to USD (now base) → `409`.
- Cleanup: re-set AED as base.

Frontend manual walkthrough:

- `/currencies` list renders; "Base" pill on the base row; rate column
  shows `— (base)`.
- Add Currency: first-currency banner shows when DB is empty;
  Initial Rate field appears when a base already exists.
- View dialog: rate history timeline dots align; "Initial rate" label
  on the bottom row.
- Update Rate: prior open row visibly gets `expiryDate` after submit
  (re-open the View dialog to confirm).
- Set as Base: confirmation dialog → tenant-branding consumers (header)
  re-render against the new base.
- Localization form: "Base Currency" is read-only with the
  "Manage Currencies →" link.

## Open TODOs

- **Per-day FX feed.** Schema is ready (`source` is free-form). Pick a
  provider (e.g. `fixer.io`, `ecb`) and add a nightly cron that calls
  `currencyService.createExchangeRate(...)` per non-base currency.
  UI work: surface "Last fetched" + "Source" badge in the View dialog.
- **Quote-side child-count check on currency delete.** When the Quotes
  module ships, `softDelete` should refuse if any quote/invoice
  references the currency. Today there are no children, so the check
  is unnecessary.
- **Tenant-branded number formatting in tables.** Currency amounts in
  future Quote/Invoice tables should use `Currency.decimalPlaces`
  for `toFixed`. Build a `useFormatMoney(currencyID)` helper at that
  time.

## References

- Postman: `docs/postman/Currencies.postman_collection.json`
- ADR: `docs/decisions/ADR-multi-currency-snapshot-rate.md`
- Locked rule: `CLAUDE.md` § Currency Rule (LOCKED 2026-04-29)
- Reused ADRs: `ADR-async-local-storage-request-context.md`,
  `ADR-backend-audited-update-pattern.md`,
  `ADR-frontend-tenant-branding.md`
