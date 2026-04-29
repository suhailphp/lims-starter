import { useEffect } from "react";
import type { ColumnType } from "../../../types/types";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import CommonDataTable from "../../../components/data-table/dataTable";
import UserModal from "./userModal";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const Users = () => {
  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  const data = [
    {
      id: "#USR0016",
      name: "Green Core AI",
      email: "marilyn@example.com",
      role: "Admin",
      createdDate: "22 Mar 2026",
      status: "Active",
      avatar: Images.avatar_01,
    },
    {
      id: "#USR0015",
      name: "Stephen Cardenas",
      email: "stephen@example.com",
      role: "Agent Manager",
      createdDate: "15 Mar 2026",
      status: "Active",
      avatar: Images.avatar_02,
    },
    {
      id: "#USR0014",
      name: "Connie Watts",
      email: "connie@example.com",
      role: "Viewer",
      createdDate: "08 Mar 2026",
      status: "Active",
      avatar: Images.avatar_01,
    },
    {
      id: "#USR0013",
      name: "Shirley Nash",
      email: "shirley@example.com",
      role: "Agent Trainer",
      createdDate: "02 Mar 2026",
      status: "Active",
      avatar: Images.avatar_02,
    },
    {
      id: "#USR0012",
      name: "Richard Mount",
      email: "richard@example.com",
      role: "Agent Manager",
      createdDate: "26 Feb 2026",
      status: "Active",
      avatar: Images.avatar_03,
    },
    {
      id: "#USR0011",
      name: "Barbara Harty",
      email: "barbara@example.com",
      role: "Viewer",
      createdDate: "22 Feb 2026",
      status: "Active",
      avatar: Images.avatar_04,
    },
    {
      id: "#USR0010",
      name: "William Warner",
      email: "william@example.com",
      role: "Agent Trainer",
      createdDate: "07 Feb 2026",
      status: "Active",
      avatar: Images.avatar_05,
    },
    {
      id: "#USR0009",
      name: "Elizabeth Lawson",
      email: "elizabeth@example.com",
      role: "Agent Manager",
      createdDate: "27 Jan 2026",
      status: "Active",
      avatar: Images.avatar_06,
    },
    {
      id: "#USR0008",
      name: "Joseph Franco",
      email: "joseph@example.com",
      role: "Agent Trainer",
      createdDate: "16 Jan 2026",
      status: "Active",
      avatar: Images.avatar_07,
    },
    {
      id: "#USR0007",
      name: "Leisa Lynch",
      email: "leisa@example.com",
      role: "Viewer",
      createdDate: "12 Jan 2026",
      status: "Active",
      avatar: Images.avatar_08,
    },
  ];
  const columns: ColumnType[] = [
    {
      field: "id",
      header: "User ID",
      sortable: true,
      body: (row) => (
        <Link
          to="#"
          className="inline-block hover:text-primary hover:underline"
        >
          {row.id}
        </Link>
      ),
    },
    {
      field: "name",
      header: "User Name",
      body: (row) => (
        <div className="flex items-center gap-2">
          <span className="flex shrink-0">
            <ImageWithBasePath
              src={row.avatar}
              className="w-8 h-8 border border-border-color rounded-full"
              alt="avatar"
            />
          </span>
          <p className="text-dark font-medium">{row.name}</p>
        </div>
      ),
    },
    { field: "email", header: "Email" },
    {
      field: "role",
      header: "Role",
      body: (row) => (
        <span
          className={`inline-flex items-center badge rounded-lg text-xs font-medium border 
         ${
           row.role === "Agent Manager"
             ? "bg-warning-50 text-warning border-warning"
             : row.role === "Viewer"
               ? "bg-primary-50 text-primary border-primary"
               : row.role === "Agent Trainer"
                 ? "bg-pink-50 text-pink border-pink"
                 : "bg-light text-dark border-border-color"
         }`}
        >
          {row.role}
        </span>
      ),
    },
    { field: "createdDate", header: "Created Date" },
    {
      field: "status",
      header: "Status",
      body: (row) => (
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
          {row.status}
        </span>
      ),
    },
    {
      field: "action",
      header: "Action",
      body: () => (
        <DropdownMenu
          trigger={<i className="icon-ellipsis-vertical" />}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
        >
          <div className="p-2 space-y-1">
            <button
              type="button"
              className="flex items-center cursor-pointer w-full hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
              data-hs-overlay="#edit-user"
              aria-controls="edit-user"
              aria-haspopup="dialog"
            >
              <i className="icon-pencil-line me-2" />
              Edit
            </button>
            <Link
              className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
              to={Path.permission}
            >
              <i className="icon-shield-check me-2" />
              Permissions
            </Link>
            <Link
              className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
              to="#"
            >
              <i className="icon-trash-2 me-2" />
              Delete
            </Link>
          </div>
        </DropdownMenu>
      ),
    },
  ];
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
                Users &amp; Roles
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
            aria-controls="add-user"
            data-hs-overlay="#add-user"
          >
            <i className="icon-plus" /> New User
          </button>
        </div>
      </div>
      {/*End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1">
        <div>
          <CommonDataTable
            title="Users"
            data={data}
            columns={columns}
            rows={10}
          />
          <div className="grid grid-cols-12 px-4 gap-2 py-3">
            <div className="sm:col-span-4 col-span-12">
              <div id="tablelength" className="flex justify-center sm:block" />
            </div>
            <div className="sm:col-span-4 col-span-12 flex items-center justify-center">
              <div id="tablepage" className="flex justify-center sm:block" />
            </div>
            <div className="sm:col-span-4 col-span-12 flex items-center sm:justify-end justify-center">
              <div id="tableinfo" className="flex justify-center sm:block" />
            </div>
          </div>
        </div>
      </div>
      {/* End grid */}
      <UserModal />
    </div>
  );
};

export default Users;
