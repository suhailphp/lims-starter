import  { useState, useEffect } from 'react';
import { Slider } from 'primereact/slider';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import type { SlideImage } from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ImageWithBasePath from '../../components/image-with-base-path';
import { Images } from '../../utils/imagePath';

const ProposalGeneratorResult = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(50);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tabhide, settabhide] = useState(0);

  // Define the slides for the lightbox
  const slides: SlideImage[] = [
    { src: Images.proposal_1 },
    { src: Images.proposal_2 },
    { src: Images.proposal_3 },
    { src: Images.proposal_4 },
    { src: Images.proposal_5 },
    { src: Images.proposal_6 },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
  <>
  {/* Page Wrapper */}
  <div className="page-wrapper relative">
    <div className={`"bg-border-color w-full h-1.5 rounded-lg loading-state absolute top-0 start-0" ${!isLoading ? 'hidden' : ''}`}>
      <div
        className="rounded-lg h-1.5 bg-[image:var(--background-image-linear-gradient-500)]"
        style={{ width: "70%" }}
      />
    </div>
    {/* Flyer Topbar */}
    <div className="bg-white lg:border-t border-border-color flex items-center justify-between max-sm:justify-center flex-wrap gap-3 py-3 px-6 content-state hidden">
      <div className="hidden lg:flex items-center gap-2">
        <button className="size-8 bg-white text-gray-900 border border-border-color rounded-full hover:bg-primary hover:text-white flex items-center justify-center cursor-pointer dark:hover:text-dark dark:hover:text-dark">
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
    <div className="relative flex felx-col flex-wrap items-center justify-center h-[85vh]! w-full!">
      <div className="p-8 md:pb-36">
        {/* Start Grid  */}
        <div className="w-full">
          {/* Start Loading */}
          <div className={`flex flex-col items-center justify-center loading-state ${isLoading ? '' : 'hidden'}`}>
            <div className="flex items-center bg-white border border-primary mb-6 p-2 rounded-full ps-5 max-w-80 w-full">
              <input
                className="form-input bg-transparent ps-0 border-0 grow outline-0 focus:ring-0"
                placeholder="Finding Perfect Templates For You..."
              />
              <button className="w-9 h-9 rounded-full flex items-center justify-center bg-[image:var(--background-image-linear-gradient-500)] text-white">
                <i className="icon-circle-pause" />
              </button>
            </div>
            <h6 className="mb-2"> Generating Proposal... </h6>
            <p className="mb-0">
              {" "}
              This may take a few moments. Please wait while we create your
              Proposal.{" "}
            </p>
          </div>
          {/* End Loading */}
          <div>
            {/* Start Resume */}
            <div className={`content-state ${isLoading ? 'hidden' : ''}`}>
              <div className="bg-white px-4 py-3 rounded-full border border-border-color flex items-center justify-center mx-auto md:mr-auto mb-4 md:mb-0 gap-2 w-52! relative md:absolute md:top-5 md:end-5">
                <span className="text-dark">
                  0
                </span>
                <Slider 
                  value={sliderValue} 
                  onChange={(e) => setSliderValue(Array.isArray(e.value) ? e.value[0] : e.value)} 
                  className="w-full mx-1"
                />
                <span className="text-dark">
                  {sliderValue}%
                </span>
              </div>
              {/* Start Resume */}
              <div className="flex items-center justify-center w-full !max-w-[455px]">
                <div id="tab1" className={tabhide === 0 ? "block" : "hidden"} onClick={()=>settabhide(0)}>
  <div
    onClick={() => openLightbox(0)}
    className="image-popup h-full rounded-lg shadow cursor-pointer"
  >
    <ImageWithBasePath
      src={Images.proposal_1}
      className="rounded-lg mx-auto w-full h-full"
    />
  </div>
</div>

<div id="tab2" className={tabhide === 1 ? "block" : "hidden"} onClick={()=>settabhide(1)}>
  <div
    onClick={() => {
      openLightbox(1);
    }}
    className="image-popup h-full rounded-lg shadow cursor-pointer"
  >
    <ImageWithBasePath
      src={Images.proposal_2}
      className="rounded-lg mx-auto w-full h-full"
    />
  </div>
</div>
                <div className={tabhide === 2 ? "block" : "hidden"} id="tab3" onClick={()=>settabhide(2)}>
                  <div
                    onClick={() => openLightbox(2)}
                    className="image-popup h-full rounded-lg shadow cursor-pointer"
                  >
                    <ImageWithBasePath
                       src={Images.proposal_3}
                      alt="proposal image"
                      className="rounded-lg mx-auto w-full h-full"
                    />
                  </div>
                </div>
                <div className={tabhide === 3 ? "block" : "hidden"} id="tab4" onClick={()=>settabhide(3)}>
                  <div
                    onClick={() => openLightbox(3)}
                    className="image-popup h-full rounded-lg shadow cursor-pointer"
                  >
                    <ImageWithBasePath
                   src={Images.proposal_4}
                      alt="proposal image"
                      className="rounded-lg mx-auto w-full h-full"
                    />
                  </div>
                </div>
                <div className={tabhide === 4 ? "block" : "hidden"} id="tab5" onClick={()=>settabhide(4)}>
                  <div
                    onClick={() => openLightbox(4)}
                    className="image-popup h-full rounded-lg shadow cursor-pointer"
                  >
                    <ImageWithBasePath
                        src={Images.proposal_5}
                      alt="proposal image"
                      className="rounded-lg mx-auto w-full h-full"
                    />
                  </div>
                </div>
                <div className={tabhide === 5 ? "block" : "hidden"} id="tab6" onClick={()=>settabhide(5)}>
                  <div
                    onClick={() => openLightbox(5)}
                    className="image-popup h-full rounded-lg shadow cursor-pointer"
                  >
                    <ImageWithBasePath
                     src={Images.proposal_6}
                      alt="proposal image"
                      className="rounded-lg mx-auto w-full h-full"
                    />
                  </div>
                </div>
              </div>
              {/* End Resume */}
              {/* Start grid */}
              <div className="flex flex-row flex-wrap items-center gap-2 relative justify-center md:fixed inset-x-0 mx-auto bottom-3 mt-6 mb-4">
                <button
                  type="button"
                  className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
                >
                  <i className="icon-pencil-line text-[18px]!" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="generate-color"
                  data-hs-overlay="#generate-color"
                >
                  <i className="icon-palette text-[18px]!" />
                  <span>Color</span>
                </button>
                <button
                  type="button"
                  className="btn text-sm text-dark py-3 bg-white border border-border-color inline-flex flex-col gap-2 items-center justify-center shadow w-28 hover:shadow-lg hover:bg-primary transition hover:text-white hover:border-primary-500 aria-expanded:border-primary aria-expanded:ring-1 aria-expanded:ring-primary"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="generate-resume"
                  data-hs-overlay="#generate-resume"
                >
                  <i className="icon-layout-template text-[18px]!" />
                  <span>Templates</span>
                </button>
              </div>
              {/* End Grid */}
            </div>
            {/* End Resume */}
          </div>
        </div>
        {/* End Grid  */}
      </div>
      {/* <ImageWithBasePath
         src={Images.proposal_bg}
        alt=""
        className="absolute top-0 left-0 w-full -z"
      /> */}
    </div>
  </div>
  {/* End Page Wrapper */}

  <>
  {/* Generate Resume Offcanvas start */}
  <div
    id="generate-resume"
    className="remove-overlay hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed bottom-0 start-0 transition-all duration-300 transform overflow-hidden md:max-w-[400px] max-w-[300px] rounded-lg m-2 md:m-5 border border-border-color shadows w-full z-80 bg-white"
    role="dialog"
    tabIndex={-1}
    aria-labelledby="generate-resume-label"
  >
    <div className="flex justify-between items-center p-5">
      <h3 id="generate-resume-label" className="font-bold text-dark text-lg">
        Choose Your Template
      </h3>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger text-dark hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#generate-resume"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-5 pt-0 pb-22 overflow-y-scroll h-[calc(100vh-238px)]! max-md:h-[calc(100vh-140px)]!">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="tablist">
        <button
          type="button"
          onClick={() => settabhide(0)}
          className={`border rounded-lg p-2.5 transition ${tabhide === 0 ? 'border-primary' : 'border-border-color'}`}
          role="tab"
        >
          <ImageWithBasePath
            src={Images.proposal_img_1}
            alt="proposal image"
            className="rounded-lg w-full"
          />
        </button>
        <button
          type="button"
          onClick={() => settabhide(1)}
          className={`border rounded-lg p-2.5 transition ${tabhide === 1 ? 'border-primary' : 'border-border-color'}`}
          role="tab"
        >
          <ImageWithBasePath
           src={Images.proposal_img_2}
            alt="proposal image"
            className="rounded-lg w-full"
          />
        </button>
        <button
          type="button"
          onClick={() => settabhide(2)}
          className={`border rounded-lg p-2.5 transition ${tabhide === 2 ? 'border-primary' : 'border-border-color'}`}
          role="tab"
        >
          <ImageWithBasePath
        src={Images.proposal_img_3}
            alt="proposal image"
            className="rounded-lg w-full"
          />
        </button>
        <button
          type="button"
          onClick={() => settabhide(3)}
          className={`border rounded-lg p-2.5 transition ${tabhide === 3 ? 'border-primary' : 'border-border-color'}`}
          role="tab"
        >
          <ImageWithBasePath
                  src={Images.proposal_img_4}
            alt="proposal image"
            className="rounded-lg w-full"
          />
        </button>
        <button
          type="button"
          onClick={() => settabhide(4)}
          className={`border rounded-lg p-2.5 transition ${tabhide === 4 ? 'border-primary' : 'border-border-color'}`}
          role="tab"
        >
          <ImageWithBasePath
                 src={Images.proposal_img_5}
            alt="proposal image"
            className="rounded-lg w-full"
          />
        </button>
        <button
          type="button"
          onClick={() => settabhide(5)}
          className={`border rounded-lg p-2.5 transition ${tabhide === 5 ? 'border-primary' : 'border-border-color'}`}
          role="tab"
        >
          <ImageWithBasePath
            src={Images.proposal_img_6}
            alt="proposal image"
            className="rounded-lg w-full"
          />
        </button>
      </div>
    </div>
    <div className="text-center absolute bottom-0 start-0 p-5 flex items-center justify-center bg-white w-full">
      <Link
        to="#"
        className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
      >
        <i className="icon-loader" />
        Load More Templates
      </Link>
    </div>
  </div>
  {/* Generate Resume Offcanvas start */}
  {/* Generate Color Offcanvas start */}
  <div
    id="generate-color"
    className="hs-overlay hs-overlay-open:translate-x-0 hidden -translate-x-full fixed bottom-0 start-0 transition-all duration-300 transform md:max-w-[400px] max-w-[300px] rounded-lg m-2 md:m-5 border border-border-color shadows w-full z-80 bg-white"
    role="dialog"
    tabIndex={-1}
    aria-labelledby="generate-color-label"
  >
    <div className="flex justify-between items-center p-5">
      <h3 id="generate-color-label" className="font-bold text-dark text-lg">
        Color Options
      </h3>
      <button
        type="button"
        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-border-color bg-white hover:bg-danger text-dark hover:text-white focus:outline-hidden focus:bg-gray-200 dark:hover:text-dark"
        aria-label="Close"
        data-hs-overlay="#generate-color"
      >
        <span className="sr-only">Close</span>
        <i className="icon-x" />
      </button>
    </div>
    <div className="p-5 pt-0 overflow-y-scroll h-[calc(100vh-238px)]! max-md:h-[calc(100vh-140px)]!">
      <div className="space-y-4 my-5">
        <label
          htmlFor="color-palette-1"
          className="relative block cursor-pointer group"
        >
          <input
            type="radio"
            name="color-palette"
            id="color-palette-1"
            className="peer hidden"
            defaultChecked
          />
          <span className="flex h-10 w-full overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 peer-checked:ring-2 peer-checked:ring-indigo-500 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-slate-900 transition-all">
            <span className="flex-1 bg-[#14532d]" />
            <span className="flex-1 bg-[#facc15]" />
            <span className="flex-1 bg-[#fb923c]" />
            <span className="flex-1 bg-[#e5e7eb]" />
            <span className="flex-1 bg-transparent" />{" "}
            <span className="flex-1 bg-[#0f172a]" />
          </span>
        </label>
        <label
          htmlFor="color-palette-2"
          className="relative block cursor-pointer group"
        >
          <input
            type="radio"
            name="color-palette"
            id="color-palette-2"
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
        <label
          htmlFor="color-palette-3"
          className="relative block cursor-pointer group"
        >
          <input
            type="radio"
            name="color-palette"
            id="color-palette-3"
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
        <label
          htmlFor="color-palette-4"
          className="relative block cursor-pointer group"
        >
          <input
            type="radio"
            name="color-palette"
            id="color-palette-4"
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
  {/* Generate Color Offcanvas start */}
</>

{/* Lightbox */}
<Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  slides={slides}
  index={currentImageIndex}
/>

</>
  )
}

export default ProposalGeneratorResult