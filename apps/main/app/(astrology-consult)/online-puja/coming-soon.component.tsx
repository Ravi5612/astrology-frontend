import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { useLanguageStore } from "@/store/languageStore";
import { pujaTranslations } from "@/lib/translations/puja";

const ComingSoonSection = () => {
  const { lang } = useLanguageStore();
  const t = (pujaTranslations[lang as keyof typeof pujaTranslations] || pujaTranslations.en).comingSoon;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <section className="py-24 bg-[#FFF9F4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-[#fd64102b] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden max-w-4xl mx-auto rounded-[2rem]">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fd64100d] rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="bg-[#fd6410] w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl">
            <HiOutlineSparkles className="text-white text-4xl animate-spin-slow" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#301118] mb-4" style={fontStyle}>
            {t.title}
          </h2>
          <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-8" style={fontStyle}>
            {t.reveal}
          </p>

          <p className="text-gray-500 italic max-w-2xl mx-auto mb-12 leading-relaxed" style={fontStyle}>
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 py-4 px-12 bg-[#fd6410] text-white rounded-full shadow-xl font-bold no-underline hover:bg-orange-600 transition-colors"
              style={fontStyle}
            >
              <FaArrowLeft size={12} /> {t.btnBack}
            </Link>
            <button className="bg-[#301118] text-white px-12 py-4 rounded-full text-sm font-bold hover:bg-[#4a1a25] transition-colors border-0" style={fontStyle}>
              {t.btnNotify}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
