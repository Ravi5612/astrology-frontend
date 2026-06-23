"use client";

import React from "react";
import { FaMars, FaVenus, FaSpinner, FaChevronRight } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import Link from "next/link";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";
import { useLanguageStore } from "@repo/store";
import { matchingTranslations } from "@/lib/translations/calculators/matching";

import { MatchFormProps } from "@/lib/types";

const MatchingForm = ({
  boyDetails,
  girlDetails,
  handleInputChange,
  handleLocationSelect,
  handleMatch,
  loading,
  error,
}: MatchFormProps) => {
  const { lang } = useLanguageStore();
  const t = (matchingTranslations[lang as keyof typeof matchingTranslations] || matchingTranslations.en).form;
  const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Boy's Details */}
          <div className="group">
            <div className="h-full bg-[#1f0b11]/80 backdrop-blur-md rounded-[2.5rem] shadow-premium border border-white/5 p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-orange/20">
              <div className="flex items-center gap-6 mb-10 border-b border-white/5 pb-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-sm border border-blue-100/50 italic font-black text-2xl">
                  <FaMars />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white leading-none" style={fontStyle}>
                    {t.boyTitle}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2" style={fontStyle}>
                    {t.boySubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.name}</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-black/30 border border-white/10 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-white placeholder:text-gray-500"
                    placeholder={t.placeholders.boyName}
                    value={boyDetails.name}
                    onChange={(e) => handleInputChange("boy", "name", e.target.value)}
                    style={fontStyle}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.date}</label>
                    <input
                      type="date"
                      className="w-full px-6 py-4 rounded-2xl bg-black/30 border border-white/10 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-white [color-scheme:dark]"
                      value={boyDetails.date}
                      onChange={(e) => handleInputChange("boy", "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.time}</label>
                    <input
                      type="time"
                      className="w-full px-6 py-4 rounded-2xl bg-black/30 border border-white/10 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-white [color-scheme:dark]"
                      value={boyDetails.time}
                      onChange={(e) => handleInputChange("boy", "time", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.place}</label>
                  <LocationAutocomplete
                    placeholder={t.placeholders.searchPlace}
                    onSelect={(val) => handleLocationSelect("boy", val)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Girl's Details */}
          <div className="group">
            <div className="h-full bg-[#1f0b11]/80 backdrop-blur-md rounded-[2.5rem] shadow-premium border border-white/5 p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 hover:border-orange/20">
              <div className="flex items-center gap-6 mb-10 border-b border-white/5 pb-8">
                <div className="w-16 h-16 rounded-[1.5rem] bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500 shadow-sm border border-rose-100/50 italic font-black text-2xl">
                  <FaVenus />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white leading-none" style={fontStyle}>
                    {t.girlTitle}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2" style={fontStyle}>
                    {t.girlSubtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.name}</label>
                  <input
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-black/30 border border-white/10 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-white placeholder:text-gray-500"
                    placeholder={t.placeholders.girlName}
                    value={girlDetails.name}
                    onChange={(e) => handleInputChange("girl", "name", e.target.value)}
                    style={fontStyle}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.date}</label>
                    <input
                      type="date"
                      className="w-full px-6 py-4 rounded-2xl bg-black/30 border border-white/10 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-white [color-scheme:dark]"
                      value={girlDetails.date}
                      onChange={(e) => handleInputChange("girl", "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.time}</label>
                    <input
                      type="time"
                      className="w-full px-6 py-4 rounded-2xl bg-black/30 border border-white/10 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-white [color-scheme:dark]"
                      value={girlDetails.time}
                      onChange={(e) => handleInputChange("girl", "time", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1" style={fontStyle}>{t.labels.place}</label>
                  <LocationAutocomplete
                    placeholder={t.placeholders.searchPlace}
                    onSelect={(val) => handleLocationSelect("girl", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center">
          {error && (
            <div className="mb-8 p-4 bg-red-900/20 rounded-2xl border border-red-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
               <i className="fa-solid fa-circle-exclamation text-red-500"></i>
               <p className="text-sm font-black text-red-600 uppercase tracking-widest" style={fontStyle}>{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              disabled={loading}
              onClick={handleMatch}
              className="group relative px-12 py-6 bg-orange text-white rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-premium hover:shadow-2xl hover:shadow-orange/20 transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-4" style={fontStyle}>
                {loading ? (
                  <>
                    <span>{t.btnLoading}</span>
                    <FaSpinner className="animate-spin text-orange" />
                  </>
                ) : (
                  <>
                    <span>{t.btnDefault}</span>
                    <i className="fa-solid fa-sparkles text-orange animate-pulse"></i>
                  </>
                )}
              </div>
            </button>

            <Link
              href="/our-experts"
              className="group relative px-12 py-6 bg-transparent border-2 border-orange/50 text-orange rounded-3xl font-black text-xs uppercase tracking-[0.4em] hover:bg-orange/10 hover:border-orange transition-all duration-500 active:scale-[0.98] overflow-hidden w-full sm:w-auto text-center"
            >
              <div className="relative flex items-center justify-center gap-4" style={fontStyle}>
                <span>{t.btnConsult}</span>
                <i className="fa-solid fa-headset text-orange group-hover:scale-110 transition-transform"></i>
              </div>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-2" style={fontStyle}>
               <MdOutlineSecurity size={16} className="text-orange" />
               <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{t.footerPrivacy}</span>
             </div>
             <div className="w-1 h-1 bg-white/20 rounded-full"></div>
             <div className="flex items-center gap-2" style={fontStyle}>
               <i className="fa-solid fa-user-shield text-orange text-xs"></i>
               <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">{t.footerEncrypted}</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchingForm;
