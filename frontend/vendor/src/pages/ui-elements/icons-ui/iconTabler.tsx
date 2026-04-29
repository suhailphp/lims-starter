import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import "@tabler/icons-webfont/dist/tabler-icons.min.css"


const IconTabler = () => {
  return (
   <div className="p-6">
  {/* Breadcrumb */}
  <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
    <div className="my-auto">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link
              to={Path.dashboard}
              className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
            >
              <i className="icon icon-house" />
              Home
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Tabler Icons
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1">
    <div
      id="hs-tooltip"
      className="preview-card bg-white rounded-md border border-border-color p-5"
    >
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <div className="text-[17px] text-dark font-bold">Tabler Icon</div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-home" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-home
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-layout-dashboard" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-layout-dashboard
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-map-pin-check" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-map-pin-check
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-message-2" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-message-2
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-user-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-user-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-photo" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-photo
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-file-description" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-file-description
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-chart-line" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-chart-line
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-exchange" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-exchange
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-menu-2" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-menu-2
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-settings-cog" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-settings-cog
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-activity" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-activity
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-shopping-bag" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-shopping-bag
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-brand-hipchat" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-brand-hipchat
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-bell" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-bell
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-mail-cog" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-mail-cog
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-location" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-location
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-chart-pie" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-chart-pie
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-checkbox" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-checkbox
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-checks" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-checks
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-chevron-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-chevron-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-chevrons-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-chevrons-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-cloud-download" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-cloud-download
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-database" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-database
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-device-analytics" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-device-analytics
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-discount" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-discount
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-dots-vertical" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-dots-vertical
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-download" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-download
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-trash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-trash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-folder-open" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-folder-open
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-calendar" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-calendar
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-calculator" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-calculator
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-clock" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-clock
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-phone-call" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-phone-call
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ti ti-video" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ti ti-video
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default IconTabler