import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"


const IconLucide = () => {
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
          <li className="text-default">Icon</li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Lucide Icons
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
        <div className="text-[17px] text-dark font-bold">Lucide Icon</div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-eye" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-eye
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-house" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-house
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-user" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-user
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-users" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-users
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-search" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-search
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-settings" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-settings
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-bell" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-bell
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-lock" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-lock
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-key" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-key
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-trash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-trash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-square-pen" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-square-pen
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-plus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-plus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-minus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-minus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-check" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-check
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-x" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-x
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-octagon-alert" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-octagon-alert
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-info" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-info
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-hand-helping" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-hand-helping
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-download" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-download
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-upload" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-upload
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-refresh-cw" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-refresh-cw
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-log-in" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-log-in
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-log-out" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-log-out
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-mail" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-mail
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-phone" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-phone
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-calendar" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-calendar
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-clock" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-clock
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-map-pin" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-map-pin
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-heart" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-heart
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-star" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-star
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-camera" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-camera
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-image" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-image
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-file" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-file
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-folder" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-folder
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-credit-card" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-credit-card
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-shopping-cart" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-shopping-cart
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-chart-bar" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-chart-bar
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-chart-pie" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-chart-pie
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-layout-grid" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-layout-grid
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-menu" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-menu
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-chevron-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-chevron-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-chevron-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-chevron-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-arrow-left" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-arrow-left
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-arrow-right" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-arrow-right
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-share" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-share
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-copy" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-copy
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-link" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-link
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-globe" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-globe
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-wifi" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-wifi
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-sun" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-sun
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-moon" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-moon
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-cloud" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-cloud
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-cloud-rain" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-cloud-rain
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-cloud-snow" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-cloud-snow
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-wind" data-tooltip-target="icon-wind" />
          <div
            id="icon-wind"
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-wind
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-umbrella" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-umbrella
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-thermometer" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-thermometer
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-droplet" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-droplet
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-flame" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-flame
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-zap" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-zap
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-battery" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-battery
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-battery-charging" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-battery-charging
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-cpu" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-cpu
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-hard-drive" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-hard-drive
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-monitor" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-monitor
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-smartphone" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-smartphone
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-tablet" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-tablet
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-mouse" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-mouse
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-play" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-play
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-pause" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-pause
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-square-pause" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-square-pause
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-fast-forward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-fast-forward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-rewind" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-rewind
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-volume" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-volume
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-volume-1" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-volume-1
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-volume-2" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-volume-2
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-volume-x" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-volume-x
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-mic" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-mic
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-mic-off" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-mic-off
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-video" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-video
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-video-off" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-video-off
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-headphones" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-headphones
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-music" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-music
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-radio" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-radio
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-film" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-film
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="icon icon-tv" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            icon icon-tv
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default IconLucide