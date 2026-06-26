"use client";

import { loveCalculatorTranslations } from "@/lib/translations/calculators/love-calculator";
import { useLanguageStore } from "@repo/store";
import React from "react";
import { TbCrystalBall } from "react-icons/tb";
import CalculatorHero from "@/components/calculators-charts/common/hero";

type HeroComponentProps = {
  activeMode: "simple" | "advanced";
  setActiveMode: React.Dispatch<React.SetStateAction<"simple" | "advanced">>;
};

const HeroComponent = (props: HeroComponentProps) => {
  const { lang } = useLanguageStore();
  const t =
    loveCalculatorTranslations[
      lang as keyof typeof loveCalculatorTranslations
    ] || loveCalculatorTranslations.en;

  return (
    <>
      <CalculatorHero
        badgeText={t.hero.badge}
        titleMain={t.hero.titleMain}
        titleAccent={t.hero.titleAccent}
        paragraph={t.hero.paragraph}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 mb-4 relative z-10">
        {/* Mode Switcher */}
        <div className="flex flex-col sm:flex-row p-2 bg-white rounded-[2rem] sm:rounded-[3rem] border border-orange-500/20 gap-2 shadow-xl relative group overflow-hidden max-w-2xl mx-auto">
          <button
            onClick={() => props.setActiveMode("simple")}
            className={`relative z-10 flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 rounded-[1.5rem] sm:rounded-[2rem] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 ${
              props.activeMode === "simple"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-950/40 scale-105"
                : "text-gray-500 hover:text-orange-500"
            }`}
          >
            <TbCrystalBall size={22} className={props.activeMode === "simple" ? "animate-spin-slow" : ""} />
            Simple Match
          </button>
          <button
            onClick={() => props.setActiveMode("advanced")}
            className={`relative z-10 flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 rounded-[1.5rem] sm:rounded-[2rem] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 flex-1 ${
              props.activeMode === "advanced"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-950/40 scale-105"
                : "text-gray-500 hover:text-orange-500"
            }`}
          >
            <TbCrystalBall size={22} className={props.activeMode === "advanced" ? "animate-spin-slow" : ""} />
            Advanced Match
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroComponent;
