

import { useState } from "react";
import CommonSelect from "../../../components/common-select/commonSelect";
import {
  invoiceCustomers,
  invoiceCurrencies,
  invoiceDiscountTypes,
} from "../../../utils/json/selectData";
import { Link } from "react-router-dom";
import CommonDatePicker from "../../../components/common-datepicker/commonDatepicker";
import { Path } from "../../../routes/path";
import { useDropdown } from "../../../hooks/useDropdown";

const AddInvoice = () => {
  const {toggle,isOpen,containerRef } = useDropdown();
    const [rows, setRows] = useState([
  { item: "", desc: "", qty: "", amount: "", total: "" }
]);
const addRow = () => {
  setRows([
    ...rows,
    { item: "", desc: "", qty: "", amount: "", total: "" }
  ]);
};
const deleteRow = (index: number) => {
  setRows(rows.filter((_, i) => i !== index));
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
          <li>
            <Link to="#" className="hover:text-primary">
              Invoice
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className=" text-gray-900">
            Create Invoice
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
        to={Path.invoiceDetails}
        className="btn bg-dark   text-white dark:text-white! text-center flex items-center gap-x-2 hover:bg-primary dark:hover:text-dark!  hover:text-white"
      >
        <i className="icon-eye" /> Show Preview
      </Link>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-12">
    <div className="col-span-12">
      <div className="bg-white shadow rounded-md p-5 border border-border-color">
        <form>
          <div className="mb-5 pb-1 border-b border-border-color">
            <h5 className="flex items-center gap-2 mb-5">
              <i className="icon icon-file-type" />
              Invoice Details
            </h5>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="sm:col-span-4 col-span-12 mb-4">
                <label className="block text-sm font-semibold mb-1 text-dark">
                  Invoice No <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-input block w-full bg-white border-border-color rounded-lg disabled:opacity-50 focus:ring-0 disabled:pointer-events-none focus:outline-none focus:border-border-color"
                />
              </div>
              <div className="sm:col-span-4 col-span-12 mb-4">
                <label
                  htmlFor="invoice_date"
                  className="block text-sm font-semibold mb-1 text-dark"
                >
                  Invoice Date <span className="text-danger">*</span>
                </label>
               <CommonDatePicker />
              </div>
              <div className="sm:col-span-4 col-span-12 mb-4">
                <label className="block text-sm font-semibold mb-1 text-dark">
                  Due Date <span className="text-danger">*</span>
                </label>
                <CommonDatePicker />
              </div>
            </div>
          </div>
          <h6 className="flex items-center gap-2 mb-5">
            <i className="icon icon-file-type" />
            Billing Details
          </h6>
          <div className="grid md:grid-cols-12 gap-5">
            <div className="col-span-12">
              <label className="mb-1 block text-sm font-semibold text-dark">
                Customer <span className="text-danger">*</span>
              </label>
              <CommonSelect
                className="custom-select"
                ariaLabel="Customer"
                options={invoiceCustomers}
                placeholder="Select"
              />
            </div>
            <div className="col-span-12">
              <label className="mb-1 block text-sm font-semibold text-dark">
                Address{" "}
              </label>
              <input
                type="text"
                className="form-input block w-full bg-white border-border-color rounded-lg disabled:opacity-50 focus:ring-0 disabled:pointer-events-none focus:outline-none focus:border-border-color"
              />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <label className="mb-1 block text-sm font-semibold text-dark">
                Reference No
              </label>
              <input
                type="text"
                className="form-input block w-full bg-white border-border-color rounded-lg disabled:opacity-50 focus:ring-0 disabled:pointer-events-none focus:outline-none focus:border-border-color"
              />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <label className="mb-1 block text-sm font-semibold text-dark">
                Currency
              </label>
              <CommonSelect
                className="custom-select"
                ariaLabel="Currency"
                options={invoiceCurrencies}
                placeholder="Select"
              />
            </div>
          </div>
          <div className="mb-5 mt-5 pb-5 border-b border-border-color">
            <h6 className="flex items-center gap-2 mb-5">
              <i className="icon icon-inbox" />
              Item Details
            </h6>
            <div className="border border-border-color overflow-auto mb-5 rounded-lg">
              <table className="table-auto mb-0 w-full">
                <thead className="border-b border-border-color">
                  <tr>
                    <th className="sm:w-[48px] min-w-[40px] px-3 sm:px-4 py-2 bg-light text-dark text-start" />
                    <th className="min-w-[160px] sm:w-[240px] px-3 sm:px-4 py-2 bg-light text-dark text-start">
                      Item
                    </th>
                    <th className="min-w-[200px] sm:w-[194px] px-3 sm:px-4 py-2 bg-light text-dark text-start">
                      Description
                    </th>
                    <th className="min-w-[80px] sm:w-[120px] px-3 sm:px-4 py-2 bg-light text-dark text-start">
                      Qty
                    </th>
                    <th className="min-w-[100px] sm:w-[125px] px-3 sm:px-4 py-2 bg-light text-dark text-start">
                      Amount
                    </th>
                    <th className="min-w-[110px] px-3 sm:px-4 py-2 bg-light text-dark text-start">
                      Total
                    </th>
                    <th className="min-w-[48px] px-3 sm:px-4 py-2 bg-light text-dark text-start" />
                  </tr>
                </thead>
                <tbody>
  {rows.map((row, index) => (
    <tr key={index} className="border-b border-border-color">
      <td className="px-4 py-3 text-start">
        <i className="icon-grip-vertical"></i>
      </td>

      <td className="px-4 py-3 text-start">
        <input
          type="text"
          value={row.item}
         
          className="form-input block w-full bg-light border-border-color rounded-lg focus:ring-0 focus:outline-none"
        />
      </td>

      <td className="px-4 py-3 text-start">
        <input
          type="text"
          value={row.desc}
          className="form-input block w-full bg-light border-border-color rounded-lg focus:ring-0 focus:outline-none"
        />
      </td>

      <td className="px-4 py-3 text-start">
        <input
          type="text"
          value={row.qty}
          className="form-input block w-full bg-light border-border-color rounded-lg qty focus:ring-0 focus:outline-none"
        />
      </td>

      <td className="px-4 py-3 text-start">
        <input
          type="text"
          value={row.amount}
          className="form-input block w-full bg-light border-border-color rounded-lg amount focus:ring-0 focus:outline-none"
        />
      </td>

      <td className="px-4 py-3 text-start">
        <input
          type="text"
          value={row.total}
          readOnly
          className="form-input block w-full bg-light border-border-color rounded-lg total focus:ring-0 focus:outline-none"
        />
      </td>

      <td className="px-4 py-3 text-start">
        <button
          type="button"
          onClick={() => deleteRow(index)}
          className="cursor-pointer"
        >
          <i className="icon-trash-2 hover:text-danger"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>
              </table>
              <div className="flex items-center flex-wrap gap-2 justify-between px-4 py-3">
                <Link
                  to="#"
                  onClick={addRow}
                  className="btn add-item inline-flex items-center justify-center gap-x-2 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary-800 hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                >
                  <i className="icon-plus" /> Add Item
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="block text-sm font-semibold text-dark">
                    Grand Total
                  </label>
                  <input
                    type="text"
                    className="w-[140px] form-input grandtotal block bg-light border-border-color rounded-lg disabled:opacity-50 focus:ring-0 disabled:pointer-events-none focus:outline-none focus:border-border-color focus:outline-none focus:border-border-color"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <label className="mb-1 block text-sm font-semibold text-dark">
                  Discount Type
                </label>
                <CommonSelect
                  className="custom-select"
                  ariaLabel="Discount Type"
                  options={invoiceDiscountTypes}
                  placeholder="Select"
                />
              </div>
              <div className="col-span-6">
                <label className="mb-1 block text-sm font-semibold text-dark">
                  Discount Value
                </label>
                <input
                  type="text"
                  className="form-input block w-full bg-white border-border-color rounded-lg disabled:opacity-50 focus:ring-0 disabled:pointer-events-none focus:outline-none focus:border-border-color focus:outline-none focus:border-border-color"
                />
              </div>
            </div>
          </div>
          <div className="mb-5 mt-5 pb-5 border-b border-border-color">
            <h6 className="flex items-center gap-2 mb-5">
              <i className="icon icon-file-minus" />
              Additional Details
            </h6>
            <div>
              <label className="mb-1 block font-semibold text-dark">
                Notes
              </label>
              <textarea
                className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 mb-2.5 block text-dark w-full bg-white border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none"
                rows={3}
                placeholder=""
                defaultValue={""}
              />
              <p className="text-xs text-gray-600 mt-1">
                Add any additional information or instructions for this invoice
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link
              to="#"
              className="btn inline-flex items-center justify-center gap-x-1 border border-border-color bg-light text-dark font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            >
              <i className="icon-x" /> Cancel
            </Link>
            <div className="flex items-center flex-wrap gap-3">
              <Link
                to="#"
                className="btn inline-flex items-center justify-center gap-x-1 border border-border-color bg-white text-dark font-semibold rounded-lg hover:bg-primary hover:text-white focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                <i className="icon-bookmark" /> Save as Draft
              </Link>
              <Link
                to="#"
                className="btn inline-flex items-center justify-center gap-x-1 bg-primary text-white font-semibold rounded-lg hover:bg-primary-800 focus:ring-0 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                <i className="icon-shield-check" /> Save &amp; Send
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default AddInvoice