

import CommonDatePicker from "../../../components/common-datepicker/commonDatepicker";
import CommonSelect from "../../../components/common-select/commonSelect";
import CommonTimePicker from "../../../components/common-timepicker/commonTimepicker";
import { calendarCategories, calendarParticipants } from "../../../utils/json/selectData";

const CalendarModal = () => {
  return (
    <>
  {/* Add Event Start */}
  <div
    id="add-event"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Add Event</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#add-event"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="event-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Event Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="event-name"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="event-category"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Category <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  options={calendarCategories}
                  className="custom-select"
                  placeholder="Select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="event-date"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Event Date <span className="text-danger">*</span>
                </label>
                <CommonDatePicker/>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="event-start-time"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Start Time <span className="text-danger">*</span>
                </label>
                <CommonTimePicker/>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="event-end-time"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  End Time <span className="text-danger">*</span>
                </label>
                <CommonTimePicker/>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="event-location"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Event Location{" "}
                </label>
                <input
                  id="event-location"
                  type="text"
                  className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="event-participants"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Participants
                </label>
                <CommonSelect
                  options={calendarParticipants}
                  className="custom-select"
                  placeholder="Select"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="event-description"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="event-description"
                  className="py-2 px-3 sm:py-3 sm:px-4 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
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
              data-hs-overlay="#add-event"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Add Event End */}
  {/* Edit Event Start */}
  <div
    id="edit-event"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Add Event</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#edit-event"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="edit-event-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Event Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="edit-event-name"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-event-category"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Category <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  options={calendarCategories}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-event-date"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Event Date <span className="text-danger">*</span>
                </label>
                <input
                  id="edit-event-date"
                  type="text"
                  className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                  data-provider="flatpickr"
                  data-date-format="d M, Y"
                  defaultValue="13 Feb, 2026"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-event-start-time"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Start Time <span className="text-danger">*</span>
                </label>
                <input
                  id="edit-event-start-time"
                  type="text"
                  className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                  data-provider="timepickr"
                  data-time-basic="true"
                  placeholder="09:00"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-event-end-time"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  End Time <span className="text-danger">*</span>
                </label>
                <input
                  id="edit-event-end-time"
                  type="text"
                  className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                  data-provider="timepickr"
                  data-time-basic="true"
                  defaultValue="12:00"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-event-location"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Event Location{" "}
                </label>
                <input
                  id="edit-event-location"
                  type="text"
                  className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-event-participants"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Participants
                </label>
                <CommonSelect
                  options={calendarParticipants}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="edit-event-description"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="edit-event-description"
                  className="py-2 px-3 sm:py-3 sm:px-4 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
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
              data-hs-overlay="#edit-event"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Edit Event End */}
</>

  )
}

export default CalendarModal