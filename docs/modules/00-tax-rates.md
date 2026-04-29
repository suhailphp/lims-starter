# Module 00 — Tax Rates

**Status**: ✅ Complete (2026-04-29).

Configurable tax rates referenced by future Quote / Invoice / Report
modules. Built BEFORE Quotes so transactional modules lock against a
stable contract from day one.

Tax is selected **per quote/invoice**, not per customer. Customers do
NOT have linked tax rates. Customers DO carry a TRN (Tax Registration
Number) for invoice display — see "Customer TRN" below.

## Overview

- **Master-data CRUD** under `/api/tax-rates`.
- **Single default invariant** — exactly one tax rate has `isDefault=true`
  (DB-level partial unique index + service-layer guarantee).
- **Atomic Set-Default flow** flips both the `isDefault` flag AND the
  `Settings.default_tax_rate_code` value in one transaction. Settings
  cache refreshes on commit.
- **Snapshot pattern** (planned, locks when Quotes ships): at quote
  creation time the chosen `taxRateCode + rate value` are frozen on the
  parent row, and tax line items store `taxAmount` + `taxRateValue` so
  historical documents never re-read live rates.

## Schema

`TaxRates` table (`backend/src/migrations/20260429100000-create-tax-rates-table.js`):

| Column        | Type               | Notes                                              |
|---------------|--------------------|----------------------------------------------------|
| taxRateID     | UUID PK            |                                                    |
| code          | VARCHAR(20)        | Uppercase alphanumeric + `_`. e.g. `VAT_5`.        |
| name          | VARCHAR(100)       |                                                    |
| rate          | DECIMAL(5,2)       | Percentage value (0.00–999.99).                    |
| type          | ENUM('PERCENTAGE') | `'FIXED'` reserved; only PERCENTAGE in v1.         |
| isDefault     | BOOLEAN            | One row only — partial unique index.               |
| description   | TEXT NULL          |                                                    |
| displayOrder  | INTEGER            | Sort order for UI dropdowns.                       |
| isActive      | BOOLEAN            | Default tax rate cannot be deactivated.            |
| isDeleted     | BOOLEAN            | Soft-delete only. Default cannot be deleted.       |
| audit fields  | createdBy/updatedBy/deletedBy + timestamps |                            |

**DB invariants** (partial unique indexes — non-deleted only):

- `idx_tax_rates_code_unique` on `LOWER(code)` — case-insensitive uniqueness.
- `idx_tax_rates_single_default` on `isDefault WHERE isDefault=true`.

## Seed data

Inserted in the migration:

| code     | name                  | rate  | isDefault | order |
|----------|-----------------------|-------|-----------|-------|
| `VAT_5`  | UAE Standard VAT 5%   | 5.00  | ✅        | 1     |
| `EXEMPT` | Tax Exempt (0%)       | 0.00  |           | 2     |
| `VAT_10` | Standard 10%          | 10.00 |           | 3     |
| `GCC_5`  | GCC Standard 5%       | 5.00  |           | 4     |

## Default tax rate invariants

Enforced in `taxRate.controller.js`:

- `DELETE` on default → 409 ("Default tax rate cannot be deleted. Set
  another tax rate as default first.").
- `PUT` setting `isActive: false` on default → 409 ("Default tax rate
  cannot be deactivated.").
- `PUT` body containing `isDefault` → 422 (strict Zod schema rejects
  the unknown key — use `set-default` endpoint).
- `POST` when no default exists yet → first row auto-becomes default
  (e.g. all current defaults soft-deleted).

## Endpoints

All under `/api/tax-rates`, JWT required. Reads = any authed user
(needed for Quote/Invoice form dropdowns). Writes = ADMIN only.

| Method | Path                          | Purpose                                                  |
|--------|-------------------------------|----------------------------------------------------------|
| GET    | `/`                           | List with filters: `search`, `isActive`, `isDefault`     |
| GET    | `/:taxRateID`                 | Detail                                                   |
| POST   | `/`                           | Create (first when no default → auto-default)            |
| PUT    | `/:taxRateID`                 | Update (rejects `isDefault` — use set-default)           |
| DELETE | `/:taxRateID`                 | Soft delete (cannot delete default)                      |
| PUT    | `/:taxRateID/set-default`     | Atomic flip + sync `Settings.default_tax_rate_code`      |

## Set-default flow (`taxRateService.setDefaultTaxRate`)

Mirrors the Currency `setBaseCurrency` pattern.

```js
db.sequelize.transaction(async (t) => {
  // 1. lock + fetch target — reject if inactive/deleted
  // 2. lock + fetch current default → flip isDefault=false
  // 3. flip target.isDefault=true
  // 4. update Settings.default_tax_rate_code = target.code
  // 5. setImmediate → settingsService.refreshCache()
})
```

The cache refresh runs `setImmediate` AFTER commit so any subsequent
read sees the new value.

## Customer TRN field

`Customers.trn VARCHAR(20) NULL`. Optional, alphanumeric (no spaces).
Format varies by country — backend does not validate beyond
`^[A-Za-z0-9]+$`. Surfaced in:

- Customer Form Dialog — "TRN (Tax Registration Number)" input.
- Customer View Dialog — Billing section.
- NOT in the customer list table (kept clean; can be added later if users ask).

## Settings additions

| key                      | category   | valueType | isPublic | isEditable |
|--------------------------|------------|-----------|----------|------------|
| `bank_name`              | tenant     | STRING    | false    | true       |
| `bank_branch`            | tenant     | STRING    | false    | true       |
| `bank_account_number`    | tenant     | STRING    | false    | true       |
| `bank_iban`              | tenant     | STRING    | false    | true       |
| `default_tax_rate_code`  | workflow   | STRING    | false    | true       |

Bank details surface in Settings → Lab Information → Bank Details
(new subsection). Default tax rate surfaces in Settings → Workflow
Defaults → Tax (new subsection, FKSelect populated from
`/api/tax-rates?isActive=true`).

## Frontend

Master-data page at `/tax-rates` follows the locked Currency template:

- `src/types/taxRate.ts`
- `src/api/taxRates.ts`
- `src/features/taxRates/{taxRateSchema, taxRatesQueries, TaxRateTable, TaxRateViewDialog, TaxRateFormDialog, TaxRateDeleteDialog, SetDefaultTaxRateDialog}.tsx`
- `src/pages/TaxRatesPage.tsx`
- Sidebar entry under **Master Data** (icon: `IconReceiptTax`).

`SetDefaultTaxRateDialog` mirrors `SetBaseCurrencyDialog` — implications
copy explains that existing quotes / invoices keep their snapshots and
the workflow setting flips atomically.

## Future use in Quote / Invoice modules

When Quotes ships, the form will:

1. Call `useTaxRates({ isActive: true, sort: 'displayOrder' })` to
   populate the dropdown.
2. Default-select the row whose `code === default_tax_rate_code`
   (read from Settings).
3. On submit, snapshot `{ taxRateCode, taxRate (numeric value at submit
   time) }` onto the quote header (or per line, depending on whether
   per-line tax is needed in v2). Snapshots are immutable — downstream
   reports and PDFs read frozen values, never live rate.

Block delete on tax rates referenced by any non-deleted quote (Parent
Deletion Policy — TODO when Quotes ships, pattern lifted from Currency).

## Smoke (verified 2026-04-29 via Postman + curl)

- ✅ List shows seed: `VAT_5` default, `EXEMPT`, `VAT_10`, `GCC_5`.
- ✅ `?isDefault=true` → only `VAT_5`.
- ✅ DELETE default → 409 with "default" in message.
- ✅ PUT `isActive: false` on default → 409 "Default tax rate cannot be deactivated."
- ✅ POST `cst_12` after creating `CST_12` → 409 (case-insensitive guard).
- ✅ PUT body with `isDefault: true` → 422 (strict schema).
- ✅ Set `CST_12` as default → 200; `VAT_5.isDefault` flips false;
  `Settings.default_tax_rate_code` cache shows `CST_12`.
- ✅ Restore `VAT_5` as default → 200; setting flips back to `VAT_5`.
- ✅ Customer create with TRN → round-trips on create + GET.
- ✅ Customer create with `"100 366 4578"` → 422 ("alphanumeric").

## References

- `/docs/postman/TaxRates.postman_collection.json` — 17-request smoke.
- `/docs/decisions/ADR-tax-rate-architecture.md` — rationale for no
  customer linkage + per-quote selection + future snapshot pattern.
- `/CLAUDE.md` § Tax Rate Rule (LOCKED 2026-04-29).
