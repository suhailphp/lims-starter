import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Images } from "../../utils/imagePath"
import ImageWithBasePath from "../../components/image-with-base-path"
import TextEditor from "../../components/commom-texteditor/textEditor"

const PolicyGeneratorResult = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [editorContent, setEditorContent] = useState(`<h3>Leave Policy</h3><br/><p>Our leave policy is designed to support employee well-being while ensuring smooth project continuity. The following guidelines outline types of leave available, eligibility criteria, and approval procedures.</p><p>1. Working Hours & Leave Eligibility</p><ul className="list-disc"><li>Employees are eligible for leave based on their employment type and confirmed status.</li><li>Leave balances are calculated on a monthly accrual basis.</li><li>Standard working hours are 9:00 AM to 6:00 PM, Monday to Friday.</li></ul><p>2. Types of Leave</p><ul><li>Casual Leave (CL): For personal tasks and short-term needs; limited to a fixed annual quota.</li><li>Sick Leave (SL): For health-related absence; medical proof may be required for extended leave.</li><li>Earned Leave (EL): Accumulated based on months of service; can be planned in advance for vacations.</li><li>Emergency Leave: For sudden or unforeseen events; subject to manager approval.</li><li>Maternity / Paternity Leave: Provided as per statutory regulations and company guidelines.</li><li>Unpaid Leave: Granted when paid leave balances are exhausted and approval is obtained.</li></ul>`)

  useEffect(() => {
    // Show loading state for 500ms, then show content
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
   <>
  {/* Page Wrapper */}
  <div className="page-wrapper relative">
    <div className={`"bg-border-color w-full h-1.5 rounded-lg loading-state absolute top-0 start-0" ${!isLoading ? 'hidden' : ''}`}>
      <div
        className="rounded-lg h-1.5 bg-[image:var(--background-image-linear-gradient-400)]"
        style={{ width: "70%" }}
      />
    </div>
    {/* Flyer Topbar */}
    <div className={`bg-white lg:border-t border-border-color flex items-center justify-between max-sm:justify-center flex-wrap gap-3 py-3 px-6 content-state ${isLoading ? 'hidden' : ''}`}>
      <div className="hidden lg:flex items-center gap-2">
        <button className="size-8 bg-white text-gray-900 border border-border-color rounded-full hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer dark:hover:text-dark">
          <i className="icon-undo" />
        </button>
        <button className="size-8 bg-white text-gray-900 border border-border-color rounded-full hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark flex items-center justify-center cursor-pointer">
          <i className="icon-redo" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p className="font-medium">
          <span className="text-gray-900">Prompt :</span> Create a Flyer for
          business consultation...
        </p>
        <button
          type="button"
          className="size-8 bg-white text-gray-900 rounded-full hover:bg-primary hover:text-white flex dark:hover:text-dark items-center justify-center cursor-pointer"
        >
          <i className="icon-copy" />
        </button>
        <button
          type="button"
          className="size-8 bg-white text-gray-900 rounded-full hover:bg-primary hover:text-white flex dark:hover:text-dark items-center justify-center cursor-pointer"
        >
          <i className="icon-refresh-cw" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="size-8 bg-white text-gray-900 border border-border-color rounded-full hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer dark:hover:text-dark">
          <i className="icon-share-2" />
        </button>
        <div className="hs-dropdown [--auto-close:inside] relative">
          <button
            type="button"
            className="hs-dropdown-toggle cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white  focus:outline-hidden"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <i className="icon-arrow-up-down" />
            Export
            <i className="icon-chevron-down ms-auto" />
          </button>
          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 max-w-90 bg-white border border-border-color shadow rounded-lg mt-2 z-9"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-6">
              <div className="border-b border-border-color pb-5 mb-5">
                <p className="text-lg max-lg:text-[17px] text-gray-900 font-semibold mb-1">
                  Export Options
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap mb-5">
                <div className="input-group flex items-center gap-2">
                  <input
                    type="radio"
                    name="export"
                    className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                    id="word"
                    defaultChecked
                  />
                  <label htmlFor="word" className="text-gray-900">
                    Word
                  </label>
                </div>
                <div className="input-group flex items-center gap-2">
                  <input
                    type="radio"
                    name="export"
                    className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                    id="pdf"
                  />
                  <label htmlFor="pdf" className="text-gray-900">
                    PDF
                  </label>
                </div>
                <div className="input-group flex items-center gap-2">
                  <input
                    type="radio"
                    name="export"
                    className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                    id="txt"
                  />
                  <label htmlFor="txt" className="text-gray-900">
                    TXT
                  </label>
                </div>
                <div className="input-group flex items-center gap-2">
                  <input
                    type="radio"
                    name="export"
                    className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                    id="docx"
                  />
                  <label htmlFor="docx" className="text-gray-900">
                    DOCX
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
                >
                  Copy
                </button>
                <button
                  type="submit"
                  className="btn bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Flyer Topbar */}
    <div className="page-wrapper relative flex felx-col flex-wrap items-center justify-center h-[85vh]!">
      <div className="p-6">
        {/* Start Grid  */}
        <div className="w-full my-5">
          {/* Start Loading */}
          <div className={`flex flex-col items-center justify-center loading-state ${!isLoading ? 'hidden' : ''}`}>
            <div className="flex items-center bg-white border border-warning mb-6 p-2 rounded-full ps-5 max-w-80 w-full">
              <input
                className="form-input bg-transparent ps-0 border-0 grow outline-0 focus:ring-0"
                placeholder="Finding Perfect Templates For You..."
              />
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-[image:var(--background-image-linear-gradient-400)] text-white">
                <i className="icon-circle-pause" />
              </button>
            </div>
            <h6 className="mb-2"> Generating Policy... </h6>
            <p className="mb-0">
              This may take a few moments. Please wait while we create your policy.
            </p>
          </div>
          {/* End Loading */}
          {/* Start Resume */}
          <div className={`content-state ${isLoading ? 'hidden' : ''}`}>
            <div className="custom-snow-edit relative">
              <TextEditor
                value={editorContent}
                onChange={setEditorContent}
                placeholder="Edit your policy content..."
                ariaLabel="Policy editor"
                className="w-full"
                minHeight="50vh"
              />
            </div>
            <div className="bg-white p-2.5 border border-border-color rounded-lg flex flex-wrap items-center gap-3 justify-center mt-6">
              <Link
                to="#"
                className="btn bg-white text-gray-900 inline-flex items-center border border-border-color hover:bg-primary hover:border-primary hover:text-white edit-policy-btn"
              >
                <i className="icon-pencil-line me-2" />
                Edit Prompt
              </Link>
              <Link
                to="#"
                className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                <i className="icon-download font-normal" /> Download
              </Link>
            </div>
          </div>
          {/* End Resume */}
        </div>
        {/* End Grid  */}
      </div>
      <ImageWithBasePath
        src={Images.policy_bg}
        alt=""
        className="absolute top-0 left-0 w-full -z-1"
      />
    </div>
  </div>
  {/* End Page Wrapper */}
</>

  )
}

export default PolicyGeneratorResult