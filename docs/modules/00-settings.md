# Module 00 — Settings

Lab-agnostic, key/value configuration store. Built BEFORE the starter
template is harvested so every project derived from this codebase
inherits a working settings module out of the box. Replaces the
hardcoded `tenant.ts` config with a runtime-editable surface.

## What it does

- Single `Settings` table; one row per setting; categorized as
  `tenant` / `localization` / `system` / `workflow`.
- In-memory cache on the server, refreshed on every write — hot-path
  reads (`max_login_attempts` on every login attempt) cost zero DB
  queries.
- Public sub-endpoint (`/api/settings/public`) returns a curated subset
  with embedded image dataUrls so the unauth login page can render the
  lab name + logo before the user signs in.
- `/settings` page in-app: ADMIN-only, left-rail nav, four forms.
  Non-admins see a "Settings are restricted" card.

## Schema

`Settings` table:

| Column | Type | Notes |
|---|---|---|
| `settingID` | UUID PK | |
| `category` | VARCHAR(50) | `tenant` / `localization` / `system` / `workflow`. |
| `settingKey` | VARCHAR(100) | Stable identifier; backend code reads by this key. |
| `value` | TEXT NULL | Always stored as text; coerced on read. |
| `valueType` | ENUM | `STRING / NUMBER / BOOLEAN / JSON / IMAGE`. |
| `displayLabel` | VARCHAR(200) | UI label. |
| `description` | TEXT NULL | UI help text. |
| `isPublic` | BOOLEAN | Returned by `/public` (lab name, logo, short name, website). |
| `isEditable` | BOOLEAN | When `false`, PUT returns 403; UI renders disabled w/ "System" badge. |
| `displayOrder` | INTEGER | Per-category sort. |
| audit fields | createdBy / updatedBy / timestamps | |

Indexes:
- Unique `(category, settingKey)`.
- `(category, isPublic)` for fast `/public` and per-category fetches.

`IMAGE` rows store an `Attachments.attachmentID` UUID as their value.
The lab logo follows the existing Attachment pattern: hard-delete on
replace inside one transaction.

## Endpoints

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/settings/public` | none | Used by SettingsContext on app boot. IMAGE rows include `attachment.dataUrl`. |
| GET | `/api/settings` | ADMIN | All rows, ordered by category + displayOrder. |
| GET | `/api/settings/category/:category` | ADMIN | Per-category. |
| GET | `/api/settings/:settingKey` | ADMIN | Single. |
| PUT | `/api/settings/:settingKey` | ADMIN | `{ value }`. 403 if `isEditable=false`. |
| PUT | `/api/settings/bulk` | ADMIN | Flat `{ key: value, ... }`. |
| POST | `/api/settings/lab-logo` | ADMIN | multipart `file`. Replaces and hard-deletes prior. |

## Backend cache

`services/settingsService.js`:

- Lazy-requires the `db` model index (avoids the circular dep where
  `User.js → settingsService → db → User.js` would leave
  `db.Setting` undefined at module-load time).
- `initSettingsCache()` runs at server boot, BEFORE the HTTP listener
  binds — `auth.controller.login` reads `max_login_attempts` on every
  failed attempt. A cold cache would fall back to hardcoded defaults;
  acceptable, but boot-loading is preferred.
- `refreshCache()` is invoked by `updateSetting` and `bulkUpdate` after
  every write, so the next read is current.
- `getSetting(key, fallback)` is the typed accessor (handles
  STRING / NUMBER / BOOLEAN / JSON; IMAGE returns the attachmentID).
  Always returns `fallback` on cache miss / parse failure — hot paths
  must pass a sane fallback so a settings outage never blocks auth.

**Cache scope is per Node process.** Single backend today, so this is
correct. To scale horizontally: swap to Redis with PUB/SUB
invalidation, or extend the writer to broadcast invalidation across
processes. Intentionally deferred until needed.

## Live system settings (wired)

Settings whose value is read at runtime:

| Key | Reader | Fallback |
|---|---|---|
| `max_login_attempts` | `User.registerFailedLogin` (models/User.js) | `5` |
| `account_lockout_minutes` | `User.registerFailedLogin` | `30` |
| `max_attachment_size_kb` | `middleware/uploadImage.js#single` (post-multer check) | `500` |

Multer's `limits.fileSize` is set at instance creation time, so we keep
a 5 MB hard ceiling there and enforce the live setting in a wrapper
that runs after multer has parsed the file.

## Stored-only settings (not yet wired)

| Key | Will be read by |
|---|---|
| `session_timeout_minutes` | Future idle-timeout middleware. |
| `password_min_length` | Future password validator. |
| `sample_serial_format` | Sample Intake module. |
| `report_number_format` | Reports module. |
| `default_quote_validity_days` | Quotes module. |
| `default_tax_rate_code` | Quotes / Invoices form pre-selection. Synced atomically by `PUT /api/tax-rates/:id/set-default`. |
| `bank_name`, `bank_branch`, `bank_account_number`, `bank_iban` | Invoice / Quote PDF footer. All `isPublic=false` (admin-only read). |

The forms render these with no special UI; admins can edit values that
are editable. `sample_serial_format` and `report_number_format` are
`isEditable=false` until the consuming modules ship — preserves the
contract.

## Frontend

```
src/types/settings.ts
src/api/settings.ts
src/contexts/SettingsContext.tsx        # provides labName / labShortName / labLogoDataUrl / get(key, fallback)
src/features/settings/
  queries.ts                            # useAllSettings / usePublicSettings / useSettingsByCategory / mutations
  SectionFormFrame.tsx                  # vendor card frame + Cancel/Save footer + Subsection band
  SettingsRail.tsx                      # 4-item left rail
  LabInformationForm.tsx
  LocalizationForm.tsx
  SystemSettingsForm.tsx
  WorkflowDefaultsForm.tsx
  currencyOptions.ts                    # 15 curated currencies
  timezoneOptions.ts                    # Intl.supportedValuesOf('timeZone')
  dateFormatOptions.ts
src/pages/SettingsPage.tsx              # ADMIN-only; URL: /settings?section=lab|localization|system|workflow
src/features/attachments/queries.ts     # NEW useAttachment(id) for the logo preview on /settings
```

### Vendor reference

`vendor/src/pages/settings/{general-settings, security-settings,
notification}` — each is a separate route in vendor's app. Layout
inside is identical: an 8/12 centered card with vendor's `border-b`
section bands and a Cancel/Save Changes footer. We collapse the four
routes into one `/settings` page with a left rail (URL-driven via
`?section=`) so admins click "Settings" once and switch sections in
place.

### SettingsContext

- Boots on `<App>` mount via `usePublicSettings`.
- Exposes `labName`, `labShortName`, `labWebsite`,
  `labLogoAttachmentID`, `labLogoDataUrl` for direct use, plus a
  generic `get<T>(key, fallback)` for any other public key.
- `labLogoDataUrl` is read from the embedded `attachment` field on the
  IMAGE row — no second authed fetch needed on the login page.
- Admin saves invalidate `settingsKey.public` in TanStack, which
  re-runs `usePublicSettings` and triggers a re-render of the Header
  + Sidebar.

### Logo upload flow

1. User picks a file via `<AttachmentUpload>` in `LabInformationForm`.
2. On Save: `useUploadLabLogo` POSTs `/api/settings/lab-logo`.
3. Backend wraps in a transaction:
    - Insert new Attachment.
    - Read previous `lab_logo_attachment_id` setting value.
    - Update the setting to the new attachment ID.
    - Hard-delete the previous attachment (if any).
4. `refreshCache()` rebuilds the in-memory cache.
5. Frontend invalidates `settingsKey.public`; Header + Login pick up
   the new dataUrl on next paint.

## Locked patterns

- Lab name / short name / logo come from `useTenantSettings()`. Never
  hardcode again. The deleted `src/config/tenant.ts` is gone for good.
- Header user-dropdown shows the **Settings** link only when
  `user.role === 'ADMIN'`.
- Sidebar Administration section now lists Users + Settings.
- New "system" settings that need runtime behavior MUST add a
  `getSetting(key, fallback)` reader in the consumer + document the
  fallback here.

## Verified end-to-end (2026-04-28)

- `GET /api/settings/public` (unauth) returns 4 public rows + logo
  dataUrl when present.
- `GET /api/settings` (ADMIN) returns 27 rows across 4 categories;
  403 for non-admins.
- `PUT /api/settings/:key` updates + refreshes cache; the next
  `/public` read reflects the change.
- `PUT /api/settings/sample_serial_format` (isEditable=false) → 403
  with the canonical AppError message.
- Live `max_login_attempts` test: set to 3, fresh user, 4th wrong
  password → "Account locked until …" (was 5 attempts before).
- `POST /api/settings/lab-logo` → 201 + dataUrl visible in the next
  `/public` payload. Replace returns 201; previous attachment
  hard-deleted in the same transaction.
- Frontend `tsc --noEmit` clean. Vite compile-on-demand returns 200
  for every settings module file.

## References

- Postman: `docs/postman/Settings.postman_collection.json`
- ADRs reused: `ADR-attachments-storage-strategy.md`,
  `ADR-frontend-theme-integration.md`,
  `ADR-async-local-storage-request-context.md`
- Vendor: `frontend/vendor/src/pages/settings/`
