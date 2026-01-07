import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import logo from "../../assets/logo.png";
import logo1 from "../../assets/logo1.png";
import MobileMenu from "./MobileMenu";
import SearchModal from "../search/SearchModal";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, cartCount, favoritesCount, setIsCartOpen } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const userMenuRef = useRef(null);

  // Handle click outside for user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-blue-300 text-white text-center py-2 text-sm px-4 sm:px-6 md:px-10 lg:px-16">
        Summer 25% discount on all last year's products home fashion minimalism
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm  container mx-auto  px-4 sm:px-6 md:px-10 lg:px-16 sticky top-0 z-50 lg:static lg:top-auto lg:z-auto ">
        <div className="">
          {/* Top Row */}
          <div className="flex items-center justify-between py-4 ">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2 lg:gap-4">
              <NavLink to="/" className="text-xl font-bold  lg:hidden">
                <img src={logo} alt="logo" className="h-8 lg:h-auto" />
              </NavLink>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `hidden lg:flex items-end justify-center
     h-12 w-24 relative
     transition-colors 
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
     after:transition-all after:duration-300 after:ease-out
     ${isActive
                    ? "text-gray-900 font-semibold after:w-full after:opacity-100  after:bg-gray-900"
                    : "text-gray-400 hover:text-gray-600 after:w-0 after:opacity-0 opacity-50 hover:after:w-full hover:after:opacity-100 hover:after:bg-gray-600"
                  }`
                }
              >
                <img src={logo1} alt="logo1" className="h-8 w-24 object-contain" />
              </NavLink>

              <NavLink
                to="/home2"
                className={({ isActive }) =>
                  `hidden lg:flex items-end justify-center
     h-12 w-24 relative
     transition-colors text-2xl
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
     after:transition-all after:duration-300 after:ease-out border-l-2 border-gray-200
     ${isActive
                    ? "text-gray-900 font-semibold after:w-full after:opacity-100 after:bg-gray-900"
                    : "text-gray-400 hover:text-gray-600 after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-100 hover:after:bg-gray-600"
                  }`
                }
              >
                NEXT
              </NavLink>

            </div>

            {/* Right Icons */}
            <div className=" hidden lg:inline-flex items-center gap-2 lg:gap-4">
              {/* Search Icon */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Favorites Icon */}
              <Link
                to="/favorites"
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* User Icon with Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute z-[999] right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 ">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm font-semibold text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Link
                          to="/account"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            My Account
                          </div>
                        </Link>
                        <Link
                          to="/favorites"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            My Favorites
                          </div>
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                            navigate("/");
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/signin"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              />
                            </svg>
                            Sign In
                          </div>
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                              />
                            </svg>
                            Sign Up
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Logo Center Row - Hidden on mobile, animated on desktop */}
      <div
        className={`hidden lg:block text-center  transition-all duration-300 overflow-hidden sticky top-0 z-50 bg-white shadow-sm  px-4 sm:px-6 md:px-10 lg:px-20 py-5`}
      >
        <Link to="/" className="inline-block">
          <img
            src={logo}
            alt="logo"
            className="transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </>
  );
};

export default Header;
