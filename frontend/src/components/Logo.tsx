/* DOMAIN — App brand mark.
 *
 * Reads lab name + logo from SettingsContext (Settings module). The
 * /public settings payload carries the logo's dataUrl inline (the
 * backend resolves the IMAGE row's attachment), so this component works
 * pre-auth on the login page without a separate authed fetch.
 *
 * Fallback when no logo: gradient placeholder showing the first letter
 * of `labShortName`. */
import { useTenantSettings } from '@/contexts/SettingsContext'

interface LogoProps {
  variant?: 'dark' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { icon: 'h-7 w-7 text-xs', text: 'text-lg' },
  md: { icon: 'h-8 w-8 text-sm', text: 'text-xl' },
  lg: { icon: 'h-10 w-10 text-base', text: 'text-2xl' },
}

export function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const { labShortName, labLogoDataUrl } = useTenantSettings()
  const s = sizeMap[size]

  return (
    <div className="flex items-center gap-2.5">
      {labLogoDataUrl ? (
        <img
          src={labLogoDataUrl}
          alt=""
          className={`${s.icon} rounded-lg object-cover bg-white border border-border-color`}
          draggable={false}
        />
      ) : (
        <div
          className={`${s.icon} flex items-center justify-center rounded-lg font-bold text-white`}
          style={{ background: 'linear-gradient(21.05deg, #5711F6 -38.05%, #9614EB 37.02%, #FF1ADE 112.09%)' }}
        >
          {(labShortName?.[0] ?? 'L').toUpperCase()}
        </div>
      )}
      <span
        className={`${s.text} font-bold tracking-tight ${
          variant === 'white' ? 'text-white' : 'text-gray-900'
        }`}
      >
        {labShortName}
      </span>
    </div>
  )
}
