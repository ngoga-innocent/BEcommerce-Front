import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../../features/products/productApi";
import { useGetCategoriesQuery } from "../../features/products/categoriesApi";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "react-toastify";
export default function EditProduct() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();
    const { data: product, isLoading: loadingProduct } = useGetProductQuery(slug);
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [whatsapp_number, setWhatsappNumber] = useState("");
    const [contact_phone, setContactNumber] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [thumbnail, setThumbnail] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    // Populate form with existing product data
    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setDescription(product.description || "");
            setPrice(Number(product.price));
            setCategory(product.category_data?.id.toString() || "");
            setSelectedCurrency(product.currency || "USD");
            setWhatsappNumber(product.whatsapp_number || "");
            setContactNumber(product.contact_phone || "");
        }
    }, [product]);
    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0])
            setThumbnail(e.target.files[0]);
    };
    const handleAdditionalImagesChange = (e) => {
        if (e.target.files) {
            setAdditionalImages(Array.from(e.target.files));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        if (!title || !price || !category) {
            setErrorMsg("Please fill all required fields.");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("category", category);
        formData.append("currency", selectedCurrency);
        formData.append("whatsapp_number", whatsapp_number);
        formData.append("contact_phone", contact_phone);
        if (thumbnail)
            formData.append("thumbnail", thumbnail);
        additionalImages.forEach((img) => formData.append("images", img));
        try {
            await updateProduct({ slug: slug, data: formData }).unwrap();
            toast.success("Product updated successfully!");
            navigate("/my-products"); // Redirect to My Products page
        }
        catch (err) {
            console.error(err);
            toast.error("Failed to update product.");
            setErrorMsg(err?.data?.detail || "Failed to update product.");
        }
    };
    const currency = ["USD", "EUR", "BIF"];
    if (loadingProduct)
        return _jsx("p", { className: "text-center py-20", children: "Loading product..." });
    return (_jsxs("div", { className: "min-h-screen bg-yellow-50 text-gray-900", children: [_jsx(Navbar, {}), _jsx("section", { className: "max-w-4xl mx-auto px-6 py-12", children: _jsxs(Card, { className: "bg-white shadow-xl rounded-2xl overflow-hidden", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-3xl font-bold text-center text-orange-500", children: "Edit Product" }) }), _jsxs(CardContent, { children: [errorMsg && (_jsx("div", { className: "bg-red-100 text-red-700 p-3 rounded mb-4 text-center", children: errorMsg })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Product Title *" }), _jsx(Input, { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Awesome Shoes", className: "bg-gray-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Description" }), _jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Write a description...", className: "bg-gray-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Currency " }), _jsx("select", { value: selectedCurrency, onChange: (e) => setSelectedCurrency(e.target.value), className: "w-full bg-gray-50 border rounded px-3 py-2", children: currency.map((cur) => (_jsx("option", { value: cur, children: cur }, cur))) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-gray-700 mb-1", children: ["Price (", selectedCurrency, ") *"] }), _jsx(Input, { type: "number", value: price, onChange: (e) => setPrice(Number(e.target.value)), placeholder: "10000", className: "bg-gray-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Whatsapp number" }), _jsx(Input, { type: "text", value: whatsapp_number, onChange: (e) => setWhatsappNumber(e.target.value), placeholder: "+257 XXX XXX XXX", className: "bg-gray-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Phone Number" }), _jsx(Input, { type: "text", value: contact_phone, onChange: (e) => setContactNumber(e.target.value), placeholder: "+257 XXX XXX XXX", className: "bg-gray-50" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Category *" }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full bg-gray-50 border rounded px-3 py-2", children: [_jsx("option", { value: "", children: "Select Category" }), categories?.map((cat) => (_jsx("option", { value: cat.id, children: cat.name }, cat.slug)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Thumbnail" }), _jsx(Input, { type: "file", onChange: handleThumbnailChange }), product?.thumbnail_url && (_jsx("img", { src: product?.thumbnail_url, alt: "Current Thumbnail", className: "w-32 h-32 object-cover rounded mt-2" }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 mb-1", children: "Additional Images" }), _jsx(Input, { type: "file", multiple: true, onChange: handleAdditionalImagesChange }), additionalImages.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: additionalImages.map((file, idx) => (_jsx("span", { className: "text-sm bg-orange-100 px-2 py-1 rounded shadow", children: file.name }, idx))) }))] }), _jsx(Button, { type: "submit", disabled: isLoading, className: "w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition", children: isLoading ? "Updating..." : "Update Product" })] })] })] }) }), _jsx(Footer, {})] }));
}
