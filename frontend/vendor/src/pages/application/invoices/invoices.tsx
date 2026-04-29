import React, { useEffect } from "react";
import CommonDataTable from "../../../components/data-table/dataTable";
import type { ColumnType } from "../../../types/types";
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
import { Images } from "../../../utils/imagePath";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { useDropdown } from "../../../hooks/useDropdown";

const Invoices = () => {
  const {toggle,isOpen,containerRef } = useDropdown();
  useEffect(() => {
    window.HSStaticMethods?.autoInit();
  }, []);
  const [open, setOpen] = React.useState(false);
  const data = [
    {
      id: "#INV0016",
      img: "avatar_01",
      name: "Jack Michalak",
      email: "jack@example.com",
      issuedate: "12 Mar 2026",
      amount: "$700",
      dueDate: "22 Mar 2026",
      status: "Paid",
    },
    {
      id: "#INV0015",
      img: "avatar_02",
      name: "Lara Curtin",
      email: "lara@example.com",
      issuedate: "05 Mar 2026",
      amount: "$500",
      dueDate: "15 Mar 2026",
      status: "Draft",
    },
    {
      id: "#INV0014",
      img: "avatar_03",
      name: "Brian Fulton",
      email: "brian@example.com",
      issuedate: "25 Feb 2026",
      amount: "$600",
      dueDate: "08 Mar 2026",
      status: "Unpaid",
    },
    {
      id: "#INV0013",
      img: "avatar_04",
      name: "Trudy Heintz",
      email: "trudy@example.com",
      issuedate: "20 Feb 2026",
      amount: "$530",
      dueDate: "02 Mar 2026",
      status: "Overdue",
    },
    {
      id: "#INV0012",
      img: "avatar_05",
      name: "Roger Tucker",
      email: "roger@example.com",
      issuedate: "16 Feb 2026",
      amount: "$800",
      dueDate: "26 Feb 2026",
      status: "Pending",
    },
    {
      id: "#INV0011",
      img: "avatar_06",
      name: "Leona Daniels",
      email: "leona@example.com",
      issuedate: "12 Feb 2026",
      amount: "$460",
      dueDate: "22 Feb 2026",
      status: "Overdue",
    },
    {
      id: "#INV0010",
      img: "avatar_07",
      name: "William Bailey",
      email: "william@example.com",
      issuedate: "28 Jan 2026",
      amount: "$400",
      dueDate: "07 Feb 2026",
      status: "Pending",
    },
    {
      id: "#INV0009",
      img: "avatar_08",
      name: "Doris Hiller",
      email: "doris@example.com",
      issuedate: "17 Jan 2026",
      amount: "$320",
      dueDate: "27 Jan 2026",
      status: "Unpaid",
    },
    {
      id: "#INV0008",
      img: "avatar_09",
      name: "Frank Hidalgo",
      email: "frank@example.com",
      issuedate: "06 Jan 2026",
      amount: "$280",
      dueDate: "16 Jan 2026",
      status: "Draft",
    },
    {
      id: "#INV0007",
      img: "avatar_10",
      name: "Allison Mayne",
      email: "allison@example.com",
      issuedate: "02 Jan 2026",
      amount: "$560",
      dueDate: "12 Jan 2026",
      status: "Unpaid",
    },
  ];

  const columns: ColumnType[] = [
    {
      field: "id",
      header: "Invoice ID",
      sortable: true,
      body: (row) => (
        <Link
          to={Path.invoiceDetails}
          className="inline-block hover:text-primary hover:underline"
        >
          {row.id}
        </Link>
      ),
    },
    {
      field: "name",
      header: "Name",
      body: (row) => (
        <div className="flex items-center gap-2">
          <span className="flex shrink-0">
            <ImageWithBasePath
              className="w-8 h-8 border border-border-color rounded-full"
              src={Images[row.img as keyof typeof Images]}
              alt="avatar"
            />
          </span>
          <div>
            <p className="text-dark font-medium">{row.name}</p>
            <p className="text-xs">{row.email}</p>
          </div>
        </div>
      ),
    },
    { field: "issuedate", header: "Issue Date" },
    {
      field: "amount",
      header: "Amount",
    },
    {
      field: "dueDate",
      header: "Due Date",
    },
    {
      field: "Status",
      header: "Status",
      body: () => (
        <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
          <span className="bg-success w-[5px] h-[5px] block rounded-full me-1" />
          Paid
        </span>
      ),
    },
    {
      field: "Action",
      header: "Action",
      body: () => (
        <div className="relative inline-block">
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer size-8 rounded-full flex items-center justify-center border border-border-color bg-white"
          >
            <i className="icon-ellipsis-vertical"></i>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 min-w-[150px] bg-white border border-border-color rounded-lg shadow p-2 space-y-1 z-50">
              <button className="flex items-center w-full px-4 py-1.5 hover:bg-primary-50">
                <i className="icon-eye me-2"></i>View
              </button>

              <button className="flex items-center w-full px-4 py-1.5 hover:bg-primary-50">
                <i className="icon-pencil-line me-2"></i>Edit
              </button>

              <button className="flex items-center w-full px-4 py-1.5 hover:bg-primary-50">
                <i className="icon-trash-2 me-2"></i>Delete
              </button>
            </div>
          )}
        </div>
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
                Invoices
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div ref={containerRef} className="relative inline-flex">
            <button
              onClick={() => toggle("export1")}
              type="button"
              className="hs-dropdown-toggle cursor-pointer btn inline-flex items-center gap-x-2 text-sm font-normal rounded-lg border border-border-color bg-white text-gray-900 hover:bg-primary hover:border-primary hover:text-white focus:bg-primary  focus:border-primary focus:text-white  focus:outline-hidden"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <i className="icon-arrow-down-to-line"></i>Export
            </button>
 {isOpen("export1") && (
              <div
                  className=" absolute right-0 top-full min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-9"
                role="menu"
                aria-orientation="vertical"
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
              </div>
 )}
          </div>
          <Link
            to={Path.addInvoice}
            className="btn bg-primary border border-primary text-white text-center flex items-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white"
          >
            <i className="icon-plus" /> New Invoice
          </Link>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-1">
        <div>
          <CommonDataTable
            title="Invoices"
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
    </div>
  );
};

export default Invoices;
