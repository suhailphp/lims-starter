import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import TwoColSidebar from "../components/sidebar/twoColSidebar";
import Footer from "../components/footer/footer";

const PublicLayout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <TwoColSidebar />
        <div className="page-wrapper">
          <Outlet />
          <Footer/>
        </div>
        <div className="sidebar-overlay"></div>
      </div>
    </>
  );
};

export default PublicLayout;
