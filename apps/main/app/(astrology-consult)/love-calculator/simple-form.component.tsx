"use client";

import React from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { GiLotus } from "react-icons/gi";
import { SimpleFormProps } from "@/lib/types";

const SimpleForm = ({
  t,
  loading,
  simpleData,
  handleSimpleInputChange,
  calculateSimpleLove,
}: SimpleFormProps) => {
  return (
    <form onSubmit={calculateSimpleLove} className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
          {t.form.simpleTitle.split("{percentage}")[0]}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
            {t.form.percentage}
          </span>{" "}
          {t.form.simpleTitle.split("{percentage}")[1]}
        </h2>
        <p className="text-slate-400 font-bold italic text-sm tracking-wide">
          {t.form.subtitle || "Discover the celestial alignment of your hearts"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 relative">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <GiLotus size={300} className="text-red-500 animate-[spin_60s_linear_infinite]" />
        </div>

        {/* Person 1 */}
        <div className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
              {t.form.yourName}
            </label>
            <input
              type="text"
              required
              className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 focus:border-red-500 focus:ring-8 focus:ring-red-500/5 outline-none transition-all placeholder:text-slate-200 text-slate-700 font-black text-sm bg-slate-50/50 hover:bg-white"
              placeholder={t.form.yourNamePlaceholder}
              value={simpleData.p1Name}
              onChange={(e) =>
                handleSimpleInputChange("p1Name", e.target.value)
              }
            />
          </div>

          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
            <button
              type="button"
              onClick={() => handleSimpleInputChange("p1Gender", "male")}
              className={`flex-1 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
                simpleData.p1Gender === "male"
                  ? "bg-slate-900 text-white shadow-xl"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.form.male}
            </button>
            <button
              type="button"
              onClick={() => handleSimpleInputChange("p1Gender", "female")}
              className={`flex-1 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
                simpleData.p1Gender === "female"
                  ? "bg-slate-900 text-white shadow-xl"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.form.female}
            </button>
          </div>
        </div>

        {/* Center Heart Icon */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
           <div className="w-16 h-16 bg-white rounded-full border border-slate-100 shadow-2xl flex items-center justify-center text-red-500 animate-bounce-slow">
              <FaHeart size={24} />
           </div>
        </div>

        {/* Person 2 */}
        <div className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
              {t.form.partnerName}
            </label>
            <input
              type="text"
              required
              className="w-full px-8 py-5 rounded-3xl border-2 border-slate-50 focus:border-red-500 focus:ring-8 focus:ring-red-500/5 outline-none transition-all placeholder:text-slate-200 text-slate-700 font-black text-sm bg-slate-50/50 hover:bg-white"
              placeholder={t.form.partnerNamePlaceholder}
              value={simpleData.p2Name}
              onChange={(e) =>
                handleSimpleInputChange("p2Name", e.target.value)
              }
            />
          </div>

          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
            <button
              type="button"
              onClick={() => handleSimpleInputChange("p2Gender", "male")}
              className={`flex-1 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
                simpleData.p2Gender === "male"
                  ? "bg-slate-900 text-white shadow-xl"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.form.male}
            </button>
            <button
              type="button"
              onClick={() => handleSimpleInputChange("p2Gender", "female")}
              className={`flex-1 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
                simpleData.p2Gender === "female"
                  ? "bg-slate-900 text-white shadow-xl"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {t.form.female}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <button
          type="submit"
          disabled={loading}
          className="group relative inline-flex items-center gap-4 bg-red-600 text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-red-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-500 shadow-[0_20px_50px_rgba(220,38,38,0.25)] hover:shadow-[0_25px_60px_rgba(220,38,38,0.35)] disabled:opacity-50"
        >
          <span className="flex items-center gap-4">
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaHeart className="group-hover:scale-125 transition-transform duration-500" />
            )}
            {loading ? t.form.calculating : t.form.calculateLove}
          </span>
        </button>
      </div>
    </form>
  );
};

export default SimpleForm;
