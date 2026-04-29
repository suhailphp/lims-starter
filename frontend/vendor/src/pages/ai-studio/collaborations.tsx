import { Link } from "react-router-dom";
import { Path } from "../../routes/path";
import { Images } from "../../utils/imagePath";
import CommonSelect from "../../components/common-select/commonSelect";
import { Type } from "../../utils/json/selectData";
import CommonDatePicker from "../../components/common-datepicker/commonDatepicker";
import PredefinedDatePicker from "../../components/common-daterange-picker/commonDateRangePicker";
import { useDropdown } from "../../hooks/useDropdown";

const Collaborations = () => {
  const { toggle: toggleMenu1, isOpen: isMenu1Open, containerRef: menu1Ref } = useDropdown();
  const { toggle: toggleMenu2, isOpen: isMenu2Open, containerRef: menu2Ref } = useDropdown();
  const { toggle: toggleMenu3, isOpen: isMenu3Open, containerRef: menu3Ref } = useDropdown();
  const { toggle: toggleMenu4, isOpen: isMenu4Open, containerRef: menu4Ref } = useDropdown();
  const { toggle: toggleMenu5, isOpen: isMenu5Open, containerRef: menu5Ref } = useDropdown();

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
                  Collaborations
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn bg-primary border border-primary text-white inline-flex items-center justify-center gap-x-2 rounded-lg py-2 px-3 hover:bg-primary-800 hover:border-primary-800 hover:text-white focus:outline-none disabled:opacity-50"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="start-collaboration"
              data-hs-overlay="#start-collaboration"
            >
              <i className="icon-plus" /> Start Huddle
            </button>
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
                placeholder="Search by keywords..."
              />
              <div className="absolute top-1/2 start-3 -translate-y-1/2 pointer-events-none">
                <i className="icon-search text-gray-900" />
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex gap-4 justify-between items-center flex-wrap">
            {/* Date */}
            <PredefinedDatePicker/>
          </div>{" "}
          {/* end col */}
          {/* End grid */}
        </div>
        <div className="flex flex-col gap-6 mb-6">
          <div className="p-5 rounded-lg border border-border-color bg-white">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
                <span className="text-dark flex items-center justify-center shrink-0 text-[20px] w-[44px] h-[44px] border border-border-color rounded-lg bg-light">
                  <i className="icon icon-message-circle-warning" />
                </span>
                <div className="md:text-start text-center">
                  <h6 className="mb-1">Creative Review Board</h6>
                  <p>
                    Team collaboration space for reviewing ideas, sharing
                    feedback, and tracking updates.
                  </p>
                </div>
              </div>
              <div className="flex sm:justify-between justify-center items-center gap-2">
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-activity text-[12px]!" />
                  20
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-bell text-[12px]!" />
                  05
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-clock text-[12px]!" />
                  20m
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center items-center p-4 border border-border-color rounded-lg bg-light">
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="avatar-list-stacked">
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_27}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_28}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_29}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-white text-dark"
                      to="#"
                    >
                      {" "}
                      +4{" "}
                    </Link>
                  </div>
                  <span className="h-4 w-px bg-gray-200 ml-3.5" />
                  <p>05/07 Online</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                    Design
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-pink-50 text-pink border border-pink">
                    Review
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
                    Weekly
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
                  <button
                    type="button"
                    className="btn flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                  >
                    <i className="icon icon-video" />
                    Join
                  </button>
                  <div ref={menu1Ref} className="relative inline-flex">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu1("menu1");
                      }}
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="menu"
                      aria-expanded={isMenu1Open("menu1")}
                      aria-label="Dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </button>
                    {isMenu1Open("menu1") && (
                      <div
                        className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="p-2 space-y-1">
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-eye me-2" />
                            View Details
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center p-2 rounded-lg bg-white border border-border-color">
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-globe text-dark" />
                    Public
                  </Link>
                  <span className="h-4 w-px bg-gray-200" />
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-clock text-dark" />
                    Starts Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-lg border border-border-color bg-white">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
                <span className="text-dark flex items-center justify-center shrink-0 text-[20px] w-[44px] h-[44px] border border-border-color rounded-lg bg-light">
                  <i className="icon icon-notebook-pen" />
                </span>
                <div className="md:text-start text-center">
                  <h6 className="mb-1">Content Planning Workspace</h6>
                  <p>
                    Plan campaigns, brainstorm topics, and review content drafts
                    collaboratively.
                  </p>
                </div>
              </div>
              <div className="flex sm:justify-between justify-center items-center gap-2">
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-activity text-[12px]!" />
                  20
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-bell text-[12px]!" />
                  05
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-clock text-[12px]!" />
                  20m
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center items-center p-4 border border-border-color rounded-lg bg-light">
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="avatar-list-stacked">
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_01}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_02}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_03}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-white text-dark"
                      to="#"
                    >
                      {" "}
                      +2{" "}
                    </Link>
                  </div>
                  <span className="h-4 w-px bg-gray-200 ml-3.5" />
                  <p>04/08 Online</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="badge rounded-lg text-xs font-medium bg-cyan-50 text-cyan border border-cyan">
                    Content
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-indigo-50 text-indigo border border-indigo">
                    Marketing
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                    Calendar
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
                  <button
                    type="button"
                    className="btn flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                  >
                    <i className="icon icon-video" />
                    Join
                  </button>
                  <div ref={menu2Ref} className="relative inline-flex">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu2("menu2");
                      }}
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="menu"
                      aria-expanded={isMenu2Open("menu2")}
                      aria-label="Dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </button>
                    {isMenu2Open("menu2") && (
                      <div
                        className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="p-2 space-y-1">
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-eye me-2" />
                            View Details
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center p-2 rounded-lg bg-white border border-border-color">
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-globe text-dark" />
                    Internal
                  </Link>
                  <span className="h-4 w-px bg-gray-200" />
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-clock text-dark" />
                    Starts Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-lg border border-border-color bg-white">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
                <span className="text-dark flex items-center justify-center shrink-0 text-[20px] w-[44px] h-[44px] border border-border-color rounded-lg bg-light">
                  <i className="icon icon-users" />
                </span>
                <div className="md:text-start text-center">
                  <h6 className="mb-1">Client Collaboration Room</h6>
                  <p>
                    Work together on client requests, feedback, and shared
                    deliverables.
                  </p>
                </div>
              </div>
              <div className="flex sm:justify-between justify-center items-center gap-2">
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-activity text-[12px]!" />
                  20
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-bell text-[12px]!" />
                  05
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-clock text-[12px]!" />
                  20m
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center items-center p-4 border border-border-color rounded-lg bg-light">
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="avatar-list-stacked">
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_04}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_05}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_06}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-white text-dark"
                      to="#"
                    >
                      {" "}
                      +1{" "}
                    </Link>
                  </div>
                  <span className="h-4 w-px bg-gray-200 ml-3.5" />
                  <p>05/07 Online</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="badge rounded-lg text-xs font-medium bg-orange-50 text-orange border border-orange">
                    Client
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
                    Discussion
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-teal-50 text-teal border border-teal">
                    Tasks
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
                  <button
                    type="button"
                    className="btn flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                  >
                    <i className="icon icon-video" />
                    Join
                  </button>
                  <div ref={menu3Ref} className="relative inline-flex">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu3("menu3");
                      }}
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="menu"
                      aria-expanded={isMenu3Open("menu3")}
                      aria-label="Dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </button>
                    {isMenu3Open("menu3") && (
                      <div
                        className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="p-2 space-y-1">
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-eye me-2" />
                            View Details
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center p-2 rounded-lg bg-white border border-border-color">
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-globe text-dark" />
                    Public
                  </Link>
                  <span className="h-4 w-px bg-gray-200" />
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-clock text-dark" />
                    Starts Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-lg border border-border-color bg-white">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
                <span className="text-dark flex items-center justify-center shrink-0 text-[20px] w-[44px] h-[44px] border border-border-color rounded-lg bg-light">
                  <i className="icon icon-clipboard-pen" />
                </span>
                <div className="md:text-start text-center">
                  <h6 className="mb-1">Strategy Sync Hub</h6>
                  <p>
                    Team collaboration space for aligning goals, sharing
                    updates, and tracking decisions.
                  </p>
                </div>
              </div>
              <div className="flex sm:justify-between justify-center items-center gap-2">
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-activity text-[12px]!" />
                  20
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-bell text-[12px]!" />
                  05
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-clock text-[12px]!" />
                  20m
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center items-center p-4 border border-border-color rounded-lg bg-light">
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="avatar-list-stacked">
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_07}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_08}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_09}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-white text-dark"
                      to="#"
                    >
                      {" "}
                      +4{" "}
                    </Link>
                  </div>
                  <span className="h-4 w-px bg-gray-200 ml-3.5" />
                  <p>05/07 Online</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="badge rounded-lg text-xs font-medium bg-purple-50 text-purple border border-purple">
                    Strategy
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-pink-50 text-pink border border-pink">
                    Planning
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                    Monthly
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
                  <button
                    type="button"
                    className="btn flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                  >
                    <i className="icon icon-video" />
                    Join
                  </button>
                  <div ref={menu4Ref} className="relative inline-flex">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu4("menu4");
                      }}
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="menu"
                      aria-expanded={isMenu4Open("menu4")}
                      aria-label="Dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </button>
                    {isMenu4Open("menu4") && (
                      <div
                        className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="p-2 space-y-1">
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-eye me-2" />
                            View Details
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center p-2 rounded-lg bg-white border border-border-color">
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-globe text-dark" />
                    Public
                  </Link>
                  <span className="h-4 w-px bg-gray-200" />
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-clock text-dark" />
                    Starts Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-lg border border-border-color bg-white">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
                <span className="text-dark flex items-center justify-center shrink-0 text-[20px] w-[44px] h-[44px] border border-border-color rounded-lg bg-light">
                  <i className="icon icon-user-round-pen" />
                </span>
                <div className="md:text-start text-center">
                  <h6 className="mb-1">Product Feedback Room</h6>
                  <p>
                    A shared space to review feature ideas, collect feedback,
                    and follow improvements.
                  </p>
                </div>
              </div>
              <div className="flex sm:justify-between justify-center items-center gap-2">
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-activity text-[12px]!" />
                  20
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-bell text-[12px]!" />
                  05
                </p>
                <p className="badge border flex items-center gap-1 border-border-color rounded-lg bg-light text-dark font-medium">
                  <i className="icon icon-clock text-[12px]!" />
                  20m
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center items-center p-4 border border-border-color rounded-lg bg-light">
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <div className="avatar-list-stacked">
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_10}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_11}
                      alt="img"
                    />
                    <img
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_12}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1 transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-white text-dark"
                      to="#"
                    >
                      {" "}
                      +2{" "}
                    </Link>
                  </div>
                  <span className="h-4 w-px bg-gray-200 ml-3.5" />
                  <p>05/07 Online</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                    Feedback
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
                    Product
                  </span>
                  <span className="badge rounded-lg text-xs font-medium bg-cyan-50 text-cyan border border-cyan">
                    Sprint
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-end gap-2 mb-4">
                  <button
                    type="button"
                    className="btn flex items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-primary border border-primary text-white text-center hover:bg-primary-800 hover:border-primary-800 hover:text-white"
                  >
                    <i className="icon icon-video" />
                    Join
                  </button>
                  <div ref={menu5Ref} className="relative inline-flex">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu5("menu5");
                      }}
                      className="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                      aria-haspopup="menu"
                      aria-expanded={isMenu5Open("menu5")}
                      aria-label="Dropdown"
                    >
                      <i className="icon-ellipsis-vertical" />
                    </button>
                    {isMenu5Open("menu5") && (
                      <div
                        className="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="p-2 space-y-1">
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-eye me-2" />
                            View Details
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-pencil-line me-2" />
                            Edit
                          </Link>
                          <Link
                            className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                            to="#"
                          >
                            <i className="icon-trash-2 me-2" />
                            Delete
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-center p-2 rounded-lg bg-white border border-border-color">
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-globe text-dark" />
                    Public
                  </Link>
                  <span className="h-4 w-px bg-gray-200" />
                  <Link
                    to="#"
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    <i className="icon icon-clock text-dark" />
                    Starts Now
                  </Link>
                </div>
              </div>
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
      <>
        {/* Add Card Key Start */}
        <div
          id="start-collaboration"
          className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
          role="dialog"
          tabIndex={-1}
        >
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-[500px] w-full mx-auto">
              <div className="flex flex-col bg-white border p-6 border-border-color rounded-lg pointer-events-auto m-5">
                <div className="flex justify-between items-center mb-5 pb-5 border-b border-border-color ">
                  <h2 className="text-xl max-lg:text-lg">
                    Start New Collaboration
                  </h2>
                  <button
                    type="button"
                    className="size-7 inline-flex justify-center items-center rounded-full border border-border-color bg-white text-gray-900 text-base hover:bg-danger hover:border-danger hover:text-white dark:hover:text-dark focus:outline-hidden focus:bg-danger cursor-pointer"
                    aria-label="Close"
                    data-hs-overlay="#start-collaboration"
                  >
                    <i className="icon-x" />
                  </button>
                </div>
                <form>
                  {/* Start grid */}
                  <div className="grid md:grid-cols-12 gap-4 mb-5">
                    <div className="col-span-12">
                      <label
                        htmlFor="collaboration-name"
                        className="mb-1 block text-sm font-semibold text-dark"
                      >
                        Name <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="collaboration-name"
                          type="text"
                          className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        />
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="mb-1 block text-sm font-semibold text-dark">
                        Description
                      </div>
                      <textarea
                        className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-white border-border-color rounded-lg text-xs sm:text-sm focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                        rows={3}
                        placeholder=""
                        defaultValue={""}
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        Minimum 50 Characters Required
                      </p>
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                      <label
                        htmlFor="collaboration-type"
                        className="mb-1 block text-sm font-semibold text-dark"
                      >
                        Type <span className="text-danger">*</span>
                      </label>
                      <CommonSelect
                        options={Type} // optional
                        placeholder="Beginner" // optional // for screen readers
                        className="custom-select" // optional styling
                      />
                    </div>
                    <div className="sm:col-span-6 col-span-12">
                      <label
                        htmlFor="collaboration-max-participants"
                        className="mb-1 block text-sm font-semibold text-dark"
                      >
                        Max Participants <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="collaboration-max-participants"
                          type="text"
                          className="form-input text-dark bg-white block w-full border border-border-color rounded-lg focus:ring-0 focus:outline-none focus:border-border-color"
                        />
                      </div>
                    </div>
                    <div className="col-span-12">
                      <label
                        htmlFor="collaboration-date"
                        className="mb-1 block text-sm font-semibold text-dark"
                      >
                        Date <span className="text-danger">*</span>
                      </label>
                      <CommonDatePicker />
                    </div>
                  </div>
                  {/* End grid */}
                </form>
                <div className="flex justify-end items-center gap-x-2 pt-5 border-t border-border-color">
                  <button
                    type="button"
                    className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
                    data-hs-overlay="#add-card"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Start Collaboration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add Tenant End */}
      </>
    </>
  );
};

export default Collaborations;
