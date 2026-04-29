# Module 00 — Attachments

## Status: ✅ COMPLETE (2026-04-28)

## Purpose

File storage for small images (user photos, customer logos, equipment
images). Database-only via base64 encoding — no filesystem, no S3.
Filesystem storage will be added when test result PDFs land (separate
table, separate decision; see ADR-attachments-storage-strategy).

---

## Schema

### `Attachments` table

| Column | Type | Notes |
|---|---|---|
| `attachmentID` | UUID PK | UUIDv4 |
| `fileName` | VARCHAR(255) | Original filename — display + download hint |
| `mimeType` | VARCHAR(100) | `image/jpeg \| image/png \| image/webp` |
| `fileSize` | INTEGER | Raw bytes (pre-base64) — UI shows "245 KB" |
| `fileData` | TEXT | Base64-encoded body (no `data:` prefix) |
| `createdBy` | UUID NULL | audit (set by hook from `options.userId`) |
| `updatedBy` | UUID NULL | audit (set by hook) |
| `createdAt`, `updatedAt` | DATE | timestamps |

**Deliberately omitted**: `isDeleted`, `deletedAt`, `deletedBy`, `isActive`.
Attachments are file storage, not business records — replacement = hard
delete. Audit trail of "what photo did this user have" lives on the
parent entity (User.updatedAt + auditedUpdate).

### Direct FK from owning entity

Owning entities reference attachments via a nullable UUID column with
`ON DELETE SET NULL`:

```sql
ALTER TABLE "Users"
  ADD COLUMN "profilePhotoAttachmentID" UUID NULL
  REFERENCES "Attachments"("attachmentID")
  ON UPDATE CASCADE ON DELETE SET NULL;
```

Future entities follow the same pattern (`Customer.logoAttachmentID`,
`Equipment.mainPhotoAttachmentID`). For multi-attachment entities use a
junction table (`belongsToMany`) — no need to add a polymorphic shortcut.

### Sequelize associations

```js
User.belongsTo(Attachment, {
  as: 'profilePhoto',
  foreignKey: 'profilePhotoAttachmentID',
})
```

The inverse (`Attachment.hasOne(User)`) is **deliberately omitted** — the
attachment table never queries upward. Each owner declares its own
association as needed.

---

## API

### Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/attachments` | ADMIN, MANAGER | `multipart/form-data` field `file`. Returns the new row incl. VIRTUAL `dataUrl`. |
| GET | `/api/attachments/:attachmentID` | requireJwtAuth | Single attachment incl. `dataUrl`. Rare — most reads come via parent include. |
| DELETE | `/api/attachments/:attachmentID` | ADMIN, MANAGER | Hard delete. |

The owner relationship is **set on the parent entity's PUT, not via
a special endpoint**:

- `PUT /api/users/:userID` body accepts `profilePhotoAttachmentID: string | null`.

### Multer

- Storage: in-memory (`multer.memoryStorage()`).
- Max file size: 500 KB (`limits.fileSize = 500 * 1024`).
- MIME whitelist: `image/jpeg`, `image/png`, `image/webp`.
- Errors are reshaped from `MulterError` to our `AppError` envelope so the
  global error handler renders JSON. See `middleware/uploadImage.js`.

### `dataUrl` VIRTUAL

The model exposes a server-computed `dataUrl` getter:

```js
dataUrl: {
  type: DataTypes.VIRTUAL,
  get() {
    if (!this.fileData || !this.mimeType) return null
    return `data:${this.mimeType};base64,${this.fileData}`
  },
}
```

Sequelize 6 `toJSON()` serializes VIRTUAL but **not** `getterMethods`
(verified empirically for Equipment.calibrationStatus). VIRTUAL is the
correct primitive.

---

## Replace semantics — HARD DELETE

When a parent entity's FK changes from one attachment to another (or to
null), the parent controller wraps the operation in a transaction:

```js
const photoChanging =
  'profilePhotoAttachmentID' in body
  && body.profilePhotoAttachmentID !== user.profilePhotoAttachmentID
const oldPhotoID = photoChanging ? user.profilePhotoAttachmentID : null

await db.sequelize.transaction(async (t) => {
  await user.auditedUpdate(body, req.user.userID, { transaction: t })
  if (oldPhotoID) {
    await db.Attachment.destroy({
      where: { attachmentID: oldPhotoID },
      transaction: t,
    })
  }
})
```

Old attachment row is **physically removed**. The user's pointer flips
atomically with the destroy in the same transaction. If the destroy
fails, the FK update rolls back too. No orphans.

---

## Auth response shape

`POST /api/auth/login`, `GET /api/auth/me`, and `POST /api/users` all
include `profilePhoto` in the User payload via Sequelize `include`:

```js
include: [
  { model: db.Customer, as: 'customer', attributes: ['customerID', 'name'], required: false },
  { model: db.Attachment, as: 'profilePhoto', required: false },
]
```

`required: false` is **mandatory** — see CLAUDE.md "Backend belongs-to
include rule" (caught the LEFT-vs-INNER-JOIN trap on Customer 2026-04-28).

---

## Frontend

### Components

- `src/components/ui/AttachmentUpload.tsx` — vendor's dashed-box visual
  + real drag-and-drop event handlers + client-side MIME/size validation.
  "Uncontrolled" with respect to upload: gives caller the picked `File` via
  `onSelect` and previews it via `URL.createObjectURL`. Caller decides
  when to upload.
- `src/components/ui/Avatar.tsx` — image-or-initials circle. Reads
  `photo?.dataUrl`, falls back to two-letter initials in primary color.
  Sized via `size: 'sm' | 'md' | 'lg'` prop.

### API + queries

- `src/api/attachments.ts` — `uploadAttachmentApi(file)` (multipart),
  `getAttachmentApi(id)`, `deleteAttachmentApi(id)`.
- `src/features/attachments/queries.ts` — `useUploadAttachment`,
  `useDeleteAttachment`. Mutation-only — no list cache (attachments are
  always read via parent include).

### Deferred upload flow (form integration)

The owner form keeps two pieces of local state outside RHF:
`pendingFile: File | null` and `photoCleared: boolean`. On submit:

1. Save the owner (POST or PUT) → returns the persisted record.
2. If `pendingFile`: POST `/api/attachments` → PUT owner with
   `profilePhotoAttachmentID = att.attachmentID`.
3. Else if `photoCleared` and the owner had a photo: PUT owner with
   `profilePhotoAttachmentID = null`.

If step 2 or 3 fails, the owner save is **already committed** — we toast
a partial-success warning ("User saved, but photo failed: ...") and
leave the FK at its old value. The user can retry via Edit.

---

## Files

```
backend/
├── src/
│   ├── migrations/
│   │   ├── 20260428100000-create-attachments-table.js
│   │   └── 20260428100001-add-user-profile-photo.js
│   ├── models/
│   │   ├── Attachment.js              NEW
│   │   └── User.js                    EDIT (+profilePhotoAttachmentID, +association)
│   ├── middleware/uploadImage.js      NEW (multer + AppError reshape)
│   └── modules/
│       ├── attachment/                NEW (controller, routes, validation)
│       ├── user/user.controller.js    EDIT (include + transaction + hard-delete)
│       ├── user/user.validation.js    EDIT (PUT accepts profilePhotoAttachmentID)
│       └── auth/auth.controller.js    EDIT (login + me include profilePhoto)
└── app.js                             EDIT (mount /api/attachments)

frontend/
├── src/
│   ├── api/attachments.ts             NEW
│   ├── types/attachment.ts            NEW
│   ├── types/user.ts                  EDIT (+profilePhoto)
│   ├── features/
│   │   ├── attachments/queries.ts     NEW
│   │   └── users/UserFormDialog.tsx   EDIT (deferred upload integration)
│   ├── features/users/UserTable.tsx   EDIT (avatar in name column)
│   ├── features/users/UserViewDialog.tsx  EDIT (large avatar in header)
│   └── components/ui/
│       ├── Avatar.tsx                 NEW
│       └── AttachmentUpload.tsx       NEW
```

---

## Smoke verification (2026-04-28)

curl against the live backend, all green:

| Step | Check |
|---|---|
| POST `/api/attachments` (multipart, 1×1 PNG) | 201, returns `dataUrl` |
| PUT `/api/users/:id` with `profilePhotoAttachmentID = ATT1` | user.profilePhoto populated |
| PUT `/api/users/:id` with `profilePhotoAttachmentID = ATT2` (replace) | new ID set, GET ATT1 → 404 (hard-deleted) |
| PUT `/api/users/:id` with `profilePhotoAttachmentID = null` (remove) | user.profilePhoto = null, GET ATT2 → 404 |
| GET `/api/users` (list) | rows include `profilePhoto.dataUrl` |
| GET `/api/auth/me` | response includes `profilePhoto` |
| POST `/api/auth/login` | response user includes `profilePhoto` |

Final attachment row count after cleanup: 0.

## Related ADRs

- **ADR-attachments-storage-strategy** — DB-only now, filesystem when
  test-result PDFs land
