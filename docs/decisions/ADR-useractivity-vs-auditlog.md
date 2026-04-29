# ADR — UserActivity vs AuditLog (two systems, not one)

**Status:** Accepted (2026-04-28)
**Context:** Module 02 Phase 9 (UserActivity), Module 8 prep (AuditLog).

## Decision

Two separate tables, two separate write paths, two separate audiences.
**Don't merge them.**

| | UserActivity | AuditLog |
|---|---|---|
| Audience | The user themselves | Compliance reviewer / admin |
| What it records | User-facing events on my account | Every data mutation in the system |
| Includes auth events (LOGIN/LOGOUT) | Yes | No |
| Includes data mutation diffs | No | Yes (before/after JSONB) |
| Write path | Manual `logActivity()` from controllers | Automatic via Sequelize hooks |
| Row count at scale | Bounded per user (~hundreds) | Unbounded (millions) |
| FK on userID | `ON DELETE CASCADE` | None — survives user purge |
| Soft delete | N/A (immutable, but can be aged out) | Never deleted (forensic) |
| Surfaced in UI | Profile page (Module 02 frontend) | Audit Logs page (Module 8) |

## Why two systems

### Different audiences want different things

A user looking at their Profile wants: "What happened on my account?"
That includes login activity, password changes, profile edits — events,
not data mutations. Showing them a row that says "AuditLog 9e9dd182:
UPDATE customer eb5cb8f4 changes={...}" is meaningless and overwhelming.

A compliance reviewer wants: "Who changed what?" That requires
field-level before/after diffs, polymorphic entity tracking, and
forensic-grade retention. Showing them a row that says "Logged in"
clutters the trail.

### Different shapes don't compose

UserActivity rows are **events**: `{ actionType, label, description }`.
AuditLog rows are **diffs**: `{ entityType, entityID, action, changes:
{ before, after } }`. Trying to make one row type cover both produces
either a sparse table (most fields null per row type) or a JSONB blob
that can't be indexed for either workload.

### Different write paths have different reliability needs

UserActivity is fire-and-forget — a logging failure must NEVER block
login. We swallow errors via try/catch.

AuditLog is similarly best-effort right now (also try/catch in the
hook), but compliance pressure may eventually force a strict mode where
audit-write failure rolls back the parent transaction. Keeping them
separate lets us upgrade AuditLog's reliability story without
introducing a hard dependency for the activity feed.

### Different scaling profiles

UserActivity is bounded — ~10s of rows per user per active day. We can
keep it forever cheaply; if it ever grows we age out everything older
than a quarter.

AuditLog grows linearly with system writes. At scale we'll partition
by month or year (PostgreSQL declarative partitioning). Different table
= different physical layout = independent scaling story.

## Some events trigger BOTH systems

A user updating their own profile fires:
- `UserActivity { actionType: 'PROFILE_UPDATED', userID: self }` — for the
  Profile feed.
- `AuditLog { entityType: 'user', entityID: self, action: 'UPDATE',
  changes: { before, after } }` — for the audit trail.

Both records exist simultaneously. They serve different views.

A user updating their own profile photo fires THREE rows: one
`PHOTO_UPDATED` UserActivity + one `UPDATE` AuditLog on User
(profilePhotoAttachmentID flip) + one `DELETE` AuditLog on Attachment
(the prior photo, hard-deleted). All three are correct — that's
literally what happened in the system.

A user logging in fires ONE row: `LOGIN` UserActivity. No AuditLog —
login isn't a data mutation. The User.lastLoginAt bump that happens
inside `registerSuccessfulLogin` is explicitly opted out via
`{ skipAudit: true }` so the login flow doesn't generate noise.

## Implementation contracts

### UserActivity (manual)
- `services/activityLogger.js` exposes `logActivity(...)`.
- Called from `auth.controller` and `user.controller` at event points.
- IP / user-agent pulled from AsyncLocalStorage context (`utils/requestContext.js`).
- `UserActivity` model uses `validate: { isIn: [ACTION_TYPES] }` to
  enforce the enum at write time.

### AuditLog (automatic via Sequelize hooks)
- `utils/auditableModel.js` exports `applyAuditLogging(Model, entityType, options)`.
- Each audited model definition file calls it after `applyAuditHooks`.
- Currently audited (12 models): Customer, Category, SourceType, Source,
  Equipment, OcmElement, Specification, Unit, Test, Method, User, Attachment.
- `excludeFields` per model strips sensitive/noisy attributes:
  - `User`: `['password']`
  - `Attachment`: `['fileData', 'dataUrl']`
  - All models also auto-strip `createdAt`, `updatedAt`, `deletedAt` (cosmetic timestamps).
- `skipAudit: true` opt-out for system-internal writes:
  - `User.registerFailedLogin` / `registerSuccessfulLogin` (lockout/lastLoginAt bumps).
  - `auth.controller.changePassword` (UserActivity is the canonical
    record of the event; AuditLog row would only show the
    `passwordChangedAt` diff, duplicative).

### Soft-delete recognition

Soft-delete goes through `instance.update({ isDeleted: true, ... })`,
which fires `afterUpdate`. The factory recognizes `isDeleted: false →
true` as a soft-delete and emits `action: 'DELETE'` instead of `'UPDATE'`.

## When to revisit

If a third system emerges (e.g. "user behaviour analytics" for product
research), keep it separate too. Don't be tempted to fold it into
UserActivity or AuditLog. Each system gets its own table when its shape
or audience is distinct.
