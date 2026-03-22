"use client";

import React, { useState } from "react";
import Image from "next/image";

import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import ChooseYourZodiac from "@/components/layout/main/ChooseYourZodiac";
import { horoscopeTranslations } from "@/lib/horoscope-translations";
import { useLanguageStore } from "@/store/languageStore";
import HeroComponent from "./hero.component";
import { FaHeart, FaBriefcase, FaLeaf, FaPlane } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const predictionIcons = [
  <FaHeart key="love" className="text-danger" />,
  <FaBriefcase key="career" className="text-blue-500" />,
  <FaLeaf key="health" className="text-green-500" />,
  <FaPlane key="travel" className="text-primary" />,
];

const predictionGradients = [
  { gradient: "from-red-50 to-transparent", border: "border-red-100/50" },
  { gradient: "from-blue-50 to-transparent", border: "border-blue-100/50" },
  { gradient: "from-green-50 to-transparent", border: "border-green-100/50" },
  { gradient: "from-orange-50 to-transparent", border: "border-orange-100/50" },
];

const HoroscopePage = () => {
  const [selectedSign, setSelectedSign] = useState(ZodiacSignsData[0]);
  const { lang, toggleLang } = useLanguageStore();

  const t = horoscopeTranslations[lang];

  if (!selectedSign) return null;

  return (
    <div className="main-wrapper bg-bg-light">
      {/* Hero Section */}
      <HeroComponent selectedSign={selectedSign} />

      <div id="predictions" className="relative -mt-10 z-20">
        <ChooseYourZodiac />
      </div>

      {/* Prediction Details */}
      <section className="py-20 bg-bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-premium border border-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <HiOutlineSparkles className="text-9xl text-primary" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b border-gray-100 pb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                      <Image
                        src={selectedSign.image}
                        alt={selectedSign.title}
                        width={60}
                        height={60}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-black text-secondary uppercase tracking-tight mb-1">
                        {selectedSign.title}{" "}
                        <span className="text-primary italic">
                          {t.dailyLabel}
                        </span>
                      </h2>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-primary tracking-widest uppercase">
                          {t.forecastLabel}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        <p className="text-gray-500 text-sm font-medium m-0">
                          {new Date().toLocaleDateString(
                            lang === "hi" ? "hi-IN" : "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-2xl">
                    <i className="fa-solid fa-star text-accent-gold text-xs"></i>
                    <span className="text-sm font-bold tracking-wide">
                      {t.highlyAccurate}
                    </span>
                  </div>
                </div>

                {/* Prediction Cards */}
                <div className="row g-4 mb-12">
                  {t.predictions.map((pred, i) => (
                    <div key={i} className="col-md-6">
                      <div
                        className={`bg-gradient-to-br ${(predictionGradients[i] ?? predictionGradients[0])!.gradient} p-8 rounded-2xl border ${(predictionGradients[i] ?? predictionGradients[0])!.border} h-100 transition-all hover:shadow-md group`}
                      >
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                          {predictionIcons[i]}
                        </div>
                        <h4 className="text-base font-bold text-secondary uppercase mb-3 tracking-tight">
                          {pred.label}
                        </h4>
                        <p className="text-gray-600 text-[13px] leading-relaxed mb-0 font-medium opacity-90">
                          {pred.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cosmic Insight */}
                <div className="bg-secondary p-8 lg:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-1 bg-primary rounded-full"></div>
                      <h3 className="text-xl font-bold text-white mb-0">
                        {t.cosmicInsight}
                      </h3>
                    </div>
                    <p className="text-white/70 italic leading-relaxed mb-0 text-lg">
                      "{t.cosmicText.replace("white", "").replace("सफेद", "")}
                      <strong className="text-primary underline underline-offset-4 decoration-primary/50">
                        {t.colorWhite}
                      </strong>
                      {lang === "en"
                        ? " for mental peace and meditate for 10 minutes to align your energies."
                        : " रंग पहनें और अपनी ऊर्जाओं को संरेखित करने के लिए 10 मिनट ध्यान करें।"}
                      "
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default HoroscopePage;
