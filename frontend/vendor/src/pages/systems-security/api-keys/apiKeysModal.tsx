import CommonSelect from "../../../components/common-select/commonSelect";
import { agents } from "../../../utils/json/selectData";

const ApiKeysModal = () => {
  return (
    <>
      {/* Add API Key Start */}
      <div
        id="add-api-key"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-[500px] w-full mx-auto">
            <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                <h4>Add API Key</h4>
                <button
                  type="button"
                  className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
                  aria-label="Close"
                  data-hs-overlay="#add-api-key"
                >
                  <i className="icon-x" />
                </button>
              </div>
              <form>
                {/* Start grid */}
                <div className="grid md:grid-cols-12 gap-4 mb-5">
                  <div className="col-span-12">
                    <label
                      htmlFor="key_name"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Key Name <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="key_name"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="agent"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Agent <span className="text-danger">*</span>
                    </label>
                    <CommonSelect
                      options={agents}
                      placeholder="Select Agent"
                      className="custom-select"
                    />
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
                  data-hs-overlay="#add-api-key"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Add API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add API Key End */}
      {/* Add API Key Start */}
      <div
        id="edit-api-key"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-[500px] w-full mx-auto">
            <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                <h4>Edit API Key</h4>
                <button
                  type="button"
                  className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
                  aria-label="Close"
                  data-hs-overlay="#edit-api-key"
                >
                  <i className="icon-x" />
                </button>
              </div>
              <form>
                {/* Start grid */}
                <div className="grid md:grid-cols-12 gap-4 mb-5">
                  <div className="col-span-12">
                    <label
                      htmlFor="edit_key_name"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Key Name <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="edit_key_name"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color focus:outline-none focus:border-border-color"
                        defaultValue="Backup Key"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="edit_agent"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Agent <span className="text-danger">*</span>
                    </label>
                    <CommonSelect
                      options={agents}
                      placeholder="Failover Agent"
                      className="custom-select"
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="edit_notes"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Notes
                    </label>
                    <textarea
                      id="edit_notes"
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={3}
                      placeholder=""
                      defaultValue={"Backup api key"}
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
                  data-hs-overlay="#edit-api-key"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Update API Key
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

export default ApiKeysModal;
