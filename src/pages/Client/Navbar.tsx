import Logo from "@/assets/logo1.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { NAME } from "@/Name";

export default function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const links = [
    { name: "Home", path: "/", scroll: false },
    // { name: "Products", path: "/",  }, // in-page scroll
    { name: "Upload Product", path: "/upload", scroll: false },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md fixed top-0 left-0 z-20 w-full shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Logo" className="w-12 h-12 " />
        <h1 className="logo-name font-extrabold text-2xl bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-pink-500 to-purple-500 animate-gradient-x">
          {NAME}
        </h1>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        {links.map((link) =>
          link.scroll ? (
            <button
              key={link.name}
              onClick={() => handleScrollTo(link.path)}
              className={`px-3 py-1 rounded-md transition-all ${
                location.hash === `#${link.path}`
                  ? "text-yellow-600 font-semibold"
                  : "text-gray-700 hover:text-yellow-600"
              }`}
            >
              {link.name}
            </button>
          ) : (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-1 rounded-md transition-all ${
                location.pathname === link.path
                  ? "text-yellow-600 font-semibold"
                  : "text-gray-700 hover:text-yellow-600"
              }`}
            >
              {link.name}
            </Link>
          )
        )}
      </div>

      {/* Right side - Auth/Profile */}
      <div className="flex items-center gap-4">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-yellow-500/20 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>

        {!user ? (
          <div className="hidden md:flex gap-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="relative hidden md:flex items-center">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
            >
              <img
                src={user?.profile || "https://ui-avatars.com/api/?name=User"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>{user?.username}</span>
            </button>
            {user?.is_staff && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
              >
                Admin Panel
              </Link>
            )}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 z-30">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-10 flex flex-col px-6 py-4 gap-2">
          {links.map((link) =>
            link.scroll ? (
              <button
                key={link.name}
                onClick={() => {
                  handleScrollTo(link.path);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-gray-700 hover:text-yellow-600 text-left"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-gray-700 hover:text-yellow-600"
              >
                {link.name}
              </Link>
            )
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
              >
                Profile
              </Link>
              {user?.is_staff && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
