import {  useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import { FiGrid, FiBox, FiUsers, FiLogOut } from "react-icons/fi";
import { FaHornbill, FaTags } from "react-icons/fa";
import { Settings } from "lucide-react";
interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FiGrid size={20} /> },
    {name:'Categories',path:'/admin/categories',icon:<FaTags  size={20}/>},
    { name: "Products", path: "/admin/products", icon: <FiBox size={20} /> },
    { name: "Users", path: "/admin/users", icon: <FiUsers size={20} /> },
    { name: "announcement", path: "/admin/announcement", icon: <FaHornbill size={20} /> },
    { name: "Site Settings", path: "/admin/site-settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-[70vh] h-screen flex bg-linear-to-br from-[#1b1b1b] via-[#222] to-[#1a1a1a] text-white">

      {/* --- Sidebar --- */}
      <aside
        className={`bg-[#1f1f1f]/90 border-r border-yellow-500/20 shadow-lg transition-all duration-300 flex flex-col
        ${sidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Logo / Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-500/20">
          <h1 className={`font-bold text-lg text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 ${!sidebarOpen && "hidden"}`}>
            Admin Panel
          </h1>
          <Button
            size="sm"
            variant="ghost"
            className="text-yellow-400 hover:text-yellow-500"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "«" : "»"}
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors ${
                location.pathname === link.path ? "bg-yellow-500/30 font-semibold" : ""
              }`}
            >
              <span className="text-yellow-400">{link.icon}</span>
              {sidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Profile & Logout at bottom */}
        <div className="mt-auto px-2 py-4 space-y-2 border-t border-yellow-500/20">
          {/* <Link
            to="/admin/profile"
            className="flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
          >
            <FiUser className="text-yellow-400" />
            {sidebarOpen && <span>Profile</span>}
          </Link> */}
          <Button
            className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 justify-center"
            onClick={() => dispatch(logout())}
          >
            <FiLogOut />
            {sidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
