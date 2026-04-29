# ADR-Frontend-Tenant-Branding — Two-Logo Sidebar for Multi-Tenant Readiness

## Status: Accepted

## Context
The Dreams AI two-column sidebar pattern places a logo in **both**
columns:

- **Left column** — small icon-only mark, always visible (even when
  the right column is collapsed).
- **Right column** — full logo with text, visible only when the panel
  is expanded.

In the original theme this is purely a presentational choice — both
slots show the same brand. For a LIMS sold to multiple labs (the
planned multi-tenant SaaS path), the two slots map naturally to two
distinct brand layers, so we keep both and assign each a purpose.

## Decision
Use the two logo slots to represent two different brands:

| Slot               | Represents          | Today                    | Future (SaaS)             |
|--------------------|---------------------|--------------------------|---------------------------|
| Left (icon-only)   | **Product brand**   | Gradient "L" mark (LIMS) | Same — product identity   |
| Right (full panel) | **Customer brand**  | "Prime Lab" + "LIMS"     | Lab name & uploaded logo  |

The product brand stays constant across every install. The customer
brand is per-tenant and replaceable.

### Implementation

1. **Tenant config module** at `frontend/src/config/tenant.ts`:
   ```ts
   export interface TenantConfig {
     labName: string
     labLogo: string | null
   }
   export const tenant: TenantConfig = {
     labName: 'Prime Lab',
     labLogo: null,
   }
   ```

2. **Sidebar imports `tenant`** and renders the right-column slot as
   lab name (prominent) + "LIMS" subtitle (small):
   ```tsx
   <div className="text-xl font-bold ...">{tenant.labName}</div>
   <div className="text-xs ...">LIMS</div>
   ```

3. **No hardcoded lab name** anywhere else. Components that need the
   lab name import `tenant.labName`.

## Rationale
- **Two visual layers, two brand layers.** Single-tenant labs see
  their name on every screen; the LIMS product brand stays present
  but secondary.
- **One file to swap.** Rebranding for a new lab today is a one-line
  change in `tenant.ts`. No template hunting.
- **No premature infrastructure.** Database-backed tenant config,
  per-host routing, and admin upload UIs are all out of scope until
  SaaS becomes a real customer requirement. The config-module pattern
  defers that work without blocking it.
- **Pattern matches the theme.** We honor the vendor's two-logo
  layout instead of fighting it.

## Alternatives Considered
- **One logo only (drop the right slot).** Rejected: throws away the
  visual hierarchy the theme provides, and removes the slot we need
  for customer branding later.
- **Hardcode "Prime Lab" inline in the sidebar JSX.** Rejected: every
  future component that wants the lab name (page titles, PDFs, email
  footers) would re-introduce the same string. Centralizing now is
  cheap.
- **Build the database-backed config now.** Rejected: speculative
  until SaaS is a real path. A constant module with the same shape as
  the eventual API response keeps the migration straightforward.

## Future Migration Path (when SaaS is committed)
1. Add a `Tenant` table (id, labName, labLogoUrl, primaryHost, …).
2. Resolve the active tenant per-request (subdomain, custom domain,
   or path prefix).
3. Replace the static `tenant` constant with a fetched config — same
   `TenantConfig` shape, populated from `/api/tenant/me` and cached
   in Redux.
4. Add an admin Settings page (`/settings/branding`) that PATCHes the
   tenant record and invalidates the cached config.

Components consuming `tenant.*` continue to work unchanged because
the type contract is preserved.

## Consequences
- The right-column logo slot is now a **product surface** for the
  customer — it's the most prominent place their brand appears in
  the app shell. Treat changes to its layout as branded-area changes.
- Anyone adding a new place that shows the lab name (PDF reports,
  email subjects, page titles) must import `tenant.labName` rather
  than hardcoding. Code-review checklist item.
- The product brand ("LIMS") remains intentionally subtle — it's a
  subtitle, not a header. We are signalling that the lab is the
  primary brand here.
