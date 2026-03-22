"use client";

import { loveCalculatorTranslations } from "@/lib/translations/calculators/love-calculator";
import { useLanguageStore } from "@/store/languageStore";
import React from "react";
import {
  GiFlowerEmblem,
  GiLotus,
  GiSparkles,
  GiStarShuriken,
} from "react-icons/gi";
import { TbCrystalBall } from "react-icons/tb";

type HeroComponentProps = {
  activeMode: "simple" | "advanced";
  setActiveMode: React.Dispatch<React.SetStateAction<"simple" | "advanced">>;
};

const HeroComponent = (props: HeroComponentProps) => {
  const { lang, toggleLang } = useLanguageStore();
  const t =
    loveCalculatorTranslations[
      lang as keyof typeof loveCalculatorTranslations
    ] || loveCalculatorTranslations.en;

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#301118] via-[#4a1c26] to-[#301118] text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#fd6410] opacity-[0.05] rounded-full blur-[100px] animate-pulse-soft"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#d4af37] opacity-[0.03] rounded-full blur-[100px] animate-pulse-soft"></div>

        {/* Floating Vedic Symbols */}
        <div className="absolute top-[20%] right-[10%] opacity-10 animate-float">
          <GiLotus size={180} className="text-white" />
        </div>
        <div className="absolute bottom-[20%] left-[8%] opacity-5 animate-spin-slow">
          <GiFlowerEmblem size={250} className="text-white font-thin" />
        </div>
        <div
          className="absolute top-[40%] left-[15%] opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <GiStarShuriken size={80} className="text-[#d4af37]" />
        </div>
      </div>

      {/* Language Switcher — top right inside hero overlay */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
        >
          <span className="text-base">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      <div className="container relative z-10 px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#fd6410] text-white px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-[4px] mb-8 animate-fade-in">
            {t.hero.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none overflow-visible py-2">
            {t.hero.titleMain}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd6410] via-[#ff8c42] to-[#fd6410]">
              {t.hero.titleAccent}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100/60 leading-relaxed font-light italic mb-12">
            {t.hero.paragraph}
          </p>

          {/* Mode Switcher */}
          <div className="inline-flex p-2 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 gap-2 mb-8">
            <button
              onClick={() => props.setActiveMode("simple")}
              style={{ borderRadius: "9999px" }}
              className={`flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-500 ${
                props.activeMode === "simple"
                  ? "bg-gradient-to-r from-[#fd6410] to-[#ff8c42] text-white shadow-xl scale-105"
                  : "hover:bg-white/5 text-white/60"
              }`}
            >
              <TbCrystalBall size={20} />
              Simple Match
            </button>
            <button
              onClick={() => props.setActiveMode("advanced")}
              style={{ borderRadius: "9999px" }}
              className={`flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest transition-all duration-500 ${
                props.activeMode === "advanced"
                  ? "bg-gradient-to-r from-[#fd6410] to-[#ff8c42] text-white shadow-xl scale-105"
                  : "hover:bg-white/5 text-white/60"
              }`}
            >
              <GiSparkles size={20} />
              Advanced Guna
            </button>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-[#301118] bg-gray-200 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 15}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-orange-100/40">
              <span className="text-white">10M+</span>{" "}
              {t.hero.connectionsCount.replace("{count}", "")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
