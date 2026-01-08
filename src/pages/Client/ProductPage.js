import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/products/productApi";
import Spinner from "../../components/LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FaFacebook, FaLink, FaShare, FaTelegram, FaTwitter, FaWhatsapp, } from "react-icons/fa";
const ProductPage = () => {
    const { slug } = useParams();
    const { data: product, isLoading, isError } = useGetProductQuery(slug);
    const [showShareModal, setShowShareModal] = useState(false);
    const formatWhatsAppNumber = (num) => {
        if (!num)
            return "";
        // Remove spaces
        num = num.trim();
        // Already has +countrycode
        if (num.startsWith("+"))
            return num.replace("+", "");
        // Already starts with country code (example: 250...)
        if (num.length > 8 && /^\d+$/.test(num))
            return num;
        // If user entered local number like 788123456 → add Rwanda code 250
        if (/^\d{8}$/.test(num))
            return "+257" + num;
        // Fallback (return digits only)
        return num.replace(/\D/g, "");
    };
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    if (isLoading)
        return _jsx(Spinner, { size: "lg", color: "amber", text: "Loading Product..." });
    if (isError || !product)
        return _jsx("p", { className: "text-center py-10", children: "Product not found." });
    const images = [
        product.thumbnail_url,
        ...(product.product_images?.map((img) => img.image_url) || []),
    ];
    return (_jsxs("div", { className: "min-h-screen bg-yellow-50 text-gray-900", children: [_jsx(Navbar, {}), _jsxs("section", { className: "max-w-7xl mx-auto px-4 md:px-6 py-20 flex flex-col lg:flex-row  gap-10", children: [_jsxs("div", { className: "lg:w-1/2", children: [_jsx(Swiper, { modules: [Navigation, Pagination, Thumbs], thumbs: { swiper: thumbsSwiper }, navigation: true, pagination: { clickable: true }, spaceBetween: 20, className: "rounded-2xl shadow-2xl items-center-safe", style: {
                                    "--swiper-navigation-color": "#f59e0b",
                                    "--swiper-pagination-color": "#f59e0b",
                                }, children: images.map((imgUrl, idx) => (_jsx(SwiperSlide, { children: _jsx("img", { src: imgUrl, alt: `${product.title} ${idx}`, className: "w-full h-[60vh] md:h-[60vh] lg:h-[60vh] object-cover rounded-2xl" }) }, idx))) }), _jsx(Swiper, { onSwiper: setThumbsSwiper, modules: [Thumbs], spaceBetween: 10, slidesPerView: 4, freeMode: true, watchSlidesProgress: true, className: "mt-4", children: images.map((imgUrl, idx) => (_jsx(SwiperSlide, { className: "cursor-pointer border-2 border-transparent hover:border-amber-500 rounded-lg", children: _jsx("img", { src: imgUrl, alt: `Thumbnail ${idx}`, className: "w-full h-20 md:h-24 object-cover rounded-lg" }) }, idx))) })] }), _jsxs("div", { className: "lg:w-1/2 flex flex-col gap-6", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: product.title }), _jsx("p", { className: "text-gray-700", children: product.description }), _jsxs("p", { className: "text-2xl font-semibold text-amber-500", children: [product.currency, " ", product.price] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-4", children: [_jsxs("button", { className: "px-6  text-sm py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-bold shadow-md transition", children: ["Call ", _jsxs("span", { children: [" ", formatWhatsAppNumber(product.contact_phone)] })] }), _jsxs("a", { href: `https://wa.me/${formatWhatsAppNumber(product.whatsapp_number)}?text=Hello, I want to buy ${product.title}`, target: "_blank", className: "px-6 text-sm py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold shadow-md text-white transition text-center", children: [_jsx("span", { children: "Contact via WhatsApp" }), _jsx(FaWhatsapp, { className: "inline ml-2" })] }), _jsx("button", { onClick: () => setShowShareModal(true), className: "px-6 text-sm py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold shadow-md text-white transition", children: "Share Product" })] })] })] }), showShareModal && (_jsx("div", { className: "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade", children: _jsxs("div", { className: "bg-white w-80 rounded-2xl p-6 shadow-2xl animate-scaleIn", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-4", children: "Share this product" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("a", { href: `https://wa.me/?text=${product.title}%0A${window.location.href}`, target: "_blank", className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-14 h-14 flex items-center justify-center \n                          bg-green-500/10 text-green-600 rounded-full \n                          group-hover:bg-green-500 group-hover:text-white transition", children: _jsx(FaWhatsapp, { color: "green" }) }), _jsx("p", { className: "text-sm text-gray-700", children: "WhatsApp" })] }), _jsxs("a", { href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, target: "_blank", className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-14 h-14 flex items-center justify-center \n                          bg-blue-600/10 text-blue-600 rounded-full \n                          group-hover:bg-blue-600 group-hover:text-white transition", children: _jsx(FaFacebook, { color: "blue" }) }), _jsx("p", { className: "text-sm text-gray-700", children: "Facebook" })] }), _jsxs("a", { href: `https://twitter.com/intent/tweet?url=${window.location.href}`, target: "_blank", className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-14 h-14 flex items-center justify-center \n                          bg-black/10 text-black rounded-full \n                          group-hover:bg-black group-hover:text-white transition", children: _jsx(FaTwitter, {}) }), _jsx("p", { className: "text-sm text-gray-700", children: "X" })] }), _jsxs("a", { href: `https://t.me/share/url?url=${window.location.href}`, target: "_blank", className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-14 h-14 flex items-center justify-center \n                          bg-blue-400/10 text-blue-400 rounded-full \n                          group-hover:bg-blue-400 group-hover:text-white transition", children: _jsx(FaTelegram, {}) }), _jsx("p", { className: "text-sm text-gray-700", children: "Telegram" })] }), _jsxs("button", { onClick: () => {
                                        navigator.clipboard.writeText(window.location.href);
                                        alert("Link copied!");
                                    }, className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-14 h-14 flex items-center justify-center \n                          bg-gray-600/10 text-gray-600 rounded-full \n                          group-hover:bg-gray-600 group-hover:text-white transition", children: _jsx(FaLink, {}) }), _jsx("p", { className: "text-sm text-gray-700", children: "Copy" })] }), _jsxs("button", { onClick: () => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: product.title,
                                                url: window.location.href,
                                            });
                                        }
                                    }, className: "flex flex-col items-center gap-2 group", children: [_jsx("div", { className: "w-14 h-14 flex items-center justify-center \n                          bg-purple-500/10 text-purple-600 rounded-full \n                          group-hover:bg-purple-600 group-hover:text-white transition", children: _jsx(FaShare, {}) }), _jsx("p", { className: "text-sm text-gray-700", children: "Share" })] })] }), _jsx("button", { onClick: () => setShowShareModal(false), className: "w-full mt-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 transition font-medium", children: "Close" })] }) })), _jsx(Footer, {})] }));
};
export default ProductPage;
