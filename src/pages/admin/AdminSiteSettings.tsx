import { useState } from "react";
import {
  useAddHomeBannerMutation,
  useAddLoginBannerMutation,
  useGetHomeBannersQuery,
  useGetLoginBannersQuery,
  useDeleteHomeBannerMutation,
  useDeleteLoginBannerMutation,
} from "@/features/products/productApi";
import { Plus, Trash2, Image as ImageIcon, X, LayoutGrid } from "lucide-react";
import AdminLayout from "./AdminLayout";

export default function AdminBannersPage() {
  const { data: homeBanners = [], isLoading: homeLoading } = useGetHomeBannersQuery();
  const { data: loginBanners = [], isLoading: loginLoading } = useGetLoginBannersQuery();

  const [addHomeBanner] = useAddHomeBannerMutation();
  const [addLoginBanner] = useAddLoginBannerMutation();
  const [deleteHomeBanner] = useDeleteHomeBannerMutation();
  const [deleteLoginBanner] = useDeleteLoginBannerMutation();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"home" | "login">("home");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const submit = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    fd.append("caption", caption);

    if (type === "home") await addHomeBanner(fd);
    else await addLoginBanner(fd);

    setOpen(false);
    setCaption("");
    setFile(null);
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-12 text-slate-100">
        {/* Page header */}
        <div className="flex flex-col gap-4 my-5 sm:flex-row sm:items-center sm:justify-between rounded-2xl px-5 py-4 shadow-md bg-linear-to-br from-zinc-400 via-25% to-zinc-400/50">
          <div className="space-y-1 ">
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">Banner Management</h1>
            <p className="text-sm text-slate-200">
              Control homepage and login sliders displayed across the platform
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]"
          >
            <Plus size={18} /> Add New Banner
          </button>
        </div>

        {/* Banner sections */}
        <div className="grid gap-12">
          <BannerSection
            title="Homepage Banners"
            description="Displayed on the public homepage slider"
            icon={<LayoutGrid className="h-5 w-5" />}
            loading={homeLoading}
            banners={homeBanners}
            onDelete={(id) => deleteHomeBanner(id)}
          />

          <BannerSection
            title="Login Page Banners"
            description="Displayed on the authentication screens"
            icon={<ImageIcon className="h-5 w-5" />}
            loading={loginLoading}
            banners={loginBanners}
            onDelete={(id) => deleteLoginBanner(id)}
          />
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-3xl bg-slate-900 p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-100">Create Banner</h2>
                <button onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-slate-800">
                  <X />
                </button>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setType("home")}
                    className={`rounded-xl border p-4 text-left transition ${
                      type === "home"
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    <p className="font-medium">Homepage</p>
                    <p className="text-xs text-slate-400">Main landing page</p>
                  </button>
                  <button
                    onClick={() => setType("login")}
                    className={`rounded-xl border p-4 text-left transition ${
                      type === "login"
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 hover:bg-slate-800"
                    }`}
                  >
                    <p className="font-medium">Login</p>
                    <p className="text-xs text-slate-400">Auth screens</p>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Banner caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-slate-100 placeholder-slate-400"
                />

                {/* Image upload with preview */}
                <label className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 p-6 text-center transition hover:bg-slate-800">
                  {file ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="h-48 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon className="mb-3 h-8 w-8 text-slate-400" />
                      <span className="text-sm font-medium">Upload banner image</span>
                      <span className="text-xs text-slate-400">PNG, JPG up to 5MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>

                <button
                  onClick={submit}
                  className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700"
                >
                  Save Banner
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function BannerSection({
  title,
  description,
  icon,
  banners,
  loading,
  onDelete,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  banners: any[];
  loading: boolean;
  onDelete: (id: number) => void;
}) {
  return (
    <section className="rounded-3xl border bg-linear-to-br from-zinc-200 via-25% to-zinc-600 p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">{icon}</div>
        <div>
          <h2 className="text-lg text-zinc-950 font-semibold">{title}</h2>
          <p className="text-xs text-gray-800">{description}</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading banners...</p>
      ) : banners.length === 0 ? (
        <p className="text-sm text-gray-500">No banners uploaded</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 bg-transparent lg:grid-cols-3">
          {banners.map((b) => (
            <div
              key={b.id}
              className="group relative overflow-hidden rounded-2xl border bg-transparent shadow-lg"
            >
              <img
                src={b.image}
                alt={b.caption}
                className="h-52 w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-medium text-white">{b.caption}</p>
              </div>
              <button
                onClick={() => onDelete(b.id)}
                className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
