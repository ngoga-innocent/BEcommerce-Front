import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { useGetHomeBannersQuery } from "@/features/products/productApi";

interface Props {
  onChange?: (banner: any) => void;
}

export default function HomeBannerSlider({ onChange }: Props) {
  const { data: banners = [] } = useGetHomeBannersQuery();

  if (!banners.length) return null;

  return (
    <div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-2xl">
      <Swiper
        modules={[Autoplay, EffectCards]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="slide"
        loop
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => {
          const realIndex = swiper.realIndex;
          onChange?.(banners[realIndex]);
        }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
