# ADR-007 — Validation Library — Zod

## Status: Accepted

## Context
Every POST/PUT endpoint needs request validation that returns 422 with a
field-level error array (per api-conventions.md). Three libraries were
evaluated: Zod, Joi, and express-validator.

## Decision
Adopt **Zod** across backend modules. Schemas live in
`{module}.validation.js` alongside controllers and routes, wired through a
generic `validate()` middleware that runs `schema.parse()` for body, query,
and params.

## Rationale
- Frontend is TypeScript + Vite — Zod runs in both runtimes
- Schemas will eventually be extracted to a shared workspace package for
  true FE/BE reuse (deferred task)
- Structured `ZodError.issues` maps cleanly to the 422 error contract
- Active ecosystem momentum in 2026 — likely to outlast alternatives

## Caveats
- Day-one schema *reuse* is aspirational. The frontend will redeclare
  schemas until the monorepo is restructured with workspaces. Patterns
  and error shapes stay aligned in the meantime.
- Backend is plain JS (CommonJS), so Zod's TypeScript inference benefit is
  not realized on the backend today. If/when the backend adopts TS or
  `checkJs`, this pays off automatically.

## Alternatives Considered
- **Joi** — more natural fit for a plain-JS backend but cannot cross to
  the TS frontend cleanly. Rejected: would force a second validation
  library on the FE.
- **express-validator** — imperative middleware chains, not schema-first.
  Rejected: harder to reuse, less readable for large payloads.

## Consequences
- `zod` runtime dependency on backend
- All future modules follow the `{module}.validation.js` + `validate()`
  middleware pattern
- Future task: create `/packages/shared/schemas` (npm/pnpm workspaces) to
  share schemas with FE
