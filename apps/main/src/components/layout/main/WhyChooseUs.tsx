"use client";
import React from "react";
import Image from "next/image";
import homepageData from "../../../../public/data/homepage.json";
import { useLanguageStore } from "@repo/store";
import { homeTranslations } from "../../../lib/translations/home";

const WhyChooseUs = () => {
  const { lang } = useLanguageStore();
  const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

  // Split into left and right columns (3 each)
  const leftItems = homepageData.whyChooseUs.slice(0, 3);
  const rightItems = homepageData.whyChooseUs.slice(3, 6);

  return (
    <section className="relative py-16 md:py-24 bg-[#1a0b0b] bg-[url('/images/bg-dark.png')] bg-cover bg-no-repeat bg-fixed overflow-hidden min-h-[700px]">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header - Top Left aligned */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {t.whyChooseUs.title}
          </h2>
          <p className="text-[#dfdfdf] text-xs md:text-base">
            {t.whyChooseUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">

          {/* Left Cards */}
          <div className="md:col-span-4 space-y-4">
            {leftItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-[#1e0b0fa6] border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center min-h-[100px] md:min-h-[160px] text-center hover:border-white/40 transition-all duration-300"
              >
                <i className={`fa-solid ${item.icon} text-2xl md:text-3xl text-white mb-2 md:mb-4`}></i>
                <h4 className="text-white text-sm md:text-lg font-bold leading-tight">
                  {t.whyChooseUs.reasons[index]}
                </h4>
              </div>
            ))}
          </div>

          {/* Center Illustration - Complex Layering */}
          <div className="md:col-span-4 relative flex items-center justify-center min-h-[300px] md:min-h-[450px]">
            {/* 1. Background Rotating Wheel */}
            <div className="absolute inset-0 flex items-center justify-center -mt-16 md:-mt-32 ml-4 md:ml-8">
              <Image
                src="/images/horoscope-round2.png"
                width={420}
                height={420}
                className="w-[80%] md:w-full max-w-[420px] h-auto animate-[spin_40s_linear_infinite] opacity-40 brightness-125"
                alt="zodiac wheel"
              />
            </div>

            {/* 2. Middle: Expert Mascot */}
            <Image
              src="/images/astro.png"
              alt="expert mascot"
              width={320}
              height={320}
              style={{ height: "auto" }}
              className="relative z-20 w-[65%] md:w-[85%] max-w-[320px] drop-shadow-[0_0_40px_rgba(255,107,0,0.2)]"
            />
          </div>

          {/* Right Cards */}
          <div className="md:col-span-4 space-y-4">
            {rightItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-[#1e0b0fa6] border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center min-h-[100px] md:min-h-[160px] text-center hover:border-white/40 transition-all duration-300"
              >
                <i className={`fa-solid ${item.icon} text-2xl md:text-3xl text-white mb-2 md:mb-4`}></i>
                <h4 className="text-white text-sm md:text-lg font-bold leading-tight">
                  {t.whyChooseUs.reasons[index + 3]}
                </h4>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
