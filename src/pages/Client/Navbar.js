import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Logo from "../../assets/Shopping.svg";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
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
    const handleScrollTo = (id) => {
        const el = document.getElementById(id);
        if (el)
            el.scrollIntoView({ behavior: "smooth" });
    };
    return (_jsxs("nav", { className: "bg-white/70 backdrop-blur-md fixed top-0 left-0 z-20 w-full shadow-sm px-6 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: Logo, alt: "Logo", className: "w-12 h-12 rounded-full" }), _jsx("h1", { className: "font-bold text-lg", children: "ShopHub" })] }), _jsx("div", { className: "hidden md:flex gap-6", children: links.map((link) => link.scroll ? (_jsx("button", { onClick: () => handleScrollTo(link.path), className: `px-3 py-1 rounded-md transition-all ${location.hash === `#${link.path}`
                        ? "text-yellow-600 font-semibold"
                        : "text-gray-700 hover:text-yellow-600"}`, children: link.name }, link.name)) : (_jsx(Link, { to: link.path, className: `px-3 py-1 rounded-md transition-all ${location.pathname === link.path
                        ? "text-yellow-600 font-semibold"
                        : "text-gray-700 hover:text-yellow-600"}`, children: link.name }, link.name))) }), _jsx("div", { className: "flex items-center gap-4", children: !user ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Login" }), _jsx(Link, { to: "/register", className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Signup" })] })) : (_jsxs("div", { className: "relative flex items-center", children: [_jsxs("button", { onClick: () => setDropdownOpen(!dropdownOpen), className: "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: [_jsx("img", { src: user?.profile || "https://ui-avatars.com/api/?name=User", alt: "Profile", className: "w-8 h-8 rounded-full" }), _jsx("span", { children: user?.username })] }), user?.is_staff && (_jsx(Link, { to: "/admin", className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Admin Panel" })), dropdownOpen && (_jsxs("div", { className: "absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 z-30", children: [_jsx(Link, { to: "/profile", className: "block px-4 py-2 hover:bg-gray-100 transition", children: "Profile" }), _jsx("button", { onClick: logout, className: "w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500", children: "Logout" })] }))] })) })] }));
}
