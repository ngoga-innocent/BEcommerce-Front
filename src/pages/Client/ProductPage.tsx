import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAddProductViewMutation,
  useGetProductQuery,
} from "../../features/products/productApi";
import Spinner from "../../components/LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";
import { FaEye } from "react-icons/fa";

// Swiper
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

const VIEW_EXPIRY_HOURS = 24;

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useGetProductQuery(slug!);
  const [addView] = useAddProductViewMutation();

  const [showShareModal, setShowShareModal] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  /* ------------------ 24H UNIQUE VIEW LOGIC ------------------ */
  useEffect(() => {
    if (!product?.slug) return;

    const storageKey = `product-view-${product.slug}`;
    const now = Date.now();
    const lastViewed = localStorage.getItem(storageKey);

    if (lastViewed) {
      const diffHours =
        (now - parseInt(lastViewed, 10)) / (1000 * 60 * 60);

      if (diffHours < VIEW_EXPIRY_HOURS) {
        return; // ❌ already viewed in last 24h
      }
    }

    // ✅ count view
    addView(product.slug);
    localStorage.setItem(storageKey, now.toString());
  }, [product?.slug, addView]);

  /* ------------------ HELPERS ------------------ */
  const formatWhatsAppNumber = (num: string) => {
    if (!num) return "";
    num = num.trim();
    if (num.startsWith("+")) return num.replace("+", "");
    if (num.length > 8 && /^\d+$/.test(num)) return num;
    if (/^\d{8}$/.test(num)) return "257" + num;
    return num.replace(/\D/g, "");
  };

  /* ------------------ STATES ------------------ */
  if (isLoading) {
    return <Spinner size="lg" color="amber" text="Loading Product..." />;
  }

  if (isError || !product) {
    return <p className="text-center py-10">Product not found.</p>;
  }

  const images = [
    product.thumbnail_url,
    ...(product.product_images?.map((img) => img.image_url) || []),
  ];

  /* ------------------ UI ------------------ */
  return (
    <>
      <Helmet>
        <title>{product.title} | My Next Market</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:image" content={product.thumbnail_url} />
      </Helmet>

      <div className="min-h-screen bg-yellow-50 text-gray-900">
        <Navbar />

        <section className="max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-10">
          {/* IMAGE SLIDER */}
          <div className="lg:w-1/2">
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              className="rounded-2xl shadow-2xl"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${product.title}-${i}`}
                    className="w-full h-[60vh] object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={4}
              className="mt-4"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    className="h-20 w-full object-cover rounded-lg cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* PRODUCT INFO */}
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold" style={{
              fontFamily:"-apple-system,serif"
            }}>{product.title}</h1>
              <p className="text-gray-700">{product.location}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <FaEye className="text-amber-500" />
              <span>{product.views?.toLocaleString()} views</span>
            </div>

            <p className="text-gray-700">{product.description}</p>

            <p className="text-2xl font-semibold text-amber-500">
              {product.currency} {product.price}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={`https://wa.me/${formatWhatsAppNumber(
                  product.whatsapp_number
                )}?text=Hello, I want to buy ${product.title}`}
                target="_blank"
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold"
              >
                WhatsApp <FaWhatsapp className="inline ml-1" />
              </a>

              <button
                onClick={() => setShowShareModal(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold"
              >
                Share
              </button>
            </div>
          </div>
        </section>

        {/* SHARE MODAL */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-80">
              <h2 className="font-semibold mb-4">Share product</h2>

              <div className="grid grid-cols-3 gap-4 text-center">
                <a
                  href={`https://wa.me/?text=${product.title}%0A${window.location.href}`}
                  target="_blank"
                >
                  <FaWhatsapp className="mx-auto text-green-500" />
                  WhatsApp
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                  target="_blank"
                >
                  <FaFacebook className="mx-auto text-blue-600" />
                  Facebook
                </a>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  <FaLink className="mx-auto" />
                  Copy
                </button>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="mt-6 w-full bg-gray-200 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
