"use client";
import React from "react";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import NextLink from "next/link";
import NextImage from "next/image";
import { useLanguageStore } from "@repo/store";
import { homeTranslations } from "../../../lib/translations/home";

const Link = NextLink as any;
const Image = NextImage as any;

const ChooseYourZodiac = () => {
  const { lang } = useLanguageStore();
  const tHome = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

  const title1 = tHome.zodiac.title1;
  const highlight = tHome.zodiac.highlight;
  const title2 = tHome.zodiac.title2;
  const desc = tHome.zodiac.desc;

  return (
    <section 
      className="py-20 relative overflow-hidden bg-[#faf8f5]"
      style={{
        backgroundImage: "url('/images/back-image.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-white/30"></div>
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="p-8 md:p-12">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter relative inline-block"
              style={{
                fontFamily:
                  lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
              }}
            >
              {title1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 italic pr-2">{highlight}</span>{" "}
              {title2}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full opacity-30"></div>
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg italic mt-8 border-l-4 border-orange-500/30 pl-6 leading-relaxed text-left md:text-center md:border-l-0 md:pl-0">{desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 font-display">
            {ZodiacSignsData.map((sign) => (
              <Link
                href={`/horoscope/${sign.title.toLowerCase()}`}
                key={sign.id}
                className="block group no-underline"
              >
                <div className="group relative p-6 rounded-[2.5rem] border border-orange-500/20 bg-white hover:border-orange-500/30 hover:bg-orange-50/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.1)] transition-all duration-700 no-underline flex flex-col items-center justify-center gap-4 overflow-hidden h-full">
                  {/* Default subtle aura */}
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative w-20 h-20 group-hover:scale-110 transition-transform duration-700 drop-shadow-md">
                    {/* Decorative aura behind image */}
                    <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
                    <Image
                      src={sign.image}
                      alt={sign.title}
                      fill
                      sizes="96px"
                      unoptimized={true}
                      className="object-contain rounded-full relative z-10"
                    />
                  </div>
                  <div className="text-center relative z-10">
                    <h3 className="text-sm md:text-base font-black mb-1 text-slate-900 group-hover:text-orange-600 transition-colors uppercase tracking-widest leading-none">
                      {lang === "hi" ? sign.title : sign.title} 
                    </h3>
                    <p className="text-[10px] text-orange-500/60 font-black uppercase tracking-[0.2em] relative z-10 mt-2">
                      {sign.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourZodiac;
