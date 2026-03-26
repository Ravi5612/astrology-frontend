"use client";

import React from "react";
import { FaBalanceScale, FaBullseye, FaStar } from "react-icons/fa";
import { GiLotus } from "react-icons/gi";

type EducationalProps = {
  t: any;
};

const Educational = ({ t }: EducationalProps) => {
  return (
    <section className="py-32 bg-[#301118] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#fd6410] rounded-full blur-[100px] -ml-64 -mt-64"></div>
        <GiLotus
          className="absolute bottom-0 right-0 -mr-32 -mb-32 animate-spin-slow"
          size={600}
        />
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <span className="inline-block bg-[#fd6410] text-white px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-[4px] mb-8">
            {t.educational.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">
            {t.educational.title.split("{comp}")[0]}{" "}
            <span className="text-[#fd6410]">
              {t.educational.title.split("{comp}")[1]}
            </span>
          </h2>
          <p className="text-lg text-orange-100/60 font-light italic leading-relaxed">
            {t.educational.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: t.educational.cards[0].title,
              icon: <FaBullseye size={32} />,
              desc: t.educational.cards[0].desc,
              accent: "orange",
            },
            {
              title: t.educational.cards[1].title,
              icon: <FaStar size={32} />,
              desc: t.educational.cards[1].desc,
              accent: "gold",
            },
            {
              title: t.educational.cards[2].title,
              icon: <FaBalanceScale size={32} />,
              desc: t.educational.cards[2].desc,
              accent: "burgundy",
            },
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] h-100 transition-all duration-500 hover:bg-white/10 hover:shadow-2xl">
                <div className="w-20 h-20 rounded-3xl bg-[#fd6410] flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-orange-100/40 leading-relaxed font-light italic m-0">
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
