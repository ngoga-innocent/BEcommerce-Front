import React from "react";
import { useGetProductsQuery } from "../features/products/productApi";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { Button } from "../components/ui/button";
import Shopping from "../assets/Shopping.svg";
import Navbar from "./Client/Navbar";
import NoData from "../assets/Nodata.svg";
import {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
} from "../features/products/categoriesApi";
import Footer from "../components/Footer";
import Spinner from "../components/LoadingSpinner";
import { useGetAdsQuery } from "@/features/products/adsApi";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const navigate=useNavigate();
  // console.log("selected category", selectedCategory);
  const { data: activeAd, isLoading: adLoading } = useGetAdsQuery();
  const { data: categoryProducts, isLoading: categoryLoading } =
    useGetCategoryProductsQuery(
      selectedCategory || "",
      { skip: !selectedCategory } // skip the query if no category is selected
    );
  console.log("Active Ad", activeAd);
  const { data: categories } = useGetCategoriesQuery();
  // Inside component
  const displayedProducts = selectedCategory
    ? categoryProducts // only when a category is selected
    : products?.slice(4); // all products except first 4

  // const [otherProducts,setOtherProducts]=React.useState(products?.slice(4)||[]);
  return (
    <div className="min-h-screen bg-linear-to-b from-yellow-50 via-orange-50 to-yellow-100 text-gray-900">
      <div className="">
        <Navbar />
      </div>
      {/* Hero Section */}
      {activeAd && activeAd?.length >0 && <div className="overflow-hidden fixed top-18 w-full z-50  shadow-md py-2">
        <div className="whitespace-nowrap animate-marquee flex items-center">
          {activeAd?.slice(0, 1)?.map((ad) => (
            <span
              key={ad.id}
              className="inline-block mx-8 text-sm md:text-md lg:text-xl font-extrabold tracking-wider text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.6)] Capitalize"
            >
              {ad?.text}
            </span>
          ))}
        </div>
      </div>}

      <section className="relative bg-linear-to-r from-orange-400 to-yellow-400 text-white py-20 px-6 rounded-b-3xl shadow-lg mb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              Discover Amazing Products
            </h1>
            <p className="mb-6 text-lg opacity-90">
              Shop the best products with ease. Browse, contact, and get your
              favorites today!
            </p>
            <Button onClick={()=>navigate("/upload")} className="bg-linear-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:opacity-90">
              Add Your Products Now
            </Button>
          </div>
          <div className="md:w-1/2">
            <img
              src={Shopping}
              alt="Shop Banner"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      {/* Category Section */}

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-yellow-500">
          Latest Products
        </h2>

        {isLoading && (
          <div className="text-center text-orange-500 py-10">
            Loading products...
          </div>
        )}
        {isError && (
          <div className="text-center text-red-500 py-10">
            Error loading products
          </div>
        )}

        <ProductGrid>
          {products?.slice(0, 4)?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </section>
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>
        <div className="flex gap-4 flex-wrap justify-start pb-4 scrollbar-hide">
          {/* All Products */}
          <div
            onClick={() => {
              setSelectedCategory(null);
              refetch();
            }}
            className={`shrink-0 px-6 py-4 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 
        ${
          selectedCategory === null
            ? "bg-amber-600 text-white shadow-lg scale-105"
            : "bg-yellow-50 text-gray-800 hover:scale-105 hover:shadow-lg"
        }`}
          >
            <span className="font-medium">All Products</span>
          </div>

          {/* Category Cards */}
          {categories?.map((cat) => (
            <div
              onClick={() => setSelectedCategory(cat.slug)}
              key={cat.slug}
              className={`shrink-0 px-6 py-4 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 
          ${
            selectedCategory === cat.slug
              ? "bg-amber-600 text-white shadow-lg scale-105"
              : "bg-yellow-50 text-gray-800 hover:scale-105 hover:shadow-lg"
          }`}
            >
              <span className="font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="max-w-7xl mx-auto px-6 mb-12">
        {categoryLoading ? (
          <div>
            <Spinner size="lg" color="amber" text="Loading ..." />
          </div>
        ) : (
          <ProductGrid>
            {displayedProducts?.length == 0 ? (
              <div className="flex flex-col space-2 flex-1 items-center justify-center py-8">
                <img src={NoData} alt="" />
                <span>No Product Found</span>
              </div>
            ) : (
              displayedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </ProductGrid>
        )}
      </section>
      {/* Call to Action Section */}
      <section className="bg-linear-to-r from-orange-100 to-yellow-100 py-16 text-center rounded-2xl shadow-inner mx-6">
        <h3 className="text-3xl font-bold mb-4 text-gray-800">
          Need Assistance?
        </h3>
        <p className="mb-8 text-gray-700 opacity-90 max-w-xl mx-auto">
          Contact our admin directly on WhatsApp or call us for any inquiries.
          We’re here to help!
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="https://wa.me/+25769089733"
            target="_blank"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            WhatsApp
          </a>
          <a
            href="tel:+25769089733"
            target="_blank"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            Call Us
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
