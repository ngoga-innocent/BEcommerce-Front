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
// Protected Route for Admin

const AdminRoute = ({ children }: any) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Check if user is authenticated AND is staff
  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  if (!user?.is_staff) return <Navigate to="/" />; // Or redirect to dashboard with error

  return children;
};
const UserAuthenticated = ({ children }: any) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Check if user is authenticated
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/login" element={<ClienLogin />} />
        <Route path="/register" element={<ClientRegister />} />
        <Route
          path="/upload"
          element={
            <UserAuthenticated>
              <UploadProduct />
            </UserAuthenticated>
          }
        />
        {/* Admin Pages */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUserPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <AdminCategoryPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProductPage />
              {/* <AdminProductPage /> */}
            </AdminRoute>
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />

        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
