import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import BrowseCategories from "../BrowseCategories";
import SearchBar from "../SearchBar";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Brand + Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700 mr-2"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isNavOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Next
                </span>
                <span className="text-slate-700">Hire</span>
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4 mx-6 flex-1">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              Home
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200 flex items-center"
              >
                Browse Jobs
                <svg
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                  <BrowseCategories />
                </div>
              )}
            </div>

            <Link
              to="/companies"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              Companies
            </Link>

            <Link
              to="/myapplications"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              My Applications
            </Link>
            

            <Link
              to="/addJob"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              Add Job
            </Link>
                <Link
              to="/myPostedJobs"
              className=" px-3 py-2 text-sm  font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200"
              onClick={() => setIsNavOpen(false)}
            >
              My Posted Jobs
            </Link>





            <div className="flex-1 max-w-md ml-4">
              <SearchBar />
            </div>
          </div>

          {/* Right: Auth Buttons */}
          <div className="flex items-center">
            {user ? (
        <>
          {/* User profile with react-icon instead of SVG */}
          <div className="flex items-center space-x-2 mr-4">
            <FaUserCircle className="h-8 w-8 text-gray-600" />
            <span className="font-medium text-gray-700">
              {user.displayName || user.email}
            </span>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={logOut}
            className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            Sign Out
          </button>
        </>
      )  : (
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate("/signin")}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isNavOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200"
              onClick={() => setIsNavOpen(false)}
            >
              Home
            </Link>

            <div>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200 flex justify-between items-center"
              >
                Browse Jobs
                <svg
                  className={`h-5 w-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="px-4 py-2 bg-gray-50 rounded-md mt-1">
                  <BrowseCategories mobile={true} />
                </div>
              )}
            </div>

            <Link
              to="/companies"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200"
              onClick={() => setIsNavOpen(false)}
            >
              Companies
            </Link>

            <Link
              to="/myapplications"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200"
              onClick={() => setIsNavOpen(false)}
            >
              My Applications
            </Link>


            <Link
              to="/addJob"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200"
              onClick={() => setIsNavOpen(false)}
            >
              Add Job
            </Link>

            
             <Link
              to="/myPostedJobs"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-purple-600 transition-colors duration-200"
              onClick={() => setIsNavOpen(false)}
            >
              My Posted Jobs
            </Link>

            <div className="px-3 py-2">
              <SearchBar mobile={true} />
            </div>

            <div className="pt-4 border-t border-gray-200">
              {user ? (
        <>
          {/* User profile with react-icon instead of SVG */}
          <div className="flex items-center space-x-2 mr-4">
            <FaUserCircle className="h-8 w-8 text-gray-600" />
            <span className="font-medium text-gray-700">
              {user.displayName || user.email}
            </span>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={logOut}
            className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all duration-200"
          >
            Sign Out
          </button>
        </>
      )  : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsNavOpen(false);
                    }}
                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signin");
                      setIsNavOpen(false);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;