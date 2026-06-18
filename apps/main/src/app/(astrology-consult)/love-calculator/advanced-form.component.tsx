"use client";

import React from "react";
import { FaMars, FaSpinner, FaVenus } from "react-icons/fa";
import { GiLotus, GiSparkles, GiStarShuriken } from "react-icons/gi";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";

import { ConsultPersonDetails } from "@/lib/types";

type AdvancedFormProps = {
  t: any;
  loading: boolean;
  advancedData: {
    boy: ConsultPersonDetails;
    girl: ConsultPersonDetails;
  };
  handleAdvancedInputChange: (
    gender: "boy" | "girl",
    field: keyof ConsultPersonDetails,
    value: string | number,
  ) => void;
  handleLocationSelect: (
    gender: "boy" | "girl",
    location: { name: string; lat: string; lon: string },
  ) => void;
  calculateAdvancedMatch: (e: React.FormEvent) => Promise<void>;
};

const AdvancedForm = ({
  t,
  loading,
  advancedData,
  handleAdvancedInputChange,
  handleLocationSelect,
  calculateAdvancedMatch,
}: AdvancedFormProps) => {
  return (
    <form onSubmit={calculateAdvancedMatch} className="max-w-6xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
          {t.form.advancedTitle}
        </h2>
        <p className="text-slate-400 font-bold italic text-sm tracking-wide px-4">
          {t.form.advancedSubtitle || "Deep cosmic synthesis based on Vedic Guna Milan protocols"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 relative">
        {/* Boy's Section */}
        <div className="group relative bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-slate-200 border border-slate-100 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 animate-[spin_60s_linear_infinite]">
            <GiStarShuriken size={200} />
          </div>
          
          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <FaMars size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {t.form.boyInfo}
              </h3>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] mt-1">
                {t.form.boySub}
              </p>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                {t.form.fullName}
              </label>
              <input
                type="text"
                required
                className="w-full px-6 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 focus:ring-8 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-bold text-sm bg-orange-50/50 hover:bg-white shadow-sm"
                placeholder={t.form.fullName}
                value={advancedData.boy.name}
                onChange={(e) =>
                  handleAdvancedInputChange("boy", "name", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 outline-none text-slate-900 font-bold text-sm bg-orange-50/50 hover:bg-white shadow-sm"
                  value={advancedData.boy.date}
                  onChange={(e) =>
                    handleAdvancedInputChange("boy", "date", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                  Birth Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 outline-none text-slate-900 font-bold text-sm bg-orange-50/50 hover:bg-white shadow-sm"
                  value={advancedData.boy.time}
                  onChange={(e) =>
                    handleAdvancedInputChange("boy", "time", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                {t.form.birthPlace}
              </label>
              <div className="relative group/location">
                 <LocationAutocomplete
                    placeholder={t.form.birthPlace}
                    onSelect={(loc) => handleLocationSelect("boy", loc)}
                    className="w-full px-6 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 outline-none text-slate-900 font-bold text-sm bg-orange-50/50 group-hover/location:bg-white transition-all shadow-sm"
                  />
              </div>
            </div>
          </div>
        </div>

        {/* Girl's Section */}
        <div className="group relative bg-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl shadow-slate-200 border border-slate-100 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 animate-[spin_45s_linear_infinite_reverse]">
            <GiLotus size={200} />
          </div>

          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="w-16 h-16 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-600 shadow-inner group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
              <FaVenus size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {t.form.girlInfo}
              </h3>
              <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.2em] mt-1">
                {t.form.girlSub}
              </p>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                {t.form.fullName}
              </label>
              <input
                type="text"
                required
                className="w-full px-8 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 focus:ring-8 focus:ring-orange-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-bold text-sm bg-orange-50/50 hover:bg-white shadow-sm"
                placeholder={t.form.fullName}
                value={advancedData.girl.name}
                onChange={(e) =>
                  handleAdvancedInputChange("girl", "name", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                  Birth Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 outline-none text-slate-900 font-bold text-sm bg-orange-50/50 hover:bg-white shadow-sm"
                  value={advancedData.girl.date}
                  onChange={(e) =>
                    handleAdvancedInputChange("girl", "date", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                  Birth Time
                </label>
                <input
                  type="time"
                  required
                  className="w-full px-4 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 outline-none text-slate-900 font-bold text-sm bg-orange-50/50 hover:bg-white shadow-sm"
                  value={advancedData.girl.time}
                  onChange={(e) =>
                    handleAdvancedInputChange("girl", "time", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">
                {t.form.birthPlace}
              </label>
              <div className="relative group/location">
                 <LocationAutocomplete
                    placeholder={t.form.birthPlace}
                    onSelect={(loc) => handleLocationSelect("girl", loc)}
                    className="w-full px-6 py-5 rounded-2xl border-2 border-orange-500/20 focus:border-orange-500 outline-none text-slate-900 font-bold text-sm bg-orange-50/50 group-hover/location:bg-white transition-all shadow-sm"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <button
          type="submit"
          disabled={loading}
          className="group relative inline-flex items-center gap-6 bg-brown text-white px-20 py-7 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-orange hover:-translate-y-1 active:translate-y-0 transition-all duration-500 shadow-2xl hover:shadow-orange/30 disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center gap-4">
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <GiSparkles className="group-hover:rotate-45 transition-transform duration-700 text-orange" />
            )}
            {loading ? t.form.analyzing : t.form.generateReport}
          </span>
        </button>
      </div>
    </form>
  );
};

export default AdvancedForm;
