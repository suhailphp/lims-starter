import { useNavigate } from "react-router-dom";
import CommonSelect from "../../components/common-select/commonSelect"
import { Applicable_To, Industry, language, Policy_Type, Review_Cycle, tone } from "../../utils/json/selectData"
import { Images } from "../../utils/imagePath";


const PolicyGenerator = () => {
   const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // stop normal form submit
    navigate("/policy-generator-result");
  };
  return (
   <>
  {/* Page Wrapper */}
  <div className="page-wrapper relative flex flex-row flex-wrap items-center justify-center h-[85vh]! w-full">
    <div className="content w-full">
      {/* Start Grid  */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
        <div className="lg:col-span-10 lg:col-start-2">
          {/* Start Form */}
          <div>
            {/* Start title */}
            <div className="text-center mb-5">
              <h2 className="flex items-center justify-center mb-2">
                {" "}
                <span className="bg-[image:var(--background-image-linear-gradient-400)] bg-clip-text text-transparent">
                  <i className="icon-wand-sparkles font-medium me-2" />
                </span>{" "}
                Generate{" "}
                <span className="ms-1 bg-[image:var(--background-image-linear-gradient-400)] bg-clip-text text-transparent">
                  {" "}
                  New Policy{" "}
                </span>{" "}
              </h2>
              <p className="mb-0">
                Enter your details below and our AI will generate professional
                designs instantly.
              </p>
            </div>
            {/* End title */}
            {/* Start Resume Form */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="border border-border-color rounded-lg shadow">
                <div className="bg-white p-5 rounded-lg">
                  {/* Start grid  */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 mb-5">
                    <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="industry"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark"
                      >
                        Industry
                      </label>
                      <div className="select-add-icon relative bg-light  rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-building-2" />
                        </span>
                       <CommonSelect
                          options={Industry}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                      </div>
                    </div>
                    {/* End col */}
                    <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="policy-type"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark"
                      >
                        Policy Type
                      </label>
                      <div className="select-add-icon relative bg-light  rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-file-question-mark" />
                        </span>
                        <CommonSelect
                          options={Policy_Type}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                      </div>
                    </div>
                    {/* End col */}
                    <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="applicable-to"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark"
                      >
                        Applicable To
                      </label>
                      <div className="select-add-icon relative bg-light  rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-users" />
                        </span>
                         <CommonSelect
                          options={Applicable_To}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                      </div>
                    </div>
                    {/* End col */}
                    <div className="xxl:col-span-3 xl:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="review-cycle"
                        className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark"
                      >
                        Review Cycle
                      </label>
                      <div className="select-add-icon relative bg-light  rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-calendar-days" />
                        </span>
                       <CommonSelect
                          options={Review_Cycle}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                      </div>
                    </div>
                    {/* End col */}
                  </div>
                  {/* End grid  */}
                  {/* Start Textarea */}
                  <div className="relative bg-light border border-border-color rounded-lg overflow-hidden">
                    <textarea
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-none rounded-lg sm:text-sm text-xs focus:ring-0 text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={4}
                      placeholder="Ask me anything"
                      defaultValue={""}
                    />
                    <div className="flex flex-wrap gap-2 items-center justify-between py-2.5 px-2.5 w-full dark:bg-white">
                      <div className="flex items-center space-x-2 grow">
                        <div className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-light transition dark:text-dark flex items-center justify-center cursor-pointer relative hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark">
                          <i className="icon-upload" />
                          <input
                            type="file"
                            className="absolute w-full h-full top-0 left-0 opacity-0"
                            multiple
                          />
                        </div>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center"
                        >
                          <i className="icon-lightbulb" />
                        </button>
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:hover:text-dark flex items-center justify-center"
                        >
                          <i className="icon-mic" />
                        </button>
                      </div>
                      <p className="text-dark mb-0">0/7000&nbsp;Chars</p>
                    </div>
                  </div>
                  {/* End Textarea */}
                </div>
                {/* Profile */}
                <div className="bg-light p-5 rounded-lg flex items-center justify-between flex-wrap gap-3">
                  <div className="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3 w-full">
                    <div className="grid xxl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-3">
                      {/* Select Language */}
                      <div className="select-add-icon relative bg-light rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-languages" />
                        </span>
                       <CommonSelect
                          options={language}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                      </div>
                      {/* Select Type */}
                      <div className="select-add-icon relative bg-light rounded-lg">
                        <span className="icon absolute z-10 start-3 inset-y-0 my-auto h-full flex items-center text-dark">
                          <i className="icon-smile" />
                        </span>
                        <CommonSelect
                          options={tone}
                          placeholder="Select"
                          className="custom-select presentation-select"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn inline-flex md:w-fit w-full ms-auto items-center justify-center gap-x-2 bg-[image:var(--background-image-linear-gradient-400)] text-white font-semibold rounded-lg hover:opacity-80 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {" "}
                      <i className="icon-sparkles font-normal" /> Generate
                      Policy
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* End Resume Form  */}
            {/* Start History */}
            <div className="mt-5 relative">
              <a
                href="#"
                className="text-sm text-danger font-normal hover:text-danger-800 absolute end-0 top-1.5"
              >
                Clear All
              </a>
              <div className="hs-accordion">
                <button
                  className="hs-accordion-toggle hs-accordion-active:bg-light hs-accordion-active:border-0 cursor-pointer inline-flex items-center justify-between gap-x-3 gap-2 font-bold text-dark w-fit text-lg text-start text-foreground disabled:pointer-events-none"
                  aria-expanded="true"
                  aria-controls="acc-4"
                >
                  History
                  <span className="hs-accordion-active:hidden flex items-center size-4 ms-auto font-medium">
                    <i className="icon icon-chevron-down" />
                  </span>
                  <span className="hs-accordion-active:flex hidden items-center size-4 ms-auto font-medium">
                    <i className="icon icon-chevron-up" />
                  </span>
                </button>
                <div
                  id="acc-4"
                  className="hs-accordion-content hidden w-full overflow-hidden duration-300"
                  role="region"
                >
                  <div className="grid xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-3 mt-5">
                    {/* Item 1 */}
                    <div className="bg-white border border-border-color rounded-lg p-5 shadow flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="mb-2 text-sm truncate">Leave Policy</h3>
                        <p className="flex items-center text-dark mb-0">
                          <i className="icon-clock-2 me-1 text-gray-600" /> 20
                          Min Ago
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full text-dark hover:bg-light transition hover:border border-border-color flex items-center justify-center"
                      >
                        <i className="icon-copy" />
                      </button>
                    </div>
                    {/* Item 2 */}
                    <div className="bg-white border border-border-color rounded-lg p-5 shadow flex items-center justify-between gap-3 flex-wrap">
                      <div className="overflow-hidden">
                        <h3 className="mb-2 text-sm truncate">
                          Employee Policy
                        </h3>
                        <p className="flex items-center text-dark mb-0">
                          <i className="icon-clock-2 me-1 text-gray-600" /> 15
                          Min Ago
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full text-dark hover:bg-light transition hover:border border-border-color flex items-center justify-center"
                      >
                        <i className="icon-copy" />
                      </button>
                    </div>
                    {/* Item 3 */}
                    <div className="bg-white border border-border-color rounded-lg p-5 shadow flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <h3 className="mb-2 text-sm truncate">
                          Attendance Poilcy
                        </h3>
                        <p className="flex items-center text-dark mb-0">
                          <i className="icon-clock-2 me-1 text-gray-600" /> 1
                          Day Ago
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-8 h-8 rounded-full text-dark hover:bg-light transition hover:border border-border-color flex items-center justify-center"
                      >
                        <i className="icon-copy" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End History */}
          </div>
          {/* End Form */}
        </div>
      </div>
      {/* End Grid  */}
      <img
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

export default PolicyGenerator