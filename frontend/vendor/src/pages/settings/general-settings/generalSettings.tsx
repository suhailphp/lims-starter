
import { Link } from "react-router-dom"
import CommonSelect from "../../../components/common-select/commonSelect"
import {
  cities,
  countries,
  states,
} from "../../../utils/json/selectData"
import { Path } from "../../../routes/path"

const GeneralSettings = () => {
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
            General Settings
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
          <h5 className="mb-5">General Settings</h5>
          <form>
            <div className="mb-5 pb-5 border-b border-border-color">
              <h6 className="flex items-center gap-2 mb-5">
                <i className="icon icon-circle-user" />
                Basic Information
              </h6>
              <div className="mb-4">
                <div className="relative flex flex-wrap items-center gap-4 p-5 border border-dashed border-border-color rounded-lg bg-white cursor-pointer hover:border-primary transition">
                  <div className="flex items-center justify-center w-[64px] h-[64px] text-[20px] rounded-full bg-light border border-border-color">
                    <input
                      id="file-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="opacity-0 absolute top-0 start-0 w-full h-full"
                    />
                    <i className="icon-image" />
                  </div>
                  <div>
                    <p className="text-sm text-dark mb-2 font-medium">
                      Drag &amp; drop an image or
                      <span className="text-primary relative cursor-pointer inline-block">
                        browse files
                        <input
                          type="file"
                          className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
                         
                        />
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported Formats : JPG, PNG
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold mb-1 text-dark"
                  >
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="form-input block w-full bg-white border-border-color rounded-lg focus:border-primary disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold mb-1 text-dark"
                  >
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="form-input block w-full bg-white border-border-color rounded-lg focus:border-primary disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-1 text-dark"
                  >
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-input block w-full bg-white border-border-color rounded-lg focus:border-primary disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold mb-1 text-dark"
                  >
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-input block w-full bg-white border-border-color rounded-lg focus:border-primary disabled:opacity-50 disabled:pointer-events-none"
                  />
                </div>
              </div>
            </div>
            <h6 className="flex items-center gap-2 mb-5">
              <i className="icon icon-map-pin" />
              Address Information
            </h6>
            <div className="grid md:grid-cols-2 gap-4 border-b border-border-color pb-5 mb-5">
              <div>
                <label
                  htmlFor="country"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Country
                </label>
                <CommonSelect
                  id="country"
                  options={countries}
                  placeholder="Select Country"
                  ariaLabel="Country"
                  className='custom-select'
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  State
                </label>
                <CommonSelect
                  id="state"
                  options={states}
                  placeholder="Select State"
                  ariaLabel="State"
                  className='custom-select'

                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  City
                </label>
                <CommonSelect
                  id="city"
                  options={cities}
                  placeholder="Select City"
                  ariaLabel="City"
                  className='custom-select'

                />
              </div>
              <div>
                <label
                  htmlFor="postal-code"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postal-code"
                  className="form-input block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                />
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

export default GeneralSettings