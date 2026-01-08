import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useGetProductsQuery } from "../features/products/productApi";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { Button } from "../components/ui/button";
import Shopping from "../assets/Shopping.svg";
import Navbar from "./Client/Navbar";
import NoData from "../assets/Nodata.svg";
import { useGetCategoriesQuery, useGetCategoryProductsQuery, } from "../features/products/categoriesApi";
import Footer from "../components/Footer";
import Spinner from "../components/LoadingSpinner";
import { useGetAdsQuery } from "@/features/products/adsApi";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const navigate = useNavigate();
    // console.log("selected category", selectedCategory);
    const { data: activeAd, isLoading: adLoading } = useGetAdsQuery();
    const { data: categoryProducts, isLoading: categoryLoading } = useGetCategoryProductsQuery(selectedCategory || "", { skip: !selectedCategory } // skip the query if no category is selected
    );
    console.log("Active Ad", activeAd);
    const { data: categories } = useGetCategoriesQuery();
    // Inside component
    const displayedProducts = selectedCategory
        ? categoryProducts // only when a category is selected
        : products; // all products except first 4
    // const [otherProducts,setOtherProducts]=React.useState(products?.slice(4)||[]);
    return (_jsxs("div", { className: "min-h-screen bg-linear-to-b from-yellow-50 via-orange-50 to-yellow-100 text-gray-900", children: [_jsx("div", { className: "", children: _jsx(Navbar, {}) }), activeAd && activeAd?.length > 0 && _jsx("div", { className: "overflow-hidden bg-amber-600 fixed top-18 w-full z-50  shadow-md py-2", children: _jsx("div", { className: "whitespace-nowrap animate-marquee flex items-center", children: activeAd?.slice(0, 1)?.map((ad) => (_jsx("span", { className: "inline-block mx-8 text-sm md:text-md lg:text-xl font-extrabold tracking-wider text-black drop-shadow-[2px_2px_4px_rgba(255,255,255,0.4)] Capitalize", children: ad?.text }, ad.id))) }) }), _jsx("section", { className: "relative bg-linear-to-r from-orange-400 to-yellow-400 text-white py-20 px-6 rounded-b-3xl shadow-lg mb-12", children: _jsxs("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10", children: [_jsxs("div", { className: "md:w-1/2", children: [_jsx("h1", { className: "text-5xl font-extrabold mb-4 drop-shadow-lg", children: "Discover Amazing Products" }), _jsx("p", { className: "mb-6 text-lg opacity-90", children: "Shop the best products with ease. Browse, contact, and get your favorites today!" }), _jsx(Button, { onClick: () => navigate("/upload"), className: "bg-linear-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:opacity-90", children: "Add Your Products Now" })] }), _jsx("div", { className: "md:w-1/2", children: _jsx("img", { src: Shopping, alt: "Shop Banner", className: "w-full rounded-2xl shadow-2xl" }) })] }) }), _jsxs("section", { className: "max-w-7xl mx-auto px-6 mb-12", children: [_jsx("h2", { className: "text-3xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-500", children: "Latest Products" }), isLoading && (_jsx("div", { className: "text-center text-orange-500 py-10", children: "Loading products..." })), isError && (_jsx("div", { className: "text-center text-red-500 py-10", children: "Error loading products" })), _jsx(ProductGrid, { children: products?.slice(0, 4)?.map((product) => (_jsx(ProductCard, { product: product }, product.id))) })] }), _jsxs("section", { className: "max-w-7xl mx-auto px-6 mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6 text-gray-800", children: "Categories" }), _jsxs("div", { className: "flex gap-4 flex-wrap justify-start pb-4 scrollbar-hide", children: [_jsx("div", { onClick: () => {
                                    setSelectedCategory(null);
                                    refetch();
                                }, className: `shrink-0 px-6 py-4 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 
        ${selectedCategory === null
                                    ? "bg-amber-600 text-white shadow-lg scale-105"
                                    : "bg-yellow-50 text-gray-800 hover:scale-105 hover:shadow-lg"}`, children: _jsx("span", { className: "font-medium", children: "All Products" }) }), categories?.map((cat) => (_jsx("div", { onClick: () => setSelectedCategory(cat.slug), className: `shrink-0 px-6 py-4 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 
          ${selectedCategory === cat.slug
                                    ? "bg-amber-600 text-white shadow-lg scale-105"
                                    : "bg-yellow-50 text-gray-800 hover:scale-105 hover:shadow-lg"}`, children: _jsx("span", { className: "font-medium", children: cat.name }) }, cat.slug)))] })] }), _jsx("section", { id: "products", className: "max-w-7xl mx-auto px-6 mb-12", children: categoryLoading ? (_jsx("div", { children: _jsx(Spinner, { size: "lg", color: "amber", text: "Loading ..." }) })) : (_jsx(ProductGrid, { children: displayedProducts?.length == 0 ? (_jsxs("div", { className: "flex flex-col space-2 flex-1 items-center justify-center py-8", children: [_jsx("img", { src: NoData, alt: "" }), _jsx("span", { children: "No Product Found" })] })) : (displayedProducts?.map((product) => (_jsx(ProductCard, { product: product }, product.id)))) })) }), _jsxs("section", { className: "bg-linear-to-r from-orange-100 to-yellow-100 py-16 text-center rounded-2xl shadow-inner mx-6", children: [_jsx("h3", { className: "text-3xl font-bold mb-4 text-gray-800", children: "Need Assistance?" }), _jsx("p", { className: "mb-8 text-gray-700 opacity-90 max-w-xl mx-auto", children: "Contact our admin directly on WhatsApp or call us for any inquiries. We\u2019re here to help!" }), _jsxs("div", { className: "flex justify-center gap-6 flex-wrap", children: [_jsx("a", { href: "https://wa.me/+25765356635", target: "_blank", className: "px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg", children: "WhatsApp" }), _jsx("a", { href: "tel:+25725765356635", target: "_blank", className: "px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg", children: "Call Us" })] })] }), _jsx(Footer, {})] }));
}
