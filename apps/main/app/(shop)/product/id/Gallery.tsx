"use client";

import React from "react";
import { Swiper as Sw, SwiperSlide as Ss } from "swiper/react";
const Swiper = Sw as any;
const SwiperSlide = Ss as any;
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="col-md-6">
      <div className="position-relative">
        {/* Main Swiper */}
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-unique",
            prevEl: ".swiper-button-prev-unique",
          }}
          className="mySwiper2 mb-3"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                className="w-100 rounded border border-3"
                style={{
                  borderColor: "#d9a03d",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
                alt="Product"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-unique">
          <i className="fa-solid fa-arrow-left-long"></i>
        </div>
        <div className="swiper-button-next-unique">
          <i className="fa-solid fa-arrow-right"></i>
        </div>

        {/* Thumbnail Swiper */}
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                className="w-100 rounded border"
                style={{
                  cursor: "pointer",
                  height: "80px",
                  objectFit: "cover",
                }}
                alt={`Thumbnail ${idx}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Gallery;
