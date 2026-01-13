import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../store/hooks";
import { useCreateProductMutation } from "../../features/products/productApi";
import { useGetCategoriesQuery } from "../../features/products/categoriesApi";
import Navbar from "./Navbar";
import Footer from "../../components/Footer";
// import Spinner from "../../components/LoadingSpinner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
export default function UploadProduct() {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery();
  const [addProduct, { isLoading }] = useCreateProductMutation();
  // console.log(categories);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<string>("");
  const [whatsapp_number, setWhatsappNumber] = useState<string>("");
  const [contact_phone, setContactNumber] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const MAX_IMAGE_SIZE = 2.5 * 1024 * 1024; // 2.5MB
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Thumbnail image must be less than 2.5MB");
      e.target.value = "";
      return;
    }

    setThumbnail(file);
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    const validFiles: File[] = [];

    for (const file of filesArray) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} exceeds 2.5MB limit`);
      } else {
        validFiles.push(file);
      }
    }

    setAdditionalImages(validFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title || !price || !category || !thumbnail) {
      setErrorMsg("Please fill all required fields and upload a thumbnail.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("category", category);
    formData.append("currency", selectedCurrency);
    formData.append("whatsapp_number", whatsapp_number);
    formData.append("contact_phone", contact_phone);

    formData.append("thumbnail", thumbnail);

    additionalImages.forEach((img) => formData.append("images", img));

    try {
      await addProduct(formData).unwrap();
      navigate("/"); // Redirect to homepage or user's products
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to upload product.");
      setErrorMsg(err?.data?.detail || "Failed to upload product.");
    }
  };
  const currency = ["USD", "EUR", "BIF"];
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
      <div className="min-h-screen bg-yellow-50 text-gray-900">
        <Navbar />

        <section className="max-w-4xl mx-auto px-6 py-12">
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-orange-500">
                Upload Product
              </CardTitle>
            </CardHeader>

            <CardContent>
              {errorMsg && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-1">
                    Product Title *
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Awesome Shoes"
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Location *
                  </label>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Bujumbura, Burundi"
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Description
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a description..."
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Currency </label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full bg-gray-50 border rounded px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    {currency?.map((cur, idx) => (
                      <option key={idx} value={cur}>
                        {cur}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Price ({selectedCurrency}) *
                  </label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="10000"
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Whatsapp number *
                  </label>
                  <Input
                    type="text"
                    value={whatsapp_number}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+257 XXX XXX XXX"
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="text"
                    value={contact_phone}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+257 XXX XXX XXX"
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border rounded px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    {categories?.map((cat) => (
                      <option key={cat.slug} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Thumbnail *{" "}
                    <span className="text-xs text-gray-400">(Max 2.5MB)</span>
                  </label>
                  <Input type="file" onChange={handleThumbnailChange} />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Additional Images (You can select multiple) *{" "}
                    <span className="text-xs text-gray-400">(Max 2.5MB)</span>
                  </label>
                  <Input
                    type="file"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                  {additionalImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {additionalImages.map((file, idx) => (
                        <span
                          key={idx}
                          className="text-sm bg-orange-100 px-2 py-1 rounded shadow"
                        >
                          {file.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  {isLoading ? "Uploading..." : "Upload Product"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <Footer />
      </div>
    </>
  );
}
