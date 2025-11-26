import React, { useState } from "react";
import {
  useGetAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
} from "../../features/products/adsApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Upload, Trash2, Pencil } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Ad } from "@/types/ads";
import { toast } from "react-toastify";
import Spinner from "@/components/LoadingSpinner";

export default function AdminAdsPage() {
  const { data: ads = [], isLoading } = useGetAdsQuery();
  const [createAd,{isLoading:createAdLoading}] = useCreateAdMutation();
  const [updateAd,{isLoading:updateAdLoading}] = useUpdateAdMutation();
  const [deleteAd,{isLoading:deleteAdLoading}] = useDeleteAdMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Ad>();
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("text", text);

    try {
      if (editing) {
        await updateAd({ id: editing.id, formData }).unwrap();
      } else {
        await createAd(formData).unwrap();
      }
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditing(undefined);
    setText("");
    setImage(null);
  };

  const startEdit = (ad: any) => {
    setEditing(ad);
    setText(ad.text);
    setOpen(true);
  };

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 relative">
        {updateAdLoading || createAdLoading || deleteAdLoading && <Spinner text="loading..." size="md" />}
        <div className="flex justify-between items-center bg-white/40 backdrop-blur rounded-2xl p-4 shadow">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Advertisements
          </h1>
          <Button
            className="rounded-xl px-6 py-2 text-white bg-linear-to-r from-purple-500 to-pink-500 shadow-lg hover:opacity-90 transition"
            onClick={() => setOpen(true)}
          >
            + New Ad
          </Button>
        </div>

        {/* Ads List */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-2 auto-rows-auto">
          {ads.map((ad: Ad) => (
            <Card
              key={ad.id}
              className="rounded-2xl shadow-lg border border-gray-100 bg-zinc-100 hover:shadow-xl transition overflow-hidden"
            >
              {/* {ad.image && <div className="relative h-56 w-full">
                <img
                  src={ad.image}
                  alt="ad"
                  className="w-full h-full object-cover"
                />
              </div>} */}
              <CardContent className="">
                <p className="mb-2 text-gray-700 text-sm">
                  {ad.text || "No caption provided"}
                </p>

                <div className="flex justify-end space-x-2">
                  <div className="flex justify-between items-center">
                    <Button
                      size="sm"
                      variant={ad.active ? "destructive" : "default"}
                      className="rounded-xl"
                      onClick={async () => {
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
                        } catch (err) {
                            toast.error("Failed to toggle ad status");
                          console.error(err);
                        }
                      }}
                    >
                      {ad.active ? "Disactivate" : "Activate"}
                    </Button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => startEdit(ad)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => {
                        if (!confirm("Are you sure you want to delete this category?")) return;
                        deleteAd(ad.id)}}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CREATE / EDIT MODAL */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg rounded-2xl p-6 bg-white/90 backdrop-blur shadow-xl">
            <DialogHeader className="text-xl font-semibold mb-4">
              {editing ? "Edit Advertisement" : "Create New Advertisement"}
            </DialogHeader>

            <div className="grid gap-5">
              <Input
                placeholder="Ad Caption (optional)"
                className="rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-400"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Upload Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  className="rounded-xl border-gray-300"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    } else {
                      setImage(null);
                    }
                  }}
                />
              </div>

              {/* Preview */}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-xl shadow"
                />
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button
                className="rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2"
                onClick={handleSubmit}
              >
                <Upload className="w-4 h-4 mr-1" />{" "}
                {editing ? "Update Ad" : "Create Ad"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
