"use client";

import React from "react";
import { HiOutlineSparkles } from "react-icons/hi";

interface ServiceItem {
  icon: string;
  label: string;
  desc: string;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100">
             <HiOutlineSparkles className="text-orange text-xs" />
             <span className="text-[10px] font-black text-orange-800 uppercase tracking-[0.2em]">What We Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Our Astrology <span className="text-orange italic">Services</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-orange to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {services.map((svc, i) => (
            <div 
              key={i} 
              className="group relative bg-slate-50/50 rounded-[2rem] p-8 text-center border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-premium hover:-translate-y-2 overflow-hidden"
            >
              {/* Card Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-orange border border-orange-100/50 group-hover:bg-orange group-hover:text-white transition-all duration-500 shadow-sm">
                  <i className={`fa-solid ${svc.icon} text-2xl`} />
                </div>
                
                <div className="space-y-2">
                  <h6 className="text-sm font-black text-slate-900 uppercase tracking-widest group-hover:text-orange transition-colors">
                    {svc.label}
                  </h6>
                  <p className="text-[11px] font-bold text-slate-400 italic leading-relaxed group-hover:text-slate-500 transition-colors">
                    {svc.desc}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-orange/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
