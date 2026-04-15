"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  FaHeart,
  FaArrowRight,
  FaStar,
  FaBalanceScale,
} from "react-icons/fa";

import { GiLotus, GiSparkles } from "react-icons/gi";

import CalculatorHero from "./common/hero";
import LoveCompatibilityForm from "./LoveCompatibilityForm.component";

import { useLanguageStore } from "@/store/languageStore";
import { loveCompatibilityTranslations } from "@/lib/translations/calculators/love-compatibility";

import { LoveCompatibilityResult as ResultType } from "@/lib/types";

const premiumCardStyles = `
  .glass-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(48, 17, 24, 0.1);
  }
  .text-burgundy { color: #301118; }
  .bg-burgundy { background-color: #301118; }
  .border-burgundy { border-color: #301118; }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow { animation: spin-slow 20s linear infinite; }
`;

const normalizeName = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
};

const clamp = (num: number, min: number, max: number) =>
  Math.max(min, Math.min(max, num));

const hashSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getMessageByLove = (love: number, t: any): string => {
  if (love >= 40 && love <= 55) {
    return t.results.messages.potential;
  }
  if (love >= 56 && love <= 70) {
    return t.results.messages.good;
  }
  if (love >= 71 && love <= 85) {
    return t.results.messages.strong;
  }
  return t.results.messages.excellent;
};

import { CalculatorProgressBarProps as ProgressBarProps } from "@/lib/types";

const ProgressBar: React.FC<ProgressBarProps & { fontStyle?: any }> = ({ label, value, fontStyle }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="m-0 text-[11px] font-black uppercase tracking-[3px] text-burgundy/50" style={fontStyle}>
          {label}
        </p>
        <p className="m-0 text-[11px] font-black uppercase tracking-[3px] text-primary">
          {value}%
        </p>
      </div>

      <div className="w-full h-3 rounded-full bg-primary/10 overflow-hidden border border-orange-100">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

const LoveCompatibilityCalcultor: React.FC = () => {
  const { lang, toggleLang } = useLanguageStore();
  const t = loveCompatibilityTranslations[lang as "en" | "hi"] || loveCompatibilityTranslations.en;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  const [maleName, setMaleName] = useState<string>("");
  const [femaleName, setFemaleName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const normalized = useMemo(() => {
    const n1 = normalizeName(maleName);
    const n2 = normalizeName(femaleName);
    return { n1, n2 };
  }, [maleName, femaleName]);

  const canCalculate = useMemo(() => {
    return normalized.n1.length > 0 && normalized.n2.length > 0;
  }, [normalized.n1, normalized.n2]);

  const stableKey = useMemo(() => {
    if (!canCalculate) return "";
    return [normalized.n1, normalized.n2].sort().join("|");
  }, [normalized.n1, normalized.n2, canCalculate]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCalculate) return;

    setLoading(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 650));

    const seed = hashSeed(stableKey);

    const love = (seed % 61) + 40;
    const trust = clamp(love + ((seed % 21) - 10), 0, 100);
    const romance = clamp(love + (((seed >> 2) % 21) - 10), 0, 100);
    const communication = clamp(love + (((seed >> 4) % 21) - 10), 0, 100);

    const message = getMessageByLove(love, t);

    setResult({ love, trust, romance, communication, message });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] selection:bg-primary/20">
      <style dangerouslySetInnerHTML={{ __html: premiumCardStyles }} />

      {/* Hero */}
      <section className="relative">
        <CalculatorHero
          badgeText={t.hero.badge}
          titleMain={t.hero.titleMain}
          titleAccent={t.hero.titleAccent}
          paragraph={t.hero.paragraph}
        />

        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            <span className="text-base">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>
      </section>

      <LoveCompatibilityForm
        maleName={maleName}
        setMaleName={setMaleName}
        femaleName={femaleName}
        setFemaleName={setFemaleName}
        loading={loading}
        canCalculate={canCalculate}
        handleCalculate={handleCalculate}
        t={t}
        fontStyle={fontStyle}
      />

      {/* Result Section */}
      <div ref={resultsRef}>
        {result && (
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-6">
              <div className="max-w-5xl mx-auto">
                <div className="glass-card rounded-[4rem] p-8 md:p-16 shadow-[0_30px_80px_rgba(48,17,24,0.18)] border border-burgundy/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none">
                    <GiLotus size={300} className="animate-spin-slow" />
                  </div>

                  <div className="relative z-10">
                    <div className="text-center mb-16">
                      <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[3px] mb-8" style={fontStyle}>
                        {t.results.badge}
                      </span>

                      <h2 className="text-4xl md:text-6xl font-black text-burgundy mb-6 tracking-tight" style={fontStyle}>
                        {t.results.title}
                      </h2>

                      <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-16"></div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative mb-16">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border-8 border-orange-50 relative group">
                          <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin-slow opacity-20"></div>

                          <div className="text-center">
                            <span className="block text-7xl md:text-9xl font-black text-burgundy leading-none group-hover:scale-110 transition-transform duration-500">
                              {result.love}
                              <span className="text-4xl text-primary">%</span>
                            </span>
                            <span className="text-[12px] font-black uppercase tracking-[4px] text-primary mt-4 block" style={fontStyle}>
                              {t.results.cosmicBond}
                            </span>
                          </div>

                          <FaHeart className="absolute -top-4 -right-4 text-pink-500 text-5xl animate-bounce shadow-xl" />
                        </div>
                      </div>

                      <div className="max-w-2xl text-center mb-14">
                        <div className="bg-burgundy text-white p-10 rounded-[3rem] shadow-2xl relative">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-2xl shadow-lg">
                            <GiSparkles size={28} />
                          </div>

                          <p className="text-xl md:text-2xl font-light italic leading-relaxed text-orange-100/90 m-0" style={fontStyle}>
                            "{result.message}"
                          </p>
                        </div>
                      </div>

                      <div className="w-full max-w-3xl bg-[#fff9f6] rounded-[3.5rem] p-8 md:p-12 border border-orange-100">
                        <div className="flex items-center justify-between mb-10">
                          <h4 className="text-xl font-black text-burgundy tracking-tight m-0" style={fontStyle}>
                            {t.results.breakdownTitle}
                          </h4>
                          <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-orange-50 flex items-center gap-2">
                            <FaStar className="text-primary" size={14} />
                            <span className="text-xs font-black text-primary uppercase tracking-widest" style={fontStyle}>
                              {t.results.premiumInsight}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <ProgressBar label={t.results.trust} value={result.trust} fontStyle={fontStyle} />
                          <ProgressBar label={t.results.romance} value={result.romance} fontStyle={fontStyle} />
                          <ProgressBar label={t.results.communication} value={result.communication} fontStyle={fontStyle} />
                        </div>

                        <div className="mt-10 flex items-start gap-4 bg-white rounded-2xl p-6 border border-orange-50 shadow-sm">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <FaBalanceScale size={18} />
                          </div>
                          <div>
                            <p className="m-0 text-sm font-black text-burgundy" style={fontStyle}>
                              {t.results.tipTitle}
                            </p>
                            <p className="m-0 text-sm text-gray-500 italic leading-relaxed" style={fontStyle}>
                              {t.results.tipDesc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LoveCompatibilityCalcultor;
