"use client";

import React from "react";
import { FaRegCheckCircle, FaHeart } from "react-icons/fa";

const EducationalContent = () => {
  return (
    <div className="bg-white">
      {/* Why Guna Milan Section */}
      <section className="py-24 relative overflow-hidden bg-gray-900 border-y border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <i className="fa-solid fa-star-shooting text-orange text-[10px]"></i>
                  <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">Deep Compatibility Insights</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight">
                  Importance of <span className="text-orange italic">Matching</span>
                </h2>
                <p className="text-gray-400 font-bold text-lg leading-relaxed max-w-xl italic">
                  &quot;Beyond just the Guna score, our advanced system analyzes Mangal Dosha and other planetary positions to give you a complete picture of relationship compatibility.&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { text: "Mental Compatibility", icon: "fa-brain-circuit" },
                  { text: "Career & Financial Growth", icon: "fa-chart-network" },
                  { text: "Health & Longevity", icon: "fa-heart-pulse" },
                  { text: "Offspring Prospects", icon: "fa-baby-carriage" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-300">
                      <i className={`fa-solid ${item.icon} text-sm`}></i>
                    </div>
                    <span className="text-xs font-black text-white/90 uppercase tracking-widest">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange/20 to-purple-500/20 rounded-[3rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/5 p-10 md:p-14 rounded-[3rem] border border-white/10 backdrop-blur-sm overflow-hidden min-h-[400px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none">
                  <FaHeart size={200} />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-orange flex items-center justify-center text-white shadow-lg shadow-orange/20">
                    <i className="fa-solid fa-lightbulb-on text-xl"></i>
                  </div>
                  <h4 className="text-2xl font-black text-white leading-tight">Did you know?</h4>
                  <p className="text-gray-400 font-bold leading-relaxed text-sm">
                    A score above 18 is considered good for a stable marriage, while a score above 25 is excellent. However, Mangal Dosha and Nadi Dosha are equally important factors to consider before finalizing any relationship.
                  </p>
                  <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                     <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-900 overflow-hidden">
                             <img src="/images/dummy-expert.jpg" alt="User" />
                          </div>
                        ))}
                     </div>
                     <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Trusted by 10k+ Couples</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Content Section */}
      <section className="py-24 bg-gray-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 px-4 py-1.5 bg-gray-100 rounded-full border border-gray-200">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">The Foundation of Milan</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Understanding the <span className="text-orange">8 Koots</span> (Ashtakoot)
            </h2>
            <p className="text-gray-400 font-bold text-sm leading-relaxed uppercase tracking-widest">The primary markers of compatibility in Vedic Astrology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Varna", points: 1, desc: "Analyzes mental and ego compatibility between the couple.", icon: "fa-peace" },
              { title: "Vashya", points: 2, desc: "Measures mutual attraction and dominance in the relationship.", icon: "fa-magnet" },
              { title: "Tara", points: 3, desc: "Determines health, longevity, and well-being prospects.", icon: "fa-star-shooting" },
              { title: "Yoni", points: 4, desc: "Focuses on physical and sexual compatibility.", icon: "fa-dna" },
              { title: "Graha Maitri", points: 5, desc: "Checks psychological and emotional harmony.", icon: "fa-users-line" },
              { title: "Gana", points: 6, desc: "Assesses behavioral traits and temperament matching.", icon: "fa-masks-theater" },
              { title: "Bhakoot", points: 7, desc: "Relates to financial prosperity and progeny prospects.", icon: "fa-coins" },
              { title: "Nadi", points: 8, desc: "The most critical koot, genetic & spiritual compatibility.", icon: "fa-sparkles" },
            ].map((koot, idx) => (
              <div key={idx} className="group flex flex-col h-full">
                <div className="flex-grow bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-premium transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange/5"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100/50">
                        <i className={`fa-solid ${koot.icon} text-lg`}></i>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Impact</span>
                        <span className="text-xs font-black text-orange uppercase tracking-widest leading-none bg-orange/10 px-2 py-1 rounded-lg">
                          {koot.points} Pts
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight group-hover:text-orange transition-colors">
                        {koot.title}
                      </h4>
                      <p className="text-sm font-bold text-gray-400 leading-relaxed italic">
                        &quot;{koot.desc}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationalContent;
