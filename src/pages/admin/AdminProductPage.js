import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Eye, Edit, Trash, ContactRound, PhoneCallIcon } from "lucide-react";
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, } from "../../features/products/productApi";
import { useGetCategoriesQuery } from "../../features/products/categoriesApi";
import AdminLayout from "./AdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select";
import { toast } from "react-toastify";
export default function AdminProductPage() {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const { data: categories } = useGetCategoriesQuery();
    const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [viewProduct, setViewProduct] = useState(null);
    const [formState, setFormState] = useState({
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
    const handleOpenEdit = (product) => {
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
            }
            else {
                await createProduct(data).unwrap();
            }
            toast.success(`Product ${formState.slug ? "updated" : "created"} successfully`);
            setDialogOpen(false);
        }
        catch (err) {
            toast.error("Error saving product");
            console.error(err);
        }
    };
    // -------------------- Delete Product --------------------
    const handleDelete = async (slug) => {
        if (!confirm("Are you sure you want to delete this product?"))
            return;
        try {
            await deleteProduct(slug).unwrap();
            toast.success("Product deleted successfully");
        }
        catch (err) {
            toast.error("Error deleting product");
            console.error(err);
        }
    };
    if (isLoading)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "py-20 text-center", children: "Loading products..." }) }));
    if (isError)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "py-20 text-center text-red-500", children: "Error loading products" }) }));
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "container mx-auto px-2 sm:px-4 lg:px-8 py-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4 sm:mb-0", children: "Products" }), _jsx(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg w-full sm:w-auto", onClick: handleOpenAdd, children: "+ Add Product" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6", children: !products || products.length === 0 ? (_jsx("div", { className: "text-center col-span-full text-gray-500 py-10", children: "No products found" })) : (products.map((p) => (_jsxs("div", { className: "bg-linear-to-br from-yellow-50/80 to-orange-50/80 p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between", children: [_jsx("img", { src: p.thumbnail_url, alt: p.title, className: "h-40 sm:h-48 object-cover rounded-lg mb-3 w-full" }), _jsx("div", { className: "font-semibold text-gray-800 text-sm sm:text-base mb-1 truncate", children: p.title }), _jsx("div", { className: "text-gray-600 text-xs sm:text-sm mb-2 truncate", children: p.category_data?.name }), _jsxs("div", { className: "font-bold text-orange-600 text-sm sm:text-base mb-3", children: [p.currency, " ", p.price] }), _jsxs("div", { className: "flex flex-wrap gap-2 justify-end", children: [_jsxs(Button, { size: "sm", variant: "outline", className: "flex items-center gap-1 text-gray-800 w-full sm:w-auto", onClick: () => setViewProduct(p), children: [_jsx(Eye, { size: 16 }), " View"] }), _jsxs(Button, { size: "sm", variant: "ghost", className: "flex items-center gap-1 text-yellow-600 w-full sm:w-auto", onClick: () => handleOpenEdit(p), children: [_jsx(Edit, { size: 16 }), " ", updateLoading ? "Saving..." : "Edit"] }), _jsxs(Button, { size: "sm", disabled: deleteLoading, variant: "destructive", className: "flex items-center gap-1 w-full sm:w-auto", onClick: () => handleDelete(p.slug), children: [_jsx(Trash, { size: 16 }), " ", deleteLoading ? "Deleting..." : "Delete"] })] })] }, p.id)))) }), _jsx(Dialog, { open: !!viewProduct, onOpenChange: () => setViewProduct(null), children: _jsxs(DialogContent, { className: "sm:max-w-[60vw] max-w-full h-fit overflow-y-auto p-4", children: [viewProduct && (_jsxs("div", { className: "flex flex-col gap-4 mt-4", children: [_jsxs(Swiper, { modules: [Navigation, Pagination], navigation: true, pagination: { clickable: true }, spaceBetween: 10, slidesPerView: 1, observeParents: true, className: "w-[50vw] max-h-80", children: [viewProduct.thumbnail_url && (_jsx(SwiperSlide, { children: _jsx("img", { src: viewProduct.thumbnail_url, alt: viewProduct.title, className: "w-full h-80 object-cover rounded-lg" }) })), viewProduct.product_images?.map((img) => (_jsx(SwiperSlide, { children: _jsx("img", { src: img.image_url, alt: "product", className: "w-full h-80 object-cover rounded-lg" }) }, img.id)))] }, viewProduct.id), _jsx("h1", { className: "text-xl font-bold mt-2", children: viewProduct.title }), _jsx("p", { className: "text-gray-700", children: viewProduct.description }), _jsxs("p", { className: "font-bold text-orange-600", children: ["$", viewProduct.price] }), _jsx("p", { className: "text-gray-500", children: viewProduct.category_data?.name }), _jsxs("p", { className: "text-gray-500 text-sm flex items-center gap-2", children: [_jsx(ContactRound, { size: 20 }), " ", viewProduct.whatsapp_number] }), _jsxs("p", { className: "text-gray-500 text-sm flex items-center gap-2", children: [_jsx(PhoneCallIcon, { size: 20 }), " ", viewProduct.contact_phone] })] })), _jsx("div", { className: "mt-4 flex justify-end gap-2", children: _jsx(Button, { onClick: () => setViewProduct(null), variant: "outline", children: "Close" }) })] }) }), _jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[500px] max-w-full h-[90vh] overflow-y-auto p-4", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-lg sm:text-xl md:text-2xl", children: formState.id ? "Edit Product" : "Add Product" }) }), _jsxs("div", { className: "mt-4 space-y-4", children: [_jsx(Input, { value: formState.title, onChange: (e) => setFormState({ ...formState, title: e.target.value }), placeholder: "Product Title" }), _jsx(Textarea, { value: formState.description, onChange: (e) => setFormState({ ...formState, description: e.target.value }), placeholder: "Description" }), _jsx(Input, { type: "number", value: formState.price, onChange: (e) => setFormState({ ...formState, price: e.target.value }), placeholder: "Price" }), _jsxs(Select, { onValueChange: (value) => setFormState({ ...formState, category: value }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select Category" }) }), _jsx(SelectContent, { children: categories?.map((c) => (_jsx(SelectItem, { value: c.id.toString(), children: c.name }, c.slug))) })] }), _jsx(Input, { type: "file", onChange: (e) => setFormState({
                                            ...formState,
                                            thumbnail: e.target.files?.[0] || null,
                                        }) }), _jsx(Input, { type: "file", multiple: true, onChange: (e) => setFormState({
                                            ...formState,
                                            product_images: e.target.files
                                                ? Array.from(e.target.files)
                                                : [],
                                        }) }), _jsx(Input, { value: formState.whatsapp_number, onChange: (e) => setFormState({
                                            ...formState,
                                            whatsapp_number: e.target.value,
                                        }), placeholder: "WhatsApp Number" }), _jsx(Input, { value: formState.contact_phone, onChange: (e) => setFormState({ ...formState, contact_phone: e.target.value }), placeholder: "Contact Phone" })] }), _jsxs("div", { className: "mt-6 flex flex-col sm:flex-row justify-end gap-2", children: [_jsx(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg w-full sm:w-auto", onClick: handleSave, children: formState.id ? "Update" : "Add" }), _jsx(Button, { onClick: () => setDialogOpen(false), variant: "outline", className: "w-full sm:w-auto", children: "Cancel" })] })] }) })] }) }));
}
