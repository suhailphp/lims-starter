import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const Faq = () => {
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
              <li aria-current="page" className=" text-gray-900">
                FAQ
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
        <div className="col-span-12 text-center">
          <h3 className="mb-2">Got Questions? We’ve Got Answers</h3>
          <p className="mb-6">
            Everything you need to know about managing AI agents with
            confidence.{" "}
          </p>
          <div className="bg-white border border-border-color rounded-lg p-1 inline-flex items-center gap-1 mb-7">
            <nav
              className="flex gap-2 flex-wrap justify-center"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="horizontal"
            >
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
                id="tab-1"
                aria-selected="true"
                data-hs-tab="#tab-01"
                aria-controls="tab-01"
                role="tab"
              >
                General
              </button>
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                id="tab-2"
                aria-selected="false"
                data-hs-tab="#tab-02"
                aria-controls="tab-02"
                role="tab"
              >
                AI Agents
              </button>
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                id="tab-3"
                aria-selected="false"
                data-hs-tab="#tab-03"
                aria-controls="tab-03"
                role="tab"
              >
                Analytics
              </button>
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                id="tab-4"
                aria-selected="false"
                data-hs-tab="#tab-04"
                aria-controls="tab-04"
                role="tab"
              >
                Integrations
              </button>
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                id="tab-5"
                aria-selected="false"
                data-hs-tab="#tab-05"
                aria-controls="tab-05"
                role="tab"
              >
                Support
              </button>
            </nav>
          </div>
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12 mb-6"
          id="tab-01"
          role="tabpanel"
          aria-labelledby="tab-01"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-6">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="hs-accordion-group overflow-hidden">
                <div className="hs-accordion active bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="true"
                    aria-controls="acc-1"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What is the AI Agent Dashboard?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down leading-none" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up leading-none" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-1"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The AI Agent Dashboard is a centralized platform to
                      create, monitor, and manage multiple AI agents from one
                      unified interface.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-3"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What problems does it solve?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down leading-none" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up leading-none" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-3"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The platform simplifies AI agent deployment, monitoring,
                      and scaling by reducing complexity, eliminating manual
                      processes, and providing clear visibility into agent
                      performance.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-4"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Is the platform cloud based?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down leading-none" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up leading-none" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-4"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, the dashboard is fully cloud-based, allowing users to
                      access it from anywhere without the need for local
                      installations or infrastructure management.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg  ">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-5"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Can it be used across different industries?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down leading-none" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up leading-none" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-5"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, it supports a wide range of AI use cases across
                      industries such as healthcare, finance, e-commerce,
                      customer support, marketing, and more.
                    </div>
                  </div>
                </div>
              </div>
              {/* end accordion */}
            </div>{" "}
            {/* end accordion */}
          </div>{" "}
          {/* end grid */}
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12 hidden"
          id="tab-02"
          role="tabpanel"
          aria-labelledby="tab-02"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-6">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="hs-accordion-group overflow-hidden">
                <div className="hs-accordion active bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-3"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What problems does it solve?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-6"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The platform simplifies AI agent deployment, monitoring,
                      and scaling by reducing complexity, eliminating manual
                      processes, and providing clear visibility into agent
                      performance.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-4"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Is the platform cloud based?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-7"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, the dashboard is fully cloud-based, allowing users to
                      access it from anywhere without the need for local
                      installations or infrastructure management.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-5"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Can it be used across different industries?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-8"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, it supports a wide range of AI use cases across
                      industries such as healthcare, finance, e-commerce,
                      customer support, marketing, and more.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="true"
                    aria-controls="acc-1"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What is the AI Agent Dashboard?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-9"
                    className="hs-accordion-content w-full hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The AI Agent Dashboard is a centralized platform to
                      create, monitor, and manage multiple AI agents from one
                      unified interface.
                    </div>
                  </div>
                </div>
              </div>
              {/* end accordion */}
            </div>{" "}
            {/* end accordion */}
          </div>{" "}
          {/* end grid */}
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12 hidden"
          id="tab-03"
          role="tabpanel"
          aria-labelledby="tab-03"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-6">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="hs-accordion-group overflow-hidden">
                <div className="hs-accordion active bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-5"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Can it be used across different industries?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-11"
                    className="hs-accordion-content overflow-hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, it supports a wide range of AI use cases across
                      industries such as healthcare, finance, e-commerce,
                      customer support, marketing, and more.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="true"
                    aria-controls="acc-1"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What is the AI Agent Dashboard?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-12"
                    className="hs-accordion-content w-full hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The AI Agent Dashboard is a centralized platform to
                      create, monitor, and manage multiple AI agents from one
                      unified interface.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-3"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What problems does it solve?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-14"
                    className="hs-accordion-content w-full hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The platform simplifies AI agent deployment, monitoring,
                      and scaling by reducing complexity, eliminating manual
                      processes, and providing clear visibility into agent
                      performance.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-4"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Is the platform cloud based?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-15"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, the dashboard is fully cloud-based, allowing users to
                      access it from anywhere without the need for local
                      installations or infrastructure management.
                    </div>
                  </div>
                </div>
              </div>
              {/* end accordion */}
            </div>{" "}
            {/* end accordion */}
          </div>{" "}
          {/* end grid */}
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12 hidden"
          id="tab-04"
          role="tabpanel"
          aria-labelledby="tab-04"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-6">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="hs-accordion-group overflow-hidden">
                <div className="hs-accordion active bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-3"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What problems does it solve?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-16"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The platform simplifies AI agent deployment, monitoring,
                      and scaling by reducing complexity, eliminating manual
                      processes, and providing clear visibility into agent
                      performance.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-4"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Is the platform cloud based?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-17"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, the dashboard is fully cloud-based, allowing users to
                      access it from anywhere without the need for local
                      installations or infrastructure management.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-5"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Can it be used across different industries?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-18"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, it supports a wide range of AI use cases across
                      industries such as healthcare, finance, e-commerce,
                      customer support, marketing, and more.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-20"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What is the AI Agent Dashboard?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-20"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      It is designed for startups, enterprises, developers, and
                      AI-driven teams that need a scalable and structured way to
                      manage AI agents and workflows.
                    </div>
                  </div>
                </div>
              </div>
              {/* end accordion */}
            </div>
          </div>{" "}
          {/* end grid */}
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12 hidden"
          id="tab-05"
          role="tabpanel"
          aria-labelledby="tab-05"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-6">
            <div className="lg:col-span-8 lg:col-start-3">
              <div className="hs-accordion-group overflow-hidden">
                <div className="hs-accordion active bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="true"
                    aria-controls="acc-1"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What is the AI Agent Dashboard?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-21"
                    className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The AI Agent Dashboard is a centralized platform to
                      create, monitor, and manage multiple AI agents from one
                      unified interface.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-3"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      What problems does it solve?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-23"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      The platform simplifies AI agent deployment, monitoring,
                      and scaling by reducing complexity, eliminating manual
                      processes, and providing clear visibility into agent
                      performance.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-4"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Is the platform cloud based?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-24"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, the dashboard is fully cloud-based, allowing users to
                      access it from anywhere without the need for local
                      installations or infrastructure management.
                    </div>
                  </div>
                </div>
                <div className="hs-accordion bg-white border border-border-color rounded-lg mb-6">
                  <button
                    className="hs-accordion-toggle w-full inline-flex items-center gap-3 px-5 py-4 text-start font-semibold text-foreground hs-accordion-active:rounded-t-lg"
                    aria-expanded="false"
                    aria-controls="acc-5"
                  >
                    <span className="w-5.5 h-5.5 text-[16px] flex items-center justify-center rounded-sm bg-light border border-border-color">
                      <i className="icon icon-bot" />
                    </span>
                    <span className="flex-1 font-semibold text-dark">
                      Can it be used across different industries?
                    </span>
                    <span className="hs-accordion-active:hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-down" />
                      </span>
                    </span>
                    <span className="hs-accordion-active:block hidden">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-border-color bg-gray-50">
                        <i className="icon icon-chevron-up" />
                      </span>
                    </span>
                  </button>
                  <div
                    id="acc-25"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                  >
                    <div className="px-5 pb-4 pl-[55px] text-sm text-muted-foreground">
                      Yes, it supports a wide range of AI use cases across
                      industries such as healthcare, finance, e-commerce,
                      customer support, marketing, and more.
                    </div>
                  </div>
                </div>
              </div>
              {/* end accordion */}
            </div>{" "}
            {/* end accordion */}
          </div>
          {/* end grid */}
        </div>{" "}
        {/* end col */}
      </div>
      {/* End grid */}
    </div>
  );
};

export default Faq;
