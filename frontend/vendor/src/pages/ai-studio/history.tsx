import { Link } from "react-router-dom"
import { Path } from "../../routes/path"
import { useDropdown } from "../../hooks/useDropdown";


const History = () => {
  const { toggle: toggleExport, isOpen: isExportOpen, containerRef: exportRef } = useDropdown();
  const { toggle: toggleSort, isOpen: isSortOpen, containerRef: sortRef } = useDropdown();
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
            History
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center gap-3">
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
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
    {/* left */}
    <div>
      <label htmlFor="hs-table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          type="text"
          name="hs-table-search"
          id="hs-table-search"
          className="block w-full py-1.75 ps-8 pe-3 rounded-lg border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
          placeholder="Search by keyword..."
        />
        <div className="absolute top-1/2 start-3 -translate-y-1/2 pointer-events-none">
          <i className="icon-search text-gray-900" />
        </div>
      </div>
    </div>
    {/* right */}
    <div className="flex gap-4 justify-between items-center flex-wrap">
      {/* Date */}
      <div className="relative rangepicker-input w-[198px]">
        <span className="absolute inset-y-0 left-0 flex items-center px-3 text-muted-foreground text-dark">
          <i className="icon-calendar-days" />
        </span>
        <input
          type="text"
          className="form-input inline-block w-full bg-light border-border-color rounded-lg focus:ring-0 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-border-color pl-8! ps-8!"
          data-provider="flatpickr"
          data-date-format="d M y"
          data-range-date="true"
          defaultValue="01 Jan 26 to 20 Jan 26"
          id="picker"
        />
      </div>
      <div>
        <div ref={sortRef} className="relative inline-flex">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSort("historySort");
            }}
            className="btn cursor-pointer inline-flex items-center gap-x-2 font-normal rounded-lg border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
            aria-haspopup="menu"
            aria-expanded={isSortOpen("historySort")}
            aria-label="Dropdown"
          >
            <i className="icon-arrow-up-narrow-wide" /> Newest{" "}
            <i className="icon icon-chevron-down" />
          </button>
          {isSortOpen("historySort") && (
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
  <div className="flex flex-col gap-6 mb-6">
    <div className="p-5 rounded-lg border border-border-color bg-white hover:border-primary">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <p className="text-primary font-medium mb-1">Audio</p>
          <h6 className="flex items-center gap-2">
            Customer Service Enhancement{" "}
            <i className="fa-solid fa-star text-warning" />
          </h6>
        </div>
        <div className="flex justify-start md:justify-between items-center">
          <p className="border-e border-border-color px-2 flex items-center gap-2">
            <i className="icon icon-calendar-days text-dark" /> 5m ago
          </p>
          <p className="px-2 flex items-center gap-2">
            <i className="icon icon-message-square-text text-dark" /> 2 Version
          </p>
          <Link to="#" className="text-danger text-[16px] ms-4">
            <i className="icon icon-trash-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-4 border border-border-color rounded-lg bg-light">
        <div>
          <p className="text-dark font-semibold mb-1">Prompt</p>
          <p>
            Develop a strategy to enhance our customer service and support
            channels.
          </p>
        </div>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark text-center hover:bg-primary hover:border-primary hover:text-white"
        >
          Continue
          <i className="icon icon-chevron-right" />
        </button>
      </div>
    </div>
    <div className="p-5 rounded-lg border border-border-color bg-white hover:border-primary">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <p className="text-primary font-medium mb-1">Image</p>
          <h6 className="flex items-center gap-2">
            Website Redesign Proposals <i className="icon icon-star" />
          </h6>
        </div>
        <div className="flex justify-start md:justify-between items-center">
          <p className="border-e border-border-color px-2 flex items-center gap-2">
            <i className="icon icon-calendar-days text-dark" /> 10m ago
          </p>
          <p className="px-2 flex items-center gap-2">
            <i className="icon icon-message-square-text text-dark" /> 1 Version
          </p>
          <Link to="#" className="text-danger text-[16px] ms-4">
            <i className="icon icon-trash-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-4 border border-border-color rounded-lg bg-light">
        <div>
          <p className="text-dark font-semibold mb-1">Prompt</p>
          <p>
            Create proposals for a modern and user-friendly website redesign.
          </p>
        </div>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark text-center hover:bg-primary hover:border-primary hover:text-white"
        >
          Continue
          <i className="icon icon-chevron-right" />
        </button>
      </div>
    </div>
    <div className="p-5 rounded-lg border border-border-color bg-white hover:border-primary">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <p className="text-primary font-medium mb-1">Text</p>
          <h6 className="flex items-center gap-2">Marketing Campaign Ideas</h6>
        </div>
        <div className="flex justify-start md:justify-between items-center">
          <p className="border-e border-border-color px-2 flex items-center gap-2">
            <i className="icon icon-calendar-days text-dark" /> 30m ago
          </p>
          <p className="px-2 flex items-center gap-2">
            <i className="icon icon-message-square-text text-dark" /> 4 Version
          </p>
          <Link to="#" className="text-danger text-[16px] ms-4">
            <i className="icon icon-trash-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-4 border border-border-color rounded-lg bg-light">
        <div>
          <p className="text-dark font-semibold mb-1">Prompt</p>
          <p>
            Brainstorm creative marketing campaign ideas for promoting our new
            fitness tracker.
          </p>
        </div>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark text-center hover:bg-primary hover:border-primary hover:text-white"
        >
          Continue
          <i className="icon icon-chevron-right" />
        </button>
      </div>
    </div>
    <div className="p-5 rounded-lg border border-border-color bg-white hover:border-primary">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <p className="text-primary font-medium mb-1">Video</p>
          <h6 className="flex items-center gap-2">User Feedback Analysis</h6>
        </div>
        <div className="flex justify-start md:justify-between items-center">
          <p className="border-e border-border-color px-2 flex items-center gap-2">
            <i className="icon icon-calendar-days text-dark" /> 1h ago
          </p>
          <p className="px-2 flex items-center gap-2">
            <i className="icon icon-message-square-text text-dark" /> 3 Version
          </p>
          <Link to="#" className="text-danger text-[16px] ms-4">
            <i className="icon icon-trash-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-4 border border-border-color rounded-lg bg-light">
        <div>
          <p className="text-dark font-semibold mb-1">Prompt</p>
          <p>
            Gather and analyze user feedback to improve our mobile application
            experience.
          </p>
        </div>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark text-center hover:bg-primary hover:border-primary hover:text-white"
        >
          Continue
          <i className="icon icon-chevron-right" />
        </button>
      </div>
    </div>
    <div className="p-5 rounded-lg border border-border-color bg-white hover:border-primary">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <p className="text-primary font-medium mb-1">Audio</p>
          <h6 className="flex items-center gap-2">Product Launch Strategy</h6>
        </div>
        <div className="flex justify-start md:justify-between items-center">
          <p className="border-e border-border-color px-2 flex items-center gap-2">
            <i className="icon icon-calendar-days text-dark" /> 2h ago
          </p>
          <p className="px-2 flex items-center gap-2">
            <i className="icon icon-message-square-text text-dark" /> 2 Version
          </p>
          <Link to="#" className="text-danger text-[16px] ms-4">
            <i className="icon icon-trash-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center p-4 border border-border-color rounded-lg bg-light">
        <div>
          <p className="text-dark font-semibold mb-1">Prompt</p>
          <p>
            Help me create a comprehensive product launch plan for our new
            AI-powered analytics tool.
          </p>
        </div>
        <button
          type="button"
          className="btn flex items-center justify-center gap-1.5 cursor-pointer bg-white border border-border-color text-dark text-center hover:bg-primary hover:border-primary hover:text-white"
        >
          Continue
          <i className="icon icon-chevron-right" />
        </button>
      </div>
    </div>
  </div>
  <div className="text-center">
    <Link
      to="#"
      className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
    >
      <i className="icon-loader" />
      Load More History
    </Link>
  </div>
  {/* End grid */}
</div>

  )
}

export default History