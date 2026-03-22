"use client";

import React from "react";
import Image from "next/image";
import { useLanguageStore } from "@/store/languageStore";
import { horoscopeTranslations } from "@/lib/horoscope-translations";
import { ZodiacData } from "@/components/features/services/zodiac";

type HeroComponentProps = {
  selectedSign: ZodiacData;
};

const HeroComponent = (props: HeroComponentProps) => {
  const { lang, toggleLang } = useLanguageStore();
  const t = horoscopeTranslations[lang];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-secondary text-white">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Language Switcher — top right inside hero */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
          title={t.switchLangLabel}
        >
          <span className="text-base">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
          {t.switchLang}
        </button>
      </div>

      <div className="container relative z-10">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6 border border-primary/30 backdrop-blur-sm">
                {t.badge}
              </span>
              <h1
                className="text-5xl lg:text-7xl font-black mb-6 leading-tight"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.heroTitle1}{" "}
                <span className="text-primary italic">{t.heroHighlight}</span>{" "}
                {t.heroTitle2}
              </h1>
              <p
                className="text-lg text-white/80 mb-8 leading-relaxed"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {t.features.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-sm"
                  >
                    <i className="fa-solid fa-circle-check text-primary text-xs"></i>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#predictions"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:scale-105 no-underline"
              >
                {t.heroBtn}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all duration-700"></div>
              <div className="relative aspect-square max-w-md mx-auto">
                <Image
                  src="/images/horoscope-round2.png"
                  alt="Zodiac Wheel"
                  fill
                  className="animate-[spin_60s_linear_infinite] opacity-40 object-contain p-4"
                />
                <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center p-12">
                  <Image
                    src={props.selectedSign.image}
                    alt={props.selectedSign.title}
                    width={300}
                    height={300}
                    className="object-contain drop-shadow-[0_0_30px_rgba(255,107,0,0.5)] transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
