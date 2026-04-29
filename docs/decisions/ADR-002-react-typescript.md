# ADR-002 — React with TypeScript

## Status: Accepted

## Context
Frontend framework choice and language decision.
Dreams AI theme is built with React + TypeScript.

## Decision
Frontend stack:
- React 18+
- TypeScript
- Vite (build tool)
- Redux Toolkit (state management)
- React Router (routing)
- Tailwind CSS (styling)
- Axios (HTTP client)

## Reasons
- Matches theme's exact stack — no conversion overhead
- TypeScript provides type safety for enterprise application
- Vite fast development experience
- Industry standard for React projects in 2026

## Alternatives Considered
- Plain JavaScript → rejected, lacks type safety
- Next.js → rejected, overkill for internal LIMS app
- HTML version of theme → rejected, harder to maintain

## Consequences
- Team must be comfortable with TypeScript basics
- Build process needed (not simple HTML)
- Theme components must be copied from vendor, not imported directly