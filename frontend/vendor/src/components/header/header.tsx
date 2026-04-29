import ImageWithBasePath from "../image-with-base-path";
import { Images } from "../../utils/imagePath";
import { useEffect } from "react";
import { Link } from "react-router";
import { Path } from "../../routes/path";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleMinisidebar, toggleMobileMenu } from "../../redux/uiSlice";
import { toggleTheme } from "../../redux/themeSlice";
import { DropdownMenu } from "../dropdown-menu/dropdownMenu";

const Header = () => {

  const dispatch = useAppDispatch();
  const { isMinisidebarActive, isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const { darkMode } = useAppSelector((state) => state.theme);
  const activeLayout = useAppSelector((state) => state.layout.activeLayout);
  const routes = Path;

  useEffect(() => {
    if (activeLayout !== "default") {
      return;
    }
    if (isMinisidebarActive) {
      document.body.classList.add("mini-sidebar");
    } else {
      document.body.classList.remove("mini-sidebar");
    }
  }, [isMinisidebarActive, activeLayout]);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const sidebarOverlay = document.querySelector(".sidebar-overlay");
    const mainWrapper = document.querySelector(".main-wrapper");

    if (isMobileMenuOpen) {
      htmlElement.classList.add("menu-opened");
      sidebarOverlay?.classList.add("opened");
      mainWrapper?.classList.add("slide-nav");
    } else {
      htmlElement.classList.remove("menu-opened");
      sidebarOverlay?.classList.remove("opened");
      mainWrapper?.classList.remove("slide-nav");
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleToggleSidebar = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const body = document.body;
    const html = document.documentElement;
    const isMini = body.classList.contains("mini-sidebar");
    const isFullWidth = html.getAttribute("data-layout") === "full-width";
    const isHidden = html.getAttribute("data-layout") === "hidden";

    if (isMini) {
      body.classList.remove("mini-sidebar");
      localStorage.setItem("screenModeNightTokenState", "night");
      requestAnimationFrame(() => {
        document.querySelectorAll(".header-left").forEach((el) => {
          el.classList.add("active");
        });
      });
    } else {
      body.classList.add("mini-sidebar");
      localStorage.removeItem("screenModeNightTokenState");
      requestAnimationFrame(() => {
        document.querySelectorAll(".header-left").forEach((el) => {
          el.classList.remove("active");
        });
      });
    }

    // If html has data-layout="full-width", apply full-width class to body
    if (isFullWidth) {
      body.classList.add("full-width");
      body.classList.remove("mini-sidebar");
      const sidebarOverlay = document.querySelector(".sidebar-overlay");
      if (sidebarOverlay) sidebarOverlay.classList.add("opened");
    } else {
      body.classList.remove("full-width");
    }

    // If html has data-layout="hidden", apply hidden-layout class to body
    if (isHidden) {
      body.classList.toggle("hidden-layout");
      body.classList.remove("mini-sidebar");
    }

    // Also dispatch to keep Redux state in sync
    dispatch(toggleMinisidebar());
  };

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };
  return (
    <>
      <>
        {/* Topbar Start */}
        <header className="navbar-header">
          <div className="topbar-menu flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <Link to={routes.dashboard} className="logo">
                {/* Logo Normal */}
                <span className="logo-light">
                  <span className="logo-lg">
                    <ImageWithBasePath src={Images.logo} alt="logo" />
                  </span>
                  <span className="logo-sm">
                    <ImageWithBasePath src={Images.logosmall} alt="small logo" />
                  </span>
                </span>
                {/* Logo Dark */}
                <span className="logo-dark">
                  <span className="logo-lg">
                    <ImageWithBasePath src={Images.logowhitesvg} alt="dark logo" />
                  </span>
                </span>
              </Link>
              {/* Sidebar Toggle Button */}
              <button
                className={`sidenav-toggle-btn topbar-link size-9 text-[20px] items-center justify-center rounded-full ${!document.body.classList.contains("mini-sidebar") ? "active" : ""}`}
                id="toggle_btn"
                onClick={(e) => handleToggleSidebar(e)}
              >
                <i className="ph-duotone ph-arrow-left" />
              </button>
              {/* Sidebar Mobile Button */}
              <button
                id="mobile_btn"
                className="mobile-btn"
                onClick={handleMobileMenuToggle}
              >
                <i className="ph-duotone ph-list" />
              </button>
              {/* Search */}
              <div className="header-search hidden lg:block">
                <div className="relative">
                  <input
                    type="text"
                    className="ps-3 pe-12 py-1.5 h-9.5 bg-(--topbar-input-bg) border border-(--topbar-input-border) text-(--topbar-input-color) rounded-lg focus:border-(--topbar-input-border) placeholder:(-topbar-input-placeholder) focus:ring-0"
                    placeholder="Search Agents or Tools..."
                    autoComplete="off"
                    id="searchInput"
                  />
                  <button
                    type="button"
                    className="cursor-pointer w-9 p-1 text-xs gap-1 bg-(--topbar-input-bg) border border-(--topbar-input-border) text-(--topbar-input-icon) flex items-center justify-center absolute end-1.5 top-1/2 -translate-y-1/2 rounded-lg"
                    id="shortcutHint"
                  >
                    <i id="shortcutIcon" className="icon-command" /> K
                  </button>
                </div>
              </div>
              {/* Dropdown */}
              <DropdownMenu
                className="header-dropdown"
                ariaLabel="AI Studio menu"
                trigger={
                  <>
                    AI Studio
                    <i className="icon-chevron-down ms-1" />
                  </>
                }
                triggerClassName="text-gray-900 text-[13px] font-medium inline-flex items-center hover:text-primary cursor-pointer border-0 bg-transparent p-0"
                menuClassName="absolute right-0 top-full min-w-50 max-w-95 cw-95 p-5 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              >
                <div className="mb-5">
                  <h6 className="text-base font-bold  mb-1">AI Studio</h6>
                  <p className="mb-0">
                    Create AI powered images, videos, audio, text, and voice
                    content.
                  </p>
                </div>
                <div className="max-h-[calc(100vh-200px)] notifi-scroll" data-simplebar="">
                  <div className="space-y-2">
                    <Link
                      to={routes.imageGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-google-photos-logo" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Image Generator
                        </p>
                        <p className="text-[13px] mb-0">
                          Turn ideas into stunning images instantly.
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.videoGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-video" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Video Generator
                        </p>
                        <p className="text-[13px] mb-0">
                          Craft compelling videos effortlessly.
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.audioGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-file-audio" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Audio Generator
                        </p>
                        <p className="text-[13px] mb-0">
                          Generate high quality audio with ease.
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.textGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-google-photos-logo" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Text Generator
                        </p>
                        <p className="text-[13px] mb-0">
                          Write impactful content in seconds.
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.voiceGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-user-sound" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Voice Generator
                        </p>
                        <p className="text-[13px] mb-0">
                          Create realistic voice output from text.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </DropdownMenu>
              {/* Dropdown */}
              <DropdownMenu
                className="header-dropdown"
                ariaLabel="AI Tools menu"
                trigger={
                  <>
                    AI Tools
                    <i className="icon-chevron-down ms-1" />
                  </>
                }
                triggerClassName="text-gray-900 text-[13px] font-medium inline-flex items-center hover:text-primary cursor-pointer border-0 bg-transparent p-0"
                menuClassName="absolute right-0 top-full min-w-50 max-w-95 cw-95 p-5 bg-white border border-border-color shadow rounded-lg mt-2 z-1"
              >
                <div className="mb-5">
                  <h6 className="text-base font-bold  mb-1">AI Tools</h6>
                  <p className="mb-0">
                    Create a Unlimited Flyer / Brochure, PowerPoint, Proposal,
                    Resume, Document.
                  </p>
                </div>
                <div className="max-h-[calc(100vh-200px)] notifi-scroll" data-simplebar="">
                  <div className="space-y-2">
                    <Link
                      to={routes.flyerGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-file-dashed" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Flyer / Brochure
                        </p>
                        <p className="text-[13px] mb-0">
                          Create flyers and brochures instantly.
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.presentationGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-microsoft-powerpoint-logo" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          PowerPoint
                        </p>
                        <p className="text-[13px] mb-0">
                          Create polished PowerPoint slides{" "}
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.proposalGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-files" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Proposal
                        </p>
                        <p className="text-[13px] mb-0">
                          Build ready to send proposals fast.
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.resumeGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-user-list" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Resume / Cover Letter{" "}
                        </p>
                        <p className="text-[13px] mb-0">
                          Build job ready resumes and cover letters
                        </p>
                      </div>
                    </Link>
                    <Link
                      to={routes.policyGenerator}
                      className="bg-white border border-border-color p-3 rounded-lg flex items-center hover:bg-primary-50 group"
                    >
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-50 text-primary text-xl group-hover:bg-white me-2">
                        <i className="ph-duotone ph-flag-banner-fold" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark group-hover:text-primary mb-1">
                          Policy Document
                        </p>
                        <p className="text-[13px] mb-0">
                          Create professional policy documents
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={routes.pricing}
                className="btn lg:inline-flex items-center border border-transparent 
      [background-image:var(--background-image-primary-gradient),var(--background-image-linear-gradient-100)] 
      [background-clip:padding-box,border-box]  bg-origin-border
      text-white transition-opacity hover:opacity-90 hidden me-2"
              >
                <i className="ph ph-crown-simple me-2" />
                Upgrade
              </Link>
              {/* Expand Dropdown */}
              <div className="header-item hidden lg:block">
                <button
                  type="button"
                  className="topbar-link items-center justify-center btnFullscreen"
                  onClick={handleFullscreenToggle}
                >
                  <i className="ph-duotone ph-corners-out" />
                </button>
              </div>
              {/* Light/Dark Mode Button */}
              <div className="header-item">
                <button
                  className="topbar-link items-center justify-center light-dark-mode"
                  type="button"
                  onClick={handleThemeToggle}
                >
                  <i className={`ph-duotone ${darkMode ? 'ph-sun' : 'ph-moon'}`} />
                </button>
              </div>
              {/* Notification Dropdown */}
              <DropdownMenu
                className="header-item header-notifi hidden lg:block"
                ariaLabel="Notifications"
                closeOnMenuInteract={false}
                trigger={
                  <>
                    <i className="ph-duotone ph-bell" />
                    <span className="block bg-danger size-1.75 absolute top-2.5 end-3 rounded-full" />
                  </>
                }
                triggerClassName="topbar-link relative items-center justify-center"
                menuClassName="absolute right-0 top-full min-w-102 p-5 bg-white border border-border-color shadow rounded-lg mt-2 z-1 notification-dropdown"
              >
    <div className="flex items-center justify-between border-b border-border-color pb-3">
      <h6>Notifications</h6>
      <div
        className="border border-border-color rounded-lg flex items-center gap-1 p-1"
        role="tablist"
      >
        <a
          href="#"
          className="hs-tab-active:bg-light hs-tab-active:text-primary block py-1 px-2 text-gray-900 rounded-lg font-medium hover:bg-light hover:text-primary active"
          aria-selected="true"
          data-hs-tab="#all"
          role="tab"
          aria-controls="all"
        >
          All{" "}
        </a>
        <a
          href="#"
          className="hs-tab-active:bg-light hs-tab-active:text-primary block py-1 px-2 text-gray-900 rounded-lg font-medium hover:bg-light hover:text-primary"
          aria-selected="false"
          data-hs-tab="#unread"
          role="tab"
          aria-controls="unread"
        >
          Unread
        </a>
      </div>
    </div>
    <div data-simplebar="">
      <div id="all" role="tabpanel">
        <div className="divide-y divide-border-color notifi-scroll pt-3">
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_02}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-bot" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Jack Michalak</span>{" "}
                updated agent settings
              </p>
              <p className="text-[13px] mb-0">Just Now</p>
            </div>
            <a
              href="#"
              className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
              aria-label="Mark as Read"
            />
          </div>
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_03}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-key-round" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Lara Curtin</span>{" "}
                generated a new API key
              </p>
              <p className="text-[13px] mb-0">10 min ago</p>
            </div>
            <a
              href="#"
              className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
              aria-label="Mark as Read"
            />
          </div>
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_04}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-bot" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Brian Fulton</span>{" "}
                requested access to AI agent
              </p>
              <p className="text-[13px] mb-0">2 hours ago</p>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="#"
                  className="inline-flex items-center btn-xsmall bg-danger border border-danger text-white  hover:bg-danger-800 hover:border-danger-800 hover:text-white dark:text-white"
                >
                  <i className="icon-x me-1" />
                  Decline
                </a>
                <a
                  href="#"
                  className="inline-flex items-center btn-xsmall bg-success border border-success text-white  hover:bg-success-800 hover:border-success-800 hover:text-white dark:text-white"
                >
                  <i className="icon-check-check me-1" />
                  Accept
                </a>
              </div>
            </div>
            <a
              href="#"
              className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
              aria-label="Mark as Read"
            />
          </div>
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_05}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-play" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Leona Daniels</span>{" "}
                ran a test execution
              </p>
              <p className="text-[13px] mb-0">5 hours ago</p>
            </div>
          </div>
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_06}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-bot" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Roger Tucker</span>{" "}
                paused an agent workflow
              </p>
              <p className="text-[13px] mb-0">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
      <div id="unread" className="hidden" role="tabpanel">
        <div className="divide-y divide-border-color pt-3">
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_03}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-key-round" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Lara Curtin</span>{" "}
                generated a new API key
              </p>
              <p className="text-[13px] mb-0">10 min ago</p>
            </div>
            <a
              href="#"
              className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
              aria-label="Mark as Read"
            />
          </div>
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_02}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-bot" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Jack Michalak</span>{" "}
                updated agent settings
              </p>
              <p className="text-[13px] mb-0">Just Now</p>
            </div>
            <a
              href="#"
              className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
              aria-label="Mark as Read"
            />
          </div>
          {/* Item*/}
          <div className="notification-item relative flex py-3 pe-7 cursor-pointer">
            <div className="relative size-10 shrink-0 me-2">
              <ImageWithBasePath
                src={Images.avatar_04}
                className="rounded-full border border-border-color"
                alt="user"
              />
              <span className="bg-primary-50 w-4 rounded-full absolute end-0 bottom-0 flex items-center justify-center text-[10px] text-primary">
                <i className="icon-bot" />
              </span>
            </div>
            <div>
              <p className="mb-1">
                <span className="text-gray-900 font-medium">Brian Fulton</span>{" "}
                requested access to AI agent
              </p>
              <p className="text-[13px] mb-0">2 hours ago</p>
              <div className="flex items-center gap-2 mt-2">
                <a
                  href="#"
                  className="inline-flex items-center btn-xsmall bg-danger border border-danger text-white  hover:bg-danger-800 hover:border-danger-800 hover:text-white dark:text-white"
                >
                  <i className="icon-x me-1" />
                  Decline
                </a>
                <a
                  href="#"
                  className="inline-flex items-center btn-xsmall bg-success border border-success text-white  hover:bg-success-800 hover:border-success-800 hover:text-white dark:text-white"
                >
                  <i className="icon-check-check me-1" />
                  Accept
                </a>
              </div>
            </div>
            <a
              href="#"
              className="size-1.5 rounded-full bg-danger absolute end-3 top-5"
              aria-label="Mark as Read"
            />
          </div>
        </div>
      </div>
    </div>
    <div className="pt-3 border-t border-border-color text-center">
      <a href="#" className="text-center font-medium hover:text-primary">
        View All
      </a>
    </div>
              </DropdownMenu>

              {/* Mail Button */}
              <div className="header-item hidden lg:block">
                <Link
                  to={routes.chat}
                  className="topbar-link relative items-center justify-center"
                >
                  <i className="ph-duotone ph-chat-circle" />
                  <span className="block bg-success size-1.75 absolute top-2.5 end-3 rounded-full" />
                </Link>
              </div>
              {/* User Dropdown */}
              <DropdownMenu
                className="profile-dropdown"
                ariaLabel="User menu"
                trigger={
                  <>
                    <ImageWithBasePath
                      src={Images.avatar_01}
                      className="rounded-full border border-border-color"
                      alt="user-image"
                    />
                    <span className="bottom-0 end-1 absolute size-2 bg-success border border-white rounded-full" />
                  </>
                }
                triggerClassName="relative size-10 text-base flex items-center justify-center rounded-full lg:ms-4 border-0 bg-transparent p-0 cursor-pointer"
                menuClassName="absolute right-0 top-full min-w-50 p-5 bg-white border border-border-color shadow rounded-lg mt-2 z-1 divide-y divide-border-color"
              >
                <div className="flex items-center pb-3">
                  <div className="size-10 rounded-full relative me-2">
                    <ImageWithBasePath
                      src={Images.avatar_01}
                      className="rounded-full border border-border-color"
                      alt="user-image"
                    />
                    <span className="bottom-0 end-1 absolute size-2 bg-success border border-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark mb-1">
                      Marilyn Trosclair
                    </p>
                    <p className="text-[13px] mb-0">maryilyn@example.com</p>
                  </div>
                </div>
                <div className="py-3 space-y-1">
                  <Link
                    to={routes.profile}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  >
                    <i className="ph-duotone ph-user-circle text-base me-2" />
                    View Profile
                  </Link>
                  <Link
                    to={routes.allGenerators}
                    className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  >
                    <i className="ph-duotone ph-drone text-base me-2" />
                    AI Studio
                  </Link>
                  <Link
                    to={routes.agents}
                    className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  >
                    <i className="ph-duotone ph-scroll text-base me-2" />
                    Design Agents
                  </Link>
                  <Link
                    to={routes.generalSettings}
                    className="flex items-center px-4 py-2 rounded-lg text-sm text-gray-900 hover:bg-primary-50 hover:text-primary focus:outline-hidden focus:bg-white"
                  >
                    <i className="ph-duotone ph-gear-six text-base me-2" />
                    Settings
                  </Link>
                </div>
                <div className="pt-3">
                  <Link
                    to={routes.login}
                    className="flex items-center px-4 py-1.75 rounded-lg text-sm text-danger hover:bg-primary-50 focus:outline-hidden focus:bg-white"
                  >
                    <i className="ph-duotone ph-sign-out text-base me-2" />
                    Logout
                  </Link>
                </div>
              </DropdownMenu>
            </div>
          </div>
        </header>
        {/* Topbar End */}
      </>
    </>
  );
};

export default Header;
