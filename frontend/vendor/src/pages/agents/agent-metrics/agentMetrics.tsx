import { useEffect } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import AgentModals from "../modals";
import RecruitmentChart from "./recruitmentChart";
import AnalyticsChart from "./analyticsChart";
import PredefinedDatePicker from "../../../components/common-daterange-picker/commonDateRangePicker";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const AgentMetrics = () => {
  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  return (
    <>
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
                <li aria-current="page" className="text-gray-900">
                  Agent Metrics
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
           <PredefinedDatePicker/>
            {/* Filter Dropdown */}
            <DropdownMenu
              trigger={
                <>
                  <i className="icon-arrow-down-to-line"></i>Export
                </>
              }
              triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
              ariaLabel="Export"
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
        {/* /Breadcrumb */}
        {/* Start grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 mb-6">
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
                <RecruitmentChart/>
                {/* <canvas id="recruitment" className="w-full h-50! m-auto!" /> */}
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
                  <DropdownMenu
                    trigger={
                      <>
                        Weekly <i className="icon-chevron-down" />
                      </>
                    }
                    triggerClassName="cursor-pointer py-1.5 px-2 inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-light text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                    menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                    ariaLabel="Time range"
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
                  </DropdownMenu>
                </div>
              </div>
              {/* <div id="analytics-chart" /> */}
              <AnalyticsChart/>
            </div>
          </div>{" "}
          {/* end col */}
        </div>
        {/* End grid */}
        {/* Start Total */}
        <div className="grid xxl:grid-cols-4 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
          {/* Item 1 */}
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration">
            <div className="w-16 h-16 bg-primary-50 rounded-full text-white flex justify-center items-center font-semibold mb-5">
              <ImageWithBasePath
                src={Images.agent_icon_1}
                alt="icon"
                className="img-fluid"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-1">
                  847,392
                </h3>
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
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5 hover:shadow-lg transition-shadow duration">
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
            <div className="w-16 h-16 bg-danger-50 rounded-full text-white flex justify-center items-center font-semibold mb-5">
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
        {/* Start Total */}
        <div
          role="alert"
          className="p-4 font-medium border border-success rounded-lg text-success bg-success-50 mb-5 flex items-center justify-between gap-2"
        >
          <p className="flex items-center gap-2 mb-0">
            <i className="icon-info text-lg" />
            No Critical Issues Detected! All security systems are operating
            normally
          </p>
          <button className="text-success close-alert-btn text-lg hover:text-danger transition focus:outline-hidden">
            <i className="icon-x" />
          </button>
        </div>
        {/* End Total */}
        {/* Start Escalation */}
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 grid-cols-1 gap-6">
          {/* Item 1  */}
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
                <i className="icon-clock-2 me-2" /> Response Time
              </h2>
              <DropdownMenu
                trigger={
                  <>
                    Weekly <i className="icon-chevron-down" />
                  </>
                }
                triggerClassName="cursor-pointer py-1.5 px-2 inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-light text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                ariaLabel="Time range"
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
              </DropdownMenu>
            </div>
            {/* Progress 1  */}
            <div className="mb-5">
              <h3 className="flex items-center justify-between mb-1 text-sm font-semibold text-dark">
                {" "}
                Complex Technical Issue{" "}
                <span className="font-normal text-gray-600"> 1247 </span>{" "}
              </h3>
              <div className="bg-light w-full h-2 rounded-lg">
                <div
                  className="rounded-lg h-2 bg-primary bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                  style={{ width: "90%" }}
                />
              </div>
            </div>
            {/* Progress 2  */}
            <div className="mb-5">
              <h3 className="flex items-center justify-between mb-1 text-sm font-semibold text-dark">
                {" "}
                Policy Exception Request
                <span className="font-normal text-gray-600"> 892 </span>{" "}
              </h3>
              <div className="bg-light w-full h-2 rounded-lg">
                <div
                  className="rounded-lg h-2 bg-info bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                  style={{ width: "70%" }}
                />
              </div>
            </div>
            {/* Progress 3  */}
            <div className="mb-5">
              <h3 className="flex items-center justify-between mb-1 text-sm font-semibold text-dark">
                {" "}
                High Value Customer{" "}
                <span className="font-normal text-gray-600"> 654 </span>{" "}
              </h3>
              <div className="bg-light w-full h-2 rounded-lg">
                <div
                  className="rounded-lg h-2 bg-success bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
            {/* Progress 4  */}
            <div className="mb-5">
              <h3 className="flex items-center justify-between mb-1 text-sm font-semibold text-dark">
                {" "}
                Sentiment Escalation{" "}
                <span className="font-normal text-gray-600"> 521 </span>{" "}
              </h3>
              <div className="bg-light w-full h-2 rounded-lg">
                <div
                  className="rounded-lg h-2 bg-warning bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
            {/* Progress 5  */}
            <div className="mb-5">
              <h3 className="flex items-center justify-between mb-1 text-sm font-semibold text-dark">
                {" "}
                Error{" "}
                <span className="font-normal text-gray-600"> 516 </span>{" "}
              </h3>
              <div className="bg-light w-full h-2 rounded-lg">
                <div
                  className="rounded-lg h-2 bg-danger bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
            {/* Progress 6  */}
            <div>
              <h3 className="flex items-center justify-between mb-1 text-sm font-semibold text-dark">
                {" "}
                Others{" "}
                <span className="font-normal text-gray-600"> 504 </span>{" "}
              </h3>
              <div className="bg-light w-full h-2 rounded-lg">
                <div
                  className="rounded-lg h-2 bg-teal bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                  style={{ width: "20%" }}
                />
              </div>
            </div>
          </div>
          {/* Item 2  */}
          <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
                <i className="icon-lock-keyhole me-2" />
                Recent Security Events
              </h2>
              <DropdownMenu
                trigger={
                  <>
                    Weekly <i className="icon-chevron-down" />
                  </>
                }
                triggerClassName="cursor-pointer py-1.5 px-2 inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-light text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                ariaLabel="Time range"
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
              </DropdownMenu>
            </div>
            {/* Events 1 */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-50 rounded-full text-primary text-[16px] flex justify-center items-center font-semibold me-4">
                  <i className="ph-duotone ph-info" />
                </div>
                <div>
                  <h3 className="flex items-center justify-between text-sm mb-1 font-semibold text-dark">
                    {" "}
                    Routine Security Scan
                  </h3>
                  <p className="text-sm text-gray-600 mb-0 flex items-center">
                    {" "}
                    <i className="icon-clock-1 me-2" /> 2 hours ago{" "}
                  </p>
                </div>
              </div>
              <span className="badge-small rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                Completed
              </span>
            </div>
            {/* Events 2 */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-info-50 rounded-full text-info text-[16px] flex justify-center items-center font-semibold me-4">
                  <i className="ph-duotone ph-info" />
                </div>
                <div>
                  <h3 className="flex items-center justify-between text-sm mb-1 font-semibold text-dark">
                    {" "}
                    Access Policy Updated{" "}
                  </h3>
                  <p className="text-sm text-gray-600 mb-0 flex items-center">
                    {" "}
                    <i className="icon-clock-1 me-2" /> 2 hours ago{" "}
                  </p>
                </div>
              </div>
              <span className="badge-small rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                Completed
              </span>
            </div>
            {/* Events 3 */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success-50 rounded-full text-success text-[16px] flex justify-center items-center font-semibold me-4">
                  <i className="ph-duotone ph-info" />
                </div>
                <div>
                  <h3 className="flex items-center justify-between text-sm mb-1 font-semibold text-dark">
                    {" "}
                    Certificate Renewal{" "}
                  </h3>
                  <p className="text-sm text-gray-600 mb-0 flex items-center">
                    {" "}
                    <i className="icon-clock-1 me-2" /> 2 hours ago{" "}
                  </p>
                </div>
              </div>
              <span className="badge-small rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                Scheduled
              </span>
            </div>
            {/* Events 4 */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-warning-50 rounded-full text-warning text-[16px] flex justify-center items-center font-semibold me-4">
                  <i className="ph-duotone ph-info" />
                </div>
                <div>
                  <h3 className="flex items-center justify-between text-sm mb-1 font-semibold text-dark">
                    {" "}
                    Penetration Test{" "}
                  </h3>
                  <p className="text-sm text-gray-600 mb-0 flex items-center">
                    {" "}
                    <i className="icon-clock-1 me-2" /> 2 hours ago{" "}
                  </p>
                </div>
              </div>
              <span className="badge-small rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                Completed
              </span>
            </div>
            {/* Events 5 */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-danger-50 rounded-full text-danger text-[16px] flex justify-center items-center font-semibold me-4">
                  <i className="ph-duotone ph-info" />
                </div>
                <div>
                  <h3 className="flex items-center justify-between text-sm mb-1 font-semibold text-dark">
                    {" "}
                    Critical Issues{" "}
                  </h3>
                  <p className="text-sm text-gray-600 mb-0 flex items-center">
                    {" "}
                    <i className="icon-clock-1 me-2" /> 1 hour ago{" "}
                  </p>
                </div>
              </div>
              <span className="badge-small rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                Completed
              </span>
            </div>
          </div>
        </div>
        {/* End Escalation */}
      </div>

      <AgentModals />
    </>
  );
};

export default AgentMetrics;
