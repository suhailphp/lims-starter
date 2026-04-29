import { useEffect, useState } from 'react'
import { Images } from '../../../utils/imagePath'
import ImageWithBasePath from '../../../components/image-with-base-path'
import TodoModals from './todoModals';
import { Link } from "react-router-dom";
import { Path } from '../../../routes/path';
import { DropdownMenu } from '../../../components/dropdown-menu/dropdownMenu';
const Todo = () => {
    useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  const [checked, setChecked] = useState<{ [key: number]: boolean }>({2: true, 6: true, 10: true, 14: true});
  const handleCheck = (id: number) => {
  setChecked((prev) => ({
    ...prev,
    [id]: !prev[id]
  }));
};
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
          <li aria-current="page" className=" text-gray-900">
            To Do List
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center gap-3">
      <DropdownMenu
            trigger={
              <>
                <i className="icon-arrow-down-to-line"></i>Export
              </>
            }
            triggerClassName="cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary focus:border-primary focus:text-white focus:outline-hidden"
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
          </DropdownMenu>
      <button
        type="button"
        className="btn bg-primary border border-primary text-white text-center flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="add-task"
        data-hs-overlay="#add-task"
      >
        <i className="icon-plus" /> New Task
      </button>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="hs-tab-content">
    <div className="grid grid-cols-12">
      <div className="col-span-12 xl:col-span-8 xl:col-start-3">
        <div className="bg-white shadow rounded-md p-5 border border-border-color">
          <div className="hs-accordion-group">
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-border-color">
              <h5>To Do List</h5>
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-1">
                  <i className="icon-circle-check text-success" /> 05/16
                </p>
                <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary hover:border-primary transition hover:text-white dark:hover:text-dark! hover:border-primary flex items-center justify-center cursor-pointer">
                  <i className="icon-refresh-ccw" />
                </button>
              </div>
            </div>
            <div className="border border-border-color rounded-lg bg-light mb-3">
              <div className={`flex justify-between sm:flex-row flex-col todo-item items-start gap-3 px-4 sm:px-5 py-4 ${checked[1]?"todo-strike":""}`}>
                <div className="flex gap-2">
                  <input
                    id="todo-item-1"
                    type="checkbox"
                    checked={checked[1] || false}
                    onChange={() => handleCheck(1)}
                    className="h-5 w-5 mt-[2px] rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                  />
                  <label htmlFor="todo-item-1" className="sr-only">
                    Draft Weekly Content Plan
                  </label>
                  <div className="flex flex-wrap items-center gap-2 mb-0">
                    <div className="hs-accordion relative active">
                      <div className="flex items-center flex-wrap gap-2 pe-6">
                        <h6 className="font-medium text-dark strike-info">
                          Draft Weekly Content Plan
                        </h6>
                        <button
                          type="button"
                          className="cursor-pointer"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="edit-task"
                          data-hs-overlay="#edit-task"
                        >
                          <i className="icon-pencil-line" />
                        </button>
                      </div>
                      <p className="mb-2">
                        Outline topics, key points, and publishing schedule for
                        the week.
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <i className="icon-git-branch" /> 3 tasks
                        </span>
                        <span className="bg-gray-600 w-[5px] h-[5px] block rounded-full me-1" />
                        <span className="inline-flex items-center badge-small rounded-lg text-xs font-medium bg-orange-50 text-orange border border-orange">
                          Content
                        </span>
                      </div>
                      <button
                        className="hs-accordion-toggle absolute top-[-2px] right-0 cursor-pointer text-[18px]"
                        aria-expanded="false"
                        aria-controls="todo-1"
                      >
                        <span className="hs-accordion-active:hidden block size-4 ms-auto">
                          <i className="icon icon-chevron-down" />
                        </span>
                        <span className="hs-accordion-active:block hidden size-4 ms-auto">
                          <i className="icon icon-chevron-up" />
                        </span>
                      </button>
                      <div
                        id="todo-1"
                        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                      >
                        <div className="text-sm">
                          <div className={`${checked[2] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2 mt-5">
                              <input
                                id="todo-item-1-sub-1"
                                type="checkbox"
                                checked={checked[2] || false}
                                onChange={() => handleCheck(2)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-1-sub-1"
                                className="sr-only"
                              >
                                Check Dribbble &amp; Behance trends
                              </label>
                              <p className="strike-info">
                                Check Dribbble &amp; Behance trends
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[3]?'todo-strike todo-strike-content':''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2">
                              <input
                                id="todo-item-1-sub-2"
                                type="checkbox"
                                checked={checked[3] || false}
    onChange={() => handleCheck(3)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-1-sub-2"
                                className="sr-only"
                              >
                                Note reusable layout patterns
                              </label>
                              <p className="strike-info">
                                Note reusable layout patterns
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[4]?'todo-strike todo-strike-content':''}`}>
                            <div className="todo-inbox-check flex items-center gap-2">
                              <input
                                id="todo-item-1-sub-3"
                                type="checkbox"
                                checked={checked[4] || false}
                    onChange={() => handleCheck(4)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-1-sub-3"
                                className="sr-only"
                              >
                                Shortlist ideas for testing
                              </label>
                              <p className="strike-info">
                                Shortlist ideas for testing
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImageWithBasePath
                    src={Images.avatar_01}
                    className="w-5 h-5 border border-border-color rounded-full"
                    alt="user"
                  />
                  <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
                    <span className="bg-danger w-[5px] h-[5px] block rounded-full me-1" />
                    High
                  </span>
                </div>
              </div>
            </div>
            <div className="border border-border-color rounded-lg bg-light mb-3">
              <div className={`flex justify-between sm:flex-row flex-col todo-item items-start gap-3 px-4 sm:px-5 py-4 ${checked[5]?'todo-strike':''}`}>
                <div className="flex gap-2">
                  <input
                    id="todo-item-2"
                    type="checkbox"
                    checked={checked[5] || false}
                    onChange={() => handleCheck(5)}
                    className="h-5 w-5 mt-[2px] rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                  />
                  <label htmlFor="todo-item-2" className="sr-only">
                    Explore New UI Design
                  </label>
                  <div className="flex flex-wrap items-center gap-2 mb-0">
                    <div className="hs-accordion relative">
                      <div className="flex items-center gap-2 pe-6">
                        <h6 className="font-medium text-dark strike-info">
                          Explore New UI Design
                        </h6>
                        <button
                          type="button"
                          className="cursor-pointer"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="edit-task"
                          data-hs-overlay="#edit-task"
                        >
                          <i className="icon-pencil-line" />
                        </button>
                      </div>
                      <p className="mb-2">
                        Research modern design patterns and save inspiration for
                        future use.
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <i className="icon-git-branch" /> 3 tasks
                        </span>
                        <span className="bg-gray-600 w-[5px] h-[5px] block rounded-full me-1" />
                        <span className="inline-flex items-center badge-small rounded-lg text-xs font-medium bg-pink-50 text-pink border border-pink">
                          Design
                        </span>
                      </div>
                      <button
                        className="hs-accordion-toggle absolute top-[-2px] right-0 cursor-pointer text-[18px]"
                        aria-expanded="false"
                        aria-controls="todo-2"
                      >
                        <span className="hs-accordion-active:hidden block size-4 ms-auto">
                          <i className="icon icon-chevron-down" />
                        </span>
                        <span className="hs-accordion-active:block hidden size-4 ms-auto">
                          <i className="icon icon-chevron-up" />
                        </span>
                      </button>
                      <div
                        id="todo-2"
                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                      >
                        <div className="text-sm">
                          <div>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2 mt-5">
                              <input
                                id="todo-item-2-sub-1"
                                type="checkbox"
                                checked={checked[6] || false}
                                onChange={() => handleCheck(6)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-2-sub-1"
                                className="sr-only"
                              >
                                Check Dribbble &amp; Behance trends
                              </label>
                              <p className="strike-info">
                                Check Dribbble &amp; Behance trends
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[7] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2">
                              <input
                                id="todo-item-2-sub-2"
                                type="checkbox"
                                checked={checked[7] || false}
                                onChange={() => handleCheck(7)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-2-sub-2"
                                className="sr-only"
                              >
                                Note reusable layout patterns
                              </label>
                              <p className="strike-info">
                                Note reusable layout patterns
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[8] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2">
                              <input
                                id="todo-item-2-sub-3"
                                type="checkbox"
                                checked={checked[8] || false}
                                onChange={() => handleCheck(8)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-2-sub-3"
                                className="sr-only"
                              >
                                Shortlist ideas for testing
                              </label>
                              <p className="strike-info">
                                Shortlist ideas for testing
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImageWithBasePath
                    src={Images.avatar_02}
                    className="w-5 h-5 border border-border-color rounded-full"
                    alt="user"
                  />
                  <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                    <span className="bg-warning w-[5px] h-[5px] block rounded-full me-1" />
                    Medium
                  </span>
                </div>
              </div>
            </div>
            <div className="border border-border-color rounded-lg bg-light mb-3">
              <div className={`flex justify-between sm:flex-row flex-col todo-item items-start gap-3 px-4 sm:px-5 py-4 ${checked[9] ? 'todo-strike' : ''}`}>
                <div className="flex gap-2">
                  <input
                    id="todo-item-3"
                    type="checkbox"
                    checked={checked[9] || false}
                    onChange={() => handleCheck(9)}
                    className="h-5 w-5 mt-[2px] rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                  />
                  <label htmlFor="todo-item-3" className="sr-only">
                    Review 2026 Design Inspirations
                  </label>
                  <div className="flex flex-wrap items-center gap-2 mb-0">
                    <div className="hs-accordion relative">
                      <div className="flex items-center gap-2 pe-6">
                        <h6 className="font-medium text-dark strike-info">
                          Review 2026 Design Inspirations
                        </h6>
                        <button
                          type="button"
                          className="cursor-pointer"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="edit-task"
                          data-hs-overlay="#edit-task"
                        >
                          <i className="icon-pencil-line" />
                        </button>
                      </div>
                      <p className="mb-2">
                        Analyze upcoming web design trends focusing on usability
                        and AI-driven layouts.
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <i className="icon-git-branch" /> 3 tasks
                        </span>
                        <span className="bg-gray-600 w-[5px] h-[5px] block rounded-full me-1" />
                        <span className="inline-flex items-center badge-small rounded-lg text-xs font-medium bg-info-50 text-info border border-info">
                          Content
                        </span>
                      </div>
                      <button
                        className="hs-accordion-toggle absolute top-[-2px] right-0 cursor-pointer text-[18px]"
                        aria-expanded="false"
                        aria-controls="todo-3"
                      >
                        <span className="hs-accordion-active:hidden block size-4 ms-auto">
                          <i className="icon icon-chevron-down" />
                        </span>
                        <span className="hs-accordion-active:block hidden size-4 ms-auto">
                          <i className="icon icon-chevron-up" />
                        </span>
                      </button>
                      <div
                        id="todo-3"
                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                      >
                        <div className="text-sm">
                          <div className={`${checked[10] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2 mt-5">
                              <input
                                id="todo-item-3-sub-1"
                                type="checkbox"
                                checked={checked[10] || false}
                                onChange={() => handleCheck(10)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-3-sub-1"
                                className="sr-only"
                              >
                                Check Dribbble &amp; Behance trends
                              </label>
                              <p className="strike-info">
                                Check Dribbble &amp; Behance trends
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[11] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2">
                              <input
                                id="todo-item-3-sub-2"
                                type="checkbox"
                                checked={checked[11] || false}
                                onChange={() => handleCheck(11)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-3-sub-2"
                                className="sr-only"
                              >
                                Note reusable layout patterns
                              </label>
                              <p className="strike-info">
                                Note reusable layout patterns
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[12] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2">
                              <input
                                id="todo-item-3-sub-3"
                                type="checkbox"
                                checked={checked[12] || false}
                                onChange={() => handleCheck(12)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-3-sub-3"
                                className="sr-only"
                              >
                                Shortlist ideas for testing
                              </label>
                              <p className="strike-info">
                                Shortlist ideas for testing
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImageWithBasePath
                    src={Images.avatar_03}
                    className="w-5 h-5 border border-border-color rounded-full"
                    alt="user"
                  />
                  <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
                    <span className="bg-danger w-[5px] h-[5px] block rounded-full me-1" />
                    High
                  </span>
                </div>
              </div>
            </div>
            <div className="border border-border-color rounded-lg bg-light mb-0">
              <div className={`flex justify-between sm:flex-row flex-col todo-item items-start gap-3 px-4 sm:px-5 py-4 ${checked[13] ? 'todo-strike' : ''}`}>
                <div className="flex gap-2">
                  <input
                    id="todo-item-4"
                    type="checkbox"
                    checked={checked[13] || false}
                    onChange={() => handleCheck(13)}
                    className="h-5 w-5 mt-[2px] rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                  />
                  <label htmlFor="todo-item-4" className="sr-only">
                    Reset Daily Routine
                  </label>
                  <div className="flex flex-wrap items-center gap-2 mb-0">
                    <div className="hs-accordion relative">
                      <div className="flex items-center gap-2 pe-6">
                        <h6 className="font-medium text-dark strike-info">
                          Reset Daily Routine
                        </h6>
                        <button
                          type="button"
                          className="cursor-pointer"
                          aria-haspopup="dialog"
                          aria-expanded="false"
                          aria-controls="edit-task"
                          data-hs-overlay="#edit-task"
                        >
                          <i className="icon-pencil-line" />
                        </button>
                      </div>
                      <p className="mb-2">
                        Optimize daily habits to improve productivity and focus.
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1">
                          <i className="icon-git-branch" /> 3 tasks
                        </span>
                        <span className="bg-gray-600 w-[5px] h-[5px] block rounded-full me-1" />
                        <span className="inline-flex items-center badge-small rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                          Habits
                        </span>
                      </div>
                      <button
                        className="hs-accordion-toggle absolute top-[-2px] right-0 cursor-pointer text-[18px]"
                        aria-expanded="false"
                        aria-controls="todo-4"
                      >
                        <span className="hs-accordion-active:hidden block size-4 ms-auto">
                          <i className="icon icon-chevron-down" />
                        </span>
                        <span className="hs-accordion-active:block hidden size-4 ms-auto">
                          <i className="icon icon-chevron-up" />
                        </span>
                      </button>
                      <div
                        id="todo-4"
                        className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                      >
                        <div className="text-sm">
                          <div className={`${checked[14] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2 mt-5">
                              <input
                                id="todo-item-4-sub-1"
                                type="checkbox"
                                checked={checked[14] || false}
                                onChange={() => handleCheck(14)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-4-sub-1"
                                className="sr-only"
                              >
                                Check Dribbble &amp; Behance trends
                              </label>
                              <p className="strike-info">
                                Check Dribbble &amp; Behance trends
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[15] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2 mb-2">
                              <input
                                id="todo-item-4-sub-2"
                                type="checkbox"
                                checked={checked[15] || false}
                                onChange={() => handleCheck(15)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-4-sub-2"
                                className="sr-only"
                              >
                                Note reusable layout patterns
                              </label>
                              <p className="strike-info">
                                Note reusable layout patterns
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                          <div className={`${checked[16] ? 'todo-strike todo-strike-content' : ''}`}>
                            <div className="todo-inbox-check flex items-center gap-2">
                              <input
                                id="todo-item-4-sub-3"
                                type="checkbox"
                                checked={checked[16] || false}
                                onChange={() => handleCheck(16)}
                                className="h-5 w-5 rounded border-border-color text-primary focus:ring-0 focus-visible:outline-none focus:ring-offset-0"
                              />
                              <label
                                htmlFor="todo-item-4-sub-3"
                                className="sr-only"
                              >
                                Shortlist ideas for testing
                              </label>
                              <p className="strike-info">
                                Shortlist ideas for testing
                              </p>
                              <button
                                type="button"
                                className="cursor-pointer"
                                aria-haspopup="dialog"
                                aria-expanded="false"
                                aria-controls="edit-task"
                                data-hs-overlay="#edit-task"
                              >
                                <i className="icon-pencil-line" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ImageWithBasePath
                    src={Images.avatar_04}
                    className="w-5 h-5 border border-border-color rounded-full"
                    alt="user"
                  />
                  <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                    <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End grid */}
  <TodoModals/>
</div>

  )
}

export default Todo