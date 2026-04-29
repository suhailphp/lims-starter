# ADR — Multi-currency snapshot rate (two-table + frozen transaction rate)

**Status:** Accepted (2026-04-29)
**Context:** Module 00 Currency — foundation work BEFORE Quotes / Invoices
/ Reports so transactional modules can lock against a stable contract
from day one.

## Decision

Two tables (`Currencies` + `ExchangeRates`) with an open-ended history
model. Transactional modules (Quotes, Invoices, Reports) **freeze the
rate at creation time** by snapshotting `currencyID + rate +
exchangeRateDate` onto the parent row, plus storing both `priceBase`
and `price` per line. Historical documents NEVER re-read live rates.

### Rate convention (LOCKED)

```
rate = units of THIS currency per 1 unit of BASE
unitPrice = basePrice * rate
```

Base currency rate is implicitly `1.000000`. The seed inserts a 1.0 row
for documentation but the controller injects a synthetic
`{ rate: '1.000000', source: 'base' }` so consumers don't depend on the
row existing.

### Schema split

| | `Currencies` | `ExchangeRates` |
|---|---|---|
| Represents | Master data (a currency exists) | A rate that was active on a date range |
| Cardinality | One per ISO code | Many per currency over time |
| Mutability | Editable (name, symbol, displayOrder, isActive) | Append-only in practice; soft-delete for corrections |
| `isBase` | Yes (one row at a time, partial unique index) | N/A — base implicit-rate=1 |
| Audited | Yes | Yes |

### Open-ended timeline

- Latest rate per currency has `expiryDate = NULL`.
- Inserting a new rate atomically:
  1. Locks the open-ended row (`SELECT ... FOR UPDATE`).
  2. Sets that row's `expiryDate` to the new `effectiveDate`.
  3. Inserts the new row with `expiryDate = NULL`.
- Lookup is bounded:
  ```sql
  WHERE effectiveDate <= :date
    AND (expiryDate IS NULL OR expiryDate > :date)
  ```
- Cannot back-date below the open row's `effectiveDate` (409). To fix
  bad rates: `softDelete` + create new. No time-machine inserts.

## Why snapshot rates, not live lookups

### Historical documents must stay correct

A quote sent to a customer in March quotes USD prices using March's
rate. If the customer accepts in May, the invoice still owes the
quoted amount — not whatever May's rate happens to be. Re-reading
live rates at render time would silently change historical figures.

### Audit + reproducibility

A printed PDF of a 2026-Q1 invoice should match a re-render in 2027.
With snapshots, the `rate` and `exchangeRateDate` travel with the
record. Without them, reproducibility depends on never editing rate
history — a fragile invariant.

### Decouples reporting from rate-feed availability

Future per-day FX feeds may have outages, retries, or backfill drift.
Snapshots mean the Reports module's correctness is independent of
whether the feed ran today.

### Performance

Render-time joins to `ExchangeRates` for every line item on every
historical invoice would be a hot path with no need to be one. The
snapshot eliminates the join.

## Snapshot contract for transactional modules

LOCKED. Quote / Invoice / Report rows MUST store:

| Field | Type | From |
|---|---|---|
| `currencyID` | UUID FK | User selection at creation time |
| `exchangeRate` | DECIMAL(15,6) | `currencyService.getCurrentRate(currencyID).rate` at creation time |
| `exchangeRateDate` | DATEONLY | The lookup date used (typically `created date`) |

Per line item:

| Field | Type | Why |
|---|---|---|
| `priceBase` | DECIMAL | The canonical price in base currency. Source of truth for totals + reporting roll-ups. |
| `price` | DECIMAL | `priceBase * exchangeRate`, rounded to `Currency.decimalPlaces`. What the customer sees. |

Storing both lets us:
- Display the customer-visible currency without re-multiplying on
  every render.
- Roll up totals across multi-currency datasets via `priceBase`
  without re-translating.
- Audit the math (line should always satisfy
  `price ≈ priceBase * exchangeRate ± rounding`).

## Why partial unique indexes (DB-level enforcement)

Application-only enforcement of "one base currency" leaves a race:
two ADMIN clients both reading "no base set" and both writing
`isBase=true`. The partial unique index `(isBase) WHERE isBase = true
AND isDeleted = false` is the safety net. The controller still has
the friendly message; the DB has the guarantee.

Same for `LOWER(code) WHERE isDeleted = false` — case-insensitive
uniqueness across active rows. Soft-deleted rows can share a code
with an active resurrection (uncommon but valid).

## Set-Base atomicity

`currencyService.setBaseCurrency()` is the only legitimate writer to
`Settings.base_currency_code`. Inside one transaction:

1. Lock the target currency row.
2. Reject if inactive (cannot promote disabled currency).
3. Lock + flip the previous base off (if any).
4. Flip the target on.
5. Update `Settings.base_currency_code` directly (bypasses the
   `isEditable=false` guard — that guard is for the generic PUT, not
   for managed flows).
6. After commit, `setImmediate(() => settingsService.refreshCache())`
   so reads see the new value without paying transaction-blocking
   cost.

Why direct `settingRow.update` and not `settingsService.updateSetting`:
the service helper rejects writes to `isEditable=false` rows with a
403. We deliberately sidestep that for the Set-Base flow — the
editability flag protects against accidental admin edits, not against
the dedicated managed flow.

## Why NOT real-time conversion at display time

Considered briefly. Rejected because:

1. **Display flicker** — rates change. A page refresh changing visible
   prices on existing invoices is a customer-trust issue, not a
   feature.
2. **Reconciliation pain** — cash receipts in customer currency must
   match invoice totals. Live rates guarantee they won't.
3. **Audit complexity** — "what did the customer see when they
   accepted?" becomes unanswerable without an ad-hoc snapshot table —
   which is exactly what we'd be building anyway, just lazily and
   inconsistently.

## Why NOT a single rate field on Currencies

Considered: drop `ExchangeRates` entirely; store the current rate as
a column on `Currencies`. Rejected because:

1. **No history** — `getRateOnDate(currencyID, date)` becomes
   impossible. Backdated quotes can't pull the right rate.
2. **No audit of rate changes** — `Currency.update` shows the new
   rate, not the old; lossy.
3. **Future feed integration** — a daily FX feed would clobber
   yesterday's rate; a separate timeline naturally accumulates.

The two-table cost is one extra join on the rare "what's current?"
read. Negligible at lab scale; index covers it.

## When to revisit

- **FX feed in place** — when a `fixer.io` / `ecb` cron job ships,
  the `source` column starts carrying provider names and the UI may
  want a "Last fetched" badge. No schema change expected.
- **Multi-currency reports** — when reports begin grouping by
  customer-currency, formalize the `priceBase` roll-up helper. Today
  we don't have reports yet.
- **Per-line tax in mixed currencies** — out of scope for this
  iteration. When tax arrives, decide whether tax is computed in
  base or in display currency. The snapshot makes either choice
  reproducible.
- **Currency change on a draft quote** — UX decision deferred to
  Quotes module. Likely answer: re-pricing requires user
  confirmation and re-snapshots all line prices; sent quotes are
  immutable.

## References

- Module: `docs/modules/00-currency.md`
- Postman: `docs/postman/Currencies.postman_collection.json`
- Locked rule: `CLAUDE.md` § Currency Rule (LOCKED 2026-04-29)
- Reused ADRs: `ADR-004-soft-delete-strategy.md`,
  `ADR-005-audit-fields-pattern.md`,
  `ADR-async-local-storage-request-context.md`,
  `ADR-backend-audited-update-pattern.md`
