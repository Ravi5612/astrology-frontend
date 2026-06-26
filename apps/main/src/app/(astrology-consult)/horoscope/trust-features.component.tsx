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
      <div className="text-[#2D1B15] mb-8 md:mb-10" style={{ '--heading-border-color': 'rgba(255,107,0,0.2)' } as any}>
        <h2 className="section-heading-premium uppercase mb-0">
          <span style={{ fontSize: '1.75rem' }}>
            Why Trust Astrology in Bharat?
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-white p-4 md:p-5 rounded-xl border border-orange-200 flex items-center gap-4 hover:border-orange-400 hover:bg-orange-50 hover:scale-[1.03] hover:shadow-md transition-all duration-300 cursor-pointer">
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
