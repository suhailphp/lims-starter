# ADR-003 — UUID Primary Keys

## Status: Accepted

## Context
Every table needs a primary key. Two main options:
- Auto-incrementing integer (1, 2, 3...)
- UUID (universally unique identifier)

## Decision
Use UUID v4 as primary key for all tables.
Column naming: `{entityName}ID` (e.g. `userID`, `customerID`)

## Reasons
1. **Security** — UUIDs don't expose row counts or sequences
2. **Distributed systems** — No collision risk across databases
3. **API safety** — Can't guess next ID to access unauthorized data
4. **Merging databases** — Possible without conflicts
5. **Commercial lab security** — Non-sequential IDs prevent data enumeration
6. **Industry standard** — Modern LIMS/ERP systems use UUIDs

## Alternatives Considered
- Auto-increment integers → rejected (security, collision risk)
- Composite keys → rejected (complexity)
- UUID v7 (time-ordered) → future consideration, v4 for now

## Consequences
- Slightly larger storage (16 bytes vs 4 bytes)
- Slower joins compared to integers (negligible at our scale)
- URLs are longer but more secure
- Must use `Sequelize.UUIDV4` as default value

## Implementation
```javascript
{
  userID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  }
}
```