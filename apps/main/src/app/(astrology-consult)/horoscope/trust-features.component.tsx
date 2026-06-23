"use client";

import React from "react";
import { FiUserCheck, FiShield, FiPhoneCall, FiAward } from "react-icons/fi";

const features = [
  {
    icon: <FiUserCheck className="w-8 h-8 text-[#FF6B00]" strokeWidth={1.5} />,
    title: "Verified Experts",
    desc: "Consult only experienced and trusted astrologers."
  },
  {
    icon: <FiShield className="w-8 h-8 text-[#FF6B00]" strokeWidth={1.5} />,
    title: "100% Privacy",
    desc: "Your conversations are safe and confidential."
  },
  {
    icon: <FiPhoneCall className="w-8 h-8 text-[#FF6B00]" strokeWidth={1.5} />,
    title: "Instant Support",
    desc: "Get answers through chat, call or video instantly."
  },
  {
    icon: <FiAward className="w-8 h-8 text-[#FF6B00]" strokeWidth={1.5} />,
    title: "Trusted by Thousands",
    desc: "Thousands of satisfied customers across India."
  }
];

export default function TrustFeatures() {
  return (
    <div className="py-12 md:py-16 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
      <div className="flex items-start md:items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10">
        <div className="text-[#FF6B00] shrink-0 mt-1 md:mt-0">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6">
              <path d="M12 4V2M12 22V20M4 12H2M22 12H20M17.6569 6.34315L19.0711 4.92893M6.34315 17.6569L4.92893 19.0711M17.6569 17.6569L19.0711 19.0711M6.34315 6.34315L4.92893 4.92893" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="4" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
           </svg>
        </div>
        <h2 className="text-[18px] md:text-2xl lg:text-3xl font-black text-[#2D1B15] leading-tight text-left md:text-center">
          Why Trust Astrology in Bharat?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-orange-50/40 p-4 md:p-5 rounded-xl border border-orange-200 flex items-center gap-4 hover:border-orange-300 transition-colors">
            <div className="shrink-0 flex items-center justify-center">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-[#2D1B15] mb-0.5">
                {feature.title}
              </h3>
              <p className="text-[12px] text-slate-500 leading-snug">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
