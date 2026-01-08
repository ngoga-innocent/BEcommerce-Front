import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, } from "../../features/products/categoriesApi";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import AdminLayout from "./AdminLayout";
import { toast } from "react-toastify";
export default function AdminCategoryPage() {
    const { data: categories, isLoading, isError } = useGetCategoriesQuery();
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editCategory, setEditCategory] = useState({ name: "" });
    const handleSave = async () => {
        try {
            if (!editCategory.name.trim())
                return;
            if (editCategory.slug) {
                await updateCategory({
                    slug: editCategory.slug,
                    name: editCategory.name,
                }).unwrap();
            }
            else {
                await addCategory({ name: editCategory.name }).unwrap();
            }
            toast.success("Category saved successfully");
            setDialogOpen(false);
            setEditCategory({ name: "" });
        }
        catch (err) {
            toast.error("Error saving category", err);
            console.error(err);
        }
    };
    const handleEdit = (category) => {
        setEditCategory(category);
        setDialogOpen(true);
    };
    const handleDelete = async (slug) => {
        if (!confirm("Are you sure you want to delete this category?"))
            return;
        try {
            await deleteCategory(slug).unwrap();
        }
        catch (err) {
            console.error(err);
        }
    };
    if (isLoading)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "py-20 text-center text-gray-600", children: "Loading categories..." }) }));
    if (isError)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "py-20 text-center text-red-500", children: "Error loading categories" }) }));
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "container mx-auto p-4 sm:p-6 lg:p-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6", children: [_jsx("h1", { className: "text-3xl sm:text-4xl font-bold text-gray-100 mb-4 sm:mb-0", children: "Product Categories" }), _jsx(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg", onClick: () => setDialogOpen(true), children: "+ Add Category" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: categories?.map((cat) => (_jsxs("div", { className: "bg-transparent  p-4 shadow-xs shadow-white z-10 rounded-lg flex flex-col justify-between hover:shadow-md transition duration-300", children: [_jsx("div", { className: "text-lg font-semibold text-zinc-400 mb-4", children: cat.name }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { size: "sm", className: "bg-blue-900 hover:bg-blue-900 text-white", onClick: () => handleEdit(cat), children: "Edit" }), _jsx(Button, { size: "sm", 
                                        //   variant="secondary"
                                        className: "bg-red-900 hover:bg-red-700 text-white", onClick: () => handleDelete(cat.slug), children: "Delete" })] })] }, cat.id))) }), _jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[500px] animate-slide-in", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: editCategory.slug ? "Edit Category" : "Add Category" }) }), _jsx("div", { className: "mt-4", children: _jsx(Input, { value: editCategory.name, onChange: (e) => setEditCategory({ ...editCategory, name: e.target.value }), placeholder: "Category Name" }) }), _jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [_jsx(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg", onClick: handleSave, children: editCategory.slug ? "Update" : "Add" }), _jsx(Button, { onClick: () => setDialogOpen(false), variant: "outline", children: "Cancel" })] })] }) })] }) }));
}
