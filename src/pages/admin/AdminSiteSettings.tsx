import { useState } from "react";
import {
  useAddHomeBannerMutation,
  useAddLoginBannerMutation,
  useGetHomeBannersQuery,
  useGetLoginBannersQuery,
  useDeleteHomeBannerMutation,
  useDeleteLoginBannerMutation,
  useAddVideoAdsMutation,
  useGetVideoAdsQuery,
  useDeleteVideoAdsMutation,
} from "@/features/products/productApi";

import {
  Plus,
  Trash2,
  Image as ImageIcon,
  X,
  LayoutGrid,
  Video,
} from "lucide-react";

import AdminLayout from "./AdminLayout";
import { toast } from "react-toastify";

export default function AdminBannersPage() {
  /* =======================
     Queries
  ======================= */
  const { data: homeBanners = [], isLoading: homeLoading } =
    useGetHomeBannersQuery();

  const { data: loginBanners = [], isLoading: loginLoading } =
    useGetLoginBannersQuery();

  const { data: videoAds = [], isLoading: videoLoading } =
    useGetVideoAdsQuery();

  /* =======================
     Mutations
  ======================= */
  const [addHomeBanner] = useAddHomeBannerMutation();
  const [addLoginBanner] = useAddLoginBannerMutation();
  const [addVideoAds] = useAddVideoAdsMutation();

  const [deleteHomeBanner] = useDeleteHomeBannerMutation();
  const [deleteLoginBanner] = useDeleteLoginBannerMutation();
  const [deleteVideoAds] = useDeleteVideoAdsMutation();

  /* =======================
     State
  ======================= */
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"home" | "login" | "video">("home");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  /* =======================
     Upload handler
  ======================= */
  const submit = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    const toastId = toast.loading("Uploading media...");

    try {
      const fd = new FormData();
      fd.append(type === "video" ? "video" : "image", file);
      if (caption) fd.append("caption", caption);
      if (title) fd.append("title", title);
      if (type === "home") await addHomeBanner(fd).unwrap();
      if (type === "login") await addLoginBanner(fd).unwrap();
      if (type === "video") await addVideoAds(fd).unwrap();

      toast.update(toastId, {
        render: "Upload successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setOpen(false);
      setCaption("");
      setFile(null);
    } catch (error: any) {
      toast.update(toastId, {
        render: error?.data?.message || "Upload failed",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  /* =======================
     Delete handler
  ======================= */
  const handleDelete = async (
    deleteFn: (id: number) => any,
    id: number,
    label: string
  ) => {
    const toastId = toast.loading(`Deleting ${label}...`);

    try {
      await deleteFn(id).unwrap();

      toast.update(toastId, {
        render: `${label} deleted`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.update(toastId, {
        render: error?.data?.message || `Failed to delete ${label}`,
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-14 text-slate-100">
        {/* ================= Header ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Media Management</h1>
            <p className="text-sm text-slate-400">
              Manage banners and promotional videos
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            <Plus size={18} /> Add Media
          </button>
        </div>

        {/* ================= Sections ================= */}
        <div className="grid gap-12">
          <BannerSection
            title="Homepage Banners"
            icon={<LayoutGrid className="h-5 w-5" />}
            loading={homeLoading}
            banners={homeBanners}
            onDelete={(id: number) =>
              handleDelete(deleteHomeBanner, id, "Homepage banner")
            }
          />

          <BannerSection
            title="Login Page Banners"
            icon={<ImageIcon className="h-5 w-5" />}
            loading={loginLoading}
            banners={loginBanners}
            onDelete={(id: number) =>
              handleDelete(deleteLoginBanner, id, "Login banner")
            }
          />

          <VideoSection
            title="Video Ads"
            loading={videoLoading}
            videos={videoAds}
            onDelete={(id: number) =>
              handleDelete(deleteVideoAds, id, "Video ad")
            }
          />
        </div>

        {/* ================= Modal ================= */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl bg-slate-900 p-8 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Media</h2>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              {/* Type selector */}
              <div className="mb-5 grid grid-cols-3 gap-3">
                {["home", "login", "video"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t as any)}
                    className={`rounded-xl border py-3 text-sm font-medium transition ${
                      type === t
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (optional)"
                className="mb-4 w-full rounded-xl bg-slate-800 p-3 outline-none"
              />
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Caption (optional)"
                className="mb-4 w-full rounded-xl bg-slate-800 p-3 outline-none"
              />

              {/* File upload */}
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 p-6 text-center hover:border-indigo-500 transition">
                {file ? (
                  type === "video" ? (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="h-48 w-full rounded-xl"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(file)}
                      className="h-48 w-full rounded-xl object-cover"
                    />
                  )
                ) : (
                  <>
                    {type === "video" ? <Video /> : <ImageIcon />}
                    <p className="mt-2 text-sm text-slate-400">
                      Click to upload {type === "video" ? "video" : "image"}
                    </p>
                  </>
                )}

                <input
                  type="file"
                  className="hidden"
                  accept={type === "video" ? "video/*" : "image/*"}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              <button
                onClick={submit}
                className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold hover:bg-indigo-700 transition"
              >
                Save Media
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

/* =======================
   Banner Section
======================= */
function BannerSection({ title, icon, banners, loading, onDelete }: any) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <div className="mb-6 flex items-center gap-3">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : banners.length === 0 ? (
        <p className="text-slate-500">No items available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {banners.map((b: any) => (
            <div
              key={b.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-800"
            >
              <img
                src={b.image}
                className="h-44 w-full object-cover transition group-hover:scale-105"
              />

              <button
                onClick={() => onDelete(b.id)}
                className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-red-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-600 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* =======================
   Video Section
======================= */
function VideoSection({ title, videos, loading, onDelete }: any) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <Video size={18} /> {title}
      </h2>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : videos.length === 0 ? (
        <p className="text-slate-500">No videos available</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v: any) => (
            <div
              key={v.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-800"
            >
              <video
                src={v.video}
                controls
                className="h-44 w-full object-cover"
              />

              <button
                onClick={() => onDelete(v.id)}
                className="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-red-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-600 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
