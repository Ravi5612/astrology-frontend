import React from "react";
import Image from "next/image";
import { FaPray } from "react-icons/fa";
import { useLanguageStore } from "@/store/languageStore";
import { pujaTranslations } from "@/lib/translations/puja";

const HeroSection = () => {
  const { lang } = useLanguageStore();
  const t = (pujaTranslations[lang as keyof typeof pujaTranslations] || pujaTranslations.en).hero;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <section className="relative bg-[#301118] text-white overflow-hidden">
      {/* Background Overlay to match 'overlay-hero' */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Left Content (col-lg-7) */}
          <div className="w-full lg:w-7/12 px-4 mb-12 lg:mb-0">
            <div className="relative">
              <span className="inline-block bg-orange-500/10 text-orange-400 border border-orange-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm" style={fontStyle}>
                {t.badge}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight" style={fontStyle}>
                {t.title}
              </h1>
              <h4 className="text-xl md:text-2xl font-bold text-orange-100/80 mb-6" style={fontStyle}>
                {t.subtitle}
              </h4>
              <p className="text-lg text-orange-100/60 mb-8 max-w-xl" style={fontStyle}>
                {t.description}
              </p>
              <ul className="space-y-4 mb-10">
                {t.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-orange-100/70 font-medium" style={fontStyle}>
                    <i className="fa-solid fa-check text-orange-500"></i> {feature}
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.2em] text-xs hover:text-orange-400 transition-colors bg-transparent border-0" style={fontStyle}>
                {t.btnBook}
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>
          </div>

          {/* Right Illustration (col-lg-5) */}
          <div className="w-full lg:w-5/12 px-4 text-center">
            <div className="relative inline-block w-full max-w-[500px]">
              <Image
                src="/images/horoscope-round2.png"
                alt="Zodiac"
                width={500}
                height={500}
                className="w-full h-auto animate-[spin_60s_linear_infinite] opacity-30 filter invert pointer-events-none"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-white rounded-full flex items-center justify-center border-4 border-orange-500 shadow-[0_20px_50px_rgba(253,100,16,0.3)] animate-pulse">
                  <FaPray className="text-orange-500 text-6xl md:text-8xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
