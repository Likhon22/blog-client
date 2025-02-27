import { Link, NavLink } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import { axiosInstance } from "../../utils";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logout } = useAuth();
  const role = useRole();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data.data;
    },
  });
  const navItems = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-blue-400 text-white rounded-lg p-2" : "text-white"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-blue-400 text-white rounded-lg p-2" : "text-white"
          }
          to={"/blogs"}
        >
          All Blogs
        </NavLink>
      </li>
      <li>
        <div className="dropdown dropdown-hover dropdown-bottom  ">
          <div tabIndex={0} role="button" className="text-white">
            Categories
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-gray-900/50 text-white font-medium  md:w-[500px] rounded-box z-[1] grid grid-cols-1 md:grid-cols-2  p-2 "
          >
            {categories?.map((category) => (
              <li key={category._id}>
                <Link className="capitalize" to={`/category/${category.name}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-blue-400 text-white rounded-lg p-2" : "text-white"
          }
          to={"/about"}
        >
          About
        </NavLink>
      </li>
      {user?.email && role === "admin" && (
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-blue-400 text-white rounded-lg p-2" : "text-white"
            }
            to={"/dashboard/admin-home"}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar fixed  bg-black/20 bg-opacity-90  z-10 shadow-sm px-6">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm font-medium dropdown-content bg-gray-900/90 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-medium px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {!user?.email ? (
          <Link to={"/login"}>
            <button className="btn bg-blue-400 shadow-none text-white border-none rounded-lg hover:bg-blue-500">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={() => logout()}
            className="btn bg-blue-400 shadow-none text-white border-none rounded-lg hover:bg-blue-500"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
