# ADR-004 — Soft Delete Strategy

## Status: Accepted

## Context
Commercial lab operations require a full audit trail for quality 
assurance and regulatory compliance. Data deletion must be 
traceable and recoverable.

## Decision
Never hard delete records. Use two flags:
- `isDeleted` — data lifecycle flag
- `isActive` — business status flag

## Fields Added to Every Table
deletedBy    UUID (nullable) — who deleted
deletedAt    DATE (nullable) — when deleted
isDeleted    BOOLEAN (default false) — soft delete flag
isActive     BOOLEAN (default true) — business status

## Why Two Flags
| Flag | Meaning |
|------|---------|
| `isActive` | Temporary business status (paused, on-hold) |
| `isDeleted` | Permanent data removal from normal views |

They are independent — a record can be inactive without being deleted.

## Default Scope Pattern
```javascript
defaultScope: {
  where: { isDeleted: false }
}
```

All queries automatically filter out deleted records unless explicitly overridden.

## Future — Super Admin Hard Delete
Super admin role will have option to permanently delete records when required for:
- Data protection regulation compliance
- Cleaning test/invalid data

## Reasons
1. Audit compliance — can prove no data was lost
2. Recovery — accidentally deleted records recoverable
3. Historical reports — old data still available
4. Regulatory requirement — commercial lab compliance (ISO, accreditation)

## Alternatives Considered
- Hard delete — rejected (no audit trail)
- Archive tables — rejected (complexity, sync issues)
- Versioning — used for critical tables (Reports, FinalResults)

## Consequences
- Every query must respect `isDeleted` filter
- Tables grow larger over time
- Periodic archive strategy needed (future)
- Super admin needs dedicated UI for managing deleted records