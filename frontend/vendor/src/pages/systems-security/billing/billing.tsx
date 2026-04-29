import { Link } from "react-router-dom";
import CommonDataTable from "../../../components/data-table/dataTable";
import ImageWithBasePath from "../../../components/image-with-base-path";
import type { ColumnType } from "../../../types/types";
import { Images } from "../../../utils/imagePath";
import BillingModals from "./billingModals";
import { Path } from "../../../routes/path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";

const Billing = () => {
  const data = [
    {
      invoiceId: "#INV0020",
      plan: "Starter Plan",
      amount: "$49",
      purchasedDate: "13 May 2026",
      status: "Paid",
    },
    {
      invoiceId: "#INV0019",
      plan: "Professional Plan",
      amount: "$99",
      purchasedDate: "12 Apr 2026",
      status: "Paid",
    },
    {
      invoiceId: "#INV0018",
      plan: "Business Plan",
      amount: "$199",
      purchasedDate: "10 Mar 2026",
      status: "Paid",
    },
    {
      invoiceId: "#INV0017",
      plan: "Professional Plan",
      amount: "$49",
      purchasedDate: "11 Feb 2026",
      status: "Paid",
    },
    {
      invoiceId: "#INV0016",
      plan: "Professional Plan",
      amount: "$49",
      purchasedDate: "12 Jan 2026",
      status: "Paid",
    },
  ];
  const columns: ColumnType[] = [
    {
      field: "invoiceId",
      header: "Invoice ID",
      body: (row) => (
        <Link
          to={Path.invoiceDetails}
          className="hover:text-primary hover:underline"
        >
          {row.invoiceId}
        </Link>
      ),
    },
    { field: "plan", header: "Plan" },
    { field: "amount", header: "Amount" },
    { field: "purchasedDate", header: "Purchased Date" },
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
              to={Path.billingDetails}
            >
              <i className="icon-eye me-2" />
              View Details
            </Link>
            <button
              type="button"
              className="flex items-center cursor-pointer w-full hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white"
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
                Billing
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
        </div>
      </div>
      {/*End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5">
          <div className="flex justify-between items-center border-b border-border-color mb-5 pb-5">
            <h6 className="font-bold">Plan Information</h6>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
            <div>
              <h5 className="mb-2">Starter Plan</h5>
              <p>Enjoy your Starter plan features until 12 Jun 2026</p>
            </div>
            <div className="flex items-center">
              <h3>$49</h3>
              <p>/month</p>
            </div>
          </div>
          <div className="bg-border-color w-full h-2.5 rounded-lg mb-2">
            <div
              className="rounded-lg h-2.5 bg-primary"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between border-b border-border-color mb-5 pb-5">
            <p>1,240 / 5,000 API calls 25% consumed</p>
            <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
              <i className="icon-loader me-1" />
              25% consumed
            </span>
          </div>
          <div className="flex flex-wrap sm:justify-end justify-center items-center gap-2">
            <button
              type="button"
              className="btn bg-white border border-border-color font-semibold text-gray-900 text-center inline-flex items-center justify-center gap-x-2  hover:bg-primary hover:border-primary hover:text-white"
            >
              <i className="icon-ban" />
              Cancel Plan
            </button>
            <button
              type="button"
              className="btn inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-primary-800 focus:outline-hidden focus:bg-primary-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              <i className="icon-crown" />
              Upgrade Plan
            </button>
          </div>
        </div>{" "}
        {/* end col */}
        <div className="xl:col-span-6 col-span-12 bg-white border border-border-color rounded-lg p-5">
          <div className="flex flex-wrap gap-2 justify-between items-center border-b border-border-color mb-5 pb-5">
            <h3 className="font-bold text-[16px]">Payment Method</h3>
            <button
              type="button"
              className="btn bg-dark border border-dark text-white font-semibold text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white dark:bg-gray-100 dark:border-gray-100 dark:hover:text-dark!"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="add-card"
              data-hs-overlay="#add-card"
            >
              <i className="icon-plus font-normal" /> New Payment
            </button>
          </div>
          <div className="px-5 py-4 flex-wrap flex gap-2 items-center sm:justify-between justify-end border border-border-color rounded-lg bg-light mb-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="custom-radio"
                className="shrink-0 rounded-full border-border-color text-primary focus:ring-primary checked:border-primary"
                defaultChecked
              />
              <span className="flex flex-wrap items-center gap-1.5">
                <ImageWithBasePath
                  className=" rounded-lg"
                  src={Images.visa}
                  alt="Visa"
                />
                <span>
                  <span className="block font-semibold text-dark leading-none mb-1">
                    Visa •••• 1568
                  </span>
                  <span>Expires on 12/26</span>
                </span>
              </span>
            </label>
            <div className="flex items-center sm:justify-center justify-end gap-2">
              <button
                type="button"
                className="w-8 h-8 cursor-pointer text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-primary  rounded-full"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-card"
                data-hs-overlay="#edit-card"
              >
                <i className="icon icon-pencil-line" />
              </button>
              <Link
                to="#"
                className="w-8 h-8 text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-danger  rounded-full"
              >
                <i className="icon icon-trash-2" />
              </Link>
            </div>
          </div>
          <div className="px-5 py-4 flex flex-wrap gap-2 items-center sm:justify-between justify-end border border-border-color rounded-lg bg-light">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="custom-radio"
                className="shrink-0 rounded-full border-border-color text-primary focus:ring-primary checked:border-primary"
              />
              <span className="flex flex-wrap items-center gap-1.5">
                <ImageWithBasePath
                  className=" rounded-lg"
                  src={Images.master}
                  alt="Visa"
                />
                <span>
                  <span className="block font-semibold text-dark leading-none mb-1">
                    Master •••• 3728
                  </span>
                  <span>Expires on 05/28</span>
                </span>
              </span>
            </label>
            <div className="flex items-center sm:justify-center justify-end gap-2">
              <button
                type="button"
                className="w-8 h-8 cursor-pointer text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-primary  rounded-full"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="edit-card"
                data-hs-overlay="#edit-card"
              >
                <i className="icon icon-pencil-line" />
              </button>
              <Link
                to="#"
                className="w-8 h-8 text-[16px] flex items-center justify-center bg-white border border-border-color text-dark text-center hover:text-danger  rounded-full"
              >
                <i className="icon icon-trash-2" />
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
        <div className="col-span-12 bg-white rounded-md border border-border-color">
          <div>
            <CommonDataTable
              title="Billings"
              data={data}
              columns={columns}
              rows={10}
            />
            <div className="grid grid-cols-12 px-4 gap-2 py-3">
              <div className="sm:col-span-4 col-span-12">
                <div
                  id="tablelength"
                  className="flex justify-center sm:block"
                />
              </div>
              <div className="sm:col-span-4 col-span-12 flex items-center justify-center">
                <div id="tablepage" className="flex justify-center sm:block" />
              </div>
              <div className="sm:col-span-4 col-span-12 flex items-center sm:justify-end justify-center">
                <div id="tableinfo" className="flex justify-center sm:block" />
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>
      {/* End grid */}
      <BillingModals />
    </div>
  );
};

export default Billing;
