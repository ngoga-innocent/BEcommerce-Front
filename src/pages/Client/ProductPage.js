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
import { FaWhatsapp } from "react-icons/fa";
const ProductPage = () => {
    const { slug } = useParams();
    const { data: product, isLoading, isError } = useGetProductQuery(slug);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    if (isLoading)
        return _jsx(Spinner, { size: "lg", color: "amber", text: "Loading Product..." });
    if (isError || !product)
        return _jsx("p", { className: "text-center py-10", children: "Product not found." });
    const images = [
        product.thumbnail_url,
        ...(product.product_images?.map((img) => img.image_url) || []),
    ];
    return (_jsxs("div", { className: "min-h-screen bg-yellow-50 text-gray-900", children: [_jsx(Navbar, {}), _jsxs("section", { className: "max-w-7xl mx-auto px-4 md:px-6 py-20 flex flex-col lg:flex-row lg:items-center gap-10", children: [_jsxs("div", { className: "lg:w-1/2", children: [_jsx(Swiper, { modules: [Navigation, Pagination, Thumbs], thumbs: { swiper: thumbsSwiper }, navigation: true, pagination: { clickable: true }, spaceBetween: 20, className: "rounded-2xl shadow-2xl items-center-safe", style: { "--swiper-navigation-color": "#f59e0b", "--swiper-pagination-color": "#f59e0b" }, children: images.map((imgUrl, idx) => (_jsx(SwiperSlide, { children: _jsx("img", { src: imgUrl, alt: `${product.title} ${idx}`, className: "w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl" }) }, idx))) }), _jsx(Swiper, { onSwiper: setThumbsSwiper, modules: [Thumbs], spaceBetween: 10, slidesPerView: 4, freeMode: true, watchSlidesProgress: true, className: "mt-4", children: images.map((imgUrl, idx) => (_jsx(SwiperSlide, { className: "cursor-pointer border-2 border-transparent hover:border-amber-500 rounded-lg", children: _jsx("img", { src: imgUrl, alt: `Thumbnail ${idx}`, className: "w-full h-20 md:h-24 object-cover rounded-lg" }) }, idx))) })] }), _jsxs("div", { className: "lg:w-1/2 flex flex-col gap-6", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: product.title }), _jsx("p", { className: "text-gray-700", children: product.description }), _jsxs("p", { className: "text-2xl font-semibold text-amber-500", children: ["BIF ", product.price] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-4", children: [_jsxs("button", { className: "px-6 py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-bold shadow-md transition", children: ["Call ", _jsx("span", { children: product?.contact_phone })] }), _jsxs("a", { href: `https://wa.me/${product.whatsapp_number}?text=Hello, I want to buy ${product.title}`, target: "_blank", className: "px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold shadow-md text-white transition text-center", children: [_jsx("span", { children: "Contact via WhatsApp" }), _jsx(FaWhatsapp, { className: "inline ml-2" })] })] })] })] }), _jsx(Footer, {})] }));
};
export default ProductPage;
