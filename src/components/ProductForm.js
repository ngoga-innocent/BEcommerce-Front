import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useCreateProductMutation, useUpdateProductMutation } from "../features/products/productApi";
export default function ProductForm({ product, onClose }) {
    const [title, setTitle] = useState(product?.title || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [thumbnail, setThumbnail] = useState(null);
    const [contactPhone, setContactPhone] = useState(product?.contact_phone || "");
    const [whatsappNumber, setWhatsappNumber] = useState(product?.whatsapp_number || "");
    const [addProduct, { isLoading: adding }] = useCreateProductMutation();
    const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", String(price));
            formData.append("contact_phone", contactPhone);
            formData.append("whatsapp_number", whatsappNumber);
            if (thumbnail)
                formData.append("thumbnail", thumbnail);
            if (product) {
                await updateProduct({ slug: product.slug, data: formData }).unwrap();
            }
            else {
                await addProduct(formData).unwrap();
            }
            onClose();
        }
        catch (err) {
            alert("Error saving product");
        }
    };
    const currency = ["USD", "EUR", "BIF"];
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("form", { onSubmit: handleSubmit, className: "bg-white rounded-lg shadow-lg p-6 w-full max-w-lg space-y-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: product ? "Edit Product" : "Add New Product" }), _jsx("input", { type: "text", placeholder: "Title", value: title, onChange: (e) => setTitle(e.target.value), className: "w-full border px-3 py-2 rounded", required: true }), _jsx("textarea", { placeholder: "Description", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border px-3 py-2 rounded", required: true }), _jsx("input", { type: "number", placeholder: "Price", value: price, onChange: (e) => setPrice(Number(e.target.value)), className: "w-full border px-3 py-2 rounded", required: true }), _jsx("input", { type: "text", placeholder: "Contact Phone", value: contactPhone, onChange: (e) => setContactPhone(e.target.value), className: "w-full border px-3 py-2 rounded", required: true }), _jsx("input", { type: "text", placeholder: "WhatsApp Number", value: whatsappNumber, onChange: (e) => setWhatsappNumber(e.target.value), className: "w-full border px-3 py-2 rounded", required: true }), _jsx("input", { type: "file", onChange: (e) => setThumbnail(e.target.files?.[0] || null), className: "w-full" }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border rounded hover:bg-gray-100", children: "Cancel" }), _jsx("button", { type: "submit", disabled: adding || updating, className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: product ? (updating ? "Updating..." : "Update") : adding ? "Adding..." : "Add" })] })] }) }));
}
