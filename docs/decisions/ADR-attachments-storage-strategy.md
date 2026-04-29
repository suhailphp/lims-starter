# ADR — Attachments storage strategy

**Status:** Accepted (2026-04-28)
**Context:** Module 00 — Attachments
**Related:** Module 02 — Auth & User Management (first uploader)

## Decision

1. **Storage location:** PostgreSQL `Attachments.fileData` (TEXT, base64).
   No filesystem, no S3. One source of truth.
2. **Lifecycle:** Hard delete. No soft-delete columns on the Attachments
   table.
3. **Replacement:** When an owning entity flips its FK to a new
   attachment, the OLD attachment row is hard-deleted in the same
   transaction. No orphans, no history, no isActive flag.
4. **Linking:** Direct FK on the owning table
   (`Users.profilePhotoAttachmentID`), not polymorphic. Multi-attachment
   relationships use junction tables (`belongsToMany`).

## Context

Phase-1 use cases are all small images:

| Use case | Typical size | Frequency |
|---|---|---|
| User profile photo | 50–300 KB | One per user |
| Customer logo | 20–100 KB | One per customer |
| Equipment image | 50–500 KB | One main + few extras |

Total at lab scale (~200 users, ~50 customers, ~30 equipment): <100 MB
of attachment data. PostgreSQL handles this trivially.

Test result PDFs are a different shape — multi-MB, frequent writes,
keep-forever audit. They will get their own decision when that module
arrives.

## Why these choices

### DB-only storage (vs. filesystem / S3)

- One backup story: `pg_dump` captures everything.
- One restore story: `pg_restore`.
- One transaction boundary: a partial-failure crash leaves no orphan files
  on disk.
- No `/uploads/` directory to mount, .gitignore, or sync between
  development boxes.
- Acceptable cost at lab scale; revisit if photo volume changes shape.

The base64 expansion (~33%) is paid once on insert; PostgreSQL TEXT
compresses well via TOAST when the row is large.

### Hard delete (vs. soft delete)

- Attachments are bytes, not business records. There is no "what was
  the old photo?" query that matters — that's not an audit need.
- Audit trail for "the photo changed" lives on the parent entity
  (`Users.updatedAt`, `auditedUpdate` populates `updatedBy`). The
  parent record is the source of truth for **what changed and when**;
  the attachment table is not.
- Soft delete would bloat the table with dead bytes and add noise to
  every query (`WHERE isDeleted = false`).
- The model deliberately does **not** call `applyAuditHooks` (which
  would attach `softDelete` / `auditedUpdate` prototype methods that
  callers might reach for by habit). Two manual `beforeCreate` /
  `beforeUpdate` hooks set audit columns; nothing else.

This is the **opposite** of every other table in the project, which is
why it gets called out in CLAUDE.md as an explicit pattern.

### Direct FK (vs. polymorphic)

We considered a polymorphic shape (`entityType`, `entityID` columns on
Attachments) and rejected it:

- **No DB-level integrity:** the entityType / entityID combination
  cannot be enforced as a foreign key, so rows can dangle silently.
- **Manual cleanup:** orphan removal becomes the controller's job and
  is easy to forget.
- **Sequelize associations don't play well:** you can't `belongsTo` a
  polymorphic target cleanly.

Direct FK on each owning entity is the standard relational pattern (used
by GitHub, Slack, Rails, Django attachments stories at the row-level).
Each owning column declares ON DELETE SET NULL so manual attachment
purges don't cascade-delete users.

## Consequences

- **No history of replaced photos.** If we ever need it, we add it
  per-entity (e.g. `UserPhotoHistory` junction table). Don't backfit it
  into the Attachments table.
- **DB size grows linearly with attachments.** Acceptable at lab scale;
  monitor with the existing pg_stat_user_tables observability.
- **Filesystem switch is a future migration**, not a refactor. When test
  result PDFs land, that module will define its own table or extend this
  one with a `storageType` column at that time.

## When to revisit

Trigger conditions that should prompt a re-decision:

1. Single attachment exceeds 1 MB consistently (move to filesystem).
2. Attachments table exceeds 5 GB (move to filesystem or add
   compression).
3. Photo throughput exceeds 10/s sustained (move to direct upload to
   filesystem to skip the DB round-trip).

None of these apply for the foreseeable lab use case.
