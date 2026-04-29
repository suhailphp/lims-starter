/* DOMAIN — Settings page shell. ADMIN-only.
 *
 * Layout: in-page left rail (col-3) + form pane (col-9). The active
 * section is driven by `?section=...` so a deep link reopens the right
 * pane, the browser back button works, and admins can bookmark a
 * subsection. */
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAttachment } from '@/features/attachments/queries'
import { useTenantSettings } from '@/contexts/SettingsContext'
import { useQueryClient } from '@tanstack/react-query'
import { settingsKey } from '@/features/settings/queries'
import { LabInformationForm } from '@/features/settings/LabInformationForm'
import { LocalizationForm } from '@/features/settings/LocalizationForm'
import { SystemSettingsForm } from '@/features/settings/SystemSettingsForm'
import { WorkflowDefaultsForm } from '@/features/settings/WorkflowDefaultsForm'
import {
  RAIL_ITEMS,
  SettingsRail,
  type SettingsSection,
} from '@/features/settings/SettingsRail'

const VALID_SECTIONS = new Set<SettingsSection>([
  'lab',
  'localization',
  'system',
  'workflow',
])

function isSection(v: string | null): v is SettingsSection {
  return v != null && VALID_SECTIONS.has(v as SettingsSection)
}

export function SettingsPage() {
  const role = useAppSelector((s) => s.auth.user?.role)
  const isAdmin = role === 'ADMIN'

  const [params, setParams] = useSearchParams()
  const fromUrl = params.get('section')
  const active: SettingsSection = isSection(fromUrl) ? fromUrl : 'lab'

  const setSection = (id: SettingsSection) => {
    const next = new URLSearchParams(params)
    next.set('section', id)
    setParams(next, { replace: true })
  }

  useEffect(() => {
    if (!isSection(fromUrl)) {
      const next = new URLSearchParams(params)
      next.set('section', 'lab')
      setParams(next, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { labLogoAttachmentID } = useTenantSettings()
  const { data: logoAttachment } = useAttachment(labLogoAttachmentID, {
    enabled: Boolean(labLogoAttachmentID) && active === 'lab',
  })

  const qc = useQueryClient()
  const onLogoUploaded = () => {
    /* The lab logo public setting points at a new attachment ID; bust
     * the public-settings cache so the Header + Login picks up the
     * change without a full reload. */
    qc.invalidateQueries({ queryKey: settingsKey.public })
  }

  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Settings' }]

  if (!isAdmin) {
    return (
      <>
        <Helmet><title>Settings · LIMS</title></Helmet>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className="bg-white shadow rounded-md p-8 border border-border-color text-center max-w-md mx-auto">
          <h5 className="text-gray-900 mb-2">Settings</h5>
          <p className="text-sm text-default mb-0">
            Settings are restricted to administrators.
          </p>
        </div>
      </>
    )
  }

  const activeTitle =
    RAIL_ITEMS.find((r) => r.id === active)?.label ?? 'Settings'

  return (
    <>
      <Helmet><title>{activeTitle} · Settings · LIMS</title></Helmet>
      <PageHeader breadcrumbs={breadcrumbs} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6">
        <aside className="lg:col-span-3 mb-6">
          <SettingsRail active={active} onSelect={setSection} />
        </aside>
        <section className="lg:col-span-9 mb-6">
          {active === 'lab' && (
            <LabInformationForm
              logoAttachment={logoAttachment ?? null}
              onLogoUploaded={onLogoUploaded}
            />
          )}
          {active === 'localization' && <LocalizationForm />}
          {active === 'system' && <SystemSettingsForm />}
          {active === 'workflow' && <WorkflowDefaultsForm />}
        </section>
      </div>
    </>
  )
}
