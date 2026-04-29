import { useEffect } from "react";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
const FileManager = () => {
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
            File Manager
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start Grid */}
  <div className="grid grid-cols-12 gap-5">
    <div className="xl:col-span-3 col-span-12 w-full">
      <div className="flex flex-col items-center p-5 mb-5 justify-center w-full min-h-[160px] border-2 border-dashed border-primary bg-primary-50 rounded-xl cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-50! transition">
        <span className="text-[24px]">
          <i className="icon-upload mb-2 text-dark" />{" "}
        </span>
        <p className="flex flex-col items-center justify-center text-dark">
          Drag &amp; drop a file or
          <span className="text-primary relative cursor-pointer inline-block">
            browse files
            <input
              type="file"
              className="absolute w-full h-full top-0 left-0 opacity-0 cursor-pointer"
              multiple
            />
          </span>
        </p>
        <input id="file-upload" type="file" className="hidden" />
      </div>
      <Link
        to="#"
        className="btn bg-primary mb-5 w-full border border-primary text-white text-center font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
      >
        <i className="icon-plus" /> Create New
      </Link>
      <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
        <div className="flex items-center flex-wrap mb-4 gap-3 p-3 border border-border-color rounded-lg bg-light">
          <ImageWithBasePath
            src={Images.avatar_02}
            className="rounded-full w-[40px]"
            alt="logo"
          />
          <div>
            <p className="text-dark font-semibold">Jack Michalak</p>
            <p className="text-xs">jack@example.com</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <Link
            to="#"
            className="px-3 py-2 w-full rounded-lg  font-medium flex items-center gap-2 hover:bg-gray-100 mb-1 dark:hover:text-dark"
          >
            <i className="icon-folder text-dark" /> All Folder / Files
          </Link>
          <Link
            to="#"
            className="px-3 py-2 w-full rounded-lg  font-medium flex items-center gap-2 hover:bg-gray-100 mb-1 dark:hover:text-dark"
          >
            <i className="icon-share-2 text-dark" />
            Shared with Me
          </Link>
          <Link
            to="#"
            className="px-3 py-2 w-full rounded-lg  font-medium flex items-center gap-2 hover:bg-gray-100 mb-1 dark:hover:text-dark"
          >
            <i className="icon-file-text text-dark" /> Document
          </Link>
          <Link
            to="#"
            className="px-3 py-2 w-full rounded-lg  font-medium flex items-center gap-2 hover:bg-gray-100 mb-1 dark:hover:text-dark"
          >
            <i className="icon-clock text-dark" /> Recent File
          </Link>
          <Link
            to="#"
            className="px-3 py-2 w-full rounded-lg  font-medium flex items-center gap-2 hover:bg-gray-100 mb-1 dark:hover:text-dark"
          >
            <i className="icon-star text-dark" /> Important
          </Link>
          <Link
            to="#"
            className="px-3 py-2 w-full rounded-lg  font-medium flex items-center gap-2 hover:bg-gray-100 mb-0 dark:hover:text-dark"
          >
            <i className="icon-music text-dark" /> Media
          </Link>
        </div>
      </div>
      <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
        <div className="flex items-center gap-2 mb-4.5">
          <span className="text-dark font-medium text-[24px] leading-none">
            <i className="icon-hard-drive" />
          </span>
          <p className="text-dark font-medium">Internal Storage</p>
        </div>
        <div className="bg-border-color w-full h-1.5 rounded-lg mb-2">
          <div
            className="rounded-lg h-1.5 bg-danger"
            style={{ width: "15%" }}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="whitespace-nowrap">154 Files</p>
          <p className=" text-gray-900 whitespace-nowrap">28GB / 300GB</p>
        </div>
      </div>
      <div className="border border-border-color rounded-lg bg-primary-gradient p-5">
        <p className="mb-2.5 text-white font-semibold">
          Upgrade your plan to more storage
        </p>
        <Link
          to={Path.pricing}
          className="btn bg-white w-full text-dark text-center font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-dark hover:border-gray-950! hover:text-white dark:hover:bg-primary transition dark:hover:text-primary"
        >
          <i className="icon-crown" /> Upgrade
        </Link>
      </div>
    </div>{" "}
    {/* end col */}
    <div className="xl:col-span-9 col-span-12 w-full">
      <h6 className="mb-4">Browse By Storage</h6>
      <div className="grid grid-cols-12 gap-4 mb-5">
        <div className="md:col-span-4 col-span-12 border border-border-color rounded-lg bg-white p-3">
          <div className="flex items-center justify-between gap-2 mb-4.5">
            <div className="flex items-center gap-2">
              <ImageWithBasePath
                className="w-[24px] h-[24px]"
                src={Images.dropbox_icon}
                alt="dropbox"
              />
              <p className="text-dark font-medium">Dropbox</p>
            </div>
            <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <i className="icon-ellipsis" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-2 space-y-1">
                  <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
              </div>
            </div>
          </div>
          <div className="bg-border-color w-full h-1.5 rounded-lg mb-2">
            <div
              className="rounded-lg h-1.5 bg-danger"
              style={{ width: "15%" }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>1454 Files</p>
            <p className=" text-gray-900">28GB / 300GB</p>
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 border border-border-color rounded-lg bg-white p-3">
          <div className="flex items-center justify-between gap-2 mb-4.5">
            <div className="flex items-center gap-2">
              <ImageWithBasePath
                className="w-[24px] h-[24px]"
                src={Images.gdrive_icon}
                alt="google-drive"
              />
              <p className="text-dark font-medium">Google Drive</p>
            </div>
            <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <i className="icon-ellipsis" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-2 space-y-1">
                  <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
              </div>
            </div>
          </div>
          <div className="bg-border-color w-full h-1.5 rounded-lg mb-2">
            <div
              className="rounded-lg h-1.5 bg-pink"
              style={{ width: "80%" }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>200 Files</p>
            <p className=" text-gray-900">24GB / 65GB</p>
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 border border-border-color rounded-lg bg-white p-3">
          <div className="flex items-center justify-between gap-2 mb-4.5">
            <div className="flex items-center gap-2">
              <ImageWithBasePath
                className="w-[24px] h-[24px]"
                src={Images.cloud_icon}
                alt="cloud"
              />
              <p className="text-dark font-medium">Cloud Storage</p>
            </div>
            <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
              <button
                type="button"
                className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                <i className="icon-ellipsis" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="p-2 space-y-1">
                  <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
              </div>
            </div>
          </div>
          <div className="bg-border-color w-full h-1.5 rounded-lg mb-2">
            <div
              className="rounded-lg h-1.5 bg-success"
              style={{ width: "95%" }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p>144 Files</p>
            <p className=" text-gray-900">54GB / 60GB</p>
          </div>
        </div>
      </div>
      <h6 className="mb-4">Browse By Categories</h6>
      <div className="grid grid-cols-12 gap-4 mb-5">
        <div className="md:col-span-4 col-span-12 border border-border-color rounded-lg relative bg-white p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <p className="text-dark font-semibold">Images</p>
            <div className="p-2 inline-flex border border-warning bg-warning-50 rounded-lg">
              <ImageWithBasePath src={Images.image_icon} alt="image" />
            </div>
          </div>
          <p className="mb-2">Shared with</p>
          <div className="flex items-center justify-between">
            <div className="avatar-list-stacked">
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_11}
                alt="user"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_12}
                alt="user"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_13}
                alt="user"
              />
              <Link
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                to="#"
              >
                {" "}
                +2{" "}
              </Link>
            </div>
            <span className="badge-small rounded-md text-xs font-medium bg-warning-50 text-warning border border-warning">
              {" "}
              2.50 GB
            </span>
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 border border-border-color rounded-lg relative bg-white p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <p className="text-dark font-semibold">Videos</p>
            <div className="p-2 inline-flex border border-orange bg-orange-50 rounded-lg">
              <ImageWithBasePath src={Images.videos_icon} alt="image" />
            </div>
          </div>
          <p className="mb-2">Shared with</p>
          <div className="flex items-center justify-between">
            <div className="avatar-list-stacked">
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_14}
                alt="user"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_15}
                alt="user"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_16}
                alt="user"
              />
              <Link
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                to="#"
              >
                {" "}
                +4{" "}
              </Link>
            </div>
            <span className="badge-small rounded-md text-xs font-medium bg-orange-50 text-orange border border-orange">
              {" "}
              2.50 GB
            </span>
          </div>
        </div>
        <div className="md:col-span-4 col-span-12 border border-border-color rounded-lg relative bg-white p-5">
          <div className="flex items-center justify-between gap-2 mb-4">
            <p className="text-dark font-semibold">Audios</p>
            <div className="p-2 inline-flex border border-pink bg-pink-50 rounded-lg">
              <ImageWithBasePath src={Images.audios_icon} alt="image" />
            </div>
          </div>
          <p className="mb-2">Shared with</p>
          <div className="flex items-center justify-between">
            <div className="avatar-list-stacked">
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_17}
                alt="user"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_18}
                alt="user"
              />
              <ImageWithBasePath
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                src={Images.avatar_19}
                alt="user"
              />
              <Link
                className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color text-[12px] bg-light text-dark"
                to="#"
              >
                {" "}
                +1{" "}
              </Link>
            </div>
            <span className="badge-small rounded-md text-xs font-medium bg-pink-50 text-pink border border-pink">
              {" "}
              2.50 GB
            </span>
          </div>
        </div>
      </div>
      <h6 className="mb-4">Recently Opened Files</h6>
      <div className="grid grid-cols-12 gap-4 mb-5">
        <div className="md:col-span-3 col-span-12 flex items-center gap-2 border border-border-color rounded-lg bg-white p-3">
          <div className="p-2 inline-flex border border-border-color bg-light rounded-lg">
            <ImageWithBasePath src={Images.pdf_icon} alt="image" />
          </div>
          <div>
            <p className="text-dark font-semibold mb-1">Reports</p>
            <p className="text-xs">2.4MB</p>
          </div>
        </div>
        <div className="md:col-span-3 col-span-12 flex items-center gap-2 border border-border-color rounded-lg bg-white p-3">
          <div className="p-2 inline-flex border border-border-color bg-light rounded-lg">
            <ImageWithBasePath src={Images.docs_icon} alt="image" />
          </div>
          <div>
            <p className="text-dark font-semibold mb-1">Plans</p>
            <p className="text-xs">1.2MB</p>
          </div>
        </div>
        <div className="md:col-span-3 col-span-12 flex items-center gap-2 border border-border-color rounded-lg bg-white p-3">
          <div className="p-2 inline-flex border border-border-color bg-light rounded-lg">
            <ImageWithBasePath src={Images.pdf_icon} alt="image" />
          </div>
          <div>
            <p className="text-dark font-semibold mb-1">Screenshots</p>
            <p className="text-xs">3.4MB</p>
          </div>
        </div>
        <div className="md:col-span-3 col-span-12 flex items-center gap-2 border border-border-color rounded-lg bg-white p-3">
          <div className="p-2 inline-flex border border-border-color bg-light rounded-lg">
            <ImageWithBasePath src={Images.docs_icon} alt="image" />
          </div>
          <div>
            <p className="text-dark font-semibold mb-1">Changes</p>
            <p className="text-xs">4.4MB</p>
          </div>
        </div>
      </div>
      <h6 className="mb-4">Files</h6>
      <div className="overflow-auto rounded-lg border border-border-color">
        <table className="table-auto mb-0 w-full">
          <thead className="border-b border-border-color">
            <tr>
              <th className="px-4 py-2 bg-light text-dark text-start whitespace-nowrap">
                File Name
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start whitespace-nowrap">
                Size
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start whitespace-nowrap">
                Type
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start whitespace-nowrap">
                Modified Date
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start whitespace-nowrap">
                Share with
              </th>
              <th className="px-4 py-2 bg-light text-dark text-start whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-border-color">
            <tr className="border-b border-border-color bg-white">
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <Link to="#" className="inline-flex items-center gap-2">
                  <div className="p-1.5 inline-flex shrink-0 w-[32px] h-[32px] border border-border-color bg-light rounded-lg">
                    <ImageWithBasePath src={Images.docs_icon} alt="image" />
                  </div>
                  <span className="text-dark">task.doc</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">2.5MB</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">Doc</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                22 Mar 2026
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="avatar-list-stacked">
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_11}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_12}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_13}
                    alt="user"
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
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:text-white hover:border-primary focus:outline-hidden focus:white dark:hover:text-dark"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 hidden"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                    data-placement="bottom-end"
                    style={{
                      transform: "translate3d(442.535px, 241.991px, 0px)"
                    }}
                  >
                    <div className="p-2 space-y-1">
                      <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-border-color bg-white">
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <Link to="#" className="inline-flex items-center gap-2">
                  <div className="p-1.5 inline-flex shrink-0 w-[32px] h-[32px] border border-border-color bg-light rounded-lg">
                    <ImageWithBasePath src={Images.pdf_icon} alt="image" />
                  </div>
                  <span className="text-dark">screenshots.pdf</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">5.6 MB</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">PDF</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                15 Mar 2026
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="avatar-list-stacked">
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_14}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_15}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_16}
                    alt="user"
                  />
                </div>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:text-white hover:border-primary focus:outline-hidden focus:white dark:hover:text-dark"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 hidden"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                    data-placement="bottom-end"
                    style={{
                      transform: "translate3d(442.535px, 241.991px, 0px)"
                    }}
                  >
                    <div className="p-2 space-y-1">
                      <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-border-color bg-white">
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <Link to="#" className="inline-flex items-center gap-2">
                  <div className="p-1.5 inline-flex shrink-0 w-[32px] h-[32px] border border-border-color bg-light rounded-lg">
                    <ImageWithBasePath src={Images.jpg_icon} alt="image" />
                  </div>
                  <span className="text-dark">user.jpg</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">8.2MB</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">Image</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                27 Jan 2026
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="avatar-list-stacked">
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_17}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_18}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_19}
                    alt="user"
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
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:text-white hover:border-primary focus:outline-hidden focus:white dark:hover:text-dark"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 hidden"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                    data-placement="bottom-end"
                    style={{
                      transform: "translate3d(442.535px, 241.991px, 0px)"
                    }}
                  >
                    <div className="p-2 space-y-1">
                      <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-border-color bg-white">
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <Link to="#" className="inline-flex items-center gap-2">
                  <div className="p-1.5 inline-flex shrink-0 w-[32px] h-[32px] border border-border-color bg-light rounded-lg">
                    <ImageWithBasePath src={Images.mp4_icon} alt="image" />
                  </div>
                  <span className="text-dark">introduction.mp4</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">10.5MB</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">Video</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                16 Jan 2026
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="avatar-list-stacked">
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_20}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_21}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_22}
                    alt="user"
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
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:text-white hover:border-primary focus:outline-hidden focus:white dark:hover:text-dark"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 hidden"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                    data-placement="bottom-end"
                    style={{
                      transform: "translate3d(442.535px, 241.991px, 0px)"
                    }}
                  >
                    <div className="p-2 space-y-1">
                      <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border-b border-border-color bg-white">
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <Link to="#" className="inline-flex items-center gap-2">
                  <div className="p-1.5 inline-flex shrink-0 w-[32px] h-[32px] border border-border-color bg-light rounded-lg">
                    <ImageWithBasePath src={Images.mp3_icon} alt="image" />
                  </div>
                  <span className="text-dark">sound.mp3</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">4.3MB</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">Audio</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                12 Jan 2026
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="avatar-list-stacked">
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_23}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_24}
                    alt="user"
                  />
                </div>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:text-white hover:border-primary focus:outline-hidden focus:white dark:hover:text-dark"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 hidden"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                    data-placement="bottom-end"
                    style={{
                      transform: "translate3d(442.535px, 241.991px, 0px)"
                    }}
                  >
                    <div className="p-2 space-y-1">
                      <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
                  </div>
                </div>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <Link to="#" className="inline-flex items-center gap-2">
                  <div className="p-1.5 inline-flex shrink-0 w-[32px] h-[32px] border border-border-color bg-light rounded-lg">
                    <ImageWithBasePath src={Images.mp3_icon} alt="image" />
                  </div>
                  <span className="text-dark">music.mp3</span>
                </Link>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">2.3MB</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">Audio</td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                13 Jan 2026
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="avatar-list-stacked">
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_18}
                    alt="user"
                  />
                  <ImageWithBasePath
                    className="w-6 h-6 inline-flex items-center justify-center font-medium hover:-translate-y-[0.188rem] hover:z-1  transition-transform duration-150 ease-in-out -me-3.5 align-middle rounded-full border border-border-color"
                    src={Images.avatar_20}
                    alt="user"
                  />
                </div>
              </td>
              <td className="px-4 py-3 text-start whitespace-nowrap">
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-primary transition hover:text-white hover:border-primary focus:outline-hidden focus:white dark:hover:text-dark"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    <i className="icon-ellipsis-vertical" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1 hidden"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                    data-placement="bottom-end"
                    style={{
                      transform: "translate3d(442.535px, 241.991px, 0px)"
                    }}
                  >
                    <div className="p-2 space-y-1">
                      <Link to="#" className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white">
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
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
</div>

  )
}

export default FileManager