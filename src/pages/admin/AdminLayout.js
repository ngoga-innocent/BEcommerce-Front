import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import { FiGrid, FiBox, FiUsers, FiLogOut } from "react-icons/fi";
import { FaHornbill, FaTags } from "react-icons/fa";
export default function AdminLayout({ children }) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: _jsx(FiGrid, { size: 20 }) },
        { name: 'Categories', path: '/admin/categories', icon: _jsx(FaTags, { size: 20 }) },
        { name: "Products", path: "/admin/products", icon: _jsx(FiBox, { size: 20 }) },
        { name: "Users", path: "/admin/users", icon: _jsx(FiUsers, { size: 20 }) },
        { name: "announcement", path: "/admin/announcement", icon: _jsx(FaHornbill, { size: 20 }) },
    ];
    return (_jsxs("div", { className: "min-h-[70vh] h-screen flex bg-linear-to-br from-[#1b1b1b] via-[#222] to-[#1a1a1a] text-white", children: [_jsxs("aside", { className: `bg-[#1f1f1f]/90 border-r border-yellow-500/20 shadow-lg transition-all duration-300 flex flex-col
        ${sidebarOpen ? "w-64" : "w-16"}`, children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-4 border-b border-yellow-500/20", children: [_jsx("h1", { className: `font-bold text-lg text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 ${!sidebarOpen && "hidden"}`, children: "Admin Panel" }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-yellow-400 hover:text-yellow-500", onClick: () => setSidebarOpen(!sidebarOpen), children: sidebarOpen ? "«" : "»" })] }), _jsx("nav", { className: "flex-1 px-2 py-4 space-y-2", children: navLinks.map((link) => (_jsxs(Link, { to: link.path, className: `flex items-center gap-4 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors ${location.pathname === link.path ? "bg-yellow-500/30 font-semibold" : ""}`, children: [_jsx("span", { className: "text-yellow-400", children: link.icon }), sidebarOpen && _jsx("span", { children: link.name })] }, link.name))) }), _jsx("div", { className: "mt-auto px-2 py-4 space-y-2 border-t border-yellow-500/20", children: _jsxs(Button, { className: "w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 justify-center", onClick: () => dispatch(logout()), children: [_jsx(FiLogOut, {}), sidebarOpen && _jsx("span", { children: "Logout" })] }) })] }), _jsx("main", { className: "flex-1 p-6 overflow-auto", children: children })] }));
}
