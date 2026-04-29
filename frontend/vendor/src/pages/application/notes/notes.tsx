
import { useEffect } from 'react';
import ImageWithBasePath from '../../../components/image-with-base-path'
import { Images } from '../../../utils/imagePath'
import NotesModal from './notesModal';
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { DropdownMenu } from '../../../components/dropdown-menu/dropdownMenu';
const Notes = () => {
    useEffect(() => {
        window.HSStaticMethods?.autoInit();
      }, []);
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
            Notes
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
        aria-controls="add-note"
        data-hs-overlay="#add-note"
      >
        <i className="icon-plus" /> New Note
      </button>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid xxl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mb-6">
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Smart Agent Hub</p>
          <h6 className="font-bold">Agent Training Update</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        Model accuracy improved after dataset cleanup and feature normalization.
        Initial tests show more stable outputs.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">AI Agent Dashboard</p>
          <h6 className="font-bold">Workflow Optimization</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        Several redundant steps were identified in the agent execution flow.
        Simplifying these actions should reduce processing time.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">17 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Smart Support Bot</p>
          <h6 className="font-bold">Response Quality Improvement</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        Refined prompt structure and context limits resulted in clearer &amp;
        more relevant customer responses across multiple test scenarios.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
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
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_06}
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Automation Hub</p>
          <h6 className="font-bold">Agent Flow Update</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        New trigger-based automation rules were introduced to improve task
        sequencing and reduce manual intervention across workflows.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_07}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_08}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_09}
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Analytics Engine</p>
          <h6 className="font-bold">User Behavior Insight</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        Usage data shows that most users spend more time on the dashboard,
        indicating a need for quicker access to key metrics.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_10}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_11}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_12}
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Security Monitor</p>
          <h6 className="font-bold">Access Token Review</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        A review of API keys and access tokens is required to maintain security
        compliance before the next scheduled release.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
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
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_15}
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Prompt Studio</p>
          <h6 className="font-bold">Prompt Consistency Check</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        Shorter system prompts with clearer instructions are producing more
        consistent and predictable agent behavior during testing.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
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
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_18}
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Performance Tracker</p>
          <h6 className="font-bold">Latency Observation</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        Minor latency spikes were observed when multiple agents run
        simultaneously, suggest the need for improved resource allocation.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_19}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_20}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_21}
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
      </div>
    </div>
    {/* Project Card 1 */}
    <div className="bg-white border border-border-color rounded-lg p-5 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="mb-1 font-medium">Deployment Pipeline</p>
          <h6 className="font-bold">Staging Environment Ready</h6>
        </div>
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
            <div className="p-2 space-y-1">
              <Link
                to="#"
                className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="view-note"
                data-hs-overlay="#view-note"
              >
                <i className="icon-eye me-2" />
                View Details
              </Link>
              <Link
                className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                to="#"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="add-note"
                data-hs-overlay="#edit-note"
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
      <p className="mb-4">
        The staging environment has passed all basic tests and is ready for
        final validation before production deployment.
      </p>
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[16px]">
          <i className="icon icon-calendar-fold text-dark" />
          <span className="text-sm">20 Feb 2026</span>
        </span>
        <div className="avatar-list-stacked mr-4">
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_22}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_23}
            alt="img"
          />
          <ImageWithBasePath
            className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
            src={Images.avatar_24}
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
      </div>
    </div>
  </div>
  {/* End grid */}
  <div className="text-center">
    <Link
      to="#"
      className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
    >
      <i className="icon-loader" />
      Load More
    </Link>
  </div>{" "}
  {/* end grid */}
  <NotesModal/>
</div>

  )
}

export default Notes