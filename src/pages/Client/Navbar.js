import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const handleScrollTo = (id) => {
        const el = document.getElementById(id);
        if (el)
            el.scrollIntoView({ behavior: "smooth" });
    };
    return (_jsxs("nav", { className: "bg-white/70 backdrop-blur-md fixed top-0 left-0 z-20 w-full shadow-sm px-6 py-3 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: Logo, alt: "Logo", className: "w-12 h-12 " }), _jsx("h1", { className: "logo-name font-extrabold text-2xl bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-pink-500 to-purple-500 animate-gradient-x", children: NAME })] }), _jsxs("div", { className: "hidden md:flex gap-6", children: [links.map((link) => link.scroll ? (_jsx("button", { onClick: () => handleScrollTo(link.path), className: `px-3 py-1 rounded-md transition-all ${location.hash === `#${link.path}`
                            ? "text-yellow-600 font-semibold"
                            : "text-gray-700 hover:text-yellow-600"}`, children: link.name }, link.name)) : (_jsx(Link, { to: link.path, className: `px-3 py-1 rounded-md transition-all ${location.pathname === link.path
                            ? "text-yellow-600 font-semibold"
                            : "text-gray-700 hover:text-yellow-600"}`, children: link.name }, link.name))), user && (_jsx(Link, { to: "/my-products", className: `px-3 py-1 rounded-md transition-all ${location.pathname === "/my-products"
                            ? "text-yellow-600 font-semibold"
                            : "text-gray-700 hover:text-yellow-600"}`, children: "My Products" }))] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { className: "md:hidden p-2 rounded-md hover:bg-yellow-500/20 transition", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: [_jsx("span", { className: "block w-6 h-0.5 bg-gray-700 mb-1" }), _jsx("span", { className: "block w-6 h-0.5 bg-gray-700 mb-1" }), _jsx("span", { className: "block w-6 h-0.5 bg-gray-700" })] }), !user ? (_jsxs("div", { className: "hidden md:flex gap-2", children: [_jsx(Link, { to: "/login", className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Login" }), _jsx(Link, { to: "/register", className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Signup" })] })) : (_jsxs("div", { className: "relative hidden md:flex items-center", children: [_jsxs("button", { onClick: () => setDropdownOpen(!dropdownOpen), className: "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: [_jsx("img", { src: user?.profile || "https://ui-avatars.com/api/?name=User", alt: "Profile", className: "w-8 h-8 rounded-full" }), _jsx("span", { children: user?.username })] }), user?.is_staff && (_jsx(Link, { to: "/admin", className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Admin Panel" })), dropdownOpen && (_jsxs("div", { className: "absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 py-2 z-30", children: [_jsx(Link, { to: "/profile", className: "block px-4 py-2 hover:bg-gray-100 transition", children: "Profile" }), _jsx("button", { onClick: logout, className: "w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500", children: "Logout" })] }))] }))] }), mobileMenuOpen && (_jsxs("div", { className: "absolute top-full left-0 w-full bg-white shadow-md md:hidden z-10 flex flex-col px-6 py-4 gap-2", children: [links.map((link) => link.scroll ? (_jsx("button", { onClick: () => {
                            handleScrollTo(link.path);
                            setMobileMenuOpen(false);
                        }, className: "px-3 py-2 rounded-md text-gray-700 hover:text-yellow-600 text-left", children: link.name }, link.name)) : (_jsx(Link, { to: link.path, onClick: () => setMobileMenuOpen(false), className: "px-3 py-2 rounded-md text-gray-700 hover:text-yellow-600", children: link.name }, link.name))), user && (_jsx(Link, { to: "/my-products", className: `px-3 py-1 rounded-md transition-all ${location.pathname === "/my-products"
                            ? "text-yellow-600 font-semibold"
                            : "text-gray-700 hover:text-yellow-600"}`, children: "My Products" })), !user ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", onClick: () => setMobileMenuOpen(false), className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Login" }), _jsx(Link, { to: "/register", onClick: () => setMobileMenuOpen(false), className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Signup" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/profile", onClick: () => setMobileMenuOpen(false), className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Profile" }), user?.is_staff && (_jsx(Link, { to: "/admin", onClick: () => setMobileMenuOpen(false), className: "px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors", children: "Admin Panel" })), _jsx("button", { onClick: logout, className: "px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors text-left", children: "Logout" })] }))] }))] }));
}
