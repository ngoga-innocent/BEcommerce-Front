import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
// import ProductDetails from "./pages/ProductDetails";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import { useAppSelector } from "./store/hooks";
import AdminCategoryPage from "./pages/admin/AdminCategory";
import AdminProductPage from "./pages/admin/AdminProductPage";
import ProductPage from "./pages/Client/ProductPage";
import ClienLogin from "./pages/Client/ClientLogin";
import ClientRegister from "./pages/Client/ClientRegister";
import UploadProduct from "./pages/Client/AddProduct";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminAdsPage from "./pages/admin/AdminAds";
import MyProducts from "./pages/Client/MyProducts";
import EditProduct from "./pages/Client/UpdateProduct";
// Protected Route for Admin
const AdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    // Check if user is authenticated AND is staff
    if (!isAuthenticated)
        return _jsx(Navigate, { to: "/admin/login" });
    if (!user?.is_staff)
        return _jsx(Navigate, { to: "/" }); // Or redirect to dashboard with error
    return children;
};
const UserAuthenticated = ({ children }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    // Check if user is authenticated
    if (!isAuthenticated)
        return _jsx(Navigate, { to: "/login" });
    return children;
};
export default function AppRoutes() {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/product/:slug", element: _jsx(ProductPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(ClienLogin, {}) }), _jsx(Route, { path: "/register", element: _jsx(ClientRegister, {}) }), _jsx(Route, { path: "/upload", element: _jsx(UserAuthenticated, { children: _jsx(UploadProduct, {}) }) }), _jsx(Route, { path: "/my-products", element: _jsx(UserAuthenticated, { children: _jsx(MyProducts, {}) }) }), _jsx(Route, { path: "/products/edit/:slug", element: _jsx(UserAuthenticated, { children: _jsx(EditProduct, {}) }) }), _jsx(Route, { path: "/admin/login", element: _jsx(AdminLogin, {}) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(AdminRoute, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/admin/users", element: _jsx(AdminRoute, { children: _jsx(AdminUserPage, {}) }) }), _jsx(Route, { path: "/admin/categories", element: _jsx(AdminRoute, { children: _jsx(AdminCategoryPage, {}) }) }), _jsx(Route, { path: "/admin/products", element: _jsx(AdminRoute, { children: _jsx(AdminProductPage, {}) }) }), _jsx(Route, { path: "/admin/announcement", element: _jsx(AdminRoute, { children: _jsx(AdminAdsPage, {}) }) }), _jsx(Route, { path: "/admin/*", element: _jsx(Navigate, { to: "/admin/login" }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
