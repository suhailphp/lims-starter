/* REUSABLE — vendor's breadcrumb + action-row
 *   Vendor reference: vendor/src/pages/systems-security/users-roles/users.tsx:211–268
 */
import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconHome } from '@tabler/icons-react'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[]
  actions?: ReactNode
}

export function PageHeader({ breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
      <div className="my-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            {breadcrumbs.map((b, i) => {
              const isLast = i === breadcrumbs.length - 1
              return (
                <Fragment key={`${i}-${b.label}`}>
                  <li
                    className={
                      isLast
                        ? 'inline-flex items-center text-gray-900'
                        : 'inline-flex items-center'
                    }
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {b.to && !isLast ? (
                      <Link
                        to={b.to}
                        className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
                      >
                        {i === 0 && <IconHome size={14} />}
                        {b.label}
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        {i === 0 && <IconHome size={14} />}
                        {b.label}
                      </span>
                    )}
                  </li>
                  {!isLast && (
                    <li>
                      <span className="text-default">/</span>
                    </li>
                  )}
                </Fragment>
              )
            })}
          </ol>
        </nav>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  )
}
