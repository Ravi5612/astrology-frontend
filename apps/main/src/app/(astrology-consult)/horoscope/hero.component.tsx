"use client";

import React from "react";
import Image from "next/image";
import { useLanguageStore } from "@repo/store";
import { horoscopeTranslations } from "@repo/store";
import { ZodiacData } from "@/components/features/services/zodiac";

type HeroComponentProps = {
  selectedSign: ZodiacData;
};

const HeroComponent = ({ selectedSign }: HeroComponentProps) => {
  const { lang, toggleLang } = useLanguageStore();
  const t = horoscopeTranslations[lang];

  return (
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-32 bg-slate-950 text-white">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>
      


      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Content Side */}
          <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">{t.badge}</span>
              </div>
              
              <h1
                className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tighter"
                style={{
                  fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
                }}
              >
                {t.heroTitle1}{" "}
                <span className="text-orange-500 italic">{t.heroHighlight}</span>{" "}
                {t.heroTitle2}
              </h1>
              
              <p
                className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed italic border-l-4 border-orange-500/30 pl-6 md:pl-8"
                style={{
                  fontFamily: lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
                }}
              >
                {t.heroDesc}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {t.features.map((item: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white/5 border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-default"
                >
                  <i className="fa-solid fa-circle-check text-orange-500 text-[10px] group-hover:scale-125 transition-transform"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a
                href="#predictions"
                className="group relative inline-flex items-center justify-center gap-4 bg-orange-600 text-white px-8 py-4 md:px-12 md:py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl shadow-orange-500/20 hover:bg-white hover:text-slate-950 hover:-translate-y-1 active:scale-95 overflow-hidden no-underline"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">{t.heroBtn}</span>
                <i className="fa-solid fa-arrow-right-long relative z-10 group-hover:translate-x-2 transition-transform"></i>
              </a>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative group">
              {/* Animated Glow */}
              <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-1000"></div>
              
              <div className="relative aspect-square w-[85%] lg:w-full max-w-[320px] lg:max-w-md mx-auto p-4 lg:p-12 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 shadow-2xl shadow-black/50 overflow-hidden transform transition-transform duration-700 group-hover:-translate-y-4">
                <Image
                  src="/images/horoscope-round2.png"
                  alt="Zodiac Wheel"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={true}
                  className="animate-[spin_60s_linear_infinite] opacity-20 object-contain p-2 lg:p-8"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-16">
                  <div className="relative w-full h-full lg:w-full lg:h-full scale-[1.05] lg:scale-100 flex items-center justify-center">
                    <Image
                      src={selectedSign.image}
                      alt={selectedSign.title}
                      width={320}
                      height={320}
                      unoptimized={true}
                      className="object-contain rounded-full drop-shadow-[0_0_50px_rgba(249,115,22,0.6)] transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating Orbit Bits */}
                <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-orange-500 rounded-full blur-[2px] animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-indigo-400 rounded-full blur-[1px] animate-pulse delay-700"></div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
