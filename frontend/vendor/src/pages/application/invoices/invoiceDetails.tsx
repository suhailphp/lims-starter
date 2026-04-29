import { Link } from "react-router-dom"
import { Path } from "../../../routes/path"
import { Images } from "../../../utils/imagePath"
import ImageWithBasePath from "../../../components/image-with-base-path"

const InvoiceDetails = () => {
  return (
    <div className="p-6 pb-0">
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
            <Link to={Path.invoices} className="hover:text-primary">
              Invoice
            </Link>
          </li>
          <li>
            <span className="text-default">/</span>
          </li>
          <li aria-current="page" className=" text-gray-900">
            Invoice Details
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* /Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-6 mb-6">
    {/* Grid Left */}
    <div className="xxl:col-span-10 xxl:col-start-2 xl:col-span-10 xl:col-start-2 lg:col-span-12 lg:col-start-1">
      <div
        className="bg-white border border-border-color rounded-lg shadow p-5 mb-6"
        id="printableCard"
      >
        <div className="flex flex-wrap gap-4 items-center sm:justify-between justify-center border-b border-border-color pb-5 mb-6">
          <div className="w-[177px]">
            <ImageWithBasePath
              className="w-full dark:hidden"
              src={Images.logo}
              alt="logo"
            />
            <ImageWithBasePath
              className="w-full hidden dark:block!"
              src={Images.logowhitesvg}
              alt="logo"
            />
          </div>
          <div className="flex items-center flex-wrap gap-x-10 gap-y-5">
            <div className="sm:text-end text-center">
              <p className="text-[13px]">Invoice No</p>
              <p className="font-medium text-dark">INV0016</p>
            </div>
            <div className="sm:text-end text-center">
              <p className="text-[13px]">Issue Date</p>
              <p className="font-medium text-dark">12 Jan 2026</p>
            </div>
            <div className="sm:text-end text-center">
              <p className="text-[13px]">Due Date</p>
              <p className="font-medium text-dark">20 Jan 2026</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between flex-wrap mb-6">
          <h4>Invoice Details</h4>
          <p className="text-dark font-medium flex items-center gap-3">
            Status:{" "}
            <span className="inline-flex items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
              <i className="icon icon-check me-1" /> Paid
            </span>
          </p>
        </div>
        <div className="border border-border-color p-5 mb-6 rounded-lg">
          <div className="grid grid-cols-12 sm:gap-5 gap-4">
            <div className="md:col-span-6 col-span-12">
              <p className="mb-4 text-dark font-medium">Billed From</p>
              <div className="flex items-center flex-wrap mb-4 gap-3 p-3 border border-border-color rounded-lg bg-light">
                <ImageWithBasePath src={Images.logosmall} alt="logo" />
                <div>
                  <p className="text-dark font-semibold mb-1">DreamsAI</p>
                  <p>support@dreamsai.com</p>
                </div>
              </div>
              <p className="mb-2 flex items-center gap-1">
                <i className="icon-phone" /> +1 84920 28492
              </p>
              <p className="flex items-center gap-1">
                <i className="icon-map-pin" /> 20, Chicago Avenue, Orosi, CA
                93647
              </p>
            </div>
            <div className="md:col-span-6 col-span-12">
              <p className="mb-4 text-dark font-medium">Billed To</p>
              <div className="flex items-center flex-wrap mb-4 gap-3 p-3 border border-border-color rounded-lg bg-light">
                <ImageWithBasePath
                  src={Images.avatar_02}
                  className="rounded-full w-[40px]"
                  alt="logo"
                />
                <div>
                  <p className="text-dark font-semibold mb-1">Jack Michalak</p>
                  <p>jack@example.com</p>
                </div>
              </div>
              <p className="mb-2 flex items-center gap-1">
                <i className="icon-phone" /> +1 46284 92093
              </p>
              <p className="flex items-center gap-1">
                <i className="icon-map-pin" /> 39, Hampton Flat, Boston, MA
                02110
              </p>
            </div>
          </div>
        </div>
        <div className="border border-border-color overflow-auto mb-6 rounded-lg">
          <table className="table-auto mb-0 w-full">
            <thead className="border-b border-border-color">
              <tr>
                <th className="px-4 py-2 bg-light text-dark text-start">
                  Item
                </th>
                <th className="px-4 py-2 bg-light text-dark text-start">
                  Description
                </th>
                <th className="px-4 py-2 bg-light text-dark text-start">Qty</th>
                <th className="px-4 py-2 bg-light text-dark text-start">
                  Amount
                </th>
                <th className="px-4 py-2 bg-light text-dark text-start">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="border-b border-border-color">
                <td className="px-4 py-3 text-start">AI Agent Execution</td>
                <td className="px-4 py-3 text-start">
                  Task automation &amp; decision handling
                </td>
                <td className="px-4 py-3 text-start">120</td>
                <td className="px-4 py-3 text-start">$20</td>
                <td className="px-4 py-3 text-start">$240</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-start">Data Processing</td>
                <td className="px-4 py-3 text-start">
                  Structured data analysis
                </td>
                <td className="px-4 py-3 text-start">230</td>
                <td className="px-4 py-3 text-start">$50</td>
                <td className="px-4 py-3 text-start">$450</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-12 gap-6 border-b border-border-color p-5 mb-5 overflow-auto">
          <div className="md:col-span-6 xxl:col-span-4 col-span-12">
            <h4 className="mb-4 text-[16px]">Payment Details</h4>
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">Payment Method:</span>Bank
              Transfer
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">
                Account Holder Name:
              </span>
              Jack Michalak
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">Account Number:</span>1234
              5678 9012
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">Bank Name:</span>JPMorgan
              Chase Bank
            </p>
            <p className="flex items-center justify-between">
              <span className="text-dark font-medium ">Code:</span>CHASUS33
            </p>
          </div>
          <div className="col-span-6 xxl:col-span-4 xxl:block hidden" />
          <div className="md:col-span-6 xxl:col-span-4 col-span-12">
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">Subtotal:</span>$690
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">Platform fee:</span>$10
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-dark font-medium">Tax(5%):</span>$34.50
            </p>
            <p className="flex items-center justify-between mb-2 pb-2 border-b border-border-color">
              <span className="text-dark font-medium">Discount(5%):</span>
              <span className="text-danger">$34.50</span>
            </p>
            <p className="flex items-center justify-between mb-2 text-dark font-semibold">
              <span>Grand Total:</span>$700
            </p>
            <p className="flex items-center justify-between">
              <span className="text-dark font-medium">In words:</span>Dollars
              Seven Hundread
            </p>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="sm:col-span-9 col-span-12">
            <div className="flex items-center gap-3 p-3 border border-border-color rounded-lg bg-light">
              <div>
                <p className="text-dark font-semibold mb-1 sm:text-start text-center">
                  Note
                </p>
                <p className="sm:text-start text-center">
                  Charges are based on actual AI agent usage and executed
                  services during the billing period.
                </p>
              </div>
            </div>
          </div>
          <div className="sm:col-span-3 col-span-12">
            <div className="flex justify-center sm:items-end items-center flex-col h-full">
              <ImageWithBasePath
                src={Images.signature}
                alt="Signature"
                className="dark:invert"
              />
              <p>Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link
          to="#"
          className="btn bg-dark border border-border-color  text-white font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary dark:text-dark! dark:bg-gray-100 dark:hover:text-dark! hover:text-white"
        >
          <i className="icon-download" />
          Download
        </Link>
        <Link
          to="#"
          id="printButton"
          className="btn bg-primary-gradient border border-border-color  text-white font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
        >
          <i className="icon-printer" />
          Print
        </Link>
      </div>
    </div>
  </div>
  {/* End grid */}
</div>

  )
}

export default InvoiceDetails