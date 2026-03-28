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
    <form onSubmit={calculateAdvancedMatch} className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-3xl font-black text-burgundy mb-2 tracking-tight">
          {t.form.advancedTitle}
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mt-2"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Boy's Section */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-t-4 border-t-blue-500/50 group transition-all duration-500 hover:shadow-2xl h-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
            <GiStarShuriken size={100} />
          </div>
          <div className="flex items-center gap-6 mb-10 pb-6 border-b border-burgundy/5">
            <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <FaMars size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-burgundy mb-1">
                {t.form.boyInfo}
              </h3>
              <p className="text-[10px] text-[#fd6410] font-black uppercase tracking-widest">
                {t.form.boySub}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group/field">
              <input
                type="text"
                required
                className="w-full bg-white/50 border-2 border-burgundy/5 rounded-2xl px-6 py-4 text-burgundy font-bold focus:bg-white focus:border-blue-500 outline-none transition-all"
                placeholder={t.form.fullName}
                value={advancedData.boy.name}
                onChange={(e) =>
                  handleAdvancedInputChange("boy", "name", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                required
                className="bg-white/50 border-2 border-burgundy/5 rounded-2xl px-4 py-4 text-burgundy font-bold focus:bg-white outline-none"
                value={advancedData.boy.date}
                onChange={(e) =>
                  handleAdvancedInputChange("boy", "date", e.target.value)
                }
              />
              <input
                type="time"
                required
                className="bg-white/50 border-2 border-burgundy/5 rounded-2xl px-4 py-4 text-burgundy font-bold focus:bg-white outline-none"
                value={advancedData.boy.time}
                onChange={(e) =>
                  handleAdvancedInputChange("boy", "time", e.target.value)
                }
              />
            </div>
            <div className="relative">
              <LocationAutocomplete
                placeholder={t.form.birthPlace}
                onSelect={(loc) => handleLocationSelect("boy", loc)}
                className="w-full bg-white/50 border-2 border-burgundy/5 rounded-2xl px-6 py-4 text-burgundy font-bold focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Girl's Section */}
        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border-t-4 border-t-pink-500/50 group transition-all duration-500 hover:shadow-2xl h-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <GiLotus size={120} />
          </div>
          <div className="flex items-center gap-6 mb-10 pb-6 border-b border-burgundy/5">
            <div className="bg-pink-500/10 p-4 rounded-2xl text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
              <FaVenus size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-burgundy mb-1">
                {t.form.girlInfo}
              </h3>
              <p className="text-[10px] text-[#fd6410] font-black uppercase tracking-widest">
                {t.form.girlSub}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group/field">
              <input
                type="text"
                required
                className="w-full bg-white/50 border-2 border-burgundy/5 rounded-2xl px-6 py-4 text-burgundy font-bold focus:bg-white focus:border-pink-500 outline-none transition-all"
                placeholder={t.form.fullName}
                value={advancedData.girl.name}
                onChange={(e) =>
                  handleAdvancedInputChange("girl", "name", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                required
                className="bg-white/50 border-2 border-burgundy/5 rounded-2xl px-4 py-4 text-burgundy font-bold focus:bg-white outline-none"
                value={advancedData.girl.date}
                onChange={(e) =>
                  handleAdvancedInputChange("girl", "date", e.target.value)
                }
              />
              <input
                type="time"
                required
                className="bg-white/50 border-2 border-burgundy/5 rounded-2xl px-4 py-4 text-burgundy font-bold focus:bg-white outline-none"
                value={advancedData.girl.time}
                onChange={(e) =>
                  handleAdvancedInputChange("girl", "time", e.target.value)
                }
              />
            </div>
            <div className="relative">
              <LocationAutocomplete
                placeholder={t.form.birthPlace}
                onSelect={(loc) => handleLocationSelect("girl", loc)}
                className="w-full bg-white/50 border-2 border-burgundy/5 rounded-2xl px-6 py-4 text-burgundy font-bold focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <button
          type="submit"
          disabled={loading}
          className="relative group inline-flex items-center gap-6 bg-burgundy text-white px-16 py-7 rounded-[2.5rem] font-black uppercase tracking-[4px] text-sm hover:bg-[#fd6410] transition-all duration-500 shadow-2xl disabled:opacity-50 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-4">
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <GiSparkles className="group-hover:rotate-45 transition-transform" />
            )}
            {loading ? t.form.analyzing : t.form.generateReport}
          </span>
        </button>
      </div>
    </form>
  );
};

export default AdvancedForm;
