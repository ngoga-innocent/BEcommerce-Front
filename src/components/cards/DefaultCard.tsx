import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";
import { Heart } from "lucide-react";

export default function FancyProductCard({ product }: { product: Product }) {
  const waLink = `https://wa.me/${product.whatsapp_number}?text=${encodeURIComponent(
    `Hello, I'm interested in ${product.title}`
  )}`;

  return (
    <div className="relative w-full bg-linear-to-b from-[#fefbff] to-[#f8f4ff] rounded-3xl p-4 shadow-xl 
                    border border-white overflow-hidden transition hover:shadow-2xl hover:-translate-y-1">

      {/* Heart Icon */}
      <button className="absolute top-4 right-4 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-sm hover:scale-110 transition">
        <Heart size={20} className="text-gray-600" />
      </button>

      {/* Image */}
      <div className="w-full h-52 rounded-[22px] overflow-hidden mb-4">
        <img
          src={product.thumbnail_url}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-1 leading-snug">
        {product.description?.slice(0, 60)}...
      </p>

      {/* Price */}
      <p className="text-2xl font-bold text-gray-900 mt-3">
        BIF {product.price}
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4 gap-2">

        <a
          href={waLink}
          target="_blank"
          className="flex-1 bg-black text-white py-2 rounded-2xl text-center font-medium 
                     transition hover:bg-gray-900 shadow-sm"
        >
          Buy
        </a>

        <Link
          to={`/product/${product.slug}`}
          className="text-sm underline text-gray-600 hover:text-gray-900"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
