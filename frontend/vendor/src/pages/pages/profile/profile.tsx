import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../components/image-with-base-path";
import { Images } from "../../../utils/imagePath";
import { Path } from "../../../routes/path";

const Profile = () => {
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
              <li aria-current="page" className=" text-gray-900">
                Profile
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start grid */}
      <div className="relative">
        <div className="h-[132px] w-full overflow-hidden rounded-t-lg">
          <ImageWithBasePath
            src={Images.dark_bg}
            alt="profile background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white border border-border-color rounded-lg p-5 mb-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 items-center gap-6">
            <div className="xl:col-span-4 order-2 xl:order-1 flex xl:justify-start xl:items-start justify-center items-center">
              <div className="flex justify-center xl:justify-between items-center rounded-lg gap-2 md:gap-6 p-3 md:p-5 border border-border-color bg-light">
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[16px]">
                    <i className="icon icon-users" />
                  </span>
                  <h5 className="font-semibold">60K</h5>
                  <p className="text-sm text-gray-500">Followers</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[16px]">
                    <i className="icon icon-images" />
                  </span>
                  <h5 className="font-semibold">80</h5>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-[16px]">
                    <i className="icon icon-user-check" />
                  </span>
                  <h5 className="font-semibold">20K</h5>
                  <p className="text-sm text-gray-500">Following</p>
                </div>
              </div>
            </div>
            <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col items-center text-center -mt-[77px]">
              <span className="relative inline-block mb-4">
                <ImageWithBasePath
                  className="w-[120px] h-[120px] rounded-full object-cover"
                  src={Images.avatar_01}
                  alt="avatar"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute end-0 bottom-0 w-8 h-8 flex items-center justify-center  bg-white border border-border-color rounded-full text-dark cursor-pointer hover:bg-light focus-within:ring-2 focus-within:ring-primary"
                >
                  <i className="icon icon-pencil-line text-sm" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </span>
              <h4 className="flex items-center gap-2 mb-2">
                Marilyn Trosclair
                <ImageWithBasePath
                  src={Images.verify_icon}
                  alt="icon"
                />
              </h4>
              <p className="text-sm text-gray-500">
                @marilyntrosclair@example.com
              </p>
            </div>
            <div className="xl:col-span-4 order-3 flex justify-center items-center xl:justify-end gap-3">
              <button className="btn flex items-center gap-2 text-white bg-dark dark:bg-gray-100 dark:hover:text-dark! hover:bg-primary hover:text-white">
                <i className="icon icon-message-square-text" />
                Message
              </button>
              <button className="btn flex items-center gap-2 bg-primary-gradient text-white">
                <i className="icon icon-user-plus" />
                Follow
              </button>
              <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                <button
                  type="button"
                  className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal border border-border-color bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <i className="icon-ellipsis-vertical" />
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="p-2 space-y-1">
                    <Link
                      className="flex items-center px-4 py-1.75 rounded-lg text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                      to="#"
                    >
                      <i className="icon-eye me-2" />
                      View Details
                    </Link>
                    <Link
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                      to="#"
                    >
                      <i className="icon-pencil-line me-2" />
                      Edit
                    </Link>
                    <Link
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-default hover:bg-light hover:text-primary focus:outline-hidden focus:bg-white hover:bg-primary-50"
                      to="#"
                    >
                      <i className="icon-trash-2 me-2" />
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End grid */}
      <div className="grid grid-cols-1 xxl:grid-cols-12 xl:grid-cols-12 gap-x-6">
        <div className="xxl:col-span-5 xl:col-span-5 flex">
          <div className="bg-white border border-border-color rounded-lg p-5 mb-6 shadow flex-1">
            <div className="mb-5 pb-5 border-b border-border-color">
              <h4 className="text-base font-bold text-dark mb-2">About</h4>
              <p>
                An active platform user responsible for managing projects,
                tracking tasks, and monitoring daily activities while
                maintaining up to date account details.
              </p>
            </div>
            <div className="mb-5 pb-5 border-b border-border-color">
              <h4 className="text-base font-bold text-dark mb-4">
                Personal Information
              </h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between mb-3">
                  <span>User ID</span>
                  <span className="font-medium text-dark">#USR0016</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Role</span>
                  <span className="font-medium text-dark">Administrator</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Status</span>
                  <span className="inline-flex items-center badge-small rounded-md text-xs font-medium bg-success-50 text-success border border-success">
                    <span className="bg-success w-1 h-1 block rounded-full me-1" />{" "}
                    Active
                  </span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Date of Birth</span>
                  <span className="font-medium text-dark">20 Mar 1992</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Gender</span>
                  <span className="font-medium text-dark">Female</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Nationality</span>
                  <span className="font-medium text-dark">American</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Address</span>
                  <span className="font-medium text-dark">Newyork</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Phone</span>
                  <span className="font-medium text-dark">+1 46237 93024</span>
                </p>
              </div>
            </div>
            <div className="mb-5 pb-5 border-b border-border-color">
              <h4 className="text-base font-bold text-dark mb-4">
                Account Information
              </h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between mb-3">
                  <span>Display Name</span>
                  <span className="font-medium text-dark">
                    Marilyn Trosclair
                  </span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Account Created</span>
                  <span className="font-medium text-dark">10 Jul 2020</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Last Login</span>
                  <span className="font-medium text-dark">15 Jan 2026</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Membership Status</span>
                  <span className="badge-small rounded-md text-xs font-medium bg-pink-50 text-pink border border-pink">
                    {" "}
                    Premium
                  </span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Language</span>
                  <span className="font-medium text-dark">English</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>Timezone</span>
                  <span className="font-medium text-dark">
                    GMT-5 (Eastern Time)
                  </span>
                </p>
              </div>
            </div>
            <div className="">
              <h4 className="text-base font-semibold text-dark mb-4">
                Security Information
              </h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between mb-3">
                  <span>Password Changed</span>
                  <span className="font-medium text-dark">12 Jan 2026</span>
                </p>
                <p className="flex justify-between mb-3">
                  <span>2 Step Verification</span>
                  <span className="inline-flex items-center badge-small rounded-md text-xs font-medium bg-info-50 text-info border border-info">
                    <span className="bg-info w-1 h-1 block rounded-full me-1" />{" "}
                    Enabled
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Connected Devices</span>
                  <span className="font-medium text-dark">02</span>
                </p>
              </div>
            </div>
          </div>
          {/* end card */}
        </div>{" "}
        {/* end grid */}
        <div className="xxl:col-span-7 xl:col-span-7 flex">
          <div className="bg-white w-full border border-border-color rounded-lg p-5 mb-6 shadow flex-1">
            <div className="mb-5 pb-5 border-b border-border-color">
              <h4 className="text-base font-bold text-dark mb-5">Activities</h4>
              <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color">
                Today
              </span>
              <div className="space-y-5 mt-5">
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-indigo-600 outline-4 outline-indigo-50 text-white">
                    <i className="icon icon-log-in" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Logged In – 20 Jan 2026 at 09:07 AM
                    </p>
                    <p>
                      You successfully signed in using secure authentication.
                      Your session is now active.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-success outline-4 outline-success-50 text-white">
                    <i className="icon icon-check-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Profile Updated – 20 Jan 2026 at 08:54 AM
                    </p>
                    <p>
                      Your profile information was updated successfully. Changes
                      are reflected across your account.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-5 pb-5 border-b border-border-color">
              <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color">
                Yesterday
              </span>
              <div className="space-y-5 mt-5">
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-indigo-600 outline-4 outline-indigo-50 text-white">
                    <i className="icon icon-bot" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Notification Preferences Updated – 19 Jan 2026 at 06:42 PM
                    </p>
                    <p>
                      You modified your email and in-app notification settings.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-success outline-4 outline-success-50 text-white">
                    <i className="icon icon-check-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Password Changed – 19 Jan 2026 at 05:20 PM
                    </p>
                    <p>
                      Your account password was updated successfully. Use the
                      new password for future logins.{" "}
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-success outline-4 outline-success-50 text-white">
                    <i className="icon icon-check-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Session Ended – 19 Jan 2026 at 04:58 PM
                    </p>
                    <p>You logged out from your previous session.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="badge-small rounded-md text-xs font-medium bg-light text-dark border border-border-color">
                18 Jan 2026
              </span>
              <div className="space-y-5 mt-5">
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-indigo-600 outline-4 outline-indigo-50 text-white">
                    <i className="icon icon-bot" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Security Verification Enabled – 18 Jan 2026 at 04:35 PM
                    </p>
                    <p>
                      Two-step verification was enabled to enhance account
                      security
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-success outline-4 outline-success-50 text-white">
                    <i className="icon icon-check-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Task Completed – 20 Jan, 2026 at 11:10 AM
                    </p>
                    <p>
                      The agent completed the data classification task and
                      stored the results in the output repository.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4 before:absolute before:left-4 before:top-8 before:h-full before:w-px before:border-l before:border-dashed before:border-border-color">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-success outline-4 outline-success-50 text-white">
                    <i className="icon icon-check-check" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Task In Progress – 21 Jan, 2026 at 2:30 PM
                    </p>
                    <p>
                      The agent is currently validating the data integrity and
                      preparing.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center gap-4">
                  <span className="z-10 inline-flex shrink-0 items-center justify-center w-8 h-8 text-[16px] rounded-full bg-indigo-600 outline-4 outline-indigo-50 text-white">
                    <i className="icon-bot" />
                  </span>
                  <div>
                    <p className="mb-1 font-medium text-dark">
                      Password Change – 22 Jan, 2026 at 9:00 AM
                    </p>
                    <p>
                      The agent is scheduled to conduct a comprehensive review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* end grid */}
      </div>{" "}
      {/* end grid */}
    </div>
  );
};

export default Profile;
