import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"


const IconPhosphor = () => {
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
            Phosphor Icons
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
        <div className="text-[17px] text-dark font-bold">Phosphor Icon</div>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-house" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-house
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-user" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-user
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-users" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-users
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-magnifying-glass" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-magnifying-glass
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-gear" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-gear
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-bell" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-bell
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-lock" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-lock
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-lock-open" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-lock-open
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-trash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-trash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-pencil" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-pencil
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-plus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-plus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-minus" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-minus
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-check" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-check
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-x" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-x
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-warning-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-warning-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-info" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-info
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-question" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-question
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-download" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-download
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-upload" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-upload
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-eye" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-eye
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-eye-slash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-eye-slash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-heart" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-heart
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-star" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-star
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-bookmark" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-bookmark
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-share-network" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-share-network
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-link" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-link
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-copy" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-copy
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-paper-plane-tilt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-paper-plane-tilt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-chat-circle" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-chat-circle
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-chat-teardrop-text" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-chat-teardrop-text
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-chat-dots" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-chat-dots
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-envelope" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-envelope
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-phone" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-phone
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-calendar" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-calendar
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-clock" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-clock
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-map-pin" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-map-pin
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-globe" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-globe
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-play" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-play
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-pause" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-pause
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-stop" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-stop
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-skip-forward" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-skip-forward
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-skip-back" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-skip-back
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-speaker-high" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-speaker-high
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-speaker-low" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-speaker-low
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-speaker-none" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-speaker-none
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-microphone" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-microphone
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-microphone-slash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-microphone-slash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-camera" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-camera
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-camera-slash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-camera-slash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-video-camera" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-video-camera
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-video-camera-slash" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-video-camera-slash
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-music-notes" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-music-notes
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-film-strip" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-film-strip
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-television" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-television
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-folder" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-folder
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-folder-open" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-folder-open
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-file" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-file
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-file-text" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-file-text
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-file-pdf" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-file-pdf
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-file-doc" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-file-doc
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-file-xls" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-file-xls
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-file-ppt" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-file-ppt
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-archive" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-archive
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-cloud" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-cloud
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-cloud-arrow-up" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-cloud-arrow-up
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-cloud-arrow-down" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-cloud-arrow-down
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-hard-drives" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-hard-drives
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-database" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-database
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-shield" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-shield
          </div>
        </div>
        <div className="hs-tooltip-toggle hs-tooltip [--placement:top] w-12.5 h-12.5 flex items-center justify-center rounded-full bg-white border border-border-color text-[18px] hover:text-[22px] hover:text-primary">
          <i className="ph-duotone ph-shield-check" />
          <div
            role="tooltip"
            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 invisible transition-opacity duration-300 absolute z-90 inline-block px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-100 rounded-lg shadow-sm"
          >
            ph-duotone ph-shield-check
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* end grid */}
</div>

  )
}

export default IconPhosphor