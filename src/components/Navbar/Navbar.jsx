import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { axiosInstance } from "../../utils";
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiHome } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import logo from "../../assets/5_Blog_Layout_Best_Practices_From_2016-1.jpg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const role = useRole();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/categories");
      return response.data;
    },
  });

  // Safely access categories array and handle it properly
  const categories = categoriesData?.data || [];

  // Group categories for better organization - safely
  const groupedCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories.reduce((acc, category, index) => {
          const columnIndex = Math.floor(
            index / Math.ceil(categories.length / 2)
          );
          if (!acc[columnIndex]) acc[columnIndex] = [];
          acc[columnIndex].push(category);
          return acc;
        }, [])
      : [[], []];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-2"
          : "bg-gradient-to-b from-black/60 to-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              {logo ? (
                <img src={logo} alt="Zenfla" className="h-9 w-auto" />
              ) : (
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
                  Zenfla
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-blue-500/90 text-white backdrop-blur-sm"
                    : "text-white hover:bg-gray-800/40"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-blue-500/90 text-white backdrop-blur-sm"
                    : "text-white hover:bg-gray-800/40"
                }`
              }
            >
              All Blogs
            </NavLink>

            {/* Categories dropdown */}
            <div className="relative group">
              <button
                className="px-4 py-2 rounded-full font-medium text-white hover:bg-gray-800/40 transition-colors flex items-center"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                Categories <FiChevronDown className="ml-1" />
              </button>
              <div
                className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                  dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-800/80 overflow-hidden p-4 w-[600px]">
                  <div className="grid grid-cols-2 gap-4">
                    {Array.isArray(groupedCategories) &&
                      groupedCategories.map((column, colIndex) => (
                        <div key={`col-${colIndex}`} className="space-y-1">
                          {Array.isArray(column) &&
                            column.map((category) => (
                              <Link
                                key={category._id}
                                to={`/category/${category.name}`}
                                className="block px-4 py-2 text-gray-200 hover:bg-gray-800/70 rounded-md capitalize transition-colors"
                              >
                                {category.name}
                              </Link>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full font-medium transition-colors ${
                  isActive
                    ? "bg-blue-500/90 text-white backdrop-blur-sm"
                    : "text-white hover:bg-gray-800/40"
                }`
              }
            >
              About
            </NavLink>

            {user?.email && role === "admin" && (
              <NavLink
                to="/dashboard/admin-home"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500/90 text-white backdrop-blur-sm"
                      : "text-white hover:bg-gray-800/40"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Auth buttons and mobile menu toggle */}
          <div className="flex items-center">
            {!user?.email ? (
              <Link
                to="/login"
                className="hidden md:inline-flex px-6 py-2 rounded-full bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-white font-medium hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 backdrop-blur-sm"
              >
                Sign In
              </Link>
            ) : (
              <div className="hidden md:flex items-center">
                <div className="relative group mr-4">
                  <button className="flex items-center space-x-2 text-white bg-gray-800/60 rounded-full py-2 px-4 hover:bg-gray-800/70 transition-colors backdrop-blur-sm">
                    {user.photoURL ? (
                      <>
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-7 h-7 rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-7 h-7 rounded-full bg-blue-600/80 hidden items-center justify-center">
                          <FaUser className="text-white text-sm" />
                        </div>
                      </>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-600/80 flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                    )}
                    <span className="font-medium hidden lg:block">
                      {user.displayName?.split(" ")[0] || "User"}
                    </span>
                  </button>
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-gray-900/90 backdrop-blur-md rounded-lg shadow-xl overflow-hidden w-48 py-1 border border-gray-800/80">
                      <div className="px-4 py-3 border-b border-gray-800/80">
                        <p className="text-sm font-medium text-white">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      {/* Only show Dashboard for admins */}
                      {role === "admin" && (
                        <div className="py-1">
                          <Link
                            to="/dashboard/admin-home"
                            className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/70 w-full text-left"
                          >
                            <FiHome className="mr-3 text-gray-400" />
                            Dashboard
                          </Link>
                        </div>
                      )}
                      <div
                        className={`py-1 ${
                          role === "admin" ? "border-t border-gray-800/80" : ""
                        }`}
                      >
                        <button
                          onClick={logout}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/70 w-full text-left"
                        >
                          <FiLogOut className="mr-3 text-gray-400" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="p-2 rounded-md text-gray-200 hover:bg-gray-800/40 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen
              ? "max-h-[500px] opacity-100 mt-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col py-2 space-y-1 bg-gray-900/90 backdrop-blur-md rounded-lg px-2 mt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-left font-medium ${
                  isActive
                    ? "bg-blue-500/90 text-white"
                    : "text-white hover:bg-gray-800/70"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-left font-medium ${
                  isActive
                    ? "bg-blue-500/90 text-white"
                    : "text-white hover:bg-gray-800/70"
                }`
              }
            >
              All Blogs
            </NavLink>

            {/* Mobile categories */}
            <div className="px-4 py-3 text-white font-medium border-b border-gray-800/80">
              Categories
            </div>
            <div className="pl-4 pr-2 py-2 grid grid-cols-2 gap-2">
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category.name}`}
                    className="px-3 py-2 text-sm text-gray-300 hover:bg-gray-800/70 rounded capitalize"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-3 rounded-md text-left font-medium ${
                  isActive
                    ? "bg-blue-500/90 text-white"
                    : "text-white hover:bg-gray-800/70"
                }`
              }
            >
              About
            </NavLink>

            {user?.email && role === "admin" && (
              <NavLink
                to="/dashboard/admin-home"
                className={({ isActive }) =>
                  `px-4 py-3 rounded-md text-left font-medium ${
                    isActive
                      ? "bg-blue-500/90 text-white"
                      : "text-white hover:bg-gray-800/70"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            <div className="pt-2 pb-3 px-3 border-t border-gray-800/80 mt-2">
              {!user?.email ? (
                <Link
                  to="/login"
                  className="w-full px-4 py-3 rounded-md bg-gradient-to-r from-blue-500/90 to-indigo-600/90 text-center text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 backdrop-blur-sm"
                >
                  Sign In
                </Link>
              ) : (
                <div className="flex flex-col items-start">
                  <div className="flex items-center w-full mb-3">
                    {user.photoURL ? (
                      <>
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                        <div className="w-10 h-10 rounded-full bg-blue-600/80 hidden items-center justify-center mr-3">
                          <FaUser className="text-white text-lg" />
                        </div>
                      </>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-600/80 flex items-center justify-center mr-3">
                        <FaUser className="text-white text-lg" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[200px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center px-4 py-2 text-sm rounded-md text-white bg-gray-800/70 hover:bg-gray-700/80 w-full"
                  >
                    <FiLogOut className="mr-2" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
