import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const Pricing = () => {
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
                Pricing
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
        <div className="col-span-12 text-center">
          <h3 className="mb-2">Scalable plans for AI workflow</h3>
          <p className="mb-6">
            Choose the plan that fits your workflow from experimenting with AI
            agents{" "}
          </p>
          <div className="bg-white border border-border-color rounded-lg p-1 inline-flex items-center gap-1 mb-7">
            <nav
              className="flex gap-2 flex-wrap"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="horizontal"
            >
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none active"
                id="tab-1"
                aria-selected="true"
                data-hs-tab="#tab-01"
                aria-controls="tab-01"
                role="tab"
              >
                Monthly
              </button>
              <button
                type="button"
                className="btn py-1 flex items-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white dark:hover:text-dark focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none"
                id="tab-2"
                aria-selected="false"
                data-hs-tab="#tab-02"
                aria-controls="tab-02"
                role="tab"
              >
                Yearly
              </button>
            </nav>
          </div>
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12"
          id="tab-01"
          role="tabpanel"
          aria-labelledby="tab-01"
        >
          <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
            <div className="xxl:col-span-4 xl:col-span-4">
              <div className="bg-white border-b-7 border-t-border-color border-t border-l-border-color border-l border-r-border-color border-r border-dark dark:border-white rounded-lg p-5 mb-6 shadow">
                <div className="mb-5 pb-5 border-b border-border-color text-center">
                  <div className="inline-flex px-2.5 py-1.5 mb-4 rounded-lg font-medium bg-primary-100 text-primary border border-primary">
                    Starter Plan
                  </div>
                  <h3 className="text-[18px] font-bold text-dark mb-1">
                    $49 / month
                  </h3>
                  <p>For individuals &amp; early projects</p>
                </div>
                <p className="text-dark font-semibold mb-4">
                  Features Included
                </p>
                <ul className="p-0">
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Up to 05 AI Agents
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Basic agent configuration
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Standard dashboard analytics
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Manual agent triggers
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Community support
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Email notifications
                  </li>
                </ul>
                <Link
                  to="#"
                  className="btn w-full bg-dark text-white text-center hover:text-white dark:bg-gray-100 dark:text-dark"
                >
                  Get Started
                </Link>
              </div>
              {/* end card */}
            </div>{" "}
            {/* end grid */}
            <div className="xxl:col-span-4 xl:col-span-4">
              <div className="bg-white border-b-7 border-t-border-color border-t border-l-border-color border-l border-r-border-color border-r relative overflow-hidden border-primary rounded-lg p-5 mb-6 shadow">
                <span className="absolute top-[24px] right-[-48px] rotate-45 bg-dark text-white text-[12px]  px-12 py-1.5 z-10 dark:bg-gray-100 dark:text-dark">
                  Most Popular
                </span>
                <div className="mb-5 pb-5 border-b border-border-color text-center">
                  <div className="inline-flex px-2.5 py-1.5 mb-4 rounded-lg font-medium bg-primary-100 text-primary border border-primary">
                    Professional
                  </div>
                  <h3 className="text-[18px] font-bold text-dark mb-1">
                    $99 / month
                  </h3>
                  <p>For teams building real automation</p>
                </div>
                <p className="text-dark font-semibold mb-4">
                  Features Included
                </p>
                <ul className="p-0">
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Up to 10 AI Agents
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Advanced agent workflows
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Event based triggers
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    API access
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Priority email support
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Activity logs &amp; history
                  </li>
                </ul>
                <Link
                  to="#"
                  className="btn w-full bg-primary-gradient  text-white text-center  hover:text-white"
                >
                  Get Started
                </Link>
              </div>
              {/* end card */}
            </div>{" "}
            {/* end grid */}
            <div className="xxl:col-span-4 xl:col-span-4">
              <div className="bg-white border-b-7 border-t-border-color border-t border-l-border-color border-l border-r-border-color border-r border-dark dark:border-white! rounded-lg p-5 mb-6 shadow">
                <div className="mb-5 pb-5 border-b border-border-color text-center">
                  <div className="inline-flex px-2.5 py-1.5 mb-4 rounded-lg font-medium bg-primary-100 text-primary border border-primary">
                    Business
                  </div>
                  <h3 className="text-[18px] font-bold text-dark mb-1">
                    $199 / month
                  </h3>
                  <p>For scaling AI across operations</p>
                </div>
                <p className="text-dark font-semibold mb-4">
                  Features Included
                </p>
                <ul className="p-0">
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Unlimited AI Agents
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Custom agent logic
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Multi user access &amp; roles
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Advanced analytics &amp; insights
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Webhooks &amp; integrations
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    SLA backed priority support
                  </li>
                </ul>
                <Link
                  to="#"
                  className="btn w-full bg-dark text-white text-center hover:text-white dark:bg-gray-100 dark:text-dark"
                >
                  Get Started
                </Link>
              </div>
              {/* end card */}
            </div>{" "}
            {/* end grid */}
          </div>
        </div>{" "}
        {/* end col */}
        <div
          className="col-span-12 hidden"
          id="tab-02"
          role="tabpanel"
          aria-labelledby="tab-02"
        >
          <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
            <div className="xxl:col-span-4 xl:col-span-4">
              <div className="bg-white border-b-7 border-t-border-color border-t border-l-border-color border-l border-r-border-color border-r border-dark dark:border-white! rounded-lg p-5 mb-6 shadow">
                <div className="mb-5 pb-5 border-b border-border-color text-center">
                  <div className="inline-flex px-2.5 py-1.5 mb-4 rounded-lg font-medium bg-primary-100 text-primary border border-primary">
                    Starter Plan
                  </div>
                  <h3 className="text-[18px] font-bold text-dark mb-1">
                    $588 / year
                  </h3>
                  <p>For individuals &amp; early projects</p>
                </div>
                <p className="text-dark font-semibold mb-4">
                  Features Included
                </p>
                <ul className="p-0">
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Up to 05 AI Agents
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Basic agent configuration
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Standard dashboard analytics
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Manual agent triggers
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Community support
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Email notifications
                  </li>
                </ul>
                <Link
                  to="#"
                  className="btn w-full bg-dark text-white text-center hover:text-white dark:bg-gray-100 dark:text-dark"
                >
                  Get Started
                </Link>
              </div>
              {/* end card */}
            </div>{" "}
            {/* end grid */}
            <div className="xxl:col-span-4 xl:col-span-4">
              <div className="bg-white border-b-7 border-t-border-color border-t border-l-border-color border-l border-r-border-color border-r relative overflow-hidden border-primary rounded-lg p-5 mb-6 shadow">
                <span className="absolute top-[24px] right-[-48px] rotate-45 bg-dark text-white text-[12px]  px-12 py-1.5 z-10 dark:bg-gray-100 dark:text-dark">
                  Most Popular
                </span>
                <div className="mb-5 pb-5 border-b border-border-color text-center">
                  <div className="inline-flex px-2.5 py-1.5 mb-4 rounded-lg font-medium bg-primary-100 text-primary border border-primary">
                    Professional
                  </div>
                  <h3 className="text-[18px] font-bold text-dark mb-1">
                    $1188 / year
                  </h3>
                  <p>For teams building real automation</p>
                </div>
                <p className="text-dark font-semibold mb-4">
                  Features Included
                </p>
                <ul className="p-0">
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Up to 10 AI Agents
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Advanced agent workflows
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Event based triggers
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    API access
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Priority email support
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Activity logs &amp; history
                  </li>
                </ul>
                <Link
                  to="#"
                  className="btn w-full bg-primary-gradient  text-white text-center  hover:text-white"
                >
                  Get Started
                </Link>
              </div>
              {/* end card */}
            </div>{" "}
            {/* end grid */}
            <div className="xxl:col-span-4 xl:col-span-4">
              <div className="bg-white border-b-7 border-t-border-color border-t border-l-border-color border-l border-r-border-color border-r border-dark dark:border-white! rounded-lg p-5 mb-6 shadow">
                <div className="mb-5 pb-5 border-b border-border-color text-center">
                  <div className="inline-flex px-2.5 py-1.5 mb-4 rounded-lg font-medium bg-primary-100 text-primary border border-primary">
                    Business
                  </div>
                  <h3 className="text-[18px] font-bold text-dark mb-1">
                    $2388 / year
                  </h3>
                  <p>For scaling AI across operations</p>
                </div>
                <p className="text-dark font-semibold mb-4">
                  Features Included
                </p>
                <ul className="p-0">
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Unlimited AI Agents
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Custom agent logic
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Multi user access &amp; roles
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Advanced analytics &amp; insights
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    Webhooks &amp; integrations
                  </li>
                  <li className="flex items-center mb-3 gap-1 list-none text-[13px]">
                    <span className="text-[16px]">
                      <i className="ph-duotone ph-check-circle" />
                    </span>{" "}
                    SLA backed priority support
                  </li>
                </ul>
                <Link
                  to="#"
                  className="btn w-full bg-dark text-white text-center hover:text-white dark:bg-gray-100 dark:text-dark"
                >
                  Get Started
                </Link>
              </div>
              {/* end card */}
            </div>{" "}
            {/* end grid */}
          </div>
        </div>{" "}
        {/* end grid */}
      </div>
      {/* End grid */}
    </div>
  );
};

export default Pricing;
