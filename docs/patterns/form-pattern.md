# Form pattern (LOCKED)

Locked rules for every React Hook Form (RHF) + Zod form in this codebase.
These close a class of silent-failure bugs where a user clicks Save and
nothing visible happens.

The five rules below operate as **layers**. They look redundant in
isolation; in practice each catches a different leak path. Skipping any
one re-opens a "dead button" / "form blanks" / "row missing" failure mode.

| # | Rule | Layer | Failure it prevents |
|---|------|-------|---------------------|
| 1 | `handleSubmit` MUST have `onInvalid` | Frontend validation | Silent submit when Zod rejects |
| 2 | FKSelect onChange uses `\|\|` not `??` | Frontend wiring | Empty string poisoning a UUID Zod field |
| 3 | Mutation onError MUST surface backend errors via `handleApiError` | Frontend → Backend bridge | Backend 422 / 500 messages getting swallowed |
| 4 | Form state preservation via `useFormSeed` | Form lifecycle | Save-failure re-render wiping user input + banner |
| 5 | Nullable FK `belongsTo` includes use `required: false` | Backend | INNER JOIN silently dropping rows whose FK is null |

## Locked Rule: `handleSubmit` MUST have `onInvalid`

Every `handleSubmit(...)` call MUST pass an `onInvalid` callback as the
second argument. A bare `handleSubmit(onSuccess)` silently no-ops on
validation failure — the user sees a dead Save button with no feedback,
no inline error, no toast, no console output. This is the worst-possible
UX failure mode and it has bitten this codebase repeatedly.

Use the shared utility from `frontend/src/utils/formErrors.ts`:

```typescript
import { createInvalidHandler } from '@/utils/formErrors'

const onSubmit = handleSubmit(
  async (values) => { /* save logic */ },
  createInvalidHandler('YourFormName', setError),
)
```

The handler:
1. `console.warn`s the errors object (useful in browser devtools when
   debugging cross-field rules).
2. Sets `errors.root` to a human-readable summary (e.g.
   `"Fix highlighted fields below: testID: Test is required;
   code: Required"`) so the top-of-form banner renders.

The form MUST also render `<FormErrorBanner error={errors.root} />`
inside the form body. Place it as the first child of the 12-col grid:

```tsx
import { FormErrorBanner } from '@/components/ui/FormErrorBanner'

<form id="my-form" onSubmit={onSubmit} noValidate>
  <fieldset disabled={isSubmitting} className="contents">
    <div className="grid md:grid-cols-12 gap-4">
      <FormErrorBanner error={errors.root} />
      {/* fields ... */}
    </div>
  </fieldset>
</form>
```

The banner uses vendor `danger-*` color tokens so it flips correctly
in dark mode. Don't open-code a `bg-red-50` banner per form.

For non-grid layouts (e.g. ProfileInfoCard, OcmElementFormDialog with
section headings), pass `className=""` and wrap the banner in your own
margin/spacing.

For pages that already display API errors via local state
(`apiError`, `bannerError`), reuse that surface — call
`summarizeFormErrors(errs)` from the onInvalid callback and route it
through the same `setApiError` / `setBannerError` setter. Don't run
two banners side-by-side.

## Locked Rule: FKSelect / EnumSelect onChange uses `||` not `??`

`FKSelect` (`@/components/ui/FKSelect`) and its sibling `EnumSelect`
emit `string | null` from `onChange`. Callers MUST normalize the
payload with the `||` (logical OR) operator, not `??` (nullish
coalescing):

```typescript
// String field with empty-string sentinel:
onChange={(v) => field.onChange(v || '')}

// Nullable field (`string | null`):
onChange={(v) => field.onChange(v || null)}
```

NEVER use `??`:
- `v ?? null` only handles `null`/`undefined`. If anything else falsy
  ever reaches the callback (e.g. `''` from a future wrapper bug),
  it passes through unchanged.
- `v ?? ''` would convert `null` (cleared select) to `''`, then a
  Zod `.uuid().nullable()` schema rejects `''` with "Invalid uuid"
  — and without `onInvalid` the rejection was silent.

Same applies when coercing values right before the API call:

```typescript
const input = {
  defaultUnitID: data.defaultUnitID || null,   // '' → null
  formulaSlug: data.formulaSlug || null,       // '' → null
}
```

## Locked Rule: mutation `onError` MUST surface backend errors

Every form catch block MUST route the mutation error through
`handleApiError(err, setError, formName, options)`. Without this,
backend 422 envelopes (and the per-field messages they carry) get
swallowed — the user sees a dead button or a generic banner that omits
the real cause.

```typescript
import { handleApiError } from '@/utils/formErrors'

const KNOWN_FIELDS = ['name', 'email', 'role', 'isActive'] as const

try {
  await create.mutateAsync(input)
} catch (err) {
  handleApiError(err, setError, 'UserFormDialog', {
    knownFields: KNOWN_FIELDS,    // shallow paths bind inline
    conflictField: 'email',       // 409 with no errors[] → bind here
  })
}
```

What it does:

1. Shallow paths (`name`, `email`) listed in `knownFields` bind via
   `setError(field, ...)` so the error appears inline beneath that
   input.
2. Deep paths (`measurements.0.unit`) and unknown top-level fields
   fold into the root banner with full path so nothing is silently
   dropped.
3. 409 with no `errors[]` array binds to `conflictField` (typical
   "duplicate name/code/email" UX). Falls back to the root banner if
   no `conflictField` is provided.
4. Anything that isn't a recognizable LIMS error envelope falls back
   to a generic `'An unexpected error occurred'` so the banner is
   never blank.

The `errors[].field` shape comes from
`backend/src/middleware/errorHandler.js#formatZodIssues` (dot-joined
path). The frontend extractor handles both this shape and the legacy
`path: []` array shape, so backend changes don't silently break form
binding.

NEVER write a bespoke `mapBackendErrors` per form. The 14 per-form
helpers that existed before 2026-05-09 read `detail.path?.[0]`, but the
backend only emits `detail.field`. Every 422 fell through to the root
banner and per-field binding was dead code. Use the shared utility.

## Locked Rule: form state preservation via `useFormSeed`

Naive `useEffect(() => { reset(...) }, [open, mode, ...])` re-fires
whenever the parent passes a fresh `mode` literal — and parents
typically build a fresh literal on every render. After a save failure
the parent re-renders, the effect fires, and `reset()` wipes:

- The user's in-progress edits.
- The `errors.root` banner that `handleApiError` just set.
- Any nested-row state (measurements, items, attachments).

Use `useFormSeed` instead — it ref-gates the seed call so it only
fires when the entity identity changes:

```typescript
import { useFormSeed } from '@/utils/formErrors'

useFormSeed({
  active: open,
  id: isEdit ? mode.customer.customerID : null,
  seed: () => reset(isEdit ? valuesFromCustomer(mode.customer) : DEFAULTS),
})
```

When `active` flips false (modal closes), the internal "last seeded"
key resets so the next open always reseeds. The `seed` callback is
captured via a ref so it doesn't have to be `useCallback`-stable.

For forms with side effects beyond `reset()` (UserFormDialog clears
photo state; UserResetPasswordDialog clears multiple `useState`
slots), put them inside the same `seed` callback. They'll fire on
identity change, not on incidental re-renders.

## Locked Rule: nullable FK `belongsTo` MUST set `required: false`

Sequelize generates an INNER JOIN by default for any `include` of a
`belongsTo` association. When the FK column allows null, INNER JOIN
silently drops rows whose FK is null. Symptom: GET endpoint returns
fewer rows than the DB has — but only for entities a tester is
unlikely to create with a null FK.

Same trap fires when the included entity has a `defaultScope` (every
LIMS master-data model has `defaultScope: { isDeleted: false }`):
INNER JOIN against the scoped table drops rows whose related entity
is soft-deleted, even if the local FK is non-null.

```js
// WRONG — drops users without a customer (admin/staff have null FK).
include: [{ model: db.Customer, as: 'customer' }]

// RIGHT — keeps every user, customer info appears as null when absent.
include: [{
  model: db.Customer,
  as: 'customer',
  attributes: ['customerID', 'name'],
  required: false,
}]
```

Apply `required: false` whenever EITHER:

1. The FK column is `allowNull: true`, OR
2. The target model has a `defaultScope` AND the parent should still
   appear when the related row is filtered by that scope.

Audit by `grep -rn "include:" backend/src/modules/`. The current
audit (2026-05-09) found 13 includes — all 4 cases that need
`required: false` are correctly wired (User → Customer, User →
Attachment in `user.controller.js`; UserActivity → User, manual
AuditLog → User in `dashboard.service.js`). Future modules MUST
re-run the audit when adding includes.

## Why these rules exist

The RHF + Zod + FKSelect combination has a silent-failure mode when
all three of these hold:

1. FKSelect emits `null` (or — historically — `''`) when cleared.
2. Zod's `.uuid()` rejects `''` for a non-nullable UUID field, OR
   rejects `null` for a non-nullable field.
3. `handleSubmit` was given no `onInvalid` callback, so RHF silently
   no-ops the click.

Result: user clicks Save, nothing happens, no banner, no toast, no
network request. Three forms in this repo had this exact bug latent
before the 2026-05-08 sweep.

The five locked rules above close every leak path:

- onInvalid + root banner — validation failure ALWAYS surfaces.
- `||` normalization — no falsy ghost values leak between layers.
- `handleApiError` — backend errors are NEVER swallowed.
- `useFormSeed` — save-failure re-renders preserve user input + banner.
- `required: false` on nullable FK includes — GET endpoints don't
  silently drop rows.

Apply consistently across all forms — including future modules
(Quotes, Samples, Reports, etc.).

## Reference

- `frontend/src/utils/formErrors.ts` — `summarizeFormErrors`,
  `createInvalidHandler`, `handleApiError`, `useFormSeed`.
- `frontend/src/components/ui/FormErrorBanner.tsx` — root banner.
- `frontend/src/components/ui/FKSelect.tsx` — base FK dropdown.
- `frontend/src/features/customers/CustomerFormDialog.tsx` — minimal
  reference form following all five rules.
- `backend/src/middleware/errorHandler.js` — error envelope shape
  consumed by `handleApiError`.
