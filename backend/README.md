# LIMS Backend

Node.js + Express + Sequelize + PostgreSQL

## Scripts

```bash
npm run dev   # development — nodemon auto-reloads on src/ changes
npm start     # production — plain node, no reload
```

## Database

```bash
npm run migrate           # run pending migrations
npm run migrate:undo      # undo last migration
npm run migrate:undo:all  # undo all migrations
```

## Environment

Copy `.env.example` to `.env` and fill in `DB_*` values before starting.
