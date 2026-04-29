import { Link } from "react-router-dom"
import ResourceChart from "./resourceChart"
import StorageRequestChart from "./storageChart"
import TrafficChart from "./trafficChart"
import { Path } from "../../../routes/path"


const SystemDashboard = () => {
  return (
    <div className="p-6 pb-0">
  {/* Breadcrumb */}
  <div className="flex items-center justify-between flex-wrap gap-3 page-breadcrumb mb-6">
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
            System Overview
          </li>
        </ol>
      </nav>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      <span className="badge rounded-md text-xs font-medium bg-success-50 text-success border border-success inline-flex items-center">
        <i className="ph-fill ph-circle text-[5px] text-success me-1" />
        System Healthy
      </span>
      <span className="vr h-6 border-l border-border-color" />
      <p className="inline-flex items-center">
        <i className="icon-calendar-days text-gray-900 me-2" />
        Last Updated : 2h ago
      </p>
      <Link
        to="#"
        className="btn inline-flex items-center gap-x-2 rounded-lg bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark"
      >
        <i className="icon-refresh-ccw" />
        Refresh
      </Link>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid */}
  <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-12 gap-x-6">
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-primary-gradient-200 rounded-lg flex items-center p-5">
          <div className="size-10 bg-primary-600 rounded-full flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-cpu text-2xl" />
          </div>
          <p className="font-semibold text-white">CPU Usage</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">35.2%</h2>
          <div className="flex items-center">
            <span className="size-6 bg-success rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-up" />
            </span>
            <p className="text-success">33%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-success-gradient rounded-lg flex items-center p-5">
          <div className="size-10 bg-success-600 rounded-full flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-cloud-warning text-2xl" />
          </div>
          <p className="font-semibold text-white">Memory Usage</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">48.2%</h2>
          <div className="flex items-center">
            <span className="size-6 bg-danger rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-down" />
            </span>
            <p className="text-danger">14.2%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-info-gradient rounded-lg flex items-center p-5">
          <div className="size-10 bg-info-600 rounded-full shrink-0 flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-chart-bar-horizontal text-2xl" />
          </div>
          <p className="font-semibold text-white">Avg Latency (ms)</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">1254</h2>
          <div className="flex items-center">
            <span className="size-6 bg-danger rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-down" />
            </span>
            <p className="text-danger">10.2%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="md:col-span-6 xl:col-span-3 flex">
      <div className="bg-white rounded-lg border border-border-color w-full mb-6">
        <div className="bg-teal-gradient rounded-lg flex items-center p-5">
          <div className="size-10 bg-teal-600 rounded-full shrink-0 flex items-center justify-center text-white me-2">
            <i className="ph-duotone ph-codepen-logo text-2xl" />
          </div>
          <p className="font-semibold text-white">Active Models</p>
        </div>
        <div className="p-5 flex items-center justify-between">
          <h2 className="text-2xl max-lg:text-xl">05</h2>
          <div className="flex items-center">
            <span className="size-6 bg-success rounded-full text-white flex items-center justify-center me-2">
              <i className="icon-arrow-up" />
            </span>
            <p className="text-success">44.2%</p>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
  </div>
  {/* End grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
    <div className="xxl:col-span-8 xl:col-span-7 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-chart-area me-2" />
            Resource Usage (24h)
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark text-xs flex items-center justify-center"
          >
            <i className="icon-refresh-ccw" />
          </Link>
        </div>
        <div className="mb-4">
          {/* <canvas id="resource-chart" className="h-60!" /> */}
          <ResourceChart/>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-3">
          <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
            <i className="ph-fill ph-circle text-[8px] text-primary-600 me-2" />
            CPU %
          </span>
          <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
            <i className="ph-fill ph-circle text-[8px] text-success me-2" />
            Memory %
          </span>
          <span className="inline-flex items-center badge-small rounded-md font-medium bg-light text-gray-900 border border-border-color">
            <i className="ph-fill ph-circle text-[8px] text-orange me-2" />
            GPU %
          </span>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="xxl:col-span-4 xl:col-span-5 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-brain me-2" />
            Storage &amp; Requests
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark text-xs flex items-center justify-center"
          >
            <i className="icon-refresh-ccw" />
          </Link>
        </div>
        <div className="relative text-center mb-5">
          {/* <canvas id="storage-request" className="h-48 mx-auto w-full" /> */}
          <StorageRequestChart/>
          <div className="text-center absolute top-16 -translate-x-1/2 left-1/2 z-9">
            <h3>50%</h3>
            <p>Remaining</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center">
            <p className="mb-1">Requests/sec</p>
            <h3 className="text-lg max-lg:text-[17px]">1546</h3>
          </div>
          <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center">
            <p className="mb-1">GPU Usage</p>
            <h3 className="text-lg max-lg:text-[17px]">83.5%</h3>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
  </div>{" "}
  {/* end grid */}
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-6">
    <div className="xxl:col-span-5 xl:col-span-12 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-bell me-2" />
            Network Traffic
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark text-xs flex items-center justify-center"
          >
            <i className="icon-refresh-ccw" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          <div>
            <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center shadow-inset mb-5">
              <div className="text-2xl mb-4">
                <i className="icon-badge-percent mb-4" />
              </div>
              <h3 className="text-lg max-lg:text-[17px] mb-1">127</h3>
              <p className="mb-0">Success Rate</p>
            </div>
          </div>
          <div>
            <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center shadow-inset mb-5">
              <div className="text-2xl mb-4">
                <i className="icon-upload mb-4" />
              </div>
              <h3 className="text-lg max-lg:text-[17px] mb-1">45.2</h3>
              <p className="mb-0">Upload MB/s</p>
            </div>
          </div>
          <div>
            <div className="bg-linear-gradient-200 rounded-lg p-3 border border-border-color text-center shadow-inset mb-5">
              <div className="text-2xl mb-4">
                <i className="icon-download mb-4" />
              </div>
              <h3 className="text-lg max-lg:text-[17px] mb-1">127.8</h3>
              <p className="mb-0">Download MB/s</p>
            </div>
          </div>
        </div>
        <div className="mb-5">
          {/* <canvas id="traffic-chart" className="h-21" /> */}
          <TrafficChart />
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3 border border-border-color text-center shadow-inset flex items-center justify-between">
            <p className="flex items-center">
              <i className="ph-fill ph-circle text-xs text-primary me-2" />
              Upload Percentage
            </p>
            <span className="badge-small inline-block rounded-lg text-xs font-medium bg-light text-gray-900 border border-border-color">
              50%
            </span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-border-color text-center shadow-inset flex items-center justify-between flex-wrap gap-1">
            <p className="flex items-center">
              <i className="ph-fill ph-circle text-xs text-primary-300 me-2" />
              Download Percentage
            </p>
            <span className="badge-small inline-block rounded-lg text-xs font-medium bg-light text-gray-900 border border-border-color">
              35%
            </span>
          </div>
          <div className="bg-white rounded-lg p-3 border border-border-color text-center shadow-inset flex items-center justify-between">
            <p className="flex items-center">
              <i className="ph-fill ph-circle text-xs text-primary-200 me-2" />
              Ideal Time
            </p>
            <span className="badge-small inline-block rounded-lg text-xs font-medium bg-light text-gray-900 border border-border-color">
              15%
            </span>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
    <div className="xxl:col-span-7 xl:col-span-12 flex">
      <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
          <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
            <i className="icon-file-chart-line me-2" />
            API Endpoints Status
          </h2>
          <Link
            to="#"
            className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark text-xs flex items-center justify-center"
          >
            <i className="icon-refresh-ccw" />
          </Link>
        </div>
        <div className="space-y-3">
          <div className="bg-white border border-border-color rounded-lg p-3">
            <div className="flex sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <div className="flex items-center max-w-60">
                <div className="size-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0 text-primary text-2xl me-2">
                  <i className="ph-duotone ph-arrow-square-right" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">POST</p>
                  <p className="inline-flex items-center">
                    <i className="icon-clock-1 text-gray-900 me-1" />
                    145ms - 342&nbsp;req/min
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-light border border-border-color border-dashed rounded-lg py-1 px-2 flex items-center justify-between hover:border-primary hover:bg-primary-50 gap-6 group w-40">
                  <p className="text-gray-900">/api/v1/predict</p>
                  <button
                    type="button"
                    className="cursor-pointer hidden group-hover:block"
                  >
                    <i className="icon-copy text-gray-900" />
                  </button>
                </div>
              </div>
              <div>
                <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  Healthy
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-border-color rounded-lg p-3">
            <div className="flex sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <div>
                <div className="flex items-center max-w-60">
                  <div className="size-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0 text-primary text-2xl me-2">
                    <i className="ph-duotone ph-arrow-square-left" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">GET</p>
                    <p className="inline-flex items-center">
                      <i className="icon-clock-1 text-gray-900 me-1" />
                      80ms - 150&nbsp;req/min
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-light border border-border-color border-dashed rounded-lg py-1 px-2 flex items-center justify-between hover:border-primary hover:bg-primary-50 gap-6 group w-40">
                  <p className="text-gray-900">/api/v1/status</p>
                  <button
                    type="button"
                    className="cursor-pointer hidden group-hover:block"
                  >
                    <i className="icon-copy text-gray-900" />
                  </button>
                </div>
              </div>
              <div>
                <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  Healthy
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-border-color rounded-lg p-3">
            <div className="flex sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <div>
                <div className="flex items-center max-w-60">
                  <div className="size-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0 text-primary text-2xl me-2">
                    <i className="ph-duotone ph-arrow-square-right" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">POST</p>
                    <p className="inline-flex items-center">
                      <i className="icon-clock-1 text-gray-900 me-1" />
                      200ms - 210&nbsp;req/min
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-light border border-border-color border-dashed rounded-lg py-1 px-2 flex items-center justify-between hover:border-primary hover:bg-primary-50 gap-6 group w-40">
                  <p className="text-gray-900">/api/v1/update</p>
                  <button
                    type="button"
                    className="cursor-pointer hidden group-hover:block"
                  >
                    <i className="icon-copy text-gray-900" />
                  </button>
                </div>
              </div>
              <div>
                <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning">
                  Warning
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-border-color rounded-lg p-3">
            <div className="flex sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <div>
                <div className="flex items-center max-w-60">
                  <div className="size-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0 text-primary text-2xl me-2">
                    <i className="ph-duotone ph-arrow-square-right" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">POST</p>
                    <p className="inline-flex items-center">
                      <i className="icon-clock-1 text-gray-900 me-1" />
                      300ms - 90&nbsp;req/min
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-light border border-border-color border-dashed rounded-lg py-1 px-2 flex items-center justify-between hover:border-primary hover:bg-primary-50 gap-6 group w-40">
                  <p className="text-gray-900">/api/v1/remove</p>
                  <button
                    type="button"
                    className="cursor-pointer hidden group-hover:block"
                  >
                    <i className="icon-copy text-gray-900" />
                  </button>
                </div>
              </div>
              <div>
                <span className="badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger">
                  Critical
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white border border-border-color rounded-lg p-3">
            <div className="flex sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <div>
                <div className="flex items-center max-w-60">
                  <div className="size-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0 text-primary text-2xl me-2">
                    <i className="ph-duotone ph-arrow-square-right" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">POST</p>
                    <p className="inline-flex items-center">
                      <i className="icon-clock-1 text-gray-900 me-1" />
                      100ms - 320&nbsp;req/min
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-light border border-border-color border-dashed rounded-lg py-1 px-2 flex items-center justify-between hover:border-primary hover:bg-primary-50 gap-6 group w-40">
                  <p className="text-gray-900">/api/v1/edit</p>
                  <button
                    type="button"
                    className="cursor-pointer hidden group-hover:block"
                  >
                    <i className="icon-copy text-gray-900" />
                  </button>
                </div>
              </div>
              <div>
                <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* end card */}
    </div>{" "}
    {/* end col */}
  </div>{" "}
  {/* end grid */}
  <div className="grid grid-cols-1 gap-6">
    <div className="bg-white rounded-lg border border-border-color w-full p-5 mb-6">
      <div className="flex items-center justify-between gap-2 flex-wrap mb-5">
        <h2 className="inline-flex items-center text-lg max-lg:text-[17px]">
          <i className="icon-brain-cog me-2" />
          AI Models Performance
        </h2>
        <Link
          to="#"
          className="size-7.5 bg-white text-gray-900 border rounded-full border-border-color font-semibold hover:bg-primary hover:border-primary hover:text-white dark:hover:text-dark text-xs flex items-center justify-center"
        >
          <i className="icon-refresh-ccw" />
        </Link>
      </div>
      <div className="table-responsive overflow-auto">
        <table className="table-auto mb-0 w-full border border-border-color">
          <thead className="border-b border-border-color">
            <tr>
              <th className="px-4 py-2 text-gray-900 font-semibold text-start text-nowrap">
                Model
              </th>
              <th className="px-4 py-2 text-gray-900 font-semiboldk text-start text-nowrap">
                Version
              </th>
              <th className="px-4 py-2 text-gray-900 font-semibold text-start text-nowrap">
                Status
              </th>
              <th className="px-4 py-2 text-gray-900 font-semibold text-start text-nowrap">
                Requests
              </th>
              <th className="px-4 py-2 text-gray-900 font-semibold text-start text-nowrap">
                Accuracy
              </th>
              <th className="px-4 py-2 text-gray-900 font-semibold text-start text-nowrap">
                Avg Latency
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-color bg-light">
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                GPT-Vision-XL
              </td>
              <td className="px-4 py-4 text-start text-nowrap">v3.2.1</td>
              <td className="px-4 py-4 text-start text-nowrap">
                <span className="badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success inline-flex items-center">
                  <i className="ph-fill ph-circle text-[5px] me-1" />
                  Active
                </span>
              </td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold inline-flex items-center">
                45231
              </td>
              <td className="px-4 py-4 text-start text-nowrap">98.7%</td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                142ms
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                BERT-Classifier
              </td>
              <td className="px-4 py-4 text-start text-nowrap">v2.1.0</td>
              <td className="px-4 py-4 text-start text-nowrap">
                <span className="badge rounded-lg text-xs font-medium bg-purple-50 text-purple border border-purple inline-flex items-center">
                  <i className="ph-fill ph-circle text-[5px] me-1" />
                  Training
                </span>
              </td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold inline-flex items-center">
                32445
              </td>
              <td className="px-4 py-4 text-start text-nowrap">96.4%</td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                89ms
              </td>
            </tr>
            <tr className="border-b border-border-color bg-light">
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                ResNet-50
              </td>
              <td className="px-4 py-4 text-start text-nowrap">v1.8.3</td>
              <td className="px-4 py-4 text-start text-nowrap">
                <span className="badge rounded-lg text-xs font-medium bg-danger-50 text-danger border border-danger inline-flex items-center">
                  <i className="ph-fill ph-circle text-[5px] me-1" />
                  Inactive
                </span>
              </td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold inline-flex items-center">
                12098
              </td>
              <td className="px-4 py-4 text-start text-nowrap">94.2%</td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                56ms
              </td>
            </tr>
            <tr className="border-b border-border-color">
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                Transformer-LLM
              </td>
              <td className="px-4 py-4 text-start text-nowrap">v4.0.0</td>
              <td className="px-4 py-4 text-start text-nowrap">
                <span className="badge rounded-lg text-xs font-medium bg-warning-50 text-warning border border-warning inline-flex items-center">
                  <i className="ph-fill ph-circle text-[5px] me-1" />
                  Idel
                </span>
              </td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold inline-flex items-center">
                0
              </td>
              <td className="px-4 py-4 text-start text-nowrap">97.1%</td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                0ms
              </td>
            </tr>
            <tr className="border-b-0 bg-light">
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                YOLO-Detection
              </td>
              <td className="px-4 py-4 text-start text-nowrap">v5.2.1</td>
              <td className="px-4 py-4 text-start text-nowrap">
                <span className="badge rounded-lg text-xs font-medium bg-info-50 text-info border border-info inline-flex items-center">
                  <i className="ph-fill ph-circle text-[5px] me-1" />
                  Active
                </span>
              </td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold inline-flex items-center">
                28,934
              </td>
              <td className="px-4 py-4 text-start text-nowrap">95.8%</td>
              <td className="px-4 py-4 text-start text-nowrap text-gray-900 font-semibold">
                73ms
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>{" "}
    {/* end card */}
  </div>{" "}
  {/* end grid */}
</div>

  )
}

export default SystemDashboard