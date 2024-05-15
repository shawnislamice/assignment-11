import { Link, NavLink } from "react-router-dom";
import { CiLogin, CiUser } from "react-icons/ci";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logOut, setLoading } = useContext(AuthContext);

  return (
    <div className="bg-white  fixed top-0 z-10 w-full ">
      <div className="container  mx-auto  max-w-screen-xl">
        <div className={`navbar  `}>
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  {" "}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/rooms">Rooms</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/mybookings">My Bookings</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/contactus">Contact Us</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/gallery">Gallery</Link>
                </li>
              </ul>
            </div>
            <Link
              to="/"
              className="flex  items-center font-semibold cursor-pointer text-xl gap-2"
            >
              <img className="size-12" src="/logo.png" alt="" />
              <h1>
                Prebon<span className="text-[#2993EA]">Hotel</span>
              </h1>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4">
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-none border bg-[#0E46A3] border-[#2993EA] duration-500 font-semibold text-white "
                      : "hover:bg-[#5BBCFF] duration-500"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-none border bg-[#0E46A3] border-[#2993EA] duration-500 font-semibold text-white "
                      : "hover:bg-[#5BBCFF] duration-500"
                  }
                  to="/rooms"
                >
                  Rooms
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-none border bg-[#0E46A3] border-[#2993EA] duration-500 font-semibold text-white "
                      : "hover:bg-[#5BBCFF] duration-500"
                  }
                  to="/mybookings"
                >
                  My Bookings
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-none border bg-[#0E46A3] border-[#2993EA] duration-500 font-semibold text-white "
                      : "hover:bg-[#5BBCFF] duration-500"
                  }
                  to="/aboutus"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-none border bg-[#0E46A3] border-[#2993EA] duration-500 font-semibold text-white "
                      : "hover:bg-[#5BBCFF] duration-500"
                  }
                  to="/contactus"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-none border bg-[#0E46A3] border-[#2993EA] duration-500 font-semibold text-white "
                      : "hover:bg-[#5BBCFF] duration-500"
                  }
                  to="/gallery"
                >
                  Gallery
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="text-center font-semibold py-2">
                    {user?.displayName}
                  </li>
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/addroom">Add Room</Link>
                  </li>
                  <li>
                    <Link to="/myrooms">My Added Rooms</Link>
                  </li>
                  <li>
                    <Link to="/bookingrequests">Booking Requests</Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        logOut()
                          .then((res) => {
                            toast.success("Logged Out Successfully!");
                          })
                          .catch();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  className="hidden hover:scale-95 duration-300  md:inline-flex overflow-hidden text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded group"
                >
                  <span className="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">
                    <CiLogin size={20}></CiLogin>
                  </span>
                  <span className="pl-4 pr-5 py-2.5">Login Now</span>
                </Link>
                <Link
                  to="/login"
                  className="md:hidden hover:text-red-500 duration-500 block relative right-3"
                >
                  <CiUser size={23}></CiUser>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
