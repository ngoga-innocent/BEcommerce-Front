import { useState } from "react";
import { Eye, Edit, Trash, ContactRound, PhoneCallIcon } from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../features/products/productApi";
import { useGetCategoriesQuery } from "../../features/products/categoriesApi";
import AdminLayout from "./AdminLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "react-toastify";

export default function AdminProductPage() {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<any | null>(null);

  const [formState, setFormState] = useState({
    id: 0,
    title: "",
    description: "",
    price: "",
    slug: "",
    category: "",
    thumbnail: null as File | null,
    product_images: [] as File[],
    whatsapp_number: "",
    contact_phone: "",
  });

  // -------------------- Open Add Modal --------------------
  const handleOpenAdd = () => {
    setFormState({
      id: 0,
      title: "",
      description: "",
      price: "",
      slug: "",
      category: "",
      thumbnail: null,
      product_images: [],
      whatsapp_number: "",
      contact_phone: "",
    });
    setDialogOpen(true);
  };

  // -------------------- Open Edit Modal --------------------
  const handleOpenEdit = (product: any) => {
    setFormState({
      id: product.id,
      title: product.title,
      slug: product?.slug,
      description: product.description,
      price: product.price,
      category: product.category?.id || "",
      thumbnail: null,
      product_images: [],
      whatsapp_number: product.whatsapp_number,
      contact_phone: product.contact_phone,
    });
    setDialogOpen(true);
  };

  // -------------------- Save Product --------------------
  const handleSave = async () => {
    const data = new FormData();
    data.append("title", formState.title);
    data.append("description", formState.description);
    data.append("price", formState.price);
    data.append("category", formState.category);
    data.append("whatsapp_number", formState.whatsapp_number);
    data.append("contact_phone", formState.contact_phone);

    if (formState.thumbnail instanceof File) {
      data.append("thumbnail", formState.thumbnail);
    }

    // ✨ ONLY send NEW product images
    formState.product_images.forEach((file) => {
      if (file instanceof File) {
        data.append("images", file);
      }
    });

    try {
      if (formState.slug) {
        await updateProduct({ slug: formState.slug, data }).unwrap();
      } else {
        await createProduct(data).unwrap();
      }
      toast.success(
        `Product ${formState.slug ? "updated" : "created"} successfully`
      );
      setDialogOpen(false);
    } catch (err) {
      toast.error("Error saving product");
      console.error(err);
    }
  };

  // -------------------- Delete Product --------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="py-20 text-center">Loading products...</div>
      </AdminLayout>
    );
  if (isError)
    return (
      <AdminLayout>
        <div className="py-20 text-center text-red-500">
          Error loading products
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4 sm:mb-0">
            Products
          </h1>
          <Button
            className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg w-full sm:w-auto"
            onClick={handleOpenAdd}
          >
            + Add Product
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {!products || products.length === 0 ? (
            <div className="text-center col-span-full text-gray-500 py-10">
              No products found
            </div>
          ) : (
            products.map((p) => (
              <div
                key={p.id}
                className="bg-linear-to-br from-yellow-50/80 to-orange-50/80 p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <img
                  src={p.thumbnail_url}
                  alt={p.title}
                  className="h-40 sm:h-48 object-cover rounded-lg mb-3 w-full"
                />
                <div className="font-semibold text-gray-800 text-sm sm:text-base mb-1 truncate">
                  {p.title}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm mb-2 truncate">
                  {p.category_data?.name}
                </div>
                <div className="font-bold text-orange-600 text-sm sm:text-base mb-3">
                  BIF{p.price}
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 text-gray-800 w-full sm:w-auto"
                    onClick={() => setViewProduct(p)}
                  >
                    <Eye size={16} /> View
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1 text-yellow-600 w-full sm:w-auto"
                    onClick={() => handleOpenEdit(p)}
                  >
                    <Edit size={16} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex items-center gap-1 w-full sm:w-auto"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash size={16} /> Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View Product Modal */}
        <Dialog open={!!viewProduct} onOpenChange={() => setViewProduct(null)}>
          <DialogContent className="sm:max-w-[60vw] max-w-full h-fit overflow-y-auto p-4">
            {viewProduct && (
              <div className="flex flex-col gap-4 mt-4">
                {/* Swiper Carousel */}
                <Swiper
                  key={viewProduct.id} // <-- re-initialize for each product
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  observeParents={true}
                  className="w-[50vw] max-h-80"
                >
                  {/* Thumbnail */}
                  {viewProduct.thumbnail_url && (
                    <SwiperSlide>
                      <img
                        src={viewProduct.thumbnail_url}
                        alt={viewProduct.title}
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  )}

                  {/* Product Images */}
                  {viewProduct.product_images?.map((img: any) => (
                    <SwiperSlide key={img.id}>
                      <img
                        src={img.image_url}
                        alt="product"
                        className="w-full h-80 object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Product Details */}
                <h1 className="text-xl font-bold mt-2">{viewProduct.title}</h1>
                <p className="text-gray-700">{viewProduct.description}</p>
                <p className="font-bold text-orange-600">
                  ${viewProduct.price}
                </p>
                <p className="text-gray-500">
                  {viewProduct.category_data?.name}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <ContactRound size={20} /> {viewProduct.whatsapp_number}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <PhoneCallIcon size={20} /> {viewProduct.contact_phone}
                </p>
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => setViewProduct(null)} variant="outline">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add/Edit Product Modal */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px] max-w-full h-[90vh] overflow-y-auto p-4">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">
                {formState.id ? "Edit Product" : "Add Product"}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <Input
                value={formState.title}
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
                placeholder="Product Title"
              />
              <Textarea
                value={formState.description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
                placeholder="Description"
              />
              <Input
                type="number"
                value={formState.price}
                onChange={(e) =>
                  setFormState({ ...formState, price: e.target.value })
                }
                placeholder="Price"
              />
              <Select
                onValueChange={(value) =>
                  setFormState({ ...formState, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => (
                    <SelectItem key={c.slug} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="file"
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    thumbnail: e.target.files?.[0] || null,
                  })
                }
              />
              <Input
                type="file"
                multiple
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    product_images: e.target.files
                      ? Array.from(e.target.files)
                      : [],
                  })
                }
              />

              <Input
                value={formState.whatsapp_number}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    whatsapp_number: e.target.value,
                  })
                }
                placeholder="WhatsApp Number"
              />
              <Input
                value={formState.contact_phone}
                onChange={(e) =>
                  setFormState({ ...formState, contact_phone: e.target.value })
                }
                placeholder="Contact Phone"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
              <Button
                className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg w-full sm:w-auto"
                onClick={handleSave}
              >
                {formState.id ? "Update" : "Add"}
              </Button>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
