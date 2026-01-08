import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useGetAdsQuery, useCreateAdMutation, useUpdateAdMutation, useDeleteAdMutation, } from "../../features/products/adsApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogFooter, } from "@/components/ui/dialog";
import { Upload, Trash2, Pencil } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { toast } from "react-toastify";
import Spinner from "@/components/LoadingSpinner";
export default function AdminAdsPage() {
    const { data: ads = [], isLoading } = useGetAdsQuery();
    const [createAd, { isLoading: createAdLoading }] = useCreateAdMutation();
    const [updateAd, { isLoading: updateAdLoading }] = useUpdateAdMutation();
    const [deleteAd, { isLoading: deleteAdLoading }] = useDeleteAdMutation();
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState();
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const handleSubmit = async () => {
        const formData = new FormData();
        if (image)
            formData.append("image", image);
        formData.append("text", text);
        try {
            if (editing) {
                await updateAd({ id: editing.id, formData }).unwrap();
            }
            else {
                await createAd(formData).unwrap();
            }
            setOpen(false);
            resetForm();
        }
        catch (err) {
            console.error(err);
        }
    };
    const resetForm = () => {
        setEditing(undefined);
        setText("");
        setImage(null);
    };
    const startEdit = (ad) => {
        setEditing(ad);
        setText(ad.text);
        setOpen(true);
    };
    if (isLoading)
        return _jsx(AdminLayout, { children: _jsx(Spinner, { text: "Loading ads...", size: "lg" }) });
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "p-6 space-y-6 relative", children: [updateAdLoading || createAdLoading || deleteAdLoading && _jsx(Spinner, { text: "loading...", size: "md" }), _jsxs("div", { className: "flex justify-between items-center bg-white/40 backdrop-blur rounded-2xl p-4 shadow", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Manage Advertisements" }), _jsx(Button, { className: "rounded-xl px-6 py-2 text-white bg-linear-to-r from-purple-500 to-pink-500 shadow-lg hover:opacity-90 transition", onClick: () => setOpen(true), children: "+ New Ad" })] }), _jsx("div", { className: "grid lg:grid-cols-3 md:grid-cols-2 gap-2 auto-rows-auto", children: ads.map((ad) => (_jsx(Card, { className: "rounded-2xl shadow-lg border border-gray-100 bg-zinc-100 hover:shadow-xl transition overflow-hidden", children: _jsxs(CardContent, { className: "", children: [_jsx("p", { className: "mb-2 text-gray-700 text-sm", children: ad.text || "No caption provided" }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("div", { className: "flex justify-between items-center", children: _jsx(Button, { size: "sm", variant: ad.active ? "destructive" : "default", className: "rounded-xl", onClick: async () => {
                                                    try {
                                                        await updateAd({
                                                            id: ad.id,
                                                            formData: (() => {
                                                                const fd = new FormData();
                                                                fd.append("active", (!ad.active).toString());
                                                                return fd;
                                                            })(),
                                                        }).unwrap();
                                                        toast.success(`Ad ${ad.active ? "deactivated" : "activated"} successfully`);
                                                    }
                                                    catch (err) {
                                                        toast.error("Failed to toggle ad status");
                                                        console.error(err);
                                                    }
                                                }, children: ad.active ? "Disactivate" : "Activate" }) }), _jsxs(Button, { variant: "outline", size: "sm", className: "rounded-xl", onClick: () => startEdit(ad), children: [_jsx(Pencil, { className: "w-4 h-4 mr-1" }), " Edit"] }), _jsxs(Button, { variant: "destructive", size: "sm", className: "rounded-xl", onClick: () => {
                                                if (!confirm("Are you sure you want to delete this category?"))
                                                    return;
                                                deleteAd(ad.id);
                                            }, children: [_jsx(Trash2, { className: "w-4 h-4 mr-1" }), " Delete"] })] })] }) }, ad.id))) }), _jsx(Dialog, { open: open, onOpenChange: setOpen, children: _jsxs(DialogContent, { className: "max-w-lg rounded-2xl p-6 bg-white/90 backdrop-blur shadow-xl", children: [_jsx(DialogHeader, { className: "text-xl font-semibold mb-4", children: editing ? "Edit Advertisement" : "Create New Advertisement" }), _jsxs("div", { className: "grid gap-5", children: [_jsx(Input, { placeholder: "Ad Caption (optional)", className: "rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-400", value: text, onChange: (e) => setText(e.target.value) }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Upload Image" }), _jsx(Input, { type: "file", accept: "image/*", className: "rounded-xl border-gray-300", onChange: (e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        setImage(e.target.files[0]);
                                                    }
                                                    else {
                                                        setImage(null);
                                                    }
                                                } })] }), image && (_jsx("img", { src: URL.createObjectURL(image), alt: "preview", className: "w-full h-48 object-cover rounded-xl shadow" }))] }), _jsx(DialogFooter, { className: "mt-4", children: _jsxs(Button, { className: "rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2", onClick: handleSubmit, children: [_jsx(Upload, { className: "w-4 h-4 mr-1" }), " ", editing ? "Update Ad" : "Create Ad"] }) })] }) })] }) }));
}
