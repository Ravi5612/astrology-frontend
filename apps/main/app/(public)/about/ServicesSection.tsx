"use client";

import React from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { aboutTranslations } from "@/lib/translations/about";

const ServicesSection: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

  const services = [
    {
      icon: "fa-comments",
      label: t.service1Label,
      desc: t.service1Desc,
      link: "/our-experts",
    },
    {
      icon: "fa-phone",
      label: t.service2Label,
      desc: t.service2Desc,
      link: "/our-experts",
    },
    {
      icon: "fa-video",
      label: t.service3Label,
      desc: t.service3Desc,
      link: "/our-experts",
    },
    {
      icon: "fa-scroll",
      label: t.service4Label,
      desc: t.service4Desc,
    },
    {
      icon: "fa-heart",
      label: t.service5Label,
      desc: t.service5Desc,
    },
    {
      icon: "fa-ring",
      label: t.service6Label,
      desc: t.service6Desc,
      link: "/online-puja",
    },
    {
      icon: "fa-gem",
      label: t.service7Label,
      desc: t.service7Desc,
    },
    {
      icon: "fa-calculator",
      label: t.service8Label,
      desc: t.service8Desc,
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden font-sans">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white rounded-full border border-orange-200/60 shadow-sm mb-5">
             <i className="fa-solid fa-angles-right text-orange-500 text-[10px]" />
             <span className="text-[11px] font-bold text-[#2b1115] uppercase tracking-[0.2em]">{t.servicesTag}</span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-[2.75rem] font-black text-[#2b1115] tracking-tight uppercase mb-4 drop-shadow-sm">
            {t.servicesTitle}
          </h2>
          
          {/* Underline Gradient */}
          <div className="w-16 h-1 mt-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-8 relative z-[50] pointer-events-auto">
          {services.map((svc, i) => {
            const isClickable = !!svc.link;
            
            const cardContent = (
              <div 
                className={`group rounded-3xl p-6 lg:p-8 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 h-full w-full pointer-events-auto z-[60] bg-clip-padding ${
                  isClickable ? 'hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] cursor-pointer' : ''
                }`}
                style={{
                  background: "linear-gradient(135deg, #2b1117 0%, #3e1b23 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              >
                {/* Subtle inner top glow for depth */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>

                {/* Hover Glow Highlight */}
                {isClickable && (
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                )}

                {/* Icon Container with glowing orange theme */}
                <div className="mb-6 relative w-[72px] h-[72px] flex items-center justify-center pointer-events-none z-10">
                  {/* Outer glowing orange ring */}
                  <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 blur-md group-hover:opacity-50 transition-all duration-300"></div>
                  <div className="absolute inset-2 bg-orange-400 rounded-full opacity-40"></div>
                  
                  {/* Inner solid gradient circle */}
                  <div className="relative z-20 w-[52px] h-[52px] rounded-full flex items-center justify-center bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_4px_10px_rgba(249,115,22,0.4)] border border-orange-300/30">
                    <i className={`fa-solid ${svc.icon} text-white text-[20px]`} />
                  </div>
                </div>
                
                {/* Card Title */}
                <h6 className={`text-[14px] font-bold text-white uppercase tracking-wider mb-3 leading-tight transition-colors relative z-10 ${isClickable ? 'group-hover:text-orange-400' : ''}`}>
                  {svc.label}
                </h6>
                
                {/* Separator inside Card */}
                <div className={`w-12 h-px bg-orange-500/30 mb-4 mx-auto relative z-10 transition-colors ${isClickable ? 'group-hover:bg-orange-400/50' : ''}`}></div>

                {/* Card Description */}
                <p className="text-[12.5px] font-medium text-gray-300 leading-relaxed max-w-[200px] relative z-10">
                  {svc.desc}
                </p>
              </div>
            );

            return isClickable ? (
              <Link 
                key={i}
                href={svc.link as string}
                className="block h-full w-full no-underline relative z-[50]"
                style={{ cursor: "pointer", pointerEvents: "auto" }}
              >
                {cardContent}
              </Link>
            ) : (
              <div key={i} className="h-full w-full relative z-[50]">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
