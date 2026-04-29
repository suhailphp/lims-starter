# ADR-010 — Password Hashing

## Status: Accepted

## Context
Module 02 (Auth & User Management) replaces the stub auth (ADR-006) with
real credentials. Passwords must be hashed at rest. The choice of algorithm
and cost factor shapes both security posture and login latency for years —
worth a deliberate decision rather than a default.

## Decision
Adopt **bcrypt** with **cost factor 12** for all User passwords.

### Implementation
- Library: `bcrypt` (native node-gyp build), not `bcryptjs`. Native is
  ~3x faster, important when cost factor is already at 12.
- Cost factor: `BCRYPT_COST = 12` defined as a constant in
  `backend/src/models/User.js`. Not configurable via env — changing the
  cost factor is a deliberate decision, not deployment configuration.
- Hashing happens in Sequelize hooks on the User model:
  - `beforeCreate` — hash unconditionally if `password` is set
  - `beforeUpdate` — hash only when `user.changed('password')`, then set
    `passwordChangedAt = new Date()` in the same write
- Plaintext password verification uses the
  `User.prototype.comparePassword(plain)` instance method.
- The User model's `defaultScope` excludes the `password` attribute. Login
  queries must use `User.unscoped()` to retrieve the hash.

### Failed Login Lockout
- `MAX_FAILED_ATTEMPTS = 5`, `LOCKOUT_MINUTES = 15` — defined alongside
  `BCRYPT_COST` in `User.js`.
- `User.prototype.registerFailedLogin()` increments the counter; on the
  fifth failure, sets `lockedUntil = now + 15 min`.
- `User.prototype.registerSuccessfulLogin()` resets the counter, clears
  `lockedUntil`, sets `lastLoginAt`.
- Lockout blocks **new login attempts only**. Already-issued JWT access
  tokens remain valid until expiry — lockout is a brute-force defense, not
  a session kill switch.

### Token Invalidation on Password Change
- `passwordChangedAt` (DATE, nullable) added to Users in
  migration `20260426000000-add-user-auth-fields.js`.
- `requireJwtAuth` rejects any access token whose `iat` claim is earlier
  than `user.passwordChangedAt` (see ADR-009 / Phase 4).
- The `change-password` endpoint additionally bulk-revokes all of the
  user's refresh tokens.

## Rationale
- bcrypt has ~30 years of cryptanalytic scrutiny. argon2id is modern but
  adds a native dependency with less Node.js operational track record.
- Cost factor 12 yields ~250 ms per hash on typical 2026 server hardware:
  high enough to make offline brute-force impractical, low enough that
  users don't perceive login latency.
- Cost factor 10 was the long-running default; 2023+ guidance is 12+.
  14 is overkill and starts to noticeably slow logins.
- `passwordChangedAt` + `iat` comparison is the canonical pattern for
  invalidating active access tokens without a per-request blacklist read.

## Alternatives Considered
- **argon2id** — current OWASP "preferred" choice. Rejected for now:
  bcrypt's longer track record outweighs the marginal security improvement
  for this application's threat model. Migration path (re-hash on next
  login) is straightforward if needed later.
- **scrypt** — fewer libraries, less ecosystem support than bcrypt.
- **Per-request access-token blacklist** — would let logout invalidate
  immediately, but adds a DB round-trip on every authenticated request.
  Rejected: 15-min access TTL is the mitigation.

## Consequences
- `bcrypt` runtime dependency on backend (added Phase 2).
- Login latency floor of ~250 ms (one bcrypt compare). Acceptable.
- Cost factor upgrades require a code change + redeploy. Existing user
  hashes can be re-hashed on next successful login (cheap migration).
- `User.unscoped()` is the only way to load a password hash — easy to
  audit (one grep) for any unintended hash exposure.
