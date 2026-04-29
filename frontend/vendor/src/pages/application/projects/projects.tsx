import { useEffect } from 'react';
import ImageWithBasePath from '../../../components/image-with-base-path'
import { Images } from '../../../utils/imagePath'
import ProjectModal from './projectModal'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { DropdownMenu } from '../../../components/dropdown-menu/dropdownMenu';
const Projects = () => {
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
            Projects
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
        aria-controls="add-project"
        data-hs-overlay="#add-project"
      >
        <i className="icon-plus" /> New Project
      </button>
    </div>
  </div>
  {/* /Breadcrumb */}
  <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Smart Agent Hub
            </Link>
          </h6>
          <div className="text-primary font-medium">Automation</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-info-50 text-info border border-info">
                    {" "}
                    Inprogress
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">15 Jan 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_27}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_28}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_29}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +2{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-orange-50 text-orange border border-orange">
                      {" "}
                      Agent Flow
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      AI Core
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              AI Agent Dashboard
            </Link>
          </h6>
          <div className="text-primary font-medium">Saas</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-success-50 text-success border border-success">
                    {" "}
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">20 Jan 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_01}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_02}
                      alt="img"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-cyan-50 text-cyan border border-cyan">
                      {" "}
                      UI Design
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      Agents
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Predictive Care Assistant
            </Link>
          </h6>
          <div className="text-primary font-medium">Healthcare</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-info-50 text-info border border-info">
                    {" "}
                    Inprogress
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">03 Feb 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_03}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_04}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_05}
                      alt="img"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-teal-50 text-teal border border-teal">
                      {" "}
                      Health Data
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-info-50 text-info border border-info">
                      {" "}
                      Insights
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              AI Hiring Assistant
            </Link>
          </h6>
          <div className="text-primary font-medium">HR Tech</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-warning-50 text-warning border border-warning">
                    {" "}
                    On Hold
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">10 Feb 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_27}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_28}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_29}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +8{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-purple-50 text-purple border border-purple">
                      {" "}
                      Recruitment
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      Automation
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Campaign Intelligence Tool
            </Link>
          </h6>
          <div className="text-primary font-medium">Marketing</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-info-50 text-info border border-info">
                    {" "}
                    Inprogress
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">24 Feb 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_27}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_28}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                     src={Images.avatar_29}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +8{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      Analytics
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-info-50 text-info border border-info">
                      {" "}
                      Performance
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Smart Trip Planner
            </Link>
          </h6>
          <div className="text-primary font-medium">Travel Tech</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-purple-50 text-purple border border-purple">
                    {" "}
                    To Do
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">15 Jan 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                     <ImageWithBasePath
                                  src={Images.avatar_12}
                                  alt="img"
                                  className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                                />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_13}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_14}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +8{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-orange-50 text-orange border border-orange">
                      {" "}
                      Personalization
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      AI Core
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Property Valuation Agent
            </Link>
          </h6>
          <div className="text-primary font-medium">Real Estate</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-purple-50 text-purple border border-purple">
                    {" "}
                    To Do
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">15 Jan 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_15}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_16}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_17}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +8{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-cyan-50 text-cyan border border-cyan">
                      {" "}
                      Pricing
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      AI Models
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Lead Scoring Engine
            </Link>
          </h6>
          <div className="text-primary font-medium">Marketing</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-purple-50 text-purple border border-purple">
                    {" "}
                    To Do
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">15 Jan 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_27}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_28}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_29}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +8{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-orange-50 text-orange border border-orange">
                      {" "}
                      CRM
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      Analytics
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
        </button>
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
        <div>
          <h6 className="mb-1 font-bold">
            <Link to="#" className="text-dark hover:text-primary">
              Smart Task Prioritizer
            </Link>
          </h6>
          <div className="text-primary font-medium">Productivity</div>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-project"
                data-hs-overlay="#edit-project"
              >
                <i className="icon-pencil-line me-2" />
                Edit
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
              >
                <i className="icon-trash-2 me-2" />
                Delete
              </Link>
            </div>
        </DropdownMenu>
      </div>
      <div className="border-b border-border-color mb-5 pb-5">
        <div className="overflow-auto ">
          <table className="table-auto mb-0 w-full whitespace-nowrap">
            <tbody>
              <tr>
                <td className="pb-4 text-start">Status</td>
                <td className="pb-4 text-start">
                  <span className="badge-small rounded-md text-xs font-medium bg-info-50 text-info border border-info">
                    {" "}
                    Inprogress
                  </span>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Deadline</td>
                <td className="pb-4 text-start">
                  <p className="text-dark font-medium">15 Jan 2026</p>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-start">Assignees</td>
                <td className="pb-4 text-start">
                  <div className="avatar-list-stacked">
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_01}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                      src={Images.avatar_02}
                      alt="img"
                    />
                    <ImageWithBasePath
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                     src={Images.avatar_03}
                      alt="img"
                    />
                    <Link
                      className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                      to="#"
                    >
                      {" "}
                      +8{" "}
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-start">Labels</td>
                <td className="text-start">
                  <span className="flex items-center gap-1">
                    <span className="badge-small rounded-full text-xs font-medium bg-orange-50 text-orange border border-orange">
                      {" "}
                      Agent Flow
                    </span>
                    <span className="badge-small rounded-full text-xs font-medium bg-pink-50 text-pink border border-pink">
                      {" "}
                      AI Core
                    </span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <i className="icon icon-message-square-text" />
            06
          </span>
          <span className="flex items-center gap-2">
            <i className="icon icon-link" />
            03
          </span>
        </div>
        <button
          type="button"
          className="btn bg-light text-dark font-semibold text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary-800 hover:border-primary-800 hover:text-white"
        >
          <i className="icon-check-check font-normal" /> Mark as complete
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
      Load More
    </Link>
  </div>
</div>
<ProjectModal/>
</>

  )
}

export default Projects