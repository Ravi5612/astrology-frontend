"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTABanner() {
  return (
    <div className="bg-[#301610] rounded-xl my-10 mx-6 md:mx-12 lg:mx-20 relative overflow-hidden flex flex-col md:flex-row items-center max-w-[1200px] xl:mx-auto border border-white/5">
      
      {/* Left side: Image */}
      <div className="w-full md:w-auto flex justify-center md:justify-start shrink-0 pt-5 md:pt-0">
        <div className="relative w-28 h-28 md:w-[220px] md:h-[130px]">
          <Image
            src="/images/cosmic/media__1782275346457.jpg" 
            alt="Astrology Books and Tools"
            fill
            className="object-contain object-center md:object-left drop-shadow-xl"
            unoptimized={true}
          />
        </div>
      </div>
      
      {/* Middle: Text Content */}
      <div className="flex-1 px-4 md:px-6 py-2 md:py-0 text-center md:text-left">
        <h2 className="text-[14px] md:text-[22px] font-bold text-white mb-1.5 leading-snug">
          Want More Clarity About Your Future?
        </h2>
        <p className="text-white text-[10px] md:text-[14px] max-w-2xl mx-auto md:mx-0 leading-relaxed">
          Chat, Call or Video Call with our Verified Astrologers and get detailed answers to your questions.
        </p>
      </div>

      {/* Right: Button */}
      <div className="shrink-0 pb-5 md:pb-0 md:pr-10 mt-2 md:mt-0">
        <Link href="/our-experts">
          <button className="bg-[#FF6B00] hover:bg-[#E66000] text-white px-5 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-[13px] md:text-[14px] transition-transform active:scale-95">
            Talk to an Expert
          </button>
        </Link>
      </div>
      
    </div>
  );
}
