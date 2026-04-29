

import CommonSelect from '../../../components/common-select/commonSelect'
import { todoCategories, todoPriorities, todoAssignees } from '../../../utils/json/selectData'

const TodoModals = () => {
  return (
    <>
  {/* Add Task Start */}
  <div
    id="add-task"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[500px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Add Task</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#add-task"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="add-task-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Task Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="add-task-name"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                  />
                </div>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="add-sub-task-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Sub Task Name
                </label>
                <div className="relative">
                  <input
                    id="add-sub-task-name"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="add-category"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Category <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="add-category"
                  options={todoCategories}
                  placeholder="Select Category"
                  className='custom-select'
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="add-priority"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Priority <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="add-priority"
                  options={todoPriorities}
                  className='custom-select'

                  placeholder="Select Priority"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="add-description"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="add-description"
                  className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                  rows={3}
                  placeholder=""
                  defaultValue={""}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Minimum 50 Characters Required
                </p>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="add-assignees"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Assignees <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="add-assignees"
                  options={todoAssignees}
                  className='custom-select'

                  placeholder="Select Assignees"
                />
              </div>
            </div>
            {/* End grid */}
          </form>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
              data-hs-overlay="#add-task"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Add Task End */}
  {/* Edit Task Start */}
  <div
    id="edit-task"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[500px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Edit Task</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#edit-task"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="edit-task-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Task Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="edit-task-name"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                    defaultValue="Explore New UI Design Trends"
                  />
                </div>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="edit-sub-task-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Sub Task Name
                </label>
                <div className="relative">
                  <input
                    id="edit-sub-task-name"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0"
                    defaultValue="Check Dribbble & Behance trends"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-category"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Category <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="edit-category"
                  options={todoCategories}
                  className='custom-select'

                  defaultValue={{ value: "Design", label: "Design" }}
                  placeholder="Select Category"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="edit-priority"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Priority <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="edit-priority"
                  options={todoPriorities}

                  className='custom-select'

                  defaultValue={{ value: "High", label: "High" }}
                  placeholder="Select Priority"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="edit-description"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                  rows={3}
                  placeholder=" placeholder"
                  defaultValue={
                    "Research modern design patterns and save inspiration for future use."
                  }
                />
                <p className="text-xs text-gray-600 mt-1">
                  Minimum 50 Characters Required
                </p>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="edit-assignees"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Assignees <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="edit-assignees"
                  options={todoAssignees}
                                    className='custom-select'

                  defaultValue={[
                    { value: "Daniel Kim", label: "Daniel Kim" },
                  ]}
                  placeholder="Select Assignees"
                />
              </div>
            </div>
            {/* End grid */}
          </form>
          <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
            <button
              type="button"
              className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
              data-hs-overlay="#edit-task"
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
  {/* Edit Task End */}
</>

  )
}

export default TodoModals