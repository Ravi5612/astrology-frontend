"use client";

import React from "react";
import { FaChevronRight, FaRing, FaUserFriends } from "react-icons/fa";
import { TbCrystalBall } from "react-icons/tb";

type MoreServicesProps = {
  t: any;
};

const MoreServices = ({ t }: MoreServicesProps) => {
  return (
    <section className="py-32 bg-[#fffaf7] relative overflow-hidden">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[#fd6410] font-black uppercase tracking-[4px] text-[10px] mb-4 block">
              {t.moreServices.badge}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-burgundy tracking-tight">
              {t.moreServices.title.split("{guidance}")[0]}{" "}
              <span className="text-[#fd6410]">
                {t.moreServices.title.split("{guidance}")[1]}
              </span>
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-burgundy hover:text-[#fd6410] transition-colors group"
          >
            {t.moreServices.viewAll}
            <div className="bg-white p-3 rounded-full shadow-md group-hover:translate-x-2 transition-transform">
              <FaChevronRight size={14} />
            </div>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Kundali Matching",
              icon: <FaUserFriends size={28} />,
              desc: "Full 36 Guna analysis for matrimonial success.",
              path: "/kundali-matching",
            },
            {
              title: "Wedding Muhurat",
              icon: <FaRing size={28} />,
              desc: "Find the most auspicious time for your union.",
              path: "/wedding-muhurat",
            },
            {
              title: "Life Report",
              icon: <TbCrystalBall size={28} />,
              desc: "Comprehensive 50-page life prediction report.",
              path: "/life-report",
            },
          ].map((s, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="glass-card p-10 rounded-[3rem] border border-orange-100 h-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.05] transition-opacity">
                  {s.icon}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-[#fd6410]/10 flex items-center justify-center text-[#fd6410] mb-8 group-hover:bg-[#fd6410] group-hover:text-white transition-all duration-500">
                  {s.icon}
                </div>
                <h4 className="text-xl font-bold text-burgundy mb-4">
                  {s.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light italic mb-8">
                  {s.desc}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#fd6410]">
                  Learn More <FaChevronRight size={10} />
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
