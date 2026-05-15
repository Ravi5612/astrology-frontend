"use client";

import { loveCalculatorTranslations } from "@/lib/translations/calculators/love-calculator";
import { useLanguageStore } from "@repo/store";
import NextImage from "next/image";
import React from "react";
import {
  GiFlowerEmblem,
  GiLotus,
  GiStarShuriken,
} from "react-icons/gi";
import { TbCrystalBall, TbSparkles } from "react-icons/tb";
import { HiOutlineTranslate } from "react-icons/hi";

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
    <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#301118] via-[#4a1c26] to-[#301118] text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        {/* Floating Vedic Symbols */}
        <div className="absolute top-[15%] right-[10%] opacity-[0.03] animate-[spin_60s_linear_infinite]">
          <GiLotus size={350} className="text-white" />
        </div>
        <div className="absolute bottom-[10%] left-[5%] opacity-[0.02] animate-[spin_45s_linear_infinite_reverse]">
          <GiFlowerEmblem size={400} className="text-white font-thin" />
        </div>
        <div className="absolute top-[40%] left-[12%] opacity-[0.05] animate-bounce-slow">
          <GiStarShuriken size={100} className="text-orange-400" />
        </div>
      </div>

      {/* Language Switcher */}
      <div className="absolute top-8 right-8 z-50">
        <button
          onClick={toggleLang}
          className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-xl hover:shadow-2xl shadow-orange-950/20 active:scale-95"
        >
          <HiOutlineTranslate className="text-lg text-orange group-hover:rotate-180 transition-transform duration-500" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          
          <div className="space-y-8 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500/10 text-orange border border-orange-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg shadow-orange-950/40">
              <TbSparkles className="text-sm" />
              {t.hero.badge}
            </span>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] py-4">
              {t.hero.titleMain}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 animate-pulse">
                {t.hero.titleAccent}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-50/60 leading-relaxed font-bold italic max-w-2xl px-4">
              {t.hero.paragraph}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-2 bg-black/30 backdrop-blur-2xl rounded-[3rem] border border-white/5 gap-2 shadow-2xl relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <button
              onClick={() => props.setActiveMode("simple")}
              className={`relative z-10 flex items-center gap-3 px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                props.activeMode === "simple"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-950/40 scale-105"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <TbCrystalBall size={22} className={props.activeMode === "simple" ? "animate-spin-slow" : ""} />
              Simple Match
            </button>
            <button
              onClick={() => props.setActiveMode("advanced")}
              className={`relative z-10 flex items-center gap-3 px-10 py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 ${
                props.activeMode === "advanced"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-950/40 scale-105"
                  : "text-white/40 hover:text-white"
              }`}
            >
              <TbSparkles size={22} className={props.activeMode === "advanced" ? "animate-pulse" : ""} />
              Advanced Guna
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full border-4 border-[#301118] bg-slate-800 overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <NextImage
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt="User"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-left space-y-1">
              <p className="text-lg font-black text-white leading-tight">
                10,000,000+
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/60 m-0">
                {t.hero.connectionsCount.replace("{count}", "")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
