import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import TwoColSidebar from "../components/sidebar/twoColSidebar";

const LayoutPages = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <TwoColSidebar />
        <div className="page-wrapper">
          <Outlet />
        </div>
        <div className="sidebar-overlay"></div>
      </div>
    </>
  );
};

export default LayoutPages;
