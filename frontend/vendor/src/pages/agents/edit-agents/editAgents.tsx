import { useEffect } from 'react'
import CommonSelect from '../../../components/common-select/commonSelect';
import {
  categories,
  baseModels,
  agentTypes,
  environments,
  deployMethods,
} from "../../../utils/json/selectData";
import AgentModals from '../modals';
import { Path } from '../../../routes/path';
import { Link } from 'react-router-dom';


const EditAgents = () => {
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
                  Create Agents
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn bg-white border border-gray-200 text-dark inline-flex items-center justify-center gap-x-2 rounded-lg py-2 px-3 hover:bg-gray-50 focus:outline-none disabled:opacity-50"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="agent-modal"
              aria-label="Preview agent"
              data-hs-overlay="#agent-modal"
            >
              <i className="icon-user" /> Open Agent
            </button>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Start grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
          {/* Grid Left */}
          <div className="xl:col-span-8 lg:col-span-12">
            {/* Agent Form */}
            <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
                <i className="icon-bot me-2" />
                Basic Agent Configuration
              </h2>
              <form>
                {/* Start grid */}
                <div className="grid md:grid-cols-12 gap-4 mb-5 pb-5 border-b border-border-color">
                  <div className="col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Agent Name <span className="text-danger">*</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Category <span className="text-danger">*</span>
                    </div>
                    <CommonSelect
                      options={categories}
                      placeholder="All Categories"
                      className="custom-select"
                    />
                  </div>
                  <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Base Model <span className="text-danger">*</span>
                    </div>
                    <CommonSelect
                      options={baseModels}
                      placeholder="GPT-4o"
                      className="custom-select"
                    />
                  </div>
                  <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Agent Type <span className="text-danger">*</span>
                    </div>
                    <CommonSelect
                      options={agentTypes}
                      placeholder="Conversational"
                      className="custom-select"
                    />
                  </div>
                  <div className="col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Description
                    </div>
                    <textarea
                      className="block text-dark w-full bg-white border-border-color rounded-lg py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={3}
                      placeholder=""
                      defaultValue={""}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Minimum 50 Characters Required
                    </p>
                  </div>
                </div>
                {/* End grid */}
                {/* Start Tools */}
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
                    <i className="icon-shapes me-2" /> Tools &amp;
                    Capabilities{" "}
                  </h2>
                  <Link
                    to="#"
                    className="btn bg-white border border-border-color text-dark font-semibold hover:bg-primary-800 hover:border-primary-800 hover:text-white flex items-center gap-x-2"
                  >
                    <i className="icon-plus fw-normal" /> Add New
                  </Link>
                </div>
                <div className="mb-5 pb-5 border-b border-border-color">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <label
                      htmlFor="custom-switch-one"
                      className="relative inline-block w-8 h-5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="custom-switch-one"
                        className="peer sr-only"
                        checked
                      />
                      <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                      <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                    </label>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold text-dark text-sm!">
                        Natural Language Understanding (NLU)
                      </h2>
                      <p className="mb-0">
                        Enables the AI agent to understand user intent, context,
                        and key entities.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <label
                      htmlFor="custom-switch-two"
                      className="relative inline-block w-8 h-5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="custom-switch-two"
                        className="peer sr-only"
                        checked
                      />
                      <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                      <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                    </label>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold text-dark text-sm!">
                        Integrations &amp; Extensibility
                      </h2>
                      <p className="mb-0">
                        Connects with third-party tools webhooks to extend agent
                        functionality.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <label
                      htmlFor="custom-switch-three"
                      className="relative inline-block w-8 h-5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="custom-switch-three"
                        className="peer sr-only"
                      />
                      <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                      <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                    </label>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold text-dark text-sm!">
                        Customization &amp; Configuration
                      </h2>
                      <p className="mb-0">
                        Allows administrators to configure agent behavior, and
                        domain-specific rules
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label
                      htmlFor="custom-switch-four"
                      className="relative inline-block w-8 h-5 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="custom-switch-four"
                        className="peer sr-only"
                        checked
                      />
                      <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                      <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                    </label>
                    <div className="flex flex-col gap-1">
                      <h2 className="font-semibold text-dark text-sm!">
                        Knowledge Retrieval
                      </h2>
                      <p className="mb-0">
                        Searches knowledge bases, documents to deliver accurate
                        answers in real time.
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Tools */}
                {/* Start Validation */}
                <div className="mb-5 pb-5 border-b border-border-color">
                  <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
                    <i className="icon-square-terminal me-2" /> Testing &amp;
                    Validation{" "}
                  </h2>
                  <div className="mb-3.5">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      System Prompt
                    </div>
                    <textarea
                      className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                      rows={3}
                      placeholder="Ask me anything"
                      defaultValue={""}
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Test results will appear here. Run a test to see how your
                      agent responds.
                    </p>
                  </div>
                  <Link
                    to="#"
                    className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {" "}
                    <i className="icon-plug-zap font-normal" />
                    Run Test
                  </Link>
                </div>
                {/* End Validation */}
                <div className="flex items-center gap-3 sm:flex-row max-sm:flex-col">
                  <Link
                    to="#"
                    className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg w-full hover:bg-primary-800 hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {" "}
                    <i className="icon-bookmark font-normal" />
                    Save as Draft
                  </Link>
                  <Link
                    to="#"
                    className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg w-full hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {" "}
                    <i className="icon-shield-check font-normal" />
                    Deploy
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* Grid Right */}
          <div className="xl:col-span-4 lg:col-span-12">
            <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
                <i className="icon-rocket me-2" /> Deployment Options
              </h2>
              <form>
                <div className="grid md:grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Environment <span className="text-danger">*</span>
                    </div>
                    <CommonSelect
                      options={environments}
                      placeholder="Select"
                      className="custom-select"
                    />
                  </div>
                  <div className="col-span-12">
                    <div className="mb-1 block text-sm font-semibold text-dark">
                      Deploy Method <span className="text-danger">*</span>
                    </div>
                    <CommonSelect
                      options={deployMethods}
                      placeholder="API Endpoint"
                      className="custom-select"
                    />
                  </div>
                  <div className="col-span-12">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="mb-1 block text-sm font-semibold text-dark">
                        Rate Limiting <span className="text-danger">*</span>
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
                    <div className="relative">
                      <input
                        type="text"
                        className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color" value="100"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum requests per minute
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex items-center gap-3 mb-4">
                      <label
                        htmlFor="custom-switch-seven"
                        className="relative inline-block w-8 h-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="custom-switch-seven"
                          className="peer sr-only"
                          defaultChecked
                        />
                        <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                        <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                      </label>
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-dark text-sm!">
                          Enable Monitoring
                        </h2>
                        <p className="mb-0">
                          Track metrics &amp; usage statistics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="custom-switch-eight"
                        className="relative inline-block w-8 h-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id="custom-switch-eight"
                          className="peer sr-only"
                          defaultChecked
                        />
                        <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none" />
                        <span className="absolute top-1/2 start-1 -translate-y-1/2 size-3 bg-white dark:bg-dark rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full" />
                      </label>
                      <div className="flex flex-col gap-1">
                        <h2 className="font-semibold text-dark text-sm!">
                          Enable Logging
                        </h2>
                        <p className="mb-0">Log all for quality assurance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AgentModals />
    </>
  );
}

export default EditAgents