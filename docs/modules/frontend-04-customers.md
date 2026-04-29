# Frontend Phase 4 — Customers CRUD

## Status: ✅ COMPLETE — 2026-04-26

This is the **template page** for all 10 master-data screens.
Don't innovate during replication — match this pattern verbatim
and only swap data.

## Routes
- `/customers` — list + create + view + edit + delete (all in modals)

## Files shipped

```
frontend/src/
├── api/
│   └── customers.ts                       typed list/get/create/update/delete
├── components/ui/
│   ├── Dialog.tsx                         Radix wrapper, vendor modal frame
│   ├── FormField.tsx                      label + form-input + error wrapper
│   └── PageHeader.tsx                     vendor breadcrumb + actions slot
├── features/customers/
│   ├── customerSchema.ts                  Zod (mirrors backend validation)
│   ├── customersQueries.ts                TanStack Query hooks
│   ├── CustomerTable.tsx                  PrimeReact DataTable in vendor's
│   │                                      `custom-datatable` card; portal-rendered
│   │                                      action menu; vendor `dt-paging-button` footer
│   ├── CustomerViewDialog.tsx             read-only labeled grid + Edit/Delete/Close
│   ├── CustomerFormDialog.tsx             create + edit, RHF + Zod, inline errors
│   └── CustomerDeleteDialog.tsx           small modal confirm
├── lib/
│   └── toast.ts                           react-hot-toast wrapper
├── pages/
│   └── CustomersPage.tsx                  page assembly + URL state
└── types/
    └── customer.ts                        Customer, Input, list params
```

Plus `App.tsx` mounts `<Toaster {...toasterOptions} />` once at app root.

## Patterns established (locked)

### Vendor mapping
- Table list → vendor `users.tsx` + `dataTable.tsx` (PrimeReact wrapper, vendor's `custom-datatable` card)
- Form-in-modal → vendor `userModal.tsx` (label + `form-input` + grid + Cancel/Save footer)
- View modal → centered modal, two-column labeled rows, vendor `bg-success-50/text-success` status pill
- Delete modal → small variant of vendor `bg-white border border-border-color rounded-lg`
- All four dialogs use the same `Dialog` primitive (Radix slots + vendor classes)

### Page state machine (CustomersPage.tsx)
```ts
const [viewingId, setViewingId] = useState<string | null>(null)
const [editing,   setEditing]   = useState<Customer | null>(null)
const [creating,  setCreating]  = useState<boolean>(false)
const [deleting,  setDeleting]  = useState<Customer | null>(null)

// `viewing` is DERIVED from rows.find(r => r.customerID === viewingId).
// Always reflects fresh server data after mutations refetch the list.
```

Transitions:
| Trigger | Effect |
|---|---|
| Click row name | `setViewingId(row.customerID)` |
| ⋮ Edit | `setEditing(row)` (skips View) |
| ⋮ Delete | `setDeleting(row)` (skips View) |
| View → Edit | `setViewingId(null); setEditing(row)` |
| View → Delete | `setViewingId(null); setDeleting(row)` |
| Form save → success | `toast.success(...); close form; query invalidates` |
| Delete confirm → success | `toast.success(...); close; query invalidates` |

### URL-driven list state
```
/customers?page=1&limit=20&sort=name&order=asc&search=acme
```
- 300 ms debounce on search
- `placeholderData: (prev) => prev` keeps current page visible during refetch
- Page-size dropdown: `[10, 20, 50, 100]`, default 20

### Validation
- RHF `mode: 'onTouched'` — first blur triggers validation, then real-time
- Field error: vendor `border-danger` swap on input + `<p className="mt-1 text-xs text-danger">`
- Backend errors mapped via `mapBackendErrors()`:
  - 409 → `setError('name', { ... })` (duplicate)
  - 422 → iterate `error.details`, set per-field
  - other → root error / banner

### Toast feedback
- `toast.success('Customer "X" created')` past-tense, names the record
- `toast.error('Failed to delete customer: ...')` for mutation failures
- Inline field errors stay inline — toasts are for action outcomes, not validation

### Cursor + cosmetics
- Action menu rendered via `createPortal` to escape table's `overflow-x-auto`
- Modal overlay z-index `10000` (above sidebar's `9999`)
- Status pills: `bg-success-50 text-success border-success` (Active) / gray (Inactive)

### Loading state
- Initial load (no rows yet) → 5 skeleton rows (animate-pulse bars sized per column)
- Background refetch (sort/page/search) → thin `h-1` indeterminate progress bar at top of card, sliding via `progress` keyframe in `src/styles/custom/utilities.css`
- Driven by TanStack Query `isLoading` (initial) vs `isFetching` (any). Pass both as props.
- Don't use PrimeReact's built-in `loading` prop.

### Form submit feedback
- Submit button: `Add Customer` / `Update Customer` → spinner + `Saving...` while pending
- All inputs disabled via `<fieldset disabled={isSubmitting} className="contents">`
- Modal stays open until response

### Delete confirm feedback
- Confirm button: `Delete` → spinner + `Deleting...` while pending
- Cancel disabled while delete in flight

### CSS / build gotchas solved
- `src/main.tsx`: `@/styles/globals.css` MUST import before PrimeReact CSS or Tailwind v4's `@layer base` preflight wipes Lara's row borders (cascade-layer ordering bug). Don't reorder.
- No `stripedRows` on DataTable — vendor doesn't have them.
- `responsiveLayout="scroll"` is deprecated but vendor uses it; we keep it.

### Backend update path
- All PUT controllers call `instance.auditedUpdate(payload, userId)` not `instance.update(...)`
- See `/docs/decisions/ADR-backend-audited-update-pattern.md`

## Replication strategy (for the next 9 master-data pages)

**Principle**: Don't innovate during replication. Match Customer pattern
exactly. Only swap data fields and entity-specific validation.

### What changes per entity
- Field names (per backend schema in `<entity>.validation.js`)
- Validation rules (mirror the backend Zod)
- Table columns (which fields show)
- View dialog field display
- Form dialog input fields
- Entity-specific labels and breadcrumb

### What STAYS the same
- Overall component structure and file layout
- Table card wrapper (`bg-white rounded-md border border-border-color custom-datatable`)
- Search position (inside table card header, right side)
- Pagination footer (vendor's `dt-length` / `dt-paging-button` / `dt-info` 3-col grid)
- Modal styling (Radix + vendor classes)
- Toast messages format
- Page state machine
- URL-driven list state
- Customer-scope handling
- All vendor classes used in Customer

### Open question for tomorrow
A) Build each page manually (slower, more controlled), or
B) Write a generator script that reads `<entity>.validation.js` and emits
   the eight files with the same shape (faster, prevents drift).

Stakeholder decision pending.

Full template spec: `/docs/patterns/master-data-page.md`.

## Decisions log
- ADR-frontend-theme-integration — vendor as first-class layer
- ADR-frontend-tenant-branding — two-logo sidebar (product + customer)
- ADR-backend-audited-update-pattern — `auditedUpdate` for user-edits

## Backend dependencies
- All 10 master-data REST APIs ✅ (Module 01 complete)
- JWT auth + customer-scope middleware ✅ (Module 02 complete)
