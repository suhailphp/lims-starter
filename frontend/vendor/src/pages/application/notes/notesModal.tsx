import CommonSelect from "../../../components/common-select/commonSelect";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { notesProjects, notesAssignees } from '../../../utils/json/selectData'
import { Link } from "react-router-dom";
const NotesModal = () => {
  return (
    <>
  {/* Add Note Start */}
  <div
    id="add-note"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Add New Note</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#add-note"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="note_title"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Note Title <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="note_title"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="select_project"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Project <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="select_project"
                  options={notesProjects}
                  placeholder="Select Project"
                  className='custom-select'
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="assignes_select"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Assignees <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="assignes_select"
                  options={notesAssignees}
                  placeholder="Select Assignees"
                  className='custom-select'
                  
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="description_area"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="description_area"
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
              data-hs-overlay="#add-note"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Add Note End */}
  {/* Edit Note Start */}
  <div
    id="edit-note"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-[800px] w-full mx-auto">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
            <h4>Edit Note</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#edit-note"
            >
              <i className="icon-x" />
            </button>
          </div>
          <form>
            {/* Start grid */}
            <div className="grid md:grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label
                  htmlFor="note_tile_two"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Note Title <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="note_tile_two"
                    type="text"
                    className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                    defaultValue="Agent Training Update"
                  />
                </div>
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="project_select_two"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Project <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="project_select_two"
                  options={notesProjects}
                  defaultValue={{ value: "AI Agent Dashboard", label: "AI Agent Dashboard" }}
                  placeholder="Select Project"
                  className='custom-select'
                />
              </div>
              <div className="lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-12">
                <label
                  htmlFor="assignes_select_two"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Assignees <span className="text-danger">*</span>
                </label>
                <CommonSelect
                  id="assignes_select_two"
                  options={notesAssignees}
                  defaultValue={{ value: "Daniel Kim", label: "Daniel Kim" }}
                  placeholder="Select Assignees"
                  className='custom-select'
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="description_area_two"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  Description
                </label>
                <textarea
                  id="description_area_two"
                  className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                  rows={3}
                  placeholder=""
                  defaultValue={
                    "Model accuracy improved after dataset cleanup and feature normalization. Initial tests show more stable outputs."
                  }
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
              data-hs-overlay="#add-note"
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
  {/* Edit Note End */}
  {/* View Note Start */}
  <div
    id="view-note"
    className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabIndex={-1}
  >
    <div className="min-h-screen flex items-end justify-end p-4">
      <div className="sm:max-w-lg sm:w-full ">
        <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto">
          <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color">
            <h4>Note Details</h4>
            <button
              type="button"
              className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
              aria-label="Close"
              data-hs-overlay="#view-note"
            >
              <i className="icon-x" />
            </button>
          </div>
          <p className="flex items-center justify-between mb-3">
            Project{" "}
            <span className="text-dark font-medium">Smart Agent Hub</span>
          </p>
          <p className="flex items-center justify-between mb-3">
            Date <span className="text-dark font-medium">20 Feb 2026</span>
          </p>
          <div className="flex items-center justify-between mb-4">
            <p>Collabrators</p>
            <div className="avatar-list-stacked mr-4">
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_27}
                alt="img"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_28}
                alt="img"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_28}
                alt="img"
              />
              <Link
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                to="#"
              >
                {" "}
                +8{" "}
              </Link>
            </div>
          </div>
          <p className="font-semibold text-dark mb-2">Agent Training Update</p>
          <p className="mb-4">
            Dataset cleanup and feature normalization were completed to improve
            model performance. Initial testing shows higher accuracy and more
            stable outputs across predictions.
          </p>
          <p className="font-semibold text-dark mb-2">Impact</p>
          <p>Improved reliability for ongoing agent workflows.</p>
        </div>
      </div>
    </div>
  </div>
  {/* View Note End */}
</>

  )
}

export default NotesModal