import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PersonalGuidanceCardProps {
  className?: string;
}

const PersonalGuidanceCard: React.FC<PersonalGuidanceCardProps> = ({ className = "" }) => {
  return (
    <div className={`bg-[#FFF8F3] border border-[#F5E0CC] rounded-[2rem] p-6 relative overflow-hidden flex flex-col ${className}`}>
      {/* Text Content */}
      <div className="relative z-10 mb-6">
        <h3 className="text-[22px] font-black text-[#301118] mb-3 leading-tight">
          Need Personal Guidance?
        </h3>
        <p className="text-[#555] text-sm leading-relaxed mb-6">
          Talk to our experienced astrologers and get answers to all your love & relationship questions.
        </p>

        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-sm font-bold text-[#301118]">
            <div className="w-5 flex justify-center">
              <i className="fa-solid fa-shield-halved text-[#2E8B19]" />
            </div>
            100% Confidential
          </li>
          <li className="flex items-center gap-3 text-sm font-bold text-[#301118]">
            <div className="w-5 flex justify-center">
              <i className="fa-solid fa-bolt text-[#F26500]" />
            </div>
            Instant Connect
          </li>
          <li className="flex items-center gap-3 text-sm font-bold text-[#301118]">
            <div className="w-5 flex justify-center">
              <i className="fa-solid fa-star text-[#F5B041]" />
            </div>
            4.9/5 Rating
          </li>
          <li className="flex items-center gap-3 text-sm font-bold text-[#301118]">
            <div className="w-5 flex justify-center">
              <i className="fa-solid fa-users text-[#E74C3C]" />
            </div>
            10K+ Happy Clients
          </li>
        </ul>
      </div>

      {/* Image & Button Area */}
      <div className="relative mt-auto pt-10 flex flex-col items-center">
        {/* Background Kundli Watermark */}
        <div className="absolute inset-0 top-0 opacity-10 flex items-center justify-center pointer-events-none">
          <Image 
            src="/images/horoscope-round2.png" 
            alt="Kundli background" 
            width={250} 
            height={250} 
            className="object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full relative z-20 flex flex-col gap-2">
          <Link 
            href="/our-experts"
            className="w-full bg-[#F26500] hover:bg-[#D95A00] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-[15px] shadow-lg"
          >
            <i className="fa-regular fa-comments" /> Talk to Astrologer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PersonalGuidanceCard;
