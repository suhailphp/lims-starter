import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import CommonDatePicker from "../../../components/common-datepicker/commonDatepicker"
import CommonTimePicker from "../../../components/common-timepicker/commonTimepicker"
import CommonDateRangePicker from "../../../components/common-daterange-picker/commonDateRangePicker"
import { useCodeToggle } from "../../../hooks/useCodeToggle"

const FormPickers = () => {
  const { showCode, copied, handleShowCode, handleCopy } = useCodeToggle()

  const datePickerCode = `<CommonDatePicker />`
  const timePickerCode = `<CommonTimePicker />`
  const rangePickerCode = `<CommonDateRangePicker />`

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
          <li aria-current="page" className="text-gray-900">
            Form Pickers
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start Grid */}
  <div className="grid grid-cols-1">
    <div className="preview-card bg-white rounded-md border border-border-color p-5 mb-6">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Flatpickr - Datepicker</h5>
        <button
          type="button"
          onClick={() => handleShowCode(1)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content grid grid-cols-12 gap-5 ${showCode[1] ? "hidden" : ""}`}>
        <div className="md:col-span-6 xl:col-span-4 col-span-12">
          <label className="block text-sm font-medium mb-2 text-dark">
            Basic
          </label>
          <CommonDatePicker />
        </div>
        <div className="md:col-span-6 xl:col-span-4 col-span-12">
          <label className="block text-sm font-medium mb-2 text-dark">
            DateTime
          </label>
          <CommonDatePicker />
        </div>
        <div className="md:col-span-6 xl:col-span-4 col-span-12">
          <label className="block text-sm font-medium mb-2 text-dark">
            Date Range
          </label>
          <CommonDateRangePicker />
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[1] ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={() => handleCopy(1, `${datePickerCode}\n${rangePickerCode}`)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[1] ? "Copied!" : "Copy"}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {`\n${datePickerCode}\n${rangePickerCode}\n`}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Flatpickr - Timepicker</h5>
        <button
          type="button"
          onClick={() => handleShowCode(2)}
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className={`preview-content grid grid-cols-12 gap-5 ${showCode[2] ? "hidden" : ""}`}>
        <div className="md:col-span-6 xl:col-span-4 col-span-12">
          <label className="block text-sm font-medium mb-2 text-dark">
            Timepicker
          </label>
          <CommonTimePicker />
        </div>
        <div className="md:col-span-6 xl:col-span-4 col-span-12">
          <label className="block text-sm font-medium mb-2 text-dark">
            Alternate Time Picker
          </label>
          <CommonTimePicker />
        </div>
      </div>
      <pre className={`code relative mt-4 p-0! bg-dark text-gray-100 text-sm overflow-hidden ${showCode[2] ? "" : "hidden"}`}>
        <button
          type="button"
          onClick={() => handleCopy(2, timePickerCode)}
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>{copied[2] ? "Copied!" : "Copy"}</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {`\n${timePickerCode}\n`}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default FormPickers