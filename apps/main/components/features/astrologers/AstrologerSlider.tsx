"use client";

import React from "react";
import { Swiper as SwiperComp, SwiperSlide as SwiperSlideComp } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AstrologerCard from "./AstrologerCard";
import { SkeletonCard } from "./SkeletonCard";
import { ClientExpertProfile } from "@/lib/types";

const Swiper = SwiperComp as any;
const SwiperSlide = SwiperSlideComp as any;

interface AstrologerSliderProps {
  astrologers: ClientExpertProfile[];
  loading: boolean;
  initialError?: string;
  lang: string;
}

const AstrologerSlider: React.FC<AstrologerSliderProps> = ({
  astrologers,
  loading,
  initialError,
  lang,
}) => {
  return (
    <div className="relative astrologer-swiper-wrapper mt-4 px-12">
      <Swiper
        modules={[Navigation, Autoplay]}
        speed={800}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".astro-next",
          prevEl: ".astro-prev",
        }}
        breakpoints={{
          480: { slidesPerView: 1.2, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="astro-swiper !py-4"
      >
        {astrologers.length > 0 ? (
          astrologers.map((item) => (
            <SwiperSlide key={item.id}>
              <AstrologerCard astrologerData={item} cardClassName="h-full" />
            </SwiperSlide>
          ))
        ) : !loading && initialError ? (
          <div className="w-full text-center py-10 flex flex-col items-center justify-center">
            <p className="text-red-500 font-semibold mb-2 text-white">
              {lang === "hi"
                ? "ज्योतिषियों को लोड करने में विफल"
                : "Failed to load astrologers"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-full text-sm"
            >
              {lang === "hi" ? "पुन: प्रयास करें" : "Retry"}
            </button>
          </div>
        ) : !loading && astrologers.length === 0 ? (
          <div className="w-full text-center py-10">
            <p className="text-gray-500 font-medium">No results found.</p>
          </div>
        ) : (
          Array.from({ length: 4 }).map((_, i) => (
            <SwiperSlide key={i}>
              <SkeletonCard />
            </SwiperSlide>
          ))
        )}

        {loading && astrologers.length > 0 && (
          <SwiperSlide className="flex items-center justify-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      <button className="astro-prev absolute top-1/2 -translate-y-1/2 left-0 w-10 h-10 flex items-center justify-center text-orange bg-white shadow-lg rounded-full hover:scale-110 transition cursor-pointer z-10 p-0 border-0">
        <i className="fa-solid fa-chevron-left fa-lg"></i>
      </button>
      <button className="astro-next absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 flex items-center justify-center text-orange bg-white shadow-lg rounded-full hover:scale-110 transition cursor-pointer z-10 p-0 border-0">
        <i className="fa-solid fa-chevron-right fa-lg"></i>
      </button>
    </div>
  );
};

export default AstrologerSlider;
