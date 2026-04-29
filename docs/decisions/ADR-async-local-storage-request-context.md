# ADR — AsyncLocalStorage for request-scoped audit context

**Status:** Accepted (2026-04-28)
**Context:** Audit logging infrastructure (Module 02 Phase 9 / Module 8 prep)

## Decision

Use Node's `AsyncLocalStorage` (built-in, since Node 14) to carry per-request
context (`userId`, `ipAddress`, `userAgent`, `requestId`) from the HTTP
entry point down into Sequelize hooks and service-level helpers.

## Alternatives considered

### A. Thread `options.userId` through every Sequelize call site

The existing `applyAuditHooks` already does this — every `.create()` and
`.auditedUpdate()` call in the codebase passes `{ userId: req.user.userID }`
in the options bag.

**Rejected** because:
- The new audit infrastructure also needs `ipAddress` and `userAgent`.
  Threading three more options into every controller call expands the
  blast radius of "I forgot to pass it."
- Missing one call silently drops the audit row. Compliance bias is
  audit-by-default with explicit opt-out — the threading approach
  inverts to opt-in by remembering to pass.
- Library helpers (toggleActive across tabs, future GraphQL resolvers,
  job queue consumers) would have to know about request context to
  forward it. ALS makes the context ambient.

### B. `cls-hooked` library

Older userland implementation of the same idea. **Rejected** because
`AsyncLocalStorage` is built in, the npm package is unmaintained
(latest release 2019), and we have no reason to add a dependency for
something the platform now ships natively.

## Implementation

```
utils/requestContext.js   ALS instance + runWithContext / getContext helpers
middleware/requestContext.js   Express middleware: wraps `next()` in als.run
                               with { userId: req.user?.userID, ipAddress,
                               userAgent, requestId }.
```

Mounted at `app.js` AFTER request-id assignment but BEFORE protected
routers. Auth middleware (`requireJwtAuth`) updates the existing context
in place once `req.user` is populated:

```js
const ctx = getContext()
ctx.userId = user.userID
```

Mutating the store object directly is safe because we're inside the same
ALS run — the store is a single shared object across the async chain.

Read sites:
- `utils/auditableModel.js` afterCreate/afterUpdate/afterDestroy hooks
  (the primary user — pulls userId/ip/ua to populate AuditLog rows).
- `services/activityLogger.js` (pulls ip/ua when not given an explicit
  `req` reference).

## Consequences

### Positive

- Adding a new audited model is a single line:
  `applyAuditLogging(Foo, 'foo')`. No controller changes, no new args
  to plumb. Makes audit-by-default actually realistic.
- Helper functions and services that don't take a `req` parameter still
  see the context. Clean ergonomics.
- Outside an HTTP request (CLI scripts, migrations, Sequelize seeds),
  `getContext()` returns `{}`. Hooks bail on missing `userId` — safe
  default; non-request work doesn't accidentally write audit rows.

### Negative

- One more pattern in the codebase. New contributors need to understand
  what ALS is. Mitigation: it's standard Node, not a niche library; the
  middleware is 20 lines.
- ALS adds a small per-request overhead from async hook propagation.
  Negligible at lab scale (Node's own benchmark: <5% overhead for typical
  HTTP workloads).

### Edge cases handled

- **Pre-auth requests** (login, public health): context exists with
  `userId: null`. Audit hooks bail. ip/ua still recorded for the
  activity log on login (which doesn't depend on userId being known
  at hook time — it's logged manually after `registerSuccessfulLogin`).
- **System-internal writes** (RefreshToken bulk revokes, lockout counter
  bumps): caller opts out with `{ skipAudit: true }`. Hooks honor the
  flag and skip the AuditLog write.
- **Errors inside hooks**: caught and `console.error`'d. A logging
  failure cannot break the parent transaction. Compliance trade-off
  documented in ADR-useractivity-vs-auditlog.

## Why not fewer guarantees

Could we simply pass `req` to every Sequelize call? Yes, but the
ergonomic cost is high (every helper and every model method needs to
know about HTTP), and the failure mode (forget to pass → no audit row,
no warning, compliance hole) is exactly the failure we want to prevent.

ALS provides the right shape: ambient, automatic, with safe defaults
when context is absent. It's the same architectural primitive used by
Rails (CurrentAttributes), Django (threadlocals), and modern Node
frameworks like Fastify (request decoration).
