import { useEffect } from "react";
import type { ColumnType } from "../../../types/types";
import { Link } from "react-router-dom";
import CommonDataTable from "../../../components/data-table/dataTable";
import ApiKeysModal from "./apiKeysModal";
import { Path } from "../../../routes/path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const ApiKeys = () => {
  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  const data = [
    {
      keyName: "Production Key",
      keyPrefix: "ai8fc*****",
      agent: "Live Support Agent",
      createdDate: "22 Mar 2026",
      status: "Active",
    },
    {
      keyName: "Staging Key",
      keyPrefix: "stg9af*****",
      agent: "Pre Release Testing Agent",
      createdDate: "15 Mar 2026",
      status: "Active",
    },
    {
      keyName: "Development Key",
      keyPrefix: "ch78f*****",
      agent: "Development Support Agent",
      createdDate: "08 Mar 2026",
      status: "Active",
    },
    {
      keyName: "Testing Key",
      keyPrefix: "ts9c*****",
      agent: "QA Validation Agent",
      createdDate: "02 Mar 2026",
      status: "Active",
    },
    {
      keyName: "Service Key",
      keyPrefix: "sk8dw*****",
      agent: "Background Service Agent",
      createdDate: "26 Feb 2026",
      status: "Active",
    },
    {
      keyName: "Automation Key",
      keyPrefix: "ai8fc*****",
      agent: "Workflow Automation Agent",
      createdDate: "22 Feb 2026",
      status: "Active",
    },
    {
      keyName: "Monitoring Key",
      keyPrefix: "mn37*****",
      agent: "System Monitoring Agent",
      createdDate: "07 Feb 2026",
      status: "Active",
    },
    {
      keyName: "Demo Key",
      keyPrefix: "dm9af*****",
      agent: "Demo Environment Agent",
      createdDate: "27 Jan 2026",
      status: "Active",
    },
    {
      keyName: "Backup Key",
      keyPrefix: "bk0ff*****",
      agent: "Failover Agent",
      createdDate: "16 Jan 2026",
      status: "Active",
    },
    {
      keyName: "Performance Key",
      keyPrefix: "pf4ks*****",
      agent: "Performance Benchmark Agent",
      createdDate: "12 Jan 2026",
      status: "Active",
    },
  ];

  const columns: ColumnType[] = [
    { field: "keyName", header: "Key Name", sortable: true },
    {
      field: "keyPrefix",
      header: "Key Prefix",
      body: (row) => (
        <div className="relative">
          <input
            type="text"
            className="block w-full py-2 pe-8 rounded-lg border border-border-color bg-light"
            value={row.keyPrefix}
            disabled
          />
          <div className="absolute top-1/2 end-3 -translate-y-1/2 flex">
            <button
              onClick={() => navigator.clipboard.writeText(row.keyPrefix)}
              style={{ cursor: "pointer" }}
            >
              <i className="icon-copy text-dark"></i>
            </button>
          </div>
        </div>
      ),
    },
    { field: "agent", header: "Agent" },
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
          trigger={<i className="icon-ellipsis-vertical"></i>}
          triggerClassName="cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
          ariaLabel="Row actions"
        >
          <div className="p-2 space-y-1">
            <Link
              className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
              to="#"
            >
              <i className="icon-eye me-2" />
              View Details
            </Link>
            <button
              type="button"
              className="flex items-center cursor-pointer w-full hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
              data-hs-overlay="#edit-api-key"
              aria-controls="edit-api-key"
              aria-haspopup="dialog"
            >
              <i className="icon-pencil-line me-2" />
              Edit
            </button>
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
                API Keys
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
            ariaLabel="Export"
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
            aria-controls="add-api-key"
            data-hs-overlay="#add-api-key"
          >
            <i className="icon-plus" /> New API
          </button>
        </div>
      </div>
      {/*End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1">
        <div>
          <CommonDataTable
            title="API Keys"
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
      <ApiKeysModal />
    </div>
  );
};

export default ApiKeys;
