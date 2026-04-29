# ADR-009 — JWT Authentication Strategy

## Status: Accepted — supersedes ADR-006 (Phase 6 cutover landed 2026-04-26)

## Context
Module 02 replaces the stub auth (ADR-006) with real, persistent
authentication. The choices below lock the JWT pattern for the rest of
the LIMS project — every protected route follows this contract.

The strategy needs to balance: clean revocation on logout / password
change, low per-request cost, simple frontend flow (token in
`Authorization` header), and a token-theft response that's stronger than
"hope the attacker logs out before the legitimate user does."

## Decision

### Tokens
- **Access token**: signed JWT, **HS256**, **15 min TTL**
  (`JWT_ACCESS_EXPIRES`). Payload: `{ sub: userID, iat, exp }` only — no
  role, no customerID, no email.
- **Refresh token**: opaque random string (32 bytes hex, 64 chars),
  **7 day TTL** (`JWT_REFRESH_EXPIRES`). Stored in DB as a SHA-256 hash;
  the raw value is returned to the client once on issuance.

### Lifecycle
- **Login** issues both tokens. Refresh token written as a
  `RefreshTokens` row with `userID`, `tokenHash`, `expiresAt`, `ipAddress`,
  `userAgent`.
- **Refresh rotation**: every successful `/refresh` issues a new pair AND
  revokes the old refresh token (`revokedAt = now`,
  `replacedByTokenID = newTokenID`).
- **Reuse detection**: if a refresh token arrives at `/refresh` with
  `revokedAt != null`, the entire chain for that user is bulk-revoked
  and the request is rejected. This is the canonical OAuth 2.0 pattern
  for catching stolen refresh tokens.
- **Logout** marks the specified refresh token revoked, scoped to
  `userID = req.user.userID` (you can't log other users out).
- **Password change** (or admin reset, when added) bulk-revokes all of
  the user's active refresh tokens. Active access tokens self-invalidate
  via the `iat`-vs-`passwordChangedAt` check on next request.

### Verification (`requireJwtAuth`)
1. Bearer token from `Authorization` header, else 401.
2. `jwt.verify(token, JWT_SECRET)` — distinct messages for expired vs
   invalid signature.
3. **Always re-read user from DB** by `payload.sub`. Reject if
   `!user` / `!isActive`.
4. **Token-revocation check**:
   `token.iat * 1000 < user.passwordChangedAt` → 401 "Token revoked by
   password change".
5. Set `req.user = { userID, email, role, customerID }` from the fresh
   DB row.

### Storage
- **Refresh tokens stored in DB** (`RefreshTokens` table). Required for
  revocation. Schema in `02-auth.md`.
- **Access tokens stateless** — no DB lookup beyond the user row, no
  blacklist check.
- **JWT_SECRET** is generated locally with `openssl rand -hex 64`
  (512 bits), placed in `backend/.env`, never committed.
  `.env.example` ships a placeholder.

## Rationale
- **HS256, not RS256**: single backend, one process verifies its own
  tokens. Asymmetric only matters when a separate service needs to
  verify without holding the secret. Re-evaluate if the LIMS splits into
  microservices.
- **15-min access TTL**: short enough that the post-logout window for
  stolen access tokens is bounded; long enough that token churn doesn't
  dominate request volume.
- **Opaque refresh tokens, not JWTs**: refresh tokens are DB-checked
  every time anyway, so JWT signing is overhead. Opaque tokens are
  shorter and have no payload to leak.
- **DB-stored refresh, not stateless**: stateless refresh tokens cannot
  be revoked. Logout, password change, and admin reset all require
  immediate revocation — fundamental capability for a LIMS handling lab
  data.
- **`sub`-only payload**: role and customerID changes propagate
  immediately (no waiting for token expiry), and there's nothing to
  forge if signature verification ever fails open. The cost is one PK
  lookup per authenticated request — indexed, cheap.
- **Rotation + reuse detection**: well-understood threat model. If an
  attacker steals a refresh token, the legitimate user's next refresh
  trips the alarm and revokes the chain — limits the damage window
  without requiring per-request DB writes.
- **15-min residual logout window**: standard tradeoff. The mitigation
  is short access TTL, not a per-request blacklist (which would add a
  DB read to every authenticated request for marginal security gain).

## Alternatives Considered
- **Stateless refresh tokens (refresh-as-JWT)**. Rejected: cannot
  revoke. Logout would be best-effort; password change couldn't kill
  active sessions.
- **HTTP-only cookie storage for refresh.** Deferred. Phase 4 keeps it
  body-only (P4-Q1) — no cookie infrastructure yet, and the frontend
  will store both tokens in localStorage initially. Revisit when CSRF
  protection is added in Module 02 hardening.
- **Per-request access-token blacklist (DB or Redis).** Rejected for
  the same reason as in ADR-010: kills perf; the 15-min residual window
  is the accepted alternative (P4-Q2).
- **`role` and `customerID` in the access-token payload.** Rejected:
  changes wouldn't take effect until the token expired, and forged
  claims become an attack surface if signature verification ever
  regresses (P4-Q3).
- **RS256 / asymmetric keys.** Rejected for now (single-service
  backend); not blocked from a future migration since the secret is
  centrally managed.
- **Rate limiting on `/login` and `/refresh`.** Deferred to ADR-008
  (security hardening) — covered by lockout (5 → 15 min) for login,
  and reuse detection for refresh (P4-Q3).

## Consequences
- **One indexed DB read per authenticated request.** Acceptable; the
  PK lookup is sub-millisecond with the user row warm in the buffer
  cache.
- **Refresh-token table grows monotonically** until cleanup. Need a
  nightly job to delete rows where `expiresAt < now() - 7 days`. Tracked
  as a TODO under ADR-008.
- **Frontend must implement refresh rotation** correctly: on every
  refresh, replace BOTH stored tokens. Reusing the old refresh token
  after rotation will get the user logged out across all sessions.
- **All future modules** that need authentication mount
  `requireJwtAuth` (and, where applicable, `applyCustomerScope`). The
  Phase 6 cutover replaces the stub `requireAuth` import in all 10
  master-data route files.
- **JWT_SECRET rotation requires planning**: rotating the secret
  invalidates all active access tokens immediately. Refresh tokens are
  unaffected (opaque, DB-checked) — users will get a forced re-login
  but stay reachable. No multi-secret or kid-based setup in Phase 4;
  add if a rotation policy emerges.

## Related Documents
- ADR-006 (stub auth — superseded by this once Phase 6 lands)
- ADR-008 (deferred security hardening — rate limiting, monitoring)
- ADR-010 (password hashing — bcrypt + lockout)
- ADR-011 (customer scope enforcement)
- `/docs/modules/02-auth.md` — phase plan and verification details
