import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
// import { logout } from "../../features/auth/authSlice";
import { useGetProductsQuery, useDeleteProductMutation, } from "../../features/products/productApi";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, } from "../../components/ui/card";
import ProductCard from "../../components/ProductCard";
import ProductGrid from "../../components/ProductGrid";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/LoadingSpinner";
export default function AdminDashboard() {
    // const dispatch = useAppDispatch();
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();
    const [loadingId, setLoadingId] = useState(null);
    const navigate = useNavigate();
    const handleDelete = async (slug) => {
        if (!confirm("Are you sure you want to delete this product?"))
            return;
        setLoadingId(slug);
        try {
            await deleteProduct(slug).unwrap();
            alert("Product deleted successfully");
        }
        catch (err) {
            alert("Error deleting product");
        }
        finally {
            setLoadingId(null);
        }
    };
    if (isLoading)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "text-center py-20", children: _jsx(Spinner, { text: "Loading ...", size: "md" }) }) }));
    if (isError)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "text-center py-20 text-red-500", children: "Error loading products" }) }));
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "min-h-screen bg-linear-to-br from-[#1b1b1b] via-[#222] to-[#1a1a1a] p-6 text-white", children: [_jsx("header", { className: "flex justify-between items-center mb-8", children: _jsx("h1", { className: "text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500", children: "Admin Dashboard" }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs(Card, { className: "bg-[#2b2b2b]/70 border border-yellow-500/20 shadow-lg rounded-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-yellow-400 text-lg", children: "Total Products" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-2xl font-bold", children: products?.length || 0 }) })] }), _jsxs(Card, { className: "bg-[#2b2b2b]/70 border border-yellow-500/20 shadow-lg rounded-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-yellow-400 text-lg", children: "Pending Actions" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-2xl font-bold", children: "0" }) })] }), _jsxs(Card, { className: "bg-[#2b2b2b]/70 border border-yellow-500/20 shadow-lg rounded-2xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-yellow-400 text-lg", children: "Quick Actions" }) }), _jsxs(CardContent, { children: [_jsx(Button, { onClick: () => navigate("/admin/products"), className: "w-full mb-2 bg-linear-to-r from-orange-500 to-yellow-500 hover:opacity-90 text-black", children: "Add New Product" }), _jsx(Button, { onClick: () => navigate("/admin/users"), className: "w-full bg-orange-700 hover:bg-orange-800 text-white", children: "View Users" })] })] })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500", children: "Products" }), _jsx(ProductGrid, { children: products?.map((product) => (_jsxs("div", { className: "relative", children: [_jsx(ProductCard, { product: product }), _jsx("button", { onClick: () => handleDelete(product.slug), disabled: loadingId === product.slug, className: "absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition", children: loadingId === product.slug ? "Deleting..." : "Delete" })] }, product.id))) })] })] }) }));
}
