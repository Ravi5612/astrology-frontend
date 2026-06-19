import React from "react";
import { FaUser, FaArrowRight, FaSpinner, FaRegCalendarAlt as FaCalendar } from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";
import { GiLotus } from "react-icons/gi";
import { MarriageAgeFormProps } from "@/lib/types/calculator";

const MarriageAgeForm: React.FC<MarriageAgeFormProps> = ({
  name,
  setName,
  dob,
  setDob,
  loading,
  canCalculate,
  handleCalculate,
  t,
  fontStyle,
}) => {
  return (
    <form onSubmit={handleCalculate} className="w-full space-y-6 md:space-y-8 relative z-10">
      {/* Name */}
      <div>
        <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1" style={fontStyle}>
          {t.nameLabel}
        </label>
        <div className="relative mt-2">
          <input
            type="text"
            required
            style={{ borderRadius: "9999px", ...fontStyle }}
            className="w-full bg-white border-2 border-orange-500 px-6 py-4 text-[#301118] font-bold focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 shadow-sm text-sm"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-600">
            <FaUser size={14} />
          </div>
        </div>
      </div>

      {/* DOB Optional */}
      <div>
        <label className="text-sm font-bold text-[#301118]/60 uppercase tracking-widest pl-1" style={fontStyle}>
          {t.dobLabel}
        </label>
        <div className="relative mt-2">
          <input
            type="date"
            style={{ borderRadius: "9999px", ...fontStyle }}
            className="w-full bg-white border-2 border-orange-500 px-6 py-4 text-[#301118] font-bold focus:border-orange-600 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all shadow-sm text-sm"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-orange-600">
            <FaCalendar size={14} />
          </div>
        </div>

        <p className="m-0 mt-3 text-xs text-gray-500 italic text-center md:text-left" style={fontStyle}>
          {t.dobTip}
        </p>
      </div>

      {/* Button */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={loading || !canCalculate}
          style={{ borderRadius: "9999px" }}
          className="relative group inline-flex items-center justify-center gap-3 bg-orange-600 text-white w-full md:w-auto px-12 py-4 font-black uppercase tracking-[2px] text-xs hover:bg-orange-700 transition-all duration-500 shadow-xl disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-orange-600 cursor-pointer"
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <TbCrystalBall size={18} />
          )}
          <span style={fontStyle}>
            {loading ? t.calculating : t.calculate}
          </span>
          <FaArrowRight className="opacity-70 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
};

export default MarriageAgeForm;

