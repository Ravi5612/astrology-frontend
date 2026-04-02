"use client";
import React from 'react'
import { useLanguageStore } from "../../../store/languageStore";
import { homeTranslations } from "../../../lib/translations/home";

const CTA = () => {
  const { lang } = useLanguageStore();
  const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

  return (
    <section className="py-12 md:py-16 bg-cover bg-center bg-no-repeat relative bg-[#301118] bg-[url('/images/back-over.jpg')] bg-fixed overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h2 className="text-3xl md:text-[40px] font-bold mb-4 text-white leading-tight">
              {t.cta.title}
            </h2>
            <p className="text-lg md:text-xl text-[#ffdcb2] max-w-[700px] mx-auto lg:mx-0 font-medium">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <a
              href="/our-experts"
              className="inline-block py-4 px-10 bg-primary text-white rounded-full text-lg font-bold hover:bg-primary-hover hover:-translate-y-1 transition-all shadow-[0_4px_20px_rgba(255,107,0,0.4)] active:scale-95 no-underline"
            >
              {t.cta.btn}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

