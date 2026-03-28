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
    <form onSubmit={calculateSimpleLove} className="max-w-3xl mx-auto">
      <div className="glass-card rounded-[2.5rem] p-6 md:p-10 shadow-[0_15px_40px_rgba(48,17,24,0.08)] border border-burgundy/5 relative overflow-hidden bg-white">
        {/* Decorative background for the card */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
          <GiLotus size={150} />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-black text-burgundy mb-2 tracking-tight">
            {t.form.simpleTitle.split("{percentage}")[0]}{" "}
            <span className="text-red-500 underline decoration-red-100 decoration-2 underline-offset-4">
              {t.form.percentage}
            </span>{" "}
            {t.form.simpleTitle.split("{percentage}")[1]}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-2"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-0 md:gap-4 relative">
          {/* Person 1 */}
          <div className="flex-1 w-full space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-burgundy/60 uppercase tracking-widest pl-1">
                {t.form.yourName}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  style={{ borderRadius: "9999px" }}
                  className="w-full bg-[#fdf2f2] border-2 border-burgundy/5 px-5 py-3.5 text-burgundy font-bold focus:border-red-500 outline-none transition-all placeholder:text-gray-300 shadow-sm text-sm"
                  placeholder={t.form.yourNamePlaceholder}
                  value={simpleData.p1Name}
                  onChange={(e) =>
                    handleSimpleInputChange("p1Name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSimpleInputChange("p1Gender", "male")}
                style={{ borderRadius: "9999px" }}
                className={`flex-1 py-2.5 font-black uppercase tracking-widest text-[10px] transition-all shadow-sm ${
                  simpleData.p1Gender === "male"
                    ? "bg-red-500 text-white shadow-red-100"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {t.form.male}
              </button>
              <button
                type="button"
                onClick={() => handleSimpleInputChange("p1Gender", "female")}
                style={{ borderRadius: "9999px" }}
                className={`flex-1 py-2.5 font-black uppercase tracking-widest text-[10px] transition-all shadow-sm ${
                  simpleData.p1Gender === "female"
                    ? "bg-red-500 text-white shadow-red-100"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {t.form.female}
              </button>
            </div>
          </div>

          {/* Divider with Heart */}
          <div className="hidden md:flex flex-col items-center justify-center px-4 relative h-full self-stretch">
            <div className="w-[1px] bg-gray-100 h-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-9 h-9 bg-white rounded-full shadow-md border border-burgundy/5 flex items-center justify-center">
                <FaHeart className="text-red-500" size={16} />
              </div>
            </div>
          </div>

          {/* Mobile Divider (Heart only) */}
          <div className="md:hidden flex items-center justify-center py-6">
            <div className="w-9 h-9 bg-white rounded-full shadow-md border border-burgundy/5 flex items-center justify-center">
              <FaHeart className="text-red-500" size={14} />
            </div>
          </div>

          {/* Person 2 */}
          <div className="flex-1 w-full space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-burgundy/60 uppercase tracking-widest pl-1">
                {t.form.partnerName}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  style={{ borderRadius: "9999px" }}
                  className="w-full bg-[#fdf2f2] border-2 border-burgundy/5 px-5 py-3.5 text-burgundy font-bold focus:border-red-500 outline-none transition-all placeholder:text-gray-300 shadow-sm text-sm"
                  placeholder={t.form.partnerNamePlaceholder}
                  value={simpleData.p2Name}
                  onChange={(e) =>
                    handleSimpleInputChange("p2Name", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSimpleInputChange("p2Gender", "male")}
                style={{ borderRadius: "9999px" }}
                className={`flex-1 py-2.5 font-black uppercase tracking-widest text-[10px] transition-all shadow-sm ${
                  simpleData.p2Gender === "male"
                    ? "bg-red-500 text-white shadow-red-100"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {t.form.male}
              </button>
              <button
                type="button"
                onClick={() => handleSimpleInputChange("p2Gender", "female")}
                style={{ borderRadius: "9999px" }}
                className={`flex-1 py-2.5 font-black uppercase tracking-widest text-[10px] transition-all shadow-sm ${
                  simpleData.p2Gender === "female"
                    ? "bg-red-500 text-white shadow-red-100"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {t.form.female}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={loading}
            style={{ borderRadius: "9999px" }}
            className="relative group inline-flex items-center gap-3 bg-red-600 text-white px-10 py-4 font-black uppercase tracking-[2px] text-xs hover:bg-red-700 transition-all duration-500 shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaHeart className="group-hover:scale-125 transition-transform" />
            )}
            {loading ? t.form.calculating : t.form.calculateLove}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="w-full h-2 bg-red-500/20 rounded-full blur-lg translate-y-2 opacity-50"></div>
      </div>
    </form>
  );
};

export default SimpleForm;
