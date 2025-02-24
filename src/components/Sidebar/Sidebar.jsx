import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const sidebarItems = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-blue-400 text-white rounded-lg p-2" : "text-white"
          }
          to={"/dashboard/admin-home"}
        >
          Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "bg-blue-400 text-white rounded-lg p-2" : "text-white"
          }
          to={"/dashboard/create-article"}
        >
          Create Articles
        </NavLink>
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
      <div className="divider "></div>
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
    </>
  );
  return (
    <div className="drawer lg:drawer-open fixed">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-blue-300 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {sidebarItems}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
