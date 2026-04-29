import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import CommonSelect from "../../components/common-select/commonSelect"
import { Aspect_Ratio, Effects, Models } from "../../utils/json/selectData"
import { Slider } from "primereact/slider"
import { useState } from "react"

const ImageGenerator = () => {
  const [sliderValue, setSliderValue] = useState(50)

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
          <li className="text-default">
            <Link
              to={Path.allGenerators}
              className="inline-flex items-center gap-1 text-gray-600 hover:text-primary"
            >
              AI Studio
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Image Generator
          </li>
        </ol>
      </nav>
    </div>
    <div className=" bg-white font-medium border border-border-color rounded-full px-4 py-2.5 text-gray-900 flex items-center">
      <span className="flex border-r-2 border-gray-200 pe-3 me-3 text-warning font-bold leading-none">
        {" "}
        <i className="ph-duotone ph-sparkle text-lg" />{" "}
      </span>{" "}
      Available Credits : 100
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
    <div className="xxl:col-span-4 xl:col-span-5 lg:col-span-12">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-color">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            Generate Image
          </h2>
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary hover:border-primary transition hover:text-white dark:hover:text-dark! hover:border-primary flex items-center justify-center cursor-pointer">
            <i className="icon-refresh-ccw" />
          </button>
        </div>
        <form>
          <div className="mb-5">
            <div className="mb-1 block text-sm font-semibold text-dark">
              Prompt
            </div>
            <div className="relative bg-light border border-border-color rounded-lg">
              <textarea
                className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full border-none resize-none rounded-lg sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                rows={3}
                placeholder="Ask me anything"
                defaultValue={""}
              />
              <div className="flex items-center space-x-2 py-2.5 px-2.5 bg-white rounded-lg start-0 z-10 w-full">
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-image" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                  <i className="icon-mic" />
                </button>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Image Style
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Choose the visual style for the image appearance.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="realistic"
                  className="peer hidden"
                  defaultChecked
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  Realistic
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="artistic"
                  className="peer hidden"
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  Artistic
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="style-choice"
                  defaultValue="vintage"
                  className="peer hidden"
                />
                <span className="btn border border-gray-200 text-dark rounded-lg inline-block transition-colors peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  Vintage
                </span>
              </label>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Image Resolution
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Image quality levels based on resolution
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
            <Slider value={sliderValue} onChange={(e) => setSliderValue(e.value as number)} className="w-full" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs">Low</span>
              <span className="text-xs">Medium</span>
              <span className="text-xs">High</span>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Aspect Ratio
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Defines the width-to-height proportion of the image.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
           <CommonSelect 
            options={Aspect_Ratio} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" 
              />
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Effects
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Apply visual effects to enhance image appearance.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
           <CommonSelect 
            options={Effects} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" 
              />
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              Models
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Select the image generation model or style preset.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
             <CommonSelect 
            options={Models} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" 
              />
          </div>
          <div className="mb-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-dark">
              No of Images
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                  <i className="ph-duotone ph-question" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Enter the total number of images to upload.
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-1.5">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={1}
                  className="peer hidden"
                  defaultChecked
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white hover:border-primary">
                  1
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={2}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  2
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={3}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  3
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={4}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  4
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={5}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  5
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={6}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  6
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={7}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  7
                </span>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="number-selection"
                  defaultValue={8}
                  className="peer hidden"
                />
                <span className="w-8 h-8 font-medium flex items-center justify-center rounded-lg border border-border-color bg-light text-dark transition-all peer-checked:bg-primary peer-checked:text-white dark:peer-checked:text-dark peer-checked:border-primary hover:bg-primary hover:text-white dark:hover:text-dark hover:border-primary">
                  8
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="mb-1 block text-sm font-semibold text-dark">
              High Contrast
            </div>
            <label
              htmlFor="custom-switch-six"
              className="relative inline-block w-8 h-5 cursor-pointer"
            >
              <input
                type="checkbox"
                id="custom-switch-six"
                className="peer sr-only"
                defaultChecked
              />
              <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
              <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
            </label>
          </div>
          <div className="mb-5">
            <Link
              to={Path.imageGeneratorHelp}
              className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg w-full hover:bg-primary dark:hover:text-dark! focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              {" "}
              <i className="icon-sparkles font-normal" /> Generate Image
            </Link>
          </div>
          <div className="py-1 px-2 border border-border-color bg-light rounded-lg text-sm text-gray-600 inline-flex items-center gap-2">
            <div className="group relative flex items-center">
              <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 text-lg inline-flex items-center">
                <i className="ph-duotone ph-question" />
              </span>
              <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                  Using this option will consume 6 credits
                </span>
                <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5.5" />
              </div>
            </div>
            This will Use : 6 Credits
          </div>
        </form>
      </div>
    </div>{" "}
    {/* end col */}
    {/* Grid right */}
    <div className="xxl:col-span-8 xl:col-span-7 lg:col-span-12">
      <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
        Generated Image
      </h2>
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 text-center flex flex-col justify-center items-center">
        <div className="w-16 h-16 rounded-full bg-light text-2xl text-primary border border-border-color flex items-center justify-center mb-5">
          <i className="ph-duotone ph-images" />
        </div>
        <h3 className="mb-2 text-[16px]">No Images Generated Yet</h3>
        <p className="mb-0">
          {" "}
          Start by entering a prompt and clicking "Generate Image" to <br />{" "}
          create your first AI-generated image.{" "}
        </p>
      </div>
      {/* Start History Accordian */}
      <div className="relative mt-5 pt-5 border-t border-border-color">
        <Link
          to="#"
          className="text-sm text-danger font-normal hover:text-danger-800 absolute end-0 top-5"
        >
          Clear All
        </Link>
        <div className="hs-accordion active">
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
            className="hs-accordion-content w-full overflow-hidden duration-300"
            role="region"
          >
            <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 text-center flex flex-col justify-center items-center mt-5">
              <div className="w-16 h-16 rounded-full bg-light text-2xl text-primary border border-border-color flex items-center justify-center mb-5">
                <i className="ph-duotone ph-clock-clockwise" />
              </div>
              <h3 className="mb-2 text-[16px]">No Recent Activity</h3>
              <p className="mb-0">
                {" "}
                Your recently generated images will appear here.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End History Accordian */}
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default ImageGenerator