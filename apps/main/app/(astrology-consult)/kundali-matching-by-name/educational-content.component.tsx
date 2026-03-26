"use client";

import React from "react";
import { FaRegCheckCircle, FaHeart } from "react-icons/fa";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";

const EducationalContent = () => {
  return (
    <>
      {/* Why Guna Milan Section */}
      <section className="space-section bg-[#301118] text-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="text-4xl font-bold mb-6">
                Importance of <span className="text-[#fd6410]">Matching</span>
              </h2>
              <p className="text-orange-100/90 mb-8 leading-relaxed italic">
                Beyond just the Guna score, our advanced system analyzes Mangal
                Dosha and other planetary positions to give you a complete
                picture of relationship compatibility.
              </p>
              <div className="space-y-4">
                {[
                  "Understanding Mental Compatibility",
                  "Analyzing Career & Financial Growth",
                  "Checking Physical Health & Longevity",
                  "Assessing Offspring (Progeny) Prospects",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaRegCheckCircle className="text-[#fd6410] shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-white/5 p-8 rounded-[3rem] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                  <FaHeart size={150} />
                </div>
                <h4 className="text-xl font-bold mb-4">Did you know?</h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-0">
                  A score above 18 is considered good for a stable marriage,
                  while a score above 25 is excellent. However, Mangal Dosha and
                  Nadi Dosha are equally important factors to consider before
                  finalizing any relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />

      {/* Structured Content Section (Optional details) */}
      <section className="space-section light-back">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#301118] text-center mb-10">
              Understanding the 8 Koots (Ashtakoot)
            </h2>
            <div className="row g-4">
              {[
                {
                  title: "Varna",
                  points: 1,
                  desc: "Analyzes mental and ego compatibility between the couple.",
                },
                {
                  title: "Vashya",
                  points: 2,
                  desc: "Measures mutual attraction and dominance in the relationship.",
                },
                {
                  title: "Tara",
                  points: 3,
                  desc: "Determines health, longevity, and well-being prospects.",
                },
                {
                  title: "Yoni",
                  points: 4,
                  desc: "Focuses on physical and sexual compatibility.",
                },
                {
                  title: "Graha Maitri",
                  points: 5,
                  desc: "Checks psychological and emotional harmony.",
                },
                {
                  title: "Gana",
                  points: 6,
                  desc: "Assesses behavioral traits and temperament matching.",
                },
                {
                  title: "Bhakoot",
                  points: 7,
                  desc: "Relates to financial prosperity and progeny (children).",
                },
                {
                  title: "Nadi",
                  points: 8,
                  desc: "The most critical koot, analyzing genetic and spiritual compatibility.",
                },
              ].map((koot, idx) => (
                <div key={idx} className="col-md-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 h-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-[#fd6410]">
                        {koot.title}
                      </h4>
                      <span className="bg-[#fd641010] text-[#fd6410] px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                        {koot.points} Points
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 m-0 leading-relaxed">
                      {koot.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationalContent;
