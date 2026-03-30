"use client";

import React from "react";
import Image from "next/image";
import { FaHeart, FaMars, FaVenus, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { renderContent } from "./utils";

import { AdvancedResultsComponentProps } from "@/lib/types";

const ResultComponent = ({
  resultsRef,
  matchingResult,
  boyDetails,
  girlDetails,
}: AdvancedResultsComponentProps) => {
  return (
    <section ref={resultsRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-premium border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-16 lg:p-24">
            {/* Result Header */}
            <div className="text-center mb-20 space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-orange/10 rounded-full border border-orange/20">
                 <i className="fa-solid fa-sparkles text-orange text-xs"></i>
                 <span className="text-[12px] font-black text-orange uppercase tracking-[.2em]">Comprehensive Compatibility Audit</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                Relationship <span className="text-orange italic">Scorecard</span>
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 pt-8">
                {/* Groom */}
                <div className="group text-center space-y-4">
                  <div className="relative w-28 h-28 mx-auto">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-all"></div>
                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-blue-50 shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      <Image src="/images/default-avatar.png" alt="Groom" fill className="p-4" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                       <FaMars className="text-sm" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Groom Details</span>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight italic">
                      {boyDetails.name || "The Groom"}
                    </h4>
                  </div>
                </div>

                {/* Heart Link */}
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-premium border border-rose-50 z-10 relative animate-pulse group hover:scale-125 transition-transform duration-500 cursor-default">
                    <FaHeart size={28} />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-rose-200 to-transparent hidden md:block"></div>
                </div>

                {/* Bride */}
                <div className="group text-center space-y-4">
                  <div className="relative w-28 h-28 mx-auto">
                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-500/30 transition-all"></div>
                    <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-rose-50 shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                      <Image src="/images/default-avatar.png" alt="Bride" fill className="p-4" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                       <FaVenus className="text-sm" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Bride Details</span>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight italic">
                      {girlDetails.name || "The Bride"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Kundali Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Groom's Kundali Card */}
              <div className="bg-gray-50/50 rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                   <FaMars size={120} />
                </div>
                <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Groom&apos;s Astral Profile
                </h4>
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-blue-100/50 shadow-sm">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nakshatra</span>
                    <span className="text-sm font-black text-gray-900 text-right">
                      {renderContent(matchingResult.boy_info?.nakshatra?.name)}{" "}
                      <span className="text-gray-400 italic">({renderContent(matchingResult.boy_info?.nakshatra?.lord?.name)}, P{renderContent(matchingResult.boy_info?.nakshatra?.pada)})</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-blue-100/50 shadow-sm">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rasi (Moon Sign)</span>
                    <span className="text-sm font-black text-gray-900 text-right">
                      {renderContent(matchingResult.boy_info?.rasi?.name)}{" "}
                      <span className="text-gray-400 italic">({renderContent(matchingResult.boy_info?.rasi?.lord?.name)})</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {matchingResult.boy_info?.koot && Object.entries(matchingResult.boy_info.koot).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-1 p-4 bg-white/50 rounded-xl border border-gray-100">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{key}</span>
                        <span className="text-xs font-black text-gray-900 uppercase">{renderContent(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bride's Kundali Card */}
              <div className="bg-gray-50/50 rounded-[2.5rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                   <FaVenus size={120} />
                </div>
                <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                  Bride&apos;s Astral Profile
                </h4>
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-rose-100/50 shadow-sm">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nakshatra</span>
                    <span className="text-sm font-black text-gray-900 text-right">
                      {renderContent(matchingResult.girl_info?.nakshatra?.name)}{" "}
                      <span className="text-gray-400 italic">({renderContent(matchingResult.girl_info?.nakshatra?.lord?.name)}, P{renderContent(matchingResult.girl_info?.nakshatra?.pada)})</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-rose-100/50 shadow-sm">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rasi (Moon Sign)</span>
                    <span className="text-sm font-black text-gray-900 text-right">
                      {renderContent(matchingResult.girl_info?.rasi?.name)}{" "}
                      <span className="text-gray-400 italic">({renderContent(matchingResult.girl_info?.rasi?.lord?.name)})</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {matchingResult.girl_info?.koot && Object.entries(matchingResult.girl_info.koot).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-1 p-4 bg-white/50 rounded-xl border border-gray-100">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{key}</span>
                        <span className="text-xs font-black text-gray-900 uppercase">{renderContent(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Data Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              {/* Score Gauge */}
              <div className="lg:col-span-5 h-full">
                <div className="bg-gray-900 rounded-[3rem] p-12 shadow-2xl text-center h-full flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-orange/20 to-transparent opacity-30"></div>
                  <h3 className="text-[12px] font-black text-orange uppercase tracking-[0.4em] mb-12 relative z-10">Final Compatibility Score</h3>
                  
                  <div className="relative inline-flex items-center justify-center z-10">
                    <svg className="w-56 h-56 transform -rotate-90">
                      <circle
                        className="text-white/10"
                        strokeWidth="16"
                        stroke="currentColor"
                        fill="transparent"
                        r="90"
                        cx="112"
                        cy="112"
                      />
                      <circle
                        className="text-orange"
                        strokeWidth="16"
                        strokeDasharray={`${(((matchingResult.guna_milan?.total_points ?? matchingResult.total?.score ?? 0) / (matchingResult.guna_milan?.maximum_points ?? 36)) * (2 * Math.PI * 90))} ${2 * Math.PI * 90}`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="90"
                        cx="112"
                        cy="112"
                        style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-7xl font-black text-white leading-none">
                        {matchingResult.guna_milan?.total_points ?? matchingResult.total?.score ?? 0}
                      </span>
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-2">Maximum 36</span>
                    </div>
                  </div>

                  <div className="mt-12 relative z-10">
                    <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-3xl text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 scale-110 ${
                      (matchingResult.guna_milan?.total_points ?? matchingResult.total?.score ?? 0) >= 18 
                        ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                        : "bg-red-500 text-white shadow-red-500/20"
                    }`}>
                      <i className={`fa-solid ${(matchingResult.guna_milan?.total_points ?? matchingResult.total?.score ?? 0) >= 18 ? "fa-circle-check" : "fa-circle-exclamation"}`}></i>
                      {(matchingResult.guna_milan?.total_points ?? matchingResult.total?.score ?? 0) >= 18 ? "Excellent Union" : "Moderate Harmony"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ashtakoot Progress Breakdown */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[3rem] p-12 h-full shadow-premium border border-gray-100 flex flex-col">
                  <div className="flex items-center justify-between mb-12 border-b border-gray-50 pb-8">
                    <h3 className="text-2xl font-black text-gray-900 leading-none">Ashtakoot Analysis</h3>
                    <span className="text-[10px] font-black text-orange bg-orange/10 px-4 py-2 rounded-xl uppercase tracking-widest border border-orange/20">Metric Breakdown</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {(matchingResult.guna_milan?.guna || []).map((item: any, idx: number) => (
                      <div key={idx} className="space-y-4 group">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-sm font-black text-gray-900">
                            {item.obtained_points} <span className="text-gray-300">/ {item.maximum_points}</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden border border-gray-50 p-0.5">
                          <div
                            className="bg-orange h-full rounded-full transition-all duration-1000 shadow-sm"
                            style={{ width: `${(item.obtained_points / (item.maximum_points || 1)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dosha Status Section */}
            {(matchingResult.girl_mangal_dosha_details || matchingResult.boy_mangal_dosha_details) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {/* Groom Dosha */}
                <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden relative ${matchingResult.boy_mangal_dosha_details?.has_dosha ? "bg-red-50/50 border-red-100" : "bg-emerald-50/50 border-emerald-100"}`}>
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    {matchingResult.boy_mangal_dosha_details?.has_dosha ? <FaExclamationTriangle size={80} /> : <FaCheckCircle size={80} />}
                  </div>
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${matchingResult.boy_mangal_dosha_details?.has_dosha ? "bg-red-500" : "bg-emerald-500"}`}>
                      {matchingResult.boy_mangal_dosha_details?.has_dosha ? <FaExclamationTriangle size={20} /> : <FaCheckCircle size={20} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 italic">Groom Mangal Dosha</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Planetary Status</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-600 leading-bold relative z-10 leading-relaxed italic">
                    &quot;{renderContent(matchingResult.boy_mangal_dosha_details?.description) || "No malefic planetary influence detected."}&quot;
                  </p>
                </div>

                {/* Bride Dosha */}
                <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden relative ${matchingResult.girl_mangal_dosha_details?.has_dosha ? "bg-red-50/50 border-red-100" : "bg-emerald-50/50 border-emerald-100"}`}>
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    {matchingResult.girl_mangal_dosha_details?.has_dosha ? <FaExclamationTriangle size={80} /> : <FaCheckCircle size={80} />}
                  </div>
                  <div className="flex items-center gap-6 mb-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl ${matchingResult.girl_mangal_dosha_details?.has_dosha ? "bg-red-500" : "bg-emerald-500"}`}>
                      {matchingResult.girl_mangal_dosha_details?.has_dosha ? <FaExclamationTriangle size={20} /> : <FaCheckCircle size={20} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 italic">Bride Mangal Dosha</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Planetary Status</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-600 leading-bold relative z-10 leading-relaxed italic">
                    &quot;{renderContent(matchingResult.girl_mangal_dosha_details?.description) || "No malefic planetary influence detected."}&quot;
                  </p>
                </div>
              </div>
            )}

            {/* Conclusion CTA */}
            <div className="bg-gray-900 rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl group">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
               
               <div className="relative z-10 space-y-10">
                  <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 group-hover:scale-105 transition-transform duration-500">
                     <i className="fa-solid fa-user-robot text-orange"></i>
                     <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Astro-Expert Synthesis</span>
                  </div>
                  
                  <div className="max-w-3xl mx-auto space-y-8">
                    <h4 className="text-3xl md:text-5xl font-black text-white italic leading-tight">&quot;The stars suggest a path of <span className="text-orange">harmony</span> & growth.&quot;</h4>
                    <p className="text-gray-400 font-bold text-lg leading-relaxed">
                      {renderContent(matchingResult.message?.description || matchingResult.guna_milan?.conclusion?.report || matchingResult.conclusion?.report || "Personalized Compatibility Summary will appear here.")}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6 pt-6">
                    <button onClick={() => window.print()} className="group/btn relative px-10 py-5 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all duration-300">
                       <span className="relative z-10 flex items-center gap-3">
                          <i className="fa-solid fa-print text-sm group-hover/btn:text-orange"></i>
                          Print Expert Report
                       </span>
                    </button>
                    <button className="group/btn relative px-10 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                       <span className="relative z-10 flex items-center gap-3">
                          <i className="fa-solid fa-arrow-down-to-bracket text-sm group-hover/btn:text-orange"></i>
                          Download as PDF
                       </span>
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-opacity duration-700">
           <div className="flex items-center justify-center gap-3">
              <i className="fa-solid fa-shield-check text-orange"></i>
              <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.5em]">CERTIFIED ACCURATE ANALYSIS BY ASTROLOGY IN BHARAT</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ResultComponent;
