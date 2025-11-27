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
import {
  FaFacebook,
  FaLink,
  FaShare,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useGetProductQuery(slug!);
  const [showShareModal, setShowShareModal] = useState(false);
  const formatWhatsAppNumber = (num: string) => {
    if (!num) return "";

    // Remove spaces
    num = num.trim();

    // Already has +countrycode
    if (num.startsWith("+")) return num.replace("+", "");

    // Already starts with country code (example: 250...)
    if (num.length > 8 && /^\d+$/.test(num)) return num;

    // If user entered local number like 788123456 → add Rwanda code 250
    if (/^\d{8}$/.test(num)) return "+257" + num;

    // Fallback (return digits only)
    return num.replace(/\D/g, "");
  };

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  

  if (isLoading)
    return <Spinner size="lg" color="amber" text="Loading Product..." />;
  if (isError || !product)
    return <p className="text-center py-10">Product not found.</p>;

  const images = [
    product.thumbnail_url,
    ...(product.product_images?.map((img) => img.image_url) || []),
  ];

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-900">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 flex flex-col lg:flex-row  gap-10">
        {/* Image Slider */}
        <div className="lg:w-1/2">
          {/* Main Slider */}
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            thumbs={{ swiper: thumbsSwiper }}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            className="rounded-2xl shadow-2xl items-center-safe"
            style={
              {
                "--swiper-navigation-color": "#f59e0b",
                "--swiper-pagination-color": "#f59e0b",
              } as any
            } // Tailwind amber
          >
            {images.map((imgUrl, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={imgUrl}
                  alt={`${product.title} ${idx}`}
                  className="w-full h-[60vh] md:h-[60vh] lg:h-[60vh] object-cover rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            className="mt-4"
          >
            {images.map((imgUrl, idx) => (
              <SwiperSlide
                key={idx}
                className="cursor-pointer border-2 border-transparent hover:border-amber-500 rounded-lg"
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx}`}
                  className="w-full h-20 md:h-24 object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-amber-500">
            {product.currency} {product.price}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="px-6  text-sm py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-bold shadow-md transition">
              Call <span> {formatWhatsAppNumber(product.contact_phone)}</span>
            </button>
            <a
              href={`https://wa.me/${formatWhatsAppNumber(product.whatsapp_number)}?text=Hello, I want to buy ${product.title}`}
              target="_blank"
              className="px-6 text-sm py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold shadow-md text-white transition text-center"
            >
              <span>Contact via WhatsApp</span>
              <FaWhatsapp className="inline ml-2" />
            </a>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-6 text-sm py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold shadow-md text-white transition"
            >
              Share Product
            </button>
          </div>
        </div>
      </section>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade">
          <div className="bg-white w-80 rounded-2xl p-6 shadow-2xl animate-scaleIn">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Share this product
            </h2>

            <div className="grid grid-cols-3 gap-4 text-center">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${product.title}%0A${window.location.href}`}
                target="_blank"
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center 
                          bg-green-500/10 text-green-600 rounded-full 
                          group-hover:bg-green-500 group-hover:text-white transition"
                >
                  <FaWhatsapp color="green" />
                </div>
                <p className="text-sm text-gray-700">WhatsApp</p>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                target="_blank"
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center 
                          bg-blue-600/10 text-blue-600 rounded-full 
                          group-hover:bg-blue-600 group-hover:text-white transition"
                >
                  <FaFacebook color="blue" />
                </div>
                <p className="text-sm text-gray-700">Facebook</p>
              </a>

              {/* X */}
              <a
                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                target="_blank"
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center 
                          bg-black/10 text-black rounded-full 
                          group-hover:bg-black group-hover:text-white transition"
                >
                  <FaTwitter />
                </div>
                <p className="text-sm text-gray-700">X</p>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${window.location.href}`}
                target="_blank"
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center 
                          bg-blue-400/10 text-blue-400 rounded-full 
                          group-hover:bg-blue-400 group-hover:text-white transition"
                >
                  <FaTelegram />
                </div>
                <p className="text-sm text-gray-700">Telegram</p>
              </a>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center 
                          bg-gray-600/10 text-gray-600 rounded-full 
                          group-hover:bg-gray-600 group-hover:text-white transition"
                >
                  <FaLink />
                </div>
                <p className="text-sm text-gray-700">Copy</p>
              </button>

              {/* Native Share */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.title,
                      url: window.location.href,
                    });
                  }
                }}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center 
                          bg-purple-500/10 text-purple-600 rounded-full 
                          group-hover:bg-purple-600 group-hover:text-white transition"
                >
                  <FaShare />
                </div>
                <p className="text-sm text-gray-700">Share</p>
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 transition font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
