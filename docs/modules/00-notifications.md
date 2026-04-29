# Module 00 — Notifications

Lab-agnostic, reusable notification infrastructure. Foundation work for
every subsequent module (Sample Intake, Reports, OCM, etc.) that needs
to surface events to users.

## What it does

- Stores message bodies once, fans out per-user delivery state.
- Three audience scopes (PERSONAL / CUSTOMER / LAB), one resolver.
- Mutli-notification per event when audiences need different framing.
- Header bell with unread badge + dropdown of recent 10.
- Dedicated `/notifications` page with filter + pagination.

## Schema

### `Notifications` (immutable message)

| Column | Type | Notes |
|---|---|---|
| `notificationID` | UUID PK | |
| `type` | `'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'` | Drives icon + color. |
| `priority` | `'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'` | Default `'LOW'`. |
| `scope` | `'PERSONAL' | 'CUSTOMER' | 'LAB'` | Frozen audience selector at emit time. |
| `title` | VARCHAR(200) | |
| `message` | TEXT | |
| `link` | VARCHAR(500) NULL | Click-target. Null = no nav. |
| `metadata` | JSONB | Free-form context. |
| `entityType` / `entityID` | polymorphic pointer | Optional. |
| `triggeredBy` | UUID NULL | The actor who caused this. No FK. |
| `createdBy`, `createdAt` | audit | No `updatedAt` — immutable. |

Indexes: `(createdAt)`, `(entityType, entityID)`.

### `NotificationRecipients` (per-user state)

| Column | Type | Notes |
|---|---|---|
| `recipientID` | UUID PK | |
| `notificationID` | UUID FK CASCADE | |
| `userID` | UUID FK CASCADE | |
| `isRead` / `readAt` | tracker | |
| `isDeleted` / `deletedAt` | per-user dismissal | Soft-delete with default-scope hide. |
| `createdAt` | timestamp | No `updatedAt`. |

- Unique `(notificationID, userID)`.
- Hot-path index `(userID, isRead, createdAt DESC)`.
- 90-day cleanup of `isDeleted=true` rows is a future scheduled job.

## Service contract

`backend/src/services/notificationService.js`

```js
notify({
  scope: 'PERSONAL' | 'CUSTOMER' | 'LAB',
  // Audience inputs (one of these, depending on scope)
  userIDs?: string[],         // PERSONAL
  customerID?: string,        // CUSTOMER
  roles?: UserRole[],         // LAB
  additionalUserIDs?: string[], // any scope, additive
  // Message body
  type, priority?, title, message, link?, metadata?,
  entityType?, entityID?, triggeredBy?,
})
// → Promise<{ notification, recipientCount }>
```

- Resolves audience BEFORE inserting; empty audience → no-op.
- Notification + recipients written in one transaction.
- `skipAudit: true` on the Notification create (the notification IS the
  record; AuditLog would duplicate it).
- All call sites use fire-and-forget (`.catch(...)`) so a notification
  failure can never block the parent request.
- **Self-exclusion**: when `triggeredBy` is EXPLICITLY passed by the
  caller, the resolver drops that user from the recipient set. Prevents
  the actor from receiving their own action notifications. Genuine
  self-events that don't pass `triggeredBy` (welcome, account-locked,
  self password-change) keep working — the resolver checks
  `opts.triggeredBy`, not the implicit `ctx.userId` fallback.

`notifyUser(userID, options)` is the one-line shortcut for PERSONAL.

## Endpoints (all JWT-protected)

| Verb | Path | Use |
|---|---|---|
| GET | `/api/notifications/me?page&limit&unreadOnly&type&priority` | Paginated list. |
| GET | `/api/notifications/me/unread-count` | Bell badge poll. |
| PUT | `/api/notifications/:id/read` | Mark recipient read. |
| PUT | `/api/notifications/me/read-all` | Bulk mark read. |
| DELETE | `/api/notifications/:id` | Soft-delete recipient row. |

Scope: every authenticated user manages their own notifications. There
is no admin endpoint surface yet — admin oversight will land with the
Module 8 Audit UI if needed.

## Initial event hooks (this iteration)

| Event | File | Type / Priority | Link |
|---|---|---|---|
| User created | `user.controller.create` | INFO / LOW | `/dashboard` |
| Self password change | `auth.controller.changePassword` | INFO / MEDIUM | `/profile` |
| Account locked | `auth.controller.login` (post-fail) | ERROR / CRITICAL | none |
| Admin password reset | `user.controller.resetPassword` | WARNING / HIGH | `/change-password` |
| New equipment created | `equipment.controller.create` | INFO / LOW (LAB scope) | `/equipment` |

For the ADMIN reset case, `triggeredBy` carries the admin's `userID` so
the target user can see who reset their password (or — later — a richer
"by Joe Admin" attribution surface).

## Adding notifications to a future module

Per-module rules are discussed and approved BEFORE implementation:

1. List events that should notify someone.
2. For each event, list audiences (and what they need to know — the
   framing differs per audience).
3. Choose scope + type + priority per audience.
4. Wire `notify(...)` calls in the controller, fire-and-forget.

Multi-notification per event is intentional — see
ADR-notification-routing-architecture for the worked example.

### Worked example — Equipment "new equipment" event

This is the locked integration pattern. Copy this shape for every future
LAB-broadcast event.

```js
// src/modules/equipment/equipment.controller.js
const { notify } = require('../../services/notificationService');

async function create(req, res) {
  const equipment = await db.Equipment.create(req.validated.body, {
    userId: req.user.userID,
  });

  notify({
    scope: 'LAB',
    roles: ['TECHNICIAN', 'MANAGER', 'ADMIN'],
    type: 'INFO',
    priority: 'LOW',
    title: 'New Equipment Added',
    message: `${equipment.name}${equipment.model ? ` (${equipment.model})` : ''} added to inventory`,
    link: '/equipment',
    entityType: 'equipment',
    entityID: equipment.equipmentID,
    triggeredBy: req.user.userID,
  }).catch((err) =>
    console.error('[notify] equipment-created failed', {
      equipmentID: equipment.equipmentID,
      message: err.message,
    }),
  );

  res.status(201).json({ success: true, data: equipment });
}
```

Pattern checklist (verify each on every new integration):
- **Scope** picks the audience selector. LAB + roles for ops broadcasts;
  CUSTOMER + customerID for tenant-facing; PERSONAL + userIDs for direct.
- **`triggeredBy: req.user.userID`** — always pass it. The service drops
  the actor from the recipient set, so the admin who creates equipment
  doesn't get their own notification. Customers are also implicitly
  excluded by the LAB scope (no CUSTOMER role in `roles`).
- **Fire-and-forget** — never `await`. A notification failure must not
  block the parent response.
- **`entityType` + `entityID`** — let the recipient's UI deep-link to the
  underlying record (and survive future "show all notifications about
  this equipment" queries via the `(entityType, entityID)` index).
- **Message naming convention** — past-tense, names the record. Mirrors
  the toast convention: `"Centrifuge (BenchTop 5000) added to inventory"`,
  not `"Equipment was created successfully"`.

## Frontend

```
src/types/notification.ts
src/api/notifications.ts
src/features/notifications/
  queries.ts              # useMyNotifications, useUnreadCount (30s poll), …
  notificationIcons.ts    # type → icon + color, formatRelativeTime
  NotificationItem.tsx    # vendor notification-item layout
src/components/layout/
  NotificationBell.tsx    # header bell + numeric badge (1–99 / "99+")
  NotificationDropdown.tsx # vendor notification-dropdown panel
src/pages/NotificationsPage.tsx # full list + FilterMenu + pagination
```

- Bell polls every 30 s; pauses in background tabs.
- Mark-read on click only (not hover). Match vendor's
  `closeOnMenuInteract={false}` semantic.
- Dropdown reuses vendor classes (`notification-dropdown`,
  `notification-item`, `notifi-scroll`) so the CSS at
  `style.css:583` applies (max-height calc).
- Item color/icon flips with dark mode automatically (vendor variables).

## What's NOT in this iteration

- Per-user notification settings (email/push toggles).
- Email or SMS delivery channels.
- WebSocket push (we poll).
- Admin oversight endpoints (notification stats, force-resend).
- 90-day soft-delete purge job.

References:
- `/docs/decisions/ADR-notification-routing-architecture.md`
- `/docs/decisions/ADR-useractivity-vs-auditlog.md` (sister system; kept separate)
- `/docs/postman/Notifications.postman_collection.json`
