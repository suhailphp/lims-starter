import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"

const NotificationSettings = () => {
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
          <li aria-current="page" className=" text-gray-900">
            Notification Settings
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="hs-tab-content">
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-8 lg:col-start-3">
        <div className="bg-white shadow rounded-md p-5 border border-border-color">
          <h5 className="mb-5">Notifications</h5>
          <form>
            <div className="mb-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-mail" />
                Email Notifications
              </h6>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Agent Status Updates</p>
                <label
                  htmlFor="custom-switch-one"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-one"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Task Completion Alerts</p>
                <label
                  htmlFor="custom-switch-two"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-two"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Action Required Notices</p>
                <label
                  htmlFor="custom-switch-three"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-three"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Performance Summaries</p>
                <label
                  htmlFor="custom-switch-four"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-four"
                    className="peer sr-only"
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">System Health Notifications</p>
                <label
                  htmlFor="custom-switch-five"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-five"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Security Alert Notifications</p>
                <label
                  htmlFor="custom-switch-six"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-six"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="font-medium">Maintenance Announcements</p>
                <label
                  htmlFor="custom-switch-seven"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-seven"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
            </div>
            <div className="mb-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-computer" />
                In App Notifications
              </h6>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Agent Status Updates</p>
                <label
                  htmlFor="custom-switch-eight"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-eight"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Task Completion Alerts</p>
                <label
                  htmlFor="custom-switch-nine"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-nine"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Action Required Notices</p>
                <label
                  htmlFor="custom-switch-ten"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-ten"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Performance Summaries</p>
                <label
                  htmlFor="custom-switch-eleven"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-eleven"
                    className="peer sr-only"
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">System Health Notifications</p>
                <label
                  htmlFor="custom-switch-twel"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-twel"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between mb-4">
                <p className="font-medium">Security Alert Notifications</p>
                <label
                  htmlFor="custom-switch-fourteen"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-fourteen"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <p className="font-medium">Maintenance Announcements</p>
                <label
                  htmlFor="custom-switch-fifteen"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-fifteen"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-3">
              <Link
                to="#"
                className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary-800 hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default NotificationSettings