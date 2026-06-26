import React from "react";
import { FiStar, FiCompass, FiSun, FiShield } from "react-icons/fi";

const HoroscopeInfo = () => {
  return (
    <section className="relative pt-8 pb-10 md:pt-12 md:pb-16 overflow-hidden bg-fixed bg-cover bg-center text-white" style={{ backgroundImage: "url('/images/cosmic/media__1782216892557.jpg')" }}>
      
      <div className="absolute inset-0 bg-[#0B051A]/80 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-8 md:mb-12 px-2 text-white" style={{ '--heading-border-color': 'rgba(255,255,255,0.2)' } as any}>
          <h2 className="section-heading-premium heading-full-line uppercase mb-0 text-left">
            <span>
              What is a <span className="text-[#FF6B00]">Horoscope</span>?
            </span>
          </h2>
          <p className="mt-4 text-white text-[13px] md:text-base leading-relaxed font-medium">
            A horoscope is an astrological chart or diagram representing the positions of the Sun, Moon, planets, astrological aspects, and sensitive angles at the time of an event, such as the moment of a person's birth. It serves as a celestial roadmap of your life.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
          
          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg hover:-translate-y-1 hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4 md:mb-6 shadow-sm border border-[#FF6B00]/30 group-hover:bg-[#FF6B00]/10 transition-colors">
              <FiCompass className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#2D1B15] mb-2 md:mb-3 transition-colors">Life Guidance</h3>
            <p className="text-slate-300 group-hover:text-slate-600 text-xs md:text-sm leading-relaxed font-medium transition-colors">
              Horoscopes act as a compass, helping you navigate through life's uncertainties by highlighting favorable and challenging periods.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg hover:-translate-y-1 hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4 md:mb-6 shadow-sm border border-[#FF6B00]/30 group-hover:bg-[#FF6B00]/10 transition-colors">
              <FiStar className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#2D1B15] mb-2 md:mb-3 transition-colors">Self Discovery</h3>
            <p className="text-slate-300 group-hover:text-slate-600 text-xs md:text-sm leading-relaxed font-medium transition-colors">
              It helps you understand your core personality traits, hidden strengths, and weaknesses based on your zodiac sign.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg hover:-translate-y-1 hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4 md:mb-6 shadow-sm border border-[#FF6B00]/30 group-hover:bg-[#FF6B00]/10 transition-colors">
              <FiShield className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#2D1B15] mb-2 md:mb-3 transition-colors">Preparedness</h3>
            <p className="text-slate-300 group-hover:text-slate-600 text-xs md:text-sm leading-relaxed font-medium transition-colors">
              By knowing upcoming planetary shifts, you can prepare yourself mentally and emotionally for sudden changes or obstacles.
            </p>
          </div>

          <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg hover:-translate-y-1 hover:bg-white hover:shadow-2xl transition-all cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-4 md:mb-6 shadow-sm border border-[#FF6B00]/30 group-hover:bg-[#FF6B00]/10 transition-colors">
              <FiSun className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#2D1B15] mb-2 md:mb-3 transition-colors">Better Decisions</h3>
            <p className="text-slate-300 group-hover:text-slate-600 text-xs md:text-sm leading-relaxed font-medium transition-colors">
              Whether it's career moves, financial investments, or relationships, daily horoscopes provide insights to make informed choices.
            </p>
          </div>

        </div>

        {/* Detailed Content Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="w-full lg:w-1/2">
              <div className="text-white mb-4 md:mb-5" style={{ '--heading-border-color': 'rgba(255,255,255,0.2)' } as any}>
                <h3 className="section-heading-premium heading-full-line uppercase mb-0">
                  <span style={{ fontSize: '1.35rem' }}>
                    Why Read Your Daily Horoscope?
                  </span>
                </h3>
              </div>
              <div className="space-y-3 md:space-y-4 text-white leading-relaxed font-medium text-sm md:text-base">
                <p>
                  Vedic Astrology (Jyotish) is an ancient Indian science that studies planetary motions and their effect on human life. Reading your daily horoscope helps you align your daily actions with the cosmic energies surrounding you.
                </p>
                <p>
                  It's not about predicting the future with 100% certainty; rather, it's about understanding the <strong className="text-white">possibilities and probabilities</strong>. When you know that today might be challenging for communication, you can consciously choose to be more patient and listen more carefully.
                </p>
                <p className="font-bold text-white bg-[#FF6B00]/10 p-3 md:p-4 rounded-xl border border-[#FF6B00]/20 text-xs md:text-sm">
                  Daily horoscopes give you a psychological edge, acting as a daily affirmation and a mindful reminder to live your life purposefully.
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              {/* Sage Graphic */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[6px] border-white/20 shadow-2xl flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/cosmic/media__1782216913125.png')" }}>
                {/* A glowing border effect around the sage circle */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"></div>
                <div className="absolute inset-[-12px] rounded-full border border-orange-400 border-dashed animate-spin-slow opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HoroscopeInfo;
