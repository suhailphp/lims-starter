import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleMobileMenu } from "../../redux/uiSlice";
import { Link, useLocation } from "react-router-dom";
import { Path } from "../../routes/path";
import ImageWithBasePath from "../image-with-base-path";
import { Images } from "../../utils/imagePath";

const AitoolHeader = () => {
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen } = useAppSelector((state) => state.ui);
  const location = useLocation();

  const getDynamicTitle = () => {
    const pathToTitleMap = {
      [Path.flyerGenerator]: "Flyer Generator AI",
      [Path.flyerGeneratorResult]: "Flyer Generator Result",
      [Path.presentationGenerator]: "Presentation Generator AI",
      [Path.presentationGeneratorResult]: "Presentation Generator AI",
      [Path.proposalGenerator]: "Proposal Generator AI",
      [Path.proposalGeneratorResult]: "Proposal Generator Result",
      [Path.resumeGenerator]: "Resume Generator AI",
      [Path.resumeGeneratorResult]: "Resume Generator Result",
      [Path.policyGenerator]: "Policy Generator AI",
      [Path.policyGeneratorResult]: "Policy Generator Result",
  
    };

    return pathToTitleMap[location.pathname] || "AI Tools";
  };

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

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <>
    <div className="sidebar-overlay"></div>
    <header className="navbar-header header-two">
      <div className="topbar-menu flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 max-lg:w-full">
          <div className="flex items-center gap-4 max-lg:flex-row-reverse">
            {/* Logo */}
            <Link to={Path.dashboard} className="logo hidden sm:flex">
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

            {/* Sidebar Mobile Button */}
            <button
              id="menu_btn"
              className="mobile-btn shrink-0"
              onClick={handleMobileMenuToggle}
            >
              <i className="ph-duotone ph-list text-xl"></i>
            </button>
          </div>

          <div className="flex items-center gap-4 max-lg:w-full max-lg:justify-between max-lg:flex-row-reverse">
            <Link
              to={Path.aiTools}
              className="btn bg-white border border-border-color text-dark hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center"
            >
              <i className="icon-chevron-left me-2"></i>
              Back
            </Link>

            <div className="flex items-center lg:border-l lg:border-l-border-color lg:ps-4">
              <div className="size-8 rounded-full bg-primary-50 text-primary text-base hidden lg:flex items-center justify-center me-2">
                <i className="ph-duotone ph-file-dashed"></i>
              </div>
              <p className="text-gray-900 font-semibold mb-0">{getDynamicTitle()}</p>
            </div>
          </div>
        </div>

        <div className="lg:flex items-center hidden gap-3">
          <div className="bg-white font-medium border border-border-color rounded-full px-4 py-2 inline-flex items-center">
            <span className="flex border-r-2 border-gray-200 pe-3 me-3 text-warning font-bold leading-none">
              <i className="ph-duotone ph-sparkle text-lg"></i>
            </span>
            Available Credits :<span className="text-gray-900 ms-1">100</span>
          </div>

          <Link
            to={Path.pricing}
            className="btn lg:inline-flex items-center border border-transparent 
        [background-image:var(--background-image-primary-gradient),var(--background-image-linear-gradient-100)] 
        [background-clip:padding-box,border-box] bg-origin-border
        text-white transition-opacity hover:opacity-90 hidden me-2"
          >
            <i className="ph ph-crown-simple me-2"></i>
            Upgrade
          </Link>
        </div>
      </div>
    </header>
    </>
  );
};

export default AitoolHeader;
