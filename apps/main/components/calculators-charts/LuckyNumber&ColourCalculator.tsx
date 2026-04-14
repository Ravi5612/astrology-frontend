"use client";

import React, { useRef } from "react";
import CalculatorHero from "./common/hero";
import LuckyVibesForm from "./LuckyVibesForm";
import LuckyVibesResult from "./LuckyVibesResult";
import { useLuckyVibes } from "./useLuckyVibes";
import { useLanguageStore } from "@/store/languageStore";
import { homeTranslations } from "@/lib/translations/home";

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

const LuckyColorNumberCalculator: React.FC = () => {
  const {
    fullName,
    setFullName,
    dob,
    setDob,
    zodiac,
    setZodiac,
    loading,
    result,
    canCalculate,
    calculate,
  } = useLuckyVibes();

  const { lang } = useLanguageStore();
  const translationSet = (homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en) as any;
  const t = translationSet.calculators.luckyVibes;

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    await calculate();
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] selection:bg-primary/20">
      <style dangerouslySetInnerHTML={{ __html: premiumCardStyles }} />

      <CalculatorHero
        badgeText={t.hero.badge}
        titleMain={t.hero.titleMain}
        titleAccent={t.hero.titleAccent}
        paragraph={t.hero.description}
      />

      <LuckyVibesForm
        fullName={fullName}
        dob={dob}
        zodiac={zodiac}
        loading={loading}
        canCalculate={canCalculate}
        setFullName={setFullName}
        setDob={setDob}
        setZodiac={setZodiac}
        handleCalculate={handleCalculate}
      />

      <div ref={resultsRef}>
        {result && <LuckyVibesResult result={result} />}
      </div>
    </div>
  );
};

export default LuckyColorNumberCalculator;
