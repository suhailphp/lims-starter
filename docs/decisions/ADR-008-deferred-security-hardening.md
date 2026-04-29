# ADR-008 — Deferred Security Hardening

## Status: Planned

## Context
Master Data API work needs CORS (frontend on 5173 calling API on 3033) and
request logging (morgan) from day one. Other security middleware — notably
Helmet — is production hardening rather than a development blocker.
Shipping without it is acceptable in development but must not be forgotten.

## Decision
Ship `cors` and `morgan` immediately. Defer Helmet and additional
production-hardening concerns to a dedicated task before any staging or
production deployment.

## Deferred Pre-Deploy Checklist
- [ ] Helmet with a tuned Content-Security-Policy
- [ ] Rate limiting per api-conventions.md
      - 100/min public endpoints
      - 1000/min authenticated endpoints
      - 5 attempts / 15 min on login
- [ ] Strict CORS origin allowlist (replace `cors()` default wildcard)
- [ ] HTTPS enforcement / HSTS
- [ ] Request body size limit audit (current: 1mb JSON)
- [ ] Error handler stack-trace redaction verified for `NODE_ENV=production`
- [ ] Audit logging middleware (Module 8 — AuditLog table)
- [ ] Dependency vulnerability scan (npm audit / Snyk) in CI
- [ ] Secret management — no `.env` in repo, rotate dev DB password
- [x] JWT replaces stub auth — Module 02 Phase 6 (2026-04-26); ADR-006 superseded by ADR-009

## Rationale
Explicit deferral with a named checklist is safer than silent omission.
Anyone reading the ADR list sees the remaining production gap at a glance.

## Consequences
- Development proceeds unblocked
- No deploy to staging or production until this checklist is addressed
- This ADR will be promoted to "Implemented" (or superseded by a new ADR)
  once the checklist is closed out
