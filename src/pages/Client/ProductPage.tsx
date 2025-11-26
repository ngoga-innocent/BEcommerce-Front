import  { useState } from "react";
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
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useGetProductQuery(slug!);

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
            style={{ "--swiper-navigation-color": "#f59e0b", "--swiper-pagination-color": "#f59e0b" } as any} // Tailwind amber
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
              <SwiperSlide key={idx} className="cursor-pointer border-2 border-transparent hover:border-amber-500 rounded-lg">
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
          <p className="text-2xl font-semibold text-amber-500">{product.currency} {product.price}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button className="px-6 py-3 bg-amber-400 hover:bg-amber-500 rounded-lg font-bold shadow-md transition">
              Call <span>{product?.contact_phone}</span>
            </button>
            <a
              href={`https://wa.me/${product.whatsapp_number}?text=Hello, I want to buy ${product.title}`}
              target="_blank"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-bold shadow-md text-white transition text-center"
            >
              <span>Contact via WhatsApp</span>
              <FaWhatsapp  className="inline ml-2" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductPage;
