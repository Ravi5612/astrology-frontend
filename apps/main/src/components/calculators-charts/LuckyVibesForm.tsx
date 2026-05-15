"use client";

import React from "react";
import {
  FaArrowRight,
  FaSpinner,
  FaCalendarAlt,
} from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";
import { GiLotus } from "react-icons/gi";
import { ZodiacSign, SIGNS, elementBySign } from "./useLuckyVibes";
import { LuckyVibesFormProps } from "@/lib/types/calculator";
import { useLanguageStore } from "@repo/store";
import { homeTranslations } from "@/lib/translations/home";

const LuckyVibesForm: React.FC<LuckyVibesFormProps> = ({
  fullName,
  dob,
  zodiac,
  loading,
  canCalculate,
  setFullName,
  setDob,
  setZodiac,
  handleCalculate,
}) => {
  const { lang } = useLanguageStore();
  const translationSet = (homeTranslations[lang as "en" | "hi"] || homeTranslations.en) as any;
  const t = translationSet.calculators.luckyVibes;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-6">
        <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(48,17,24,0.1)] border-t-4 border-t-primary/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
            <GiLotus size={150} />
          </div>

          <div className="text-center mb-10">
            <h2 className="text-xl md:text-3xl font-black text-burgundy mb-2 tracking-tight" style={fontStyle}>
              {t.form.title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2"></div>
          </div>

          <form onSubmit={handleCalculate} className="max-w-4xl mx-auto">
            <div className="glass-card rounded-[2.5rem] p-6 md:p-10 shadow-[0_15px_40px_rgba(48,17,24,0.08)] border border-burgundy/5 relative overflow-hidden bg-white space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-bold text-burgundy/60 uppercase tracking-widest pl-1" style={fontStyle}>
                    {t.form.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    style={{ borderRadius: "9999px" }}
                    className="w-full mt-2 bg-[#fdf2f2] border-2 border-burgundy/5 px-5 py-3.5 text-burgundy font-bold focus:border-red-500 outline-none transition-all placeholder:text-gray-300 shadow-sm text-sm"
                    placeholder={t.form.namePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-burgundy/60 uppercase tracking-widest pl-1" style={fontStyle}>
                    {t.form.dobLabel}
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="date"
                      required
                      style={{ borderRadius: "9999px" }}
                      className="w-full bg-white border-2 border-burgundy/5 px-5 py-3.5 text-burgundy font-bold focus:border-primary outline-none transition-all shadow-sm text-sm"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-burgundy/30">
                      <FaCalendarAlt size={14} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-burgundy/60 uppercase tracking-widest pl-1" style={fontStyle}>
                  {t.form.zodiacLabel}
                </label>
                <select
                  value={zodiac}
                  onChange={(e) => setZodiac(e.target.value as ZodiacSign)}
                  style={{ borderRadius: "9999px" }}
                  className="w-full mt-2 bg-white border-2 border-burgundy/5 px-5 py-3.5 text-burgundy font-black focus:border-primary outline-none transition-all shadow-sm text-sm"
                >
                  {SIGNS.map((s) => (
                    <option key={s} value={s} style={fontStyle}>
                      {t.dynamic.zodiac[s] || s}
                    </option>
                  ))}
                </select>

                <p className="m-0 mt-3 text-xs text-gray-400 italic" style={fontStyle}>
                  {t.form.elementLabel}: <span className="font-black">{t.dynamic.elements[elementBySign(zodiac)] || elementBySign(zodiac)}</span>
                </p>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={loading || !canCalculate}
                  className="relative group inline-flex items-center gap-3 bg-red-600 text-white px-10 py-4 font-black uppercase tracking-[2px] text-xs hover:bg-red-700 transition-all duration-500 shadow-xl disabled:opacity-50"
                  style={{ borderRadius: "9999px", ...fontStyle }}
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <TbCrystalBall size={18} />}
                  {loading ? t.form.btnGenerating : t.form.btnCalculate}
                  <FaArrowRight className="opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="w-full h-2 bg-red-500/20 rounded-full blur-lg translate-y-2 opacity-50"></div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LuckyVibesForm;
