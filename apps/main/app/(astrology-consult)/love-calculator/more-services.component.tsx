"use client";

import React from "react";
import { FaChevronRight, FaRing, FaUserFriends, FaArrowRight } from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";

type MoreServicesProps = {
  t: any;
};

const MoreServices = ({ t }: MoreServicesProps) => {
  return (
    <section className="py-32 bg-[#FFF9F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left-12 duration-1000">
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg shadow-orange-950/5">
              {t.moreServices.badge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95]">
              {t.moreServices.title.split("{guidance}")[0]}{" "}
              <span className="text-orange-500">
                {t.moreServices.title.split("{guidance}")[1]}
              </span>
            </h2>
          </div>
          
          <a
            href="#"
            className="group inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-orange-600 transition-all duration-500 animate-in fade-in slide-in-from-right-12 duration-1000"
          >
            {t.moreServices.viewAll}
            <div className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-slate-900 group-hover:bg-orange-500 group-hover:text-white group-hover:translate-x-4 transition-all duration-700 border border-slate-50">
              <FaArrowRight size={14} />
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          {[
            {
              title: "Kundali Matching",
              icon: <FaUserFriends size={28} />,
              desc: "Full 36 Guna analysis for matrimonial success and long-term compatibility.",
              path: "/kundali-matching",
            },
            {
              title: "Wedding Muhurat",
              icon: <FaRing size={28} />,
              desc: "Identify the most auspicious celestial window for your sacred union.",
              path: "/wedding-muhurat",
            },
            {
              title: "Life Report",
              icon: <TbCrystalBall size={28} />,
              desc: "Strategic 50-page deep-dive report predicting your cosmic destiny.",
              path: "/life-report",
            },
          ].map((s, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative h-full p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_100px_rgba(48,17,24,0.08)] overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.08] group-hover:scale-150 group-hover:-rotate-45 transition-all duration-1000 pointer-events-none">
                  {s.icon}
                </div>
                
                <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-900 mb-10 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-12 transition-all duration-700 shadow-inner">
                  {s.icon}
                </div>
                
                <h4 className="text-2xl font-black text-slate-900 mb-6 tracking-tight group-hover:text-orange-600 transition-colors">
                  {s.title}
                </h4>
                
                <p className="text-slate-400 leading-relaxed font-bold italic mb-10 text-sm group-hover:text-slate-600 transition-colors">
                  {s.desc}
                </p>
                
                <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 group-hover:gap-6 transition-all duration-500">
                  <span className="border-b-2 border-orange-500/20 pb-1 group-hover:border-orange-500 transition-colors">Learn More</span>
                  <FaChevronRight size={10} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreServices;
