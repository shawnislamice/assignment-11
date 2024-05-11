import { Link, NavLink } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className=" navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center font-semibold cursor-pointer text-xl gap-2"
          >
            <img className="size-7 " src="/logo.svg" alt="" />
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
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
                to="/rooms"
              >
                Rooms
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
                to="/mybookings"
              >
                My Bookings
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
                to="/aboutus"
              >
                About Us
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                className={({ isActive }) => (isActive ? "bg-red-500" : "")}
                to="/contactus"
              >
                Contact Us
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
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      logOut().then().catch();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:scale-95 duration-300  inline-flex overflow-hidden text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded group"
            >
              <span className="px-3.5 py-2 text-white bg-purple-500 group-hover:bg-purple-600 flex items-center justify-center">
                <CiLogin size={20}></CiLogin>
              </span>
              <span className="pl-4 pr-5 py-2.5">Login Now</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
