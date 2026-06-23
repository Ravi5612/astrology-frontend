"use client";

import React from "react";
import Image from "next/image";

export default function CTABanner() {
  return (
    <div className="bg-[#301610] rounded-xl my-10 mx-6 md:mx-12 lg:mx-20 relative overflow-hidden flex flex-col md:flex-row items-center max-w-[1200px] xl:mx-auto border border-white/5">
      
      {/* Left side: Image */}
      <div className="w-full md:w-auto flex justify-center md:justify-start shrink-0">
        <div className="relative w-40 h-32 md:w-[220px] md:h-[130px]">
          <Image
            src="/images/horoscope-round2.png" 
            alt="Astrology Books and Tools"
            fill
            className="object-cover md:object-contain object-left drop-shadow-xl"
            unoptimized={true}
          />
        </div>
      </div>
      
      {/* Middle: Text Content */}
      <div className="flex-1 px-4 md:px-6 py-2 md:py-0 text-center md:text-left">
        <h2 className="text-[16px] md:text-[22px] font-bold text-white mb-1.5 leading-snug">
          Want More Clarity About Your Future?
        </h2>
        <p className="text-white/80 text-[11px] md:text-[14px] max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Chat, Call or Video Call with our Verified Astrologers and get detailed answers to your questions.
        </p>
      </div>

      {/* Right: Button */}
      <div className="shrink-0 pb-5 md:pb-0 md:pr-10 mt-2 md:mt-0">
        <button className="bg-[#FF6B00] hover:bg-[#E66000] text-white px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-[13px] md:text-[14px] transition-transform active:scale-95">
          Talk to an Expert
        </button>
      </div>
      
    </div>
  );
}
