import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMyProductsQuery, useDeleteProductMutation, } from "../../features/products/productApi";
import Spinner from "../../components/LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
export default function MyProducts() {
    const { data: products, isLoading, isError } = useGetMyProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [deletingSlug, setDeletingSlug] = useState(null);
    const handleDelete = async (slug) => {
        if (!window.confirm("Are you sure you want to delete this product?"))
            return;
        try {
            setDeletingSlug(slug);
            await deleteProduct(slug).unwrap();
            toast.success("Product deleted successfully!");
        }
        catch (err) {
            toast.error("Failed to delete product.");
        }
        finally {
            setDeletingSlug(null);
        }
    };
    //   if (isLoading) return <Spinner size="lg" color="amber" text="Loading your products..." />;
    //   if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;
    //   if (!products || products.length === 0) return <p className="text-center py-10 text-gray-700">You have no products yet.</p>;
    return (_jsxs("div", { className: "min-h-screen flex-1 bg-yellow-50 text-gray-900", children: [_jsx(Navbar, {}), isLoading && (_jsx(Spinner, { size: "lg", color: "amber", text: "Loading your products..." })), isError && (_jsx("p", { className: "text-center py-10 text-red-500", children: "Failed to load products." })), !products || products.length === 0 ? (_jsx("div", { className: "max-w-7xl h-[70vh] mx-auto px-4 md:px-6 py-20", children: _jsx("p", { className: "text-center flex-1 text-gray-700", children: "You have no products yet." }) })) : (_jsxs("main", { className: "max-w-7xl mx-auto px-4 md:px-6 py-20", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold mb-8 text-gray-800", children: "My Products" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map((product) => (_jsxs("div", { className: "bg-white relative border border-pink-100 rounded-2xl shadow-md p-2 hover:shadow-lg transition", children: [_jsx("img", { src: product.thumbnail_url || product.thumbnail_url, alt: product.title, className: "rounded-xl w-full h-[35vh] object-cover shadow" }), _jsxs("div", { className: "flex flex-col space-y-3", children: [_jsx("h3", { className: "mt-3 text-xl font-bold text-black", children: product.title }), _jsxs("p", { className: "text-xs text-gray-600", children: [product.description.slice(0, 50), "..."] })] }), _jsxs("p", { className: "text-amber-500 font-bold text-lg mb-4", children: [product.currency, " ", product.price] }), _jsxs("div", { className: "mt-auto flex gap-3", children: [_jsxs(Link, { to: `/products/edit/${product.slug}`, className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow transition", children: [_jsx(FaEdit, {}), " Edit"] }), _jsxs("button", { onClick: () => handleDelete(product.slug), disabled: deletingSlug === product.slug, className: "flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition disabled:opacity-50", children: [_jsx(FaTrash, {}), " ", deletingSlug === product.slug ? "Deleting..." : "Delete"] })] })] }, product.slug))) })] })), _jsx(Footer, {})] }));
}
