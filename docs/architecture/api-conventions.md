# API Conventions

## Base URL
Development: http://localhost:3033/api
Production:  https://api.lims.yourdomain.com/api

---

## REST Naming Pattern

### Resource Naming
- Plural nouns for collections
- Lowercase with hyphens for multi-word
GET    /api/customers
GET    /api/source-types
GET    /api/ocm-elements

### Standard Endpoints per Resource

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/customers` | List all (with pagination) |
| GET | `/api/customers/:id` | Get single by ID |
| POST | `/api/customers` | Create new |
| PUT | `/api/customers/:id` | Update existing (full) |
| PATCH | `/api/customers/:id` | Update existing (partial) — **optional, not default**. Add per-resource only when partial update is justified. |
| DELETE | `/api/customers/:id` | Soft delete |

### Nested Route Standard (Project-Wide)

Child resources are exposed via nested routes under their parent. Individual
operations on a child are kept flat to avoid deep double-param URLs.

#### Rules
| Operation | Route form | Example |
|-----------|-----------|---------|
| List children | Nested under parent | `GET /api/categories/:categoryID/units` |
| Create child | Nested under parent | `POST /api/categories/:categoryID/units` |
| Get single | Flat | `GET /api/units/:unitID` |
| Update | Flat | `PUT /api/units/:unitID` |
| Delete | Flat | `DELETE /api/units/:unitID` |

- In nested-route context, parent IDs always come from the **URL**, never from
  the query string.
- Flat-route master-data list endpoints (the dual-shape exception below) DO
  accept `?<parentID>=...` as a filter — that's how `/api/units?categoryID=...`
  scopes a global view to one category. Nested routes still own the
  parent-anchored shape.
- Avoid triple-nesting (`/a/:id/b/:id/c`). If a resource has two parents, use the closest.

#### Coverage (as built)

| Parent | Nested child endpoints |
|--------|----------------------|
| Category | `/api/categories/:categoryID/units` (GET, POST) ← **also flat at `/api/units`** (dual-shape) |
| Category | `/api/categories/:categoryID/tests` (GET, POST) ← **also flat at `/api/tests`** (dual-shape) |
| Test | `/api/tests/:testID/methods` (GET, POST) ← **also flat at `/api/methods`** (dual-shape) |
| Customer | `/api/customers/:customerID/users` _(planned)_ |
| Customer | `/api/customers/:customerID/sources` (GET, POST) ← **also flat at `/api/sources`** (dual-shape) |

#### Dual-shape exception (added 2026-04-27)

Some resources need BOTH a nested route (parent-scoped workflow) AND a flat
route (master-data global view). As of 2026-04-27 four resources ship both
shapes:

| Resource | Nested (parent-scoped) | Flat (master-data view) |
|----------|------------------------|-------------------------|
| Source   | `GET/POST /api/customers/:customerID/sources` | `GET/POST /api/sources` |
| Unit     | `GET/POST /api/categories/:categoryID/units`  | `GET/POST /api/units`   |
| Test     | `GET/POST /api/categories/:categoryID/tests`  | `GET/POST /api/tests`   |
| Method   | `GET/POST /api/tests/:testID/methods`         | `GET/POST /api/methods` |

The nested form is used by parent-anchored UIs (Customer profile, Sample
Intake, future Category-detail / Test-detail pages). The flat form is used
by the master-data pages where lab admins manage rows across all parents.

When to add a flat sibling:
1. The resource is part of master-data oversight (admin views all rows).
2. The list view needs FK names rendered — flat endpoint includes them via
   Sequelize `include` so the frontend doesn't fan out N lookups.
3. Demand is real, not speculative — don't pre-build flat siblings.

Implementation rules when both shapes ship:
- Both shapes share the same controller module + validation file.
- Flat list controller (`listAll`) uses `include` for FK associations; nested
  list (`list`) does not (FKs are implicit or unnecessary in that context).
- Flat create has its own Zod schema (`<entity>CreateAllSchema`) that adds
  the parent ID to the body; nested create's schema omits it (URL-driven).
- `applyCustomerScope` middleware applies to BOTH shapes so CUSTOMER role
  scoping is uniform.
- `ensureScopeMatches(req, parentID)` runs on flat create against the body's
  parent ID and on nested create against the URL's.
- Single-record GET / PUT / DELETE remain flat-only (per nested-route standard).

#### Implementation notes
- Nested router uses `mergeParams: true` so the parent `:categoryID` param is
  accessible inside the child handler via `req.validated.params`.
- The parent router mounts the nested router via `router.use('/:parentID/children', nestedRouter)`.
- `requireJwtAuth` (and `applyCustomerScope`) is applied in both the parent
  router and the nested router for defence-in-depth (the double lookup is
  harmless at this scale).

---

## Request Format

### Headers
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>

### Body (POST/PUT/PATCH)
```json
{
  "name": "Diesel",
  "type": "FUEL",
  "isActive": true
}
```

---

## Response Format

### Success — Single Resource
```json
{
  "success": true,
  "data": {
    "categoryID": "uuid-here",
    "name": "Diesel",
    "type": "FUEL"
  }
}
```

### Success — List with Pagination
```json
{
  "success": true,
  "data": [
    { "categoryID": "...", "name": "Diesel" },
    { "categoryID": "...", "name": "Gasoil" }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

### Success — Create/Update
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": { "categoryID": "...", "name": "Diesel" }
}
```

### Error
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "Name is required" }
  ]
}
```

---

## Parent Deletion Policy

Soft-deleting a parent record is **blocked with 409 Conflict** if any
non-deleted child record still references it. Applies to every parent
table in master data and downstream modules.

### Response Shape
```json
{
  "success": false,
  "message": "Cannot delete <resource> with active references",
  "errors": [
    { "field": "users", "message": "3 active user(s) reference this customer" },
    { "field": "sources", "message": "2 active source(s) reference this customer" }
  ]
}
```

### Implementation
Each parent's `softDelete` controller counts non-deleted children across
every direct `hasMany` association (default scope already filters
`isDeleted = false`). If any count is > 0, throw `ConflictError` with a
field-per-relation `errors` array. Caller must reassign or soft-delete
the children first.

### Coverage
| Parent | Child relations checked |
|---|---|
| Customer | Users, Sources |
| Category | Units, Tests, Sources |
| (extend per table as built) | |

### Why
- Prevents orphan-like state (deleted parent, live children referencing it)
- Forces explicit lifecycle management
- Aligns with `onDelete: RESTRICT` FK rule (we soft-delete, but the same constraint applies in spirit)

### Future Override
A future Super Admin role may add `?force=true` for cascading or override.
Not in scope for the current modules. Will get its own ADR.

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Missing/invalid JWT |
| 403 | Forbidden | Authenticated but no permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate (e.g. email exists) |
| 422 | Unprocessable Entity | Validation error |
| 500 | Server Error | Uncaught error |

---

## Pagination

### Query Parameters
GET /api/customers?page=1&limit=20

### Defaults
- `page`: 1
- `limit`: 20
- `maxLimit`: 100

---

## Filtering

### Query Parameters
GET /api/tests?categoryID=uuid-here
GET /api/customers?search=petroleum
GET /api/users?role=TECHNICIAN&isActive=true

---

## Sorting

### Query Parameters
GET /api/customers?sort=name&order=asc
GET /api/worksheets?sort=createdAt&order=desc

### Defaults
- `sort`: createdAt
- `order`: desc

### Sort Allowlist
Each resource declares an explicit allowlist of sortable fields in its
validation schema. Requests for fields not on the allowlist return 422.
This prevents arbitrary column sorting (perf + security).

---

## Authentication

LIMS uses **JWT exclusively** (Module 02 / ADR-009). The legacy
`X-User-ID` stub (ADR-006) was removed in Module 02 Phase 6 (2026-04-26)
along with the `requireAuth.js` middleware file. Every protected route —
auth, users, and all 10 master-data routers — uses `requireJwtAuth` plus
`applyCustomerScope`.

Controllers read `req.user = { userID, email, role, customerID }` and,
where relevant, `req.scope = { customerID }` (CUSTOMER role) or `{}`
(staff roles).

### JWT


See **ADR-009** for the full strategy. Summary:

- **Algorithm**: HS256 (symmetric, single secret)
- **Access token**: signed JWT, payload `{ sub, iat, exp }` only,
  TTL **15 min** (`JWT_ACCESS_EXPIRES`)
- **Refresh token**: opaque random 64-char hex string, DB-stored as
  SHA-256 hash, TTL **7 days** (`JWT_REFRESH_EXPIRES`); rotated on every
  refresh; reuse triggers chain-revocation
- **Header**: `Authorization: Bearer <accessToken>` on every protected
  request
- **`req.user`** is always re-read from DB on each request — role and
  customerID changes propagate immediately, no waiting for token expiry
- **Token revocation on password change**: `requireJwtAuth` rejects any
  access token where `iat < floor(user.passwordChangedAt / 1000)`.
  Comparison is at second granularity to avoid same-second false
  positives.

### Login

```
POST /api/auth/login
Body: { "email": "...", "password": "..." }
```

Response (200):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "<64 hex chars>",
    "expiresIn": 900,
    "user": {
      "userID": "...",
      "email": "...",
      "firstName": "...",
      "lastName": "...",
      "role": "...",
      "customerID": "... or null",
      "mustChangePassword": false
    }
  }
}
```

### Refresh, Logout, /me, Change-password

Specs in `/docs/modules/02-auth.md`. Refresh returns tokens only
(no user payload); logout requires the refresh token in the body and
returns 204; change-password sets `mustChangePassword=false` and
bulk-revokes the user's refresh tokens.

### Login Lockout

Five consecutive failed logins → account locked for 15 minutes.
Login response on a locked account is `401` with message
`Account locked until <ISO-8601 timestamp>`. Lockout blocks **new
logins only** — already-issued access tokens stay valid until expiry.

---

## Authorization (Role-Based)

Routes protected by role middleware:
ADMIN         → Full access
MANAGER       → Approve worksheets, view reports
TECHNICIAN    → Enter results
RECEPTIONIST  → Create worksheets, manage customers
CUSTOMER      → View own reports only

### `requireRole(role | [roles])`

Factory middleware. Returns 401 if not authenticated, 403 if
authenticated but role not in the allowed list. Mount **after**
`requireJwtAuth` in the route stack.

```js
router.post(
  '/users',
  requireRole('ADMIN'),
  validate({ body: userCreateSchema }),
  controller.create,
);
```

### Customer Scope (`applyCustomerScope`)

Centralizes the CUSTOMER-role data boundary. After `requireJwtAuth`,
this middleware sets `req.scope`:

- non-CUSTOMER → `req.scope = {}` (no-op for staff)
- CUSTOMER → `req.scope = { customerID: req.user.customerID }`
- CUSTOMER without a customerID → 403 (data integrity invariant)

List/Get controllers spread `...req.scope` into their `where` clause.
Single-resource controllers compare `req.scope.customerID` against the
loaded resource's `customerID` and 403 on mismatch. See **ADR-011**.

### Admin-or-Self Pattern

Used on `/api/users/:userID` (and reusable for any future per-user
resource). Implemented in the controller, not middleware, because the
allowed-fields rule for self differs from the allowed-fields rule for
admin:

```js
const isAdmin = req.user.role === 'ADMIN';
const isSelf = req.user.userID === req.params.userID;
if (!isAdmin && !isSelf) throw new ForbiddenError(...);

// ...later, if writing:
if (!isAdmin) {
  for (const key of Object.keys(body)) {
    if (!SELF_ALLOWED_UPDATE_FIELDS.includes(key)) {
      throw new ForbiddenError(`Field '${key}' cannot be updated by self`);
    }
  }
}
```

The role check runs **before** the DB lookup, so a non-staff user who
tries another userID gets 403 instead of leaking the resource's
existence via 404-vs-403 timing.

### Special Account Flags

| Field | Set when | Cleared when |
|---|---|---|
| `User.mustChangePassword` | Admin creates user; admin runs reset-password | User changes own password via `/api/auth/change-password` |
| `User.lockedUntil` | 5 consecutive failed logins | Admin runs reset-password; successful login after the timestamp |

`mustChangePassword` is **informational** in the current build —
returned in login response so the frontend can redirect to a "set new
password" screen. A future task (tracked under ADR-008) will add
middleware that blocks all non-`/auth/change-password` requests while
the flag is set.

---

## Request Validation

Every POST/PUT/PATCH endpoint validates:
- Required fields present
- Data types correct
- String lengths within limits
- Enum values valid
- Email format valid
- UUID format valid

Returns 422 with detailed errors if validation fails.

---

## Audit Logging

Every write operation (POST/PUT/PATCH/DELETE) automatically logs to AuditLog:
- Action (CREATE/UPDATE/DELETE)
- Table name
- Record ID
- User ID (from JWT)
- Before/after values (JSON)
- IP address + User agent
- Timestamp

---

## Rate Limiting

Rate limiting is **not yet implemented** — tracked under ADR-008
(deferred security hardening). Targets when added:

- Public endpoints: 100 req/min per IP
- Authenticated endpoints: 1000 req/min per user
- Login endpoint: per-IP throttle (in addition to the per-account
  lockout below)

Today, `/api/auth/login` is protected by **per-account lockout** rather
than rate limiting: 5 consecutive failed logins for a single email lock
that account for 15 minutes (see "Login Lockout" above). This is a
brute-force defense, not an abuse defense — distributed attacks across
many emails are not yet mitigated.

---

## Error Handling

### Validation Errors (422)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" },
    { "field": "name", "message": "Name is required" }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Customer not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "requestId": "uuid-for-log-lookup"
}
```

Every request is tagged with `req.id` (UUIDv4). The `requestId` field is
included on 500 responses so operators can grep server logs for the same
ID. Production never exposes stack traces. Development mode includes a
`debug` object with `message` and `stack` for local triage.

### Auth-specific Errors (Module 02)

| Status | Trigger | Message |
|---|---|---|
| 401 | Missing/malformed Authorization header | `Missing Authorization header` / `Authorization header must be Bearer <token>` |
| 401 | Bad signature | `Invalid access token` |
| 401 | Expired access token | `Access token expired` |
| 401 | Token issued before last password change | `Token revoked by password change` |
| 401 | Login with bad credentials OR unknown email OR inactive/deleted user | `Invalid credentials` (deliberately ambiguous to avoid email enumeration) |
| 401 | Login on locked account | `Account locked until <ISO-8601>` |
| 401 | Refresh: revoked token replayed | `Refresh token reuse detected. All sessions revoked.` |
| 401 | Refresh: token expired | `Refresh token expired` |
| 401 | Refresh: unknown token | `Invalid refresh token` |
| 403 | Authenticated but role not allowed | `Requires role: <ROLES>` |
| 403 | CUSTOMER user has no customerID | `Customer user has no associated customer` |
| 403 | Self trying to update an admin-only field | `Field '<name>' cannot be updated by self` |
| 403 | Trying to delete own user account | `Cannot delete your own user` |

---

## File Uploads

### Photo Upload (for worksheets)
POST /api/worksheets/:id/photo
Content-Type: multipart/form-data
Field: photo
Max size: 5 MB
Allowed types: image/jpeg, image/png

### Report Download
GET /api/reports/:id/download
Response: application/pdf stream

---

## API Versioning

Currently v1 is implicit (`/api/`).

Future versioning pattern:
/api/v1/customers   ← current (implicit)
/api/v2/customers   ← future breaking changes