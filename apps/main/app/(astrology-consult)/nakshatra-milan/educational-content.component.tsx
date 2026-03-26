"use client";

import React, { useState } from "react";
import { FaRegCheckCircle, FaStar, FaChevronDown } from "react-icons/fa";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";

const EducationalContent = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a good Nakshatra Matching score?",
      a: "In Vedic Astrology, a score of 18 or above out of 36 is considered acceptable for marriage. A score above 25 is considered excellent compatibility, while below 18 requires careful consideration and expert consultation.",
    },
    {
      q: "Can Nakshatra Milan predict a happy marriage?",
      a: "Nakshatra Milan provides deep insights into psychological and emotional compatibility. While a high score is a positive sign, a happy marriage also depends on mutual respect, understanding, and the overall strength of individual horoscopes.",
    },
    {
      q: "How serious is Nadi Dosha in matching?",
      a: "Nadi Dosha is one of the most significant aspects of Guna Milan, as it relates to genetic compatibility and progeny. However, Vedic Astrology also provides specific cancellations (Nadi Dosha Parihar) based on various planetary alignments.",
    },
    {
      q: "What are the remedies for Gana Dosha?",
      a: "Gana Dosha relates to temperament differences. If Guna Milan shows a Gana Dosha, experts often recommend specific mantras, charity, or 'Maha-Mrityunjaya' jaap to mitigate the effects and improve mutual harmony.",
    },
  ];

  return (
    <>
      {/* Info Section */}
      <section className="space-section bg-[#301118] text-white overflow-hidden">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="text-4xl font-bold mb-6">
                Importance of <span className="text-[#fd6410]">Nakshatra</span>
              </h2>
              <p className="text-orange-100/90 mb-8 leading-relaxed italic">
                In Vedic Astrology, the Nakshatras (lunar mansions) are even
                more significant than the solar zodiac signs. They determine our
                temperament, behaviors, and compatibility at a fundamental
                level.
              </p>
              <div className="space-y-4">
                {[
                  "Padas & Quarters",
                  "Gana (Temperament)",
                  "Yoni (Physical Compatibility)",
                  "Nadi (Health & Bloodline)",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white/5 p-4 rounded-3 border border-white/5 hover:bg-white/10 transition-all"
                  >
                    <FaRegCheckCircle className="text-[#fd6410]" />
                    <span className="font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white/5 p-12 rounded-[4rem] border-2 border-dashed border-[#fd641033] relative text-center">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#fd6410] rounded-full flex items-center justify-center -rotate-12 shadow-2xl">
                  <FaStar className="text-white text-5xl" />
                </div>
                <h3 className="text-4xl font-black text-[#fd6410] mb-4">
                  27 Nakshatras
                </h3>
                <p className="text-gray-300 italic text-sm">
                  Every individual is born under one of the 27 lunar
                  constellations that define their life path.
                </p>
                <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="text-left">
                    <span className="text-[10px] font-black text-[#fd6410] uppercase tracking-widest">
                      Aries - Taurus
                    </span>
                    <p className="text-xs font-semibold text-gray-200">
                      Ashwini, Bharani, Krittika
                    </p>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black text-[#fd6410] uppercase tracking-widest">
                      Gemini - Cancer
                    </span>
                    <p className="text-xs font-semibold text-gray-200">
                      Mrigashira, Punarvasu, Pushya
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-section light-back">
        <div className="container">
          <div className="row justify-content-center mb-12">
            <div className="col-lg-7 text-center">
              <span className="aib-trust-badge mb-3">Questions & Answers</span>
              <h2 className="text-3xl font-black text-[#301118]">
                Common Compatibility Queries
              </h2>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`light-card border rounded-3xl transition-all duration-300 ${
                  openFaq === i
                    ? "border-[#fd6410] bg-white shadow-xl"
                    : "border-[#fd64101a] hover:bg-white hover:border-[#fd641044]"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full md:p-6 flex justify-between items-center text-left"
                >
                  <span
                    className={`text-base font-bold transition-colors ${openFaq === i ? "text-[#fd6410]" : "text-[#301118]"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`p-2 rounded-full transition-all duration-300 ${openFaq === i ? "bg-[#fd6410] text-white rotate-180" : "bg-orange-50 text-[#fd6410]"}`}
                  >
                    <FaChevronDown size={12} />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === i
                      ? "max-h-[200px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 md:p-6 pt-0 border-t border-orange-50 mt-1">
                    <p className="text-sm text-gray-500 leading-relaxed italic m-0">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WhyChooseUs />
      <CTA />
    </>
  );
};

export default EducationalContent;
