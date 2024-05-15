import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Aos from "aos";

const MainLayout = () => {
  Aos.init()
  return (
    <div className="">
      <div className="md:h-[68px]">
        <NavBar></NavBar>
      </div>
      <div className="">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
