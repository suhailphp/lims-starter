import { Link, useNavigate } from "react-router-dom"
import { Path } from "../../routes/path"
import CommonSelect from "../../components/common-select/commonSelect";
import { Base_Model, CategoryTemplate, IndustryTemplate } from "../../utils/json/selectData";
import CommonTagInput from "../../components/common-tag-input/commonTagInput";
import { useState } from "react";


const AddTemplate = () => {
      const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    navigate(Path.promptTemplates);
  };
    const [templateVariables, setTemplateVariables] = useState<string[]>([]);
  return (
    <div className="p-6">
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
          <li className="text-default">
            <Link
              to={Path.promptTemplates}
              className="text-default hover:text-primary"
            >
              Prompt Templates
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Create New Template
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center gap-3">
      <Link
        to={Path.promptTemplates}
        className="btn bg-white border border-border-color text-dark text-center flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
      >
        <i className="icon-chevron-left" />
        Back to Templates
      </Link>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6">
    <div className="xl:col-span-8 lg:col-span-12">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
          <i className="icon-layout-template me-2" />
          Template Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-12 gap-4 mb-5 pb-5 border-b border-border-color">
            <div className="col-span-12">
              <label
                htmlFor="template_name"
                className="mb-1 block text-sm font-semibold text-dark"
              >
                Template Name <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="template_name"
                  className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color focus:outline-none focus:border-border-color"
                />
              </div>
            </div>
            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-semibold text-dark"
              >
                Category <span className="text-danger">*</span>
              </label>
               <CommonSelect
              options={CategoryTemplate} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
            </div>
            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
              <label
                htmlFor="base_model"
                className="mb-1 block text-sm font-semibold text-dark"
              >
                Base Model <span className="text-danger">*</span>
              </label>
              <CommonSelect
              options={Base_Model} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
            </div>
            <div className="lg:col-span-4 md:col-span-4 sm:col-span-4 col-span-12">
              <label
                htmlFor="industry"
                className="mb-1 block text-sm font-semibold text-dark"
              >
                Industry <span className="text-danger">*</span>
              </label>
              <CommonSelect
              options={IndustryTemplate} // optional
              placeholder="Select" // optional // for screen readers
              className="custom-select" // optional styling
            />
            </div>
            <div className="col-span-12">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-semibold text-dark"
              >
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                id="description"
                className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none placeholder:gray-400"
                rows={3}
                defaultValue={""}
              />
              <p className="text-xs text-gray-600 mt-1">
                Minimum 50 Characters Required
              </p>
            </div>
          </div>
          {/* End grid */}
          {/* Start Tools */}
          <div className="mb-5 pb-5 border-b border-border-color">
            <div className="mb-5">
              <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-0">
                <i className="icon-code-xml me-2" />
                Prompt Information
              </h2>
            </div>
            <div className="grid md:grid-cols-12 gap-4">
              <div className="col-span-12">
                <label
                  htmlFor="system_prompt"
                  className="mb-1 block text-sm font-semibold text-dark"
                >
                  System Prompt <span className="text-danger">*</span>
                </label>
                <textarea
                  id="system_prompt"
                  className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none placeholder:gray-400"
                  rows={4}
                  placeholder="Write your prompt template here. Use {{variable_name}} for dynamic variables. Example: Create a {{content_type}} about {{topic}} in a {{tone}} tone. The content should be {{length}} and target {{audience}}."
                  defaultValue={""}
                />
                <p className="text-xs text-gray-600 mt-1">
                  Use double curly braces {"{"}
                  {"{"} {"}"}
                  {"}"}to define variables in your template
                </p>
              </div>
              <div className="col-span-12">
                <div className="flex items-end gap-3">
                  <div className="w-full">
                    <label
                      htmlFor="choices-text-remove-button"
                      className="mb-1 block text-sm font-semibold text-dark"
                    >
                      Template Variables <span className="text-danger">*</span>
                    </label>
                    <CommonTagInput
                    id="template-variables"
                    value={templateVariables}
                    onChange={setTemplateVariables}
                    placeholder=""
                    className="custom-tag-input"
                  />
                  </div>
                  <button
                    type="button"
                    className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
                  >
                    <i className="icon-plus" />
                    Add
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-3">
                  <div className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info gap-1">
                    platform
                    <button type="button" className="cursor-pointer">
                      <i className="icon-x" />
                    </button>
                  </div>
                  <div className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info gap-1">
                    brand_colors
                    <button type="button" className="cursor-pointer">
                      <i className="icon-x" />
                    </button>
                  </div>
                  <div className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info gap-1">
                    campaign_theme
                    <button type="button" className="cursor-pointer">
                      <i className="icon-x" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Tools */}
          <div className="flex items-center flex-col sm:flex-row gap-3">
            <Link
              to="#"
              className="btn inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg w-full hover:bg-primary-800 hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              {" "}
              <i className="icon-arrow-left" />
              Cancel
            </Link>
            <button
              type="submit"
              className="btn inline-flex items-center justify-center gap-x-2 bg-primary text-white font-semibold rounded-lg w-full hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              {" "}
              <i className="icon-shield-check" />
              Create Template
            </button>
          </div>
        </form>
      </div>
    </div>{" "}
    {/* end col */}
    <div className="xl:col-span-4 lg:col-span-12">
      <div className="bg-white dark:bg-dark-card border border-border-color shadow rounded-lg p-5">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px] mb-5">
          <i className="icon-lightbulb me-2" />
          Prompt Best Practices
        </h2>
        <div className="space-y-4">
          <p className="flex items-center">
            <i className="ph-duotone ph-check-circle text-success text-xl me-2" />
            Use clear, specific instructions in your prompt
          </p>
          <p className="flex items-center">
            <i className="ph-duotone ph-check-circle text-success text-xl me-2" />
            Define variables for parts that will change between uses
          </p>
          <p className="flex items-center">
            <i className="ph-duotone ph-check-circle text-success text-xl me-2" />
            Define variables for parts that will change between uses
          </p>
          <p className="flex items-center">
            <i className="ph-duotone ph-check-circle text-success text-xl me-2" />
            Test your template with different variable values
          </p>
        </div>
      </div>
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default AddTemplate