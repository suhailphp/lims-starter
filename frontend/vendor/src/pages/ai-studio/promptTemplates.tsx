import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import { useDropdown } from "../../hooks/useDropdown";


const PromptTemplates = () => {
  const { toggle: toggleExport, isOpen: isExportOpen, containerRef: exportRef } = useDropdown();
  const { toggle: toggleAction1, isOpen: isAction1Open, containerRef: action1Ref } = useDropdown();
  const { toggle: toggleAction2, isOpen: isAction2Open, containerRef: action2Ref } = useDropdown();
  const { toggle: toggleAction3, isOpen: isAction3Open, containerRef: action3Ref } = useDropdown();
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
            Prompt Templates
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      <div ref={exportRef} className="relative inline-flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExport("export1");
              }}
              type="button"
              className="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary  focus:border-primary focus:text-white  focus:outline-hidden"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <i className="icon-arrow-down-to-line"></i>Export
            </button>
 {isExportOpen("export1") && (
              <div
                  className=" absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-9"
                role="menu"
                aria-orientation="vertical"
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
              </div>
 )}
          </div>
      <Link
        to={Path.addPrompt}
        className="btn bg-primary border border-primary text-white text-center font-semibold inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
      >
        <i className="icon-sparkles" />
        Test Prompts
      </Link>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid */}
  <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
    {/* left */}
    <div className="flex items-center gap-2 flex-wrap">
      <div>
        <div ref={action1Ref} className="relative inline-flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleAction1("categoryFilter");
            }}
            className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
            aria-haspopup="menu"
            aria-expanded={isAction1Open("categoryFilter")}
            aria-label="Dropdown"
          >
            Add Category
            <i className="icon-chevron-down" />
          </button>
          {isAction1Open("categoryFilter") && (
            <div
              className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="p-2 space-y-1">
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  All Catgeories
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Text
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Image
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Video
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Voice
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div ref={action2Ref} className="relative inline-flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleAction2("industryFilter");
            }}
            className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
            aria-haspopup="menu"
            aria-expanded={isAction2Open("industryFilter")}
            aria-label="Dropdown"
          >
            All Industries
            <i className="icon-chevron-down" />
          </button>
          {isAction2Open("industryFilter") && (
            <div
              className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              role="menu"
              aria-orientation="vertical"
            >
              <div className="p-2 space-y-1">
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  All Industries
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Marketing
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Social Media
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Technology
                </Link>
                <Link
                  className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  to="#"
                >
                  Service
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
            placeholder="Search Templates"
          />
          <div className="absolute top-1/2 start-3 -translate-y-1/2 pointer-events-none">
            <i className="icon-search text-gray-900" />
          </div>
        </div>
      </div>
      {/* Dropdown */}
      <div>
        <div ref={action3Ref} className="relative inline-flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleAction3("sortFilter");
            }}
            className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded={isAction3Open("sortFilter")}
            aria-label="Dropdown"
          >
            <i className="icon-arrow-up-narrow-wide" /> Newest{" "}
            <i className="icon icon-chevron-down" />
          </button>
          {isAction3Open("sortFilter") && (
            <div
              className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              role="menu"
              aria-orientation="vertical"
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
          </div>
          )}
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
  <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6">
    <div className="bg-primary/2 border border-primary text-center border-dashed rounded-lg p-5 flex items-center justify-center flex-col hover:shadow-lg transition">
      <div className="flex items-center justify-center mb-5">
        <div className="size-16 rounded-full bg-white text-dark text-2xl flex items-center justify-center">
          <i className="icon-plus" />
        </div>
      </div>
      <div>
        <h6 className="mb-1">Create New Template</h6>
        <p className="mb-5">Start From Scratch</p>
        <Link
          to={Path.addTemplate}
          className="btn bg-primary border border-primary text-white text-center font-semibold inline-flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-circle-plus" />
          Create New
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Text</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-warning-50 text-warning border border-warning">
          Intermediate
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">SEO Blog Post Writer</h6>
        <p className="line-clamp-2">
          Generate high-quality blog posts optimized for search engines to
          increase organic...
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            topic
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            target_keywords
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            audience
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 20 min ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Marketing
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Image</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-success-50 text-success border border-success">
          Beginner
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">Social Media Visual Content</h6>
        <p className="line-clamp-2">
          Generate eye catching images tailored for social media platforms with
          brand aligned...
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            platform
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            brand_colors
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            campaign_theme
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 30 min ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Social Media
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Video</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-warning-50 text-warning border border-warning">
          Intermediate
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">Product Demo Video Generator</h6>
        <p className="line-clamp-2">
          Generate short demo videos explaining product features and workflows
          in a modern...
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            product_name
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            key_features
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            video_length
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 1h ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Technology
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Audio</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-danger-50 text-danger border border-danger">
          Advanced
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">UI Sound Generator</h6>
        <p className="line-clamp-2">
          Generate clean, modern sound effects for app interactions and system
          notifications.
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            sound_type
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            intensity_level
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            duration
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 2h ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Technology
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Voice</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-warning-50 text-warning border border-warning">
          Intermediate
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">Customer Support Voice Generator</h6>
        <p className="line-clamp-2">
          Generate natural, friendly voice responses for IVR systems and support
          automation.
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            language
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            tone
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            use_case
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 2 days ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Service
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Text</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-warning-50 text-warning border border-warning">
          Intermediate
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">Press Release Generator</h6>
        <p className="line-clamp-2">
          Create professional press releases for product launches,
          announcements, and media...
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            company_name
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            announcement_type
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 2 days ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Public Relations
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Image</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-success-50 text-success border border-success">
          Beginner
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">Product Image Generator</h6>
        <p className="line-clamp-2">
          Create clean, high-resolution product images for catalogs, ads, and
          online stores.
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            product_name
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            background_style
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 4 days ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          E-commerce
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-4">
        <p className="font-medium text-primary mb-0">Video</p>
        <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-success-50 text-success border border-success">
          Beginner
        </span>
      </div>
      <div className="mb-4">
        <h6 className="truncate mb-1">Marketing Ad Video Creator</h6>
        <p className="line-clamp-2">
          Create engaging promotional videos optimized for ads across digital
          platforms.
        </p>
      </div>
      <div className="mb-4">
        <h6 className="text-sm font-semibold mb-2">Variables</h6>
        <div className="flex items-center flex-wrap gap-2">
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            campaign_goal
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            target_audience
          </span>
          <span className="inline-flex badge-small text-xs rounded-lg font-medium bg-info-50 text-info border border-info">
            platform
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border-color pb-5 mb-5">
        <p className="flex items-center">
          <i className="icon-calendar-days me-2" />
          Updated : 50 days ago
        </p>
        <button className="inline-flex btn-small text-xs rounded-lg font-medium bg-light text-gray-900 border border-border-color">
          <i className="icon-tags me-2" />
          Marketing
        </button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={Path.editTemplate}
            className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
          >
            <i className="icon-arrow-down-to-line" />
            Edit
          </Link>
          <button
            type="button"
            className="btn bg-dark border border-dark text-white dark:bg-gray-100 dark:border-gray-100 dark:text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-copy" />
            Copy
          </button>
        </div>
        <Link
          to="#"
          className="bg-light border border-border-color text-danger text-center hover:bg-light-800 hover:border-light-800 hover:text-danger size-8 rounded-full flex items-center justify-center"
        >
          <i className="icon-trash-2" />
        </Link>
      </div>
    </div>{" "}
    {/* end card */}
  </div>{" "}
  {/* end grid */}
  <div className="text-center mt-6">
    <Link
      to="#"
      className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
    >
      <i className="icon-loader" />
      Load More Templates
    </Link>
  </div>
</div>

  )
}

export default PromptTemplates