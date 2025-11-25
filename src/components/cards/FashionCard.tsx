import { FaPhone, FaWhatsapp } from "react-icons/fa";
import type { Product } from "../../types/Product";
import { useNavigate } from "react-router-dom";
export default function FashionCard({ product }: { product: Product }) {
    // console.log("product",product);
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/product/${product?.slug}`)} className="bg-white relative border border-pink-100 rounded-2xl shadow-md p-2 hover:shadow-lg transition">
       {product.category && <div className="absolute top-9 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            <h2>{product?.category_data?.name}</h2>
        </div>}
      <img
        src={product.thumbnail_url}
        className="rounded-xl w-full h-[35vh] object-cover shadow"
      />
      <div className="flex flex-col space-y-3">
        <h3 className="mt-3 text-xl font-bold text-black">{product.title}</h3>
        <p className="text-xs text-gray-600">
          {product.description.slice(0, 50)}...
        </p>
      </div>

      <div className="flex flex-row items-center justify-between mt-3 mb-2">
        <p className="text-black  font-bold text-sm">BIF {product.price}</p>

        <div className="flex gap-2">
          <a
            href={`https://wa.me/${product.whatsapp_number}`}
            target="_blank"
            className=" flex flex-col items-center justify-center h-10 w-10 bg-pink-500 text-white  rounded-full text-center shadow"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`tel:${product.contact_phone}`}
            className="flex flex-col items-center justify-center h-10 w-10 bg-black border border-gray-200  rounded-full text-center"
          >
            <FaPhone color="#fff" />
          </a>
        </div>
      </div>
    </div>
  );
}
