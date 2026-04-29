
import ImageWithBasePath from "../../../components/image-with-base-path";
import { DropdownMenu } from "../../../components/dropdown-menu/dropdownMenu";
import { Path } from "../../../routes/path";
import { Images } from "../../../utils/imagePath";
import { Link } from "react-router-dom";

const AuditTrails = () => {
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
                Audit Trails
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
      <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
        <div className="xxl:col-span-10 xxl:col-start-2 xl:col-span-10 xl:col-start-2 lg:col-span-12 lg:col-start-1">
          <div className="bg-white w-full border border-border-color rounded-lg p-5 shadow">
            <div className="pb-5">
              <h6 className="font-bold text-dark mb-5">Audit Trails</h6>
              <div className="relative flex items-center mb-5">
                <div className="flex-grow border-t border-border-color" />
                <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color px-3 py-1">
                  Today
                </span>
                <div className="flex-grow border-t border-border-color" />
              </div>
              <div className="space-y-5">
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-[76px] sm:before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-indigo-600 outline-4 outline-indigo-50 text-white">
                    <i className="icon icon-file-question-mark" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Data Processing Request Created - 20 Jan 2026, 04:30 PM
                    </p>
                    <p className="flex flex-wrap items-center gap-1">
                      <span className="text-dark flex items-center gap-1">
                        <ImageWithBasePath
                          className="w-4 h-4 rounded-full"
                          src={Images.avatar_01}
                          alt="avatar"
                        />{" "}
                        Jack Michalak
                      </span>{" "}
                      created a new data processing request in the Production
                      Environment.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-[76px] sm:before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-success outline-4 outline-success-50 text-white">
                    <i className="icon icon-check-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Data Processing Request Approved – 20 Jan 2026, 11:00 AM
                    </p>
                    <p>
                      Approved by System Admin after initial checks. The request
                      is now cleared to proceed to execution.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-orange outline-4 outline-orange-50 text-white">
                    <i className="icon icon-loader" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Processing Workflow Initiated – 20 Jan 2026, 09:00 AM
                    </p>
                    <p>
                      The automated workflow was started and system resources
                      were allocated for processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="relative flex items-center mb-5">
                <div className="flex-grow border-t border-border-color" />
                <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color px-3 py-1">
                  Yesterday
                </span>
                <div className="flex-grow border-t border-border-color" />
              </div>
              <div className="space-y-5 mt-5">
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-[76px] sm:before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-warning outline-4 outline-warning-50 text-white">
                    <i className="icon icon-user-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Request Assigned – 20 Jan 2026, 05:40 PM
                    </p>
                    <p>
                      Assigned by System Admin to Customer Support Agent for
                      monitoring and follow up.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-danger outline-4 outline-danger-50 text-white">
                    <i className="icon-user-x" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Validation Failed – 20 Jan 2026, 10:45 AM
                    </p>
                    <p>
                      The request failed validation due to missing required
                      parameters and was flagged for review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-5">
              <div className="relative flex items-center mb-5">
                <div className="flex-grow border-t border-border-color" />
                <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color px-3 py-1">
                  18 Jan 2026
                </span>
                <div className="flex-grow border-t border-border-color" />
              </div>
              <div className="space-y-5 mt-5">
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-[76px] sm:before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-danger outline-4 outline-danger-50 text-white">
                    <i className="icon icon-shield-question-mark" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Request Rejected – 18 Jan 2026, 05:47 PM
                    </p>
                    <p>
                      Rejected by Customer Support Agent after identifying
                      invalid input data.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-[76px] sm:before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-pink-600 outline-4 outline-pink-50 text-white">
                    <i className="icon icon-monitor-dot" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      IP Whitelist Modified – 18 Jan 2026, 03:00 PM
                    </p>
                    <p>
                      New IP addresses were added to the allowed access list.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-primary outline-4 outline-primary-50 text-white">
                    <i className="icon icon-activity" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Audit Logs Synced – 18 Jan 2026, 10:20 AM
                    </p>
                    <p>
                      All related activity logs were synchronized with the
                      central audit system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link
                to="#"
                className="btn bg-white border border-border-color text-gray-900 font-semibold inline-flex items-center justify-center gap-x-2 hover:bg-primary hover:border-primary hover:text-white"
              >
                <i className="icon-loader" />
                Load More
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
      </div>
      {/* End grid */}
    </div>
  );
};

export default AuditTrails;
