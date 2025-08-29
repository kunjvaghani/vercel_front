import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

// User Icon SVG
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);


// Toggle Switch Component
const ToggleSwitch = ({ checked, onClick, label }) => (
  <div className="relative group flex items-center">
    <button
      onClick={onClick}
      className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-green-700 ${checked ? "bg-white" : "bg-green-800"
        }`}
    >
      <span
        className={`inline-block w-5 h-5 transform rounded-full transition-transform duration-300 ${checked
            ? "translate-x-6 bg-green-600"
            : "translate-x-1 bg-gray-400"
          }`}
      />
    </button>
    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max opacity-0 group-hover:opacity-100 bg-white text-green-700 px-2 py-1 rounded shadow-lg transition-opacity duration-200 text-sm whitespace-nowrap z-40">
      {label}
    </span>
  </div>
);


const NAV_COLOR = "rgb(21 128 61)";

const NavBar = () => {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);

  // Get auth state and functions from context
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const exploreMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
      if (
        exploreMenuRef.current &&
        !exploreMenuRef.current.contains(event.target)
      ) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); // Use logout from context
    setUserMenuOpen(false);
    navigate('/');
  }

  return (
    <nav
      className="w-full shadow-md font-sans font-medium"
      style={{ background: NAV_COLOR, minHeight: "70px" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-2">
        <Link to="/" className="font-extrabold text-2xl text-white tracking-wide select-none">
          Scholarship Portal
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8 font-semibold font-2xl">
          { [
            { label: "Home", to: "/" },
            { label: "Student Services", to: "/services" },
            { label: "Become Partner", to: "/create-scholarship" },
            { label: "Notice Board", to: "/notice" }
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-white font-medium px-3 py-2 rounded-md transition duration-200 cursor-pointer border-b-2 border-transparent hover:border-white text-lg"
            >
              {item.label}
            </Link>
          ))}
          {/* Explore Dropdown */}
          <div className="relative" ref={exploreMenuRef}>
            <button
              onClick={() => setExploreOpen((v) => !v)}
              className="flex items-center text-white font-medium px-3 py-2 rounded-md transition duration-200 hover:text-white cursor-pointer text-lg"
            >
              Explore
              <svg
                className={`ml-1 w-4 h-4 transition-transform duration-200 ${exploreOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {exploreOpen && (
              <div
                className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-30 flex flex-col animate-fade-in"
              >
                <Link
                  to="/register"
                  className="px-5 py-3 text-gray-800 hover:text-green-700 hover:bg-gray-50 rounded-md transition duration-150 cursor-pointer"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: Toggle + Login/User */}
        <div className="flex items-center space-x-6">
          <ToggleSwitch
            checked={toggleOn}
            onClick={(e) => {
              e.stopPropagation();
              setToggleOn((v) => !v);
            }}
            label="Scholarship Filter"
          />
          {/* Show a loading indicator or the auth buttons */}
          {loading ? (
            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-white"></div>
          ) : (
            <>
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="text-white font-medium px-4 py-2 rounded-md transition duration-200 hover:bg-white hover:text-green-700 cursor-pointer"
                >
                  Login
                </Link>
              ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-green-700 hover:shadow-lg transition cursor-pointer"
                  >
                    <UserIcon />
                  </button>
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-30 animate-fade-in"
                    >
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-medium text-sm text-gray-800">Hello, {user?.name}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 font-medium text-gray-800 hover:bg-gray-100 hover:text-green-700 transition duration-150 cursor-pointer"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-green-700 transition duration-150 cursor-pointer"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 font-medium text-red-600 hover:bg-red-50 rounded-b-lg transition duration-150 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
