import type { ColumnType } from "../../../types/types";
import CommonDataTable from "../../../components/data-table/dataTable";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import TenantsModal from "./tenantsModal";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const Tenants = () => {
  const data = [
    {
      tenantId: "#TNT0016",
      tenant: { name: "Green Core AI", image: "client_01" },
      plan: "Starter Plan",
      aiAgents: 3,
      users: 45,
      usage: "70%",
      createdDate: "22 Mar 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0015",
      tenant: { name: "Vertex Systems", image: "client_02" },
      plan: "Professional Plan",
      aiAgents: 7,
      users: 40,
      usage: "60%",
      createdDate: "15 Mar 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0014",
      tenant: { name: "Sketch Flow Labs", image: "client_03" },
      plan: "Business Plan",
      aiAgents: 12,
      users: 32,
      usage: "52%",
      createdDate: "08 Mar 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0013",
      tenant: { name: "Care Sync AI", image: "client_04" },
      plan: "Professional Plan",
      aiAgents: 6,
      users: 35,
      usage: "48%",
      createdDate: "02 Mar 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0012",
      tenant: { name: "Volt Edge AI", image: "client_05" },
      plan: "Business Plan",
      aiAgents: 15,
      users: 60,
      usage: "78%",
      createdDate: "26 Feb 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0011",
      tenant: { name: "Nexa Loop Tech", image: "client_06" },
      plan: "Professional Plan",
      aiAgents: 8,
      users: 20,
      usage: "32%",
      createdDate: "22 Feb 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0010",
      tenant: { name: "Ignite Works", image: "client_07" },
      plan: "Starter Plan",
      aiAgents: 2,
      users: 15,
      usage: "46%",
      createdDate: "07 Feb 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0009",
      tenant: { name: "Orbit IQ Labs", image: "client_08" },
      plan: "Business Plan",
      aiAgents: 15,
      users: 45,
      usage: "80%",
      createdDate: "27 Jan 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0008",
      tenant: { name: "Secure Stack AI", image: "client_09" },
      plan: "Starter Plan",
      aiAgents: 5,
      users: 22,
      usage: "62%",
      createdDate: "16 Jan 2026",
      status: "Active",
    },
    {
      tenantId: "#TNT0007",
      tenant: { name: "Apex Mind Systems", image: "client_10" },
      plan: "Professional Plan",
      aiAgents: 9,
      users: 26,
      usage: "70%",
      createdDate: "12 Jan 2026",
      status: "Active",
    },
  ];
  const columns: ColumnType[] = [
    {
      field: "tenantId",
      header: "Tenant ID",
      body: (row) => (
        <Link to="#" className="hover:text-primary hover:underline">
          {row.tenantId}
        </Link>
      ),
      sortable: true,
    },
    {
      field: "tenant",
      header: "Tenant",
      sortable: true,
      body: (row) => (
        <div className="flex items-center gap-2">
          <ImageWithBasePath
            className="w-8 h-8 border border-border-color rounded-full"
            src={Images[row.tenant.image as keyof typeof Images]}
            alt="avatar"
          />
          <p className="text-dark font-medium">{row.tenant.name}</p>
        </div>
      ),
    },
    { field: "plan", header: "Plan", sortable: true },
    { field: "aiAgents", header: "AI Agents", sortable: true },
    { field: "users", header: "Users", sortable: true },
    { field: "usage", header: "Usage", sortable: true },
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
          triggerClassName="cursor-pointer size-8 rounded-full flex items-center justify-center border border-border-color bg-white"
          menuClassName="absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
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
              data-hs-overlay="#edit-tenant"
              aria-controls="edit-tenant"
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
                Tenants
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
            aria-controls="add-tenant"
            data-hs-overlay="#add-tenant"
          >
            <i className="icon-plus" /> New Tenant
          </button>
        </div>
      </div>
      {/*End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1">
        <div>
          <CommonDataTable
            title="Tenants"
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
      <TenantsModal />
    </div>
  );
};

export default Tenants;
