import { Link } from "react-router-dom";
import { Images } from "../../utils/imagePath";
import ImageWithBasePath from "../../components/image-with-base-path";
import { useState, useRef } from "react";
import { Slider } from "primereact/slider";

const PresentationSlider = () => {
  const [activeSlide, setActiveSlide] = useState("slide-1");
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTheme, setActiveTheme] = useState("white");
  const slideRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleTabClick = (slideId: string) => {
    setActiveSlide(slideId);
    
    // Scroll to the active slide
    setTimeout(() => {
      const element = slideRefs.current[slideId];
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    }, 0);
  };

  // Set refs for slide panels
  const setSlideRef = (slideId: string) => (el: HTMLDivElement | null) => {
    slideRefs.current[slideId] = el;
  };

  const handleThemeSelect = (theme: string) => {
    setActiveTheme(theme);
  };
  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Flyer Topbar */}
        <div className="bg-white lg:border-t border-border-color flex items-center justify-between max-sm:justify-center flex-wrap gap-3 py-3 px-6">
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
              <span className="text-gray-900">Prompt :</span> I want a slide
              deck about the future of AI .....
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
                  <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
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
        <div className="relative flex felx-col flex-wrap items-center justify-center h-[calc(100vh-120px)]! overflow-y-auto max-md:h-[calc(100vh-170px)]! w-full z-1">
          {/* Content */}
          <div className="content">
            <div className="bg-white px-4 py-3 rounded-full border border-border-color flex items-center justify-center mx-auto lg:mr-auto mb-4 lg:mb-0 gap-2 w-52! relative lg:absolute lg:top-8 lg:end-5">
              <span className="text-dark">
                0
              </span>
              <Slider 
                value={sliderValue} 
                onChange={(e) => setSliderValue(Array.isArray(e.value) ? e.value[0] : e.value)} 
                className="w-full mx-1 p-slider-horizontal"
              />
              <span className="text-dark">
                {sliderValue}%
              </span>
            </div>
            <div className="bg-white p-5 space-y-5 shadow border border-border-color rounded-lg lg:w-42 relative lg:fixed lg:top-38 lg:left-6 end-0 h-auto max-lg:mb-6 max-md:hidden">
              <h5 className="mb-5">Slides</h5>
              <div className="flex flex-col gap-5 max-lg:flex-row max-h-[calc(100vh-257px)]! overflow-y-auto">
                <div
                  className={`flex items-center gap-3 tab-trigger group ${activeSlide === 'slide-1' ? 'active' : ''}`}
                  onClick={() => handleTabClick('slide-1')}
                >
                  <p>01</p>
                  <div className="rounded-md group-[.active]:border group-[.active]:border-primary">
                    <ImageWithBasePath
                      src={Images.presentation_04}
                      alt="presentation"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 tab-trigger group ${activeSlide === 'slide-2' ? 'active' : ''}`}
                  onClick={() => handleTabClick('slide-2')}
                >
                  <p>02</p>
                  <div className="rounded-md group-[.active]:border group-[.active]:border-primary">
                    <ImageWithBasePath
                      src={Images.presentation_05}
                      alt="presentation"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 tab-trigger group ${activeSlide === 'slide-3' ? 'active' : ''}`}
                  onClick={() => handleTabClick('slide-3')}
                >
                  <p>03</p>
                  <div className="rounded-md group-[.active]:border group-[.active]:border-primary">
                    <ImageWithBasePath
                      src={Images.presentation_06}
                      alt="presentation"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 tab-trigger group ${activeSlide === 'slide-4' ? 'active' : ''}`}
                  onClick={() => handleTabClick('slide-4')}
                >
                  <p>04</p>
                  <div className="rounded-md group-[.active]:border group-[.active]:border-primary">
                    <ImageWithBasePath
                      src={Images.presentation_07}
                      alt="presentation"
                      className="rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end card */}
            {/* Start grid */}
            <div className="flex flex-row max-md:flex-wrap md:flex-col items-center gap-2 relative md:fixed md:end-6 end-0 h-auto md:bottom-6 justify-center mb-4 md:mb-0">
              <Link
                to="#"
                className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
              >
                <i className="icon-pencil-line text-[18px]!" />
                <span>Edit</span>
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
            <div className="max-w-[700px] max-xl:max-w-[500px] max-lg:max-w-[400px] mx-auto">
              <div className="space-y-6">
                <div ref={setSlideRef('slide-1')} id="slide-1" className="slide-panel">
                  <div className="mb-6">
                    <ImageWithBasePath
                      src={Images.presentation_04}
                      alt="slider"
                      className="rounded-md"
                    />
                  </div>
                  <div className="text-center">
                    <Link
                      to="#"
                      className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white inline-flex items-center justify-center"
                    >
                      <i className="icon-plus me-2" />
                      Add New
                    </Link>
                  </div>
                </div>
                <div ref={setSlideRef('slide-2')} id="slide-2" className="slide-panel">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white inline-flex items-center justify-center cursor-pointer"
                    >
                      <i className="icon-layout-template me-2" />
                      Layout
                    </button>
                    <Link
                      to="#"
                      className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white inline-flex items-center justify-center"
                    >
                      <i className="icon-pencil-line me-2" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="size-9 bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center rounded-lg cursor-pointer"
                    >
                      <i className="icon-trash-2" />
                    </button>
                  </div>
                  <ImageWithBasePath
                    src={Images.presentation_05}
                    alt="slider"
                    className="rounded-md"
                  />
                </div>
                <div ref={setSlideRef('slide-3')} id="slide-3" className="slide-panel">
                  <ImageWithBasePath
                    src={Images.presentation_06}
                    alt="slider"
                    className="rounded-md"
                  />
                </div>
                <div ref={setSlideRef('slide-4')} id="slide-4" className="slide-panel">
                  <ImageWithBasePath
                    src={Images.presentation_07}
                    alt="slider"
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
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
    className="remove-overlay [--overlay-backdrop:false] hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed bottom-0 end-0 transition-all duration-300 transform md:max-w-[400px] max-w-[300px] rounded-lg m-2 md:m-6 border overflow-hidden border-border-color shadows w-full z-80 bg-white"
    role="dialog"
    tabIndex={-1}
  >
    <div className="flex justify-between items-center p-5">
      <h3 className="font-bold text-dark text-lg">Themes</h3>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger hover:border-danger text-dark hover:text-white focus:outline-hidden cursor-pointer dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#generate-flyer"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-5 pt-0 space-y-6 pb-22 overflow-y-scroll h-[calc(100vh-238px)]! max-md:h-[calc(100vh-140px)]!">
      <div 
        className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'white' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`}
        onClick={() => handleThemeSelect('white')}
      >
        <div className="bg-light rounded-lg p-5 text-center mb-4">
          <div className="bg-gray-200 h-2 w-full mb-3" />
          <p className="text-gray-900 text-xl max-lg:text-lg font-medium mb-0">
            Title
          </p>
        </div>
        <p className="text-gray-900 font-semibold mb-0">White</p>
      </div>{" "}
      {/* end card */}
      <div 
        className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'purple' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`}
        onClick={() => handleThemeSelect('purple')}
      >
        <div className="bg-primary rounded-lg p-5 text-center mb-4">
          <div className="bg-orange h-2 w-full mb-3" />
          <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
            Title
          </p>
        </div>
        <p className="text-gray-900 font-semibold mb-0">Purple</p>
      </div>{" "}
      {/* end card */}
      <div 
        className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'cosmic-pulse' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`}
        onClick={() => handleThemeSelect('cosmic-pulse')}
      >
        <div className="bg-linear-gradient-700 rounded-lg p-5 text-center mb-4">
          <div className="bg-white h-2 w-full mb-3" />
          <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
            Title
          </p>
        </div>
        <p className="text-gray-900 font-semibold mb-0">Cosmic Pulse</p>
      </div>{" "}
      {/* end card */}
      <div 
        className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'copenhagen-dark' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`}
        onClick={() => handleThemeSelect('copenhagen-dark')}
      >
        <div className="bg-info-700 rounded-lg p-5 text-center mb-4">
          <div className="bg-white h-2 w-full mb-3" />
          <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
            Title
          </p>
        </div>
        <p className="text-gray-900 font-semibold mb-0">Copenhagen Dark</p>
      </div>{" "}
      {/* end card */}
      <div 
        className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'cosmic-pulse-dark' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`}
        onClick={() => handleThemeSelect('cosmic-pulse-dark')}
      >
        <div className="bg-primary-950 rounded-lg p-5 text-center mb-4">
          <div className="bg-success h-2 w-full mb-3" />
          <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
            Title
          </p>
        </div>
        <p className="text-gray-900 font-semibold mb-0">Cosmic Pulse Dark</p>
      </div>{" "}
      {/* end card */}
      <div 
        className={`bg-white rounded-lg border border-border-color text-center p-5 shadow cursor-pointer theme-card ${activeTheme === 'tokyo-dark' ? '[&.active]:bg-primary-50 [&.active]:border-primary active' : ''}`}
        onClick={() => handleThemeSelect('tokyo-dark')}
      >
        <div className="bg-dark rounded-lg p-5 text-center mb-4">
          <div className="bg-primary h-2 w-full mb-3" />
          <p className="text-white text-xl max-lg:text-lg font-medium mb-0">
            Title
          </p>
        </div>
        <p className="text-gray-900 font-semibold mb-0">Tokyo Dark</p>
      </div>{" "}
      {/* end card */}
    </div>
    <div className="text-center absolute bottom-0 start-0 p-5 flex items-center justify-center bg-white w-full">
      <Link
        to="#"
        className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
      >
        <i className="icon-loader" />
        Load More
      </Link>
    </div>
  </div>
  {/* Offcanvas End */}
</>

    </>
  );
};

export default PresentationSlider;
