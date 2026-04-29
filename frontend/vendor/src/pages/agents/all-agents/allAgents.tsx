import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const AllAgents = () => {
  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
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
              <li aria-current="page" className="text-gray-900">
                All Agents
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-3">
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
          <Link
            to={Path.addAgent}
            className="btn bg-primary border border-primary text-white text-center flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-settings" /> Create New Agent
          </Link>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Start grid */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        {/* left */}
        <div className="bg-white border border-border-color rounded-lg p-1 flex items-center gap-1">
          <nav
            className="flex gap-2 flex-wrap"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
              id="tab-13"
              aria-selected="true"
              data-hs-tab="#tab-01"
              aria-controls="tab-01"
              role="tab"
            >
              All Categories
            </button>
            <button
              type="button"
              className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-14"
              aria-selected="false"
              data-hs-tab="#tab-02"
              aria-controls="tab-02"
              role="tab"
            >
              Support &amp; Assistance
            </button>
            <button
              type="button"
              className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-15"
              aria-selected="false"
              data-hs-tab="#tab-03"
              aria-controls="tab-03"
              role="tab"
            >
              Sales &amp; Marketing
            </button>
            <button
              type="button"
              className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
              id="tab-16"
              aria-selected="false"
              data-hs-tab="#tab-04"
              aria-controls="tab-04"
              role="tab"
            >
              Data &amp; Analytics
            </button>
          </nav>
        </div>
        {/* right */}
        <div className="flex items-center gap-2">
          <div>
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                name="hs-table-search"
                id="hs-table-search"
                className="block w-full py-2 ps-8 pe-3 rounded-lg border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
                placeholder="Search Agents"
              />
              <div className="absolute top-1/2 start-3 -translate-y-1/2 pointer-events-none">
                <i className="icon-search text-gray-900" />
              </div>
            </div>
          </div>
          {/* Dropdown */}
          <div>
            <DropdownMenu
              trigger={
                <>
                  <i className="icon-arrow-up-narrow-wide" /> Newest{" "}
                  <i className="icon icon-chevron-down" />
                </>
              }
              triggerClassName="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
              menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              ariaLabel="Sort"
            >
              <div className="p-2 space-y-1">
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Newest
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Oldest
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Recently Created
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Last Modified
                </Link>
              </div>
            </DropdownMenu>
          </div>
          {/* Filter Dropdown */}
        </div>
      </div>
      {/* End grid */}
      <div className="hs-tab-content mb-6">
        {/* Start Tab 1 */}
        <div id="tab-01" role="tabpanel" aria-labelledby="tab-01">
          <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
            {/* Agent Card 1 */}
            <div className="bg-light border border-primary text-center border-dashed rounded-lg p-5 flex items-center justify-center flex-col hover:shadow-lg transition">
              <div className="flex items-center justify-center mb-5">
                <div className="size-16 rounded-full bg-white text-dark text-2xl flex items-center justify-center">
                  <i className="icon-plus" />
                </div>
              </div>
              <div>
                <h6 className="mb-1">Create New Agent</h6>
                <p className="mb-5">
                  Build a custom AI agent for your specific needs
                </p>
                <Link
                  to={Path.addAgent}
                  className="btn bg-primary border border-primary text-white text-center font-semibold inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-settings" /> Create New
                </Link>
              </div>
            </div>
            {/* Agent Card 2 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Support &amp; Assistance
                </div>
                <h6 className="mb-1 font-bold">Customer Support Agent</h6>
                <p className="mb-0">
                  Handles customer queries, FAQs, ticket routing, and issue
                  resolution.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Customer Support</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>25 Jan 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
            {/* Agent Card 3 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Technical Support
                </div>
                <h6 className="mb-1 font-bold">Technical Support Specialist</h6>
                <p className="mb-0">
                  Assists users with hardware and software issues,
                  troubleshooting &amp; technical advice.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Support Assistance</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>15 Feb 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
            {/* Agent Card 4 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Sales &amp; Marketing
                </div>
                <h6 className="mb-1 font-bold">Sales Representative</h6>
                <p className="mb-0">
                  Engages with potential customers, provides product
                  information, and drives sales.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Sales Support</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>01 Feb 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
            {/* Agent Card 5 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Customer Service
                </div>
                <h6 className="mb-1 font-bold">Customer Support Specialist</h6>
                <p className="mb-0">
                  Provides support to customers, answers questions, and resolves
                  issues.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>Gemini 1.5</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Customer Support</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>22 Mar 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
            {/* Agent Card 6 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Data &amp; Analytics
                </div>
                <h6 className="mb-1 font-bold">
                  Data Insights &amp; Analytics
                </h6>
                <p className="mb-0">
                  Performs complex data cleaning, statistical modeling, for
                  business intelligence.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Analytics Specialist</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>29 Jan 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Tab 1 */}
        {/* Start Tab 2 */}
        <div
          id="tab-02"
          role="tabpanel"
          className="hidden"
          aria-labelledby="tab-02"
        >
          <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
            {/* Agent Card 2 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Support &amp; Assistance
                </div>
                <h6 className="mb-1 font-bold">Customer Support Agent</h6>
                <p className="mb-0">
                  Handles customer queries, FAQs, ticket routing, and issue
                  resolution.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Customer Support</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>25 Jan 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
            {/* Agent Card 5 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Customer Service
                </div>
                <h6 className="mb-1 font-bold">Customer Support Specialist</h6>
                <p className="mb-0">
                  Provides support to customers, answers questions, and resolves
                  issues.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>Gemini 1.5</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Customer Support</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>22 Mar 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Tab 2 */}
        {/* Start Tab 3 */}
        <div
          id="tab-03"
          role="tabpanel"
          className="hidden"
          aria-labelledby="tab-03"
        >
          <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
            {/* Agent Card 4 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Sales &amp; Marketing
                </div>
                <h6 className="mb-1 font-bold">Sales Representative</h6>
                <p className="mb-0">
                  Engages with potential customers, provides product
                  information, and drives sales.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Sales Support</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>01 Feb 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Tab 3 */}
        {/* Start Tab 4 */}
        <div
          id="tab-04"
          role="tabpanel"
          className="hidden"
          aria-labelledby="tab-04"
        >
          <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
            {/* Agent Card 6 */}
            <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="mb-5">
                <div className="text-primary font-medium mb-3">
                  Data &amp; Analytics
                </div>
                <h6 className="mb-1 font-bold">
                  Data Insights &amp; Analytics
                </h6>
                <p className="mb-0">
                  Performs complex data cleaning, statistical modeling, for
                  business intelligence.
                </p>
              </div>
              <div className="mb-5">
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Model: <span>GPT-4.1</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Type: <span>Analytics Specialist</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-2">
                  Last Updated: <span>29 Jan 2026</span>
                </p>
                <p className="flex items-center justify-between text-gray-900 mb-0">
                  Status:{" "}
                  <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    Active
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={Path.editAgent}
                  className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary hover:border-primary hover:text-white"
                >
                  <i className="icon-arrow-down-to-line font-normal" /> Edit
                </Link>
                <Link
                  to="#"
                  className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                >
                  <i className="icon-shield-check font-normal" /> Deploy
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Tab 4 */}
      </div>
      {/* End Tab Content */}
      <div className="text-center">
        <Link
          to="#"
          className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
        >
          <i className="icon-loader" />
          Load More Agent
        </Link>
      </div>
    </div>
  );
};

export default AllAgents;
