import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaFeatherAlt,
  FaList,
  FaNewspaper,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    {
      path: "/dashboard/admin-home",
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      group: "admin",
    },
    {
      path: "/dashboard/create-article",
      name: "Create Article",
      icon: <FaFeatherAlt />,
      group: "admin",
    },
    {
      path: "/dashboard/manage-article",
      name: "Manage Articles",
      icon: <FaList />,
      group: "admin",
    },
    {
      path: "/dashboard/manage-users",
      name: "Manage Users",
      icon: <FaUsers />,
      group: "admin",
    },
    {
      path: "/",
      name: "Home",
      icon: <FaHome />,
      group: "main",
    },
    {
      path: "/blogs",
      name: "All Blogs",
      icon: <FaNewspaper />,
      group: "main",
    },
  ];

  return (
    <>
      {/* Mobile Overlay - UPDATED FOR BLUR */}
      <div
        className={`fixed inset-0 z-20 lg:hidden transition-all duration-300 backdrop-blur-sm bg-black/30 ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileSidebar}
      />

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 p-2 rounded-md bg-[#3182ce] text-white z-20 lg:hidden shadow-lg hover:bg-[#2c5282] transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out bg-gradient-to-b from-[#1a365d] to-[#2a4365] text-white shadow-xl
          ${isCollapsed ? "w-20" : "w-72"} 
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo Area */}
        <div
          className={`flex items-center justify-between h-16 px-${
            isCollapsed ? "4" : "6"
          } border-b border-[#2c5282]`}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="h-9 w-9 bg-white rounded-md flex items-center justify-center">
                <span className="text-[#1a365d] text-xl font-bold">Z</span>
              </div>
              <h1 className="ml-2 text-xl font-bold tracking-wider">Zenfla</h1>
            </div>
          )}

          {isCollapsed && (
            <div className="mx-auto h-9 w-9 bg-white rounded-md flex items-center justify-center">
              <span className="text-[#1a365d] text-xl font-bold">Z</span>
            </div>
          )}

          {/* Desktop Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md bg-[#2c5282] hover:bg-[#3182ce] hidden lg:block transition-colors"
          >
            {isCollapsed ? (
              <FaChevronRight size={14} />
            ) : (
              <FaChevronLeft size={14} />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={toggleMobileSidebar}
            className="p-1.5 rounded-md bg-[#2c5282] hover:bg-[#3182ce] lg:hidden transition-colors"
          >
            <FaChevronLeft size={14} />
          </button>
        </div>

        {/* Navigation */}
        <div className="py-6 overflow-y-auto h-[calc(100%-64px)]">
          {/* Admin Section */}
          <div className="mb-6">
            {!isCollapsed && (
              <h2 className="px-6 mb-3 text-xs font-semibold text-[#7fb3f5] uppercase tracking-wider">
                Administration
              </h2>
            )}
            <nav>
              <ul>
                {navItems
                  .filter((item) => item.group === "admin")
                  .map((item) => (
                    <li key={item.path} className="mb-1 px-3">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                        flex items-center px-3 py-3 rounded-md transition-colors
                        ${isCollapsed ? "justify-center" : "justify-start"}
                        ${
                          isActive
                            ? "bg-[#3182ce] text-white"
                            : "text-[#e0f2ff] hover:bg-[#2c5282]"
                        }
                      `}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            setIsMobileOpen(false);
                          }
                        }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {!isCollapsed && (
                          <span className="ml-3 font-medium">{item.name}</span>
                        )}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          {/* Divider */}
          <div
            className={`border-t border-[#2c5282] ${
              isCollapsed ? "mx-3" : "mx-6"
            } my-4`}
          ></div>

          {/* Main Navigation */}
          <div>
            {!isCollapsed && (
              <h2 className="px-6 mb-3 text-xs font-semibold text-[#7fb3f5] uppercase tracking-wider">
                Navigation
              </h2>
            )}
            <nav>
              <ul>
                {navItems
                  .filter((item) => item.group === "main")
                  .map((item) => (
                    <li key={item.path} className="mb-1 px-3">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                        flex items-center px-3 py-3 rounded-md transition-colors
                        ${isCollapsed ? "justify-center" : "justify-start"}
                        ${
                          isActive
                            ? "bg-[#3182ce] text-white"
                            : "text-[#e0f2ff] hover:bg-[#2c5282]"
                        }
                      `}
                        onClick={() => {
                          if (window.innerWidth < 1024) {
                            setIsMobileOpen(false);
                          }
                        }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {!isCollapsed && (
                          <span className="ml-3 font-medium">{item.name}</span>
                        )}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2c5282]">
            <div className="flex items-center text-sm text-[#7fb3f5]">
              <span>© 2025 Zenfla</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
