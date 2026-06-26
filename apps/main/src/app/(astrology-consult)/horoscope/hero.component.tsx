"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguageStore, horoscopeTranslations } from "@repo/store";
import { ZodiacData } from "@/components/features/services/zodiac";
import { FiChevronRight, FiCalendar, FiChevronDown } from "react-icons/fi";

type HeroComponentProps = {
  selectedSign: ZodiacData;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
};

const getZodiacSvgPath = (title: string) => {
  switch (title.toUpperCase()) {
    case 'ARIES': return '/horoscope_img/ARIES_04bdeca59e.svg';
    case 'TAURUS': return '/horoscope_img/TAURUS_198b4c97e9.svg';
    case 'GEMINI': return '/horoscope_img/GEMINI_9d35540bb9.svg';
    case 'CANCER': return '/horoscope_img/CANCER_364708b894.svg';
    case 'LEO': return '/horoscope_img/LEO_593adbf0e7.svg';
    case 'VIRGO': return '/horoscope_img/VIRGO_fb766f0d08.svg';
    case 'LIBRA': return '/horoscope_img/LIBRA_c60a49cefb.svg';
    case 'SCORPIO': return '/horoscope_img/SCORPIO_e6bde48051.svg';
    case 'SAGITTARIUS': return '/horoscope_img/SAGITTARIUS_e0ed1cd1fd.svg';
    case 'CAPRICORN': return '/horoscope_img/CAPRICORN_ab2706bf23.svg';
    case 'AQUARIUS': return '/horoscope_img/AQUARIUS_4ad6eab3c3.svg';
    case 'PISCES': return '/horoscope_img/PISCES_4991a00d62.svg';
    default: return '/horoscope_img/ARIES_04bdeca59e.svg';
  }
};

const HeroComponent = () => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <section className="relative px-4 md:px-8 max-w-[1300px] mx-auto pt-0 mt-4 md:mt-6">

      {/* Hero Banner */}
      <div className="w-full relative">
        <Image 
          src="/images/ChatGPT Image Jun 26, 2026, 11_04_08 AM (2).png" 
          alt="Daily Horoscope Banner" 
          width={1300}
          height={320}
          className="w-full h-auto rounded-[24px]"
          unoptimized
        />
      </div>
      
    </section>
  );
};

export default HeroComponent;
