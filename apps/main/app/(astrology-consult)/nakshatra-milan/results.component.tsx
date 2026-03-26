"use client";

import React from "react";
import { FaMars, FaVenus } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";

type Props = {
  resultsRef: React.RefObject<HTMLDivElement | null>;
  results: any;
  boyName: string;
  girlName: string;
};

const ResultsSection = ({
  resultsRef,
  results,
  boyName,
  girlName,
}: Props) => {
  return (
    <section ref={resultsRef} className="space-section bg-white pt-5">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#fff9f6] rounded-[3rem] shadow-[0_20px_50px_rgba(253,100,16,0.1)] border border-orange-100 overflow-hidden">
            <div className="p-8 md:p-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#fd641012] text-[#fd6410] px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[3px] mb-8">
                  Star Comparison Result
                </div>
                <h2 className="text-4xl font-black text-[#301118]">
                  The Celestial{" "}
                  <span className="text-[#fd6410]">Alignment</span>
                </h2>
              </div>

              {/* Matching Score Header */}
              {results.match?.guna_milan && (
                <div className="mb-12 bg-white rounded-[2.5rem] p-8 border border-orange-100 shadow-xl flex flex-col items-center">
                  <span className="text-[12px] font-black text-[#fd6410] uppercase tracking-[3px] mb-4">
                    Compatibility Score
                  </span>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-7xl font-black text-[#301118]">
                      {results.match.guna_milan.total_points}
                    </span>
                    <span className="text-2xl font-bold text-gray-300">
                      / {results.match.guna_milan.maximum_points}
                    </span>
                  </div>
                  <div
                    className={`px-8 py-2 rounded-full text-[13px] font-bold uppercase tracking-widest ${
                      results.match.guna_milan.total_points >= 18
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {results.match.guna_milan.total_points >= 25
                      ? "Perfect Match"
                      : results.match.guna_milan.total_points >= 18
                        ? "Good Compatibility"
                        : "Careful Consideration Required"}
                  </div>
                </div>
              )}

              <div className="row g-8 items-stretch pt-5">
                {/* Boy's Result */}
                <div className="col-lg-6">
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-blue-50 h-100">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                        <FaMars className="text-blue-500 text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#301118]">
                          {boyName || "Boy"}
                        </h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                          Birth Star Chart
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          label: "Nakshatra",
                          value: results.boy.nakshatra?.name,
                          planet: results.boy.nakshatra?.lord?.name,
                        },
                        {
                          label: "Chandra Rashi",
                          value: results.boy.chandra_rasi?.name,
                          lord: results.boy.chandra_rasi?.lord?.name,
                        },
                        {
                          label: "Deity",
                          value: results.boy.additional_info?.deity,
                        },
                        {
                          label: "Gana / Temperament",
                          value: results.boy.additional_info?.ganam,
                        },
                        {
                          label: "Animal Sign",
                          value: results.boy.additional_info?.animal_sign,
                        },
                        {
                          label: "Nadi",
                          value: results.boy.additional_info?.nadi,
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex justify-between items-center group hover:bg-white transition-colors"
                        >
                          <div>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[2px] block mb-1">
                              {item.label}
                            </span>
                            <span className="text-base font-bold text-[#301118]">
                              {item.value || "Calculating..."}
                            </span>
                          </div>
                          {item.lord && (
                            <div className="text-right">
                              <span className="text-[8px] font-black text-gray-300 uppercase block">
                                Lord
                              </span>
                              <span className="text-[10px] font-bold text-blue-500">
                                {item.lord}
                              </span>
                            </div>
                          )}
                          {item.planet && (
                            <div className="text-right">
                              <span className="text-[8px] font-black text-gray-300 uppercase block">
                                Planet
                              </span>
                              <span className="text-[10px] font-bold text-blue-500">
                                {item.planet}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Girl's Result */}
                <div className="col-lg-6">
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-50 h-100">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center">
                        <FaVenus className="text-pink-500 text-2xl" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#301118]">
                          {girlName || "Girl"}
                        </h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                          Birth Star Chart
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          label: "Nakshatra",
                          value: results.girl.nakshatra?.name,
                          planet: results.girl.nakshatra?.lord?.name,
                        },
                        {
                          label: "Chandra Rashi",
                          value: results.girl.chandra_rasi?.name,
                          lord: results.girl.chandra_rasi?.lord?.name,
                        },
                        {
                          label: "Deity",
                          value: results.girl.additional_info?.deity,
                        },
                        {
                          label: "Gana / Temperament",
                          value: results.girl.additional_info?.ganam,
                        },
                        {
                          label: "Animal Sign",
                          value: results.girl.additional_info?.animal_sign,
                        },
                        {
                          label: "Nadi",
                          value: results.girl.additional_info?.nadi,
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex justify-between items-center group hover:bg-white transition-colors"
                        >
                          <div>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[2px] block mb-1">
                              {item.label}
                            </span>
                            <span className="text-base font-bold text-[#301118]">
                              {item.value || "Calculating..."}
                            </span>
                          </div>
                          {item.lord && (
                            <div className="text-right">
                              <span className="text-[8px] font-black text-gray-300 uppercase block">
                                Lord
                              </span>
                              <span className="text-[10px] font-bold text-pink-500">
                                {item.lord}
                              </span>
                            </div>
                          )}
                          {item.planet && (
                            <div className="text-right">
                              <span className="text-[8px] font-black text-gray-300 uppercase block">
                                Planet
                              </span>
                              <span className="text-[10px] font-bold text-pink-500">
                                {item.planet}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer / Info */}
                <div className="col-12 text-center pt-8">
                  <div className="bg-gradient-to-br from-[#301118] to-[#4a1c26] rounded-[3rem] p-10 text-white flex flex-col items-center">
                    <MdAutoAwesome className="text-[#fd6410] text-5xl mb-6 animate-pulse" />
                    <h4 className="text-2xl font-bold mb-4">
                      Cosmic Synchronization
                    </h4>
                    <p className="max-w-2xl opacity-80 italic text-sm leading-relaxed">
                      Nakshatra Milan helps you understand the deep
                      psychological bonding between two individuals. The
                      alignment of birth stars influences your long-term
                      relationship harmony and spiritual growth.
                    </p>
                    <div className="mt-8 flex gap-4">
                      <button className="bg-[#fd6410] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest border-0 hover:scale-105 transition-transform">
                        Download Star Report
                      </button>
                      <button className="bg-white/10 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all">
                        Consult Expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
