"use client";

import React from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { TbCrystalBall, TbSparkles } from "react-icons/tb";
import { GiLotus } from "react-icons/gi";
import { renderContent } from "./utils";

import { LoveCalculatorResultProps } from "@/lib/types";

const Result = ({ result, t }: LoveCalculatorResultProps) => {
  if (!result) return null;

  return (
    <section className="py-24 bg-[#FFF9F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full animate-in fade-in zoom-in duration-1000">
        <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-[0_50px_100px_rgba(48,17,24,0.08)] border border-slate-100 relative overflow-hidden">
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] animate-[spin_60s_linear_infinite] pointer-events-none">
            <GiLotus size={400} className="text-orange" />
          </div>

          {result.type === "simple" ? (
            <div className="relative z-10 space-y-16">
              <div className="text-center space-y-6">
                <span className="inline-flex items-center gap-2 px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg shadow-red-950/10">
                  <TbSparkles className="text-sm" />
                  {t.results.badge}
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                  {t.results.title.split("{score}")[0].trim()}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    {t.results.title.split("{score}")[1]?.trim() || ""}
                  </span>
                </h2>
                <div className="w-48 h-1.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent mx-auto"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative mb-16">
                  {/* Premium Gauge/Ring for Love Score */}
                  <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-white shadow-2xl flex items-center justify-center p-12 border-8 border-red-50/50 relative group">
                    <div className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent animate-[spin_10s_linear_infinite] opacity-20"></div>
                    <div className="text-center space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mx-auto">
                        Love Core
                      </p>
                      <h3 className="block text-8xl md:text-[10rem] font-black text-slate-900 leading-none group-hover:scale-110 transition-transform duration-700">
                        {result.score}
                        <span className="text-4xl md:text-5xl text-red-500">%</span>
                      </h3>
                      <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
                        {t.results.cosmicBond}
                      </p>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-2xl border border-red-50 flex items-center justify-center text-red-500 animate-bounce-slow">
                       <FaHeart size={36} />
                    </div>
                  </div>
                </div>

                <div className="max-w-3xl w-full">
                  <div className="bg-slate-950 text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:rotate-45 transition-transform duration-1000">
                       <TbCrystalBall size={200} />
                    </div>
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                    
                    <div className="relative z-10 space-y-8">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-600/20">
                         <TbCrystalBall className="text-lg animate-pulse" />
                         Cosmic Verdict
                      </div>
                      <p className="text-2xl md:text-4xl font-bold italic leading-tight text-slate-100 decoration-red-500/30 underline underline-offset-8">
                        "{renderContent(result.message)}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 space-y-20">
              <div className="text-center space-y-6">
                <span className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-orange-400 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl border border-slate-800">
                  <TbSparkles className="text-lg" />
                  {t.results.vedicBadge}
                </span>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                  {t.results.gunaTitle.split("{score}")[0].trim()}{" "}
                  <span className="text-orange-500">
                    {t.results.gunaTitle.split("{score}")[1]?.trim() || ""}
                  </span>
                </h2>
                <div className="w-48 h-1.5 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mx-auto"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-10 items-stretch">
                <div className="bg-slate-50/50 rounded-[4rem] p-12 md:p-20 text-center relative group border border-slate-100 flex flex-col items-center justify-center">
                  <div className="relative inline-flex items-center justify-center mb-12">
                    <svg className="w-56 h-56 md:w-80 md:h-80 transform -rotate-90">
                      <circle
                        className="text-slate-100"
                        strokeWidth="16"
                        stroke="currentColor"
                        fill="transparent"
                        r="110"
                        cx="160"
                        cy="160"
                      />
                      <circle
                        className="text-orange-500 transition-all duration-1000 ease-out"
                        strokeWidth="16"
                        strokeDasharray={`${(result.data.guna_milan.total_points / 36) * 690} 690`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="110"
                        cx="160"
                        cy="160"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center space-y-1">
                      <span className="text-7xl md:text-9xl font-black text-slate-900 leading-none">
                        {result.data.guna_milan.total_points}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                        {t.results.outOf36}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div
                      className={`inline-flex items-center gap-3 px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-500 ${
                        result.data.guna_milan.total_points >= 18
                          ? "bg-emerald-500 text-white shadow-emerald-500/20"
                          : "bg-orange-500 text-white shadow-orange-500/20"
                      }`}
                    >
                      {result.data.guna_milan.total_points >= 18
                        ? t.results.goodComp
                        : t.results.moderateMatch}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.05] animate-spin-slow pointer-events-none">
                    <GiLotus size={300} />
                  </div>
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-4">
                      <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] block border-l-2 border-orange-500 pl-4">
                        {t.results.expertAnalysis}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-black leading-[0.95] tracking-tighter">
                        {t.results.matchSummary.split("{summary}")[0].trim()}{" "}
                        <span className="text-orange-500">
                          {t.results.matchSummary.split("{summary}")[1]?.trim() || ""}
                        </span>
                      </h3>
                    </div>
                    
                    <p className="text-2xl md:text-3xl font-bold italic text-slate-200/90 leading-tight border-l-4 border-orange-500/30 pl-10">
                      "{renderContent(result.data.message)}"
                    </p>
                    
                    <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
                      <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                        <FaSpinner className="animate-spin text-xl" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">System Ready</p>
                        <p className="text-sm font-bold text-slate-400 m-0 leading-none">
                          {t.results.processedBy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ashta Koot Breakdown Table (Super Premium) */}
              <div className="bg-slate-50/30 rounded-[4rem] p-8 md:p-16 border border-slate-100">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
                  <div className="space-y-3">
                    <h4 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                      {t.results.breakdownTitle}
                    </h4>
                    <p className="text-slate-400 font-bold italic text-sm">Detailed vedic diagnostic analysis</p>
                  </div>
                  <div className="px-8 py-4 bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 inline-flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {t.results.accuracy.split(":")[0]}
                    </span>
                    <span className="text-sm font-black text-orange-500 uppercase tracking-widest">
                      {t.results.accuracy.split(":")[1]}
                    </span>
                  </div>
                </div>
                
                <div className="overflow-x-auto -mx-8 px-8">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                          {t.results.table.component}
                        </th>
                        <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                          {t.results.table.significance}
                        </th>
                        <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center">
                          {t.results.table.score}
                        </th>
                        <th className="py-8 px-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-right">
                          {t.results.table.interpretation}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        result.data.guna_milan.ashta_koot,
                      ).map(([key, val]: [string, any], idx) => (
                        <tr
                          key={key}
                          className="group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 rounded-3xl transition-all duration-500"
                        >
                          <td className="py-10 px-6">
                            <div className="flex items-center gap-6">
                              <div className="w-12 h-12 rounded-[1rem] bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-lg group-hover:shadow-orange-500/20">
                                <span className="text-xs font-black italic">
                                  {idx + 1}
                                </span>
                              </div>
                              <span className="font-black text-slate-900 capitalize text-lg tracking-tight">
                                {key}
                              </span>
                            </div>
                          </td>
                          <td className="py-10 px-6 max-w-sm">
                            <p className="text-sm text-slate-400 font-bold italic leading-relaxed group-hover:text-slate-600 transition-colors">
                              {key === "varna" && "Personality & Ego Matching"}
                              {key === "vashya" && "Mutual Attraction & Power Balance"}
                              {key === "tara" && "Health, Longevity & Destiny"}
                              {key === "yoni" && "Physical & Emotional Intimacy"}
                              {key === "maitri" && "Friendship & Psychology"}
                              {key === "gana" && "Temperament & Social Affinity"}
                              {key === "bhakut" && "Family Harmony & Progeny"}
                              {key === "nadi" && "Biological & Genetic Sync"}
                            </p>
                          </td>
                          <td className="py-10 px-6 text-center">
                            <div className="inline-flex items-center gap-3 bg-slate-50 px-5 py-2 rounded-full border border-slate-100 group-hover:bg-white group-hover:border-orange-100 transition-all">
                              <span className="text-xl font-black text-slate-900 group-hover:text-orange-500 transition-colors">
                                {val.received_points}
                              </span>
                              <span className="text-slate-300 font-bold">/</span>
                              <span className="text-sm font-black text-slate-400">
                                {val.maximum_points}
                              </span>
                            </div>
                          </td>
                          <td className="py-10 px-6 text-right">
                            <span
                              className={`inline-flex px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm transform group-hover:scale-105 transition-all duration-500 ${
                                val.received_points > 0
                                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                  : "bg-red-500/10 text-red-500 border border-red-500/20"
                              }`}
                            >
                              {val.description}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Result;
