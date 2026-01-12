// components/LoginBannerSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import { useGetLoginBannersQuery } from "@/features/products/productApi";

export default function LoginBannerSlider() {
  const { data: banners = [], isLoading } = useGetLoginBannersQuery();

  if (isLoading) {
    return (
      <div className="mx-auto h-72 w-64 animate-pulse rounded-2xl bg-slate-800" />
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <Swiper
      effect="cards"
      grabCursor
      
      pagination={{ clickable: true }}
      modules={[EffectCards, Autoplay]}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      className="mx-auto w-96"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative   overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
            <img
              src={banner.image}
              alt={banner.caption}
              className="h-72 w-full object-cover"
            />

            {banner.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-medium text-white">
                  {banner.caption}
                </p>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
