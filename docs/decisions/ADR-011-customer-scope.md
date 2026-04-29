# ADR-011 — Customer Scope Enforcement

## Status: Accepted

## Context
The User table has a `role` column with five values: ADMIN, RECEPTIONIST,
TECHNICIAN, MANAGER, CUSTOMER. The first four are internal staff with
broad access. CUSTOMER is an external user — a contact at a Customer
organization who logs in to view *only their own* samples, reports,
worksheets, etc.

Customer-scope leakage is a hard security boundary: showing customer A's
data to customer B is a serious incident. The enforcement strategy must
be (a) hard to forget when adding a new endpoint, and (b) easy to audit.

## Decision
Centralize customer scope in middleware. Each downstream controller merges
`req.scope` into its `where` clause for list/get queries, and asserts the
resource's `customerID` matches `req.scope.customerID` for single-resource
operations.

### Components

1. **`requireJwtAuth` middleware** populates `req.user` with
   `{ userID, email, role, customerID }` (always re-read from DB).

2. **`applyCustomerScope` middleware** (mounted globally after
   `requireJwtAuth`):
   ```
   if user.role === 'CUSTOMER':
     if !user.customerID → 403 "Customer user has no associated customer"
     req.scope = { customerID: user.customerID }
   else:
     req.scope = {}
   ```

3. **List/Get controllers** spread `req.scope` into their `where`:
   ```js
   const where = { ...defaultFilters, ...req.scope, ... };
   ```

4. **Single-resource access** (`GET /customers/:id`, etc.) validates after
   load:
   ```js
   if (req.scope.customerID && resource.customerID !== req.scope.customerID) {
     throw new ForbiddenError(...)
   }
   ```

5. **Admin-only endpoints** (e.g. `POST /api/users`) gate with
   `requireRole(['ADMIN', 'MANAGER'])` — CUSTOMER is excluded by role,
   not by scope.

### CUSTOMER Visibility Matrix (target state for Modules 2–7)

| Resource type   | CUSTOMER access |
|-----------------|-----------------|
| Customers       | Their own record only |
| Sources         | Filtered by customerID |
| Quotes          | Filtered by customerID |
| Samples         | Filtered by customerID |
| Worksheets      | Filtered by customerID (via Sample) |
| Reports         | Filtered by customerID |
| Master data (Test/Method/Unit/etc.) | Read-only, no scope filter |
| Users           | Self only (admin manages others) |

## Rationale
- **One place to forget**, not fifty. Every new list endpoint that spreads
  `...req.scope` is automatically safe. Endpoints that don't spread it
  stand out in code review.
- The middleware sets `req.scope = {}` for non-CUSTOMER roles, so spreading
  it is a no-op for staff users — no special-casing in controllers.
- `requireJwtAuth` always re-reads role/customerID from DB, so role
  changes take effect immediately (a CUSTOMER promoted to TECHNICIAN
  doesn't have to wait for token expiry).
- The "no customerID for a CUSTOMER user" 403 surfaces a data-integrity
  bug (the Phase 5 user creation flow must enforce that CUSTOMER role
  requires customerID).

## Alternatives Considered
- **Per-controller if-branches.** Rejected: 50+ places to forget the
  check. One missed branch = data leak.
- **Sequelize `defaultScope` keyed off the current user.** Rejected:
  Sequelize scopes don't have native access to request context. Would
  require AsyncLocalStorage or per-request scope rebuild — added
  complexity for marginal gain.
- **Postgres Row-Level Security (RLS).** Rejected for now: the connection
  pool authenticates as a single DB user, so RLS would require setting
  session variables per request and configuring policies on every table.
  Reconsider if/when we move toward per-tenant DBs or strict compliance
  requirements.
- **Separate routers for staff vs customer.** Rejected: doubles the route
  surface area; same business logic with different middleware is wasteful.

## Consequences
- Every new list controller must remember to spread `...req.scope` into
  its `where` clause. PR-review checklist item.
- Every new single-resource controller must call the post-load 403 check
  if the resource has a `customerID` column. Helper function planned.
- The middleware order is load-bearing:
  `requireJwtAuth → applyCustomerScope → route handler`. Wiring this
  globally (in `app.js` after the auth router is mounted) prevents
  per-router bugs.
- Master data endpoints (Tests, Methods, etc.) intentionally do not
  filter by customerID — they're shared catalog data. Code-review check:
  any list endpoint that *should* be customer-scoped must spread
  `req.scope`; any that shouldn't is documented.
