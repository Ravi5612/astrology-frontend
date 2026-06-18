"use client";

import React from "react";
import Image from "next/image";
import { FaHeart, FaBriefcase, FaLeaf, FaPlane, FaStar, FaChevronRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const predictionIcons = [
  <FaHeart key="love" className="text-rose-500" />,
  <FaBriefcase key="career" className="text-indigo-500" />,
  <FaLeaf key="health" className="text-emerald-500" />,
  <FaPlane key="travel" className="text-amber-500" />,
];

const predictionGradients = [
  { 
    gradient: "from-rose-50/50 via-white to-white", 
    border: "border-rose-100", 
    accent: "bg-rose-500",
    text: "text-rose-600"
  },
  { 
    gradient: "from-indigo-50/50 via-white to-white", 
    border: "border-indigo-100", 
    accent: "bg-indigo-500",
    text: "text-indigo-600"
  },
  { 
    gradient: "from-emerald-50/50 via-white to-white", 
    border: "border-emerald-100", 
    accent: "bg-emerald-500",
    text: "text-emerald-600"
  },
  { 
    gradient: "from-amber-50/50 via-white to-white", 
    border: "border-amber-100", 
    accent: "bg-amber-500",
    text: "text-amber-600"
  },
];

interface PredictionDetailsProps {
  selectedSign: any;
  lang: string;
  t: any;
}

const PredictionDetails: React.FC<PredictionDetailsProps> = ({
  selectedSign,
  lang,
  t,
}) => {
  const [formattedDate, setFormattedDate] = React.useState("");

  React.useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
  }, [lang]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[3rem] p-6 md:p-10 lg:p-16 shadow-premium border border-gray-100 relative group overflow-hidden">
            {/* Sparkle Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
              <HiOutlineSparkles className="text-9xl text-orange-500" />
            </div>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16 pb-12 border-b border-gray-100">
              <div className="flex items-center gap-8">
                <div className="relative group/img">
                  <div className="absolute -inset-2 bg-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                  <div className="relative w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm group-hover/img:scale-105 transition-transform">
                    <Image
                      src={selectedSign.image}
                      alt={selectedSign.title}
                      width={80}
                      height={80}
                      className="w-16 h-16 object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                    {selectedSign.title}{" "}
                    <span className="text-orange-500 italic block lg:inline">{t.dailyLabel}</span>
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] font-black text-orange-600 tracking-[0.3em] uppercase px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                      {t.forecastLabel}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-widest italic">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-4 bg-slate-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl shadow-2xl hover:bg-orange-600 transition-colors group/badge cursor-default">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-orange-400 group-hover/badge:scale-110 transition-transform">
                  <FaStar size={12} />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
                  {t.highlyAccurate}
                </span>
              </div>
            </div>

            {/* Prediction Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {t.predictions.map((pred: any, i: number) => {
                const style = predictionGradients[i] || predictionGradients[0];
                return (
                  <div key={i} className="group/item">
                    <div
                      className={`h-full bg-gradient-to-br ${style!.gradient} p-6 md:p-8 lg:p-10 rounded-[2.5rem] border ${style!.border} relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group-hover/item:border-orange-500/20`}
                    >
                      {/* Accent Line */}
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 ${style!.accent} rounded-b-full opacity-30 group-hover/item:opacity-100 group-hover/item:w-32 transition-all`}></div>
                      
                      <div className="flex flex-col h-full space-y-6">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl group-hover/item:scale-110 group-hover/item:shadow-md transition-all">
                          {predictionIcons[i]}
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className={`text-[10px] font-black ${style!.text} uppercase tracking-[0.4em] flex items-center justify-between`}>
                            {pred.label}
                            <FaChevronRight className="opacity-0 group-hover/item:opacity-20 -translate-x-4 group-hover/item:translate-x-0 transition-all" />
                          </h4>
                          <p className="text-slate-600 text-[14px] leading-relaxed font-bold italic opacity-90 group-hover/item:text-slate-900 transition-colors">
                            &quot;{pred.text}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cosmic Insight Banner */}
            <div className="bg-slate-950 p-8 md:p-12 lg:p-16 rounded-[3.5rem] relative overflow-hidden shadow-2xl group/cosmic shadow-black/20 border border-white/5">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-transparent to-indigo-500/10 opacity-50 group-hover/cosmic:scale-110 transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                 <div className="w-24 h-24 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-orange-500 text-4xl shadow-2xl group-hover/cosmic:rotate-12 transition-transform duration-500">
                    <HiOutlineSparkles />
                 </div>
                 
                 <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4">
                      <div className="w-12 h-1 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"></div>
                      <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">
                        {t.cosmicInsight}
                      </h3>
                    </div>
                    
                    <p className="text-white text-lg md:text-xl lg:text-3xl font-black italic leading-tight tracking-tight">
                      &quot;{t.cosmicText.replace("white", "").replace("सफेद", "")}
                      <span className="text-orange-500 underline underline-offset-8 decoration-orange-500/30">
                        {t.colorWhite}
                      </span>
                      {lang === "en"
                        ? " for mental peace and meditate for 10 minutes to align your energy."
                        : " रंग पहनें और अपनी ऊर्जाओं को संरेखित करने के लिए 10 मिनट ध्यान करें।"}
                      &quot;
                    </p>
                 </div>
              </div>

              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionDetails;
