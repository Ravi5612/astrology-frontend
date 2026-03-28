"use client";

import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { aboutTranslations } from "@/lib/translations/about";

const MissionSection: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column Component */}
          <div className="w-full lg:w-1/2">
            <span className="uppercase font-bold text-sm text-orange-500 tracking-widest">
              {t.missionTag}
            </span>
            <h2 className="font-bold mt-2 mb-8 text-4xl text-[#1a0a00] whitespace-pre-line">
              {t.missionTitle}
            </h2>
            <p className="text-gray-500 mb-6 leading-[1.9]">
              {t.missionDesc1}
            </p>
            <p className="text-gray-500 mb-8 leading-[1.9]">
              {t.missionDesc2}
            </p>
            <div className="flex gap-6 flex-wrap">
              {[
                { icon: "fa-check-circle", text: t.missionFeature1 },
                { icon: "fa-check-circle", text: t.missionFeature2 },
                { icon: "fa-check-circle", text: t.missionFeature3 },
              ].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-gray-500 text-sm font-semibold"
                >
                  <i className={`fa-solid ${item.icon} text-orange-500`} />
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column Content */}
          <div className="w-full lg:w-1/2">
            <div
              className="rounded-2xl p-8 md:p-12 h-full min-h-[340px] relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a0a00 0%, #301118 100%)",
              }}
            >
              <div
                className="absolute rounded-full w-[200px] h-[200px] bg-orange-500/10 -top-16 -right-16"
              />
              <div className="relative">
                <i className="fa-solid fa-quote-left fa-2x mb-8 text-orange-500/40" />
                <p className="text-white mb-8 text-lg leading-[1.8]">
                  {t.missionQuote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="rounded-full flex items-center justify-center font-bold text-white text-xl w-[50px] h-[50px] bg-orange-500/30">
                    🕉
                  </div>
                  <div>
                    <div className="text-white font-bold">{t.missionBrand}</div>
                    <div className="text-sm text-white/50">
                      {t.missionSubtext}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
