# Master Data Page Template

**Status**: locked 2026-04-27. Source of truth = the Customer page.

This document describes the canonical CRUD page pattern for all 10 master-data
screens (and most future flat-resource CRUD pages). Customer was the first
build; everything below was settled there. **Do not innovate during
replication.** Copy structure, swap data.

Source files (read these as the implementation reference):

```
frontend/src/
├── api/customers.ts
├── features/customers/
│   ├── customerSchema.ts
│   ├── customersQueries.ts
│   ├── CustomerTable.tsx
│   ├── CustomerViewDialog.tsx
│   ├── CustomerFormDialog.tsx
│   └── CustomerDeleteDialog.tsx
├── pages/CustomersPage.tsx
└── types/customer.ts
```

---

## File structure per entity

For a new entity `<E>` (e.g. Category, Unit, Test):

```
src/api/<entities>.ts                         typed list/get/create/update/delete
src/features/<entities>/
  <entity>Schema.ts                           Zod, mirrors backend validation
  <entities>Queries.ts                        TanStack Query hooks
  <Entity>Table.tsx                           list + skeleton + progress + action menu
  <Entity>ViewDialog.tsx                      read-only labeled grid
  <Entity>FormDialog.tsx                      create + edit, RHF + Zod
  <Entity>DeleteDialog.tsx                    confirm modal
src/pages/<Entities>Page.tsx                  URL state + dialog state machine
src/types/<entity>.ts                         <Entity>, <Entity>Input, list params
```

Plural for collections (`api/customers.ts`, `features/customers/`), singular for
the type module (`types/customer.ts`).

---

## Page-level state machine

```ts
const [viewingId, setViewingId] = useState<string | null>(null)
const [editing,   setEditing]   = useState<E | null>(null)
const [creating,  setCreating]  = useState<boolean>(false)
const [deleting,  setDeleting]  = useState<E | null>(null)

// `viewing` is DERIVED from rows.find(r => r[idField] === viewingId)
// — always reflects fresh server data after mutations refetch.
const viewing = viewingId ? rows.find(r => r[idField] === viewingId) ?? null : null
```

Transitions:

| Trigger | Effect |
|---|---|
| Click row name | `setViewingId(row[idField])` |
| ⋮ Edit | `setEditing(row)` (skips View) |
| ⋮ Delete | `setDeleting(row)` (skips View) |
| View → Edit | `setViewingId(null); setEditing(row)` |
| View → Delete | `setViewingId(null); setDeleting(row)` |
| Form save → success | `toast.success(...); close form; query invalidates` |
| Delete confirm → success | `toast.success(...); close; query invalidates` |

---

## URL-driven list state

```
/<entities>?page=1&limit=20&sort=<field>&order=asc&search=<q>
```

- 300 ms debounce on search → URL update
- `placeholderData: (prev) => prev` keeps current page visible during refetch
- Page-size dropdown: `[10, 20, 50, 100]`, default 20
- Page resets to 1 on new search

---

## Loading state (the locked pattern)

Vendor has no table-loading idiom. We use a hybrid built from vendor's AI-tools-page
shimmer + a custom progress keyframe:

- **Initial load (no rows yet)** — render 5 skeleton rows in the DataTable.
  Each cell shows `<Skel w="..." rounded={...} />` (animate-pulse bar) sized
  realistically per column.
- **Background refetch (sort / page / search after first paint)** — thin `h-1`
  indeterminate progress bar at the top of the table card, slides via the
  `progress` keyframe in `src/styles/custom/utilities.css`.
- Driven by TanStack Query's `isLoading` (initial only) and `isFetching` (any
  fetch). Pass both as props; don't OR them.

Do **not** use PrimeReact's built-in `loading` prop — it overlays the entire
table and doesn't match the vendor look.

```tsx
const showSkeletons   = isLoading && rows.length === 0
const showProgressBar = isFetching && !showSkeletons

{showProgressBar && (
  <div className="absolute top-0 start-0 w-full h-1 bg-border-color rounded-t-md overflow-hidden z-10">
    <div className="h-full w-1/3 bg-primary animate-[progress_1.2s_ease-in-out_infinite]" />
  </div>
)}
```

The outer table card needs `relative` so the progress bar positions correctly.

---

## No autoFocus on form fields (locked 2026-04-27)

**Don't `autoFocus` any input in a master-data form modal.** With
`mode: 'onTouched'`, autoFocusing a text field means the moment the user
clicks any other field (a FK dropdown, the Active checkbox, even Cancel),
the autofocused field's blur fires → it gets marked touched → its required
error appears before the user typed anything. Confusing premature error.

The trap is invisible on pure-text forms (Customer, SourceType) because
users naturally type into the focused field. The moment a form has an FK
dropdown the user wants to pick first (Sources), the bug surfaces hard.

Modal opens with no focus; the user clicks where they want to start. Only
fields they actually interact with become touched.

If you want to push the user into a specific field, react-select's own
`autoFocus` prop is fine (focuses the FK dropdown without triggering a
sibling field's blur).

---

## Form submit feedback

- Submit button:
  - Idle: `Add <Entity>` / `Update <Entity>`
  - Pending: spinner + `Saving...`
  - `disabled={isSubmitting}`
- All form inputs disabled during submit via:
  ```tsx
  <fieldset disabled={isSubmitting} className="contents">
    {/* grid of FormFields */}
  </fieldset>
  ```
  `className="contents"` keeps the grid layout intact.
- Modal stays open until response. On success: `toast.success` + close + parent
  invalidates query. On failure: `mapBackendErrors()` writes per-field or root
  errors, modal stays open.

---

## Delete confirm feedback

- Confirm button:
  - Idle: `Delete`
  - Pending: spinner + `Deleting...`
  - `disabled={del.isPending}`
- Cancel button also `disabled={del.isPending}`.

---

## Validation (RHF + Zod)

- Zod schemas in `<entity>Schema.ts` mirror backend `<entity>.validation.js`
- `useForm({ resolver: zodResolver(schema), mode: 'onTouched', defaultValues })`
- Field error: vendor `border-danger` swap on input + `<p className="mt-1 text-xs text-danger">{message}</p>`
- Backend errors mapped via `mapBackendErrors()`:
  - 409 → `setError('<uniqueField>', { type: 'server', message })`
  - 422 → iterate `data.errors`, set per-field
  - other → `setError('root', ...)` (banner)

---

## Toast feedback

- `toast.success('<Entity> "<name>" created' | 'updated' | 'deleted')` past-tense, names the record
- `toast.error('Failed to delete <entity>: ...')` for mutation failures
- Inline field errors stay inline — toasts are for action outcomes, not validation
- Always import via `@/lib/toast`, never `react-hot-toast` directly

---

## Vendor class checklist

These should appear unchanged in every replicated page:

- Table card: `bg-white rounded-md border border-border-color custom-datatable`
- Page wrapper / breadcrumbs: `<PageHeader breadcrumbs={...} actions={...} />`
- Action button (primary): `btn bg-primary border border-primary text-white inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800`
- Cancel button (modal): `btn bg-white border border-border-color font-semibold text-gray-900 hover:bg-primary hover:border-primary hover:text-white`
- Danger button: `btn ... bg-danger border border-danger text-white hover:bg-danger-700`
- Status pill (active): `bg-success-50 text-success border-success`
- Form input class via `inputClass(hasError)` / `textareaClass(hasError)` from `@/components/ui/FormField`

---

## Cosmetic / positional rules

- Action menu rendered via `createPortal` to escape table's `overflow-x-auto` clipping
- Modal overlay z-index `10000` (above sidebar's `9999`)
- Search input lives inside the table card header (right side), next to the Sort dropdown
- Pagination footer uses vendor's `dt-length` / `dt-paging-button` / `dt-info` 3-col grid

---

## CSS / build gotchas already solved

- **Cascade layers**: in `src/main.tsx`, `@/styles/globals.css` MUST import
  before PrimeReact CSS. Otherwise Tailwind v4's `@layer base` preflight
  (`border: 0 solid`) wipes Lara theme's row borders. Don't reorder.
- **`responsiveLayout="scroll"`** on PrimeReact DataTable is deprecated but
  vendor uses it; we keep it to match.
- **No `stripedRows`** on the DataTable — vendor doesn't have them. The user
  has been clear about this.

---

## What CHANGES per entity

- Field names (per backend `<entity>.validation.js`)
- Validation rules (mirror the backend Zod)
- Table column definitions (which fields show, formatting)
- View dialog field display
- Form dialog input fields
- Entity-specific labels, breadcrumb, route
- Primary key field name (`customerID` → `categoryID` etc.)

---

## Entity-specific complexity (where you DO write extra code)

The base pattern is fixed. Entity-specific logic gets layered on top — never
by altering the base.

- **Sources**: 3 FKs (customerID, sourceTypeID, categoryID) — locked the FK pattern (see below)
- **Equipment**: calibrationDueDate field + calibrationStatus pill
- **OcmElements**: min/max numeric range validation in Zod
- **Tests**: FK to Method → reuse FK pattern
- **Specifications**: FK to Test + Source → 2 FK selects, possibly cascading

For any of these, build the Customer pattern first, then add the FK selectors
or extra fields. Don't redesign the base.

---

## Build order rule

**When building related master-data pages, build entities WITHOUT foreign
keys FIRST. Then build entities that reference them.** This ensures test
data integrity and a clean development workflow.

Round 1 — standalone (no FKs): Categories, Units, Methods.
Round 2 — with FKs (build after their dependencies exist): Tests (→ Method),
Equipment, OcmElements (→ Equipment), Specifications (→ Test + Source +
Customer).

Sources is the FK template (locked 2026-04-27 alongside Customer); it ships
ahead of Categories because the page exists for global oversight. Categories
itself is the next standalone build.

---

## FK pattern (locked 2026-04-27 — Sources)

Source of truth: `frontend/src/features/sources/SourceFormDialog.tsx` +
`frontend/src/components/ui/FKSelect.tsx` + `frontend/src/pages/SourcesPage.tsx`.

### Components

- `<FKSelect>` (`src/components/ui/FKSelect.tsx`) wraps `react-select` with
  vendor-aligned styles (rounded-lg, border-border-color, danger swap on
  error). Vendor has no react-select example, so this wrapper IS the look.
- `menuPortalTarget={document.body}` + `menuPosition="fixed"` so the dropdown
  escapes modal clipping. z-index `10001` sits above Dialog overlay `10000`.

### Wiring inside the form dialog

Use RHF's `<Controller>` (FKSelect is not a native input):

```tsx
<Controller
  name="customerID"
  control={control}
  render={({ field }) => (
    <FKSelect
      options={customerOptions}
      value={field.value}
      onChange={(v) => field.onChange(v ?? '')}
      onBlur={field.onBlur}
      isLoading={customersQ.isLoading}
      hasError={!!errors.customerID}
      placeholder="Select customer..."
    />
  )}
/>
```

### Cached lookup queries

Reuse the entity's existing `use<Entity>` list hook with lookup-mode params:

```ts
const LOOKUP_PARAMS = { limit: 100, sort: 'name', order: 'asc' } as const

const customersQ   = useCustomers({   ...LOOKUP_PARAMS, sort: 'name' })
const sourceTypesQ = useSourceTypes({ ...LOOKUP_PARAMS, sort: 'name' })
const categoriesQ  = useCategories({  ...LOOKUP_PARAMS, sort: 'name' })
```

TanStack Query caches by key — if the form dialog and the page both call the
same hook with the same params, only one network request fires. Map to
`FKOption[]` via `useMemo`.

### Validation (Zod)

```ts
customerID: z.string({ message: 'Customer is required' }).uuid('Customer is required'),
```

Both required-error and bad-uuid path produce the same user-facing message.

### Backend FK 404 handling

When the backend returns 404 (related record missing — e.g. invalid
`customerID`), `mapBackendErrors` routes the message to the matching FK field:

```ts
if (status === 404) {
  const msg = data?.message ?? 'Related record not found'
  if (/customer/i.test(msg))    setError('customerID',   { ... })
  else if (/sourcetype/i.test(msg)) setError('sourceTypeID', { ... })
  else if (/category/i.test(msg))   setError('categoryID',   { ... })
  else setError('root', { ... })
}
```

### Edit-mode FK lock

Some FKs are immutable after create. For Sources, `customerID` is locked
in edit mode (backend PUT does not accept it). Pass `isDisabled={isEdit}`
and surface a `helpText="Cannot be changed after creation"`.

---

## Enum select pattern (locked 2026-04-27 — Categories)

For small fixed-value enums (3–5 options, e.g. Category `type`,
Equipment `calibrationStatus`), use `<EnumSelect>` — never a native
`<select>`. Native selects render with browser-default styling that
breaks the form's visual rhythm.

`EnumSelect` is a thin wrapper around `FKSelect` with `isSearchable={false}`.
Same vendor-aligned look (rounded-lg, border-border-color, danger swap on
error) as every other dropdown in the app.

```tsx
import { EnumSelect, type EnumOption } from '@/components/ui/EnumSelect'

const typeOptions: EnumOption[] = useMemo(
  () => CATEGORY_TYPES.map((t) => ({ value: t, label: t })),
  [],
)

<Controller
  name="type"
  control={control}
  render={({ field }) => (
    <EnumSelect
      options={typeOptions}
      value={field.value}
      onChange={(v) => field.onChange(v ?? '')}
      onBlur={field.onBlur}
      hasError={!!errors.type}
    />
  )}
/>
```

### EnumSelect vs FKSelect — when to use which

| | EnumSelect | FKSelect |
|---|---|---|
| Options source | static array (constants) | TanStack-cached lookup query |
| Searchable | no (`isSearchable={false}`) | yes (typeahead) |
| Loading state | n/a | `isLoading` from query |
| Use case | Category.type, calibrationStatus, role | customerID, sourceTypeID, methodID |

Both render identically — same react-select base, same styles, same
behavior inside Radix Dialog (no portal, position fixed).

---

## Cross-field validation pattern (locked 2026-04-27 — OcmElement)

For forms where one field's validity depends on another (numeric ranges,
"end ≥ start" times, "currency must match account", etc.), use Zod's
`superRefine` — never split into separate per-field `.refine()` calls.

```ts
export const ocmElementFormSchema = z
  .object({ /* ...attribute definitions... */ })
  .superRefine((d, ctx) => {
    // Per-pair: min ≤ max
    if (d.normalRangeMin != null && d.normalRangeMax != null
        && d.normalRangeMin > d.normalRangeMax) {
      ctx.addIssue({
        code: 'custom',
        path: ['normalRangeMax'],   // attach to the OFFENDING field
        message: 'normalRangeMax must be ≥ normalRangeMin',
      })
    }
    // Progression: bands don't overlap
    if (d.normalRangeMax != null && d.cautionRangeMin != null
        && d.normalRangeMax > d.cautionRangeMin) {
      ctx.addIssue({
        code: 'custom',
        path: ['cautionRangeMin'],
        message: 'cautionRangeMin must be ≥ normalRangeMax',
      })
    }
  })
```

### Rules

1. **Mirror the backend's `superRefine` exactly.** Both validate the same
   rules so client UX matches server response.
2. **Attach `path` to the offending field** so the error renders inline
   beneath the bad input — never use a generic banner for cross-field rules.
3. **Collect all violations in one pass.** `superRefine` runs once and can
   call `ctx.addIssue` multiple times. Don't chain `.refine()` calls.
4. **Backend 422 routing**: `mapBackendErrors` already routes
   `data.errors[].path[0]` to RHF. So if the user bypasses client validation,
   server-side errors land on the same fields.
5. **Number coercion**: form inputs return strings; preprocess to numbers
   inside the schema (`z.preprocess`) before the refine runs.

### When NOT to use superRefine
- Single-field rules (use `.min`, `.max`, `.regex` directly on the field)
- Async checks (uniqueness against the server) — handle via the 409 mapping
  in `mapBackendErrors`, not in Zod

---

## DateTimePicker / TimePicker pattern (locked 2026-04-27 — Equipment)

For ANY date / time / datetime / range field in the LIMS app, use
`<DateTimePicker>` or `<TimePicker>` — never a native `<input type="date">`,
`<input type="time">`, or third-party flatpickr wrapper. Both components
wrap PrimeReact `<Calendar />` (vendor's actual choice — vendor's
`flatpickr` package.json entry is leftover, never imported by vendor).

### `<DateTimePicker>` — date / datetime / range

```tsx
import { DateTimePicker } from '@/components/ui/DateTimePicker'

<Controller
  name="calibrationDueDate"
  control={control}
  render={({ field }) => (
    <DateTimePicker
      mode="date"               // 'date' | 'datetime' | 'range'
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      hasError={!!errors.calibrationDueDate}
      isClearable
    />
  )}
/>
```

### `<TimePicker>` — time only

```tsx
import { TimePicker } from '@/components/ui/TimePicker'

<Controller
  name="testStartTime"
  control={control}
  render={({ field }) => (
    <TimePicker
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      hasError={!!errors.testStartTime}
    />
  )}
/>
```

### When to use which

| Field need | Component | Mode | Wire format |
|---|---|---|---|
| Calibration due date, quote date, report date | DateTimePicker | `date` | `"YYYY-MM-DD"` |
| Sample collection timestamp, audit time | DateTimePicker | `datetime` | `"YYYY-MM-DDTHH:mm"` |
| Date range filter (audit log, reports) | DateTimePicker | `range` | `{ from, to }` |
| Test start/end time, runtime | TimePicker | n/a | `"HH:mm"` |

### Why two components, not one
Time-only is a distinct UX (no calendar surface). Mixing time-only logic
into DateTimePicker bloated the API; separate components keep the mental
model crisp ("I need a date" → DateTimePicker, "I need a time" → TimePicker).
Both share the same library and styling under the hood.

### Modal compatibility
`appendTo="self"` keeps the calendar panel inside the Dialog content tree.
Same Radix Dialog × portal trap that bit FKSelect — panels portaled to
`document.body` get caught by Radix's modal pointer-events lockdown and
clicks silently no-op.

### What NOT to do
- ❌ Native `<input type="date">` / `<input type="time">` (browser styling clashes)
- ❌ flatpickr / react-flatpickr (vendor doesn't use it; new dep with no benefit)
- ❌ react-bootstrap-daterangepicker (would add an extra dep — DateTimePicker `mode="range"` already covers it)
- ❌ Skipping `<Controller>` — both components expect Controller wiring (no native HTMLInputElement under the hood)

---

## FilterMenu pattern (locked 2026-04-27 — Customer / Equipment)

**MANDATORY for all master-data and module list pages with filters.**
Replaces the older standalone chip-row and filter-bar patterns (which
fragmented per page). One unified dropdown with sections, batch Apply,
URL-driven.

Source of truth: `src/components/ui/FilterMenu.tsx`.

### Header layout (every list page)

```
[Title]                          [Search] [Filter • N] [Sort]
```

The Filter button sits inside the table card header, between Search and
Sort. Tables accept an optional `filterMenu?: ReactNode` prop. Page
constructs the FilterMenu instance and passes it.

### Page integration

```tsx
import { FilterMenu, type FilterValues } from '@/components/ui/FilterMenu'

const STATUS_OPTIONS = [
  { label: 'All',      value: undefined },  // first option, value=undefined = clears the filter
  { label: 'Active',   value: 'true' },
  { label: 'Inactive', value: 'false' },
]

// 1. URL parsing → typed filter values
const isActiveFilter = parseIsActive(params.get('isActive'))

// 2. Compose the FilterValues object
const filterValues: FilterValues = {
  isActive: isActiveFilter === undefined ? undefined : String(isActiveFilter),
  type: typeFilter ?? undefined,
}

// 3. Single batch handler — runs once on Apply, writes ALL filter URL params
const applyFilters = (next: FilterValues) => {
  setParams((prev) => {
    const p = new URLSearchParams(prev)
    if (next.isActive === undefined) p.delete('isActive')
    else p.set('isActive', next.isActive)
    if (next.type === undefined) p.delete('type')
    else p.set('type', next.type)
    p.set('page', '1')   // always reset pagination on filter change
    return p
  })
}

// 4. Pass to the table via filterMenu slot
<EntityTable
  ...
  filterMenu={
    <FilterMenu
      filters={[
        { type: 'chips',  label: 'Status', key: 'isActive', options: STATUS_OPTIONS },
        { type: 'chips',  label: 'Type',   key: 'type',     options: TYPE_OPTIONS  },
        { type: 'select', label: 'Customer', key: 'customerID', options: customerOptions, isLoading: customersQ.isLoading, placeholder: 'All customers' },
      ]}
      values={filterValues}
      onApply={applyFilters}
    />
  }
/>
```

### Filter section types

| Type | When to use | Output value |
|---|---|---|
| `chips` | small fixed enums (Status, Type, Calibration) | `string \| undefined` |
| `select` | FK lookups, large lists (Customer, Source Type) | UUID string \| `undefined` |

Both can coexist in the same FilterMenu — Sources page has 1 chip section + 3 select sections.

### Behavior locked

- **Batch Apply**: opening the panel snapshots URL into draft. User picks
  chips/options → mutates draft only. `Apply` commits draft → URL → close.
  Outside-click / Esc discards the draft.
- **Clear all** button resets all sections to `undefined`.
- **Apply disabled** when draft equals current values (nothing to commit).
- **Button label**:
  - 0 active → `Filter`
  - 1 active → `Filter • <Label>` (e.g. `Filter • Active`)
  - 2+ active → `Filter • 3` (count)
- **Active styling**: button border + text turn primary when ≥ 1 filter active.
- **URL convention**: each filter's `key` IS its URL search param. No translation layer.
- **First option** in chips arrays is conventionally `{ label: 'All', value: undefined }` — clicking it clears that filter.
- **Pagination resets** to `page=1` on every Apply.

### What this replaces

The old "Filter chip bar pattern" (Categories) and "Filter bar pattern"
(Sources) sections that shipped earlier this session are GONE. Don't
recreate inline `<FilterChip>` helpers per page. Don't put filter rows
above the table.

### Backend list endpoint requirements

For each filter the page exposes, the backend list query must accept the
matching query param. Example:

| URL | Backend handles via |
|---|---|
| `?isActive=true` | `where: { isActive: true }` |
| `?type=FUEL` | `where: { type: 'FUEL' }` |
| `?customerID=<uuid>` | `where: { customerID: '<uuid>' }` |

If the backend doesn't accept a filter, the FilterMenu can't expose it.

---

## Dark mode + PrimeReact (locked 2026-04-27)

### How dark mode works in our app

- Toggle: `<html data-theme="dark">` (set by `themeSlice.setTheme`).
- Vendor `style.css` defines a `[data-theme="dark"] { ... }` block (line 1365)
  that overrides ~50 CSS variables (`--color-white`, `--color-dark`,
  `--color-gray-*`, `--color-border-color`, etc.).
- Tailwind v4 utilities like `bg-white`, `text-dark`, `border-border-color`
  emit `var(--color-*)` references and flip automatically when those vars
  flip. Verified empirically against the compiled CSS — `@theme { ... }` in
  vendor produces var-referencing utilities, no `@theme inline` needed.

### Two known traps

**1. PrimeReact lara-light-indigo bakes hex.** PrimeReact's component theme
hardcodes `#f8f9fa`, `#e5e7eb`, etc. in `.p-datatable-thead > tr > th` and
similar selectors. These do NOT respect `[data-theme="dark"]`. Result: in
dark mode the outer card goes dark but the table inside stays
visually-light (header bar, borders, dividers, paginator).

Fix: `src/styles/custom/primereact-dark.css` maps every leaking PrimeReact
selector back to vendor's dark vars under `[data-theme="dark"]`. Light mode
is untouched (selectors are scoped). When a new PrimeReact component is
introduced (Tooltip, Dropdown, Tree, etc.), grep its compiled CSS for
hardcoded colors and add the inverse mappings to this file.

**2. `text-white/N` and `bg-white/N` opacity variants flip wrong.**
Tailwind v4 emits `color-mix(in oklab, var(--color-white) N%, transparent)`
for opacity-modified utilities. Vendor's `--color-white` flips from
`#FFFFFF` to `#090212` in dark mode → opacity-white classes become
near-invisible dark-with-low-alpha. Vendor's spot-fix at `style.css:1438`
only catches plain `.text-white`.

Fix: any element that should stay white-on-dark regardless of theme (login
brand panel, marketing surfaces) is wrapped in `className="brand-panel"`.
`utilities.css` re-emits the opacity variants as literal
`rgba(255, 255, 255, N)` inside that scope. Plain `text-white` works
out-of-the-box thanks to vendor's spot-fix.

### Rules for new components

1. **Use vendor variables**: `bg-white`, `bg-light`, `text-dark`,
   `text-default`, `text-gray-{50..950}`, `border-border-color`,
   `bg-success-50`, `text-success`, etc. These all flip in dark mode.
2. **Never hardcode hex** for theme-aware surfaces (`bg-[#fff]`, `text-[#212529]`).
3. **Avoid `text-white/N` opacity variants** unless the surface is
   permanently always-white-text (use `.brand-panel` scope).
4. **Test BOTH modes** before locking a new component. Toggle the header's
   theme switcher and verify contrast.
5. **PrimeReact components**: after dropping in a new PrimeReact component
   that displays in dark mode, check the compiled CSS for the new
   `.p-component-name` selectors and add overrides to `primereact-dark.css`
   if needed.

---

## Activate / Deactivate toggle pattern (locked 2026-04-27 — all master-data pages)

**MANDATORY action menu item on every master-data row.** Lets users flip
`isActive` without opening the form modal. Optimistic UI: status pill
flips immediately; rolls back on error.

### Action menu order

```
⋮ menu:
  Edit
  Activate / Deactivate    ← dynamic label + icon based on row.isActive
  Delete
```

- Active row → "Deactivate" (`<IconPlayerPause>`)
- Inactive row → "Activate" (`<IconCheck>`)
- No confirmation dialog (reversible, low stakes; reserve dialogs for
  destructive actions like Delete).

### `useToggleActive<Entity>` hook

Each entity gets one hook in its `<entity>sQueries.ts`. Pattern locked
across all 6 master-data files (Customer / Source / Equipment / Category /
SourceType / OcmElement). Reuse the existing `update<Entity>Api` — no new
backend endpoint needed.

```ts
export function useToggleActive<Entity>() {
  const qc = useQueryClient()
  return useMutation<
    <Entity>,
    Error,
    { <entity>: <Entity>; nextActive: boolean },
    { snapshots: Array<[readonly unknown[], unknown]> }
  >({
    // Build the FULL update payload from the current row + flipped isActive.
    // Reuses the existing PUT endpoint; no PATCH route needed.
    mutationFn: ({ <entity>, nextActive }) =>
      update<Entity>Api(<entity>.<id>, {
        // ...all required fields from row...
        isActive: nextActive,
      }),

    // Optimistic write to every list cache.
    onMutate: async ({ <entity>, nextActive }) => {
      await qc.cancelQueries({ queryKey: <entities>Key.all })
      const snapshots = qc.getQueriesData({ queryKey: ['<entities>', 'list'] })
      qc.setQueriesData<<Entity>ListResponse>(
        { queryKey: ['<entities>', 'list'] },
        (old) => old && {
          ...old,
          data: old.data.map((row) =>
            row.<id> === <entity>.<id> ? { ...row, isActive: nextActive } : row,
          ),
        },
      )
      return { snapshots }
    },

    // Rollback on error.
    onError: (_err, _vars, ctx) => {
      if (!ctx?.snapshots) return
      for (const [key, data] of ctx.snapshots) qc.setQueryData(key, data)
    },

    // Reconcile with server (if filter excludes the row now, it disappears).
    onSettled: () => {
      qc.invalidateQueries({ queryKey: <entities>Key.all })
    },
  })
}
```

### Page handler + toasts

```tsx
const toggleActive = useToggleActive<Entity>()

const handleToggleActive = (row: <Entity>) => {
  const nextActive = !row.isActive
  toggleActive.mutate(
    { <entity>: row, nextActive },
    {
      onSuccess: () => toast.success(
        `<Entity> "${row.<name>}" ${nextActive ? 'activated' : 'deactivated'}`,
      ),
      onError: (err) => {
        const msg = axios.isAxiosError(err)
          ? ((err.response?.data as { message?: string } | undefined)?.message ?? err.message)
          : 'Unexpected error'
        toast.error(`Failed to ${nextActive ? 'activate' : 'deactivate'} <entity>: ${msg}`)
      },
    },
  )
}
```

### Race condition note

Two tabs toggling the same row at once: the second tab's full-payload PUT
can overwrite the first tab's recent edit. Acceptable for low-stakes
isActive toggle. Proper fix later: optimistic-locking via `updatedAt`
header or PATCH endpoints with single-field payloads. Defer until needed.

### What this replaces

Previously, deactivating required opening Edit, unchecking Active,
saving — 3 clicks. Toggle is one click + immediate visual feedback.

---

## Backend list endpoint requirements for FK pages

When a master-data list page has FK columns:

- Backend list query MUST `include` the FK targets with `attributes: ['<id>', 'name']`.
- Frontend never re-fetches FK names per row; it reads from the included nested object.
- For Sources: `controller.listAll` includes `customer`, `sourceType`, `category`.
- For Methods (chain FK): `controller.listAll` nests `test` → `category` so
  the table can show `Flash Point (Diesel)` without an extra round-trip.
- If the entity is normally nested (e.g. customer-scoped), add a flat list endpoint
  for the master-data page (see Sources `GET /api/sources`).

---

## Default-flag pattern (locked 2026-04-27 — Methods)

Some entities have a "one-default-per-parent" invariant — Methods marks
exactly one entry as `isDefault=true` per Test. Locked rules:

- **Backend owns the invariant.** When the controller sees `isDefault=true`
  on create or update, it flips all sibling defaults off in the **same DB
  transaction** before persisting. Same logic applies to BOTH nested AND
  flat (`createAll`) routes — never let one shape silently skip the
  transaction. Reference: `backend/src/modules/method/method.controller.js`
  (`create`, `createAll`, `update`).
- **UI just sends the flag.** No optimistic UI for default-flip — there's
  no reliable way for the client to know which sibling owned the previous
  default without re-fetching. Submit, then trust the backend response +
  TanStack `invalidateQueries`.
- **Display:** primary-color "Default" badge with a star icon in the table
  + a dedicated row in the View modal. Vendor reference for badge styling:
  `bg-primary-50 text-primary border border-primary`.
- **Form:** put the `isDefault` checkbox alongside `isActive` in the same
  flex row, with a small caption underneath:
  > "Marking a method default automatically clears the default flag on
  > other methods of the same test."
  (Documents the side effect — important UX, since users may see another
  row's badge silently move after save.)
- **Filter:** add a chips section to FilterMenu —
  `All / Default-only / Non-default` (locked option labels).
- **Sort:** include `<entity>.isDefault` in the sort allowlist so users can
  cluster default rows. SortMenu offers a "Default first" entry mapped to
  `(sort: 'isDefault', order: 'desc')`.

Apply this pattern to any future entity with a one-of-N flag (e.g. a
`primaryAddress` on Customer, a `defaultMethod` per Test variant).

---

## Replication escalation rules

If during replication you find yourself:

- Investigating vendor styling → STOP, use Customer's
- Discussing pattern alternatives → STOP, use Customer's
- "Improving" the pattern → STOP, use Customer's
- Re-debugging cascade layers / borders / modals → STOP, the bug is solved

Only escalate to the user when:

- Backend schema requires a field type not yet in Customer (numeric range, FK selector, multi-select)
- Entity has relationships requiring a new UI affordance
- User explicitly asks for a change to the pattern
