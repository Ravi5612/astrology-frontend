import React from "react";
import Image from "next/image";
import { useLanguageStore } from "@/store/languageStore";
import { matchingTranslations } from "@/lib/translations/calculators/matching";

const HeroComponent = () => {
  const { lang } = useLanguageStore();
  const t = (matchingTranslations[lang as keyof typeof matchingTranslations] || matchingTranslations.en).hero;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900 border-b border-white/5 min-h-[80vh] flex items-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/images/stars-pattern.png')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-700">
               <i className="fa-solid fa-sparkles text-orange text-[10px]"></i>
               <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]" style={fontStyle}>{t.badge}</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100" style={fontStyle}>
                {t.title1} <span className="text-orange italic">{t.titleHighlight}</span>
              </h1>
              <p className="text-gray-400 font-bold max-w-2xl mx-auto lg:mx-0 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200" style={fontStyle}>
                {t.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              {t.features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <span className="text-sm font-black text-white/90 uppercase tracking-widest" style={fontStyle}>{item.text}</span>
                </div>
              ))}
            </div>

            <button
              className="group relative px-10 py-5 bg-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-premium hover:shadow-2xl hover:shadow-orange/20 overflow-hidden transition-all duration-500 active:scale-[0.98] animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400"
              onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative flex items-center justify-center gap-3" style={fontStyle}>
                {t.cta}
                <i className="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
              </span>
            </button>
          </div>

          {/* Right Illustration */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative aspect-square">
              {/* Spinning Zodiac */}
              <Image
                src="/images/horoscope-round2.png"
                alt="Zodiac"
                width={600}
                height={600}
                className="w-full h-full animate-[spin_60s_linear_infinite] opacity-20 filter invert"
              />
              {/* Product Image */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-orange/20 rounded-[3rem] blur-2xl group-hover:bg-orange/30 transition-all duration-500"></div>
                  <Image
                    src="/images/kundali-matching-hero.png"
                    alt="Kundali Matching"
                    width={500}
                    height={500}
                    className="relative z-10 w-full h-auto drop-shadow-2xl rounded-[2.5rem] border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 p-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl animate-bounce-slow">
                  <div className="flex items-center gap-2" style={fontStyle}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{t.accuracyBadge}</span>
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
