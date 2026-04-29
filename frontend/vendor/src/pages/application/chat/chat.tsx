
import { useState } from 'react'
import ImageWithBasePath from '../../../components/image-with-base-path'
import { Images } from '../../../utils/imagePath'
import { Link } from "react-router-dom";
import { Path } from "../../../routes/path";
const Chat = () => {
    const [chatdm, setchatdm] = useState(false);
const openDm = () => setchatdm(true);
const closeDm = () => setchatdm(false);
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
            Chat
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* End Breadcrumb */}
  {/* Start grid */}
  <div className="chat-wrapper flex gap-6 w-full relative">
    {/* Chats sidebar */}
    <div className={`sidebar-group bg-white border border-border-color rounded-lg w-full xl:w-[340px]! shrink-0 chat-user-nav ${chatdm?'hidden':''}`}>
      <div
        id="chats"
        className="sidebar-content active overflow-x-hidden"
        data-simplebar=""
      >
        <div
          className="w-full xl:w-[340px]! overflow-x-hidden"
          data-simplebar=""
        >
          <div className="chat-search-header p-5 border-b border-border-color">
            <div className="header-title flex items-center justify-between">
              <h4 className="mb-3 text-[16px]">Chats</h4>
            </div>
            {/* Chat Search */}
            <div className="search-wrap">
              <form>
                <div className="relative">
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full py-2 ps-8 pe-3 rounded-full border border-border-color bg-white text-gray-900 placeholder-gray-400 focus:ring-0"
                    placeholder="Search Agents"
                  />
                  <div className="absolute top-1/2 start-3 -translate-y-1/2 pointer-events-none flex">
                    <i className="icon-search text-gray-600" />
                  </div>
                </div>
              </form>
            </div>
            {/* /Chat Search */}
          </div>
          {/* Start Users */}
          <div className="sidebar-body chat-body p-5" id="chatsidebar">
            <div className="chat-users-wrap flex flex-col gap-4">
              {/* User Item 1 */}
              <div className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition" onClick={openDm}>
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_02}
                    alt="Jack Michalak"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Jack Michalak
                    </h4>
                    <span className="text-xs text-gray-500 truncate">
                      Typing...
                    </span>
                  </div>
                  <div className="items-center text-end">
                    <p className="text-xs text-gray-600 mb-1">09:20 AM</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 2 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_01}
                    alt="Lara Curtin"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Lara Curtin
                    </h4>
                    <span className="text-xs text-gray-500 truncate">
                      Awesome, thanks!
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-1">5 mins ago</p>
                    <div className="flex items-center justify-center w-4 h-4 ml-auto rounded-full bg-dark text-white dark:text-white! text-[10px] font-medium leading-0">
                      2
                    </div>
                  </div>
                </div>
              </div>
              {/* User Item 3 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_03}
                    alt="Brian Fulton"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Brian Fulton
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      {" "}
                      <i className="icon-image me-1 text-sm" /> Image
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-1">5 mins ago</p>
                    <span className="text-gray-600 flex items-center justify-end text-[16px]">
                      <i className="icon-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 4 */}
              <div  onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_04}
                    alt="Trudy Heintz"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Trudy Heintz
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      {" "}
                      <i className="icon-phone-missed me-1 text-sm" /> Missed
                      Call
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">10 mins ago</p>
                  </div>
                </div>
              </div>
              {/* User Item 5 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                   src={Images.avatar_06}
                    alt="Roger Tucker"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Roger Tucker
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      {" "}
                      Pease check the design..
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">yesterday</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 6 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_05}
                    alt="Leona Daniels"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Leona Daniels
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      {" "}
                      <i className="icon-phone-missed me-1 text-sm" /> Missed
                      Call
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">yesterday</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 7 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_07}
                    alt="William Bailey"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      William Bailey
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      {" "}
                      Shall I submit tomorrow...
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">12 Jan2026</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 8 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_08}
                    alt="Doris Hiller"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Doris Hiller
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      <i className="icon-phone-missed me-1 text-sm" />
                      Audio Call
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">12 Jan2026</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 9 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_09}
                    alt="Frank Hidalgo"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-warning border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Frank Hidalgo
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      {" "}
                      Complete the pages...
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">11 Jan2026</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
              {/* User Item 10 */}
              <div onClick={openDm} className="user-item flex items-center gap-3 p-3 bg-white border border-border-color rounded-lg w-full hover:shadow-lg transition">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_10}
                    alt="Allison Mayne"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="items-baseline">
                    <h4 className="text-sm font-medium text-dark truncate mb-1">
                      Allison Mayne
                    </h4>
                    <span className="text-xs text-gray-500 truncate flex items-center">
                      <i className="icon-mic me-1 text-sm" />
                      Audio
                    </span>
                  </div>
                  <div className="text-end">
                    <p className="text-xs text-gray-600 mb-0">10 Jan2026</p>
                    <span className="text-success flex items-center justify-end text-[16px]">
                      <i className="icon-check-check" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Users */}
        </div>
      </div>
    </div>
    {/* / Chats sidebar */}
    {/* Start Chat */}
    <div
      className={`chat chat-messages  bg-white border border-border-color rounded-lg w-full ${chatdm?'show':'hide-chatbar'}`}
      id="middle"
    >
      <div>
        {/* Chat Header */}
        <div className="chat-header border-b border-border-color p-5">
          <div className="bg-light border border-border-color px-4 py-3 rounded-sm md:rounded-full flex flex-wrap gap-3 items-center justify-between">
            <div className="user-details flex items-center  gap-3">
              <div className="xl:hidden block">
                <Link className="text-muted chat-close" to="#" onClick={closeDm}>
                  <i className="icon-arrow-left" />
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <ImageWithBasePath
                    src={Images.avatar_02}
                    alt="Jack Michalak"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div className="flex justify-between items-center w-full flex-wrap gap-3">
                  <h4 className="text-[16px] font-bold text-dark truncate mb-0 flex items-center flex-wrap gap-2">
                    Jack Michalak
                    <span className="inline-flex mb-0 items-center badge rounded-lg text-xs font-medium bg-success-50 text-success border border-success">
                      {" "}
                      <span className="w-1.5 h-1.5 bg-success rounded-full block me-2" />{" "}
                      Online
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="chat-options flex items-center gap-3">
              {/* Drop Down */}
              <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                <button
                  type="button"
                  className="hs-dropdown-toggle cursor-pointer  w-8 h-8 rounded-full bg-white text-dark border border-border-color hover:bg-primary dark:text-dark! transition hover:text-white dark:text-white flex items-center justify-center focus:text-dark focus:bg-white focus:outline-hidden"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <i className="icon-ellipsis-vertical" />
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-9"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="p-2 space-y-1">
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-volume-off me-2" />
                      Muted Notification
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-clock me-2" />
                      Disappearing Message
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-circle-x me-2" />
                      Clear Message
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-trash-2 me-2" />
                      Delete Chat
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-blocks me-2" />
                      Block
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Chat Body */}
        <div className="chat-body chat-page-group p-5" data-simplebar="">
          <div className="messages">
            {/* Chat Messages left 1 */}
            <div className="chats flex items-start gap-2 ">
              <div className="chat-avatar shrink-0">
                <ImageWithBasePath
                  src={Images.avatar_02}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-bl-none mb-1.5">
                    Hi John, I wanted to update you on a new company policy
                    regarding remote work.
                  </div>
                  <p className="text-xs mb-0">08:40 PM</p>
                </div>
              </div>
            </div>
            {/*/Chat Messages left 1 */}
            {/* Line */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="flex-none mx-4 px-4 py-1 bg-light text-dark text-xs font-medium rounded-full">
                Today
              </span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            {/* Line */}
            {/* Chat Messages Right 1 */}
            <div className="chats chats-right flex items-start justify-end gap-2 mb-6">
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-br-none mb-1.5">
                    Hi John, I wanted to update you on a new company policy
                    regarding remote work.
                  </div>
                  <p className="text-xs mb-0 flex items-center justify-end  gap-2">
                    <i className="icon-check-check text-succes text-[16px]" />
                    09:00 PM
                  </p>
                </div>
              </div>
              <div className="chat-avatar shrink-0">
                <ImageWithBasePath
                  src={Images.avatar_01}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </div>
            </div>
            {/*/Chat Messages Right 1 */}
            {/* Chat Messages left 2 */}
            <div className="chats flex items-start gap-2 mb-6">
              <div className="chat-avatar shrink-0">
                <ImageWithBasePath
                  src={Images.avatar_02}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-bl-none mb-1.5">
                    Oh yeah, I noticed that too. I was thinking of shrinking
                    them a bit.
                  </div>
                  <p className="text-xs mb-0">09:01 AM</p>
                </div>
              </div>
            </div>
            {/*/Chat Messages left 1 */}
            {/* Chat Messages Right 2 */}
            <div className="chats chats-right flex items-start justify-end gap-2 mb-6">
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-br-none mb-1.5">
                    Good idea. Also, the “Export” button feels kinda hidden.
                    Maybe make it more visible?
                  </div>
                  <p className="text-xs mb-0 flex items-center justify-end  gap-2">
                    <i className="icon-check-check text-succes text-[16px]" />
                    09:03 PM
                  </p>
                </div>
              </div>
              <div className="chat-avatar shrink-0">
                <ImageWithBasePath
                  src={Images.avatar_01}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0 block"
                />
              </div>
            </div>
            {/*/Chat Messages Right 2 */}
            {/* Chat Messages left 3 */}
            <div className="chats flex items-start gap-2 mb-6">
              <div className="chat-avatar shrink-0">
                <ImageWithBasePath
                  src={Images.avatar_07}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-bl-none mb-1.5">
                    Agreed. I’ll try a brighter color and see how it looks.
                  </div>
                  <p className="text-xs mb-0">09:05 AM</p>
                </div>
              </div>
            </div>
            {/*/Chat Messages left 3 */}
            {/* Chat Messages Right 4 */}
            <div className="chats chats-right flex items-start justify-end gap-2 mb-6">
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-br-none mb-1.5">
                    Cool. By the way, did you test it on mobile yet?
                  </div>
                  <p className="text-xs mb-0 flex items-center justify-end  gap-2">
                    <i className="icon-check-check text-succes text-[16px]" />
                    09:03 PM
                  </p>
                </div>
              </div>
              <div className="chat-avatar">
                <ImageWithBasePath
                  src={Images.avatar_01}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </div>
            </div>
            {/*/Chat Messages Right 4 */}
            {/* Chat Messages left 4 */}
            <div className="chats flex items-start gap-2 ">
              <div className="chat-avatar shrink-0">
                <ImageWithBasePath
                  src={Images.avatar_02}
                  alt="Jack Michalak"
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              </div>
              <div className="chat-content">
                <div className="chat-info">
                  <div className="message-content bg-light p-3 border border-border-color rounded-lg rounded-bl-none mb-1.5">
                    Typing...
                  </div>
                </div>
              </div>
            </div>
            {/*/Chat Messages left 4 */}
          </div>
        </div>
      </div>
      {/* Start Chat Footer */}
      <div className="chat-footer px-2 sm:px-5 pb-5">
        <form className="footer-form mt-6 pt-6 border-t border-border-color">
          <div className="flex items-center w-full p-2 mx-auto bg-light rounded-full border border-border-color">
            <div className="flex items-center space-x-1 px-0 sm:px-2">
              <div className="hs-dropdown [--placement:bottom-right] [--auto-close:inside] relative inline-flex">
                <button
                  type="button"
                  className="hs-dropdown-toggle cursor-pointer  w-8 h-8 rounded-full bg-white text-dark dark:text-dark! border border-border-color hover:bg-primary transition hover:text-white dark:text-white flex items-center justify-center focus:text-dark focus:bg-white focus:outline-hidden"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <i className="icon-ellipsis-vertical" />
                </button>
                <div
                  className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-50 bg-white border border-border-color shadow rounded-lg mt-2 z-9"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="p-2 space-y-1">
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-camera me-2" />
                      Camera
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-image me-2" />
                      Gallery
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-headphones me-2" />
                      Audio
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-map-pin me-2" />
                      Location
                    </Link>
                    <Link
                      to="#"
                      className="flex items-center px-4 py-1.75 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                    >
                      <i className="icon-contact me-2" />
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white text-dark dark:text-dark! border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                <i className="icon-smile" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white text-dark dark:text-dark! border border-border-color hover:bg-primary transition hover:text-white hover:border-primary dark:text-white flex items-center justify-center cursor-pointer">
                <i className="icon-mic" />
              </button>
            </div>
            <div className="h-4 w-px bg-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Type your message here..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-500 px-2 outline-none"
            />
            <button className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-primary cursor-pointer hover:bg-primary-800 text-white rounded-full text-sm sm:text-[20px] transition-all ml-2 shrink-0">
              <i className="icon-send" />
            </button>
          </div>
        </form>
      </div>
      {/* End Chat Footer */}
    </div>
    {/* Start Chat */}
  </div>
  {/* End grid */}
</div>

  )
}

export default Chat