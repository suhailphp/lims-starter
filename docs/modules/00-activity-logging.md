# Module — Activity Logging

## Status: ✅ COMPLETE (2026-04-28)

Two distinct systems shipped together. Both write infrastructure landed in
Module 02 Phase 9.

| | UserActivity | AuditLog |
|---|---|---|
| Audience | The user (Profile feed) | Compliance reviewer (Module 8 future UI) |
| Trigger | Manual via `services/activityLogger.js` | Automatic via Sequelize hooks |
| Table | `UserActivities` | `AuditLogs` |
| Use cases | Login, profile change, photo change, password reset | Any CREATE/UPDATE/DELETE on audited models |
| Retention | Bounded per user (can age out) | Forensic — never deleted |

See `/docs/decisions/ADR-useractivity-vs-auditlog.md` for the full
delineation rule.

---

## UserActivity

### Schema

| Column | Type | Notes |
|---|---|---|
| `activityID` | UUID PK | UUIDv4 |
| `userID` | UUID FK Users.userID | `ON DELETE CASCADE` |
| `actionType` | VARCHAR(50) | enum-validated in model |
| `actionLabel` | VARCHAR(150) | display label |
| `description` | TEXT | one-sentence detail |
| `ipAddress` | VARCHAR(45) | IPv6-safe |
| `userAgent` | VARCHAR(500) | from request |
| `metadata` | JSONB | flexible context |
| `createdAt` | DATE | timestamps; `updatedAt` deliberately omitted |

Indexes: `(userID, createdAt DESC)` — primary feed query; `(actionType)`
for analytics later.

### Action types (initial)

| actionType | Trigger | UI label |
|---|---|---|
| `LOGIN` | Successful sign-in | "Logged in" |
| `LOGIN_FAILED` | Bad password | "Failed sign-in attempt" |
| `LOGOUT` | Explicit logout | "Signed out" |
| `PROFILE_UPDATED` | Self-edit of name/email/etc. (non-photo) | "Profile updated" |
| `PHOTO_UPDATED` | Self-edit of profile photo | "Profile photo updated" / "Profile photo removed" |
| `PASSWORD_CHANGED` | `/auth/change-password` success | "Password changed" |
| `PASSWORD_RESET` | Admin reset of THIS user's password (logged on TARGET timeline) | "Password reset by admin" |

### Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/users/me/activities` | requireJwtAuth | Self UserActivity feed |
| GET | `/api/users/:userID/activities` | ADMIN/MANAGER **or** self | Other-user UserActivity feed |
| GET | `/api/users/me/timeline` | requireJwtAuth | **Unified** self feed (UserActivities + own AuditLogs merged) — see below |

Query params for the activities endpoints: `page`, `limit`, `actionType`,
`from`, `to`. Default `limit` 20, max 100. Sort always `createdAt DESC`.

### Unified timeline (`/api/users/me/timeline`)

Surfaces a single chronological feed of two distinct underlying systems
for the Profile page. Mental model: "what did I do today?".

Query params:
- `filter` — `'all' | 'activities' | 'changes'`. Default `all`.
  - `all`: both UserActivities and own AuditLogs, interleaved by date.
  - `activities`: only UserActivity rows (auth + profile events).
  - `changes`: only AuditLog rows where `userID = me`.
- `page`, `limit` — pagination, same defaults as other endpoints.

Each item carries a `source` discriminator:

```ts
type TimelineItem =
  | { source: 'user_activity', id, createdAt, actionType, actionLabel,
      description, ipAddress, userAgent }
  | { source: 'audit_log',     id, createdAt, action, entityType, entityID,
      changes: { before?, after? }, ipAddress, userAgent }
```

Implementation: two parallel queries (over-fetch `page * limit` from
each side because both tables have `(userID, createdAt DESC)` indexes),
merge in JS, sort, slice. Cleaner than SQL UNION at lab scale; total
count is `activitiesTotal + changesTotal` for `all`, otherwise the one
relevant count.

Frontend rendering (`features/profile/ActivityItem.tsx`):
- `source: 'user_activity'` → `actionType` → icon + label/description from
  `activityIcons.ts`.
- `source: 'audit_log'` → `action` → CREATE (success + IconPlus) /
  UPDATE (info + IconPencil) / DELETE (danger + IconTrash). Label =
  `{Created|Updated|Deleted} {EntityLabel}` with optional `"name"` for
  CREATE/DELETE (extracted via `auditLabels.getEntityName`). UPDATE shows
  field-name list ("Changed: name, address") via `getChangedFields`.

Pagination: `useInfiniteQuery` (`useMyTimelineInfinite(filter, limit)`)
backs the feed. Pages auto-concatenate; "Load More" button at the bottom
calls `fetchNextPage()` until `hasNextPage` is false. `getNextPageParam`
checks `meta.page * meta.limit < meta.total`. Filter chip click changes
the queryKey and resets to page 1 automatically.

### Frontend

- `src/types/userActivity.ts`
- `src/api/userActivities.ts` — `listMyActivitiesApi`, `listUserActivitiesApi`
- `src/features/userActivities/queries.ts` — `useMyActivities`, `useUserActivities`
- `src/features/profile/ActivityItem.tsx` — single feed row (vendor pattern: dashed connector + outline ring)
- `src/features/profile/ProfileActivityFeed.tsx` — date-grouped feed
- `src/features/profile/activityIcons.ts` — actionType → Tabler icon + tone tokens

---

## AuditLog

### Schema

| Column | Type | Notes |
|---|---|---|
| `auditLogID` | UUID PK | UUIDv4 |
| `userID` | UUID | NO FK constraint — survives user purge |
| `entityType` | VARCHAR(50) | polymorphic key (`'customer'`, `'user'`, etc.) |
| `entityID` | UUID | row PK in target table |
| `action` | VARCHAR(20) | `'CREATE' \| 'UPDATE' \| 'DELETE'` |
| `changes` | JSONB | `{ before?, after? }` — diff for UPDATE, full row for CREATE/DELETE |
| `ipAddress` | VARCHAR(45) | from request |
| `userAgent` | VARCHAR(500) | from request |
| `metadata` | JSONB | flexible context |
| `createdAt` | DATE | timestamps; `updatedAt` deliberately omitted |

Indexes:
- `(entityType, entityID, createdAt DESC)` — record history (Module 8 detail panel)
- `(userID, createdAt DESC)` — what did this user change
- `(createdAt)` — time-based scans
- `(action)` — filter by type

### Audited models (12)

`Customer, Category, SourceType, Source, Equipment, OcmElement,
Specification, Unit, Test, Method, User, Attachment`.

Each model definition calls `applyAuditLogging(Model, entityType,
options?)` after `applyAuditHooks`. The factory wires
afterCreate/afterUpdate/afterDestroy hooks that read AsyncLocalStorage
context and write `AuditLog` rows.

### Excluded fields per model

`excludeFields` strips sensitive/noisy attributes from the `changes`
JSONB BEFORE it's persisted:

| Model | Excluded |
|---|---|
| User | `password` (CRITICAL — leaking the bcrypt hash via audit history would be a security incident) |
| Attachment | `fileData`, `dataUrl` (huge base64 blobs, no audit value) |
| All models | `createdAt`, `updatedAt`, `deletedAt` (auto-stripped by the factory — cosmetic timestamps) |

### Soft-delete recognition

Soft-delete goes through `instance.update({ isDeleted: true, ... })`,
which fires `afterUpdate`. The factory recognizes the `isDeleted:
false → true` flip and emits `action: 'DELETE'` instead of `'UPDATE'`.
`changes.before` carries the row's previous data; `changes.after` is
omitted (the delete IS the change).

### `skipAudit: true` opt-out

System-internal writes pass `skipAudit: true` in the call options:

| Site | Reason |
|---|---|
| `User.registerFailedLogin` / `registerSuccessfulLogin` | Lockout-counter / lastLoginAt bumps. The LOGIN/LOGIN_FAILED UserActivity is the canonical record. |
| `auth.controller.changePassword` user.save() | The PASSWORD_CHANGED UserActivity is canonical. AuditLog row would only show `passwordChangedAt` diff (password is excluded), duplicative. |

`RefreshToken` is not an audited model at all (no `applyAuditLogging`
call), so logout/refresh/reuse-revoke writes have no audit cost by
construction.

### Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/audit-logs` | ADMIN, MANAGER | Filtered + paginated. Filters: `entityType, entityID, userID, action, from, to`. |
| GET | `/api/audit-logs/:entityType/:entityID/history` | ADMIN, MANAGER | Timeline of changes for one record |
| GET | `/api/audit-logs/:auditLogID` | ADMIN, MANAGER | Single audit row |

Module 8 will surface these in a UI; the backend is ready now.

### Sample row (Customer UPDATE)

```json
{
  "auditLogID": "9e9dd182-8aec-...",
  "userID": "55c88399-...",
  "entityType": "customer",
  "entityID": "eb5cb8f4-...",
  "action": "UPDATE",
  "changes": {
    "before": { "name": "Second customer", "address": null,
                "paymentTermsDays": 30 },
    "after":  { "name": "Second customer (audited)", "address": "NEW ADDRESS",
                "paymentTermsDays": 45 }
  },
  "ipAddress": "::1",
  "userAgent": "curl/8.7.1",
  "metadata": {},
  "createdAt": "2026-04-28T10:24:31.845Z"
}
```

Only the fields that actually changed appear in `before`/`after`. Other
columns (contactName/Email/Phone) didn't change so they're absent from
the diff.

---

## Infrastructure: AsyncLocalStorage

The hooks need to know `userID`, `ipAddress`, `userAgent` without
threading them through every Sequelize call site. We use Node's built-in
`AsyncLocalStorage`:

- `utils/requestContext.js` — ALS instance + `runWithContext` / `getContext` helpers.
- `middleware/requestContext.js` — Express middleware mounted in `app.js`
  that wraps `next()` in `als.run(ctx, ...)`.
- `requireJwtAuth` updates the existing context's `userId` in place once
  `req.user` is populated.

See `/docs/decisions/ADR-async-local-storage-request-context.md`.

---

## Verification (curl smoke, 2026-04-28)

| Check | Result |
|---|---|
| Login → `LOGIN` UserActivity row | ✅ |
| Customer UPDATE → AuditLog with `before`/`after` diff (only changed fields) | ✅ |
| User UPDATE → AuditLog with NO `password` substring in JSON | ✅ |
| Soft-delete Customer → AuditLog `action: 'DELETE'` (recognized from isDeleted flip) | ✅ |
| Login + logout cycle → 0 AuditLog rows added (RefreshToken not audited; user.save() skipAudit) | ✅ |
| Self profile update → BOTH `PROFILE_UPDATED` UserActivity AND AuditLog UPDATE | ✅ |

Final verification snapshot before docs commit:

```
UserActivity feed for admin (last 10):
  - LOGIN, LOGIN, PROFILE_UPDATED, PROFILE_UPDATED, LOGIN, ...

AuditLog total: 6
  - DELETE customer 4578aac4...
  - CREATE customer 4578aac4...
  - UPDATE user 55c88399...
  - UPDATE customer eb5cb8f4...
  ...
```

---

## Files

```
backend/
├── src/migrations/
│   ├── 20260428200000-create-user-activities-table.js   NEW
│   └── 20260428200001-create-audit-logs-table.js        NEW
├── src/models/
│   ├── UserActivity.js                                  NEW
│   ├── AuditLog.js                                      NEW
│   ├── User.js                                          EDIT (+applyAuditLogging excludeFields:[password], +UserActivity hasMany)
│   ├── Attachment.js                                    EDIT (+applyAuditLogging excludeFields:[fileData,dataUrl])
│   └── {Customer,Category,SourceType,Source,Equipment,OcmElement,Specification,Unit,Test,Method}.js
│                                                        EDIT (+applyAuditLogging one line each)
├── src/utils/
│   ├── requestContext.js                                NEW (ALS wrapper)
│   └── auditableModel.js                                NEW (factory)
├── src/middleware/
│   ├── requestContext.js                                NEW
│   └── requireJwtAuth.js                                EDIT (sets ctx.userId post-auth)
├── src/services/activityLogger.js                       NEW
├── src/modules/userActivity/                            NEW (controller + routes + validation)
├── src/modules/auditLog/                                NEW (controller + routes + validation)
├── src/modules/auth/auth.controller.js                  EDIT (logActivity LOGIN/LOGIN_FAILED/LOGOUT/PASSWORD_CHANGED + skipAudit on changePassword save)
├── src/modules/user/user.controller.js                  EDIT (logActivity PROFILE_UPDATED/PHOTO_UPDATED/PASSWORD_RESET, SELF_ALLOWED += profilePhotoAttachmentID)
└── app.js                                               EDIT (mount requestContext, /api/users/me/activities, /api/audit-logs)

frontend/
├── src/types/userActivity.ts                            NEW
├── src/api/userActivities.ts                            NEW
├── src/features/userActivities/queries.ts               NEW
└── src/features/profile/                                NEW (ActivityItem, ProfileActivityFeed, activityIcons)
```

## Postman

`docs/postman/UserActivity.postman_collection.json` and
`docs/postman/AuditLog.postman_collection.json` document each endpoint
with example payloads.
