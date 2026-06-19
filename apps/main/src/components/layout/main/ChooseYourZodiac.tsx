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
    <section className="py-20 relative overflow-hidden bg-slate-950 text-white">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <div className="p-8 md:p-12">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter relative inline-block"
              style={{
                fontFamily:
                  lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
              }}
            >
              {title1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 italic pr-2">{highlight}</span>{" "}
              {title2}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg italic mt-8 border-l-4 border-orange-500/30 pl-6 leading-relaxed text-left md:text-center md:border-l-0 md:pl-0">{desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 font-display">
            {ZodiacSignsData.map((sign) => (
              <Link
                href={`/horoscope/${sign.title.toLowerCase()}`}
                key={sign.id}
                className="block group no-underline"
              >
                <div className="bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50 text-center p-6 rounded-3xl transition-all duration-500 ease-out text-white hover:-translate-y-2 flex flex-col items-center justify-center cursor-pointer border border-white/10 hover:border-orange-500/50 hover:bg-white/10 relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-24 h-24 mb-6">
                    {/* Decorative aura on hover */}
                    <div className="absolute inset-0 bg-orange-500/0 rounded-full blur-xl group-hover:bg-orange-500/20 transition-all duration-500"></div>
                    <Image
                      src={sign.image}
                      alt={sign.title}
                      fill
                      sizes="96px"
                      unoptimized={true}
                      className="object-contain rounded-full relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    />
                  </div>
                  <h3 className="text-xl font-black mb-2 text-white group-hover:text-orange-500 transition-colors tracking-tight relative z-10">
                    {lang === "hi" ? sign.title : sign.title} 
                  </h3>
                  <p className="text-[10px] text-orange-500/80 font-black uppercase tracking-[0.2em] relative z-10">
                    {sign.date}
                  </p>
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
