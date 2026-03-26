"use client";

import React from "react";
import {
  FaPalette,
  FaHashtag,
  FaCalendarAlt,
} from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";
import { GiLotus, GiSparkles } from "react-icons/gi";
import { LuckyResult } from "./useLuckyVibes";

interface LuckyVibesResultProps {
  result: LuckyResult;
}

const LuckyVibesResult: React.FC<LuckyVibesResultProps> = ({ result }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-[3.5rem] p-8 md:p-16 shadow-[0_30px_70px_rgba(48,17,24,0.15)] border border-burgundy/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none">
              <GiLotus size={300} className="animate-spin-slow" />
            </div>

            <div className="relative z-10">
              <div className="text-center mb-16">
                <span className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[3px] mb-8">
                  Lucky Results
                </span>

                <h2 className="text-4xl md:text-6xl font-black text-burgundy mb-6 tracking-tight">
                  Your <span className="text-primary">Lucky</span> Vibes
                </h2>

                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-16"></div>
              </div>

              {/* Lucky Number Ring */}
              <div className="flex flex-col items-center mb-14">
                <div className="relative mb-10">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-8 border-8 border-orange-50 relative group">
                    <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin-slow opacity-20"></div>

                    <div className="text-center">
                      <span className="block text-7xl md:text-9xl font-black text-burgundy leading-none group-hover:scale-110 transition-transform duration-500">
                        {result.luckyNumber}
                      </span>
                      <span className="text-[12px] font-black uppercase tracking-[4px] text-primary mt-4 block">
                        Lucky Number
                      </span>
                    </div>

                    <FaHashtag className="absolute -top-4 -right-4 text-primary text-5xl animate-bounce shadow-xl" />
                  </div>
                </div>

                {/* Message */}
                <div className="max-w-3xl text-center">
                  <div className="bg-burgundy text-white p-10 rounded-[3rem] shadow-2xl relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-2xl shadow-lg">
                      <GiSparkles size={28} />
                    </div>

                    <p className="text-xl md:text-2xl font-light italic leading-relaxed text-orange-100/90 m-0">
                      "{result.message}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Lucky Color */}
                <div className="bg-[#fff9f6] rounded-[2.5rem] p-8 border border-orange-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <FaPalette className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="m-0 text-xs font-black uppercase tracking-widest text-gray-400">
                        Lucky Color
                      </p>
                      <p className="m-0 text-xl font-black text-burgundy">{result.luckyColor}</p>
                    </div>
                  </div>

                  <p className="m-0 text-sm text-gray-500 italic">
                    Secondary: <span className="font-black text-burgundy">{result.secondaryColor}</span>
                  </p>
                </div>

                {/* Lucky Day */}
                <div className="bg-[#fff9f6] rounded-[2.5rem] p-8 border border-orange-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <FaCalendarAlt className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="m-0 text-xs font-black uppercase tracking-widest text-gray-400">
                        Lucky Day
                      </p>
                      <p className="m-0 text-xl font-black text-burgundy">{result.luckyDay}</p>
                    </div>
                  </div>

                  <p className="m-0 text-sm text-gray-500 italic">
                    Element: <span className="font-black text-burgundy">{result.element}</span>
                  </p>
                </div>

                {/* Numerology */}
                <div className="bg-[#fff9f6] rounded-[2.5rem] p-8 border border-orange-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <TbCrystalBall className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="m-0 text-xs font-black uppercase tracking-widest text-gray-400">
                        Numerology Base
                      </p>
                      <p className="m-0 text-xl font-black text-burgundy">DOB + Name</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 rounded-full bg-white border border-orange-100 text-[10px] font-black uppercase tracking-widest text-burgundy">
                      DOB Number: {result.dobNumber}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white border border-orange-100 text-[10px] font-black uppercase tracking-widest text-burgundy">
                      Name Number: {result.nameNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer badge */}
              <div className="mt-14 flex justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-orange-100">
                  <span className="text-[10px] font-black uppercase tracking-[4px] text-primary">
                    Deterministic • Same Input = Same Lucky Result
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuckyVibesResult;
