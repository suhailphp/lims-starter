# ADR — `auditedUpdate` for User-Initiated Saves

## Status: Accepted

## Context
Every PUT controller in LIMS does the equivalent of:
```js
await instance.update(payload, { userId: req.user.userID });
```
Combined with `applyAuditHooks(Model)`, this:
- runs an `UPDATE` SQL statement,
- sets `updatedBy` to the acting user via `beforeUpdate` hook,
- relies on Sequelize's automatic `timestamps: true` to bump `updatedAt`.

That works **only when at least one payload field actually differs from
the current row**. We discovered two stacked Sequelize quirks that cause
`updatedAt` to silently freeze at `createdAt` for unchanged-payload
saves:

1. **No-op skip** — `instance.update()` calls `set()` then `save()`.
   `save()` checks `_changed`; if no field is dirty, it returns early
   without firing any SQL. `updatedAt` is never touched.
2. **Managed-field filter** — `instance.set('updatedAt', new Date())`
   is silently ignored. Sequelize protects `createdAt`/`updatedAt`/
   `deletedAt` from manual `set()`; `changed('updatedAt')` returns
   `false` afterwards.

Combined effect: a user opens an Edit form, doesn't actually change
anything (or Zod's `trim/toLowerCase` round-trips strings to identical
values), submits — backend accepts the request, returns 200, but
`updatedAt` in the DB stays at `createdAt`. View modals show stale
"Last Updated" timestamps.

For an audit-heavy LIMS, "last time someone hit Save" is the intended
semantic — not "last time at least one byte changed". We need every
authenticated PUT to leave a trail.

## Decision
Add `Model.prototype.auditedUpdate(payload, userId, options)` to the
shared `applyAuditHooks(Model)` utility:

```js
Model.prototype.auditedUpdate = function (payload, userId, options = {}) {
  this.set(payload);
  this.changed('updatedAt', true);   // forces dirty; plain set() is filtered
  return this.save({ ...options, userId });
};
```

`changed('updatedAt', true)` is the only Sequelize primitive that
sidesteps both quirks: it marks the timestamp dirty (so `save()` fires
SQL) and lets Sequelize itself compute the new value during save (which
the managed-field filter does allow).

Every PUT controller in LIMS uses this helper:
```js
await instance.auditedUpdate(payload, req.user.userID);
```

`options` passes through to `save()` — supports `transaction`, etc.

## Rationale
- **Single source of truth.** The fix lives in `applyAuditHooks.js`
  next to the existing `softDelete` / hooks, so every audited model
  picks it up automatically.
- **Discoverable.** PR review: any controller using bare `.update()`
  for a user-initiated save is a deviation worth flagging.
- **Cheap.** One extra `changed('updatedAt', true)` call per save.
- **Preserves backend-managed timestamp.** Sequelize still picks the
  exact `now()` value during save — we don't pass it, we just mark
  the field dirty.
- **Diff with backend reality is recorded.** If we ever need
  "last time data actually changed" semantics, that's still available
  via Sequelize's `_changed` keys excluding `updatedAt` — we haven't
  destroyed information.

## Alternatives Considered
- **Pass `updatedAt: new Date()` in payload.** Doesn't work; Sequelize
  filters managed timestamps from `set()` (proven via probe).
- **`save({ silent: false })` + manual touch.** `silent` doesn't
  influence the no-op skip; same outcome.
- **Always re-create the row instead of update.** Loses primary key
  + audit log + foreign keys. Rejected immediately.
- **Keep `update()`, accept the freeze.** Rejected — invisible audit
  gap, View modal shows wrong "Last Updated".
- **Database-side trigger.** Postgres trigger to bump `updatedAt` on
  UPDATE. Doesn't help — the issue is no UPDATE fires when nothing's
  dirty. Trigger would only fire on real updates.

## Consequences

### What this enables
- "Last Updated" in any View modal accurately reflects the most recent
  authenticated PUT — even if the user submits without modifying any
  field.
- The pattern naturally extends to bulk-edit workflows added later
  (Worksheet/TestResult mutations).

### What this constrains
- **All PUT controllers must use `auditedUpdate`** for the entity's
  primary save. Audited via grep:
  ```
  grep -rn "instance.update(.*userId" src/modules/*/*.controller.js
  ```
  any match is a regression.
- **Pure system updates** (e.g., `RefreshToken.update({ revokedAt })`,
  `Method.update({ isDefault: false })` for cascading reset) keep
  using bare `.update()` — they are not user-clicks-Save events and
  the bumped `updatedAt` would be misleading.

### Migration path
All 11 master-data + auth PUT controllers were converted in one
sweep. Future controllers: code-review checklist item.
