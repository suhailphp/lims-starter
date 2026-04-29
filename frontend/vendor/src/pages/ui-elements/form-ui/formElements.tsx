import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import CommonSelect from "../../../components/common-select/commonSelect"
import { Volume } from "../../../utils/json/selectData"

const FormElements = () => {
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
            Form Elements
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start Grid */}
  <div className="grid grid-cols-12 gap-6">
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Input Text Field Type</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-12 gap-5">
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="simple-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Simple Input
          </label>
          <input
            id="simple-input"
            type="text"
            className="form-input block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none  focus:outline-none focus:border-border-color"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="label-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Label Input
          </label>
          <input
            id="label-input"
            type="text"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none  focus:outline-none focus:border-border-color"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="search-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Type Search
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="search"
              name="hs-leading-icon"
              className="pl-8! form-input-icon form-input  block rounded-lg w-full bg-white  border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
              placeholder="Search"
            />
            <div className="absolute top-1/2 start-2.5 -translate-y-1/2 pointer-events-none">
              <i className="icon icon-search" />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="hs-validation-name-error"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Valid Input
          </label>
          <div className="relative">
            <input
              type="text"
              id="hs-validation-name-error"
              name="hs-validation-name-error"
              className="form-input block w-full border-success rounded-lg sm:text-sm focus:border-success focus:ring-0 focus:outline-none focus:border-border-color"
              required
              aria-describedby="hs-validation-name-error"
            />
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
              <i className="icon icon-check text-success" />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="hs-validation-name-error2"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Invalid Input
          </label>
          <div className="relative">
            <input
              type="text"
              id="hs-validation-name-error2"
              name="hs-validation-name-error2"
              className="form-input block w-full border-danger rounded-lg sm:text-sm focus:border-danger focus:ring-0 focus:outline-none focus:border-border-color"
              required
              aria-describedby="hs-validation-name-error2"
            />
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
              <i className="icon icon-octagon-alert text-danger" />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="rounded-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Rounded Input
          </label>
          <input
            type="text"
            id="rounded-input"
            className="form-input px-4.5 block w-full bg-white border-border-color rounded-full focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            placeholder="Rounded Input"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="placeholder-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Placeholder
          </label>
          <input
            type="text"
            id="placeholder-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            placeholder="placeholder"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="disabled-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Disabled
          </label>
          <input
            type="text"
            id="disabled-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none cursor-not-allowed focus:outline-none focus:border-border-color"
            placeholder="Disabled"
            readOnly
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="readonly-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Readonly
          </label>
          <input
            type="text"
            id="readonly-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none cursor-not-allowed focus:outline-none focus:border-border-color"
            placeholder="Readonly"
            readOnly
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="value-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Value
          </label>
          <input
            type="text"
            id="value-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            placeholder=""
            defaultValue="Value"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="textarea-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Textarea
          </label>
          <textarea
            id="textarea-input"
            className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            rows={3}
            placeholder=""
            defaultValue={""}
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="select-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Select
          </label>
          <CommonSelect
                options={Volume}
              
                placeholder="Select a city"
                className="custom-select"
              />
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content grid grid-cols-1
          lg:grid-cols-3"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Simple Input&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Label Input&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="hs-leading-icon" class="block text-sm
          font-medium mb-2 text-dark"&gt;Type Search&lt;/label&gt; {"\n"}
          {"        "}&lt;div class="relative"&gt;{"\n"}
          {"            "}&lt;input type="search" name="hs-leading-icon"
          class="form-input pl-9! w-full bg-light border-border-color rounded-lg
          focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Search"&gt;{"\n"}
          {"            "}&lt;div class="absolute inset-y-0 start-0 flex
          items-center pointer-events-none z-20 ps-4"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-search"&gt;&lt;/i&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="hs-leading-icon" class="block text-sm
          font-medium mb-2 text-dark"&gt;Valid Input&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="relative"&gt;{"\n"}
          {"            "}&lt;input type="text" id="hs-validation-name-error"
          name="hs-validation-name-error" class="form-input block w-full
          border-success rounded-lg sm:text-sm focus:border-success
          focus:ring-success" required=""
          aria-describedby="hs-validation-name-error-helper"&gt;{"\n"}
          {"            "}&lt;div class="absolute inset-y-0 end-0 flex
          items-center pointer-events-none pe-3"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-check
          text-success"&gt;&lt;/i&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="hs-leading-icon" class="block text-sm
          font-medium mb-2 text-dark"&gt;Invalid Input&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="relative"&gt;{"\n"}
          {"            "}&lt;input type="text" id="hs-validation-name-error"
          name="hs-validation-name-error" class="form-input block w-full
          border-danger rounded-lg sm:text-sm focus:border-danger
          focus:ring-danger" required=""
          aria-describedby="hs-validation-name-error-helper"&gt;{"\n"}
          {"            "}&lt;div class="absolute inset-y-0 end-0 flex
          items-center pointer-events-none pe-3"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-octagon-alert
          text-danger"&gt;&lt;/i&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Rounded Input&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input px-4.5 block
          w-full bg-white border-border-color rounded-full focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none" placeholder="Rounded
          Input"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Placeholder&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none" placeholder=""&gt;
          {"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Disabled&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none cursor-not-allowed"
          placeholder="Disabled" readonly=""&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Readonly&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none cursor-not-allowed"
          placeholder="Readonly" readonly=""&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Value&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="text" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none" placeholder=""
          value="Value"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Textarea&lt;/label&gt;{"\n"}
          {"        "}&lt;textarea class="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5
          block w-full bg-light border-border-color rounded-lg sm:text-sm
          focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50
          disabled:pointer-events-none" rows="3" placeholder="This is a textarea
          placeholder"&gt;&lt;/textarea&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Select&lt;/label&gt;{"\n"}
          {"        "}&lt;select class="py-3 px-4 pe-9 block w-full bg-light
          border-border-color rounded-lg text-sm focus:border-blue-500
          focus:ring-blue-500 disabled:opacity-50
          disabled:pointer-events-none"&gt;{"\n"}
          {"            "}&lt;option selected=""&gt;Open this select
          menu&lt;/option&gt;{"\n"}
          {"            "}&lt;option&gt;1&lt;/option&gt;{"\n"}
          {"            "}&lt;option&gt;2&lt;/option&gt;{"\n"}
          {"            "}&lt;option&gt;3&lt;/option&gt;{"\n"}
          {"        "}&lt;/select&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>{" "}
    {/* end col */}
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Input Types</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-12 gap-5">
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="email-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Email
          </label>
          <input
            type="email"
            id="email-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            placeholder="email@xyz.com"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="hs-toggle-password"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="hs-toggle-password"
              type="password"
              className="form-input bg-white pe-10 block w-full border-border-color rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none focus:ring-0 focus:outline-none focus:border-border-color"
              placeholder="Enter password"
              defaultValue="12345qwerty"
            />
            <button
              type="button"
              data-hs-toggle-password='{ "target": "#hs-toggle-password" }'
              className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md focus:outline-hidden focus:text-blue-600"
            >
              <i className="icon icon-eye hidden hs-password-active:block" />
              <i className="icon icon-eye-off hs-password-active:hidden" />
            </button>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="file-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            File
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            className="block w-full bg-light border border-border-color rounded-lg text-sm file:px-2.5 file:py-1.75 file:me-4 file:border-0 file:bg-light dark:file:bg-gray-200 dark:file:text-darkfocus:z-10 focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="url-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Url
          </label>
          <input
            type="url"
            id="url-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            placeholder="http://example.com"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="tel-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Tel
          </label>
          <input
            type="url"
            id="tel-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            placeholder="+1100-2031-1233"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="date-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Date
          </label>
          <input
            type="text"
            id="date-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:ring-0 focus:outline-none focus:border-border-color"
            data-provider="flatpickr"
            data-date-format="d.m.y"
            placeholder=""
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="datetime-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Date &amp; Time
          </label>
          <input
            type="text"
            id="datetime-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            data-provider="flatpickr"
            data-date-format="d.m.y"
            data-enable-time=""
            placeholder=""
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="time-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Time
          </label>
          <input
            type="text"
            id="time-input"
            className="form-input  block w-full bg-white border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
            data-provider="timepickr"
            data-time-basic="true"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="color-input"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Color picker
          </label>
          <input
            type="color"
            id="color-input"
            className="form-input h-9 block w-full bg-white border border-border-color cursor-pointer rounded-lg disabled:opacity-50 focus:ring-0 disabled:pointer-events-none focus:outline-none focus:border-border-color focus:outline-none focus:border-border-color"
            defaultValue="#2563eb"
            title="Choose your color"
          />
        </div>
        <div className="col-span-12">
          <label
            htmlFor="basic-range-slider-usage"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Range Slider
          </label>
          <input
            type="range"
            className="w-full border-0 bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden form-input focus:ring-0 focus:outline-none focus:border-border-color
                          [&::-webkit-slider-thumb]:w-2.5
                          [&::-webkit-slider-thumb]:h-2.5 
                          [&::-webkit-slider-thumb]:-mt-0.5
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:bg-white
                          [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:transition-all
                          [&::-webkit-slider-thumb]:duration-150
                          [&::-webkit-slider-thumb]:ease-in-out 

                          [&::-moz-range-thumb]:w-2.5 
                          [&::-moz-range-thumb]:appearance-none
                          [&::-moz-range-thumb]:bg-white
                          [&::-moz-range-thumb]:border-4
                          [&::-moz-range-thumb]:border-blue-600
                          [&::-moz-range-thumb]:rounded-full
                          [&::-moz-range-thumb]:transition-all
                          [&::-moz-range-thumb]:duration-150
                          [&::-moz-range-thumb]:ease-in-out

                          [&::-webkit-slider-runnable-track]:w-full 
                          [&::-webkit-slider-runnable-track]:bg-gray-100
                          [&::-webkit-slider-runnable-track]:rounded-full 

                          [&::-moz-range-track]:w-full 
                          [&::-moz-range-track]:bg-gray-100
                          [&::-moz-range-track]:rounded-full"
            id="basic-range-slider-usage"
            aria-orientation="horizontal"
          />
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content grid grid-cols-1
          lg:grid-cols-3"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Email&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="email" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"
          placeholder="email@xyz.com"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Password&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="relative"&gt;{"\n"}
          {"            "}&lt;input id="hs-toggle-password" type="password"
          class="form-input bg-white pe-10 block w-full border-border-color
          rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500
          disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter
          password" value="12345qwerty"&gt;{"\n"}
          {"            "}&lt;button type="button" data-hs-toggle-password='
          {"{"} "target": "#hs-toggle-password" {"}"}' class="absolute inset-y-0
          end-0 flex items-center z-20 px-3 cursor-pointer rounded-e-md
          focus:outline-hidden focus:text-blue-600"&gt;{"\n"}
          {"                "}&lt;i class="icon icon-eye hidden
          hs-password-active:block"&gt;&lt;/i&gt; {"\n"}
          {"                "}&lt;i class="icon icon-eye-off
          hs-password-active:hidden"&gt;&lt;/i&gt; {"\n"}
          {"            "}&lt;/button&gt; {"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;File&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="file" name="file-input" id="file-input"
          class="block w-full bg-light border border-border-color shadow-sm
          rounded-lg text-sm focus:z-10 focus:border-blue-500
          focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
          file:bg-light file:border-0 file:me-4 file:py-1.75 file:px-3
          dark:file:bg-gray-200 dark:file:text-dark"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Url&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="url" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"
          placeholder="http://example.com"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Tel&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="url" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"
          placeholder="+1100-2031-1233"&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Date&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="date" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Month&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="month" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Week&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="week" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Time&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="time" class="form-input{"  "}block w-full
          bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Date Time Local&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="datetime-local" class="form-input{"  "}
          block w-full bg-white border-border-color rounded-lg focus:ring-0
          disabled:opacity-50 disabled:pointer-events-none"&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Color picker&lt;/label&gt;{"\n"}
          {"        "}&lt;input type="color" class="form-input h-9 block w-full
          bg-light border border-border-color cursor-pointer rounded-lg
          disabled:opacity-50 disabled:pointer-events-none" id="hs-color-input"
          value="#2563eb" title="Choose your color"&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
      {/* end grid */}
    </div>
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Input Group</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Code</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-12 gap-5">
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="input-group-left"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Group Left
          </label>
          <div className="input-group flex items-center">
            <span className="border bg-light border-border-color rounded-l-lg form-input flex items-center">
              @
            </span>
            <input
              id="input-group-left"
              type="text"
              className="form-input bg-white border-border-color border-l-0 rounded-r-lg focus:ring-0 block w-full placeholder:text-gray-400 focus:outline-none focus:border-border-color"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="input-group-right"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Group Right
          </label>
          <div className="input-group flex items-center">
            <input
              id="input-group-right"
              type="text"
              className="form-input bg-white border-border-color border-r-0! rounded-s-lg focus:ring-0 block w-full placeholder:text-gray-400 focus:outline-none focus:border-border-color"
              placeholder="Recipient's"
            />
            <span className="border bg-light border-border-color rounded-e-lg form-input">
              @example.com
            </span>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="url-example"
            className="block text-sm font-medium mb-2 text-dark"
          >
            URL Example
          </label>
          <div className="input-group flex items-center">
            <span className="border bg-light border-border-color border-r-0! rounded-l-lg form-input">
              https://example.com/users/
            </span>
            <input
              id="url-example"
              type="text"
              className="form-input bg-white border-border-color rounded-r-lg focus:ring-0 block w-full placeholder:text-gray-400 focus:outline-none focus:border-border-color"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="group-left2"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Group Left
          </label>
          <div className="input-group flex items-center">
            <span className="border bg-light border-border-color rounded-l-lg form-input flex items-center justify-center">
              $
            </span>
            <input
              id="group-left2"
              type="text"
              className="form-input bg-white border-border-color border-l-0 rounded-r-lg focus:ring-0 block w-full placeholder:text-gray-400 focus:outline-none focus:border-border-color"
              placeholder="123"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="group-left-currency"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Group Left With Currency
          </label>
          <div className="input-group flex items-center">
            <span className="border bg-light border-border-color rounded-l-lg form-input">
              $
            </span>
            <span className="border bg-light border-border-color border-l-0 form-input">
              0.00
            </span>
            <input
              type="text"
              id="group-left-currency"
              className="form-input bg-white border-border-color border-l-0 rounded-r-lg focus:ring-0 block w-full placeholder:text-gray-400 focus:outline-none focus:border-border-color"
              placeholder="123"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label
            htmlFor="group-with-currency"
            className="block text-sm font-medium mb-2 text-dark"
          >
            Group With Currency
          </label>
          <div className="input-group flex items-center">
            <span className="border bg-light border-border-color rounded-l-lg form-input">
              $
            </span>
            <input
              type="text"
              id="group-with-currency"
              className="form-input bg-white border-border-color border-l-0 border-r-0 focus:ring-0 block w-full placeholder:text-gray-400 focus:outline-none focus:border-border-color"
              placeholder="123"
            />
            <span className="border bg-light border-border-color rounded-r-lg form-input">
              .00
            </span>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label className="block text-sm font-medium mb-2 text-dark">
            Group With Checkbox
          </label>
          <div className="flex rounded-lg">
            <span className="form-input inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-border-color bg-light">
              <span className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 border-border-color rounded-sm text-info focus:ring-0 dark:checked:bg-info dark:checked:border-info"
                  id="hs-input-group-with-checkbox"
                />
                <label
                  htmlFor="hs-input-group-with-checkbox"
                  className="sr-only"
                >
                  Checkbox
                </label>
              </span>
            </span>
            <input
              type="text"
              name="hs-input-with-add-on-url-checkbox"
              id="hs-input-with-add-on-url-checkbox"
              className="form-input pe-11 block w-full border-border-color rounded-e-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
              placeholder="Checkbox"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label className="block text-sm font-medium mb-2 text-dark">
            Group With Radio
          </label>
          <div className="flex rounded-lg">
            <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-border-color bg-light">
              <span className="flex">
                <input
                  type="radio"
                  className="shrink-0 border-border-color rounded-full text-blue-600 focus:ring-blue-500 dark:checked:bg-blue-500 dark:checked:border-blue-500"
                  id="hs-input-group-with-radio"
                />
                <label htmlFor="hs-input-group-with-radio" className="sr-only">
                  Radio
                </label>
              </span>
            </span>
            <input
              type="text"
              name="hs-input-with-add-on-url-radio"
              id="hs-input-with-add-on-url-radio"
              className="form-input pe-11 block w-full border-border-color rounded-e-lg sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color"
              placeholder="Radio"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label className="block text-sm font-medium mb-2 text-dark">
            Group With Button
          </label>
          <div className="flex rounded-lg">
            <button
              type="button"
              className="form-input inline-flex rounded-s-lg rounded-none justify-center items-center gap-2 border border-border-color font-medium bg-white shadow-2xs align-middle hover:bg-gray-50 focus:outline-hidden focus:ring-2   focus:text-white transition-all text-sm"
            >
              Button
            </button>
            <input
              type="text"
              id="hs-trailing-button-add-on-multiple-add-ons"
              name="hs-trailing-button-add-on-multiple-add-ons"
              className="form-input block w-full border-border-color border-l-0 rounded-e-lg sm:text-sm focus:z-10 focus:ring-0 focus:ring-primary focus:outline-none focus:border-border-color"
            />
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6">
          <label className="block text-sm font-medium mb-2 text-dark">
            Group With Buttons
          </label>
          <div className="flex rounded-lg">
            <button
              type="button"
              className="form-input inline-flex rounded-s-lg border-r-0 rounded-none justify-center items-center gap-2 border border-border-color font-medium bg-white shadow-2xs align-middle hover:bg-gray-50 focus:outline-hidden focus:ring-2   focus:text-white transition-all text-sm"
            >
              Button
            </button>
            <button
              type="button"
              className="form-input inline-flex rounded-none   justify-center items-center gap-2 border border-border-color font-medium bg-white shadow-2xs align-middle hover:bg-gray-50 focus:outline-hidden focus:ring-2   focus:text-white transition-all text-sm"
            >
              Button
            </button>
            <input
              type="text"
              id="hs-trailing-button-add-on-multiple-add-ons2"
              name="hs-trailing-button-add-on-multiple-add-ons2"
              className="form-input block w-full border-border-color border-l-0 rounded-e-lg sm:text-sm focus:z-10 focus:ring-0 focus:ring-primary focus:outline-none focus:border-border-color"
            />
          </div>
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content grid grid-cols-1 lg:grid-cols-2
          gap-6"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="input-group flex items-center"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-l-lg form-input"&gt;@&lt;/span&gt;{"\n"}
          {"            "}&lt;input type="text" class="form-input bg-white
          border-border-color rounded-r-lg{"  "}block w-full
          placeholder:text-gray-400" placeholder="Username"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Right&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="input-group flex items-center"&gt;{"\n"}
          {"            "}&lt;input type="text" class="form-input bg-white
          border-border-color rounded-s-lg{"  "}block w-full
          placeholder:text-gray-400" placeholder="Recipient's"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-e-lg form-input"&gt;@example.com&lt;/span&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;URL Example&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="input-group flex items-center"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-l-lg form-input"&gt;https://example.com/users/&lt;/span&gt;
          {"\n"}
          {"            "}&lt;input type="text" class="form-input bg-white
          border-border-color rounded-r-lg{"  "}block w-full
          placeholder:text-gray-400" placeholder=""&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt; {"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="input-group flex items-center"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-l-lg form-input"&gt;$&lt;/span&gt;{"\n"}
          {"            "}&lt;input type="text" class="form-input bg-white
          border-border-color rounded-r-lg{"  "}block w-full
          placeholder:text-gray-400" placeholder="123"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="input-group flex items-center"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-l-lg form-input"&gt;$&lt;/span&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          form-input"&gt;0.00&lt;/span&gt;{"\n"}
          {"            "}&lt;input type="text" class="form-input bg-white
          border-border-color rounded-r-lg{"  "}block w-full
          placeholder:text-gray-400" placeholder="123"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="input-group flex items-center"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-l-lg form-input"&gt;$&lt;/span&gt;{"\n"}
          {"            "}&lt;input type="text" class="form-input bg-white
          border-border-color{"  "}block w-full placeholder:text-gray-400"
          placeholder="123"&gt;{"\n"}
          {"            "}&lt;span class="border bg-light border-border-color
          rounded-r-lg form-input"&gt;.00&lt;/span&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="flex rounded-lg"&gt;{"\n"}
          {"            "}&lt;span class="form-input inline-flex items-center
          min-w-fit rounded-s-md border border-e-0 border-border-color
          bg-light"&gt;{"\n"}
          {"                "}&lt;span class="flex"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-info focus:ring-info
          dark:checked:bg-info dark:checked:border-info"
          id="hs-input-group-with-checkbox"&gt;{"\n"}
          {"                    "}&lt;label for="hs-input-group-with-checkbox"
          class="sr-only"&gt;Checkbox&lt;/label&gt;{"\n"}
          {"                "}&lt;/span&gt;{"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"            "}&lt;input type="text"
          name="hs-input-with-add-on-url-checkbox"
          id="hs-input-with-add-on-url-checkbox" class="form-input pe-11 block
          w-full border-border-color rounded-e-lg sm:text-sm focus:z-10
          focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50
          disabled:pointer-events-none" placeholder="Checkbox"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="flex rounded-lg"&gt;{"\n"}
          {"            "}&lt;span class="px-4 inline-flex items-center
          min-w-fit rounded-s-md border border-e-0 border-border-color
          bg-light"&gt;{"\n"}
          {"                "}&lt;span class="flex"&gt;{"\n"}
          {"                    "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-blue-600 focus:ring-blue-500
          dark:checked:bg-blue-500 dark:checked:border-blue-500"
          id="hs-input-group-with-radio"&gt;{"\n"}
          {"                    "}&lt;label for="hs-input-group-with-radio"
          class="sr-only"&gt;Radio&lt;/label&gt;{"\n"}
          {"                "}&lt;/span&gt;{"\n"}
          {"            "}&lt;/span&gt;{"\n"}
          {"            "}&lt;input type="text"
          name="hs-input-with-add-on-url-radio"
          id="hs-input-with-add-on-url-radio" class="form-input pe-11 block
          w-full border-border-color rounded-e-lg sm:text-sm focus:z-10
          focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50
          disabled:pointer-events-none" placeholder="Radio"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="flex rounded-lg"&gt;{"\n"}
          {"            "}&lt;button type="button" class="form-input inline-flex
          rounded-s-lg rounded-none justify-center items-center gap-2 border
          border-border-color font-medium bg-white shadow-2xs align-middle
          hover:bg-gray-50 focus:outline-hidden focus:ring-2{"   "}
          focus:text-white transition-all text-sm"&gt;{"\n"}
          {"                "}Button{"\n"}
          {"            "}&lt;/button&gt; {"\n"}
          {"            "}&lt;input type="text"
          id="hs-trailing-button-add-on-multiple-add-ons"
          name="hs-trailing-button-add-on-multiple-add-ons" class="form-input
          block w-full border-border-color rounded-e-lg sm:text-sm focus:z-10
          focus:ring-0 focus:ring-primary"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Group Left&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="flex rounded-lg"&gt;{"\n"}
          {"            "}&lt;button type="button" class="form-input inline-flex
          rounded-s-lg rounded-none justify-center items-center gap-2 border
          border-border-color font-medium bg-white shadow-2xs align-middle
          hover:bg-gray-50 focus:outline-hidden focus:ring-2{"   "}
          focus:text-white transition-all text-sm"&gt;{"\n"}
          {"                "}Button{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;button type="button" class="form-input inline-flex
          rounded-none{"   "}justify-center items-center gap-2 border
          border-border-color font-medium bg-white shadow-2xs align-middle
          hover:bg-gray-50 focus:outline-hidden focus:ring-2{"   "}
          focus:text-white transition-all text-sm"&gt;{"\n"}
          {"                "}Button{"\n"}
          {"            "}&lt;/button&gt;{"\n"}
          {"            "}&lt;input type="text"
          id="hs-trailing-button-add-on-multiple-add-ons"
          name="hs-trailing-button-add-on-multiple-add-ons" class="form-input
          block w-full border-border-color rounded-e-lg sm:text-sm focus:z-10
          focus:ring-0 focus:ring-primary"&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="hs-inline-leading-select-label"
          class="block text-sm font-medium mb-2 dark:text-white"&gt;Phone
          number&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="relative"&gt;{"\n"}
          {"            "}&lt;input type="text"
          id="hs-inline-leading-select-label" name="inline-add-on" class="py-2.5
          sm:py-3 px-4 ps-40 block w-full border-border-color rounded-lg
          sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500
          disabled:opacity-50 disabled:pointer-events-none" placeholder="+1
          (000) 000-0000"&gt;{"\n"}
          {"            "}&lt;div class="absolute inset-y-0 start-0 flex
          items-center ps-px"&gt;{"\n"}
          {"                "}&lt;label for="hs-inline-leading-select-country"
          class="sr-only"&gt;Country&lt;/label&gt;{"\n"}
          {"                "}&lt;select id="hs-inline-leading-select-country"
          name="hs-inline-leading-select-country" class="block w-full
          border-transparent rounded-lg focus:ring-blue-600
          focus:border-blue-600"&gt;{"\n"}
          {"                    "}&lt;option&gt;Dropdown&lt;/option&gt;{"\n"}
          {"                    "}&lt;option&gt;Dropdown 1&lt;/option&gt;{"\n"}
          {"                    "}&lt;option&gt;Dropdown 2&lt;/option&gt;{"\n"}
          {"                "}&lt;/select&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt;{"\n"}
          {"        "}&lt;label for="hs-inline-leading-select-label"
          class="block text-sm font-medium mb-2 dark:text-white"&gt;Phone
          number&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="relative"&gt;{"\n"}
          {"            "}&lt;input type="text"
          id="hs-inline-leading-select-label" name="inline-add-on" class="py-2.5
          sm:py-3 px-4 pe-40 block w-full border-border-color rounded-lg
          sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500
          disabled:opacity-50 disabled:pointer-events-none" placeholder="+1
          (000) 000-0000"&gt;{"\n"}
          {"            "}&lt;div class="absolute inset-y-0 end-0 flex
          items-center ps-px"&gt;{"\n"}
          {"                "}&lt;label for="hs-inline-leading-select-country"
          class="sr-only"&gt;Country&lt;/label&gt;{"\n"}
          {"                "}&lt;select id="hs-inline-leading-select-country"
          name="hs-inline-leading-select-country" class="block w-full
          border-transparent rounded-lg focus:ring-blue-600
          focus:border-blue-600"&gt;{"\n"}
          {"                    "}&lt;option&gt;Dropdown&lt;/option&gt;{"\n"}
          {"                    "}&lt;option&gt;Dropdown 1&lt;/option&gt;{"\n"}
          {"                    "}&lt;option&gt;Dropdown 2&lt;/option&gt;{"\n"}
          {"                "}&lt;/select&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt;{"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
    <div className="preview-card col-span-12 bg-white rounded-md border border-border-color p-5">
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <h5>Checks, Radios and Switches</h5>
        <button
          type="button"
          data-toggle="code"
          className="flex items-center gap-2 border py-1.5 px-2.5 text-xs border-border-color font-semibold rounded-md bg-light-200 dark:bg-gray-100 focus:bg-primary focus:border-primary focus:text-white text-gray-900 dark:text-dark dark:focus:text-dark"
        >
          <i className="icon icon-eye" />
          <span className="code-btn">Show Coode</span>
        </button>
      </div>
      <div className="preview-content grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-dark">
            Default Checkboxes
          </label>
          <div className="inline-flex flex-wrap gap-6 mb-4">
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                id="custom-one"
                defaultChecked
              />
              <label htmlFor="custom-one">Check this custom checkbox</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                id="custom-two"
              />
              <label htmlFor="custom-two">Check this custom checkbox</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-dark">
            Colored Checkboxes
          </label>
          <div className="inline-flex flex-wrap gap-6 mb-4">
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                id="primary"
                defaultChecked
              />
              <label htmlFor="primary">Primary</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-warning focus:ring-warning checked:border-warning disabled:opacity-50 disabled:pointer-events-none"
                id="warning"
                defaultChecked
              />
              <label htmlFor="warning">Warning</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-dark focus:ring-dark checked:border-dark disabled:opacity-50 disabled:pointer-events-none"
                id="dark"
                defaultChecked
              />
              <label htmlFor="dark">Dark</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-success focus:ring-success checked:border-success disabled:opacity-50 disabled:pointer-events-none"
                id="success"
                defaultChecked
              />
              <label htmlFor="success">Success</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-danger focus:ring-danger checked:border-danger disabled:opacity-50 disabled:pointer-events-none"
                id="danger"
                defaultChecked
              />
              <label htmlFor="danger">Danger</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="checkbox"
                className="shrink-0 border-border-color rounded-sm text-info focus:ring-info checked:border-info disabled:opacity-50 disabled:pointer-events-none"
                id="info"
                defaultChecked
              />
              <label htmlFor="info">Info</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-dark">
            Radio
          </label>
          <div className="inline-flex flex-wrap gap-6 mb-4">
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                name="custom-radio"
                className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                id="radio-custom-one"
                defaultChecked
              />
              <label htmlFor="radio-custom-one">Toggle this custom radio</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                name="custom-radio"
                className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                id="radio-custom-two"
              />
              <label htmlFor="radio-custom-two">
                Or toggle this other custom radio
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-dark">
            Radio
          </label>
          <div className="inline-flex flex-wrap gap-6 mb-4">
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                id="radio-primary"
                defaultChecked
              />
              <label htmlFor="radio-primary">Primary</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                className="shrink-0 border-border-color rounded-full text-warning focus:ring-warning checked:border-warning disabled:opacity-50 disabled:pointer-events-none"
                id="radio-warning"
                defaultChecked
              />
              <label htmlFor="radio-warning">Warning</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                className="shrink-0 border-border-color rounded-full text-dark focus:ring-dark checked:border-dark disabled:opacity-50 disabled:pointer-events-none"
                id="radio-dark"
                defaultChecked
              />
              <label htmlFor="radio-dark">Dark</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                className="shrink-0 border-border-color rounded-full text-success focus:ring-success checked:border-success disabled:opacity-50 disabled:pointer-events-none"
                id="radio-success"
                defaultChecked
              />
              <label htmlFor="radio-success">Success</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                className="shrink-0 border-border-color rounded-full text-danger focus:ring-danger checked:border-danger disabled:opacity-50 disabled:pointer-events-none"
                id="radio-danger"
                defaultChecked
              />
              <label htmlFor="radio-danger">Danger</label>
            </div>
            <div className="input-group flex items-center gap-2">
              <input
                type="radio"
                className="shrink-0 border-border-color rounded-full text-info focus:ring-info checked:border-info disabled:opacity-50 disabled:pointer-events-none"
                id="radio-info"
                defaultChecked
              />
              <label htmlFor="radio-info">Info</label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-dark">
            Radio
          </label>
          <div className="inline-flex flex-wrap gap-6 mb-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="custom-switch-one"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="custom-switch-one"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="custom-switch-one">
                Default switch checkbox input
              </label>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="custom-switch-two"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="custom-switch-two"
                  className="peer sr-only"
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="custom-switch-two">
                Default switch checkbox input
              </label>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-dark">
            Radio
          </label>
          <div className="inline-flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <label
                htmlFor="primary-switch"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="primary-switch"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="primary-switch">Primary</label>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="warning-switch"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="warning-switch"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-warning dark:peer-checked:bg-warning peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="warning-switch">Warning</label>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="dark-switch"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="dark-switch"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-dark dark:peer-checked:bg-dark peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="dark-switch">Dark</label>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="success-switch"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="success-switch"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-success dark:peer-checked:bg-success peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="success-switch">Success</label>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="danger-switch"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="danger-switch"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-danger dark:peer-checked:bg-danger peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="danger-switch">Danger</label>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="info-switch"
                className="relative inline-block w-8 h-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="info-switch"
                  className="peer sr-only"
                  defaultChecked
                />
                <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-info dark:peer-checked:bg-info peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
              </label>
              <label htmlFor="info-switch">Info</label>
            </div>
          </div>
        </div>
      </div>
      <pre className="code hidden relative mt-4 p-0! bg-dark text-gray-100 text-sm  overflow-hidden">
        <button
          type="button"
          data-copy=""
          className="sticky float-end top-3 right-3 z-10 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-md hover:bg-gray-700 flex items-center gap-1"
        >
          <i className="icon icon-copy" />
          <span>Copy</span>
        </button>
        {"\n"}
        <code className="language-html block w-full max-h-[350px] mb-[-42px] mt-[-10px]! overflow-auto p-4 pr-16">
          {"\n"}&lt;div class="preview-content grid grid-cols-1 gap-6"&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt; {"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Default Checkboxes&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="inline-flex gap-6 mb-4"&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-primary focus:ring-primary
          checked:border-primary disabled:opacity-50
          disabled:pointer-events-none" id="custom-one" checked&gt;{"\n"}
          {"                "}&lt;label for="custom-one"&gt;Check this custom
          checkbox&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-primary focus:ring-primary
          checked:border-primary disabled:opacity-50
          disabled:pointer-events-none" id="custom-two"&gt;{"\n"}
          {"                "}&lt;label for="custom-two"&gt;Check this custom
          checkbox&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt; {"\n"}
          {"        "}&lt;/div&gt; {"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt; {"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Colored Checkboxes&lt;/label&gt; {"\n"}
          {"        "}&lt;div class="inline-flex gap-6 mb-4"&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-primary focus:ring-primary
          checked:border-primary disabled:opacity-50
          disabled:pointer-events-none" id="primary" checked&gt;{"\n"}
          {"                "}&lt;label for="primary"&gt;Primary&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-warning focus:ring-warning
          checked:border-warning disabled:opacity-50
          disabled:pointer-events-none" id="warning" checked&gt;{"\n"}
          {"                "}&lt;label for="warning"&gt;Warning&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-dark focus:ring-dark
          checked:border-dark disabled:opacity-50 disabled:pointer-events-none"
          id="dark" checked&gt;{"\n"}
          {"                "}&lt;label for="dark"&gt;Dark&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-success focus:ring-success
          checked:border-success disabled:opacity-50
          disabled:pointer-events-none" id="success" checked&gt;{"\n"}
          {"                "}&lt;label for="success"&gt;Success&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-danger focus:ring-danger
          checked:border-danger disabled:opacity-50
          disabled:pointer-events-none" id="danger" checked&gt;{"\n"}
          {"                "}&lt;label for="danger"&gt;Danger&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="checkbox" class="shrink-0
          border-border-color rounded-sm text-info focus:ring-info
          checked:border-info disabled:opacity-50 disabled:pointer-events-none"
          id="info" checked&gt;{"\n"}
          {"                "}&lt;label for="info"&gt;Info&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt; {"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt; {"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Radio&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="inline-flex gap-6 mb-4"&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" name="custom-radio"
          class="shrink-0 border-border-color rounded-full text-primary
          focus:ring-primary checked:border-primary disabled:opacity-50
          disabled:pointer-events-none" id="radio-custom-one" checked&gt;{"\n"}
          {"                "}&lt;label for="radio-custom-one"&gt;Toggle this
          custom radio&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" name="custom-radio"
          class="shrink-0 border-border-color rounded-full text-primary
          focus:ring-primary checked:border-primary disabled:opacity-50
          disabled:pointer-events-none" id="radio-custom-two"&gt;{"\n"}
          {"                "}&lt;label for="radio-custom-two"&gt;Or toggle this
          other custom radio&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"     "}
          {"\n"}
          {"        "}&lt;/div&gt; {"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt; {"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Radio&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="inline-flex gap-6 mb-4"&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-primary focus:ring-primary
          checked:border-primary disabled:opacity-50
          disabled:pointer-events-none" id="radio-primary" checked&gt;{"\n"}
          {"                "}&lt;label
          for="radio-primary"&gt;Primary&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-warning focus:ring-warning
          checked:border-warning disabled:opacity-50
          disabled:pointer-events-none" id="radio-warning" checked&gt;{"\n"}
          {"                "}&lt;label
          for="radio-warning"&gt;Warning&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-dark focus:ring-dark
          checked:border-dark disabled:opacity-50 disabled:pointer-events-none"
          id="radio-dark" checked&gt;{"\n"}
          {"                "}&lt;label for="radio-dark"&gt;Dark&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-success focus:ring-success
          checked:border-success disabled:opacity-50
          disabled:pointer-events-none" id="radio-success" checked&gt;{"\n"}
          {"                "}&lt;label
          for="radio-success"&gt;Success&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-danger focus:ring-danger
          checked:border-danger disabled:opacity-50
          disabled:pointer-events-none" id="radio-danger" checked&gt;{"\n"}
          {"                "}&lt;label
          for="radio-danger"&gt;Danger&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="input-group flex items-center
          gap-2"&gt;{"\n"}
          {"                "}&lt;input type="radio" class="shrink-0
          border-border-color rounded-full text-info focus:ring-info
          checked:border-info disabled:opacity-50 disabled:pointer-events-none"
          id="radio-info" checked&gt;{"\n"}
          {"                "}&lt;label for="radio-info"&gt;Info&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"        "}&lt;/div&gt; {"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div class="mb-4"&gt; {"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Radio&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="inline-flex gap-6 mb-4"&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="custom-switch-one" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox"
          id="custom-switch-one" class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-primary dark:peer-checked:bg-primary
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label for="custom-switch-one"&gt;Default
          switch checkbox input&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="custom-switch-two" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox"
          id="custom-switch-two" class="peer sr-only"&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-primary dark:peer-checked:bg-primary
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label for="custom-switch-two"&gt;Default
          switch checkbox input&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt; {"\n"}
          {"        "}&lt;/div&gt; {"\n"}
          {"    "}&lt;/div&gt;{"\n"}
          {"    "}&lt;div&gt; {"\n"}
          {"        "}&lt;label for="input-label" class="block text-sm
          font-medium mb-2 text-dark"&gt;Radio&lt;/label&gt;{"\n"}
          {"        "}&lt;div class="inline-flex gap-6"&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="primary-switch" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" id="primary-switch"
          class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-primary dark:peer-checked:bg-primary
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label
          for="primary-switch"&gt;Primary&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="warning-switch" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" id="warning-switch"
          class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-warning dark:peer-checked:bg-warning
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label
          for="warning-switch"&gt;Warning&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="dark-switch" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" id="dark-switch"
          class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-dark dark:peer-checked:bg-dark
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label for="dark-switch"&gt;Dark&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="success-switch" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" id="success-switch"
          class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-success dark:peer-checked:bg-success
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label
          for="success-switch"&gt;Success&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="danger-switch" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" id="danger-switch"
          class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-danger dark:peer-checked:bg-danger
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label
          for="danger-switch"&gt;Danger&lt;/label&gt;{"\n"}
          {"            "}&lt;/div&gt;{"\n"}
          {"            "}&lt;div class="flex items-center gap-2"&gt;{"\n"}
          {"                "}&lt;label for="info-switch" class="relative
          inline-block w-8 h-5 cursor-pointer"&gt;{"\n"}
          {"                    "}&lt;input type="checkbox" id="info-switch"
          class="peer sr-only" checked&gt;{"\n"}
          {"                    "}&lt;span class="absolute inset-0 bg-gray-200
          rounded-full transition-colors duration-200 ease-in-out
          peer-checked:bg-info dark:peer-checked:bg-info
          peer-disabled:opacity-50
          peer-disabled:pointer-events-none"&gt;&lt;/span&gt;{"\n"}
          {"                    "}&lt;span class="absolute top-1/2 start-1
          -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs
          transition-transform duration-200 ease-in-out
          peer-checked:translate-x-full"&gt;&lt;/span&gt;{"\n"}
          {"                "}&lt;/label&gt;{"\n"}
          {"                "}&lt;label for="info-switch"&gt;Info&lt;/label&gt;
          {"\n"}
          {"            "}&lt;/div&gt; {"\n"}
          {"        "}&lt;/div&gt; {"\n"}
          {"    "}&lt;/div&gt;{"\n"}&lt;/div&gt;{"\n"}
        </code>
        {"\n"}
      </pre>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default FormElements