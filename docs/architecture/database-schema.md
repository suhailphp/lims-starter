# Database Schema

## Overview
LIMS uses PostgreSQL 18+ with Sequelize ORM.
All tables follow standard conventions defined in ADR-003, ADR-004, ADR-005.

---

## Database Configuration
- Database: `lims_db`
- User: `lims_admin`
- Dialect: PostgreSQL
- Host: localhost (development)
- Port: 5432

---

## Schema Conventions

### Primary Keys
All tables use UUID primary keys.
- Format: UUIDv4
- Generated: Sequelize `UUIDV4` default
- Column name: `{entityName}ID` (e.g. `userID`, `customerID`)

### Naming
- Table names: PascalCase plural (`Users`, `Categories`, `SourceTypes`)
- Column names: camelCase (`firstName`, `createdAt`, `isActive`)
- Foreign keys: `{entityName}ID` (e.g. `categoryID`, `userID`)
- Indexes: `idx_{table}_{field}` (e.g. `idx_users_email`)

### Standard Fields
Every table includes these audit fields:createdBy    UUID (nullable)
createdAt    DATE (auto CURRENT_TIMESTAMP)
updatedBy    UUID (nullable)
updatedAt    DATE (auto CURRENT_TIMESTAMP)
deletedBy    UUID (nullable)
deletedAt    DATE (nullable)
isDeleted    BOOLEAN (default false)
isActive     BOOLEAN (default true)

### Soft Delete Pattern
- Never hard delete records
- Set `isDeleted = true` + `deletedAt` + `deletedBy`
- Default scope filters `isDeleted = false`
- Scope `includeDeleted` bypasses filter
- Super admin permanent delete — future feature

### Active/Inactive Flag
- `isActive` is business status (temporarily disabled)
- `isDeleted` is data lifecycle (removed)
- They are independent flags

---

## Complete Schema

### Module 1 — Master Data (11 tables)

See `/docs/modules/01-master-data.md` for detailed schema.Users, Customers, Categories, Units, Tests,
Methods, Specifications, SourceTypes, Sources,
Equipments, OcmElements

### Module 2 — Quotes (2 tables) — PLANNEDQuotes, QuoteLineItems

### Module 3 — Worksheet (2 tables) — PLANNEDWorksheets, WorksheetTests

### Module 4 — Results (2 tables) — PLANNEDTestResults, FinalResults

### Module 5 — OCM Extension (2 tables) — PLANNEDOcmWorksheets, OcmElementResults

### Module 6 — Reports (1 table) — PLANNEDReports

### Module 7 — Audit (1 table) — PLANNEDAuditLogs

**Total planned tables: 21**

---

## Entity Relationship Diagram (Text)Users
└── belongsTo → Customers (if role = CUSTOMER)Customers
├── hasMany → Users
├── hasMany → Sources
├── hasMany → Quotes (future)
└── hasMany → Worksheets (future)Categories
├── hasMany → Units
├── hasMany → Tests
└── hasMany → SourcesTests
├── belongsTo → Categories
└── hasMany → MethodsSourceTypes
└── hasMany → SourcesSources
├── belongsTo → SourceTypes
├── belongsTo → Customers
├── belongsTo → Categories
└── hasMany → Worksheets (future)

---

## Foreign Key Rules

| Rule | Strategy |
|------|----------|
| onUpdate | CASCADE |
| onDelete | RESTRICT |

Prevents accidental data loss. Deletes blocked if referenced.

---

## Index Strategy

Every table has indexes on:
1. Primary key (automatic)
2. Foreign keys (manual)
3. Commonly searched fields (name, email, code)
4. Filter combinations (isDeleted + isActive)

---

## Future Additions

### Pending Schema Enhancements
- Unique constraints on: `Category.name`, `Method.code`, `OcmElement.symbol`
- FK constraints on audit fields pointing to Users
- Composite unique constraints (e.g. `Test.name + categoryID`)

### Planned Modules
See individual module docs for schemas not yet implemented.