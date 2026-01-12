import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetMyProductsQuery,
  useDeleteProductMutation,
} from "../../features/products/productApi";
import Spinner from "../../components/LoadingSpinner";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
export default function MyProducts() {
  const { data: products, isLoading, isError } = useGetMyProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      setDeletingSlug(slug);
      await deleteProduct(slug).unwrap();
      toast.success("Product deleted successfully!");
    } catch (err: any) {
      toast.error("Failed to delete product.");
    } finally {
      setDeletingSlug(null);
    }
  };

  //   if (isLoading) return <Spinner size="lg" color="amber" text="Loading your products..." />;
  //   if (isError) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;
  //   if (!products || products.length === 0) return <p className="text-center py-10 text-gray-700">You have no products yet.</p>;

  return (
    <>
    <Helmet>
            <title>My Next Market | Best Market Services in Burundi</title>
            <meta
              name="Add New Product"
              content="We offer the best services in Burundi. Fast, reliable and affordable."
            />
            <meta
              name="keywords"
              content="business, services, Burundi, affordable,market,next"
            />
        
            {/* Open Graph (Facebook, WhatsApp) */}
            <meta
              property="og:title"
              content="My Next Market | Best Market Services in Burundi"
            />
            <meta
              property="og:description"
              content="We offer the best Market services in Burundi."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://mynextmarket.com" />
            <meta property="og:image" content="https://mynextmarket.com/logo.png" />
        
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
          </Helmet>
    <div className="min-h-screen flex-1 bg-yellow-50 text-gray-900">
      <Navbar />
      {isLoading && (
        <Spinner size="lg" color="amber" text="Loading your products..." />
      )}
      {isError && (
        <p className="text-center py-10 text-red-500">
          Failed to load products.
        </p>
      )}
      {!products || products.length === 0 ? (
        <div className="max-w-7xl h-[70vh] mx-auto px-4 md:px-6 py-20">
          <p className="text-center flex-1 text-gray-700">
            You have no products yet.
          </p>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-4 md:px-6 py-20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            My Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.slug}
                className="bg-white relative border border-pink-100 rounded-2xl shadow-md p-2 hover:shadow-lg transition"
              >
                <img
                  src={product.thumbnail_url || product.thumbnail_url}
                  alt={product.title}
                  className="rounded-xl w-full h-[35vh] object-cover shadow"
                />
                <div className="flex flex-col space-y-3">
                  <h3 className="mt-3 text-xl font-bold text-black">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {product.description.slice(0, 50)}...
                  </p>
                </div>
                <p className="text-amber-500 font-bold text-lg mb-4">
                  {product.currency} {product.price}
                </p>

                <div className="mt-auto flex gap-3">
                  <Link
                    to={`/products/edit/${product.slug}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow transition"
                  >
                    <FaEdit /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.slug)}
                    disabled={deletingSlug === product.slug}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition disabled:opacity-50"
                  >
                    <FaTrash />{" "}
                    {deletingSlug === product.slug ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      <Footer />
    </div>
    </>
  );
}
