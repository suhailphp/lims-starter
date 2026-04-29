const BillingModals = () => {
  return (
    <>
      {/* Add Card Key Start */}
      <div
        id="add-card"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-[500px] w-full mx-auto">
            <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                <h2 className="text-xl max-lg:text-lg">Add Card</h2>
                <button
                  type="button"
                  className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
                  aria-label="Close"
                  data-hs-overlay="#add-card"
                >
                  <i className="icon-x" />
                </button>
              </div>
              <form>
                {/* Start grid */}
                <div className="grid md:grid-cols-12 gap-4 mb-5">
                  <div className="col-span-12">
                    <label
                      htmlFor="card_name"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Name on the Card <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="card_name"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="card_number"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Card Number <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="card_number"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="expiration_date"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Expiration Date <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="expiration_date"
                        type="text"
                        className="form-input  block w-full bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color focus:outline-none focus:border-border-color"
                        data-provider="flatpickr"
                        data-date-format="d M, Y"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="hs-toggle-password-1"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      CVV <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="hs-toggle-password-1"
                        type="password"
                        className="form-input bg-white pe-10 block w-full border-border-color rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                        placeholder="Enter ccv"
                      />
                      <button
                        type="button"
                        data-hs-toggle-password='{ "target": "#hs-toggle-password-1" }'
                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden focus:text-blue-600"
                      >
                        <i className="icon icon-eye hidden hs-password-active:block" />
                        <i className="icon icon-eye-off hs-password-active:hidden" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End grid */}
              </form>
              <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
                <button
                  type="button"
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
                  data-hs-overlay="#add-card"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Tenant End */}
      {/* Edit Card Key Start */}
      <div
        id="edit-card"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
        role="dialog"
        tabIndex={-1}
      >
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-[500px] w-full mx-auto">
            <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
              <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                <h2 className="text-xl max-lg:text-lg">Edit Card</h2>
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
                    <label
                      htmlFor="edit_card_name"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Name on the Card <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="edit_card_name"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        defaultValue="Marilyn Trosclair"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="edit_card_number"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Card Number <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="edit_card_number"
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        defaultValue="4532 1234 5678 9012"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="edit_expiration_date"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Expiration Date <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="edit_expiration_date"
                        type="text"
                        className="form-input  block w-full bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                        data-provider="flatpickr"
                        data-date-format="d M, Y"
                        placeholder=""
                        defaultValue="12 Dec, 2026"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6 col-span-12">
                    <label
                      htmlFor="hs-toggle-password"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      CVV <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="hs-toggle-password"
                        type="password"
                        className="form-input bg-white pe-10 block w-full border-border-color rounded-lg sm:text-sm focus:border-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                        placeholder="Enter password"
                        defaultValue={123}
                      />
                      <button
                        type="button"
                        data-hs-toggle-password='{ "target": "#hs-toggle-password" }'
                        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden focus:text-blue-600 "
                      >
                        <i className="icon icon-eye hidden hs-password-active:block" />
                        <i className="icon icon-eye-off hs-password-active:hidden" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End grid */}
              </form>
              <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
                <button
                  type="button"
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
                  data-hs-overlay="#edit-card"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Tenant End */}
    </>
  );
};

export default BillingModals;
