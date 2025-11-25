import { useState } from "react";
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../features/products/categoriesApi";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import AdminLayout from "./AdminLayout";
import { toast } from "react-toastify";

export default function AdminCategoryPage() {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<{
    slug?: string;
    name: string;
  }>({ name: "" });

  const handleSave = async () => {
    try {
      if (!editCategory.name.trim()) return;

      if (editCategory.slug) {
        await updateCategory({
          slug: editCategory.slug,
          name: editCategory.name,
        }).unwrap();
      } else {
        await addCategory({ name: editCategory.name }).unwrap();
      }
      toast.success("Category saved successfully");
      setDialogOpen(false);
      setEditCategory({ name: "" });
    } catch (err:any) {
        toast.error("Error saving category",err);
      console.error(err);
    }
  };

  const handleEdit = (category: { slug: string; name: string }) => {
    setEditCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(slug).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="py-20 text-center text-gray-600">Loading categories...</div>
      </AdminLayout>
    );
  if (isError)
    return (
      <AdminLayout>
        <div className="py-20 text-center text-red-500">Error loading categories</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4 sm:mb-0">
            Product Categories
          </h1>
          <Button className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg" onClick={() => setDialogOpen(true)}>
            + Add Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((cat) => (
            <div
              key={cat.id}
              className="bg-transparent  p-4 shadow-xs shadow-white z-10 rounded-lg flex flex-col justify-between hover:shadow-md transition duration-300"
            >
              <div className="text-lg font-semibold text-zinc-400 mb-4">{cat.name}</div>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-900 text-white"
                  onClick={() => handleEdit(cat)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                //   variant="secondary"
                className="bg-red-900 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(cat.slug)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Dialog for Add/Edit */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px] animate-slide-in">
            <DialogHeader>
              <DialogTitle>
                {editCategory.slug ? "Edit Category" : "Add Category"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Input
                value={editCategory.name}
                onChange={(e) =>
                  setEditCategory({ ...editCategory, name: e.target.value })
                }
                placeholder="Category Name"
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button className="bg-linear-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg" onClick={handleSave}>
                {editCategory.slug ? "Update" : "Add"}
              </Button>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="outline"
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
