# 00 — Global Search

Lab-agnostic global search across all currently-shipped entities. Built
before the starter-template copy so the header ⌘K shortcut is functional.

## Overview

Single endpoint, single page. The header search bar (and ⌘K from anywhere)
navigates the user to `/search`, where the typed query debounces (300 ms)
into the URL and renders categorized results. Click a result → navigate to
the entity's list page with `?view=<id>` so the View modal opens
automatically.

## Schema

No new tables. Read-only across existing entities.

## Endpoints

| Method | Path                                                     | Roles               | Notes |
| ------ | -------------------------------------------------------- | ------------------- | ----- |
| GET    | `/api/search?q=<term>&category=<all\|cat>`              | JWT (ADMIN/MANAGER) | Empty payload for other roles in Phase 1 |

### Query parameters

- `q` — required, 2-200 chars (trimmed). 422 if missing or out of range.
- `category` — default `all`; or one of `customers / users / tests /
  methods / equipment / categories / sources / currencies`. 422 on any
  other value.

### Response shape

**`category=all`**

```jsonc
{
  "success": true,
  "data": {
    "query": "admin",
    "category": "all",
    "totalResults": 1,
    "resultsByCategory": {
      "users": {
        "count": 1,
        "results": [
          {
            "id": "55c8...d",
            "type": "users",
            "name": "Test Admin",
            "subtitle": "ADMIN · admin@lims.local",
            "isActive": true,
            "link": "/users?view=55c8...d"
          }
        ]
      }
    }
  }
}
```

Empty buckets are omitted. Each bucket is capped at 5 results in `all`
mode (server-side); a "View all <category> results" link in the UI flips
the active category to load up to 50.

**`category=<single>`** — flat array, capped at 50 per request:

```jsonc
{
  "data": {
    "query": "admin",
    "category": "users",
    "totalResults": 1,
    "results": [ /* same shape as above */ ]
  }
}
```

## Patterns / invariants

- **ILIKE** for case-insensitive matching (PostgreSQL). Pattern is
  `%<term>%`.
- **Soft-delete-aware** — every model's `defaultScope` filters
  `isDeleted=false`, so the search service inherits it for free.
- **Inactive rows still appear** so admins can find and reactivate them.
  The UI marks them with an "Inactive" badge on the result card.
- **Per-category fetchers** in
  `backend/src/services/searchService.js`. Adding a new entity = add a
  shaper + a fetcher entry, then bump `SUPPORTED_CATEGORIES`. The Zod
  enum reads from that list automatically.
- **Result `link`** always uses `?view=<id>` so the FE just navigates;
  individual list pages opt in to auto-opening the View modal (see
  Frontend notes).
- **Phase 1 role gate** — ADMIN/MANAGER only. Other roles get an empty
  payload (no per-entity rules wired yet). Per-entity role rules will
  land alongside the transactional modules (Quotes / Samples /
  Reports), where customer scoping needs to filter by `customerID`.

## Frontend notes

- `/search` page (`SearchResultsPage.tsx`) owns the live input + debounce
  (300 ms). URL contract: `?q=<term>&category=<cat>`.
- Header search is a real input (vendor's `header.tsx:161` styling).
  Behavior:
  - Type + Enter from any page → `navigate('/search?q=<v>')`.
  - Enter while already on `/search` → updates `?q=` with `replace:
    true`, preserving `?category=`. Back-button still returns to the
    page that launched the search.
  - Empty / 1-char Enter is a no-op.
- Both the header input and the page input seed from `?q=`. The URL is
  the single source of truth; they never talk to each other directly.
  Header re-syncs from URL on route/URL change UNLESS focused.
- ⌘K / Ctrl+K is context-aware:
  - On any non-`/search` page: focuses the header input (and selects
    existing text so the user can immediately overwrite).
  - On `/search`: the page-level hook focuses the page input. The
    header hook no-ops there to avoid double-focus tug.
- Vendor reference: `/vendor/src/pages/application/search-result/
  searchResult.tsx`. We reuse the page frame, the tab-pill filter row,
  the section-header layout, and the 2-column card grid; we drop the
  per-card kebab dropdown (entity-level CRUD belongs on the entity
  page).
- Match highlighting is inline (regex-escape + `<mark>`); no external
  library.

### `?view=<id>` + `?search=<q>` deep-link contract (LOCKED 2026-04-29)

Search results link to `/<entity>?view=<id>&search=<q>`. The list page:
1. Reads `?view=` and opens the View modal (closing it removes the
   param via `replace: true` so back/forward stays clean). If the row
   isn't on the current paginated page, falls back to a fetch-by-id
   (`useEntity(id)` hook) so the modal still renders fresh data.
2. Reads `?search=` (existing locked list-page state) so the table
   behind the modal is pre-filtered to the same query — when the user
   closes the modal they see context, not a generic page-1 list.

**Field-overlap rule**: Wiring a new entity to global search means
verifying that the list endpoint's `search` field set is at least as
broad as the global search service's field set for that entity. If
not, the user can hit a "found in global, missing in list" state.
Currently safe for Customers (list ⊇ global) / Tests (equal) /
Users (equal).

**Wired:**
- `/customers?view=<id>` (`CustomersPage.tsx`)
- `/tests?view=<id>` (`TestsPage.tsx`)
- `/users?view=<id>` (`UsersPage.tsx`)

**Future extensions** (mechanical replication; copy the `viewParam +
useEffect + closeView + useEntity fallback` block):
- `/methods?view=<id>`
- `/equipment?view=<id>`
- `/categories?view=<id>`
- `/sources?view=<id>`
- `/currencies?view=<id>`

Until those land, clicking a result for those entities still navigates
to the list page; the View modal just doesn't auto-open.

## Open TODOs

- Extend `?view=<id>` auto-open to the remaining 7 list pages above.
- Per-entity role-based filtering (CUSTOMER scoping) — wire alongside
  Quotes / Samples / Reports.
- Add Samples / Reports / Quotes / Documents to the searchable entity
  set when those modules ship.
- Optional: switch to PostgreSQL `tsvector` / trigram for ranking once
  the entity counts grow past ~10k rows. ILIKE is fine until then.
