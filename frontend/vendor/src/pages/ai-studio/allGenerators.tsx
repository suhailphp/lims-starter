import { Link } from "react-router-dom"
import { Path } from "../../routes/path"

const AllGenerators = () => {
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
            All Generator
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
  <div className="text-center mb-5">
    <h2 className="mb-1">
      Your <span className="text-primary">AI Studio</span> Assistant
    </h2>
    <p className="mb-0">
      {" "}
      Create a Unlimited Images, Video, Audio, Text, Voice using Prompt{" "}
    </p>
  </div>
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
    {/* Grid Left */}
    <div className="xxl:col-span-10 xxl:col-start-2 xl:col-span-10 xl:col-start-2 lg:col-span-12 lg:col-start-1">
      {/* Item 1  */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 mb-5 flex flex-wrap items-center justify-between gap-3 hover:shadow-lg transition">
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full">
          <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-12 flex items-center gap-3">
            <div className="w-16 h-16 flex items-center text-3xl justify-center rounded-full bg-primary-50 border border-primary text-primary shrink-0">
              <i className="ph-duotone ph-google-photos-logo" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2 text-dark text-[18px]">
                Image Generator
              </h2>
              <p className="mb-0">
                {" "}
                Create high quality images from simple text prompts or reference
                visuals.
              </p>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-12 flex items-center justify-start! xl:justify-end!">
            <Link
              to={Path.imageGenerator}
              className="btn bg-light text-dark font-semibold inline-flex items-center border border-border-color hover:text-white hover:bg-primary hover:border-primary"
            >
              Get Started
              <i className="icon-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Item 2  */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 mb-5 flex flex-wrap items-center justify-between gap-3 hover:shadow-lg transition">
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full">
          <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-12 flex items-center gap-3">
            <div className="w-16 h-16 flex items-center text-3xl justify-center shrink-0 rounded-full shrink-0 bg-success-50 border border-success text-success">
              <i className="ph-duotone ph-video" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2 text-dark text-[18px]">
                Video Generator
              </h2>
              <p className="mb-0">
                {" "}
                Generate short or long form videos using text prompts, images,
                or scripts.
              </p>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-12 flex items-center justify-start! xl:justify-end!">
            <Link
              to={Path.videoGenerator}
              className="btn bg-light text-dark font-semibold inline-flex items-center border border-border-color hover:text-white hover:bg-primary hover:border-primary"
            >
              Get Started
              <i className="icon-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Item 3  */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 mb-5 flex flex-wrap items-center justify-between gap-3 hover:shadow-lg transition">
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full">
          <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-12 flex items-center gap-3">
            <div className="w-16 h-16 flex items-center text-3xl justify-center shrink-0 rounded-full bg-info-50 border border-info text-info">
              <i className="ph-duotone ph-file-audio" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2 text-dark text-[18px]">
                Audio Generator
              </h2>
              <p className="mb-0">
                {" "}
                Generate background music, sound effects, voiceovers, ambient
                sounds.
              </p>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-12 flex items-center justify-start! xl:justify-end!">
            <Link
              to={Path.audioGenerator}
              className="btn bg-light text-dark font-semibold inline-flex items-center border border-border-color hover:text-white hover:bg-primary hover:border-primary"
            >
              Get Started
              <i className="icon-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Item 4  */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 mb-5 flex flex-wrap items-center justify-between gap-3 hover:shadow-lg transition">
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full">
          <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-12 flex items-center gap-3">
            <div className="w-16 h-16 flex items-center text-3xl justify-center shrink-0 rounded-full bg-orange-50 border border-orange text-orange">
              <i className="ph-duotone ph-file-audio" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2 text-dark text-[18px]">
                Text Generator
              </h2>
              <p className="mb-0">
                {" "}
                Create articles, product descriptions, emails, summaries,
                translations &amp; structured content.
              </p>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-12 flex items-center justify-start! xl:justify-end!">
            <Link
              to={Path.textGenerator}
              className="btn bg-light text-dark font-semibold inline-flex items-center border border-border-color hover:text-white hover:bg-primary hover:border-primary"
            >
              Get Started
              <i className="icon-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
      {/* Item 5  */}
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 flex flex-wrap items-center justify-between gap-3 hover:shadow-lg transition">
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 w-full">
          <div className="xxl:col-span-8 xl:col-span-8 lg:col-span-12 flex items-center gap-3">
            <div className="w-16 h-16 flex items-center text-3xl justify-center shrink-0 rounded-full bg-teal-50 border border-teal text-teal">
              <i className="ph-duotone ph-user-sound" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2 text-dark text-[18px]">
                Voice Generator
              </h2>
              <p className="mb-0">
                {" "}
                Convert text into natural, human like speech using AI voices.
                Choose from multiple languages.{" "}
              </p>
            </div>
          </div>
          <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-12 flex items-center justify-start! xl:justify-end!">
            <Link
              to={Path.voiceGenerator}
              className="btn bg-light text-dark font-semibold inline-flex items-center border border-border-color hover:text-white hover:bg-primary hover:border-primary"
            >
              Get Started
              <i className="icon-chevron-right ms-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default AllGenerators