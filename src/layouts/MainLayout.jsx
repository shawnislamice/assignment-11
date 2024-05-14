import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <div className="md:h-[68px]">
        <NavBar></NavBar>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
