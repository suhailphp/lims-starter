import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import CostChart from "../main-module/ai-dashboard/costChart"
import StorageChart from "../main-module/ai-dashboard/storageChart"
import ContentChart from "../main-module/ai-dashboard/contentChart"
import AgentChart from "../main-module/ai-dashboard/agentChart"
import ModalChart from "../main-module/analytics-dashboard/modalChart"
import PerformanceChart from "../main-module/analytics-dashboard/performanceChart"
import PerformanceWeekChart from "../main-module/analytics-dashboard/performanceWeekChart"
import PerformanceMonthChart from "../main-module/analytics-dashboard/performanceMonthChart"
import PerformanceDayChart from "../main-module/analytics-dashboard/performanceDayChart"
import ImageProgress from "../main-module/analytics-dashboard/imageProgressChart"
import ProgressChart from "../main-module/analytics-dashboard/progressChart"
import AudioProgress from "../main-module/analytics-dashboard/audioChart"
import TextProgress from "../main-module/analytics-dashboard/textChart"
import VoiceProgress from "../main-module/analytics-dashboard/voiceChart"
import RequestChart from "../main-module/analytics-dashboard/totalAiChart"
import AccuracyChart from "../main-module/analytics-dashboard/accuracyChart"
import HealthChart from "../main-module/analytics-dashboard/healthChart"
import ResourceChart from "../main-module/system-dashboard/resourceChart"
import StorageRequestChart from "../main-module/system-dashboard/storageChart"
import RecruitmentChart from "../agents/agent-metrics/recruitmentChart"
import ImageWithBasePath from "../../components/image-with-base-path"
import { Images } from "../../utils/imagePath"
import MapChart from "../main-module/ai-dashboard/mapChart"

const Widgets = () => {
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
            Widgets
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid  */}
  <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
    <div className="xxl:col-span-8 xl:col-span-12 sm:col-span-12 flex w-full">
      <div className="grid grid-cols-1 sm:grid-cols-12 xxl:grid-cols-12 gap-x-6 w-full">
        <div className="xxl:col-span-3 sm:col-span-6 flex">
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
        <div className="xxl:col-span-3 sm:col-span-6 flex">
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
        <div className="xxl:col-span-3 sm:col-span-6 flex">
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
        <div className="xxl:col-span-3 sm:col-span-6 flex">
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
      </div>{" "}
      {/* end grid */}
    </div>{" "}
    {/* end col */}
    <div className="xxl:col-span-4 xl:col-span-12 sm:col-span-12 flex">
      <div className="bg-white rounded-lg border border-border-color mb-6 relative w-full flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between gap-2 p-5">
          <div>
            <p className="mb-1">Storage Status</p>
            <h2 className="text-xl max-lg:text-lg">
              234 GB /<span className="text-sm font-semibold">500 GB</span>
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
  <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-12 gap-x-6">
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-primary-gradient-200 rounded-lg flex items-center p-5">
          <div className="size-10 bg-primary-600 rounded-full flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-cpu text-2xl" />
          </div>
          <p className="font-semibold text-white">CPU Usage</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">35.2 %</h2>
          <div className="flex items-center">
            <span className="size-6 bg-success rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-up" />
            </span>
            <p className="text-success">33%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-success-gradient rounded-lg flex items-center p-5">
          <div className="size-10 bg-success-600 rounded-full flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-cloud-warning text-2xl" />
          </div>
          <p className="font-semibold text-white">Memory Usage</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">48.2 %</h2>
          <div className="flex items-center">
            <span className="size-6 bg-danger rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-down" />
            </span>
            <p className="text-danger">14.2%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-info-gradient rounded-lg flex items-center p-5">
          <div className="size-10 bg-info-600 rounded-full shrink-0 flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-chart-bar-horizontal text-2xl" />
          </div>
          <p className="font-semibold text-white">Avg Latency (ms)</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">1254</h2>
          <div className="flex items-center">
            <span className="size-6 bg-danger rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-down" />
            </span>
            <p className="text-danger">14.2%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-teal-gradient rounded-lg flex items-center p-5">
          <div className="size-10 bg-teal-600 rounded-full shrink-0 flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-codepen-logo text-2xl" />
          </div>
          <p className="font-semibold text-white">Active Models</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">05</h2>
          <div className="flex items-center">
            <span className="size-6 bg-success rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-up" />
            </span>
            <p className="text-success">44.2%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
  </div>{" "}
  {/* end grid */}
  {/* Start Total */}
  <div className="grid xxl:grid-cols-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
    {/* Item 1 */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration flex-1">
      <div className="w-16 h-16 bg-primary-50 rounded-full text-white flex justify-center items-center font-semibold mb-5">
        <ImageWithBasePath
          src={Images.agent_icon_1}
          alt="icon"
          className="img-fluid"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-gray-900 mb-1">847,392</h3>
          <p className="text-sm text-gray-600 mb-0">Total Interactions</p>
        </div>
        <div className="text-success flex items-center gap-x-1">
          <span className="w-6 h-6 bg-success rounded-full text-xs text-white flex justify-center items-center">
            <i className="icon-arrow-up" />
          </span>
          <span className="text-sm">33.4%</span>
        </div>
      </div>
    </div>
    {/* Item 2 */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration flex-1">
      <div className="w-16 h-16 bg-warning-50 rounded-full text-white flex justify-center items-center font-semibold mb-5">
        <ImageWithBasePath
          src={Images.agent_icon_2}
          alt="icon"
          className="img-fluid"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-gray-900 mb-1">1.2s</h3>
          <p className="text-sm text-gray-600 mb-0">Response Time</p>
        </div>
        <div className="text-success flex items-center gap-x-1">
          <span className="w-6 h-6 bg-success rounded-full text-xs text-white flex justify-center items-center">
            <i className="icon-arrow-up" />
          </span>
          <span className="text-sm">24.7%</span>
        </div>
      </div>
    </div>
    {/* Item 3 */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration">
      <div className="w-16 h-16 bg-info-50 rounded-full text-white flex justify-center items-center font-semibold mb-5">
        <ImageWithBasePath
          src={Images.agent_icon_3}
          alt="icon"
          className="img-fluid"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-gray-900 mb-1">87.3%</h3>
          <p className="text-sm text-gray-600 mb-0">Automation Rate</p>
        </div>
        <div className="text-success flex items-center gap-x-1">
          <span className="w-6 h-6 bg-success rounded-full text-xs text-white flex justify-center items-center">
            <i className="icon-arrow-up" />
          </span>
          <span className="text-sm">44.2%</span>
        </div>
      </div>
    </div>
    {/* Item 4 */}
    <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration">
      <div className="w-16 h-16 bg-orange-50 rounded-full text-white flex justify-center items-center font-semibold mb-5">
        <ImageWithBasePath
          src={Images.agent_icon_4}
          alt="icon"
          className="img-fluid"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-2xl text-gray-900 mb-1">94.7%</h3>
          <p className="text-sm text-gray-600 mb-0">Resolution Rate</p>
        </div>
        <div className="text-danger flex items-center gap-x-1">
          <span className="w-6 h-6 bg-danger rounded-full text-xs text-white flex justify-center items-center">
            <i className="icon-arrow-down" />
          </span>
          <span className="text-sm">14.2%</span>
        </div>
      </div>
    </div>
  </div>
  {/* End Total */}
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
            <RequestChart />
          </div>
        </div>
        <ImageWithBasePath
          src="assets/img/bg/card-bg-06.png"
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
            <AccuracyChart />
          </div>
        </div>
        <ImageWithBasePath
          src="assets/img/bg/card-bg-07.png"
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
            <HealthChart />
          </div>
        </div>
        <ImageWithBasePath
          src="assets/img/bg/card-bg-08.png"
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
            Generated Content
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-lg border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center"
            aria-label="Download"
          >
            <i className="icon-arrow-down-to-line" />
          </Link>
        </div>
        <div className="mb-4">
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
            className="size-7.5 bg-white text-gray-900 border rounded-lg border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center"
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
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
    <div className="xxl:col-span-8 xl:col-span-7 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-chart-area me-2" />
            Cost Analytics &amp; API Usage
          </h2>
          <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
            <button
              type="button"
              className="hs-dropdown-toggle cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white  focus:outline-hidden"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <i className="icon-calendar-days" />
              Monthly
              <i className="icon-chevron-down" />
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              role="menu"
              aria-orientation="vertical"
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
            </div>
          </div>
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
            className="size-7.5 bg-white text-gray-900 border rounded-lg border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center"
            aria-label="Download"
          >
            <i className="icon-arrow-down-to-line" />
          </Link>
        </div>
        <div id="chart-container" className="h-38" >
          <MapChart/>
        </div>
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
          <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
            <button
              type="button"
              className="hs-dropdown-toggle cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white  focus:outline-hidden"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <i className="icon-bot" />
              All Models
              <i className="icon-chevron-down" />
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              role="menu"
              aria-orientation="vertical"
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
            </div>
          </div>
          <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
            <button
              type="button"
              className="hs-dropdown-toggle cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white  focus:outline-hidden"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <i className="icon-calendar-days" />
              Yearly
              <i className="icon-chevron-down" />
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              role="menu"
              aria-orientation="vertical"
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
            </div>
          </div>
        </div>
      </div>
      <ModalChart />
    </div>
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
              className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white"
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
              className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white"
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
              className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white"
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
              className="py-1 px-2 rounded-lg bg-light text-gray-900 hs-tab-active:text-white hs-tab-active:bg-primary whitespace-nowrap hover:bg-primary hover:text-white active"
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
            <PerformanceChart />
          </div>
          <div
            id="week"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-day"
          >
            <PerformanceWeekChart />
          </div>
          <div
            id="month"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-month"
          >
            <PerformanceMonthChart />
          </div>
          <div
            id="day"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tab-day"
          >
            <PerformanceDayChart />
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
            <ImageProgress />
          </div>
        </div>
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p>Video Generator</p>
            <p className="text-gray-900 font-semibold">90K</p>
          </div>
          <div>
            <ProgressChart />
          </div>
        </div>
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p>Audio Generator</p>
            <p className="text-gray-900 font-semibold">80K</p>
          </div>
          <div>
            <AudioProgress />
          </div>
        </div>
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p>Text Generator</p>
            <p className="text-gray-900 font-semibold">60K</p>
          </div>
          <div>
            <TextProgress />
          </div>
        </div>
        <div className="mb-0">
          <div className="flex items-center justify-between mb-0">
            <p>Voice Generator</p>
            <p className="text-gray-900 font-semibold">25K</p>
          </div>
          <div>
            <VoiceProgress />
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
  </div>{" "}
  {/* end grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
    <div className="xxl:col-span-4 xl:col-span-5 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-brain me-2" />
            Storage &amp; Requests
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center"
          >
            <i className="icon-refresh-ccw" />
          </Link>
        </div>
        <div className="relative text-center mb-5">
          <StorageRequestChart />
          <div className="text-center absolute top-16 -translate-x-1/2 left-1/2 z-9">
            <h3>50%</h3>
            <p>Remaining</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center">
            <p className="mb-1">Requests/sec</p>
            <h3 className="text-lg max-lg:text-[17px]">1546</h3>
          </div>
          <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center">
            <p className="mb-1">GPU Usage</p>
            <h3 className="text-lg max-lg:text-[17px]">83.5%</h3>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="xxl:col-span-8 xl:col-span-7 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-chart-area me-2" />
            Resource Usage (24h)
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center"
          >
            <i className="icon-refresh-ccw" />
          </Link>
        </div>
        <div className="mb-4">
          <ResourceChart />
        </div>
        <div className="flex items-center justify-center flex-wrap gap-3">
          <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
            <i className="ph-fill ph-circle text-[8px] text-primary-600 me-2" />
            CPU %
          </span>
          <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
            <i className="ph-fill ph-circle text-[8px] text-success me-2" />
            Memory %
          </span>
          <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
            <i className="ph-fill ph-circle text-[8px] text-orange me-2" />
            GPU %
          </span>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
  </div>{" "}
  {/* end grid */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 mb-6">
    {/* Grid right */}
    <div className="xxl:col-span-7 lg:col-span-12 flex">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 pb-3 flex-1">
        <div className="flex items-center flex-wrap gap-3 justify-between mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-gauge me-2" />
            Performance Analytics
          </h2>
          <div className="flex items-center gap-x-4 gap-2 flex-wrap">
            <p className="flex items-center gap-x-1.5 mb-0">
              {" "}
              <span className="w-3 h-3 bg-success rounded-sm" />
              Interaction
            </p>
            <p className="flex items-center gap-x-1.5 mb-0">
              {" "}
              <span className="w-3 h-3 bg-primary rounded-sm" />
              Resolved
            </p>
            <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle cursor-pointer py-1.5 px-2 inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-light text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                Weekly <i className="icon-chevron-down" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-2 space-y-1">
                  <Link
                    className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                    to="#"
                  >
                    Weekly
                  </Link>
                  <Link
                    className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
                    to="#"
                  >
                    Monthly
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalChart />
      </div>
    </div>{" "}
    {/* end col */}
    {/* Grid Left */}
    <div className="xxl:col-span-5 lg:col-span-12 flex">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 flex-1">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
          <i className="icon-clock-2 me-2" /> Response Time
        </h2>
        <div className="flex gap-4 mb-5">
          <div className="bg-light p-2 rounded-lg text-center w-full">
            <p className="mb-1">Fully Automated</p>
            <div className="font-bold text-lg text-gray-900">74.4%</div>
          </div>
          <div className="bg-light p-2 rounded-lg text-center w-full">
            <p className="mb-1">Human Escalation</p>
            <div className="font-bold text-lg text-gray-900">25.6%</div>
          </div>
        </div>
        <div className="relative ">
          <RecruitmentChart />
          <div className="absolute top-[115px] start-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
            <h3 className="font-bold text-2xl text-gray-900 mb-1">2.3</h3>
            <p className="text-sm text-gray-600 mb-0">Avg Seconds</p>
          </div>
        </div>
        <p className="mt-3 text-center mb-0">
          Automation rate improved by 4,123 interactions
        </p>
      </div>
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default Widgets