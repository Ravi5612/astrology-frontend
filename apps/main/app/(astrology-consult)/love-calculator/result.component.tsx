"use client";

import React from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";
import { GiLotus } from "react-icons/gi";
import { renderContent } from "./utils";

import { LoveCalculatorResultProps } from "@/lib/types";

const Result = ({ result, t }: LoveCalculatorResultProps) => {
  if (!result) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-[3.5rem] p-8 md:p-16 shadow-[0_30px_70px_rgba(48,17,24,0.15)] border border-burgundy/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] animate-spin-slow pointer-events-none">
              <GiLotus size={300} />
            </div>

            {result.type === "simple" ? (
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <span className="inline-block bg-[#fd6410]/10 text-[#fd6410] px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[3px] mb-8">
                    {t.results.badge}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-burgundy mb-6 tracking-tight">
                    {t.results.title.split("{score}")[0]}{" "}
                    <span className="text-[#fd6410]">
                      {t.results.title.split("{score}")[1]}
                    </span>
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#fd6410] to-transparent mx-auto mb-16"></div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="relative mb-16">
                    {/* Premium Gauge/Ring for Love Score */}
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border-8 border-orange-50 relative group">
                      <div className="absolute inset-0 rounded-full border-8 border-[#fd6410] border-t-transparent animate-spin-slow opacity-20"></div>
                      <div className="text-center">
                        <span className="block text-7xl md:text-9xl font-black text-burgundy leading-none group-hover:scale-110 transition-transform duration-500">
                          {result.score}
                          <span className="text-4xl text-[#fd6410]">%</span>
                        </span>
                        <span className="text-[12px] font-black uppercase tracking-[4px] text-[#fd6410] mt-4 block">
                          {t.results.cosmicBond}
                        </span>
                      </div>
                      <FaHeart className="absolute -top-4 -right-4 text-pink-500 text-5xl animate-bounce shadow-xl" />
                    </div>
                  </div>

                  <div className="max-w-2xl text-center">
                    <div className="bg-burgundy text-white p-10 rounded-[3rem] shadow-2xl relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fd6410] p-4 rounded-2xl shadow-lg">
                        <TbCrystalBall size={32} />
                      </div>
                      <p className="text-xl md:text-2xl font-light italic leading-relaxed text-orange-100/90">
                        "{renderContent(result.message)}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="text-center mb-16">
                  <span className="inline-block bg-burgundy text-[#d4af37] px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[4px] mb-8 shadow-xl">
                    {t.results.vedicBadge}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black text-burgundy mb-6 tracking-tight">
                    {t.results.gunaTitle.split("{score}")[0]}{" "}
                    <span className="text-[#fd6410]">
                      {t.results.gunaTitle.split("{score}")[1]}
                    </span>
                  </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                  <div className="bg-white rounded-[4rem] p-12 shadow-sm border border-orange-50 text-center relative group">
                    <div className="relative inline-flex items-center justify-center mb-10 overflow-visible py-4">
                      <svg className="w-48 h-48 md:w-64 md:h-64 transform -rotate-90">
                        <circle
                          className="text-gray-100"
                          strokeWidth="12"
                          stroke="currentColor"
                          fill="transparent"
                          r="90"
                          cx="128"
                          cy="128"
                        />
                        <circle
                          className="text-[#fd6410] transition-all duration-1000 ease-out"
                          strokeWidth="12"
                          strokeDasharray={`${(result.data.guna_milan.total_points / 36) * 565} 565`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="90"
                          cx="128"
                          cy="128"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-6xl md:text-8xl font-black text-burgundy">
                          {result.data.guna_milan.total_points}
                        </span>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                          {t.results.outOf36}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div
                        className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest ${
                          result.data.guna_milan.total_points >= 18
                            ? "bg-green-500 text-white shadow-lg shadow-green-100"
                            : "bg-burgundy text-white shadow-lg shadow-orange-100"
                        }`}
                      >
                        {result.data.guna_milan.total_points >= 18
                          ? t.results.goodComp
                          : t.results.moderateMatch}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-burgundy to-[#4a1c26] rounded-[4rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-[-20%] right-[-10%] opacity-10 animate-spin-slow">
                      <GiLotus size={200} />
                    </div>
                    <div className="relative z-10">
                      <span className="text-[#fd6410] font-black uppercase tracking-[4px] text-[10px] mb-6 block">
                        {t.results.expertAnalysis}
                      </span>
                      <h3 className="text-3xl font-black mb-8 leading-tight">
                        {t.results.matchSummary.split("{summary}")[0]}{" "}
                        <span className="text-[#fd6410]">
                          {t.results.matchSummary.split("{summary}")[1]}
                        </span>
                      </h3>
                      <p className="text-xl font-light italic text-orange-100/80 leading-relaxed mb-10 border-l-2 border-[#fd6410]/30 pl-8">
                        "{renderContent(result.data.message)}"
                      </p>
                      <div className="flex items-center gap-6 p-4 bg-white/5 rounded-3xl border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-[#fd6410] flex items-center justify-center text-white shadow-xl">
                          <FaSpinner className="animate-pulse" />
                        </div>
                        <p className="text-sm font-bold text-orange-50/60 m-0">
                          {t.results.processedBy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ashta Koot Breakdown Table (Premium Styling) */}
                <div className="bg-[#fff9f6] rounded-[3rem] p-8 md:p-12 border border-orange-100">
                  <div className="flex items-center justify-between mb-12">
                    <h4 className="text-xl font-black text-burgundy tracking-tight">
                      {t.results.breakdownTitle}
                    </h4>
                    <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-orange-50">
                      <span className="text-xs font-bold text-gray-400">
                        {t.results.accuracy.split(":")[0]}:{" "}
                      </span>
                      <span className="text-xs font-black text-[#fd6410]">
                        {t.results.accuracy.split(":")[1]}
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-burgundy/5">
                          <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-burgundy/40">
                            {t.results.table.component}
                          </th>
                          <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-burgundy/40">
                            {t.results.table.significance}
                          </th>
                          <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-burgundy/40">
                            {t.results.table.score}
                          </th>
                          <th className="py-6 px-4 text-[10px] font-black uppercase tracking-widest text-burgundy/40 text-right">
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
                            className={`group hover:bg-white transition-all duration-300 ${
                              idx ===
                              Object.entries(result.data.guna_milan.ashta_koot)
                                .length -
                                1
                                ? ""
                                : "border-b border-burgundy/5"
                            }`}
                          >
                            <td className="py-6 px-4">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-100/30 flex items-center justify-center text-burgundy group-hover:bg-[#fd6410] group-hover:text-white transition-all duration-500">
                                  <span className="text-xs font-black italic">
                                    {idx + 1}
                                  </span>
                                </div>
                                <span className="font-black text-burgundy capitalize text-sm">
                                  {key}
                                </span>
                              </div>
                            </td>
                            <td className="py-6 px-4 text-xs text-gray-500 font-medium italic">
                              {key === "varna" && "Personality & Ego Matching"}
                              {key === "vashya" &&
                                "Mutual Attraction & Power Balance"}
                              {key === "tara" && "Health, Longevity & Destiny"}
                              {key === "yoni" && "Physical & Emotional Intimacy"}
                              {key === "maitri" && "Friendship & Psychology"}
                              {key === "gana" &&
                                "Temperament & Social Affinity"}
                              {key === "bhakut" && "Family Harmony & Progeny"}
                              {key === "nadi" && "Biological & Genetic Sync"}
                            </td>
                            <td className="py-6 px-4">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-burgundy">
                                  {val.received_points}
                                </span>
                                <span className="text-gray-200">/</span>
                                <span className="text-xs font-bold text-gray-400">
                                  {val.maximum_points}
                                </span>
                              </div>
                            </td>
                            <td className="py-6 px-4 text-right">
                              <span
                                className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  val.received_points > 0
                                    ? "bg-green-100 text-green-700 shadow-sm shadow-green-100"
                                    : "bg-red-50 text-red-500"
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
      </div>
    </section>
  );
};

export default Result;
