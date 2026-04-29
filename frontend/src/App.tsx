import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { PublicRoute } from '@/routes/PublicRoute'
import { AuthLayout } from '@/layouts/AuthLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { LoginPage } from '@/pages/LoginPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ChangePasswordPage } from '@/pages/ChangePasswordPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { CustomersPage } from '@/pages/CustomersPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { UnitsPage } from '@/pages/UnitsPage'
import { TestsPage } from '@/pages/TestsPage'
import { MethodsPage } from '@/pages/MethodsPage'
import { SpecificationsPage } from '@/pages/SpecificationsPage'
import { SourceTypesPage } from '@/pages/SourceTypesPage'
import { SourcesPage } from '@/pages/SourcesPage'
import { EquipmentPage } from '@/pages/EquipmentPage'
import { OcmElementsPage } from '@/pages/OcmElementsPage'
import { CurrenciesPage } from '@/pages/CurrenciesPage'
import { TaxRatesPage } from '@/pages/TaxRatesPage'
import { UsersPage } from '@/pages/UsersPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { SearchResultsPage } from '@/pages/SearchResultsPage'
import { useInitAuth } from '@/hooks/useInitAuth'
import { Toaster, toasterOptions } from '@/lib/toast'
import { SettingsProvider } from '@/contexts/SettingsContext'

export default function App() {
  const isInitialized = useInitAuth()

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-light">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <SettingsProvider>
      <Toaster {...toasterOptions} />
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public — redirect to /dashboard if already logged in */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard"     element={<DashboardPage />} />
          <Route path="/customers"     element={<CustomersPage />} />
          <Route path="/categories"    element={<CategoriesPage />} />
          <Route path="/units"         element={<UnitsPage />} />
          <Route path="/tests"         element={<TestsPage />} />
          <Route path="/methods"       element={<MethodsPage />} />
          <Route path="/specifications" element={<SpecificationsPage />} />
          <Route path="/source-types"  element={<SourceTypesPage />} />
          <Route path="/sources"       element={<SourcesPage />} />
          <Route path="/equipment"     element={<EquipmentPage />} />
          <Route path="/ocm-elements"  element={<OcmElementsPage />} />
          <Route path="/currencies"    element={<CurrenciesPage />} />
          <Route path="/tax-rates"     element={<TaxRatesPage />} />
          <Route path="/users"         element={<UsersPage />} />
          <Route path="/profile"       element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings"      element={<SettingsPage />} />
          <Route path="/search"        element={<SearchResultsPage />} />
        </Route>
        {/* Change-password: protected but no sidebar/header */}
        <Route path="/change-password" element={<ChangePasswordPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </SettingsProvider>
  )
}
