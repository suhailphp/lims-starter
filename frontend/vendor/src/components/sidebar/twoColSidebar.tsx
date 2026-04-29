import { Link, useLocation } from "react-router-dom";
import ImageWithBasePath from "../image-with-base-path";
import { Images } from "../../utils/imagePath";
import React, { useEffect, useState } from "react";
import { Path } from "../../routes/path";
import { sidebarData } from "../../utils/json/sidebarData";
import type { SidebarDataType, SidebarMenuItem } from "../../types/types";
import HSStaticMethods from "preline";
import CreditChart from "./creditChart";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { closeMobileMenu } from "../../redux/uiSlice";

const TwoColSidebar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const routes = Path;
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const sidebarTwoColRef = React.useRef<HTMLDivElement | null>(null);
const toggleMenu = (key: string) => {
  setOpenMenus((prev) => {
    // if already open → close it
    if (prev[key]) {
      return {};
    }

    // open only this one, close others
    return { [key]: true };
  });
};

const isLayoutPage = () => {
  const layoutPaths = [
    Path.layoutMini,
    Path.layoutHoverview,
    Path.layoutFullwidth,
  ];
  return layoutPaths.some(path => location.pathname === path);
};

  useEffect(() => {
    // Initialize Preline components after component mounts
    HSStaticMethods.autoInit();

    // Remove expand-menu class if not on a layout page
    if (!isLayoutPage()) {
      document.body.classList.remove('expand-menu');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      if (sidebarTwoColRef.current?.contains(target)) {
        return;
      }

      handleCloseSidebar();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const isActive = (item: SidebarMenuItem) => {
    // Check exact match for main link
    if (item.link && location.pathname === item.link) {
      return true;
    }
    
    // Check relativeLink (starts with) - handle both string and array
    if (item.relativeLink) {
      if (Array.isArray(item.relativeLink)) {
        if (item.relativeLink.some(link => location.pathname.startsWith(link))) {
          return true;
        }
      } else if (location.pathname.startsWith(item.relativeLink)) {
        return true;
      }
    }
    
    // Check childLink for backward compatibility (starts with)
    if (item.childLink && location.pathname.startsWith(item.childLink)) {
      return true;
    }
    
    return false;
  };

  const hasActiveLink = (items: SidebarMenuItem[]): boolean =>
    items.some((item) => {
      // Use the same logic as isActive function
      if (isActive(item)) {
        return true;
      }
      
      // Check submenu items recursively
      if (item.submenu) {
        return hasActiveLink(item.submenu);
      }
      
      return false;
    });

  const isTabActive = (item: SidebarDataType) =>
    item.submenuSections.some((section) => hasActiveLink(section.items));

  const handleCloseSidebar = () => {
    const html = document.documentElement;
    const isFullWidth = html.getAttribute("data-layout") === "full-width";

    // For full-width layout, remove full-width class and close overlay
    if (isFullWidth) {
      document.body.classList.remove('full-width');
      const sidebarOverlay = document.querySelector(".sidebar-overlay");
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove("opened");
      }
    }
    // For other layout pages, remove expand-menu class
    else if (isLayoutPage()) {
      document.body.classList.remove('expand-menu');
    }
    // Also close mobile menu for other layouts
    dispatch(closeMobileMenu());
  };

  const renderMenuItem = (
    item: SidebarMenuItem,
    index: number,
    depth = 0,
  ): React.ReactNode => {
    
    const hasChildren = item.submenu?.length;
    const itemKey = `${item.label}-${depth}-${index}`;
    const isOpen = openMenus[itemKey];
     const isChildActive = (submenu?: SidebarMenuItem[]): boolean => {
    return submenu?.some((sub) => {
      if (sub.link === location.pathname) return true;

      if (sub.submenu) {
        return isChildActive(sub.submenu);
      }

      return false;
    }) || false;
  };

  const activeChild = isChildActive(item.submenu);

  const isActive = (item: SidebarMenuItem): boolean => {
    if (item.link && location.pathname === item.link) return true;
      if (item.relativeLink) {
    if (Array.isArray(item.relativeLink)) {
      if (
        item.relativeLink.some((link) =>
          location.pathname.startsWith(link)
        )
      ) {
        return true;
      }
    } else {
      if (location.pathname.startsWith(item.relativeLink)) {
        return true;
      }
    }
  }
    if (item.submenu) return isChildActive(item.submenu);
    return false;
  };

  const activeItem = isActive(item);
    

    if (hasChildren) {
      return (
        <li className="submenu" key={itemKey}>
          <a
            href="#"
             className={`relative flex items-center 
          text-(--sidebar-menu-item)
          hover:bg-sidebar-menu-active-bg 
          hover:text-(--sidebar-menu-active-item)
          ${isOpen ? "subdrop" : ""}  ${activeChild || activeItem ? "active" : ""}` }
          onClick={(e) => {
            e.preventDefault();
            toggleMenu(itemKey);
          }}
          >
            {item.icon && <i className={`${item.icon} text-base me-2`} />}
            {item.label}
            <span className="menu-arrow" />
          </a>
          <ul  className={`space-y-1 ${
            isOpen ? "block" : "hidden"
          }`}>
            {item.submenu!.map((subItem, childIndex) =>
              renderMenuItem(subItem, childIndex, depth + 1),
            )}
          </ul>
        </li>
      );
    }

    if (depth > 0) {
      return (
        <li key={itemKey}>
          <Link to={item.link ?? "#"} className={`${item.link == location.pathname ? 'active':''}`}>{item.label}</Link>
        </li>
      );
    }

    return (
      <li key={itemKey}>
        {item.link ? (
          <Link
            to={item.link}
            className={`${
              isActive(item) ? "active" : ""
            } flex items-center text-(--sidebar-menu-item) hover:bg-sidebar-menu-active-bg hover:text-(--sidebar-menu-active-item)`}
          >
            {item.icon && <i className={`${item.icon} me-2`} />}
            {item.label}
            {item.badge ? (
              <span className={`${item.label === 'Invoices' ? 'bg-info' : 'bg-orange '} text-white w-5 h-5 rounded-full ms-auto flex items-center justify-center`}>
                {item.badge}
              </span>
            ) : null}
          </Link>
        ) : (
          <span className="relative flex items-center text-(--sidebar-menu-item)">
            {item.icon && <i className={`${item.icon} text-base me-2`} />}
            {item.label}
          </span>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Two Col Sidebar */}
      <aside
        className="two-col-sidebar"
        id="two-col-sidebar"
        aria-label="Main navigation"
      >
        <div
          ref={sidebarTwoColRef}
          className={`sidebar sidebar-twocol flex border border-(--sidebar-border) rounded-lg bg-(--sidebar-bg) ${!isFooterVisible ? "active" : ""}`}
          onMouseEnter={() => {
            if (isLayoutPage()) {
              document.body.classList.add('expand-menu');
            }
          }}
          onMouseLeave={() => {
            if (isLayoutPage()) {
              document.body.classList.remove('expand-menu');
            }
          }}
        >
          {/* LEFT SIDEBAR */}
          <div className="twocol-mini w-16">
            <div className="sidebar-left w-full flex items-center justify-between flex-col h-full p-3">
              <div>
                <Link to={Path.dashboard} className="logo-small mb-6 block">
                  <ImageWithBasePath src={Images.logosmall} alt="logo-small" />
                </Link>

                <div>
                  <ul
                    className="nav space-y-5 flex flex-col items-center"
                    id="sidebar-tabs"
                    aria-orientation="vertical"
                    role="tablist"
                    data-hs-tab-group="tabs"
                  >
                    {[
                      sidebarData.slice(0, 2), // dashboard, layout-pages
                      sidebarData.slice(2, 6), // ai-agents, ai-studio, ai-tools, security
                      sidebarData.slice(6, 9), // settings, pages, ui-elements
                    ].map((group, groupIndex) => (
                      <li className="space-y-1" key={groupIndex}>
                        {group.map((item) => (
                          <a
                            href="#"
                            className={`${isTabActive(item) ? "active" : ""}`}
                            title={item.menutitle}
                            role="tab"
                            data-hs-tab={`#${item.id}`}
                            key={item.id}
                            onClick={(e) => e.preventDefault()}
                          >
                            <span className="sidebar-icon">
                              <i className={`ph-duotone ${item.mainicon}`} />
                            </span>
                            {item.id === "settings" && (
                              <span className="absolute top-[1px] end-[1px] bg-danger w-1.75 h-1.75 block rounded-full"></span>
                            )}
                          </a>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="sidebar-profile flex flex-col items-center gap-2">
                <Link
                  to="#"
                  className="flex items-center justify-center hover:text-(--sidebar-icon-active-item) hover:bg-(--sidebar-icon-active-bg)"
                  title="Help"
                >
                  <i className="ph-duotone ph-question" />
                </Link>
                <Link
                  to={Path.login}
                  className="flex items-center justify-center hover:text-(--sidebar-icon-active-item) hover:bg-(--sidebar-icon-active-bg)"
                  title="Sign Out"
                >
                  <i className="ph-duotone ph-sign-out" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="sidebar-right relative p-3 w-56">
            <div>
              {/* Logo */}
              <div className="sidebar-logo mb-6">
                <Link to={Path.dashboard} className="logo logo-normal">
                  <ImageWithBasePath src={Images.logo} alt="logo" />
                </Link>
                <Link to={Path.dashboard} className="logo logo-white hidden">
                  <ImageWithBasePath
                    src={Images.logowhitesvg}
                    alt="logo-white"
                  />
                </Link>
                <Link to={Path.dashboard} className="logo-small hidden">
                  <ImageWithBasePath src={Images.logosmall} alt="logo-small" />
                </Link>
                <Link
                  to="#"
                  className="sidebar-close"
                  aria-label="Close sidebar"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseSidebar();
                  }}
                >
                  <i className="icon-x" />
                </Link>
              </div>

              {/* Menu */}
              <div
                className="sidebar-scroll "
                style={{ scrollbarWidth: "none" }}
              >
                <div
                  className="tab-content"
                  id="sidebar-tab"
                  role="tabpanel"
                  aria-labelledby="sidebar-tabs"
                >
                  {sidebarData.map((item) => (
                    <div
                      key={item.id}
                      className={`${isTabActive(item) ? "show" : "hidden"} tab-item`}
                      id={item.id}
                      role="tabpanel"
                      aria-labelledby={`tab-${item.id}`}
                    >
                      <ul>
                        {item.submenuSections.map((section) => (
                          <React.Fragment key={section.title || item.id}>
                            {section.title ? (
                              <li className="menu-title text-[13px] text-(--sidebar-title) font-semibold mb-3">
                                {section.title}
                              </li>
                            ) : null}
                            {section.items.map((subItem, index) =>
                              renderMenuItem(subItem, index),
                            )}
                          </React.Fragment>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sidebar-footer w-50 bg-white border border-border-color rounded-lg p-4 fixed overflow-hidden bottom-6 mt-6 z-1" style={{ display: isFooterVisible ? 'block' : 'none' }}>
              <Link
                to="#"
                className="w-5.5 h-5.5 rounded-full flex items-center justify-center bg-gray-900 text-white hover:bg-danger dark:text-white! dark:hover:text-dark! absolute top-2 end-2 close"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFooterVisible(false);
                }}
              >
                <i className="icon-x" />
              </Link>
              <div className="flex items-center mb-2">
                <div className="size-9 rounded-full bg-white border border-border-color text-primary text-xl flex items-center justify-center me-1.5">
                  <i className="ph-duotone ph-sparkle" />
                </div>
                <div>
                  <p className="text-[13px]">Current Plan</p>
                  <p className="font-semibold text-gray-900 mb-0">Trail</p>
                </div>
              </div>
              <p className="text-xs mb-4">You have used 90% Credit.</p>
              <div id="credit-chart" className="mb-4">
                <CreditChart/>
              </div>
              <Link
                to={routes.pricing}
                className="bg-white text-gray-900 border rounded-lg border-border-color px-2.5 py-1.5 font-semibold hover:bg-primary hover:border-primary hover:text-white text-xs flex items-center justify-center dark:hover:text-dark!"
              >
                <i className="ph ph-crown-simple me-1" />
                Upgrade
              </Link>
              <ImageWithBasePath
                src={Images.sidebar_bg_01}
                alt=""
                className="absolute left-0 top-0 -z-1"
              />
              <ImageWithBasePath
                src={Images.sidebar_bg_02}
                alt=""
                className="absolute top-0 end-0 -z-1"
              />
            </div>
          </div>
        </div>
      </aside>
      {/* End Two Col Sidebar */}
    </>
  );
};

export default React.memo(TwoColSidebar);
