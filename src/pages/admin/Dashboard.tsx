import { useState } from "react";
// import { useAppDispatch } from "../../store/hooks";
// import { logout } from "../../features/auth/authSlice";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../features/products/productApi";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import ProductCard from "../../components/ProductCard";
import ProductGrid from "../../components/ProductGrid";
import type { Product } from "../../types/Product";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  // const dispatch = useAppDispatch();
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const navigate=useNavigate();
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoadingId(id);
    try {
      await deleteProduct(id).unwrap();
      alert("Product deleted successfully");
    } catch (err) {
      alert("Error deleting product");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading)
    return <div className="text-center py-20 text-yellow-400">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Error loading products
      </div>
    );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-linear-to-br from-[#1b1b1b] via-[#222] to-[#1a1a1a] p-6 text-white">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500">
            Admin Dashboard
          </h1>
         
        </header>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#2b2b2b]/70 border border-yellow-500/20 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-lg">
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{products?.length || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-[#2b2b2b]/70 border border-yellow-500/20 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-lg">
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card className="bg-[#2b2b2b]/70 border border-yellow-500/20 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-yellow-400 text-lg">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={()=>navigate('/admin/products')} className="w-full mb-2 bg-linear-to-r from-orange-500 to-yellow-500 hover:opacity-90 text-black">
                Add New Product
              </Button>
              <Button onClick={()=>navigate('/admin/users')} className="w-full bg-orange-700 hover:bg-orange-800 text-white">
                View Users
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* PRODUCT GRID */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-orange-500">
            Products
          </h2>
          <ProductGrid>
            {products?.map((product: Product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={loadingId === product.id}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  {loadingId === product.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </ProductGrid>
        </div>
      </div>
    </AdminLayout>
  );
}
