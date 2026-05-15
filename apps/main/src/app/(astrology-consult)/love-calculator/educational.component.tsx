"use client";

import React from "react";
import { FaBalanceScale, FaBullseye, FaStar } from "react-icons/fa";
import { GiLotus } from "react-icons/gi";

type EducationalProps = {
  t: any;
};

const Educational = ({ t }: EducationalProps) => {
  return (
    <section className="py-32 bg-gradient-to-br from-[#301118] via-[#4a1c26] to-[#301118] text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[120px] -ml-64 -mt-64 animate-pulse"></div>
        <GiLotus
          className="absolute bottom-0 right-0 -mr-32 -mb-32 animate-[spin_60s_linear_infinite]"
          size={800}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="text-center mb-24 max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <span className="inline-flex items-center gap-2 px-8 py-2 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg shadow-orange-950/40">
            {t.educational.badge}
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] py-4">
            {t.educational.title.split("{comp}")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 animate-pulse">
              {t.educational.title.split("{comp}")[1]}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-orange-100/60 leading-relaxed font-bold italic max-w-3xl mx-auto px-4">
            {t.educational.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {[
            {
              title: t.educational.cards[0].title,
              icon: <FaBullseye size={32} />,
              desc: t.educational.cards[0].desc,
            },
            {
              title: t.educational.cards[1].title,
              icon: <FaStar size={32} />,
              desc: t.educational.cards[1].desc,
            },
            {
              title: t.educational.cards[2].title,
              icon: <FaBalanceScale size={32} />,
              desc: t.educational.cards[2].desc,
            },
          ].map((item, i) => (
            <div key={i} className="group relative">
               {/* Card Background Glow */}
               <div className="absolute -inset-2 bg-orange-500/5 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
              <div className="relative h-full p-12 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] transition-all duration-700 hover:-translate-y-4 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_40px_100px_rgba(253,100,16,0.15)] group-hover:shadow-2xl">
                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                  <div className="text-white transform group-hover:-rotate-12 transition-transform duration-700">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-3xl font-black mb-6 tracking-tight group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-orange-100/40 leading-relaxed text-lg font-bold italic m-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Educational;
