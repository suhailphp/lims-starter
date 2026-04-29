# Module 02 — Authentication & User Management

## Status: ✅ COMPLETE (Backend 2026-04-26; Frontend Users CRUD 2026-04-28)

Module 02 replaced the stub auth (ADR-006, `X-User-ID` header) with
JWT-based sessions, role-based access, and full User CRUD. The stub
middleware file (`requireAuth.js`) has been deleted; ADR-006 is
superseded by ADR-009.

## Purpose
Real credentials, JWT-based sessions, role-based access, customer-scope
enforcement, and the User CRUD endpoints (admin manages users; users
manage their own profile).

---

## Build Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Schema migrations: User auth fields, RefreshTokens table, Users email partial-unique index | ✅ Complete |
| 2 | User model: bcrypt hashing hooks, comparePassword, lockout helpers, scope fix | ✅ Complete |
| 3 | Auth middleware: `requireJwtAuth`, `requireRole`, `applyCustomerScope` (no route changes) | ✅ Complete |
| 4 | Auth endpoints + RefreshToken model + JWT utils | ✅ Complete |
| 5 | User CRUD endpoints (admin + self-service) + `mustChangePassword` flag | ✅ Complete |
| 6 | Stub→JWT cutover: rewire all 10 master-data routes, wire `req.scope` into Customer + Source controllers, migrate all 10 Postman collections to Bearer auth, delete `requireAuth.js` | ✅ Complete |
| 7 | Documentation cleanup: status banners, supersede ADR-006, finalize `api-conventions.md`, update `01-master-data.md` | ✅ Complete |
| 8 | Frontend: Users CRUD page (Admin/Manager-only) | ✅ Complete (2026-04-28) |

---

## Phase 1 — Schema Changes ✅

### Migrations applied (in order)
1. `20260426000000-add-user-auth-fields.js` — adds three columns to Users:
   - `failedLoginAttempts` (INT, default 0)
   - `lockedUntil` (DATE, nullable)
   - `passwordChangedAt` (DATE, nullable) — drives the `iat`-based token revocation
2. `20260426000001-users-email-unique-partial-index.js` — drops both the
   inline `Users_email_key` constraint AND the named `idx_users_email`
   index, replaces with `idx_users_email_unique` partial unique on
   `LOWER(email) WHERE isDeleted = false`. Aligns with the project
   convention used on every other table.
3. `20260426000002-create-refresh-tokens-table.js` — new RefreshTokens
   table:

| Column | Type | Notes |
|--------|------|-------|
| tokenID | UUID PK | UUIDv4 |
| userID | UUID FK → Users | CASCADE on delete |
| tokenHash | VARCHAR(255) | SHA-256 of raw token (raw never stored) |
| expiresAt | TIMESTAMPTZ | indexed |
| revokedAt | TIMESTAMPTZ NULL | set on logout / password change / rotate |
| replacedByTokenID | UUID NULL | rotation-chain audit |
| ipAddress | VARCHAR(45) | IPv6-safe |
| userAgent | VARCHAR(500) |  |
| createdAt | TIMESTAMPTZ |  |

Indexes: `tokenHash` (unique), `userID`, `expiresAt`.

### `.env.example` updated
- Phase 1: DB vars only, JWT vars commented as "Phase 4".
- Phase 3 amendment: JWT vars uncommented (placeholder secret;
  the real value is generated locally with
  `openssl rand -hex 64` and placed in `backend/.env`, never committed).

---

## Phase 2 — User Model ✅

See `backend/src/models/User.js`.

### Hooks
- `beforeCreate` — hashes password if set; sets `passwordChangedAt = now()`
- `beforeUpdate` — hashes only when `user.changed('password')`; sets
  `passwordChangedAt = now()` in the same write

### Instance methods
- `comparePassword(plain)` — async bcrypt compare
- `isLocked()` — `lockedUntil != null && lockedUntil > now`
- `registerFailedLogin()` — increments counter; locks at 5 (15 min)
- `registerSuccessfulLogin()` — clears counter and lock; sets `lastLoginAt`

### Constants (in `User.js`, deliberately not env-driven)
- `BCRYPT_COST = 12`
- `MAX_FAILED_ATTEMPTS = 5`
- `LOCKOUT_MINUTES = 15`

### Scope changes
- Removed broken `withPassword` named scope (only redefined `where`,
  password attribute exclusion still leaked through inheritance).
- Login queries use `User.unscoped()` — single, auditable pattern.

See **ADR-010** for full rationale.

### Verification
`backend/scripts/verify-phase2.js` runs against the real DB. Checks:
hash format `$2b$12$...`, comparePassword (correct/wrong), default scope
excludes password, `unscoped()` includes it, `passwordChangedAt` set
in same UPDATE as the new hash.

---

## Phase 3 — Auth Middleware ✅

Three new middleware files in `backend/src/middleware/`. No existing
routes were modified in Phase 3 — the stub `requireAuth.js` (X-User-ID)
stayed mounted on master-data routers until the Phase 6 cutover, after
which it was deleted.

### `requireJwtAuth.js`
1. Reads `Authorization: Bearer <token>` → 401 if missing/malformed.
2. `jwt.verify(token, JWT_SECRET)` → distinct 401 messages for expired vs
   invalid signatures.
3. Loads user by `payload.sub` (always fresh from DB — never trusts stale
   role/customerID from token).
4. Rejects if `!isActive`.
5. **Token revocation check**: `iat * 1000 < user.passwordChangedAt` →
   401 "Token revoked by password change".
6. Sets `req.user = { userID, email, role, customerID }`.

`JWT_SECRET` is read at request time, not module load — missing env
fails the request, not app startup. Phase 6 cutover sets up the env
guarantee.

### `requireRole(roles)` — factory
Accepts string or array. 401 if no `req.user`, 403 if role not in allowed
list. Error message includes the required roles for debuggability.

### `applyCustomerScope.js`
- Non-CUSTOMER → `req.scope = {}` (no-op for staff users)
- CUSTOMER + customerID → `req.scope = { customerID }`
- CUSTOMER without customerID → 403 (data-integrity invariant)

See **ADR-011** for the full design.

### Verification
`backend/scripts/verify-phase3.js` runs 12 checks against the real DB:
six on `requireJwtAuth` (including the iat-vs-passwordChangedAt revocation
check using the test user's actual `passwordChangedAt` from Phase 2),
three on `requireRole`, three on `applyCustomerScope`.

---

## Phase 4 — Auth Endpoints ✅

### Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/login` | none | email + password → `{ accessToken, refreshToken, user }` |
| POST | `/api/auth/refresh` | none | refresh token → new access + refresh (rotated) |
| POST | `/api/auth/logout` | requireJwtAuth | revoke specified refresh token |
| GET  | `/api/auth/me` | requireJwtAuth | full current-user profile from DB |
| POST | `/api/auth/change-password` | requireJwtAuth | verify current → set new → revoke all refresh tokens |

### Token shapes
- **Access token (JWT)**: `{ sub: userID, iat, exp }`. Algorithm HS256.
  TTL from `JWT_ACCESS_EXPIRES` (default `15m`). No `role` / `customerID`
  in payload — always re-read from DB.
- **Refresh token (opaque)**: 64 hex chars from `crypto.randomBytes(32)`.
  Stored as SHA-256 hash in `RefreshTokens.tokenHash`. TTL from
  `JWT_REFRESH_EXPIRES` (default `7d`).

### Login flow
1. Validate body (`email`, `password`).
2. Load user via `User.unscoped()` by lowercased email; reject with
   generic "Invalid credentials" if missing / deleted / inactive.
3. If `user.isLocked()` → 401 with unlock timestamp.
4. `comparePassword`: false → `registerFailedLogin()` then 401.
5. True → `registerSuccessfulLogin()`, sign access, mint refresh,
   insert RefreshToken row.

### Refresh flow with reuse detection
1. Hash incoming raw token; lookup `RefreshTokens.tokenHash`.
2. Not found → 401.
3. **Already revoked → reuse alarm**: bulk-revoke all of this user's
   refresh tokens; 401 "Refresh token reuse detected".
4. Expired → 401.
5. Issue new pair; mark old `revokedAt = now`,
   `replacedByTokenID = newTokenID`.

### Change-password flow
1. Load user via `User.unscoped().findByPk(req.user.userID)`.
2. Verify current password (no failed-login increment — different threat
   model).
3. Set new password (model hook hashes + bumps `passwordChangedAt`).
4. Bulk-revoke all refresh tokens for this user.
5. 200 — caller must re-login. Active access tokens self-invalidate via
   `iat < passwordChangedAt` on next request.

### Logout
- Body: `{ refreshToken }`. Revokes the specified token (scoped to
  `req.user.userID` — can't log other users out).
- No `logout-all` endpoint in Phase 4 (deferred until needed).

### Validation rules
- Password: min 8, max 128, ≥1 letter + ≥1 digit (per project decisions).
- Login uses `password.min(1)` — let bad legacy passwords still attempt
  login; the rule applies on creation/change.

### Files added in Phase 4
```
backend/
├── app.js                                  EDIT (mount /api/auth)
├── package.json                            EDIT (+supertest devDep)
├── scripts/verify-phase4.js                NEW
└── src/
    ├── models/
    │   ├── RefreshToken.js                 NEW
    │   └── User.js                         EDIT (+hasMany RefreshToken)
    ├── utils/jwt.js                        NEW
    └── modules/auth/
        ├── auth.controller.js              NEW
        ├── auth.routes.js                  NEW
        └── auth.validation.js              NEW
docs/postman/Auth.postman_collection.json   NEW
```

### Verification
`backend/scripts/verify-phase4.js` runs **26 checks** end-to-end against
the live Express app via `supertest` and a real DB connection. All pass:

- **login** (3): bad password → 401, counter increments, success returns
  tokens + user (without password)
- **/me** (3): with token, without token, password not exposed
- **refresh** (5): rotation issues new pair, old marked
  `revokedAt + replacedByTokenID`, expired token rejected, no user
  payload (P4-Q4 confirmed)
- **reuse detection** (2): replaying revoked token → 401, entire chain
  bulk-revoked
- **logout** (2): 204 response, refresh-after-logout rejected
- **lockout** (4): 5th bad attempt locks, `failedLoginAttempts === 5`,
  `lockedUntil > now`, locked account responds with unlock-timestamp
  message (P4-Q5 confirmed)
- **change-password** (6): wrong current → 401, weak new → 422,
  success → 200, all old refresh tokens revoked, old password rejected,
  new password accepted

Side-effects of running verify: admin password is restored to `Admin123`,
revoked RefreshToken rows are kept (chain audit), no temp users left
behind.

---

## Phase 5 — User CRUD ✅

### Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/users` | ADMIN, MANAGER | Paginated list. Filters: `role`, `isActive`, `customerID`, `search` (firstName/lastName/email iLike). |
| POST | `/api/users` | ADMIN | Create user. Controller forces `mustChangePassword=true`. |
| GET | `/api/users/:userID` | ADMIN, MANAGER, or self | Single user. |
| PUT | `/api/users/:userID` | ADMIN, or self (firstName/lastName only) | Update. |
| DELETE | `/api/users/:userID` | ADMIN | Soft delete. Cannot delete self. Revokes all of target's refresh tokens. |
| POST | `/api/users/:userID/reset-password` | ADMIN | Body `{ newPassword? }`. Admin-typed if present, server-generated 12-char if absent. Sets `mustChangePassword=true`, revokes target's refresh tokens. |

Password is **never** updateable via PUT — must go through
`POST /api/auth/change-password` (self) or
`POST /api/users/:id/reset-password` (admin).

### Authorization placement

- **Role gating** lives in `user.routes.js` via `requireRole(...)` for
  list / create / delete / reset-password.
- **Admin-or-self** lives in the controller for `getOne` and `update` —
  the role check runs **before** the DB lookup, so a non-staff user
  trying to access another userID gets a 403 instead of leaking
  existence via 404 vs 403 timing.
- **Self field allowlist** lives in the controller (`update`): non-admin
  PUT body is rejected with 403 if any key is outside
  `['firstName', 'lastName']`. Email + role + customerID + isActive are
  admin-only (P5-Q3).
- **Self-delete** is explicitly forbidden in the controller (extra check
  on top of `requireRole('ADMIN')`).

### `mustChangePassword` lifecycle

| Trigger | Value |
|---------|-------|
| `POST /api/users` (admin creates user) | set to `true` |
| `POST /api/auth/change-password` (user changes own) | set to `false` |
| `POST /api/users/:id/reset-password` (admin force-reset) | set to `true` |
| Login response | included as `data.user.mustChangePassword` |

The flag is informational in Phase 5 — the frontend reads it to redirect
to a "set new password" screen. A future hardening task (tracked under
ADR-008) will add middleware that blocks all non-`/auth/change-password`
requests when this flag is `true`.

### Reset-password dual mode

- Body **with** `newPassword` (validated against the password rule):
  admin-typed. The provided value is hashed and stored; the response
  echoes it back once for the admin to relay out-of-band.
- Body **without** `newPassword` (or `{}`): server generates a 12-char
  alphanumeric password (excludes ambiguous chars `0OoIl1`) with a
  forced trailing letter+digit to satisfy the password rule
  deterministically.

In both modes: target's `failedLoginAttempts` and `lockedUntil` are
cleared, and all of their non-revoked refresh tokens get
`revokedAt = now`. Active access tokens self-invalidate via the
`iat`-vs-`passwordChangedAt` check in `requireJwtAuth` (the bcrypt
hook bumps `passwordChangedAt` whenever password changes).

### Files added in Phase 5
```
backend/
├── app.js                                                              EDIT (mount /api/users)
├── scripts/verify-phase5.js                                            NEW
└── src/
    ├── middleware/requireJwtAuth.js                                    EDIT (iat/passwordChangedAt fix — see below)
    ├── migrations/20260426000003-add-user-must-change-password.js      NEW
    ├── models/User.js                                                  EDIT (+mustChangePassword, +applyAuditHooks)
    ├── modules/auth/auth.controller.js                                 EDIT (login response includes flag; change-password clears it)
    └── modules/user/                                                   NEW
        ├── user.controller.js
        ├── user.routes.js
        └── user.validation.js
docs/postman/User.postman_collection.json                               NEW
```

### Bug fix in `requireJwtAuth` (caught by Phase 5)

JWT `iat` is whole-second precision; `passwordChangedAt` is millisecond
precision. When a password change and a fresh login happened in the
same second, `iat * 1000 < passwordChangedAt.getTime()` evaluated true
and the freshly-issued token was wrongly revoked.

Phase 4 verify happened to have ~1 second of intervening activity (bad
login + counter reset + good login) that masked this; Phase 5's first
post-`ensureClean()` action is an immediate admin login, which exposed
it. **Fix:** compare both at second granularity.

```js
const passwordChangedAtSec = Math.floor(user.passwordChangedAt.getTime() / 1000);
if ((payload.iat || 0) < passwordChangedAtSec) {
  return next(new UnauthorizedError('Token revoked by password change'));
}
```

Phase 3 verify (12 checks) and Phase 4 verify (26 checks) both
re-confirmed green after the change — the revocation semantic is
unchanged at second granularity, only the false-positive within the
same second is removed.

### Verification — 36 checks against real `lims_db`, all PASS

Coverage:
- **create** (4): admin → 201, mustChangePassword=true, password not in
  response, createdBy populated by audit hook
- **create role/customerID consistency** (2): CUSTOMER without
  customerID → 422; non-CUSTOMER with customerID → 422
- **list** (3): admin → 200, includes new user, paging meta present
- **getOne** (3): admin → 200; non-staff viewing other → 403; self → 200
- **list authorization** (1): TECHNICIAN → 403
- **self-update** (3): firstName allowed; role rejected; email rejected
  (Q3)
- **delete** (3): non-admin → 403; admin self-delete → 403; admin
  delete → 204 with isDeleted/deletedBy/deletedAt populated
- **default scope** (1): deleted user not returned by `findByPk`
- **mustChangePassword lifecycle** (4): true on create; true in login
  response; cleared by self change-password; true again after reset
- **reset-password** (5): server-generated returns 12-char tempPassword,
  admin-typed accepted, weak admin-typed → 422, refresh tokens revoked,
  user can log in with the new password
- **update** (3): admin updates role; updatedBy populated; admin
  setting role=CUSTOMER without customerID → 422

Side-effects of running verify: admin password restored to `Admin123`;
temp user `phase5-temp@test.local` is hard-deleted at end of run; some
revoked RefreshToken rows for admin remain (rotation/test trail).

---

## Phase 6 — Stub→JWT Cutover ✅

Single unified phase: replaced the `X-User-ID` stub with real JWT auth
across every master-data router, wired `req.scope` into the two
controllers that hadn't yet enforced it, migrated every Postman
collection to Bearer auth, and deleted the stub middleware file. No
controllers were left on the old contract.

### Router swaps (10 files)

`requireAuth` → `requireJwtAuth` in:

```
backend/src/modules/{category,customer,equipment,method,ocmElement,
  source,sourceType,specification,test,unit}/*.routes.js
```

Customer and Source routers additionally mount `applyCustomerScope`
after `requireJwtAuth` (parent + nested). The other eight modules don't
own a `customerID` column, so scope-enforcement isn't meaningful for
them — auth is enough.

### Customer + Source scope wiring

Without scope enforcement here, the JWT cutover would have *widened*
CUSTOMER access (any logged-in CUSTOMER could have hit any customer's
data). The two controllers now share a small helper:

```js
function ensureScopeMatches(req, customerID) {
  if (req.scope?.customerID && req.scope.customerID !== customerID) {
    throw new ForbiddenError('Access denied: customer scope mismatch');
  }
}
```

**Customer controller**:
- `list` → `where = { ...(req.scope || {}) }` — Customer's PK column
  *is* `customerID`, so the spread filters CUSTOMER list responses to
  self with no special-casing
- `getOne` → `ensureScopeMatches(req, params.customerID)` **before**
  the DB lookup (avoids 404-vs-403 existence leak)
- `create` → 403 if `req.user.role === 'CUSTOMER'` (CUSTOMER cannot
  create customers at all)
- `update` / `softDelete` → `ensureScopeMatches` before lookup

**Source controller** (URLs sometimes contain customerID directly,
sometimes only sourceID):
- `list` → scope-check + `where = { ...(req.scope || {}), customerID }`
- `create` → scope-check on URL `customerID` before insert
- `getOne` / `update` / `softDelete` → `findByPk` first, then
  `ensureScopeMatches(req, source.customerID)` (URL has only
  `sourceID`, so we need the row to know which customer it belongs to)

### Postman migration

`scripts/migrate-postman-to-jwt.js` is an idempotent one-shot script
that rewrote all 10 collections (Category, Customer, Equipment, Method,
OcmElement, Source, SourceType, Specification, Test, Unit):

- replaced collection variables: drop `userId`, add `adminEmail`,
  `adminPassword`, `accessToken`
- replaced the prerequest script with a Bearer-attaching version that
  skips `/auth/login`
- inserted "Login as admin (seeds {{accessToken}})" as the first item
  in every collection
- walked every `script.exec` array and rewrote stale audit-field
  assertions (`pm.expect(...).to.eql(pm.variables.get('userId'))` →
  `pm.expect(...).to.be.a('string')`) and stale variable lookups
- updated `info.description` to swap the ADR-006 wording for
  ADR-009 / "Run \"Login as admin\" first"

The script itself is preserved at `scripts/migrate-postman-to-jwt.js`
for historical reference (running it again is a no-op because of the
markers it checks).

### `requireAuth.js` deleted

`backend/src/middleware/requireAuth.js` was removed entirely after the
last router swap. Nothing else in the codebase imports it.

### ADR-006 superseded

`docs/decisions/ADR-006-stub-auth.md` now opens with **Status:
Superseded by ADR-009 (2026-04-26)** and explicitly forbids
reintroducing header-based auth.

### Verification — `backend/scripts/verify-phase6.js`

21 supertest checks against the real backend, all PASS:

- **JWT cutover** (6): missing `Authorization` → 401, X-User-ID stub
  alone → 401, bad Bearer → 401, valid admin Bearer → 200 on
  `/api/categories`, `/api/equipments`, `/api/source-types`
- **Setup** (1): admin POST creates a Source under Customer A
- **Customer scope** (7): ADMIN list returns both customers; CUSTOMER
  list returns own only; CUSTOMER GET own → 200; CUSTOMER GET other →
  403; CUSTOMER create → 403; CUSTOMER PUT other → 403; CUSTOMER DELETE
  other → 403
- **Source scope** (7): CUSTOMER list own → only own rows; CUSTOMER
  list other customer's sources → 403; CUSTOMER POST under other → 403;
  CUSTOMER GET own source → 200; CUSTOMER GET other source → 403;
  CUSTOMER PUT other source → 403; CUSTOMER DELETE other source → 403

Phase 4 verify (26 checks) and Phase 5 verify (36 checks) re-ran green
after the cutover — no regressions.

`ensureClean()` hard-deletes the Phase-6 fixture rows (Customers
"Phase6 Customer A/B", SourceType "Phase6 ST", Category "Phase6 Cat",
the CUSTOMER-role test user) in proper FK order so the script is
idempotent.

---

## Phase 7 — Documentation Cleanup ✅

Mechanical doc finalization, no code changes:

- `CLAUDE.md` — Module 02 marked ✅, "Current Module" cleared
- This file — status banner, build-phases table, Phase 6 + Phase 7
  sections rewritten in place
- `docs/architecture/api-conventions.md` — removed the "two auth modes
  side-by-side" paragraph; the JWT section is the only auth section now;
  nested-route note references `requireJwtAuth`
- `docs/modules/01-master-data.md` — stub-auth checklist line replaced
  with a JWT pointer to this module; Customer API "X-User-ID" sentence
  switched to Bearer; User CRUD line points to Phase 5 here
- `docs/decisions/ADR-009-jwt-strategy.md` — status header drops the
  "once Phase 6 cutover lands" qualifier
- `docs/decisions/ADR-008-deferred-security-hardening.md` — JWT-cutover
  checklist item ticked

---

## Phase 8 — Frontend Users CRUD ✅ (2026-04-28)

The Users page (`/users`, Administration sidebar entry) replaces a placeholder
component and surfaces the Phase-5 endpoints to ADMIN and MANAGER users. It
reuses the master-data template wholesale (`docs/patterns/master-data-page.md`)
plus three patterns specific to user management.

### Files added

```
backend/src/modules/user/user.controller.js   EDIT (Customer include in list + getOne)
frontend/src/types/auth.ts                    EDIT (UserRole expanded to 5 values)
frontend/src/types/user.ts                    NEW
frontend/src/api/users.ts                     NEW
frontend/src/features/users/
  userSchema.ts                               NEW (create + update + reset zod)
  usersQueries.ts                             NEW (CRUD + reset + toggle hooks)
  RoleBadge.tsx                               NEW (color pill per role)
  UserTable.tsx                               NEW (role badge + lockout pill + self-row gate)
  UserViewDialog.tsx                          NEW (lockout banner + mustChangePassword note)
  UserFormDialog.tsx                          NEW (conditional customerID FK, password on create only)
  UserDeleteDialog.tsx                        NEW
  UserResetPasswordDialog.tsx                 NEW (two-step: form → reveal)
frontend/src/pages/UsersPage.tsx              REWRITE (was placeholder)
```

### Backend touch

`user.controller.js` `list` and `getOne` now `include` the Customer
association so the table can show "Customer" without an N+1. `required:
false` is **mandatory** here — Customer's `defaultScope` (`isDeleted=false`)
flips the include into an INNER JOIN and would silently drop every staff
row that has `customerID = NULL`. Caught during smoke testing on
2026-04-28; the rule is now documented in CLAUDE.md.

### Reset-password modal flow

1. Admin opens "Reset Password" from the row action menu.
2. Form step:
   - Radio: **Generate temporary password** (default) | **Type a password**.
   - Typed mode reveals New + Confirm with show/hide toggle, validated by
     the same Zod password rule as POST `/api/users`.
3. Submit → `POST /api/users/:id/reset-password` (body `{}` for generate,
   `{ newPassword }` for typed).
4. Backend returns the temp password in the envelope `data.tempPassword`.
5. Modal swaps to a **result panel** that reveals the password once with
   a copy-to-clipboard button and a warning ("won't be shown again"). No
   success toast — the panel IS the feedback.
6. User clicks Done; modal closes.

If the admin closes the modal before copying, they must re-reset (no
re-fetch path — the password is one-shot).

### Self-row gating (UI)

The current user's own row hides Edit / Activate / Reset Password / Delete
in the action menu and shows a subtle "You" placeholder. The View dialog
hides Edit + Delete on the same row. Backend remains the source of truth
(self-delete returns 403 regardless), this is just removing the
foot-gun from the UI.

### `UserRole` type expansion

`frontend/src/types/auth.ts` previously declared 4 roles (the ones the
auth flow had used). Phase 8 expands it to all 5 (`ADMIN`, `MANAGER`,
`TECHNICIAN`, `RECEPTIONIST`, `CUSTOMER`) since the Users page exposes
the full backend enum. No other auth call-sites needed updates.

### Verification
- Backend: live API smoke (login, list with Customer include, create
  TECHNICIAN, reset-password generate, reset-password typed, update role,
  soft-delete) all green at 200/201/204 with shapes matching the
  Postman collection.
- Frontend: `tsc --noEmit` passes; Vite serves `/users`.

## Related ADRs
- **ADR-006** — stub auth (superseded by ADR-009 on 2026-04-26)
- **ADR-007** — validation library (Zod)
- **ADR-008** — deferred security hardening (rate limiting, CSP, etc.)
- **ADR-009** — JWT strategy (this module)
- **ADR-010** — password hashing (Phase 2 pattern)
- **ADR-011** — customer scope enforcement (Phase 3 middleware,
  applied to Customer + Source in Phase 6)
