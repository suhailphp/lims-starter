import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Images } from "../../utils/imagePath";
import ImageWithBasePath from "../../components/image-with-base-path";
import { Slider } from "primereact/slider";

const FlyerGeneratorResult = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(50);

  useEffect(() => {
    // After 1 second, hide loading state and show content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div
          className={`bg-border-color w-full h-1.5 rounded-lg loading-state ${!isLoading ? "hidden" : ""}`}
        >
          <div
            className="rounded-lg h-1.5 bg-primary-gradient"
            style={{ width: "70%" }}
          />
        </div>
        {/* Flyer Topbar */}
        <div
          className={`bg-white lg:border-t border-border-color flex items-center justify-between max-sm:justify-center flex-wrap gap-3 py-3 px-6 content-state ${isLoading ? "hidden" : ""}`}
        >
          <div className="hidden lg:flex items-center gap-2">
            <button className="size-8 bg-white text-gray-900 border border-border-color rounded-full hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark flex items-center justify-center cursor-pointer">
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
            <button className="size-8 bg-white text-gray-900 border border-border-color rounded-full hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark flex items-center justify-center cursor-pointer">
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
                        id="png"
                        defaultChecked
                      />
                      <label htmlFor="png" className="text-gray-900">
                        PNG
                      </label>
                    </div>
                    <div className="input-group flex items-center gap-2">
                      <input
                        type="radio"
                        name="export"
                        className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                        id="jpg"
                      />
                      <label htmlFor="jpg" className="text-gray-900">
                        JPG
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
                        id="svg"
                      />
                      <label htmlFor="svg" className="text-gray-900">
                        SVG
                      </label>
                    </div>
                    <div className="input-group flex items-center gap-2">
                      <input
                        type="radio"
                        name="export"
                        className="shrink-0 border-border-color rounded-full text-primary focus:ring-primary checked:border-primary disabled:opacity-50 disabled:pointer-events-none"
                        id="psd"
                      />
                      <label htmlFor="psd" className="text-gray-900">
                        PSD
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="submit"
                      className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
                    >
                      Copy Image
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
        <div className="relative flex felx-col flex-wrap items-center justify-center h-[calc(100vh-116px)]! overflow-y-auto max-md:h-[calc(100vh-160px)]! w-full z-1">
          {/* Content */}
          <div className="content">
            {/* Start Loading */}
            <div
              className={`text-center loading-state ${!isLoading ? "hidden" : ""}`}
            >
              <div className="p-0.5 bg-primary-gradient inline-flex rounded-full mb-6">
                <div className="p-2 ps-6 rounded-full inline-flex items-center gap-6 bg-white">
                  <p className="text-gray-900">
                    Finding Perfect Templates For You...
                  </p>
                  <div className="size-9 rounded-full bg-primary-gradient text-white text-base flex items-center justify-center shrink-0">
                    <i className="icon-circle-pause" />
                  </div>
                </div>
              </div>
              <p className="text-base font-semibold text-gray-900 mb-2">
                Generating Flyer...
              </p>
              <p>
                This may take a few moments. Please wait while we create your
                Flyer.
              </p>
            </div>
            {/* End Loading */}
            {/* Main Content */}
            <div className={`content-state ${isLoading ? "hidden" : ""}`}>
              {/* Start grid */}
              <div className="flex flex-row max-md:flex-wrap md:flex-col items-center gap-2 relative md:fixed md:end-6 end-0 inset-y-0 my-auto h-auto md:top-1/2 md:-translate-y-1/2 justify-center mb-4 md:mb-0">
                <Link
                  to="#"
                  className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
                >
                  <i className="icon-pencil-line text-[18px]!" />
                  <span>Edit</span>
                </Link>
                <Link
                  to="#"
                  className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="generate-color"
                  data-hs-overlay="#generate-color"
                >
                  <i className="icon-palette text-[18px]!" />
                  <span>Color</span>
                </Link>
                <Link
                  to="#"
                  className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary-500 aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="generate-flyer"
                  data-hs-overlay="#generate-flyer"
                >
                  <i className="icon-layout-template text-[18px]!" />
                  <span>Templates</span>
                </Link>
              </div>
              {/* End Grid */}
              <div className="text-center max-w-[414px]">
                <span className="badge px-3 inline-block text-sm rounded-full bg-white border border-border-color text-gray-900 mb-7.5">
                  A6 (10.5 × 14.8 cm)
                </span>
                <div className="mb-7.5">
                  <div id="tab1">
                    <ImageWithBasePath src={Images.flyer_04} alt="flyer" />
                  </div>
                  <div className="hidden" id="tab2">
                    <ImageWithBasePath src={Images.flyer_05} alt="flyer" />
                  </div>
                  <div className="hidden" id="tab3">
                    <ImageWithBasePath src={Images.flyer_06} alt="flyer" />
                  </div>
                  <div className="hidden" id="tab4">
                    <ImageWithBasePath src={Images.flyer_07} alt="flyer" />
                  </div>
                  <div className="hidden" id="tab5">
                    <ImageWithBasePath src={Images.flyer_08} alt="flyer" />
                  </div>
                  <div className="hidden" id="tab6">
                    <ImageWithBasePath src={Images.flyer_09} alt="flyer" />
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-full border border-border-color flex items-center justify-center mx-auto md:mr-auto mb-4 md:mb-0 gap-2 w-52! relative">
                  <span id="slider-value-left" className="text-dark">
                    {value}
                  </span>
                  <div className="w-full mx-1">
                    <Slider
                      value={value}
                      onChange={(e) =>
                        setValue(Array.isArray(e.value) ? e.value[0] : e.value)
                      }
                      className="w-full"
                    />
                  </div>
                  <span id="slider-value-right" className="text-dark">
                    {(value / 100) * 100}%
                  </span>
                </div>
              </div>{" "}
              {/* end card */}
            </div>
            {/* End Main Content */}
          </div>
          {/* End Content */}
          <ImageWithBasePath
            src={Images.flyer_bg}
            alt=""
            className="absolute top-0 left-0 w-full -z-1"
          />
        </div>
      </div>
      {/* End Page Wrapper */}

      <>
        {/* Offcanvas Start */}
        <div
          id="generate-flyer"
          className="remove-overlay [--overlay-backdrop:false] hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed bottom-0 start-0 transition-all duration-300 transform md:max-w-[400px] max-w-[300px] rounded-lg m-2 md:m-6 border border-border-color shadows w-full z-80 bg-white overflow-hidden"
          role="dialog"
          tabIndex={-1}
        >
          <div className="flex justify-between items-center p-5">
            <h3 className="font-bold text-dark text-lg">
              Choose Your Template
            </h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger hover:border-danger text-dark hover:text-white focus:outline-hidden cursor-pointer dark:hover:text-dark dark:hover:text-dark"
              aria-label="Close"
              data-hs-overlay="#generate-flyer"
            >
              <span className="sr-only">Close</span>
              <i className="icon-x" />
            </button>
          </div>
          <div className="p-5 pt-0 pb-22 overflow-y-scroll h-[calc(100vh-238px)]! max-md:h-[calc(100vh-140px)]!">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              role="tablist"
            >
              <div
                className="border border-border-color hover:shadow-lg transition translate-1 hs-tab-active:border-primary active"
                role="tab"
                data-hs-tab="#tab1"
              >
                <ImageWithBasePath
                  src={Images.flyer_04}
                  alt="flyer"
                  className="w-full"
                />
              </div>
              <div
                className="border border-border-color hover:shadow-lg transition translate-1 hs-tab-active:border-primary"
                role="tab"
                data-hs-tab="#tab2"
              >
                <ImageWithBasePath
                  src={Images.flyer_05}
                  alt="flyer"
                  className="w-full"
                />
              </div>
              <div
                className="border border-border-color hover:shadow-lg transition translate-1 hs-tab-active:border-primary"
                role="tab"
                data-hs-tab="#tab3"
              >
                <ImageWithBasePath
                  src={Images.flyer_06}
                  alt="flyer"
                  className="w-full"
                />
              </div>
              <div
                className="border border-border-color hover:shadow-lg transition translate-1 hs-tab-active:border-primary"
                role="tab"
                data-hs-tab="#tab4"
              >
                <ImageWithBasePath
                  src={Images.flyer_07}
                  alt="flyer"
                  className="w-full"
                />
              </div>
              <div
                className="border border-border-color hover:shadow-lg transition translate-1 hs-tab-active:border-primary"
                role="tab"
                data-hs-tab="#tab5"
              >
                <ImageWithBasePath
                  src={Images.flyer_08}
                  alt="flyer"
                  className="w-full"
                />
              </div>
              <div
                className="border border-border-color hover:shadow-lg transition translate-1 hs-tab-active:border-primary"
                role="tab"
                data-hs-tab="#tab6"
              >
                <ImageWithBasePath
                  src={Images.flyer_09}
                  alt="flyer"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="text-center absolute bottom-0 start-0 p-5 flex items-center justify-center bg-white w-full">
            <a
              href="#"
              className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
            >
              <i className="icon-loader" />
              Load More Templates
            </a>
          </div>
        </div>
        {/* Offcanvas End */}
        {/* Offcanvas Start */}
        <div
          id="generate-color"
          className="hs-overlay [--overlay-backdrop:false] hs-overlay-open:translate-x-0 hidden -translate-x-full fixed bottom-0 start-0 transition-all duration-300 transform md:max-w-[400px] max-w-[300px] rounded-lg m-2 md:m-6 border border-border-color shadows w-full z-80 bg-white"
          role="dialog"
          tabIndex={-1}
        >
          <div className="flex justify-between items-center p-5">
            <h3 className="font-bold text-dark text-lg">Color Options</h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger hover:border-danger text-dark hover:text-white focus:outline-hidden cursor-pointer dark:hover:text-dark"
              aria-label="Close"
              data-hs-overlay="#generate-color"
            >
              <span className="sr-only">Close</span>
              <i className="icon-x" />
            </button>
          </div>
          <div className="p-5 pt-0 overflow-y-scroll h-[calc(100vh-238px)]! max-md:h-[calc(100vh-140px)]!">
            <div className="space-y-4 my-2">
              <label className="relative block cursor-pointer group">
                <input
                  type="radio"
                  name="color-palette"
                  className="peer hidden"
                  defaultChecked
                />
                <span className="flex h-10 w-full overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 peer-checked:ring-2 peer-checked:ring-indigo-500 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-slate-900 transition-all">
                  <span className="flex-1 bg-[#14532d]" />
                  <span className="flex-1 bg-[#facc15]" />
                  <span className="flex-1 bg-[#fb923c]" />
                  <span className="flex-1 bg-[#e5e7eb]" />
                  <span className="flex-1 bg-transparent" />
                  <span className="flex-1 bg-[#0f172a]" />
                </span>
              </label>
              <label className="relative block cursor-pointer group">
                <input
                  type="radio"
                  name="color-palette"
                  className="peer hidden"
                />
                <span className="flex h-10 w-full overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 peer-checked:ring-2 peer-checked:ring-indigo-500 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-slate-900 transition-all">
                  <span className="flex-1 bg-[#7c3aed]" />
                  <span className="flex-1 bg-white" />
                  <span className="flex-1 bg-[#e5e5e5]" />
                  <span className="flex-1 bg-[#64748b]" />
                  <span className="flex-1 bg-[#cbd5e1]" />
                  <span className="flex-1 bg-[#1e293b]" />
                </span>
              </label>
              <label className="relative block cursor-pointer group">
                <input
                  type="radio"
                  name="color-palette"
                  className="peer hidden"
                />
                <span className="flex h-10 w-full overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 peer-checked:ring-2 peer-checked:ring-indigo-500 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-slate-900 transition-all">
                  <span className="flex-1 bg-[#db0073]" />
                  <span className="flex-1 bg-[#f3e8ff]" />
                  <span className="flex-1 bg-[#e9d5ff]" />
                  <span className="flex-1 bg-[#2563eb]" />
                  <span className="flex-1 bg-[#22c55e]" />
                  <span className="flex-1 bg-[#6b7280]" />
                </span>
              </label>
              <label className="relative block cursor-pointer group">
                <input
                  type="radio"
                  name="color-palette"
                  className="peer hidden"
                />
                <span className="flex h-10 w-full overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 peer-checked:ring-2 peer-checked:ring-indigo-500 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-slate-900 transition-all">
                  <span className="flex-1 bg-[#334155]" />
                  <span className="flex-1 bg-transparent" />
                  <span className="flex-1 bg-[#facc15]" />
                  <span className="flex-1 bg-[#e5e7eb]" />
                  <span className="flex-1 bg-[#f97316]" />
                  <span className="flex-1 bg-[#0f172a]" />
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* Offcanvas End */}
      </>
    </>
  );
};

export default FlyerGeneratorResult;
