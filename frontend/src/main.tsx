import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { store } from '@/store'
import { queryClient } from '@/api/queryClient'
import App from './App'

import '@/styles/globals.css'

/* PrimeReact base + theme — MUST load AFTER globals.css.
 *
 * PrimeReact's Lara theme wraps every rule in `@layer primereact { ... }`.
 * Tailwind v4 wraps its preflight in `@layer base { ... }` and declares the
 * layer order `theme, base, components, utilities` at the top of generated CSS.
 *
 * Cascade layer rule: layers declared later win. If PrimeReact loads first,
 * its `primereact` layer is registered ahead of Tailwind's layers and ends up
 * with the LOWEST priority — Tailwind's preflight `border: 0 solid` then wipes
 * PrimeReact's `border: 1px solid #e5e7eb` on row cells, killing the dividers.
 *
 * Loading PrimeReact AFTER Tailwind ensures `primereact` registers as the
 * highest-priority layer. Vendor doesn't hit this because it's on Tailwind v3
 * (different layer model). */
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
