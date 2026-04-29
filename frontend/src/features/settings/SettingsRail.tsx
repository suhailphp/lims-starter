/* DOMAIN — Left-rail nav inside the Settings page.
 *
 * URL-driven via `?section=...`. Each rail item carries an icon + label.
 * Active state uses vendor's `bg-primary-50 text-primary` pattern.
 *
 * Vendor doesn't ship a single-page-with-rail settings layout — vendor's
 * settings is N separate routes — but vendor's sidebar nav uses the same
 * "active item highlight" pattern and we copy those classes directly. */
import {
  IconBuildingStore,
  IconLanguage,
  IconShieldLock,
  IconSettings2,
  type Icon as TablerIcon,
} from '@tabler/icons-react'

export type SettingsSection = 'lab' | 'localization' | 'system' | 'workflow'

interface RailItem {
  id: SettingsSection
  label: string
  Icon: TablerIcon
}

export const RAIL_ITEMS: RailItem[] = [
  { id: 'lab',          label: 'Lab Information',    Icon: IconBuildingStore },
  { id: 'localization', label: 'Localization',       Icon: IconLanguage },
  { id: 'system',       label: 'System',             Icon: IconShieldLock },
  { id: 'workflow',     label: 'Workflow Defaults',  Icon: IconSettings2 },
]

interface Props {
  active: SettingsSection
  onSelect: (id: SettingsSection) => void
}

export function SettingsRail({ active, onSelect }: Props) {
  return (
    <nav
      aria-label="Settings sections"
      className="bg-white shadow rounded-md p-3 border border-border-color"
    >
      <ul className="flex flex-col gap-1">
        {RAIL_ITEMS.map((item) => {
          const isActive = item.id === active
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={[
                  'w-full inline-flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary'
                    : 'text-gray-900 hover:bg-light',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.Icon size={18} stroke={1.75} />
                <span className="truncate">{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
