import CommonSelect from "../../../components/common-select/commonSelect";
import { organizationTypes, industries } from "../../../utils/json/selectData";

const TenantsModal = () => {
  return (
    <>
      {/* Add API Key Start */}
      <div
        id="add-tenant"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-[800px] w-full mx-auto">
            <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                <h4>Add Tenant</h4>
                <button
                  type="button"
                  className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
                  aria-label="Close"
                  data-hs-overlay="#add-tenant"
                >
                  <i className="icon-x" />
                </button>
              </div>
              <form>
                {/* Start grid */}
                <div className="grid md:grid-cols-12 gap-4 mb-5">
                  <div className="col-span-12">
                    <p className="mb-1 block text-sm font-semibold text-dark">
                      Profile Image <span className="text-danger">*</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4 p-5 border border-dashed border-border-color rounded-lg bg-white cursor-pointer hover:border-primary transition">
                      <span className="flex items-center justify-center w-[64px] h-[64px] text-[20px] rounded-full bg-light border border-border-color">
                        <i className="icon-image" />
                      </span>
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
                    <input
                      id="file-upload1"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="tenant-name"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Tenant Name <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="tenant-name"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="organization-type"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Organization Type <span className="text-danger">*</span>
                    </label>
                    <CommonSelect
                      options={organizationTypes}
                      placeholder="Select"
                      className="custom-select"
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="industry"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Industry <span className="text-danger">*</span>
                    </label>
                    <CommonSelect
                      options={industries}
                      placeholder="Select"
                      className="custom-select"
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="email-address"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="email-address"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="phone-number"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="phone-number"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="notes"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={3}
                      placeholder=""
                      defaultValue={""}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Minimum 50 Characters Required
                    </p>
                  </div>
                </div>
                {/* End grid */}
              </form>
              <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
                <button
                  type="button"
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
                  data-hs-overlay="#add-tenant"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Add Tenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Tenant End */}
      {/* Edit Tenant Start */}
      <div
        id="edit-tenant"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-[800px] w-full mx-auto">
            <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                <h4>Edit Tenant</h4>
                <button
                  type="button"
                  className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
                  aria-label="Close"
                  data-hs-overlay="#edit-tenant"
                >
                  <i className="icon-x" />
                </button>
              </div>
              <form>
                {/* Start grid */}
                <div className="grid md:grid-cols-12 gap-4 mb-5">
                  <div className="col-span-12">
                    <p className="mb-1 block text-sm font-semibold text-dark">
                      Profile Image <span className="text-danger">*</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4 p-5 border border-dashed border-border-color rounded-lg bg-white cursor-pointer hover:border-primary transition">
                      <span className="flex items-center justify-center w-[64px] h-[64px] text-[20px] rounded-full bg-light border border-border-color">
                        <i className="icon-image" />
                      </span>
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
                    <input
                      id="file-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="tenant-name-edit"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Tenant Name <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="tenant-name-edit"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        defaultValue="Apex Mind Systems"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="organization-type-edit"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Organization Type <span className="text-danger">*</span>
                    </label>
                    <CommonSelect
                      options={organizationTypes}
                      placeholder="Select"
                      className="custom-select"
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="industry-edit"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Industry <span className="text-danger">*</span>
                    </label>
                    <CommonSelect
                      options={industries}
                      placeholder="Select"
                      className="custom-select"
                    />
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="email-address-edit"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="email-address-edit"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        defaultValue="exaple@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="phone-number-edit"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="phone-number-edit"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        defaultValue="+1 234 567 890"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="notes-edit"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Notes
                    </label>
                    <textarea
                      id="notes-edit"
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={3}
                      placeholder=""
                      defaultValue={"Tenant details verified and updated."}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Minimum 50 Characters Required
                    </p>
                  </div>
                </div>
                {/* End grid */}
              </form>
              <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
                <button
                  type="button"
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
                  data-hs-overlay="#edit-tenant"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Update Tenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Edit API Key End */}
    </>
  );
};

export default TenantsModal;
