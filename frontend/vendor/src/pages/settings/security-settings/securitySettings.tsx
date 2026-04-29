
import { Link } from "react-router-dom"
import ImageWithBasePath from "../../../components/image-with-base-path"
import { Images } from "../../../utils/imagePath"
import { Path } from "../../../routes/path"

const SecuritySettings = () => {
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
            Security Settings
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
          <h5 className="mb-5">Security</h5>
          <form>
            <div className="mb-5 mt-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-lock" />
                Change Password
              </h6>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 mb-4">
                  <label
                    htmlFor="hs-toggle-password2"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    Currrent Password
                  </label>
                  <div className="relative">
                    <input
                      id="hs-toggle-password2"
                      type="password"
                      className="form-input form-input-icon bg-white pe-10 ps-8.5 block w-full border-border-color rounded-lg sm:text-sm  focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                      placeholder="************"
                      defaultValue=""
                    />
                    <span className="absolute start-0 top-2 ms-3">
                      <i className="icon icon-lock" />
                    </span>
                    <button
                      type="button"
                      data-hs-toggle-password='{ "target": "#hs-toggle-password2" }'
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden focus:text-blue-600"
                    >
                      <i className="icon icon-eye hidden hs-password-active:block" />
                      <i className="icon icon-eye-off hs-password-active:hidden" />
                    </button>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label
                    htmlFor="hs-toggle-password3"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="hs-toggle-password3"
                      type="password"
                      className="form-input form-input-icon bg-white pe-10 ps-8.5 block w-full border-border-color rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                      placeholder="************"
                      defaultValue=""
                    />
                    <span className="absolute start-0 top-2 ms-3">
                      <i className="icon icon-lock" />
                    </span>
                    <button
                      type="button"
                      data-hs-toggle-password='{ "target": "#hs-toggle-password3" }'
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden focus:text-blue-600"
                    >
                      <i className="icon icon-eye hidden hs-password-active:block" />
                      <i className="icon icon-eye-off hs-password-active:hidden" />
                    </button>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label
                    htmlFor="hs-toggle-password4"
                    className="mb-1 block text-sm font-semibold text-dark"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="hs-toggle-password4"
                      type="password"
                      className="form-input form-input-icon bg-white pe-10 ps-8.5 block w-full border-border-color rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                      placeholder="************"
                      defaultValue=""
                    />
                    <span className="absolute start-0 top-2 ms-3">
                      <i className="icon icon-lock" />
                    </span>
                    <button
                      type="button"
                      data-hs-toggle-password='{ "target": "#hs-toggle-password4" }'
                      className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden focus:text-blue-600"
                    >
                      <i className="icon icon-eye hidden hs-password-active:block" />
                      <i className="icon icon-eye-off hs-password-active:hidden" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 mt-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-shield-check" />
                Two Step Verification
              </h6>
              <div className="flex flex-wrap items-center justify-between mb-5">
                <p className="font-medium">
                  Add an extra layer of security to your account
                </p>
                <label
                  htmlFor="custom-switch-sixteen"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-sixteen"
                    className="peer sr-only"
                   defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
              <div className="p-3 border border-border-color rounded-lg bg-white mb-5">
                <label
                  htmlFor="custom-radio"
                  className="flex items-center gap-3"
                >
                  <input
                    id="custom-radio"
                    type="radio"
                    name="custom-radio"
                    className="shrink-0 rounded-full border-border-color text-primary focus:ring-primary checked:border-primary"
                   defaultChecked
                  />
                  <span>
                    <span className="block font-semibold text-dark leading-none mb-1">
                      Phone
                    </span>
                    <span>Receive a one time code via SMS when signing in</span>
                  </span>
                </label>
              </div>
              <div className="p-3 border border-border-color rounded-lg bg-white">
                <label
                  htmlFor="custom-radio-two"
                  className="flex items-center gap-3"
                >
                  <input
                    id="custom-radio-two"
                    type="radio"
                    name="custom-radio"
                    className="shrink-0 rounded-full border-border-color text-primary focus:ring-primary checked:border-primary"
                  />
                  <span>
                    <span className="block font-semibold text-dark leading-none mb-1">
                      Email
                    </span>
                    <span>
                      Receive a verification code at your registered email
                      address
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-5 mt-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-airplay" />
                Session History
              </h6>
              <p className="mb-5">
                View devices and locations where your account is currently
                signed in
              </p>
              <div className="overflow-auto border border-border-color rounded-lg">
                <table className="table-auto mb-0 w-full whitespace-nowrap">
                  <tbody>
                    <tr className="border-b border-border-color">
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-2">
                          <span className="p-1 w-8 h-8 rounded-full border border-border-color">
                            <ImageWithBasePath
                              src={Images.safari_icon}
                              alt="Safari"
                            />
                          </span>
                          <span className="text-dark font-medium">
                            Safari on MacOS
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-1">
                          <i className="icon icon-map-pin text-dark" />
                          Newyork, USA
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <button className="btn w-8 h-8 text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-danger  rounded-full">
                          <i className="icon icon-trash-2" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-border-color">
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-2">
                          <span className="p-1 w-8 h-8 rounded-full border border-border-color">
                            <ImageWithBasePath
                              src={Images.chrome_icon}
                              alt="Chrome"
                            />
                          </span>
                          <span className="text-dark font-medium">
                            Chrome on Windows Desktop
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-1">
                          <i className="icon icon-map-pin text-dark" />
                          Berlin, USA
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                          Last active 3 days ago
                        </span>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <button className="btn w-8 h-8 text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-danger  rounded-full">
                          <i className="icon icon-trash-2" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-border-color">
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-2">
                          <span className="p-1 w-8 h-8 rounded-full border border-border-color">
                            <ImageWithBasePath
                              src={Images.edge_icon}
                              alt="Edge"
                            />
                          </span>
                          <span className="text-dark font-medium">
                            Edge on Work Desktop
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-1">
                          <i className="icon icon-map-pin text-dark" />
                          Austin, USA
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                          Last active 2 weeks ago
                        </span>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <button className="btn w-8 h-8 text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-danger  rounded-full">
                          <i className="icon icon-trash-2" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-2">
                          <span className="p-1 w-8 h-8 rounded-full border border-border-color">
                            <ImageWithBasePath
                              src={Images.firefox_icon}
                              alt="Firefox"
                            />
                          </span>
                          <span className="text-dark font-medium">
                            Firefox on Personal Laptop
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <div className="flex items-center gap-1">
                          <i className="icon icon-map-pin text-dark" />
                          Chicago, USA
                        </div>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <span className="badge rounded-lg text-xs font-medium bg-light text-dark border border-border-color">
                          Last active 1 month ago
                        </span>
                      </td>
                      <td className="px-4 py-3 text-start">
                        <button className="btn w-8 h-8 text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-danger  rounded-full">
                          <i className="icon icon-trash-2" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mb-5 mt-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-trash-2" />
                Delete Account
              </h6>
              <p className="mb-5">
                Deleting your account will permanently remove all your data,
                including your profile, settings, and activity history. This
                action cannot be undone.
              </p>
              <button
                type="button"
                className="btn-sm text-white bg-danger hover:bg-danger-800 inline-flex items-center"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="center-modal"
                data-hs-overlay="#center-modal"
              >
                Delete Account
              </button>
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

export default SecuritySettings