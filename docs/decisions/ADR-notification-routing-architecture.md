# ADR — Notification routing architecture (two-table + scope-based)

**Status:** Accepted (2026-04-28)
**Context:** Module 00 Notifications (foundation work before Sample Intake).

## Decision

Two tables, three audience scopes, multi-notification per event.

### Schema split

| | `Notifications` | `NotificationRecipients` |
|---|---|---|
| What it represents | The message itself | Per-user delivery + read state |
| Cardinality | One per event-emission | One per (notification × user) |
| Mutability | Immutable (no `updatedAt`) | Mutable (`isRead`/`readAt`/`isDeleted`/`deletedAt` flips) |
| Audited via Sequelize hooks | No (`skipAudit: true`) | No (high-churn, would flood AuditLog) |
| FK on `userID` | None (`triggeredBy` survives user purge) | `ON DELETE CASCADE` (per-user state, no value after user gone) |
| Soft delete | N/A | Yes — per-user dismissal |

### Scope routing

`notify({ scope, ... })` is the single entry point. The service resolves
the audience based on scope:

- **PERSONAL** — caller supplies `userIDs` directly. Use case: welcome,
  password-change confirmation, account-locked warning.
- **CUSTOMER** — every active CUSTOMER user with the given `customerID`
  (+ optional `additionalUserIDs`). Use case: "Your sample report ready".
- **LAB** — every active user whose role is in `roles` (+ optional
  `additionalUserIDs`). Use case: "Equipment X overdue → MANAGER+ADMIN".

A `Set` de-duplicates across resolver paths. If the audience is empty,
the service skips Notification insertion entirely (no orphan rows).

### Multi-notification per event (locked rule)

A single business event may emit MULTIPLE notifications, each tuned to
its audience. Example — "Report Ready":

1. CUSTOMER scope → friendly title, customer-facing link.
2. LAB scope (MANAGER+ADMIN) → operational title, internal link.
3. PERSONAL → the technician who ran the test, low priority.

The service is designed to be called multiple times per event. Each call
produces its own Notification row + recipient set.

## Why two tables

### Storage efficiency for fan-out

A LAB-scope notification to 30 lab staff stores 1 message + 30 lightweight
recipient rows. A single-table design would duplicate the title/message
30 times. Cost compounds at scale (sample counts in production are 50k+).

### Independent per-user state

Each recipient has their own `isRead` / `readAt` / `isDeleted` /
`deletedAt`. No coupling. User A dismissing a LAB notification doesn't
hide it from anyone else.

### Clean queries

"Show my unread feed" joins on `userID` + `isRead=false` — the
`(userID, isRead, createdAt DESC)` index covers it. "Who got this
notification" hits the `(notificationID)` index. Both are O(log n).

## Audit decisions

- **`Notifications` is opt-out via `skipAudit: true` on every create.**
  The notification IS the permanent record; an AuditLog row would
  duplicate it. Same logic as PASSWORD_CHANGED's UserActivity opt-out.
- **`NotificationRecipients` is NOT registered with `applyAuditLogging`
  at all.** Read/dismiss flips happen constantly per user — auditing
  every flip would flood AuditLog with noise that nobody reads. Same
  policy as the `Attachment` table (high-churn auxiliary state).

## Account-lock notification: from controller, not model

The lock detection sits in `auth.controller.login` after
`user.registerFailedLogin()`. We have `req` there for IP context, and
the controller is already the home of related lifecycle logic (LOGIN /
LOGIN_FAILED activities). Lifting it into a model hook would split the
event story across two files and obscure ordering.

## 90-day cleanup is a TODO

Soft-deleted recipient rows accumulate. A future scheduled job will
hard-delete rows where `isDeleted=true AND deletedAt < now - 90 days`,
plus optionally `isRead=true AND readAt < now - 90 days` if the table
gets large. Not built yet — at lab scale the row count grows slowly,
and adding a job before we have load data is premature.

## Frontend implications

- Bell badge polls `/api/notifications/me/unread-count` every 30 s.
  TanStack Query pauses polling when the tab is hidden — no wasted
  requests in background tabs.
- Mark-as-read fires on item CLICK only (not hover). Vendor's pattern
  has `closeOnMenuInteract={false}` so users can read multiple items
  without the dropdown closing — consistent with our behaviour.
- Bell badge format: `1`–`99`, then `99+`. Avoids the badge growing
  wider than the bell itself.
- Type → icon + color mapping in `notificationIcons.ts` uses vendor
  CSS variables (`--color-info`, `--color-success`, `--color-warning`,
  `--color-danger`) so dark mode flips automatically.

## When to revisit

- **WebSocket push** — currently polling. When the lab grows (10+ active
  staff at peak), bring in a WebSocket channel scoped per `userID` so
  notifications are instant. Keep the REST endpoints as the source of
  truth; WebSocket carries deltas only.
- **Email / SMS delivery** — out of scope for this iteration. When
  added, expose a `channels: ['in_app', 'email']` field on `notify()`
  and dispatch to per-channel adapters. Recipient rows stay where they
  are.
- **Notification settings page** — vendor's `settings/notification/notification.tsx`
  has a per-category email toggle UI ready to mimic. Surface when we
  start needing per-user opt-outs.
