import Logo from "../../assets/Shopping.svg";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { NAME } from "@/Name";

export default function Navbar() {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/", scroll: true }, // in-page scroll
    { name: "Upload Product", path: "/upload" },
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
        <img src={Logo} alt="Logo" className="w-12 h-12 rounded-full" />
        <h1 className="font-bold text-lg">{NAME}</h1>
      </div>

      {/* Middle Links */}
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
        {!user ? (
          <>
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
          </>
        ) : (
          <div className="relative flex items-center">
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
    </nav>
  );
}
