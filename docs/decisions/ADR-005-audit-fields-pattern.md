# ADR-005 — Audit Fields Pattern

## Status: Implemented (audit fields + Sequelize hooks live in `backend/src/utils/auditHooks.js`)

## Context
Commercial lab operations require full traceability for quality 
assurance and audit purposes:
- Who created each record
- Who last modified it
- When it happened
- Who deleted it

## Decision
Add standard audit fields to every table.

## Standard Audit Fields
createdBy    UUID (nullable)
createdAt    DATE (auto CURRENT_TIMESTAMP)
updatedBy    UUID (nullable)
updatedAt    DATE (auto CURRENT_TIMESTAMP)
deletedBy    UUID (nullable)
deletedAt    DATE (nullable)

## Why Nullable Initially
- Seed data / migrations may not have a user context
- Future: FK constraints to Users table when system is running

## Automation (Planned)
Sequelize hooks will auto-populate these fields from JWT:

```javascript
Model.beforeCreate((instance, options) => {
  instance.createdBy = options.userId;
});

Model.beforeUpdate((instance, options) => {
  instance.updatedBy = options.userId;
});

Model.beforeDestroy((instance, options) => {
  instance.deletedBy = options.userId;
  instance.deletedAt = new Date();
  instance.isDeleted = true;
});
```

## Two Layers of Audit

### Layer 1 — Field-Level (this ADR)
Every table has createdBy/updatedBy for quick reference.

### Layer 2 — AuditLog Table
Separate table capturing full change history with before/after snapshots.

See planned AuditLog table design in Module 7 docs.

## Reasons
1. Regulatory audit compliance
2. Data forensics ability
3. Accountability for each change
4. Quick "who did this?" lookup
5. Professional LIMS standard

## Alternatives Considered
- Only AuditLog (no field-level) — rejected (too slow for common queries)
- Only field-level (no AuditLog) — rejected (no full history)

## Consequences
- 6 extra fields per table (storage)
- Must set userId in every write operation
- Frontend must track user context properly
- Hooks needed to automate population