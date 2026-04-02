"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  FaUser,
  FaArrowRight,
  FaSpinner,
  FaRing,
  FaRegCalendarAlt as FaCalendar,
} from "react-icons/fa";

import { TbCrystalBall } from "react-icons/tb";
import { GiLotus, GiSparkles } from "react-icons/gi";

import CalculatorHero from "./common/hero";
import MarriageAgeForm from "./MarriageAgeForm.component";
import { useLanguageStore } from "@/store/languageStore";
import { marriageAgeTranslations } from "@/lib/translations/calculators/marriage-age";

import { MarriageResult } from "@/lib/types/calculator";

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
  return name.trim().toLowerCase();
};

const hashSeed = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getBirthYearFromDob = (dob: string): number | null => {
  if (!dob) return null;
  const year = Number(dob.split("-")[0]);
  if (!year || Number.isNaN(year)) return null;
  return year;
};

const MarriageAgeCalculator: React.FC = () => {
  const { lang, toggleLang } = useLanguageStore();
  const t = marriageAgeTranslations[lang as keyof typeof marriageAgeTranslations] || marriageAgeTranslations.en;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>(""); // optional
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<MarriageResult | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const normalizedNameValue = useMemo(() => normalizeName(name), [name]);

  const canCalculate = useMemo(() => {
    return normalizedNameValue.length > 0;
  }, [normalizedNameValue]);

  const stableKey = useMemo(() => {
    const safeDob = dob ? dob : "";
    return `${normalizedNameValue}|${safeDob}`;
  }, [normalizedNameValue, dob]);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCalculate) return;

    setLoading(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 650));

    const seed = hashSeed(stableKey);
    const startAge = 22 + (seed % 8);
    const endAge = startAge + 2 + (seed % 3);

    const currentYear = new Date().getFullYear();
    const birthYear = getBirthYearFromDob(dob);

    let bestYear = currentYear + (seed % 5);
    let hasDobValue = false;

    if (birthYear) {
      hasDobValue = true;
      bestYear = birthYear + startAge + (seed % 2);
    }

    setResult({ startAge, endAge, bestYear, hasDob: hasDobValue });

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

      <MarriageAgeForm
        name={name}
        setName={setName}
        dob={dob}
        setDob={setDob}
        loading={loading}
        canCalculate={canCalculate}
        handleCalculate={handleCalculate}
        t={t.form}
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
                        {t.results.title} <span className="text-primary">{t.results.titleAccent}</span>
                      </h2>

                      <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-16"></div>
                    </div>

                    <div className="flex flex-col items-center">
                      {/* Ring */}
                      <div className="relative mb-16">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border-8 border-orange-50 relative group">
                          <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin-slow opacity-20"></div>

                          <div className="text-center">
                            <span className="block text-5xl md:text-7xl font-black text-burgundy leading-none group-hover:scale-110 transition-transform duration-500">
                              {result.startAge}–{result.endAge}
                            </span>
                            <span className="text-[12px] font-black uppercase tracking-[4px] text-primary mt-4 block" style={fontStyle}>
                              {t.results.ageWindow}
                            </span>
                          </div>

                          <FaRing className="absolute -top-4 -right-4 text-primary text-5xl animate-bounce shadow-xl" />
                        </div>
                      </div>

                      {/* Text Results */}
                      <div className="max-w-2xl text-center">
                        <div className="bg-burgundy text-white p-10 rounded-[3rem] shadow-2xl relative">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-2xl shadow-lg">
                            <GiSparkles size={28} />
                          </div>

                          <p className="text-xl md:text-2xl font-light italic leading-relaxed text-orange-100/90 m-0" style={fontStyle}>
                            {t.results.windowLabel}{" "}
                            <span className="font-black text-white ml-2">
                              {result.startAge}–{result.endAge}
                            </span>
                          </p>

                          <p className="text-lg md:text-xl font-light italic leading-relaxed text-orange-100/80 mt-6 m-0" style={fontStyle}>
                            {t.results.bestYearLabel}{" "}
                            <span className="font-black text-white ml-2">
                              {result.bestYear}
                            </span>
                          </p>

                          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-[4px] text-orange-100/70" style={fontStyle}>
                              {t.results.disclaimer}
                            </span>
                          </div>

                          {!result.hasDob && (
                            <p className="m-0 mt-6 text-xs text-orange-100/50 italic" style={fontStyle}>
                              {t.results.dobNote}
                            </p>
                          )}
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

export default MarriageAgeCalculator;


