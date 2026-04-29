# ADR — Tax Rate architecture (no customer linkage; per-quote selection; snapshot)

**Date**: 2026-04-29
**Status**: Accepted

## Context

Quote and Invoice modules need configurable tax rates (UAE 5% VAT,
exempt, GCC variants, future jurisdictions). Three architectural
choices were on the table:

1. **Customer-linked tax** — each customer carries a `defaultTaxRateID`
   FK; quotes inherit it.
2. **Per-quote selection** — quotes pick a tax rate from the master
   list at creation time; customers carry only a TRN string for
   invoice display.
3. **Hybrid** — customer carries a default, quote can override.

We picked **option 2 (per-quote selection)**.

## Decision

- `TaxRates` is a flat master-data table with `code`, `name`, `rate
  (DECIMAL(5,2))`, `type ENUM('PERCENTAGE')`, `isDefault`, audit, and
  soft-delete fields.
- Customers carry **only** a `trn VARCHAR(20) NULL` — a string field
  used for invoice display, with no FK to TaxRates.
- Quotes / Invoices select a tax rate per document at form-load time.
  The form pre-selects the row whose `code` matches
  `Settings.default_tax_rate_code`.
- At quote submission, the quote header snapshots
  `{ taxRateCode, taxRate (numeric at submit time) }` (and per-line
  `taxAmount`). Snapshots are immutable — historical reads never
  re-fetch live rates.

## Why per-quote, not customer-linked

**Tax rules don't follow the customer; they follow the transaction.**
A UAE customer placing a B2B export order may legitimately invoice at
0% (exempt for export). The same customer's domestic order is 5% VAT.
A customer-linked tax rate creates the wrong default 50% of the time
in mixed-line businesses, and mistakes here are reportable to tax
authorities.

A `default_tax_rate_code` setting (single row, ADMIN-managed) gives us
the right "everyone defaults to UAE VAT 5%" behaviour without baking
the assumption into every customer record. The per-quote dropdown lets
the user override in one click when the situation warrants.

This also matches how every commercial accounting package we surveyed
(QuickBooks, Xero, Zoho Books) handles tax — a global default plus
per-line/per-document override.

## Why a separate `trn` string instead of normalising

A TRN is a regulatory identifier, not a foreign key. It varies by
country (UAE 15 digits, KSA 15 digits, OMN 12 digits, no global
schema). Modelling it as anything other than a free string would
require either a country-specific format table (premature) or
abandoning validation entirely (which is what we did anyway). String
storage matches what the field actually is: a value that gets printed
on the PDF.

## Why `default_tax_rate_code` lives in Settings, not on TaxRate

It's tempting to read "the default" off `TaxRates WHERE
isDefault=true`. We do that — and the API exposes both the
`isDefault` flag on each row AND `default_tax_rate_code` in Settings.

The reason both exist:

- **`isDefault` on TaxRate** is the source-of-truth for the "Tax Rates"
  page UI (badge, set-default flow, single-row partial unique index).
- **`Settings.default_tax_rate_code`** lets the Quote form pre-select
  the dropdown without joining a second resource on every form load,
  AND lets future modules (Invoice, Report) read the default via the
  same settings cache they already consume.

The Set-Default endpoint (`PUT /api/tax-rates/:id/set-default`) writes
both atomically in one transaction, so they cannot drift. This is the
same pattern Currency already uses for `Currency.isBase` +
`Settings.base_currency_code`.

## Why snapshot tax on the quote, not look up live

Tax rates change over time. UAE went from 0% → 5% in 2018; the next
policy change (whenever) shouldn't silently rewrite the historical
invoices we issued before it. Same reasoning as the Currency snapshot
ADR — historical documents must read the value that was in effect at
submission time, full stop.

The `default_tax_rate_code` setting can drift independently — if a
new default is set tomorrow, *new* quotes adopt it but yesterday's
quote still shows yesterday's rate.

## Why ENUM('PERCENTAGE') with FIXED reserved

V1 only needs percentages — that's what UAE and GCC tax laws use.
But we want room for `FIXED` later (some jurisdictions price tax as a
flat per-unit fee). The ENUM is declared with one value today; adding
`FIXED` later is a single migration without column rename.

## Consequences

**Good**:

- Tax errors (wrong rate on a customer record) can never propagate to
  a quote. The user picks per quote.
- Historical documents are immutable; tax-rate-table edits don't
  rewrite them.
- Adding a new tax rate (jurisdiction expansion) doesn't require a
  data migration on Customers.
- Settings cache means Quote form load doesn't fan out an extra
  `/api/tax-rates/default` call.

**Trade-offs**:

- The user must pick a tax rate per quote (extra click when the
  default is correct). Mitigated by pre-selecting from settings.
- Two sources of "the default" — the TaxRate row's `isDefault` flag
  AND `Settings.default_tax_rate_code`. Atomic set-default keeps them
  in sync; without that transaction they could drift.

## What this ADR explicitly does NOT decide

- Per-line tax (per-row tax rate within a single quote) — likely needed
  for mixed exempt + taxable line items. Punt to Quotes module design.
- Compound tax (e.g. provincial + federal) — `isCompound` not
  modelled in v1. The schema reserves room (`type` ENUM extension)
  but the controller / UI don't handle it.
- Tax-on-shipping vs tax-on-subtotal-only — Quotes-module decision.
- Withholding tax (a different concept from sales tax) — out of scope.

## References

- `/docs/modules/00-tax-rates.md`
- `/docs/decisions/ADR-multi-currency-snapshot-rate.md` (sibling
  pattern for currency snapshots)
- `/CLAUDE.md` § Tax Rate Rule (LOCKED 2026-04-29)
