// components/HomeBannerSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { useGetHomeBannersQuery } from "@/features/products/productApi";

export default function HomeBannerSlider() {
  const { data: banners = [], isLoading } = useGetHomeBannersQuery();

  if (isLoading) {
    return (
      <div className="h-[380px] w-full animate-pulse rounded-2xl bg-slate-800" />
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="slide"
      loop
      className="rounded-2xl shadow-2xl"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative">
            <img
              src={banner.image}
              alt={banner.caption}
              className="h-[380px] w-full rounded-2xl object-cover"
            />

            {/* Caption overlay */}
            {banner.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-6">
                <h3 className="text-lg font-semibold text-white">
                  {banner.caption}
                </h3>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
