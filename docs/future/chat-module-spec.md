# Chat Module — Deferred to Phase 2

**Status:** Deferred (recorded 2026-04-28). Not on the active build queue.
**Revisit:** After Sample Intake → Worksheet → Reports ship.

## Why deferred

- LIMS core features (Sample Intake, Worksheet, Reports) are the higher
  priority — they directly enable lab operations and revenue.
- Chat isn't blocking any current workflow. Technicians and managers
  continue to use whatever they use today (verbal, email, phone) for
  out-of-band conversations.
- Shipping the core LIMS first keeps scope tight; chat can ride in as a
  cross-cutting addition later, and can also be back-ported into the
  starter template at the same time.

## Use case (recorded so we don't lose it)

- **Primary** — internal lab messaging between staff (technicians,
  managers, admins) for ad-hoc operational chatter.
- **Trigger** — a technician raised the need around special-pricing
  inquiries that need quick back-and-forth without leaving the LIMS UI.
- **Out of scope (initial pass)** — customer ↔ lab chat. Customer-
  facing communication stays on email/phone until we have a clear
  product reason to bring it in-app.

## Approach when built

Implement in this order; do not ship later phases first:

1. **Direct messages (1-to-1)**
   - Two-table model: `Conversations` + `Messages`.
   - Each conversation has exactly two participants in this iteration
     (no group support yet).
   - Soft-delete `Messages.isDeleted` per-message; conversations are
     immutable once created.
   - Polling is acceptable for the first version (5–10 s on the active
     conversation, 30 s for the inbox list).
2. **WebSocket push** — Phase 2 enhancement.
   - Per-user channel scoped on `userID`; carry deltas only.
   - REST endpoints stay the source of truth (same model as
     Notifications).
3. **Group chat** — future enhancement.
   - Many-to-many `ConversationParticipants` join table.
   - Adds @mention, typing indicators, etc. — out of scope until
     direct + websocket are stable.

## Integration points

- **Notifications** — wire each new message into the existing
  notification service:
  - `scope: 'PERSONAL'`, `userIDs: [recipientUserID]`.
  - `type: 'INFO'`, `priority: 'LOW'`.
  - Title: `New message from {sender.firstName}`.
  - `link: '/chat/{conversationID}'`.
  - `triggeredBy: req.user.userID` (sender) — the existing
    self-exclusion drops the sender from the recipient set automatically.
  - Fire-and-forget per the locked notification call-site rule.
- **Activity logging** — out of scope. Chat is high-churn and not a
  business-record event; do not register `Messages` with
  `applyAuditLogging` (mirror the `NotificationRecipient`/`Attachment`
  opt-out policy).
- **Auth** — re-uses the existing JWT + `requireJwtAuth` middleware
  stack. No special role gating beyond "authenticated user".

## Frontend

- Vendor reference: `/frontend/vendor/src/pages/application/chat`.
  Use the vendor layout verbatim (sidebar list of conversations + main
  pane + composer). Adapt the data plumbing only.
- Header bell already covers the "new message" surface in-app via the
  PERSONAL notification, so users see incoming messages even when the
  Chat page is closed.
- Sidebar entry: under **Administration** initially (small audience).
  Promote to its own top-level icon if usage spreads.

## Estimate

- Direct-message MVP (backend + UI + notification hook): ~4–5 hours.
- WebSocket push: +3–4 hours when added.
- Group chat: separate scoping pass when actually requested.

## Why this lives here

`/docs/future/` is the catch-all for features that have been raised,
scoped enough not to lose the thinking, and intentionally deferred.
Promote a file out of `/docs/future/` to `/docs/modules/` when it
enters the active build queue.
