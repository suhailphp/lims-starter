# ADR-001 — Monorepo Structure

## Status: Accepted

## Context
LIMS needs both backend (Express) and frontend (React).
Decision needed on how to organize the code.

## Decision
Use monorepo with two folders inside one GitHub repo:
- /backend
- /frontend

## Reasons
- Single git clone gives everything
- Claude Code CLI sees full context in one session
- One repo to manage for small team
- Shared /docs folder at root applies to both
- Easy to run both locally

## Alternatives Considered
- Two separate repos → rejected, harder to manage
- Single project with mixed code → rejected, unclear separation

## Consequences
- Backend and frontend share .gitignore
- Deployment scripts must handle both folders
- CI/CD must run two separate build pipelines