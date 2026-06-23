"use client";

import React from "react";
import { FaUser, FaBriefcase, FaBirthdayCake, FaMoneyBillWave, FaSpinner, FaArrowRight } from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";
import { GiGoldBar } from "react-icons/gi";
import { DahejFormProps } from "@/lib/types";

const DahejForm: React.FC<DahejFormProps> = ({
    t, fullName, setFullName, job, setJob, dob, setDob, salary, setSalary,
    loading, canCalculate, handleCalculate
}) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container px-6">
                <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(48,17,24,0.1)] border-t-4 border-t-orange-500/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                        <GiGoldBar size={150} />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-xl md:text-3xl font-black text-[#301118] mb-2 tracking-tight">
                            {t.form.title.split("{complete}")[0]}
                            <span className="text-orange-500 underline decoration-orange-500/30 decoration-2 underline-offset-4">
                                {t.form.complete}
                            </span>
                            {t.form.title.split("{complete}")[1]}
                        </h2>
                        <p className="text-sm text-[#301118]/50 italic mt-2">
                            {t.form.subTitle}
                        </p>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-2"></div>
                    </div>

                    <form onSubmit={handleCalculate} className="max-w-3xl mx-auto">
                        <div className="glass-card rounded-[2.5rem] p-6 md:p-10 shadow-[0_15px_40px_rgba(48,17,24,0.08)] border border-[#301118]/5 relative overflow-hidden bg-white">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                                        {t.form.fullName}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            style={{ borderRadius: "9999px" }}
                                            className="w-full bg-white border-2 border-orange-500 pl-5 pr-12 py-3.5 text-[#301118] font-bold focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 shadow-sm text-sm"
                                            placeholder={t.form.fullNamePlaceholder}
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none">
                                            <FaUser size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                                        {t.form.profession}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            style={{ borderRadius: "9999px" }}
                                            className="w-full bg-white border-2 border-orange-500 pl-5 pr-12 py-3.5 text-[#301118] font-bold focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 shadow-sm text-sm"
                                            placeholder={t.form.professionPlaceholder}
                                            value={job}
                                            onChange={(e) => setJob(e.target.value)}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none">
                                            <FaBriefcase size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                                        {t.form.dob}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            required
                                            style={{ borderRadius: "9999px" }}
                                            className="w-full bg-white border-2 border-orange-500 pl-5 pr-12 py-3.5 text-[#301118] font-bold focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-sm text-sm [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-datetime-edit-fields-wrapper]:p-0"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none">
                                            <FaBirthdayCake size={14} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1">
                                        {t.form.salary}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            step="10000"
                                            style={{ borderRadius: "9999px" }}
                                            className="w-full bg-white border-2 border-orange-500 pl-5 pr-12 py-3.5 text-[#301118] font-bold focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 shadow-sm text-sm"
                                            placeholder={t.form.salaryPlaceholder}
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-600 pointer-events-none">
                                            <FaMoneyBillWave size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-10">
                                <button
                                    type="submit"
                                    disabled={loading || !canCalculate}
                                    style={{ borderRadius: "9999px" }}
                                    className="relative group inline-flex items-center justify-center gap-2 md:gap-3 bg-orange-600 text-white w-full md:w-auto px-4 py-4 md:px-12 md:py-4 font-black uppercase tracking-[1px] md:tracking-[2px] text-[10px] sm:text-xs hover:bg-orange-700 transition-all duration-500 shadow-xl disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-orange-600 cursor-pointer"
                                >
                                    {loading ? <FaSpinner className="animate-spin shrink-0" /> : <TbCrystalBall size={18} className="shrink-0" />}
                                    <span className="text-center">{loading ? t.form.calculating : t.form.button}</span>
                                    <FaArrowRight className="opacity-70 group-hover:translate-x-1 transition-transform shrink-0" />
                                </button>
                                <p className="text-xs text-[#301118]/40 mt-3 italic">
                                    {t.form.note}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-center">
                            <div className="w-full h-2 bg-orange-500/20 rounded-full blur-lg translate-y-2 opacity-50"></div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default DahejForm;
