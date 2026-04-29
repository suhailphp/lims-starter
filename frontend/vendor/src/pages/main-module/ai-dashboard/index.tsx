import { useEffect } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import CostChart from "./costChart";
import StorageChart from "./storageChart";
import ContentChart from "./contentChart";
import AgentChart from "./agentChart";
import PredefinedDatePicker from "../../../components/common-daterange-picker/commonDateRangePicker";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import MapChart from "./mapChart";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const Dashboard = () => {
  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  return (
    <div className="p-6 pb-0">
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
                AI Dashboard
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <PredefinedDatePicker />
          <DropdownMenu
            trigger={
              <>
                <i className="icon-arrow-down-to-line"></i>Export
              </>
            }
            triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
          >
            <div className="p-2 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
              >
                Export as PDF
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
              >
                Export as Excel
              </a>
            </div>
          </DropdownMenu>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1">
        <div className="bg-primary-gradient rounded-lg p-10 mb-6 relative overflow-hidden z-1 max-md:p-5">
          <div>
            <h2 className="text-white mb-2">Welcome Andrew Joseph</h2>
            <p className="text-white mb-5">
              Experience the future of Productivity
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                to={Path.allGenerators}
                className="bg-white/10 border border-bg/white-10 dark:border-gray-500 dark:hover:border-white rounded-full inline-flex items-center font-medium text-white hover:bg-white hover:border-white hover:text-gray-900 gap-2 p-1 pr-4"
              >
                <span className="size-10 flex items-center justify-center rounded-full bg-primary-50 text-[25px] text-primary">
                  <i className="ph-duotone ph-drone" />
                </span>
                AI Studio
                <i className="icon-chevron-right" />
              </Link>
              <Link
                to={Path.addAgent}
                className="bg-white/10 border border-bg/white-10 dark:border-gray-500 dark:hover:border-white rounded-full inline-flex items-center font-medium text-white hover:bg-white hover:border-white hover:text-gray-900 gap-2 p-1 pr-4"
              >
                <span className="size-10 flex items-center justify-center rounded-full bg-primary-50 text-[25px] text-primary">
                  <i className="ph-duotone ph-cube" />
                </span>
                New Agent
                <i className="icon-chevron-right" />
              </Link>
            </div>
          </div>
          <div className="flex items-end gap-2 absolute end-10.5 bottom-0 max-xl:hidden">
            <ImageWithBasePath
              src={Images.dashboard_01}
              alt="ai"
              className="rounded-xl"
            />
            <div className="gap-2.5 flex flex-col -bottom-2 relative">
              <ImageWithBasePath
                src={Images.dashboard_02}
                alt="ai"
                className="rounded-xl"
              />
              <ImageWithBasePath
                src={Images.dashboard_03}
                alt="ai"
                className="rounded-xl"
              />
            </div>
          </div>
          <ImageWithBasePath
            src={Images.dashboard_bg}
            alt=""
            className="absolute top-0 end-22 -z-1 max-md:hidden max-xxl:end-10.5"
          />
        </div>{" "}
        {/* end card */}
      </div>
      {/* End grid */}
      <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
        <div className="xxl:col-span-4 xl:col-span-5 flex w-full">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 w-full">
            <div className="sm:col-span-6 flex">
              <div className="bg-primary-gradient-100 rounded-lg border border-border-color p-5 mb-6 relative w-full z-1">
                <div className="relative size-10 mb-5">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-9 bg-primary rounded-full" />
                  <div className="relative z-10 size-full bg-white/70 border border-white backdrop-blur-[14px] flex items-center justify-center rounded-full text-2xl text-primary">
                    <i className="ph-duotone ph-windmill" />
                  </div>
                </div>
                <p className="text-dark mb-2">Active Models</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl max-lg:text-lg">5</h2>
                  <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                    <i className="icon-arrow-up-right me-1" />
                    5%
                  </span>
                </div>
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="sm:col-span-6 flex">
              <div className="bg-success-gradient-100 rounded-lg border border-border-color p-5 mb-6 relative w-full z-1">
                <div className="relative size-10 mb-5">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-9 bg-success rounded-full" />
                  <div className="relative z-10 size-full bg-white/70 border border-white backdrop-blur-[14px] flex items-center justify-center rounded-full text-2xl text-success">
                    <i className="ph-duotone ph-hand-peace" />
                  </div>
                </div>
                <p className="text-dark mb-2">Success Rate</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl max-lg:text-lg">99.8%</h2>
                  <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                    <i className="icon-arrow-up-right me-1" />
                    5%
                  </span>
                </div>
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="sm:col-span-6 flex">
              <div className="bg-warning-gradient-100 rounded-lg border border-border-color p-5 mb-6 relative w-full z-1">
                <div className="relative size-10 mb-5">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-9 bg-warning rounded-full" />
                  <div className="relative z-10 size-full bg-white/70 border border-white backdrop-blur-[14px] flex items-center justify-center rounded-full text-2xl text-warning">
                    <i className="ph-duotone ph-user-switch" />
                  </div>
                </div>
                <p className="text-dark mb-2">API Requests</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl max-lg:text-lg">1.2M</h2>
                  <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                    <i className="icon-arrow-up-right me-1" />
                    5%
                  </span>
                </div>
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="sm:col-span-6 flex">
              <div className="bg-info-gradient-100 rounded-lg border border-border-color p-5 mb-6 relative w-full z-1">
                <div className="relative size-10 mb-5">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-9 bg-info rounded-full" />
                  <div className="relative z-10 size-full bg-white/70 border border-white backdrop-blur-[14px] flex items-center justify-center rounded-full text-2xl text-info">
                    <i className="ph-duotone ph-clock-countdown" />
                  </div>
                </div>
                <p className="text-dark mb-2">Avg Response</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl max-lg:text-lg">124ms</h2>
                  <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                    <i className="icon-arrow-up-right me-1" />
                    5%
                  </span>
                </div>
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
            <div className="sm:col-span-12 flex">
              <div className="bg-white rounded-lg border border-border-color mb-6 relative w-full flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between gap-2 p-5">
                  <div>
                    <p className="mb-1">Storage Status</p>
                    <h2 className="text-xl max-lg:text-lg">
                      234 GB /
                      <span className="text-sm font-semibold">500 GB</span>
                    </h2>
                  </div>
                  <div className="relative size-10 bg-primary-50 flex items-center justify-center rounded-full text-2xl text-primary">
                    <i className="ph-duotone ph-escalator-up" />
                  </div>
                </div>
                <div>
                  <StorageChart />
                </div>
              </div>{" "}
              {/* end card */}
            </div>{" "}
            {/* end col */}
          </div>{" "}
          {/* end grid */}
        </div>{" "}
        {/* end col */}
        <div className="grid-cols-1 xxl:col-span-8 xl:col-span-7 flex">
          <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                <i className="icon-chart-area me-2" />
                Cost Analytics &amp; API Usage
              </h2>
              <DropdownMenu
                trigger={
                  <>
                    <i className="icon-calendar-days" />
                    Monthly
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
            <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
              <div className="flex items-center border border-border-color gap-2 flex-wrap rounded-lg p-3">
                <p>Spending Overview :</p>
                <h3 className="text-xl max-lg:text-lg">$23896</h3>
                <span className="inline-flex items-center badge-small rounded-md font-medium bg-success-50 text-success border border-success">
                  <i className="icon-arrow-up-right me-1" />
                  21%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                  <i className="ph-fill ph-circle text-[8px] text-primary me-1" />
                  Cost
                </span>
                <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                  <i className="ph-fill ph-circle text-[8px] text-warning me-1" />
                  API Usage
                </span>
              </div>
            </div>
            <div className="mb-4 pb-4 border-b border-border-color">
              <CostChart />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-2">Cost Breakdown</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-linear-gradient-200 shadow-inset rounded-lg border border-border-color p-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p>Compute</p>
                    <p className="font-semibold text-gray-900">$7965</p>
                  </div>
                  <div className="bg-border-color w-full h-2 rounded-lg">
                    <div
                      className="rounded-lg h-2 bg-success bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>
                <div className="bg-linear-gradient-200 shadow-inset rounded-lg border border-border-color p-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p>Storage</p>
                    <p className="font-semibold text-gray-900">$6925</p>
                  </div>
                  <div className="bg-border-color w-full h-2 rounded-lg">
                    <div
                      className="rounded-lg h-2 bg-warning bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
                <div className="bg-linear-gradient-200 shadow-inset rounded-lg border border-border-color p-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p>API Call</p>
                    <p className="font-semibold text-gray-900">$4654</p>
                  </div>
                  <div className="bg-border-color w-full h-2 rounded-lg">
                    <div
                      className="rounded-lg h-2 bg-info bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end grid */}
      </div>{" "}
      {/* End grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xxl:col-span-8 xl:col-span-7 flex">
          <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                <i className="icon-chart-area me-2" />
                Generated Content
              </h2>
              <Link
                to="#"
                className="size-7.5 bg-white text-gray-900 border rounded-lg border-border-color font-semibold hover:bg-primary hover:border-primary dark:hover:text-dark hover:text-white text-xs flex items-center justify-center"
                aria-label="Download"
              >
                <i className="icon-arrow-down-to-line" />
              </Link>
            </div>
            <div className="mb-4">
              {/* <canvas id="content-chart" className="h-80" /> */}
              <ContentChart />
            </div>
            <div className="flex items-center justify-center flex-wrap gap-2">
              <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                <i className="ph-fill ph-circle text-[8px] text-primary-600 me-1" />
                Image
              </span>
              <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                <i className="ph-fill ph-circle text-[8px] text-primary-400 me-1" />
                Video
              </span>
              <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                <i className="ph-fill ph-circle text-[8px] text-primary-300 me-1" />
                Audio
              </span>
              <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                <i className="ph-fill ph-circle text-[8px] text-primary-200 me-1" />
                Text
              </span>
              <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
                <i className="ph-fill ph-circle text-[8px] text-primary-100 me-1" />
                Voice
              </span>
            </div>
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
        <div className="xxl:col-span-4 xl:col-span-5 flex">
          <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                <i className="icon-brain me-2" />
                Agents Status
              </h2>
              <Link
                to="#"
                className="size-7.5 bg-white text-gray-900 border rounded-lg border-border-color font-semibold hover:bg-primary hover:border-primary dark:hover:text-dark hover:text-white text-xs flex items-center justify-center"
                aria-label="Download"
              >
                <i className="icon-arrow-down-to-line" />
              </Link>
            </div>
            <div className="relative mb-5">
              <AgentChart />
              <div className="size-30 bg-primary-50 absolute top-1/2 left-1/2 -translate-1/2 flex items-center justify-center flex-col text-center rounded-full">
                <h3 className="text-xl max-lg:text-lg mb-1">256</h3>
                <p>Agents</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-x-6">
              <div className="text-center">
                <i className="ph-fill ph-circle text-xs text-primary mb-2" />
                <p className="mb-1">Active</p>
                <h3 className="text-xl max-lg:text-lg">24</h3>
              </div>
              <div className="text-center">
                <i className="ph-fill ph-circle text-xs text-primary-300 mb-2" />
                <p className="mb-1">Idle</p>
                <h3 className="text-xl max-lg:text-lg">12</h3>
              </div>
              <div className="text-center">
                <i className="ph-fill ph-circle text-xs text-primary-200 mb-2" />
                <p className="mb-1">Training</p>
                <h3 className="text-xl max-lg:text-lg">8</h3>
              </div>
              <div className="text-center">
                <i className="ph-fill ph-circle text-xs text-primary-100 mb-2" />
                <p className="mb-1">Failed</p>
                <h3 className="text-xl max-lg:text-lg">3</h3>
              </div>
            </div>
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
      </div>{" "}
      {/* end grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-x-6">
        <div className="bg-primary-gradient-100 rounded-lg border border-border-color p-5 mb-6 relative z-1">
          <div className="size-10 bg-white flex items-center justify-center rounded-full text-2xl text-primary mb-4">
            <i className="ph-duotone ph-google-photos-logo" />
          </div>
          <h2 className="text-base mb-2">Image Generator</h2>
          <p className="mb-4">
            Create high quality images from simple text prompts.
          </p>
          <Link
            to={Path.imageGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Get Started
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg}
            alt=""
            className="absolute left-0 top-0 -z-1 dark:invert!"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-success-gradient-100 rounded-md border border-border-color p-5 mb-6 relative z-1">
          <div className="size-10 bg-white flex items-center justify-center rounded-full text-2xl text-success mb-4">
            <i className="ph-duotone ph-video" />
          </div>
          <h2 className="text-base mb-2">Video Generator</h2>
          <p className="mb-4">
            Generate short or long form videos using text prompts.
          </p>
          <Link
            to={Path.imageGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Get Started
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg}
            alt=""
            className="absolute left-0 top-0 -z-1 dark:invert!"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-warning-gradient-100 rounded-md border border-border-color p-5 mb-6 relative z-1">
          <div className="size-10 bg-white flex items-center justify-center rounded-full text-2xl text-warning mb-4">
            <i className="ph-duotone ph-file-audio" />
          </div>
          <h2 className="text-base mb-2">Audio Generator</h2>
          <p className="mb-4">
            Generate background music, sound effects, voiceovers.
          </p>
          <Link
            to={Path.audioGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Get Started
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg}
            alt=""
            className="absolute left-0 top-0 -z-1 dark:invert!"
          />
        </div>{" "}
        {/* end card */}
        <div className="bg-info-gradient-100 rounded-lg border border-border-color p-5 mb-6 relative z-1">
          <div className="size-10 bg-white flex items-center justify-center rounded-full text-2xl text-info mb-4">
            <i className="ph-duotone ph-user-sound" />
          </div>
          <h2 className="text-base mb-2">Voice Generator</h2>
          <p className="mb-4">
            Convert text into natural, human-like speech using AI.
          </p>
          <Link
            to={Path.voiceGenerator}
            className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
          >
            Get Started
            <i className="icon-chevron-right ms-2" />
          </Link>
          <ImageWithBasePath
            src={Images.card_bg}
            alt=""
            className="absolute left-0 top-0 -z-1 dark:invert!"
          />
        </div>{" "}
        {/* end card */}
      </div>{" "}
      {/* end grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
        <div className="xxl:col-span-8 xl:col-span-7 flex">
          <div className="bg-white rounded-lg border border-border-color w-full mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap p-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                <i className="icon-clock-4 me-2" />
                Recent Activity
              </h2>
              <DropdownMenu
                trigger={
                  <>
                    <i className="icon-calendar-days" />
                    Today
                    <i className="icon-chevron-down" />
                  </>
                }
                triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary dark:focus:text-dark focus:border-primary focus:text-white focus:outline-hidden"
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
            <div className="table-responsive overflow-auto">
              <table className="table-auto mb-0 w-full">
                <thead className="border-b border-border-color">
                  <tr>
                    <th className="px-4 py-2 text-gray-900 font-semibold text-start">
                      Name
                    </th>
                    <th className="px-4 py-2 text-gray-900 font-semiboldk text-start">
                      Action
                    </th>
                    <th className="px-4 py-2 text-gray-900 font-semibold text-start">
                      Accuracy
                    </th>
                    <th className="px-4 py-2 text-gray-900 font-semibold text-start">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-color">
                    <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                      GPT-4o
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      Training completed
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      <span className="badge rounded-full text-xs font-medium bg-success text-white">
                        93%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      5 minutes ago
                    </td>
                  </tr>
                  <tr className="border-b border-border-color">
                    <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                      GPT-4.1
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      Deployment in progress
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      <span className="badge rounded-full text-xs font-medium bg-success text-white">
                        90%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      12 minutes ago
                    </td>
                  </tr>
                  <tr className="border-b border-border-color">
                    <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                      Claude 3 Opus
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      Fine tuning completed
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      <span className="badge rounded-full text-xs font-medium bg-warning text-white">
                        72%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      1 hour ago
                    </td>
                  </tr>
                  <tr className="border-b border-border-color">
                    <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                      Llama 3
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      Training failed
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      <span className="badge rounded-full text-xs font-medium bg-info text-white">
                        62%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      2 hours ago
                    </td>
                  </tr>
                  <tr className="border-b-0">
                    <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                      Mistral Large
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      Model updated
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      <span className="badge rounded-full text-xs font-medium bg-danger text-white">
                        35%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-start text-nowrap">
                      3 hours ago
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
        <div className="xxl:col-span-4 xl:col-span-5 flex">
          <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
                <i className="icon-map-pin me-2" />
                Requests by Region
              </h2>
              <Link
                to="#"
                className="size-7.5 bg-white text-gray-900 border rounded-lg border-border-color font-semibold hover:bg-primary hover:border-primary dark:hover:text-dark hover:text-white text-xs flex items-center justify-center"
                aria-label="Download"
              >
                <i className="icon-arrow-down-to-line" />
              </Link>
            </div>
            <div id="chart-container" className="h-38">
              <MapChart />
            </div>
            {/* <MapChart/> */}
            <div className="bg-linear-gradient-200 shadow-inset rounded-lg border border-border-color p-2 mb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <p className="flex items-center">
                    <ImageWithBasePath
                      src={Images.flag_ca}
                      className="me-2"
                      alt="canada"
                    />
                    Canada
                  </p>
                </div>
                <p className="font-semibold text-gray-900">4569</p>
              </div>
            </div>
            <div className="bg-linear-gradient-200 shadow-inset rounded-lg border border-border-color p-2 mb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="flex items-center">
                      <ImageWithBasePath
                        src={Images.flag_my}
                        className="me-2"
                        alt="malaysia"
                      />
                      Malaysia
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">2459</p>
              </div>
            </div>
            <div className="bg-linear-gradient-200 shadow-inset rounded-lg border border-border-color p-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="flex items-center">
                      <ImageWithBasePath
                        src={Images.flag_pt}
                        className="me-2"
                        alt="portugal"
                      />
                      Portugal
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">1452</p>
              </div>
            </div>
          </div>{" "}
          {/* end card */}
        </div>{" "}
        {/* end col */}
      </div>{" "}
      {/* end grid */}
    </div>
  );
};

export default Dashboard;
