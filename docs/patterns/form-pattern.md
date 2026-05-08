# Form pattern (LOCKED)

Locked rules for every React Hook Form (RHF) + Zod form in this codebase.
These close a class of silent-failure bugs where a user clicks Save and
nothing visible happens.

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

The two locked rules above close every leak path:

- onInvalid + root banner = validation failure ALWAYS surfaces.
- `||` normalization = no falsy ghost values leak between layers.

Apply consistently across all forms — including future modules
(Quotes, Samples, Reports, etc.).

## Reference

- `frontend/src/utils/formErrors.ts` —
  `summarizeFormErrors` + `createInvalidHandler`.
- `frontend/src/components/ui/FormErrorBanner.tsx` — root banner.
- `frontend/src/components/ui/FKSelect.tsx` — base FK dropdown.
- `frontend/src/features/customers/CustomerFormDialog.tsx` — minimal
  reference form following both rules.
