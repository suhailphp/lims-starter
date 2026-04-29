# LIMS Architecture Overview

## Project Purpose
Laboratory Information Management System for a commercial laboratory 
specializing in oil, water, and lubricant testing operations.

## Tech Stack

### Backend
- Runtime: Node.js
- Framework: Express
- ORM: Sequelize
- Database: PostgreSQL
- Auth: JWT

### Frontend
- Framework: React 19 + TypeScript 6
- Build Tool: Vite 8
- State: Redux Toolkit + React-Redux
- Routing: React Router DOM 7
- HTTP Client: Axios (interceptors: Bearer attach + 401 refresh)
- Data Fetching: TanStack Query (staleTime 5 min)
- Forms: React Hook Form + Zod
- CSS: Tailwind CSS v4 (vendor `@theme` is source of truth — see Theme Integration)
- Complex UI: PrimeReact (DataTable, advanced inputs)
- Charts: ApexCharts + react-apexcharts
- Forms helpers: react-select (searchable selects), flatpickr (date/range pickers)
- Page metadata: react-helmet-async
- Icons: @tabler/icons-react
- Theme: Dreams AI integrated as a vendor layer — `/src/styles/vendor/style.css`
  is the source of truth; `/src/styles/custom/` holds overrides + LIMS-only styles.
  Components reuse vendor's class names and DOM hierarchy.
  Reference: `/docs/decisions/ADR-frontend-theme-integration.md`
- Token strategy: access token in Redux (in-memory); refresh token in localStorage
- Dark mode: `data-theme="dark"` on `<html>`, toggled via Redux themeSlice

### Frontend Phases
1. Foundation ✅ (2026-04-26) — Vite + RTK + TanStack Query + Tailwind v4 + route skeleton
2. Login + Auth Flow ⏳ — login page, JWT integration, silent refresh, protected routes
3. Master Data UI ⏳ — CRUD pages for Module 01 resources
4. Quotes UI ⏳ — Module 03 frontend

## System Architecture
React (port 5173) ←→ Express API (port 3033) ←→ PostgreSQL

## Module List
1. Master Data              - Customers, categories, tests, methods, specifications, equipment, OCM sources
2. Auth & User Management   - JWT login/refresh/logout, password change, User CRUD, role + customer scope
3. Quotes                   - Client quotations with line items
4. Sample Intake            - Worksheet creation (GENERAL + OCM workflows)
5. Worksheet                - Test assignments, technician tracking, manager final approval
6. Reports                  - PDF report generation with versioning
7. OCM Extension            - Oil condition monitoring with wear metal analysis
8. Audit                    - Complete change history tracking

## Key Business Rules

### Identifiers
- Sample/Worksheet numbers: LS-YYYYMMDD-XXXXX (reset daily)
- Quote numbers: QT-YYYYMMDD-XXXXX (reset daily)
- Report numbers: RP-YYYYMMDD-XXXXX (reset daily)

### Data Integrity
- UUID primary keys on all tables
- Soft delete only (never hard delete)
- Two-flag system: isDeleted (lifecycle) + isActive (business status)
- Full audit fields on every table
- Critical operations wrapped in database transactions

### Workflow Rules
- Two submission types: GENERAL and OCM
- One technician per test (not per worksheet)
- Manager approves entire worksheet (not individual tests)
- Pass/fail decided manually by manager with remarks
- Approval triggers report generation automatically

### Versioning
- FinalResult supports versions (isLatest flag)
- Report supports versions (isLatest flag)
- Any post-approval edit creates new version
- Mandatory revision reason for edits
- Old versions preserved for audit

### Report Storage
- PDF files stored on file system (organized by year/month/day)
- Database stores path + metadata + SHA-256 checksum
- Hybrid strategy: generated once, versioned on changes

## User Roles
- Admin         - Master data management, full access
- Receptionist  - Create worksheets, receive samples, manage customers
- Technician    - Enter test results (one per test)
- Manager       - Final approval, remarks, versioning
- Customer      - Login to view own reports only
- Super Admin   - (future) Hard delete, restore, override approvals

