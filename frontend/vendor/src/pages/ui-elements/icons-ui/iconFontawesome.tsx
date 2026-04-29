import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import "@fortawesome/fontawesome-free/css/all.min.css"


const IconFontawesome = () => {
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
            Fontawesome Icon
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1">
    <div
      id="hs-tooltip"
      className="preview-card bg-white rounded-md border border-border-color p-5"
    >
      <div className="pb-5 mb-5 flex items-center xxl:gap-0 gap-3 justify-between flex-wrap border-b border-border-color">
        <div className="text-[17px] text-dark font-bold">Fontawesome Icon</div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-address-book" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-address-book
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top]  w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-address-card" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-address-card
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-align-center" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-align-center
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-align-justify" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-align-justify
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-align-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-align-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-align-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-align-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-ambulance" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-ambulance
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-american-sign-language-interpreting" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-american-sign-language-interpreting
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-anchor" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-anchor
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-double-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-double-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-double-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-double-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-double-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-double-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-double-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-double-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-angle-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-angle-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fab fa-apple" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-apple
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-archive" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-archive
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fas fa-chart-area" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fas fa-chart-area
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-circle-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-circle-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-circle-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-circle-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-circle-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-circle-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-circle-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-circle-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrow-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrow-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-arrows-alt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-arrows-alt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-assistive-listening-systems" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-assistive-listening-systems
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-asterisk" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-asterisk
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-at" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-at
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-audio-description" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-audio-description
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-backward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-backward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-balance-scale" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-balance-scale
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-ban" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-ban
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-barcode" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-barcode
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bars" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bars
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bath" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bath
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-battery-empty" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-battery-empty
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-battery-full" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-battery-full
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-battery-half" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-battery-half
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-battery-quarter" />
          <div
            role="tooltip"
            className="absolute z-10 invisible inline-block px-2 py-1 text-sm text-white transition-opacity duration-300 bg-gray-900 rounded-acity-0 tooltip"
          >
            fa fa-battery-quarter
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-battery-three-quarters" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-battery-three-quarters
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bed" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bed
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-beer" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-beer
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bell" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bell
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bell-slash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bell-slash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bicycle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bicycle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-binoculars" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-binoculars
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-birthday-cake" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-birthday-cake
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-blind" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-blind
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bold" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bold
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bolt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bolt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bomb" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bomb
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-book" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-book
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bookmark" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bookmark
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-braille" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-braille
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-briefcase" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-briefcase
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bug" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bug
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-building" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-building
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bullhorn" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bullhorn
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bullseye" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bullseye
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-bus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-bus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-calculator" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-calculator
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-calendar" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-calendar
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-camera" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-camera
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-camera-retro" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-camera-retro
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-car" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-car
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-caret-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-caret-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-caret-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-caret-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-caret-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-caret-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-cart-arrow-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-cart-arrow-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-cart-plus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-cart-plus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-certificate" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-certificate
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-check" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-check
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-check-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-check-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-circle-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-circle-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-circle-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-circle-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-circle-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-circle-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-chevron-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-chevron-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-child" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-child
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-clipboard" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-clipboard
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-clone" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-clone
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-cloud" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-cloud
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-code" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-code
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-coffee" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-coffee
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-cog" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-cog
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-cogs" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-cogs
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-columns" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-columns
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-comment" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-comment
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-compress" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-compress
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-copyright" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-copyright
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-credit-card" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-credit-card
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-desktop" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-desktop
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-edit" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-edit
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-eject" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-eject
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-ellipsis-h" />
          <div
            id="fa-ellipsis-h"
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-ellipsis-h
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-ellipsis-v" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-ellipsis-v
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-envelope" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-envelope
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-envelope-open" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-envelope-open
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-envelope-square" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-envelope-square
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-eraser" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-eraser
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-exclamation" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-exclamation
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-exclamation-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-exclamation-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-exclamation-triangle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-exclamation-triangle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-expand" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-expand
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-eye" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-eye
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-eye-slash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-eye-slash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-fast-backward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-fast-backward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-fast-forward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-fast-forward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-fax" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-fax
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-female" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-female
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-fighter-jet" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-fighter-jet
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-file" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-file
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-fire" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-fire
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-fire-extinguisher" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-fire-extinguisher
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-flag" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-flag
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-flag-checkered" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-flag-checkered
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-road" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-road
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-rocket" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-rocket
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-save" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-save
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-search" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-search
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-search-minus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-search-minus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-search-plus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-search-plus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-server" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-server
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-share" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-share
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-share-alt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-share-alt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-share-alt-square" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-share-alt-square
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-share-square" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-share-square
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-ship" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-ship
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-shopping-bag" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-shopping-bag
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-shopping-basket" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-shopping-basket
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-shopping-cart" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-shopping-cart
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-shower" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-shower
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-sign-language" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-sign-language
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-signal" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-signal
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-sitemap" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-sitemap
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-sort" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-sort
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-sort-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-sort-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-square" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-square
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-star" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-star
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-star-half" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-star-half
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-step-backward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-step-backward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-step-forward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-step-forward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-stethoscope" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-stethoscope
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-sticky-note" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-sticky-note
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-stop" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-stop
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-stop-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-stop-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-street-view" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-street-view
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-subscript" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-subscript
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-suitcase" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-suitcase
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-superscript" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-superscript
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-table" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-table
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tag" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tag
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tags" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tags
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tasks" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tasks
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-taxi" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-taxi
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-terminal" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-terminal
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-text-height" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-text-height
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-text-width" />
          <div
            id="fa-text-width"
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-text-width
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-th" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-th
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-th-large" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-th-large
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-th-list" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-th-list
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thermometer" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thermometer
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thermometer-empty" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thermometer-empty
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thermometer-full" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thermometer-full
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thermometer-half" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thermometer-half
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thermometer-quarter" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thermometer-quarter
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thermometer-three-quarters" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thermometer-three-quarters
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thumbs-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thumbs-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-thumbs-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-thumbs-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-times" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-times
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-times-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-times-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tint" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tint
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-toggle-off" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-toggle-off
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-toggle-on" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-toggle-on
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-trademark" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-trademark
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-train" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-train
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-transgender" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-transgender
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-transgender-alt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-transgender-alt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-trash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-trash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tree" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tree
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-trophy" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-trophy
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tty" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tty
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-tv" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-tv
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-umbrella" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-umbrella
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-underline" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-underline
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-undo" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-undo
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-universal-access" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-universal-access
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-university" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-university
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-unlink" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-unlink
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-unlock" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-unlock
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-unlock-alt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-unlock-alt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-upload" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-upload
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-user-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-user-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-user-md" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-user-md
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-user-plus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-user-plus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-user-secret" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-user-secret
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-user-times" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-user-times
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-users" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-users
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-venus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-venus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-venus-double" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-venus-double
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-venus-mars" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-venus-mars
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-volume-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-volume-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-volume-off" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-volume-off
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-volume-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-volume-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-wheelchair" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-wheelchair
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-wifi" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-wifi
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-window-close" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-window-close
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-window-maximize" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-window-maximize
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-window-minimize" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-window-minimize
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-window-restore" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-window-restore
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="fa fa-wrench" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            fa fa-wrench
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default IconFontawesome