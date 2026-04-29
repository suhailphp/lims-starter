# ADR-Frontend-Theme-Integration — Use Dreams AI Theme as Vendor Layer

## Status: Accepted

## Context
We licensed the Dreams AI Tailwind admin theme. Earlier in Phase 3 we
attempted to *recreate* its visual styles by selectively re-implementing
small CSS pieces (animated icon border, gradient menu background, etc.)
in our `globals.css`. After several iterations the sidebar still didn't
visually match the theme. Each fix produced a new mismatch.

The cause was approach, not effort: **we treated the vendor folder as
"reference"** and tried to derive equivalent styles. But the theme
already ships a `style.css` (1,597 lines) that covers every component
visual we'll ever need — sidebar, buttons, cards, forms, layouts. By
not using it, every visual task became a from-scratch CSS port with
no end-state we could test against. We were rebuilding what we had
already paid for.

## Decision
Adopt the vendor theme as a first-class **vendor layer** in the
codebase. Copy the parts we need into `/src/styles/vendor/` and
`/src/styles/custom/`, with the orchestrator (`globals.css`) stacking
the layers in cascade order:

```
1. Tailwind core
2. Vendor theme   (source of truth for tokens, components, animations)
3. LIMS overrides (only when we MUST diverge from vendor)
4. LIMS components (LIMS-specific styles, not in vendor)
5. LIMS utilities  (our utility classes, if any)
```

### Folder layout

```
frontend/src/styles/
├── vendor/                       # Read-only mindset — re-port from
│   └── style.css                 #   /frontend/vendor when updates ship.
├── custom/                       # Our additions only.
│   ├── overrides.css             # Empty until we need to override vendor.
│   ├── lims-components.css       # LIMS-specific components.
│   └── utilities.css             # Empty until we add utilities.
└── globals.css                   # Orchestrator — imports above in order.
```

### What was copied (Phase B inventory)

Only **one file** in the initial cut:

| Source (vendor)                  | Destination (ours)             |
|----------------------------------|--------------------------------|
| `vendor/src/assets/css/style.css`| `src/styles/vendor/style.css`  |

Three lines stripped from the copy (replaced with a comment header):
1. `@import url('https://fonts.googleapis.com/...Inter...')` —
   `globals.css` already imports Inter.
2. `@import "tailwindcss"` — only one entry should bring in Tailwind;
   `globals.css` does it.
3. `@import "../../../node_modules/preline/variants.css"` —
   we are not installing Preline (Decision 2 below).

### Three integration decisions

1. **`@theme` collision (vendor's vs ours).** Both files declared
   `@theme {}` blocks with overlapping CSS variables. **Vendor wins.**
   We removed our `@theme` from `globals.css` entirely. Any LIMS-
   specific token additions go inside `custom/` files (define on
   `:root` or in a fresh `@theme {}` block).

2. **Preline runtime.** Vendor's tabs/dropdowns/overlays use Preline
   (`data-hs-tab`, `HSStaticMethods.autoInit()`). **We skip Preline.**
   React state drives sidebar tab switching. If a future vendor
   component genuinely needs Preline, install it then — not before.

3. **Icons.** Vendor uses Phosphor Duotone webfont (~5.9 MB).
   **We keep `@tabler/icons-react`** (tree-shaken SVG components).
   Vendor CSS targets `<a>` and `<span>` wrappers — it doesn't care
   what icon element sits inside, so visual styling still applies.

## Rationale
- **We paid for the theme; we should use it.** Reimplementing what
  ships in the file we already own is busywork.
- **One source of visual truth.** Vendor's `style.css` is the spec.
  Rebuilding visuals = guessing at the spec; using it = exact match.
- **Reuse path is clear.** When we ship the next vertical (POS, Gym,
  Logistics) we copy `/styles/vendor/` and the same kit of tokens
  applies. Only `/styles/custom/` and per-app config change.
- **Failure mode is constrained.** Visual bugs are now either "vendor
  rule didn't apply" (selector mismatch in our JSX — easy to grep)
  or "vendor doesn't cover this case" (legitimate addition to
  `custom/`). No more "we missed a transform-origin in our port".
- **Tokens stay coherent.** A single `@theme` block means colors,
  spacing, gradients are defined once.

## Alternatives Considered
- **Continue selective re-implementation in `globals.css`.** Rejected.
  Burned hours of work; visuals still didn't match; every new task
  meant another from-scratch port.
- **Bulk-copy vendor folder verbatim into `src/`.** Rejected. Vendor
  ships demo Redux slices, demo routes, demo components, three icon
  packs, 31 MB of demo videos. We need a sliver. Selective copy with
  an inventory gate keeps the codebase honest.
- **Install Dreams AI as an npm package.** It isn't published; it's
  delivered as a source folder. Even if it were, we'd still want a
  copy we can override locally without a fork.
- **Preline runtime.** Rejected for now (Decision 2). Adds a JS
  dependency we don't currently need and isn't required for visual
  match.

## Consequences

### What this enables
- **Sidebar animations work automatically.** The animated gradient
  border on active icons, hover transitions, gradient menu background
  — all from vendor's `@apply`-generated CSS.
- **Cursor states work.** Vendor styles `<a>` (which is `cursor:
  pointer` by default), so swapping our `<button>` to `<a>` for tab
  triggers fixed the cursor issue at the same time.
- **Future visual work is short.** "Use vendor classes" replaces
  "design new CSS". When vendor doesn't cover something, we add it
  to `custom/lims-components.css` deliberately, with a comment saying
  why vendor was insufficient.

### What this constrains
- **Don't edit `/styles/vendor/`.** It's the upstream copy. Treat it
  read-only. If vendor ships an update, re-port it (the strip rules
  are documented in the file's comment header).
- **Override surgically, not broadly.** When you must override vendor,
  do it in `custom/overrides.css` with a one-line `WHY:` comment.
  Avoid duplicating vendor selectors with subtle differences.
- **JSX must use vendor's class names.** Vendor's CSS uses specific
  selectors like `.sidebar-twocol.sidebar .sidebar-left ul li a.active`.
  Our components must produce that DOM structure (with `<a>` not
  `<button>`, with `class="active"` not `class="sidebar-icon-active"`,
  etc.) for vendor styles to match.

### Reuse strategy for future projects
Each new admin app (POS, Gym, Logistics) starts from this template:

1. Copy `/frontend/src/styles/vendor/` (vendor file, unchanged).
2. Replace `/frontend/src/styles/custom/` with project-specific styles.
3. Replace `/frontend/src/config/tenant.ts` with project branding.
4. Build domain components using vendor's class catalog.

Vendor file gets re-ported on theme version bumps; everything else is
project-specific.

## Pre-installed dependencies

Vendor ships a kit of UI libraries; we install the ones we'll plausibly
reach for in the next 1–2 phases and **defer or skip the rest**. The
goal is "any theme component works without a 'do you want me to install
X?' detour" — but bounded to packages we will actually use. Bloat
slows installs, doubles security-update surface area, and dilutes the
chart-library decision.

### Tier 1 — Installed
Versions match vendor's `package.json`.

| Package | Version | Purpose |
|---|---|---|
| `react-select` | `^5.10.2` | Searchable dropdowns (Phase 4 customer forms onward) |
| `flatpickr` | `^4.6.13` | Date / time / range picking. Replaces `react-bootstrap-daterangepicker` |
| `react-helmet-async` | `^3.0.0` | Per-page `<title>` and meta tags |
| `apexcharts` + `react-apexcharts` | `^5.10.5` / `^2.1.0` | Charts (dashboards, reports). The chart pick — see Tier 3 |

### Tier 2 — Deferred (install when the phase needs them)

| Package | When |
|---|---|
| `@fullcalendar/{react,daygrid,timegrid,interaction}` | If sample scheduling gets a calendar UI |
| `@hello-pangea/dnd` | If worksheet/test reordering needs drag-drop |
| `yet-another-react-lightbox` | If samples ever attach photos |
| `react-quill-new` | Probably never — PDF reports use server-side templating |

### Tier 3 — Skipped (redundant / harmful)

| Package | Reason |
|---|---|
| `chart.js`, `react-chartjs-2`, `echarts`, `echarts-for-react` | Redundant with Apex. Picking one chart library prevents codebase split-brain |
| `react-bootstrap-daterangepicker` | Pulls in jQuery + Bootstrap as peer deps; clashes with Tailwind. `flatpickr` covers ranges |
| `@fortawesome/fontawesome-free` | We use Tabler React. Vendor's `font-family: 'lucide'` for menu arrows is Lucide font, not FA |
| `@tabler/icons-webfont` | We have `@tabler/icons-react` — webfont is a duplicate |
| `preline` | Decision 2 above — React state replaces Preline runtime |

## Workflow rule — using any theme component

When building a new feature that wants a theme component (chart, table,
calendar, dropdown, dialog, date picker, etc.), follow this order
**every time**. Never re-create theme styles from scratch.

1. **Copy first.** Identify what the vendor ships:
   - CSS the component needs → `src/styles/vendor/` (re-port relevant
     blocks if not already in `style.css`).
   - Static assets (fonts, images) → `src/assets/vendor/<type>/`.
2. **Read vendor's reference.** Open the matching component in
   `frontend/vendor/src/components/...`. Note the class names, DOM
   hierarchy, and any data attributes.
3. **Use vendor's CSS classes.** Apply them to our component verbatim
   so vendor selectors match.
4. **Build our component on top.** Same DOM hierarchy as vendor; only
   data is LIMS-specific (menu items, table columns, chart data).
5. **Custom CSS only if necessary.** Add to `src/styles/custom/`
   (`overrides.css` for vendor overrides, `lims-components.css` for
   LIMS-specific styles). Always include a `WHY:` comment.

This is non-negotiable. Re-deriving theme visuals burned several
sidebar iterations before this ADR — don't repeat that.

## Supersedes
- Earlier Phase 3 sidebar attempts that ported individual vendor CSS
  rules into `globals.css`. Those rules are now removed — vendor's
  `style.css` provides them in their original form.

## Verification
- `npm run build` succeeds with vendor CSS active.
- Compiled bundle: `dist/assets/index-*.css` ~189 KB (29 KB gzipped) —
  +66 KB raw / +9 KB gzip vs pre-integration. Within budget.
- Sidebar renders using vendor classes; animation/hover/cursor
  behavior verified in browser (Phase 3 sign-off).
