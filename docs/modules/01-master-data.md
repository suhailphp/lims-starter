# Module 01 — Master Data

## Status: ✅ COMPLETE

## Purpose
Foundation data that all other modules depend on.
Must be completed before any operational module.

---

## Tables Summary (11 total)

| # | Table | Purpose |
|---|-------|---------|
| 1 | User | System users with roles |
| 2 | Customer | Lab clients |
| 3 | Category | Sample category (Diesel, Gasoil, Water, Engine Oil) |
| 4 | Unit | Measurement units per category |
| 5 | Test | Lab tests per category |
| 6 | Method | Testing methods per test (ASTM codes) |
| 7 | Specification | Standards like EN590, GSO 1052 |
| 8 | SourceType | OCM source types (Marine, Construction) |
| 9 | Source | OCM assets (vessels, sites, equipment) |
| 10 | Equipment | Lab instruments and thermometers |
| 11 | OcmElement | Wear metals and contaminants |

---

## Table Schemas

### 1. User
- userID (PK, UUID)
- firstName (VARCHAR 100, required)
- lastName (VARCHAR 100, required)
- email (VARCHAR 150, unique, required)
- password (VARCHAR 255, hashed, required)
- role (ENUM: ADMIN / RECEPTIONIST / TECHNICIAN / MANAGER / CUSTOMER)
- customerID (FK → Customer, nullable, only for CUSTOMER role)
- lastLoginAt (DATE)
- + audit fields

### 2. Customer
- customerID (PK, UUID)
- name (VARCHAR 200, required)
- address (TEXT)
- contactName (VARCHAR 100)
- contactEmail (VARCHAR 150, isEmail validation)
- contactPhone (VARCHAR 30)
- paymentTermsDays (INT, default 30)
- + audit fields

### 3. Category
- categoryID (PK, UUID)
- name (VARCHAR 100, required)
- type (ENUM: FUEL / LUBRICANT / WATER)
- + audit fields

### 4. Unit
- unitID (PK, UUID)
- categoryID (FK → Category)
- name (VARCHAR 100)
- symbol (VARCHAR 30)
- + audit fields

### 5. Test
- testID (PK, UUID)
- categoryID (FK → Category)
- name (VARCHAR 150)
- decimalPlaces (INT, default 2)
- resultType (ENUM: NUMERIC / TEXT / THRESHOLD)
- + audit fields

### 6. Method
- methodID (PK, UUID)
- testID (FK → Test)
- code (VARCHAR 50) — e.g. ASTM D93-25
- description (TEXT)
- isDefault (BOOLEAN)
- + audit fields

### 7. Specification
- specificationID (PK, UUID)
- name (VARCHAR 150) — e.g. EN590, GSO 1052
- + audit fields

### 8. SourceType
- sourceTypeID (PK, UUID)
- name (VARCHAR 100) — Marine / Construction / Industrial
- label (VARCHAR 50) — Vessel / Site / Unit (display label on report)
- + audit fields

### 9. Source
- sourceID (PK, UUID)
- sourceTypeID (FK → SourceType)
- customerID (FK → Customer)
- categoryID (FK → Category)
- sourceName (VARCHAR 200)
- equipmentName (VARCHAR 200)
- componentType (VARCHAR 100)
- model (VARCHAR 100)
- make (VARCHAR 100)
- + audit fields

### 10. Equipment
- equipmentID (PK, UUID)
- name (VARCHAR 150)
- model (VARCHAR 100)
- serialNumber (VARCHAR 100)
- calibrationDueDate (DATEONLY)
- + audit fields
- Virtual getter: calibrationStatus (VALID / DUE_SOON / OVERDUE)

### 11. OcmElement
- ocmElementID (PK, UUID)
- name (VARCHAR 100) — Iron, Copper, Silicon
- symbol (VARCHAR 10) — Fe, Cu, Si
- unit (VARCHAR 20, default 'ppm')
- normalRangeMin / normalRangeMax (DECIMAL 12,4)
- cautionRangeMin / cautionRangeMax (DECIMAL 12,4)
- criticalRangeMin / criticalRangeMax (DECIMAL 12,4)
- + audit fields

---

## Associations ImplementedUser
└── belongsTo → Customer (as customer)Customer
├── hasMany → User (as users)
└── hasMany → Source (as sources)Category
├── hasMany → Unit (as units)
├── hasMany → Test (as tests)
└── hasMany → Source (as sources)Unit
└── belongsTo → Category (as category)Test
├── belongsTo → Category (as category)
└── hasMany → Method (as methods)Method
└── belongsTo → Test (as test)SourceType
└── hasMany → Source (as sources)Source
├── belongsTo → SourceType (as sourceType)
├── belongsTo → Customer (as customer)
└── belongsTo → Category (as category)

---

## Standard Audit Fields (every table)createdBy    UUID (nullable)
createdAt    DATE (auto CURRENT_TIMESTAMP)
updatedBy    UUID (nullable)
updatedAt    DATE (auto CURRENT_TIMESTAMP)
deletedBy    UUID (nullable)
deletedAt    DATE (nullable)
isDeleted    BOOLEAN (default false)
isActive     BOOLEAN (default true)

---

## Default Scopes (every model)

```javascriptdefaultScope: {
where: { isDeleted: false }
}scopes: {
includeDeleted: {},
activeOnly: { where: { isDeleted: false, isActive: true } }
}

---

## Decimal Precision Rules

| Parameter | Decimal Places |
|-----------|---------------|
| Density @ 15°C | 4 |
| Viscosity @ 40°C | 3 |
| Flash Point | 0 |
| Sulphur Content | 0 |
| Default | 2 |

Precision stored per Test record (`decimalPlaces` field).

---

## Progress

### Backend
- [x] User migration + model
- [x] Customer migration + model + association
- [x] Category migration + model + association
- [x] Unit migration + model + association
- [x] Test migration + model + association
- [x] Method migration + model + association
- [x] Specification migration + model
- [x] SourceType migration + model + association
- [x] Source migration + model + associations (3)
- [x] Equipment migration + model
- [x] OcmElement migration + model
- [x] Health check verified
- [ ] Seed data (pending)
- [x] Validation middleware (Zod, see ADR-007)
- [x] Auth middleware — initially stub `X-User-ID` (ADR-006), replaced with `requireJwtAuth` + `applyCustomerScope` in Module 02 Phase 6 (2026-04-26). ADR-006 is now superseded by ADR-009.
- [x] Audit hooks (see ADR-005)
- [x] Customer email unique partial index migration
- [x] REST APIs (10/10 — all backend live; frontend shipped for all 10 on 2026-04-27)
  - [x] Customer — verified end-to-end in Postman (2026-04-25); frontend `/customers` shipped 2026-04-26 (template for all master-data pages)
  - [x] User — moved to Module 02 (Auth & User Management); see `/docs/modules/02-auth.md` Phase 5
  - [x] Category — verified end-to-end in Postman (2026-04-25); frontend `/categories` shipped 2026-04-27
  - [x] Unit — created 2026-04-25 (pending Postman verification); frontend `/units` shipped 2026-04-27
  - [x] Test — created 2026-04-25 (pending Postman verification); frontend `/tests` shipped 2026-04-27
  - [x] Method — verified end-to-end in Postman (2026-04-25); frontend `/methods` shipped 2026-04-27 (first form using textarea + isDefault sibling-flip transaction)
  - [x] Specification — verified end-to-end in Postman (2026-04-25); frontend `/specifications` shipped 2026-04-27
  - [x] SourceType — verified end-to-end in Postman (2026-04-25); frontend `/source-types` shipped 2026-04-27
  - [x] Source — verified end-to-end in Postman (2026-04-27); flat `/api/sources` + nested `/api/customers/:customerID/sources` both shipped
  - [x] Equipment — verified end-to-end in Postman (2026-04-25); frontend `/equipment` shipped 2026-04-27 (first form using `<DateTimePicker mode="date">`)
  - [x] OcmElement — verified end-to-end in Postman (2026-04-25); frontend `/ocm-elements` shipped 2026-04-27 (first form using Zod `superRefine` cross-field validation)

### Customer API
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/customers` | List with pagination, search (name/contactName/contactEmail), `isActive` filter, sort allowlist (`name`, `createdAt`, `updatedAt`) |
| GET | `/api/customers/:customerID` | Get one |
| POST | `/api/customers` | Create |
| PUT | `/api/customers/:customerID` | Update (full replace) |
| DELETE | `/api/customers/:customerID` | Soft delete |

All endpoints require `Authorization: Bearer <accessToken>` (JWT, ADR-009).
CUSTOMER-role users are scoped to their own `customerID`; CUSTOMER cannot
create customers (403). See `/docs/modules/02-auth.md` for login flow.
Postman collection: `/docs/postman/Customer.postman_collection.json`

Customer DELETE blocks with 409 if any non-deleted Users or Sources
reference the customer (Parent Deletion Policy — see api-conventions.md).

Nested children (nested route standard, see api-conventions.md):
- `GET/POST /api/customers/:customerID/users`
- `GET/POST /api/customers/:customerID/sources` ← **live**, also has flat sibling at `/api/sources`

### Category API
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/categories` | List with pagination, search (name), filter `type` (FUEL/LUBRICANT/WATER), filter `isActive`, sort allowlist (`name`, `type`, `createdAt`, `updatedAt`) |
| GET | `/api/categories/:categoryID` | Get one |
| POST | `/api/categories` | Create |
| PUT | `/api/categories/:categoryID` | Update (full replace) |
| DELETE | `/api/categories/:categoryID` | Soft delete — 409 if Units / Tests / Sources reference this category |

Migration `20260425000000-category-name-unique-partial-index.js` adds a
case-insensitive unique index on `LOWER(name)` for non-deleted rows
(soft-deleted "Diesel" can coexist with a fresh "Diesel").

Nested children (nested route standard, see api-conventions.md):
- `GET/POST /api/categories/:categoryID/units` ← **live** (Unit collection)
- `GET/POST /api/categories/:categoryID/tests` ← **live** (Test collection)

Postman collection: `/docs/postman/Category.postman_collection.json`

### Unit API
Dual-shape (same pattern as Source and Test):
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/units` | **Flat** list across all categories — pagination, search (name/symbol), filter `categoryID` / `isActive`, sort allowlist (`name`, `symbol`, `createdAt`, `updatedAt`). Includes `category` association. Used by master-data `/units` page. |
| POST | `/api/units` | **Flat** create — `categoryID` in body |
| GET | `/api/categories/:categoryID/units` | **Nested** list scoped to a category |
| POST | `/api/categories/:categoryID/units` | **Nested** create under category (verifies parent exists) |
| GET | `/api/units/:unitID` | Get one |
| PUT | `/api/units/:unitID` | Update (full replace) — does NOT accept `categoryID` |
| DELETE | `/api/units/:unitID` | Soft delete — no child checks yet (TODO when WorksheetTest/TestResult ship) |

Migration `20260425000001-unit-unique-partial-indexes.js` adds:
- `(categoryID, LOWER(name)) WHERE isDeleted = false` — same name allowed across different categories
- `(categoryID, LOWER(symbol)) WHERE isDeleted = false` — same symbol allowed across different categories

Postman collection: `/docs/postman/Unit.postman_collection.json`
Prereq: a valid Category UUID must be set as `categoryID` variable before running.

### Test API
Dual-shape (same pattern as Unit and Source):
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tests` | **Flat** list across all categories — pagination, search (name), filter `categoryID` / `resultType` / `isActive`, sort allowlist (`name`, `resultType`, `decimalPlaces`, `createdAt`, `updatedAt`). Includes `category` association. Used by master-data `/tests` page. |
| POST | `/api/tests` | **Flat** create — `categoryID` in body |
| GET | `/api/categories/:categoryID/tests` | **Nested** list scoped to a category (kept for future category-detail pages) |
| POST | `/api/categories/:categoryID/tests` | **Nested** create under category (verifies parent exists) |
| GET | `/api/tests/:testID` | Get one |
| PUT | `/api/tests/:testID` | Update (full replace) — does NOT accept `categoryID` |
| DELETE | `/api/tests/:testID` | Soft delete — 409 if Methods reference this test |

`decimalPlaces` validated as integer 0–6. Default 2.
`resultType` validated as `NUMERIC`, `TEXT`, or `THRESHOLD`. Default `NUMERIC`.

Postman collection: `/docs/postman/Test.postman_collection.json`

Migration `20260425000002-test-unique-partial-index.js` adds:
- `(categoryID, LOWER(name)) WHERE isDeleted = false`

Postman collection: `/docs/postman/Test.postman_collection.json`
Prereq: a valid Category UUID must be set as `categoryID` variable before running.

### Method API
Dual-shape (same pattern as Source, Unit, Test):
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/methods` | **Flat** list across all tests — pagination, search (code), filter `testID` / `isDefault` / `isActive`, sort allowlist (`code`, `isDefault`, `createdAt`, `updatedAt`). Includes nested `test` → `category` association. Used by master-data `/methods` page. |
| POST | `/api/methods` | **Flat** create — `testID` in body. Same `isDefault=true` transaction logic as nested route. |
| GET | `/api/tests/:testID/methods` | **Nested** list scoped to a test |
| POST | `/api/tests/:testID/methods` | **Nested** create under test (verifies parent exists). If `isDefault=true`, resets all other methods of same test to `isDefault=false` in a transaction. |
| GET | `/api/methods/:methodID` | Get one |
| PUT | `/api/methods/:methodID` | Update (full replace) — does NOT accept `testID`. Same isDefault transaction logic as create. |
| DELETE | `/api/methods/:methodID` | Soft delete — no child checks yet (TODO when downstream tables ship) |

Migration `20260425000003-method-unique-partial-index.js` adds:
- `(testID, LOWER(code)) WHERE isDeleted = false`

Postman collection: `/docs/postman/Method.postman_collection.json`
Prereq: a valid Test UUID must be set as `testID` variable before running.

### Specification API
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/specifications` | List with pagination, search (name), filter `isActive`, sort allowlist (`name`, `createdAt`, `updatedAt`) |
| GET | `/api/specifications/:specificationID` | Get one |
| POST | `/api/specifications` | Create |
| PUT | `/api/specifications/:specificationID` | Update (full replace) |
| DELETE | `/api/specifications/:specificationID` | Soft delete — no child checks yet (TODO when Worksheet ships) |

Migration `20260425000004-specification-unique-partial-index.js` adds:
- `LOWER(name) WHERE isDeleted = false`

Postman collection: `/docs/postman/Specification.postman_collection.json`

### SourceType API
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/source-types` | List with pagination, search (name/label), filter `isActive`, sort allowlist (`name`, `label`, `createdAt`, `updatedAt`) |
| GET | `/api/source-types/:sourceTypeID` | Get one |
| POST | `/api/source-types` | Create |
| PUT | `/api/source-types/:sourceTypeID` | Update (full replace) |
| DELETE | `/api/source-types/:sourceTypeID` | Soft delete — no child checks yet (TODO when Source API ships) |

Migration `20260425000005-source-type-unique-partial-index.js` adds:
- `LOWER(name) WHERE isDeleted = false` — drops plain `idx_source_types_name`, creates `idx_source_types_name_unique`

Postman collection: `/docs/postman/SourceType.postman_collection.json`

### Source API

Sources ship in **two route shapes** (added 2026-04-27 — see api-conventions.md
"Dual-shape exception" for the rationale). Pick by use case:

**Flat (master-data /sources page — global view across all customers):**
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/sources` | List across all customers — pagination, search (sourceName/equipmentName), filter `customerID`, `sourceTypeID`, `categoryID`, `isActive`, sort allowlist (`sourceName`, `equipmentName`, `createdAt`, `updatedAt`). Each row INCLUDES `customer`, `sourceType`, `category` (id + name) so the table can render names without extra round-trips. |
| POST | `/api/sources` | Create — `customerID` comes from the BODY. Validates all 3 FKs with explicit NotFoundError per FK. |

**Nested (customer-scoped — Sample Collection, Customer profile pages):**
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/customers/:customerID/sources` | List sources for a customer — same filters as flat list, minus `customerID` (it's in the URL). Does NOT include FK associations (the customer is implicit; sourceType/category names not needed in this context). |
| POST | `/api/customers/:customerID/sources` | Create — `customerID` comes from the URL. Same FK validations. |

**Single-record (flat, both shapes share these):**
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/sources/:sourceID` | Get one |
| PUT | `/api/sources/:sourceID` | Update (full replace). Validates sourceTypeID and categoryID FKs. **Cannot move a source between customers** — `customerID` is not in the update schema. |
| DELETE | `/api/sources/:sourceID` | Soft delete — no child checks yet (TODO when Worksheet/SampleIntake ships — Module 3) |

**CUSTOMER role scoping** (applied to all six routes via `applyCustomerScope` middleware):
- CUSTOMER's `req.scope.customerID` is auto-merged into the WHERE clause on every list query → they only see their own sources.
- CUSTOMER cannot read/update/delete a source belonging to another customer (403 via `ensureScopeMatches` in the controller).
- CUSTOMER cannot create a source for another customer — flat POST checks the body's `customerID` against scope; nested POST checks the URL's.
- Non-CUSTOMER roles (admin, lab manager, etc.) have empty scope → full access across all customers.

No unique constraint: a customer can have multiple sources with identical names (e.g. two vessels with same engine model).

Postman collection: `/docs/postman/Source.postman_collection.json` — covers both flat and nested shapes.
Prereqs: set `customerID`, `sourceTypeID`, `categoryID` variables before running.

### OcmElement API
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/ocm-elements` | List with pagination, search (name/symbol), filter `isActive`, sort allowlist (`name`, `symbol`, `createdAt`, `updatedAt`) — default sort `name asc` |
| GET | `/api/ocm-elements/:ocmElementID` | Get one |
| POST | `/api/ocm-elements` | Create — validates range logic (min ≤ max per band, normalMax ≤ cautionMin ≤ cautionMax ≤ criticalMin) |
| PUT | `/api/ocm-elements/:ocmElementID` | Update (full replace) — same range validation |
| DELETE | `/api/ocm-elements/:ocmElementID` | Soft delete — no child checks yet (TODO when OcmElementResult ships — Module 7) |

Migration `20260425000007-ocm-element-symbol-unique-partial-index.js` drops `idx_ocm_elements_symbol` and creates:
- `idx_ocm_elements_symbol_unique`: `LOWER(symbol) WHERE isDeleted = false`

Range validation uses `superRefine` — all cross-field errors are collected at once, each attached to the failing field's path.

Postman collection: `/docs/postman/OcmElement.postman_collection.json`
Requests 3 and 4 test range validation (min > max, and progression violation) — expect 422 with `errors[].field`.

### Equipment API
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/equipments` | List with pagination, search (name/serialNumber), filter `calibrationStatus` (VALID/DUE_SOON/OVERDUE/UNKNOWN), filter `isActive`, sort allowlist (`name`, `serialNumber`, `calibrationDueDate`, `createdAt`, `updatedAt`) |
| GET | `/api/equipments/:equipmentID` | Get one — includes virtual `calibrationStatus` |
| POST | `/api/equipments` | Create |
| PUT | `/api/equipments/:equipmentID` | Update (full replace) |
| DELETE | `/api/equipments/:equipmentID` | Soft delete — no child checks yet (TODO when TestResult ships — Module 5) |

`calibrationStatus` filter on LIST translates to DB-level `calibrationDueDate` range conditions (no JS post-filtering — pagination stays accurate).

Migration `20260425000006-equipment-serial-unique-partial-index.js` drops `idx_equipments_serial` (plain btree) and creates:
- `idx_equipments_serial_unique`: `LOWER(serialNumber) WHERE isDeleted = false AND serialNumber IS NOT NULL`
- `IS NOT NULL` guard prevents NULL collision since serialNumber is optional.

Postman collection: `/docs/postman/Equipment.postman_collection.json`

### Frontend
- [ ] CRUD pages (after backend APIs complete)

---

## Pending Enhancements

Before production, consider:
- Unique constraints (Category.name, Method.code, OcmElement.symbol)
- Password hashing on User model (bcrypt hooks)
- Automated audit field setting via Sequelize hooks
- FK constraints on audit fields pointing to Users
- AuditLog table for full change history
- Seed data for initial setup

See ADR-003, ADR-004, ADR-005 for architectural decisions.

---

## Update / Save Semantics (added 2026-04-26)

All 10 master-data PUT controllers (and the User PUT) call
`instance.auditedUpdate(payload, userId)` instead of bare
`instance.update(payload, { userId })`. The helper is added by
`applyAuditHooks` to every audited model's prototype.

Why: Sequelize's `instance.update()` skips the `UPDATE` SQL entirely
when no payload field is dirty — leaving `updatedAt` frozen at
`createdAt`. Users editing without changing any field (or with values
that round-trip through Zod's `trim/toLowerCase` to identical strings)
got 200 OK but no audit trail. `auditedUpdate` forces `updatedAt` dirty
via `changed('updatedAt', true)`, which is the only Sequelize primitive
that bypasses both the no-op skip and the managed-field filter on
manual `set('updatedAt', x)`.

Full rationale and code: `/docs/decisions/ADR-backend-audited-update-pattern.md`.