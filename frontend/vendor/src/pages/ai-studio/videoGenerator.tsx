import { Link, useNavigate } from "react-router-dom"
import { Path } from "../../routes/path"
import { Slider } from "primereact/slider"
import { useState } from "react";

const VideoGenerator = () => {
      const navigate = useNavigate();
      const [seedValue, setSeedValue] = useState<number>(70)
       const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    navigate("/video-prompt-generator");

    
  };

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
            Video Generator
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
  <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
    <div className="bg-white border border-border-color rounded-lg p-1 flex items-center gap-1">
      <nav className="flex gap-2 flex-wrap" aria-label="Tabs">
        <Link
          to={Path.videoGenerator}
          className="py-1 px-2 rounded-lg font-medium flex items-center text-white bg-primary border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
          aria-current="page"
        >
          Create New Video
        </Link>
        <Link
          to={Path.videoGeneratorHistory}
          className="py-1 px-2 rounded-lg font-medium flex items-center text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          History
        </Link>
      </nav>
    </div>
  </div>
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
    <div className="xxl:col-span-4 xl:col-span-5 lg:col-span-12 flex">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 w-full">
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-color">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            Video Options
          </h2>
          <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary hover:border-primary transition hover:text-white dark:hover:text-dark! hover:border-primary flex items-center justify-center cursor-pointer">
            <i className="icon-refresh-ccw" />
          </button>
        </div>
        {/* Form */}
        <form>
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Video Type
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Select the type of video you want to upload or link.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <select className="select py-2 px-4 pe-9 block w-full bg-white border-border-color rounded-lg text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none">
                  <option>Select</option>
                  <option>Cinematic</option>
                  <option>3D Animation</option>
                  <option>Time-lapse</option>
                  <option>Drone Shot</option>
                </select>
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Audio
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Speak clearly. Avoid background noise.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end flex items-center justify-end">
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
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Multi Shot
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        This field cannot be edited later
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-end flex items-center justify-end">
                <label
                  htmlFor="custom-switch-two"
                  className="relative inline-block w-8 h-5 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="custom-switch-two"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                  <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                </label>
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Resolution
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Enter resolution in pixels (Width × Height).
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <select className="select py-2 px-4 pe-9 block w-full bg-white border-border-color rounded-lg text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none">
                  <option>Select</option>
                  <option>720p</option>
                  <option>1080p</option>
                  <option>2K</option>
                  <option>4K</option>
                </select>
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Duration
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Enter the duration in minutes.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <select className="select py-2 px-4 pe-9 block w-full bg-white border-border-color rounded-lg text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none">
                  <option>Select</option>
                  <option>5s</option>
                  <option>10s</option>
                  <option>15s</option>
                  <option>30s</option>
                </select>
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  No of Videos
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Enter the total number of videos
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <select className="select py-2 px-4 pe-9 block w-full bg-white border-border-color rounded-lg text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none">
                  <option>Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3 mb-5">
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Aspect Ratio
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Controls the shape of the image or container.
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <select className="select py-2 px-4 pe-9 block w-full bg-white border-border-color rounded-lg text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none">
                  <option>Select</option>
                  <option>Square (1:1)</option>
                  <option>Portrait (4:5)</option>
                  <option>Portrait (9:16 – Mobile/Stories)</option>
                  <option>Landscape (16:9 – Web/Banner)</option>
                  <option>Landscape (3:2)</option>
                  <option>Wide (21:9 – Cinematic)</option>
                </select>
              </div>
            </div>
          </div>
          {/* End grid  */}
          <div className="bg-light border border-border-color rounded-lg p-3">
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-3 items-center">
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-dark">
                  Seed
                  <div className="group relative flex items-center">
                    <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900">
                      <i className="ph-duotone ph-question" />
                    </span>
                    <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                      <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                        Enter a clear and descriptive value
                      </span>
                      <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6">
                <select className="select py-2 px-4 pe-9 block w-full bg-white border-border-color rounded-lg text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none">
                  <option>Select</option>
                  <option>Random</option>
                  <option>100</option>
                  <option>500</option>
                  <option>999</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <Slider 
                value={seedValue}
                onChange={(e) => setSeedValue(e.value as number)}
                className="w-full seed-slider"
              />
            </div>
          </div>
          {/* End grid  */}
        </form>
      </div>
    </div>
    {/* end col */}
    <div className="xxl:col-span-8 xl:col-span-7 lg:col-span-12 flex ">
      {/* Start Audio */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 w-full">
        <div className="flex itenms-center justify-between mb-5 pb-5 border-b border-border-color">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
            Generate Video
          </h2>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
              <i className="icon-undo" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
              <i className="icon-redo" />
            </button>
          </div>
        </div>
        {/* Start Prompt */}
        <div className="flex flex-col justify-between gap-6 h-[calc(100%-70px)]!">
          <div className="flex items-center justify-center flex-col text-center py-15">
            <div className="w-16 h-16 rounded-full bg-light text-2xl text-primary border border-border-color flex items-center justify-center mb-5">
              <i className="ph-duotone ph-video" />
            </div>
            <h3 className="mb-2 text-[16px]">No Video Found</h3>
            <p className="mb-0">
              Your recently generated Video will appear here.{" "}
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-1 block text-sm font-semibold text-dark">
              Prompt
            </div>
            <div className="relative mb-5 bg-light border border-border-color rounded-lg">
              <textarea
                className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light! dark:bg-white! border-none rounded-lg text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none resize-none"
                rows={4}
                placeholder="Ask me anything"
                defaultValue={""}
              />
              <div className="flex flex-wrap gap-2 items-center justify-between py-2.5 px-2.5 w-full">
                <div className="flex items-center space-x-2 grow">
                  <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                    <i className="icon-image" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-dark! flex items-center justify-center cursor-pointer">
                    <i className="icon-mic" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  {" "}
                  <i className="icon-sparkles font-normal" /> Generate Video
                </button>
              </div>
            </div>
            <div className="py-1 px-2 border border-border-color bg-light rounded-lg text-sm text-gray-600 inline-flex items-center gap-2">
              <div className="group relative flex items-center">
                <span className="text-gray-600 cursor-help transition-colors hover:text-gray-900 inline-flex items-center">
                  <i className="ph-duotone ph-question text-lg" />
                </span>
                <div className="absolute bottom-full -left-2 mb-2 -translate-x-2 w-[200px] flex-col items-center hidden group-hover:flex z-[9999]">
                  <span className="relative z-10 p-2 px-3 text-xs font-medium text-white whitespace-wrap bg-dark dark:bg-gray-100 rounded-lg shadow-xl">
                    Using this option will consume 6 credits
                  </span>
                  <div className="w-2 h-2 -mt-1 rotate-45 bg-dark dark:bg-gray-100  mr-auto relative left-5.5" />
                </div>
              </div>{" "}
              This will Use : 6 Credits
            </div>
          </form>
        </div>
        {/* End Prompt */}
      </div>
      {/* End Audio */}
    </div>
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default VideoGenerator