"use client";
import React from "react";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import NextLink from "next/link";
import NextImage from "next/image";
import { useLanguageStore } from "../../../store/languageStore";
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
    <section className="py-20 relative overflow-hidden bg-bg-light">
      <div className="container">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-premium border border-primary/5">
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-black text-secondary mb-4 relative inline-block"
              style={{
                fontFamily:
                  lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
              }}
            >
              {title1}{" "}
              <span className="text-primary italic">{highlight}</span>{" "}
              {title2}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"></div>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg mt-6">{desc}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {ZodiacSignsData.map((sign) => (
              <Link
                href={`/horoscope/${sign.title.toLowerCase()}`}
                key={sign.id}
                className="block group no-underline"
              >
                <div className="bg-white overflow-hidden shadow-sm hover:shadow-premium-hover text-center p-6 rounded-2xl transition-all duration-500 ease-out text-secondary hover:-translate-y-2 flex flex-col items-center justify-center cursor-pointer border border-gray-100 hover:border-primary/30">
                  <div className="relative w-24 h-24 mb-4">
                    {/* Decorative aura on hover */}
                    <div className="absolute inset-0 bg-primary/0 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
                    <Image
                      src={sign.image}
                      alt={sign.title}
                      fill
                      className="object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                    />
                  </div>
                  <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors tracking-tight">
                    {sign.title}
                  </h3>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">
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
