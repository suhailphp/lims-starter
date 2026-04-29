# ADR-006 — Stub Authentication for Master Data APIs

## Status: Superseded by [ADR-009](ADR-009-jwt-strategy.md) (2026-04-26)

The stub middleware (`X-User-ID` header) has been removed in Module 02 / Phase 6.
All master-data routers now use `requireJwtAuth` from ADR-009. The
`requireAuth.js` file has been deleted from the codebase. This ADR is preserved
for historical context only — do not reintroduce header-based auth.

## Context
Master Data REST APIs (Module 1) are being built before User Management /
Auth (Module 7). Every write needs a userID to populate audit fields
(createdBy, updatedBy, deletedBy). A full JWT implementation is out of
scope for the current module.

## Decision
Use a stub authentication middleware that reads `X-User-ID` from the
request header and resolves it to a User record before attaching
`req.user` to the request.

### Behavior
- Missing header → 401
- Malformed UUID → 401
- User not found or inactive → 401
- Valid → attach `req.user = { userID, role, customerID }` and continue
- Log a warning line on every request so the stub is unmistakable

### Scope
Applies to all Master Data endpoints until Module 7 ships JWT-based auth.
When JWT lands, this middleware is replaced as a drop-in — no other module
code should need changes because every consumer reads `req.user`.

## Rationale
- Unblocks API work without waiting for full auth
- DB lookup prevents phantom userIDs from contaminating audit fields
- Header contract (`X-User-ID`) is trivial to replay in Postman / curl
- Per-request warning makes accidental promotion to staging obvious

## Alternatives Considered
- Skip auth entirely, hardcode a default userID → rejected (no audit value)
- Build full JWT first → rejected (scope creep, blocks API work)
- Trust header blindly without DB lookup → rejected (phantom users)

## Consequences
- Anyone with the backend URL can act as any user in development
- Staging / production MUST NOT run with this middleware
- Module 7 swap is mechanical — same `req.user` contract
