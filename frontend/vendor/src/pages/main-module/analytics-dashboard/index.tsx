import { useEffect } from "react"
import ImageWithBasePath from "../../../components/image-with-base-path"
import { Images } from "../../../utils/imagePath"
import ModalChart from "./modalChart"
import PerformanceChart from "./performanceChart"
import PerformanceWeekChart from "./performanceWeekChart"
import PerformanceMonthChart from "./performanceMonthChart"
import PerformanceDayChart from "./performanceDayChart"
import ImageProgress from "./imageProgressChart"
import ProgressChart from "./progressChart"
import AudioProgress from "./audioChart"
import TextProgress from "./textChart"
import VoiceProgress from "./voiceChart"
import RequestChart from "./totalAiChart"
import AccuracyChart from "./accuracyChart"
import HealthChart from "./healthChart"
import PredefinedDatePicker from "../../../components/common-daterange-picker/commonDateRangePicker"
import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu"

const AnalyticsDashboard = () => {
 useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  return (
  <div className="p-6 pb-0">
    {/* Breadcrumb */}
    <div className="flex items-center justify-between flex-wrap page-breadcrumb gap-3 mb-6">
      <div className="my-auto">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center flex-wrap space-x-1 md:space-x-2">
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
              Analytics Dashboard
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <PredefinedDatePicker />
        <DropdownMenu
          trigger={
            <>
              <i className="icon-funnel" />
              All Models
              <i className="icon-chevron-down" />
            </>
          }
          triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
        >
          <div className="p-2 space-y-1">
            <Link
              to="#"
              className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
            >
              GPT-4o
            </Link>
            <Link
              to="#"
              className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
            >
              GPT-4.1
            </Link>
            <Link
              to="#"
              className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
            >
              Claude 3 Opus
            </Link>
            <Link
              to="#"
              className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
            >
              Llama 3
            </Link>
            <Link
              to="#"
              className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
            >
              Mistral Large
            </Link>
          </div>
        </DropdownMenu>
        <Link
          to="#"
          className="btn bg-primary border border-primary text-white hover:bg-primary-800 hover:border-primary-800 hover:text-white flex items-center justify-center"
        >
          <i className="icon-sparkles me-2" />
          AI Assistance
        </Link>
      </div>
    </div>
    {/* /Breadcrumb */}
    {/* Start grid */}
    <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
      <div className="xxl:col-span-8 xl:col-span-7 flex">
        <div className="bg-white rounded-lg border border-border-color p-6 mb-6 relative w-full overflow-hidden z-1 flex items-center justify-between">
          <div>
            <h3 className="mb-2">
              Need Help? Create your{" "}
              <span className="block bg-clip-text text-transparent bg-primary-gradient">
                Content in Single Click{" "}
              </span>
            </h3>
            <p className="mb-5">Integrate AI into your Applications</p>
            <Link
              to={Path.aiTools}
              className="btn bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 hover:border-primary-800 hover:text-white inline-flex items-center"
            >
              Get Started
              <i className="icon-chevron-right ms-2" />
            </Link>
          </div>
          <div className="relative max-sm:hidden">
            <ImageWithBasePath
                                src={Images.stack}
                                alt="logo-small"
                              />
            <ImageWithBasePath
                                src={Images.star_01}
                                alt="logo-small"
                                className="absolute end-1 top-0 -z-1"
                              />
            <ImageWithBasePath
                                src={Images.star_02}
                                alt="logo-small"
                                className="absolute -start-7 bottom-0 -z-1"
                              />
            <ImageWithBasePath
              src={Images.star_02}
              alt=""
              className="absolute -start-7 bottom-0 -z-1"
            />
          </div>
          <ImageWithBasePath
            src={Images.card_bg_02}
            alt=""
            className="absolute start-0 bottom-0 -z-1 max-md:hidden"
          />
          <ImageWithBasePath
            src={Images.card_bg_03}
            alt=""
            className="absolute end-0 bottom-0 -z-1 max-md:hidden"
          />
          <ImageWithBasePath
            src={Images.card_bg_04}
            alt=""
            className="absolute top-0 end-0 -z-1 max-md:hidden"
          />
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end col */}
      <div className="xxl:col-span-4 xl:col-span-5 flex">
        <div className="bg-primary-gradient rounded-lg p-5 mb-6 relative w-full overflow-hidden z-1">
          <h2 className="mb-5 text-white text-lg max-lg:text-[17px]">
            Quick Stats
          </h2>
          <div className="flex items-center justify-between rounded-full bg-white/10 py-2 px-4 mb-2">
            <p className="text-white flex items-center">
              <i className="icon-clock-4 text-base me-2" />
              Avg Response Time
            </p>
            <p className="text-white font-semibold">168ms</p>
          </div>
          <div className="flex items-center justify-between rounded-full bg-white/10 py-2 px-4 mb-2">
            <p className="text-white flex items-center">
              <i className="icon-file-check-corner text-base me-2" />
              Success Rate
            </p>
            <p className="text-white font-semibold">97.9%</p>
          </div>
          <div className="flex items-center justify-between rounded-full bg-white/10 py-2 px-4 mb-2">
            <p className="text-white flex items-center">
              <i className="icon-user-round text-base me-2" />
              Active Users
            </p>
            <p className="text-white font-semibold">12,483</p>
          </div>
          <div className="flex items-center justify-between rounded-full bg-white/10 py-2 px-4 mb-2">
            <p className="text-white flex items-center">
              <i className="icon-workflow text-base me-2" />
              Data Processed
            </p>
            <p className="text-white font-semibold">847 GB</p>
          </div>
          <ImageWithBasePath
            src={Images.card_bg_05}
            alt=""
            className="absolute -top-10 end-0 -z-1 mix-blend-luminosity animate-rotate-slow max-md:hidden"
          />
        </div>
      </div>{" "}
      {/* end col */}
    </div>
    {/* end grid */}
    <div className="grid-cols-1">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-book-audio me-2" />
            Models Usage
          </h2>
          <div className="flex items-center flex-wrap gap-2">
            <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
              <i className="ph-fill ph-circle text-[8px] text-primary me-1" />
              GPT-4.1
            </span>
            <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
              <i className="ph-fill ph-circle text-[8px] text-success me-1" />
              Llama 3
            </span>
            <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
              <i className="ph-fill ph-circle text-[8px] text-warning me-1" />
              Mistral Large
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu
              trigger={
                <>
                  <i className="icon-bot" />
                  All Models
                  <i className="icon-chevron-down" />
                </>
              }
              triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
              menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            >
              <div className="p-2 space-y-1">
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  GPT-4o
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  GPT-4.1
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Claude 3 Opus
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Llama 3
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Mistral Large
                </Link>
              </div>
            </DropdownMenu>
            <DropdownMenu
              trigger={
                <>
                  <i className="icon-calendar-days" />
                  Yearly
                  <i className="icon-chevron-down" />
                </>
              }
              triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
              menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
            >
              <div className="p-2 space-y-1">
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Monthly
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Weekly
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Yearly
                </Link>
                <Link
                  to="#"
                  className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                >
                  Today
                </Link>
              </div>
            </DropdownMenu>
          </div>
        </div>
        {/* Modals usage chart */}
        <ModalChart/>
      </div>
    </div>{" "}
    {/* end grid */}
    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-x-6 w-full">
      <div className="md:col-span-6 xl:col-span-4 flex">
        <div className="bg-white rounded-lg border border-border-color p-5 mb-6 relative w-full flex flex-col justify-between overflow-hidden z-1">
          <div className="flex items-center justify-between gap-2 mb-5">
            <p className="font-semibold text-gray-900">Total AI Requests</p>
            <div className="size-16 bg-primary border-4 border-primary-200 outline-4 outline-primary-100 flex items-center justify-center rounded-full text-2xl text-white">
              <i className="ph-duotone ph-webhooks-logo" />
            </div>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl max-lg:text-xl mb-2">2.4M</h2>
              <div className="flex items-center flex-wrap gap-2">
                <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                  <i className="icon-arrow-up-right me-1" />
                  21%
                </span>
                <p>Last Month</p>
              </div>
            </div>
            <div>
              {/* <div id="request-chart" /> */}
              <RequestChart/>
            </div>
          </div>
          <ImageWithBasePath
            src={Images.card_bg_06}
            alt=""
            className="absolute w-full top-0 start-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end col */}
      <div className="md:col-span-6 xl:col-span-4 flex">
        <div className="bg-white rounded-lg border border-border-color p-5 mb-6 relative w-full flex flex-col justify-between overflow-hidden z-1">
          <div className="flex items-center justify-between gap-2 mb-5">
            <p className="font-semibold text-gray-900">Model Accuracy</p>
            <div className="size-16 bg-info border-4 border-info-200 outline-4 outline-info-100 flex items-center justify-center rounded-full text-2xl text-white">
              <i className="ph-duotone ph-trend-up" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl max-lg:text-xl mb-2">15%</h2>
              <div className="flex items-center flex-wrap gap-2">
                <span className="inline-flex items-center badge-small rounded-md font-medium bg-danger-50 text-danger border border-danger">
                  <i className="icon-arrow-down-right me-1" />
                  21%
                </span>
                <p>Last Month</p>
              </div>
            </div>
            <div>
              {/* <div id="accuracy-chart" /> */}
              <AccuracyChart/>
            </div>
          </div>
          <ImageWithBasePath
            src={Images.card_bg_07}
            alt=""
            className="absolute w-full top-0 start-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end col */}
      <div className="md:col-span-12 xl:col-span-4 flex">
        <div className="bg-white rounded-lg border border-border-color p-5 mb-6 relative w-full flex flex-col justify-between overflow-hidden z-1">
          <div className="flex items-center justify-between gap-2 mb-5">
            <p className="font-semibold text-gray-900">System Health</p>
            <div className="size-16 bg-success border-4 border-success-200 outline-4 outline-success-100 flex items-center justify-center rounded-full text-2xl text-white">
              <i className="ph-duotone ph-heartbeat" />
            </div>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <h2 className="text-2xl max-lg:text-xl mb-2">99.2%</h2>
              <div className="flex items-center flex-wrap gap-2">
                <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                  <i className="icon-arrow-up-right me-1" />
                  5%
                </span>
                <p>Last Month</p>
              </div>
            </div>
            <div>
              {/* <canvas id="health-chart" className="h-14 w-30" /> */}
              <HealthChart/>
            </div>
          </div>
          <ImageWithBasePath
            src={Images.card_bg_14}
            alt=""
            className="absolute w-full top-0 start-0 -z-1"
          />
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end col */}
    </div>{" "}
    {/* end grid */}
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
      <div className="xxl:col-span-8 xl:col-span-7 flex">
        <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
            <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
              <i className="icon-chart-area me-2" />
              Performance Metrics
            </h2>
            <nav
              className="flex justify-between gap-x-2"
              role="tablist"
              aria-orientation="horizontal"
            >
              <button
                type="button"
                className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white dark:hs-tab-active:text-dark hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary  hover:text-white dark:hover:text-dark"
                id="tab-day"
                data-hs-tab="#day"
                aria-controls="day"
                role="tab"
                aria-selected="false"
              >
                Day
              </button>
              <button
                type="button"
                className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white dark:hs-tab-active:text-dark hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark"
                id="tab-week"
                data-hs-tab="#week"
                aria-controls="week"
                role="tab"
                aria-selected="false"
              >
                Week
              </button>
              <button
                type="button"
                className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white dark:hs-tab-active:text-dark hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark"
                id="tab-month"
                data-hs-tab="#month"
                aria-controls="month"
                role="tab"
                aria-selected="false"
              >
                Month
              </button>
              <button
                type="button"
                className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white dark:hs-tab-active:text-dark hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark active"
                id="tab-year"
                data-hs-tab="#year"
                aria-controls="year"
                role="tab"
                aria-selected="true"
              >
                Yearly
              </button>
            </nav>
          </div>
          <div className="mb-4">
            <div id="year" role="tabpanel" aria-labelledby="tab-year">
              <PerformanceChart/>
            </div>
            <div
              id="week"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tab-day"
            >
              <PerformanceWeekChart/>
            </div>
            <div
              id="month"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tab-month"
            >
              <PerformanceMonthChart/>
            </div>
            <div
              id="day"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tab-day"
            >
               <PerformanceDayChart/>
            </div>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-2">
            <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
              <i className="ph-fill ph-circle text-[8px] text-primary me-1" />
              Accuracy Overtime
            </span>
            <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
              <i className="ph-fill ph-circle text-[8px] text-warning me-1" />
              Inference Latency (ms)
            </span>
          </div>
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end col */}
      <div className="xxl:col-span-4 xl:col-span-5 flex">
        <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
          <div className="mb-5">
            <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
              <i className="icon-chart-scatter me-2" />
              Requests by Category
            </h2>
          </div>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p>Image Generator</p>
              <p className="text-gray-900 font-semibold">95K</p>
            </div>
            <div>
              <ImageProgress/>
              {/* <canvas id="image-progress" className="h-7" /> */}
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p>Video Generator</p>
              <p className="text-gray-900 font-semibold">90K</p>
            </div>
            <div>
              {/* <canvas id="progressChart" className="h-7" /> */}
              <ProgressChart/>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p>Audio Generator</p>
              <p className="text-gray-900 font-semibold">80K</p>
            </div>
            <div>
              {/* <canvas id="audio-progress" className="h-7" /> */}
              <AudioProgress/>
            </div>
          </div>
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p>Text Generator</p>
              <p className="text-gray-900 font-semibold">60K</p>
            </div>
            <div>
              {/* <canvas id="text-progress" className="h-7" /> */}
              <TextProgress/>
            </div>
          </div>
          <div className="mb-0">
            <div className="flex items-center justify-between mb-0">
              <p>Voice Generator</p>
              <p className="text-gray-900 font-semibold">25K</p>
            </div>
            <div>
              {/* <canvas id="voice-progress" className="h-7" /> */}
              <VoiceProgress/>
            </div>
          </div>
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end col */}
    </div>{" "}
    {/* end grid */}
  </div>

  )
}

export default AnalyticsDashboard