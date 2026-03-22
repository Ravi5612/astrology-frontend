"use client";
import React, { useState } from "react";
import Image from "next/image";

import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import { CharacteristicsGrid } from "./characteristics-grid";
import { SidebarStats } from "./sidebar-stats";
import { TbCrystalBall } from "react-icons/tb";

const SunSignPage = () => {
  const [selectedSign, setSelectedSign] = useState(ZodiacSignsData[0]);

  if (!selectedSign) return null;

  return (
    <div className="main-wrapper">
      {/* Hero Section */}
      <section className="banner-part light-back">
        <div className="overlay-hero">
          <div className="container">
            <div className="contant-hero">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-12">
                  <div className="hero-card shine">
                    <div className="card-z">
                      <span className="aib-trust-badge">
                        Zodiac Knowledge Base
                      </span>
                      <h1>Sun Sign Details</h1>
                      <h4 className="card-title">
                        Discover the Secrets of Your Personality
                      </h4>
                      <p>
                        Explore the cosmic lens of your sun sign to understand
                        your true self, your relationships, and your destiny.
                        Each sign carries unique energies that shape who you
                        are.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-4">
                        <ul className="list-check">
                          <li>
                            <i className="fa-solid fa-check"></i> Know Your
                            Zodiac
                          </li>
                          <li>
                            <i className="fa-solid fa-check"></i> Personality
                            Traits
                          </li>
                          <li>
                            <i className="fa-solid fa-check"></i> Love
                            Compatibility
                          </li>
                          <li>
                            <i className="fa-solid fa-check"></i> Career &
                            Health
                          </li>
                        </ul>
                        <button className="btn-link wfc mt-4 mb-4">
                          Select Zodiac Sign
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 text-center">
                  <div className="right-illus py-10">
                    <Image
                      src="/images/horoscope-round2.png"
                      alt="Zodiac Wheel"
                      width={500}
                      height={500}
                      className="w-[80%] mx-auto animate-[spin_20s_linear_infinite] absolute z-0 left-[10%] top-0 opacity-20"
                    />
                    <Image
                      src={selectedSign.image}
                      alt={selectedSign.title}
                      width={200}
                      height={200}
                      className="relative z-10 w-[200px] h-[200px] object-contain mx-auto drop-shadow-2xl transition-all duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zodiac Selection Slider - Matching ChooseYourZodiac style */}
      <section className="bg-white border-y border-[#fd64102b] py-4 sticky top-[70px] z-40 shadow-sm">
        <div className="container">
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x items-center px-4">
            {ZodiacSignsData.map((sign) => (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className={`snap-center shrink-0 flex flex-col items-center cursor-pointer transition-all duration-300 p-2 rounded-xl border bg-transparent ${
                  selectedSign.id === sign.id
                    ? "border-[#fd6410] bg-[#fff5ef] scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ minWidth: "100px" }}
              >
                <Image
                  src={sign.image}
                  alt={sign.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain mb-2"
                />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {sign.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <section className="space-section light-back">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="light-card p-4 p-md-5 border border-[#fd64102b] shadow-xl">
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-gray-100">
                  <div className="bg-[#fd64101a] p-4 rounded-4">
                    <Image
                      src={selectedSign.image}
                      alt={selectedSign.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain drop-shadow-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-[#301118] uppercase tracking-tight mb-1">
                      {selectedSign.title}
                    </h2>
                    <p className="text-[#fd6410] font-bold text-sm tracking-[0.2em] uppercase">
                      The {selectedSign.nature} Sign
                    </p>
                  </div>
                </div>

                {/* Characteristics Grid */}
                <CharacteristicsGrid />

                {/* Extra Details */}
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-100 p-8 rounded-4 relative overflow-hidden">
                    <TbCrystalBall className="absolute -right-4 -bottom-4 text-gray-200 text-9xl opacity-20" />
                    <h3 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
                      <div className="w-1 h-6 bg-[#fd6410] rounded-full"></div>
                      Vedic Perspective
                    </h3>
                    <p className="text-gray-500 italic relative z-10 leading-relaxed mb-0">
                      In Vedic astrology, the Sun represents the Soul, the King,
                      and the Father. Your sun sign placement determines the
                      inner light and core vitality you bring to the world.
                      Analysis of {selectedSign.title}&apos;s ruling planet and
                      element provides deep insight into your spiritual purpose.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <SidebarStats />
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default SunSignPage;
