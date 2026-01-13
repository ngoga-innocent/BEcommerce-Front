import React from "react";
import { useGetVideoAdsQuery } from "@/features/products/productApi";
import Spinner from "../components/LoadingSpinner";

export default function VideoAdsSection() {
  const { data: videoAds = [], isLoading } = useGetVideoAdsQuery();

  if (isLoading)
    return (
      <div className="text-center py-10">
        <Spinner size="lg" color="amber" text="Loading Video Ad..." />
      </div>
    );

  if (!videoAds || videoAds.length === 0) return null;

  const video = videoAds[0];

  return (
    <section className="w-full mb-12 px-3 flex justify-center">
      <div className="relative w-full max-w-8xl h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
        <video
          key={video.id}
          src={video.video}
          autoPlay
          muted
          loop
          controls
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

        {/* Text overlay */}
        {(video.title || video.caption) && (
          <div className="absolute bottom-6 left-6 z-30 max-w-lg space-y-2">
            {video.title && (
              <h2
                className="text-4xl md:text-6xl font-extrabold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-pink-500 to-purple-500 drop-shadow-2xl"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  WebkitTextStroke: "2px white", // text stroke
                  textShadow: "2px 2px 4px rgba(255,255,255,0.6)", // extra shadow for depth
                }}
              >
                {video.title}
              </h2>
            )}
            {video.caption && (
              <p
                className="text-sm md:text-lg text-white/90 px-3 py-1 rounded-md shadow-md"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {video.caption}
              </p>
            )}
          </div>
        )}

        {/* Decorative shapes */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-pink-500/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-8 left-10 w-16 h-16 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
      </div>
    </section>
  );
}
