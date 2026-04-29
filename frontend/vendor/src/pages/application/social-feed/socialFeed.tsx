import { Images } from "../../../utils/imagePath";
import ImageWithBasePath from "../../../components/image-with-base-path";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";

const SocialFeed = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const galleryImages = [
    { src: Images.feed_02 },
    { src: Images.feed_03 },
    { src: Images.feed_04 },
    { src: Images.feed_01 },
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
                Social Feed
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* End Breadcrumb */}
      {/* Start grid */}
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-3 col-span-12 w-full">
          <div className="sticky t-10 feed-scroll">
            <div className="border border-border-color rounded-lg bg-white mb-5">
              <div className="h-[70px] bg-primary-gradient rounded-t-lg" />
              <div className="p-5 -mt-[45px]">
                <div className="flex items-center border-b border-border-color mb-4 pb-4 justify-center flex-col">
                  <span className="relative inline-block mb-2">
                    <ImageWithBasePath
                      className="w-[56px] h-[56px] rounded-full object-cover border-2 border-border-color"
                      src={Images.avatar_01}
                      alt="avatar"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="absolute end-0 bottom-0 w-[24px] h-[24px] flex items-center justify-center  bg-white border border-border-color rounded-full text-dark cursor-pointer hover:bg-light focus-within:ring-2 focus-within:ring-primary"
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
                  <div className="flex items-center mb-1 gap-2">
                    <h4 className="text-lg mb-1">Gary Scott </h4>
                    <i className="icon icon-badge-check text-success font-normal" />
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <p className="border-e border-border-color pe-2 text-xs">
                      @garyscott564
                    </p>
                    <p className="flex items-center gap-1 text-xs">
                      <i className="icon-map-pin text-dark text-lg" /> Newyork
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 justify-center">
                  <div className="flex flex-col gap-1 items-center">
                    <h5 className="font-bold">60K</h5>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <h5 className="font-bold">80</h5>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <h5 className="font-bold">20K</h5>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
              <div className="flex flex-col w-full">
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <span className="flex items-center gap-2">
                    <i className="icon-newspaper" /> All Feeds{" "}
                  </span>
                  <span className="bg-primary text-xs text-white w-5.5 h-5.5 rounded-full ms-auto flex items-center justify-center">
                    9
                  </span>
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <i className="icon-search text-dark" />
                  Explore
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <i className="icon-flame text-dark" /> Trending
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <i className="icon-newspaper text-dark" /> Following
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <i className="icon-bookmark text-dark" /> Bookmarks
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <i className="icon-files text-dark" /> Files
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color mb-1"
                >
                  <i className="icon-music text-dark" /> Media
                </Link>
                <Link
                  to="#"
                  className="px-3 py-2 w-full rounded-lg border border-transparent font-medium flex items-center gap-2 hover:bg-light hover:border hover:border-border-color"
                >
                  <i className="icon-settings text-dark" /> Settings
                </Link>
              </div>
            </div>
            <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
              <h5 className="mb-4">Recent Activities</h5>
              <div className="relative mb-4">
                <input
                  type="text"
                  name="hs-table-search"
                  className="block w-full py-2 pe-8 pe-3 rounded-lg border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
                  placeholder="Search Agents"
                />
                <div className="absolute top-1/2 end-3 -translate-y-1/2 pointer-events-none">
                  <i className="icon-search text-gray-900" />
                </div>
              </div>
              <div className="flex flex-col gap-4 mb-4 w-full">
                <div className="flex gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_11}
                    alt="avatar"
                  />
                  <div>
                    <p>
                      <span className="text-dark font-medium mb-1">Alex</span>{" "}
                      commented on your post.
                    </p>
                    <p className="flex items-center gap-1">
                      <i className="icon-calendar-clock text-dark" /> 10 mins
                      ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_12}
                    alt="avatar"
                  />
                  <div>
                    <p>
                      <span className="text-dark font-medium mb-1">You</span>{" "}
                      liked a post about productivity tips
                    </p>
                    <p className="flex items-center gap-1">
                      <i className="icon-calendar-clock text-dark" /> 30 mins
                      ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_13}
                    alt="avatar"
                  />
                  <div>
                    <p>
                      {" "}
                      New connection added{" "}
                      <span className="text-dark font-medium mb-1">
                        Sarah Johnson
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <i className="icon-calendar-clock text-dark" /> 2 hours
                      ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_14}
                    alt="avatar"
                  />
                  <div>
                    <p>
                      <span className="text-dark font-medium mb-1">
                        Ryan Cooper
                      </span>{" "}
                      accepted a connection request
                    </p>
                    <p className="flex items-center gap-1">
                      <i className="icon-calendar-clock text-dark" /> 5 hours
                      ago
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_15}
                    alt="avatar"
                  />
                  <div>
                    <p>
                      <span className="text-dark font-medium mb-1">
                        Daniel Kim
                      </span>{" "}
                      mentioned you in a comment
                    </p>
                    <p className="flex items-center gap-1">
                      <i className="icon-calendar-clock text-dark" /> 1 day ago
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn bg-dark border border-dark text-white text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white dark:bg-gray-100 dark:border-gray-100"
              >
                View All <i className="icon-chevron-right" />
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
        <div className="xl:col-span-6 col-span-12 w-full">
          <div className="feed-scroll">
            <div className="flex items-center justify-between gap-2 overflow-auto mb-6">
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border border-border-color mb-2 flex items-center justify-center text-[20px]">
                  <i className="icon-plus" />
                </div>
                <p className="whitespace-nowrap">your story</p>
              </Link>
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2">
                  <ImageWithBasePath
                    className="rounded-full"
                    src={Images.avatar_01}
                    alt="avatar"
                  />
                </div>
                <p>Emma</p>
              </Link>
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2">
                  <ImageWithBasePath
                    className="rounded-full"
                    src={Images.avatar_02}
                    alt="avatar"
                  />
                </div>
                <p>Alex</p>
              </Link>
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2">
                  <ImageWithBasePath
                    className="rounded-full"
                    src={Images.avatar_03}
                    alt="avatar"
                  />
                </div>
                <p>Lily</p>
              </Link>
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2">
                  <ImageWithBasePath
                    className="rounded-full"
                    src={Images.avatar_04}
                    alt="avatar"
                  />
                </div>
                <p>Sophia</p>
              </Link>
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2">
                  <ImageWithBasePath
                    className="rounded-full"
                    src={Images.avatar_05}
                    alt="avatar"
                  />
                </div>
                <p>Olivia</p>
              </Link>
              <Link to="#" className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5 mb-2">
                  <ImageWithBasePath
                    className="rounded-full"
                    src={Images.avatar_06}
                    alt="avatar"
                  />
                </div>
                <p>Steave</p>
              </Link>
            </div>
            <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
              <h5 className="mb-4">Create Post</h5>
              <textarea
                className="py-2.5 px-2.5 sm:py-2.5 sm:px-2.5 block text-dark w-full bg-light border-border-color rounded-lg sm:text-sm text-xs focus:ring-0 disabled:opacity-50 disabled:pointer-events-none mb-3"
                rows={4}
                placeholder="Write your thoughts..."
                defaultValue={""}
              />
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center flex-wrap gap-1.5">
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-image" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-video" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-file-text" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-chart-column" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-link-2" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-hash" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-map-pin" />
                  </Link>
                  <Link
                    to="#"
                    className="w-8 h-8 flex items-center justify-center text-[16px] hover:bg-primary transition hover:text-white dark:hover:text-dark! rounded-full"
                  >
                    <i className="icon-smile" />
                  </Link>
                </div>
                <Link
                  to="#"
                  className="btn bg-primary border border-primary text-white hover:bg-primary-800 hover:border-primary-800 hover:text-white flex items-center justify-center"
                >
                  Share Post
                </Link>
              </div>
            </div>
            {/* Social Feed Item 1*/}
            <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
              <div className="flex justify-between items-center flex-wrap mb-4">
                <div className="flex items-center gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_01}
                    alt="avatar"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-dark font-semibold">Shaun Boyd</p>
                      <span className=" bg-gray-300 w-1 h-1 block rounded-full" />
                      <p>2 days ago</p>
                    </div>
                    <p>@shaun384</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
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
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-1">
                Your mindset shapes your journey choose confidence and move
                forward with purpose and belief
              </p>
              <div className="flex items-center gap-2">
                <Link to="#" className="text-info">
                  #StayFocused
                </Link>
                <Link to="#" className="text-info">
                  #MotivationDaily
                </Link>
              </div>
              <div className="my-4">
                <div
                  className="image-popup h-full"
                  onClick={() => {
                    setIndex(3);
                    setOpen(true);
                  }}
                >
                  <ImageWithBasePath
                    src={Images.feed_01}
                    alt="generate"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center justify-between gap-5">
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-thumbs-up  " />
                    </span>{" "}
                    54
                  </Link>
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-thumbs-down" />
                    </span>{" "}
                    12
                  </Link>
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-message-square-text" />
                    </span>{" "}
                    98
                  </Link>
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-share-2" />
                    </span>{" "}
                    87
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <Link to="#" className="text-dark flex ">
                    <span className="text-dark text-[16px] hover:text-primary transition">
                      <i className="icon-corner-up-right" />
                    </span>
                  </Link>
                  <Link to="#" className="text-dark flex ">
                    <span className="text-dark text-[16px] hover:text-primary transition">
                      <i className="icon-bookmark" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white flex-wrap">
                <ImageWithBasePath
                  className="w-8 h-8 rounded-full border border-border-color"
                  src={Images.avatar_01}
                  alt=""
                />
                <div className="flex flex-1 items-center bg-gray-50 border border-gray-200 rounded-full px-1 py-0">
                  <input
                    type="text"
                    placeholder="Write your thoughts..."
                    className="w-full bg-transparent border-0 outline-0 focus:ring-0 text-dark placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full bg-white text-dark dark:text-dark! border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                    <i className="icon-paperclip" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white text-dark dark:text-dark! border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                    <i className="icon-smile" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white text-dark dark:text-dark! border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                    <i className="icon-send" />
                  </button>
                </div>
              </div>
            </div>
            {/* Social Feed Item 2*/}
            <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <ImageWithBasePath
                    className="w-10 h-10 rounded-full border border-border-color"
                    src={Images.avatar_01}
                    alt="avatar"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-dark font-semibold">Sarah John</p>
                      <span className=" bg-gray-300 w-1 h-1 block rounded-full" />
                      <p>2 days ago</p>
                    </div>
                    <p>@sarah371</p>
                  </div>
                </div>
                <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                  <button
                    type="button"
                    className="hs-dropdown-toggle cursor-pointer size-8 rounded-full inline-flex items-center justify-center text-sm font-normal bg-white text-gray-800 hover:bg-white focus:outline-hidden focus:white"
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
                    tabIndex={-1}
                  >
                    <div className="p-2 space-y-1">
                      <Link
                        to="#"
                        className="flex items-center w-full px-4 py-1.75 rounded-lg text-default  hover:text-primary focus:outline-hidden hover:bg-primary-50 focus:bg-white"
                      >
                        <i className="icon-eye me-2" />
                        View Details
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-pencil-line me-2" />
                        Edit
                      </Link>
                      <Link
                        className="flex items-center hover:bg-primary-50  px-4 py-1.75 rounded-lg text-sm text-default  hover:text-primary focus:outline-hidden focus:bg-white"
                        to="#"
                      >
                        <i className="icon-trash-2 me-2" />
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mb-1">
                Listening to the wind through the trees and watching the clouds
                pass a simple moment that felt surprisingly peaceful
              </p>
              <div className="flex items-center gap-2">
                <Link to="#" className="text-info">
                  #NatureMoments
                </Link>
                <Link to="#" className="text-info">
                  #PeacefulVibes
                </Link>
              </div>
              <div className="my-4">
                <div className="grid grid-cols-12 xl:grid-cols-12 lg:grid-cols-12 gap-6">
                  <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={galleryImages}
                    index={index}
                  />
                  <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 flex">
                    <div className="rounded-lg overflow-hidden group relative">
                      <div
                        className="image-popup h-full"
                        onClick={() => {
                          setIndex(0);
                          setOpen(true);
                        }}
                      >
                        <ImageWithBasePath
                          src={Images.feed_02}
                          alt="generate"
                          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-6 flex gap-3">
                    <div className="flex flex-col gap-3">
                      <div className="rounded-lg overflow-hidden group relative">
                        <div
                          className="image-popup h-full"
                          onClick={() => {
                            setIndex(1);
                            setOpen(true);
                          }}
                        >
                          <ImageWithBasePath
                            src={Images.feed_03}
                            alt="generate"
                            className="w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden group relative">
                        <div
                          className="image-popup h-full"
                          onClick={() => {
                            setIndex(2);
                            setOpen(true);
                          }}
                        >
                          <ImageWithBasePath
                            src={Images.feed_04}
                            alt="generate"
                            className="w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            +05
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
                <div className="flex items-center justify-between gap-5">
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-thumbs-up  " />
                    </span>{" "}
                    54
                  </Link>
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-thumbs-down" />
                    </span>{" "}
                    12
                  </Link>
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-message-square-text" />
                    </span>{" "}
                    98
                  </Link>
                  <Link to="#" className="flex items-center gap-2">
                    {" "}
                    <span className="text-dark text-[16px]">
                      <i className="icon-share-2" />
                    </span>{" "}
                    87
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-5">
                  <Link to="#" className="text-dark flex ">
                    <span className="text-dark text-[16px] hover:text-primary transition">
                      <i className="icon-corner-up-right" />
                    </span>
                  </Link>
                  <Link to="#" className="text-dark flex ">
                    <span className="text-dark text-[16px] hover:text-primary transition">
                      <i className="icon-bookmark" />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white">
                <ImageWithBasePath
                  className="w-8 h-8 rounded-full border border-border-color"
                  src={Images.avatar_01}
                  alt=""
                />
                <div className="flex flex-1 items-center bg-gray-50 border border-gray-200 rounded-full px-1 py-0">
                  <input
                    type="text"
                    placeholder="Write your thoughts..."
                    className="w-full bg-transparent border-0 outline-0 focus:ring-0 text-dark placeholder-gray-400"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white dark:text-dark! hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                    <i className="icon-paperclip" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white dark:text-dark! hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                    <i className="icon-smile" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary transition hover:text-white dark:text-dark! hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                    <i className="icon-send" />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center flex items-center justify-center">
              <Link
                to="#"
                className="btn bg-dark border border-dark text-white text-center inline-flex items-center justify-center gap-x-2 hover:bg-primary-800 hover:border-primary-800 hover:text-white dark:bg-gray-100 dark:border-gray-100"
              >
                <i className="icon-loader" />
                Load More
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* end col */}
        <div className="xl:col-span-3 col-span-12 w-full">
          <div className="sticky t-10 feed-scroll">
            {/* Start People */}
            <div className="border border-border-color rounded-lg bg-white p-5 mb-5">
              <h5 className="mb-4">Peoples</h5>
              {/* Tab Item */}
              <div className="bg-white border border-border-color rounded-lg p-1 flex items-center gap-1 mb-4">
                <nav
                  className="sm:flex gap-1 flex flex-nowrap w-full"
                  aria-label="Tabs"
                  role="tablist"
                  aria-orientation="horizontal"
                >
                  <button
                    type="button"
                    className="btn py-1 px-1 flex items-center justify-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none w-full active"
                    id="tab-12"
                    aria-selected="true"
                    data-hs-tab="#tab-01"
                    aria-controls="tab-01"
                    role="tab"
                  >
                    Messages
                  </button>
                  <button
                    type="button"
                    className="btn py-1 px-1 flex items-center justify-center rounded-lg font-medium text-dark hs-tab-active:bg-primary hs-tab-active:text-white dark:hs-tab-active:text-dark  border-t-2 border-transparent  whitespace-nowrap hover:bg-primary hover:text-white focus:outline-hidden focus:text-white disabled:opacity-50 disabled:pointer-events-none w-full"
                    id="tab-13"
                    aria-selected="false"
                    data-hs-tab="#tab-02"
                    aria-controls="tab-02"
                    role="tab"
                  >
                    Requests
                  </button>
                </nav>
              </div>
              {/* Tab Conetnt */}
              <div className="hs-tab-content">
                {/* Tab 1  */}
                <div id="tab-01" role="tabpanel" aria-labelledby="tab-01">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      name="hs-table-search"
                      className="block w-full py-2 pe-8 pe-3 rounded-lg border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
                      placeholder="Search Agents"
                    />
                    <div className="absolute top-1/2 end-3 -translate-y-1/2 pointer-events-none">
                      <i className="icon-search text-gray-900" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mb-4 w-full">
                    <div className="flex items-center justify-between flex-nowrap xxl:flex-nowrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_11}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Gerald Horton
                          </span>{" "}
                          @gerald225
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        02
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-nowrap xxl:flex-nowrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_12}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Marie Osborn
                          </span>{" "}
                          @marie157
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        04
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-nowrap xxl:flex-nowrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_13}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Edward Pelton
                          </span>{" "}
                          @edward882
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        01
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-nowrap xxl:flex-nowrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_14}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Emery Holt
                          </span>{" "}
                          @emery034
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        08
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-nowrap xxl:flex-nowrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_18}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Rafael Krehbiel
                          </span>{" "}
                          @rafael921
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        07
                      </p>
                    </div>
                  </div>
                </div>
                {/* Tab 2  */}
                <div
                  id="tab-02"
                  role="tabpanel"
                  className="hidden"
                  aria-labelledby="tab-02"
                >
                  <div className="relative mb-4">
                    <input
                      type="text"
                      name="hs-table-search"
                      className="block w-full py-2 pe-8 pe-3 rounded-lg border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
                      placeholder="Search Agents"
                    />
                    <div className="absolute top-1/2 end-3 -translate-y-1/2 pointer-events-none">
                      <i className="icon-search text-gray-900" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mb-4 w-full">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_16}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Jack Michalak
                          </span>{" "}
                          @jack225
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        02
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_17}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Ryan Cooper
                          </span>{" "}
                          @ryan345
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        04
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_18}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Sarah John
                          </span>{" "}
                          @sarah021
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        01
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_19}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Daniel Kim
                          </span>{" "}
                          @daniel124
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        08
                      </p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <ImageWithBasePath
                          className="w-10 h-10 rounded-full border border-border-color"
                          src={Images.avatar_20}
                          alt="avatar"
                        />
                        <p className="flex flex-col text-xs gap-0.5">
                          <span className="text-dark font-medium text-sm">
                            Edward Peltonn
                          </span>{" "}
                          @edward543
                        </p>
                      </div>
                      <p className="w-6 h-6 flex items-center justify-center bg-light border border-border-color text-gray-600 text-xs rounded-full">
                        07
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="#"
                className="btn bg-dark border border-dark text-white text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white dark:bg-gray-100 dark:border-gray-100"
              >
                View All <i className="icon-chevron-right" />
              </Link>
            </div>
            {/* End People */}
            {/* Start People */}
            <div className="border border-border-color rounded-lg bg-white p-5">
              <h5 className="mb-4 flex items-center justify-between gap-2 flex-wrap">
                Special Deals{" "}
                <Link to="#" className="text-dark text-[20px]">
                  <i className="icon-x" />
                </Link>{" "}
              </h5>
              <div className="bg-light border border-border-color rounded-lg flex justify-center mb-4">
                <ImageWithBasePath src={Images.feed_05} alt="feed" />
              </div>
              <div className="mb-4">
                <h6 className="mb-2 text-sm">Special offer: 20% off today</h6>
                <p>Comfort meets style for everyday wear</p>
              </div>
              <Link
                to="#"
                className="btn bg-dark border border-dark text-white text-center inline-flex items-center justify-center gap-x-2 w-full hover:bg-primary-800 hover:border-primary-800 hover:text-white dark:bg-gray-100 dark:border-gray-100"
              >
                Learn More <i className="icon-chevron-right" />
              </Link>
            </div>
            {/* End People */}
          </div>
        </div>{" "}
        {/* end col */}
      </div>
      {/* End grid */}
    </div>
  );
};

export default SocialFeed;
