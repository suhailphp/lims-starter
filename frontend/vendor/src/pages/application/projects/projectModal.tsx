

import CommonDatePicker from "../../../components/common-datepicker/commonDatepicker";
import CommonSelect from "../../../components/common-select/commonSelect";
import { projectCategories, projectClients, projectPriorities, projectStatuses, projectTeamLeads, projectAssignees } from "../../../utils/json/selectData";

const ProjectModal = () => {
  return (
    <>
  {/* Add Project Start */}
  <div
    id="add-project"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Add New Project</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#add-project"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="project-name"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Project Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="project-name"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="category"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Category <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="category"
                  options={projectCategories}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="client"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Client <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="client"
                  options={projectClients}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="start-date"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Start Date <span className="text-danger">*</span>
                </label>
                <CommonDatePicker />
               
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="end-date"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  End Date <span className="text-danger">*</span>
                </label>
                <CommonDatePicker />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="priority"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Priority <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="priority"
                  options={projectPriorities}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="status"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Status <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="status"
                  options={projectStatuses}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="team-lead"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Team Lead <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="team-lead"
                  options={projectTeamLeads}
                  placeholder="Select"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="assignees"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Assignees <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="assignees"
                  options={projectAssignees}
                  placeholder="Select"
                  multiple={true}
                  className="custom-select"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="description"
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
              data-hs-overlay="#add-project"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Add Project
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Add Project End */}
  {/* Edit Project Start */}
  <div
    id="edit-project"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Edit Project</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#edit-project"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="project-name-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Project Name <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="project-name-edit"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                    defaultValue="Smart Agent Hub"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="category-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Category <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="category-edit"
                  options={projectCategories}
                  placeholder="Saas"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="client-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Client <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="client-edit"
                  options={projectClients}
                  placeholder="Emily Carter"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="start-date-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Start Date <span className="text-danger">*</span>
                </label>
                <CommonDatePicker />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="end-date-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  End Date <span className="text-danger">*</span>
                </label>
                <CommonDatePicker />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="priority-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Priority <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="priority-edit"
                  options={projectPriorities}
                  placeholder="High"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="status-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Status <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="status-edit"
                  options={projectStatuses}
                  placeholder="Inprogress"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="team-lead-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Team Lead <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="team-lead-edit"
                  options={projectTeamLeads}
                  placeholder="Marie Osborn"
                  className="custom-select"
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="assignees-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Assignees <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="assignees-edit"
                  options={projectAssignees}
                  placeholder="Ryan Cooper"
                  multiple={true}
                  className="custom-select"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="description-edit"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="description-edit"
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
              data-hs-overlay="#edit-project"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Project
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Edit Project End */}
</>

  )
}

export default ProjectModal