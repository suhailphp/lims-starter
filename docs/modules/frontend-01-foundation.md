# Frontend Phase 1 — Foundation

## Status: ✅ COMPLETE (2026-04-26)

---

## Tech Stack (Locked)

| Concern | Library | Version |
|---|---|---|
| Framework | React | 19.x |
| Language | TypeScript | 6.x |
| Build | Vite | 8.x |
| Styling | Tailwind CSS | v4 (CSS-based config) |
| State | Redux Toolkit + React-Redux | 2.x / 9.x |
| Data fetching | TanStack Query | 5.x |
| HTTP client | Axios | 1.x |
| Forms | React Hook Form + Zod | — |
| Complex UI | PrimeReact | 10.x |
| Icons | @tabler/icons-react | — |
| Routing | React Router DOM | 7.x |

---

## Setup Steps

### 1. Dependencies installed

```bash
# Runtime
npm install @tanstack/react-query react-hook-form zod @hookform/resolvers \
            primereact primeicons @tabler/icons-react

# Dev
npm install -D tailwindcss @tailwindcss/vite @tailwindcss/forms
```

### 2. Tailwind v4 (CSS-based config)

No `tailwind.config.js`. Configuration lives entirely in `src/styles/globals.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@theme { /* color tokens, shadows, fonts, breakpoints */ }
[data-theme="dark"] { /* dark token overrides */ }
```

The `@theme` block is sourced from the Dreams AI reference theme and contains the
full color palette (primary, success, warning, danger, info, gray and 9 accent scales),
shadows, border-radius, sidebar/topbar semantic tokens, and gradient presets.

### 3. Vite config — path alias + Tailwind plugin

```ts
// vite.config.ts
plugins: [tailwindcss(), react()],
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

### 4. TypeScript paths (TS 6 bundler mode)

`baseUrl` was deprecated in TS 6 and removed. `paths` alone works with
`moduleResolution: "bundler"`:

```json
"paths": { "@/*": ["./src/*"] }
```

### 5. Environment files

```
frontend/.env          ← gitignored; VITE_API_URL=http://localhost:3033/api
frontend/.env.example  ← committed; placeholder value
```

---

## Token Storage Strategy

**Access token**: Redux `auth` slice (in-memory). Lost on hard refresh; recovered
via silent token refresh on app boot (Phase 2).

**Refresh token**: `localStorage` key `refreshToken`. Used by the Axios 401 interceptor
to silently re-acquire access tokens without user interaction.

This is a deliberate tradeoff: XSS cannot read the short-lived access token from
memory; the refresh token in localStorage is an accepted SPA pattern and mitigated
by the 7-day TTL + reuse detection on the backend (ADR-009).

---

## Auth Flow

```
App boots
  └─ reads localStorage for refreshToken
  └─ if found: POST /auth/refresh → setCredentials → isInitialized = true
  └─ if not found: setInitialized → isInitialized = true (stays on /login)

Axios 401 interceptor
  └─ if URL contains /auth/* → reject immediately (let caller handle)
  └─ reads refreshToken from localStorage
  └─ if no token → clearCredentials + redirect /login
  └─ POST /auth/refresh → update store + localStorage → retry original request
  └─ if refresh fails → clearCredentials + redirect /login
```

### Auth interceptor: /auth/* bypass

The 401 response interceptor skips the refresh-and-redirect flow for any URL
matching `/auth/*`. This is required because:

- `POST /auth/login` returning 401 (wrong password) is a normal, expected response.
  Without the bypass the interceptor would find no refresh token, call
  `window.location.href = '/login'`, and redirect before the error could render —
  making it appear as though no network request fired at all.
- `POST /auth/refresh` returning 401 is also guarded (it falls under `/auth/*`)
  to prevent infinite retry loops.
- All other auth endpoints (`/auth/logout`, `/auth/change-password`) are similarly
  excluded — they carry their own error handling.

**Rule:** Only unauthenticated endpoints or endpoints that explicitly need a
redirect-on-failure should NOT be in `/auth/*`. Every route that authenticates the
user or manages credentials is in `/auth/*` and handles 4xx errors itself.

---

## Dark Mode

Dark mode uses `data-theme="dark"` on `<html>` (not `prefers-color-scheme`),
matching the Dreams AI theme convention. The `themeSlice` persists `light|dark`
to `localStorage` and sets the attribute on every change. Toggle UI is built in
Phase 2 alongside the Header component.

---

## Folder Structure

```
frontend/src/
├── api/
│   ├── axios.ts          [REUSABLE] Axios instance + request/response interceptors
│   └── queryClient.ts    [REUSABLE] TanStack Query QueryClient (staleTime 5 min)
├── assets/               [DOMAIN]   Logo, images (populated Phase 2)
├── components/           [DOMAIN]   Shared UI components (populated Phase 2+)
├── features/
│   ├── auth/
│   │   └── authSlice.ts  [REUSABLE] { accessToken, user, isInitialized }
│   └── theme/
│       └── themeSlice.ts [REUSABLE] { mode: light|dark } + localStorage persist
├── hooks/
│   ├── useAppDispatch.ts [REUSABLE] Typed Redux dispatch hook
│   └── useAppSelector.ts [REUSABLE] Typed Redux selector hook
├── layouts/
│   ├── AuthLayout.tsx    [REUSABLE] Bare wrapper for /login, /register
│   └── MainLayout.tsx    [REUSABLE] App shell — header/sidebar added Phase 2
├── lib/                  [REUSABLE] Utilities (populated as needed)
├── pages/
│   ├── DashboardPage.tsx [DOMAIN]   Placeholder → real dashboard Phase 2
│   ├── LoginPage.tsx     [DOMAIN]   Placeholder → real login Phase 2
│   └── NotFoundPage.tsx  [REUSABLE] 404 page
├── routes/
│   ├── ProtectedRoute.tsx [REUSABLE] Redirects to /login if no accessToken
│   └── PublicRoute.tsx    [REUSABLE] Redirects to /dashboard if accessToken exists
├── store/
│   └── index.ts          [REUSABLE] Redux store (auth + theme slices)
├── styles/
│   └── globals.css       [DOMAIN]   Tailwind v4 + Dreams AI color palette
├── types/
│   └── auth.ts           [DOMAIN]   User, AuthState, LoginRequest, LoginResponse
├── App.tsx               [DOMAIN]   Route tree
└── main.tsx              [REUSABLE] Root mount: Provider + QueryClient + BrowserRouter
```

---

## Reusable vs Domain

| Tag | Meaning |
|---|---|
| REUSABLE | Generic — copy unchanged to POS, Gym, Logistics projects |
| DOMAIN | LIMS-specific — replace per project (role enum, color palette, branding) |

---

## Route Map (Phase 1)

| Path | Guard | Component | Behaviour |
|---|---|---|---|
| `/` | none | Navigate | → `/dashboard` |
| `/login` | PublicRoute | LoginPage | Redirect to `/dashboard` if logged in |
| `/dashboard` | ProtectedRoute | DashboardPage | Redirect to `/login` if no token |
| `*` | none | NotFoundPage | 404 |

---

## Verification

```bash
cd frontend && npm run build   # ✅ 0 errors, 0 warnings
npm run dev                    # ✅ http://localhost:5173
# /       → 200 (redirect to /dashboard → /login placeholder)
# /login  → 200 (login placeholder)
# /dashboard → 200 (protected; redirects to /login — no token on fresh load)
```

---

---

## Phase 2 — Login + Auth Flow

### Status: ✅ COMPLETE (2026-04-26)

### Delivered

| Item | Detail |
|---|---|
| Login page | Dreams AI two-column layout — gradient left panel, floating-label form right |
| RHF + Zod form | Email regex via `.refine()` (Zod v4 `.email()` deprecated), password required |
| API integration | `POST /api/auth/login` via `useLogin` hook (`useMutation` wrapper) |
| Boot silent refresh | `useInitAuth` hook — attempts refresh on mount, sets `isInitialized` |
| Token storage | Access token → Redux (in-memory); refresh token + user → localStorage |
| `mustChangePassword` | `ProtectedRoute` forces redirect to `/change-password` until flag clears |
| Change password page | Three-field form (current / new / confirm), redirects to `/login` on success |
| Account lockout UX | `"Account locked until <ISO>"` parsed and formatted as human-readable date |
| Error persistence | API error held in local `useState`, cleared on next keystroke in either field |

### Login form UX decision — no client-side credential validation

The login form enforces **only** that both fields are non-empty before submitting.
It does **not** validate password length, complexity, or format on the login screen.

Rationale: displaying "password must be 8+ characters" on a login form is an
information leak (it confirms which users have older/shorter passwords). The correct
response for any invalid credential is a generic "Invalid credentials" from the API.
Minimum-length and complexity rules are enforced on the **create / change / reset
password** forms only.

### Route map (Phase 2 additions)

| Path | Guard | Component | Behaviour |
|---|---|---|---|
| `/change-password` | ProtectedRoute | ChangePasswordPage | Outside MainLayout; forced if `mustChangePassword` |

---

## Phase 3 Scope (next)

- MainLayout: persistent sidebar + fixed header
- Sidebar: collapsible, Dreams AI two-column visual reference
- Header: theme toggle, user dropdown (profile, change password, logout)
- Menu items (all placeholder navigation for now)

## Theme integration (mid-Phase 3 pivot)

Earlier Phase 3 work tried to re-derive Dreams AI styles inline. After
several iterations the sidebar still didn't match. The approach was
changed to **integrate the theme as a vendor layer**:

- Vendor CSS lives in `src/styles/vendor/style.css` (copied from
  `frontend/vendor/src/assets/css/style.css`, minus three stripped imports).
- `src/styles/globals.css` is now an orchestrator: Tailwind core →
  vendor → custom overrides → LIMS components → utilities.
- Components reuse vendor's class names and DOM hierarchy verbatim.
  Only data (menu items, icons, logos) is LIMS-specific.

Tier-1 theme libraries pre-installed for downstream phases:
`react-select`, `flatpickr`, `apexcharts`/`react-apexcharts`,
`react-helmet-async`. PrimeReact + Tabler icons were already present.

Full rationale, ADR text, and the "copy first, build on top" workflow:
`/docs/decisions/ADR-frontend-theme-integration.md`
