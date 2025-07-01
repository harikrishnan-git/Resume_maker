import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="bg-black border-b border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-white">Resume Maker</div>

        {/* Hamburger Button (Mobile Only) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Center Links (Hidden on mobile) */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-white">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          <Link to="/jd" className="hover:text-gray-400">
            JD
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
        </nav>

        {/* Auth Buttons (Hidden on mobile) */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <button
              className="text-white size-5 cursor-pointer hover:text-gray-200 transition"
              onClick={handleLogout}
            >
              <TbLogout />
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-white text-white font-semibold rounded hover:bg-gray-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-300 transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-3 text-white text-sm font-medium">
            <Link
              to="/services"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400"
            >
              Services
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400"
            >
              About
            </Link>
            <Link
              to="/jd"
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400"
            >
              JD
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 border border-white font-semibold hover:bg-gray-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 px-4 py-2 border border-white text-white font-semibold rounded hover:bg-gray-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-300 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
