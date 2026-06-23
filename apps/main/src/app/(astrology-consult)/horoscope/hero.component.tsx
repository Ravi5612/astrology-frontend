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

const HeroComponent = ({ selectedSign, selectedDate, onDateChange }: HeroComponentProps) => {
  const { lang } = useLanguageStore();
  const t = horoscopeTranslations[lang];

  return (
    <section className="relative overflow-hidden pt-4 md:pt-6 pb-8 bg-[#FAF8F5]">
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:pt-4">
          
          {/* Left Content */}
          <div className="space-y-5 md:space-y-7 order-2 lg:order-1 mt-2 md:mt-0">
            
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-[26px] md:text-4xl lg:text-5xl font-black text-[#2D1B15] leading-tight">
                Daily Horoscope
              </h1>
              <h2 className="text-[16px] md:text-2xl font-bold text-[#FF6B00]">
                Your Guide for Today
              </h2>
            </div>

            <p className="text-[13px] md:text-base text-slate-600 max-w-lg leading-relaxed">
              Get accurate daily predictions based on ancient Vedic Astrology. Discover what the stars have in store for your love life, career growth, health, and financial well-being today.
            </p>

            <div className="flex flex-col gap-5 pt-2">
              {/* Date Selector */}
              <div>
                <div className="relative inline-flex items-center gap-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm cursor-pointer w-64 hover:border-orange-500 transition-colors text-left overflow-hidden">
                  <input 
                    type="date" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      if (e.target.value) {
                        onDateChange(new Date(e.target.value));
                      }
                    }}
                  />
                  <FiCalendar className="w-5 h-5 text-slate-400 pointer-events-none" />
                  <div className="flex-1 pointer-events-none">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Select Date</p>
                    <p className="text-sm font-bold text-slate-900">
                      {selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <FiChevronDown className="w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Trust Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/50 border border-orange-200 text-[#FF6B00] text-[11px] md:text-xs font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]"></span>
                  </span>
                  100% Free & Accurate
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-square lg:mt-10">
              {/* Zodiac Wheel Background */}
              <Image
                src="/images/Expert-h.png"
                alt="Zodiac Background"
                fill
                className="object-contain opacity-90 z-0 animate-[spin_40s_linear_infinite]"
                style={{ transformOrigin: "center center" }}
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[80px] -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
