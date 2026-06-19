"use client";

import React from "react";
import { FaCar, FaGem, FaHome, FaStar, FaBalanceScale } from "react-icons/fa";
import { GiGoldBar, GiDiamonds, GiSparkles } from "react-icons/gi";
import { ProgressBar } from "./ProgressBar";
import { IncludedItemCard } from "./IncludedItemCard";
import { ResultData, DahejResultProps } from "@/lib/types";

const DahejResult: React.FC<DahejResultProps> = ({ result, t }) => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="glass-card rounded-[3.5rem] p-8 md:p-16 shadow-[0_30px_70px_rgba(48,17,24,0.15)] border border-[#301118]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.05] animate-spin-slow pointer-events-none">
                            <GiGoldBar size={300} />
                        </div>

                        <div className="relative z-10">
                            <div className="text-center mb-16">
                                <span className="inline-block bg-orange-500/10 text-orange-500 px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[3px] mb-8">
                                    {t.results.badge}
                                </span>

                                <h2 className="text-4xl md:text-6xl font-black text-[#301118] mb-6 tracking-tight">
                                    {t.results.title.split("{package}")[0]} <span className="text-orange-500">{t.results.package}</span>
                                </h2>
                                <p className="text-lg text-[#301118]/60 mb-4">
                                    {t.results.tierLabel} <span className="font-black text-orange-500">{result.itemTier}</span> {t.results.packageLabel}
                                </p>
                                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-16"></div>
                            </div>

                            <div className="flex flex-col items-center">
                                {/* Main Amount Display */}
                                <div className="relative mb-16">
                                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border-8 border-yellow-50 relative group">
                                        <div className="absolute inset-0 rounded-full border-8 border-orange-500 border-t-transparent animate-spin-slow opacity-20"></div>
                                        <div className="text-center">
                                            <span className="block text-4xl md:text-6xl font-black text-[#301118] leading-none group-hover:scale-110 transition-transform duration-500">
                                                {result.formattedDahej}
                                            </span>
                                            <span className="text-[12px] font-black uppercase tracking-[4px] text-orange-500 mt-4 block">
                                                {t.results.totalValue}
                                            </span>
                                        </div>
                                        <GiDiamonds className="absolute -top-4 -right-4 text-orange-500 text-5xl animate-bounce shadow-xl" />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="max-w-2xl text-center mb-14">
                                    <div className="bg-[#301118] text-white p-10 rounded-[3rem] shadow-2xl relative">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 p-4 rounded-2xl shadow-lg">
                                            <GiSparkles size={28} />
                                        </div>
                                        <p className="text-xl md:text-2xl font-light italic leading-relaxed text-orange-100/90 m-0">
                                            "{result.message}"
                                        </p>
                                        <p className="text-sm text-orange-100/60 mt-4 italic">
                                            {t.results.age}: {result.age} {t.results.years} | {t.results.jobTier}: {result.jobTier}/4
                                        </p>
                                    </div>
                                </div>

                                {/* Included Items Section */}
                                {result && result.includedItems && (
                                    <div className="w-full mb-16">
                                        <div className="text-center mb-12">
                                            <h3 className="text-3xl font-black text-[#301118] mb-4 tracking-tight">
                                                {t.results.includedTitle}
                                            </h3>
                                            <p className="text-[#301118]/60 max-w-2xl mx-auto">
                                                {t.results.includedDesc}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                            <IncludedItemCard
                                                icon={<FaCar size={28} className="text-orange-500" />}
                                                title={t.results.items.car}
                                                items={[result.includedItems.car]}
                                                description={t.results.items.carDesc}
                                            />
                                            <IncludedItemCard
                                                icon={<FaGem size={28} className="text-orange-500" />}
                                                title={result.includedItems.jewelry.name}
                                                items={result.includedItems.jewelry.items}
                                                description={t.results.items.jewelryDesc}
                                            />
                                            <IncludedItemCard
                                                icon={<FaHome size={28} className="text-orange-500" />}
                                                title={t.results.items.land}
                                                items={[result.includedItems.land]}
                                                description={t.results.items.landDesc}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Breakdown */}
                                <div className="w-full max-w-3xl bg-[#fffcf6] rounded-[3rem] p-8 md:p-12 border border-yellow-100">
                                    <div className="flex items-center justify-between mb-10">
                                        <h4 className="text-xl font-black text-[#301118] tracking-tight m-0">
                                            {t.results.factorsTitle}
                                        </h4>
                                        <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-yellow-50 flex items-center gap-2">
                                            <FaStar className="text-orange-500" size={14} />
                                            <span className="text-xs font-black text-orange-500 uppercase tracking-widest">
                                                {t.results.weightLabel}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <ProgressBar label={t.factors.name} value={result.breakdown.name} max={50} />
                                        <ProgressBar label={t.factors.job} value={result.breakdown.job} max={50} />
                                        <ProgressBar label={t.factors.age} value={result.breakdown.age} max={50} />
                                        <ProgressBar label={t.factors.salary} value={result.breakdown.salary} max={50} />
                                    </div>

                                    <div className="mt-10 flex items-start gap-4 bg-white rounded-2xl p-6 border border-yellow-50 shadow-sm">
                                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                            <FaBalanceScale size={18} />
                                        </div>
                                        <div>
                                            <p className="m-0 text-sm font-black text-[#301118]">
                                                {t.results.remember}
                                            </p>
                                            <p className="m-0 text-sm text-gray-500 italic leading-relaxed">
                                                {t.results.rememberDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <div className="mt-12 p-6 bg-red-50 border border-red-100 rounded-2xl max-w-2xl">
                                    <p className="text-sm text-red-600 text-center italic">
                                        {t.results.disclaimer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DahejResult;
