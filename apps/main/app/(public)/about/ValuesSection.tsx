"use client";

import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { aboutTranslations } from "@/lib/translations/about";

const ValuesSection: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

  const values = [
    {
      icon: "fa-solid fa-shield-halved",
      title: t.value1Title,
      desc: t.value1Desc,
    },
    {
      icon: "fa-solid fa-user-shield",
      title: t.value2Title,
      desc: t.value2Desc,
    },
    {
      icon: "fa-solid fa-star",
      title: t.value3Title,
      desc: t.value3Desc,
    },
    {
      icon: "fa-solid fa-hand-holding-heart",
      title: t.value4Title,
      desc: t.value4Desc,
    },
  ];

  return (
    <section className="py-20 relative bg-[#fafafa]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="uppercase font-bold text-sm text-orange-500 tracking-widest block mb-2">
            {t.valuesTag}
          </span>
          <h2 className="font-bold text-4xl text-[#1a0a00]">
            {t.valuesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v, i) => (
            <div 
              key={i} 
              className="rounded-3xl p-6 lg:p-8 flex flex-col items-center text-center relative overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #2b1117 0%, #3e1b23 100%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              {/* Subtle inner top glow for depth */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              {/* Icon Container with glowing orange theme */}
              <div className="mb-6 relative w-[72px] h-[72px] flex items-center justify-center">
                {/* Outer glowing orange ring */}
                <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute inset-2 bg-orange-400 rounded-full opacity-30"></div>
                
                {/* Inner solid solid gradient circle */}
                <div className="relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_4px_10px_rgba(249,115,22,0.4)] border border-orange-300/30">
                  <i className={`${v.icon} text-white text-[22px]`} />
                </div>
              </div>

              {/* Text Content */}
              <h5 className="font-bold text-white mb-3 text-lg lg:text-xl tracking-wide">
                {v.title}
              </h5>
              
              <div className="w-12 h-px bg-orange-500/30 mb-4 mx-auto"></div>

              <p className="text-gray-300 text-sm leading-relaxed max-w-[250px]">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
