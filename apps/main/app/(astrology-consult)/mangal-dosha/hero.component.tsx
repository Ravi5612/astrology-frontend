"use client";

import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="banner-part light-back">
      <div className="overlay-hero">
        <div className="container">
          <div className="contant-hero">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-12">
                <div className="hero-card shine">
                  <div className="card-z">
                    <span className="aib-trust-badge">
                      Vedic Astrology Calculator
                    </span>
                    <h1>Mangal Dosha Analysis</h1>
                    <h4 className="card-title">
                      Discover & Neutralize Mars Affliction
                    </h4>
                    <p>
                      Get accurate analysis of Mangal Dosha (Mars Affliction)
                      in your birth chart. Understand its impact on marriage,
                      career, and life stability with effective Vedic
                      remedies.
                    </p>
                    <ul className="list-check">
                      <li>
                        <i className="fa-solid fa-check"></i> Instant Dosha
                        Check
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Personalized
                        Insights
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Impact Analysis
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Effective Vedic
                        Remedies
                      </li>
                    </ul>
                    <button
                      className="btn-link wfc mt-4 mb-4"
                      onClick={() =>
                        window.scrollTo({ top: 600, behavior: "smooth" })
                      }
                    >
                      Check Mangal Dosha
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 text-center">
                <div className="right-illus">
                  <Image
                    src="/images/horoscope-round2.png"
                    alt="Zodiac"
                    width={500}
                    height={500}
                    className="w-[90%] mx-auto absolute z-0 left-[10%] top-0 animate-[spin_30s_linear_infinite] opacity-30"
                  />
                  <div className="relative z-10 p-5 transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/images/mangal-dosha-hero.png"
                      alt="Mangal Dosha Analysis"
                      width={500}
                      height={500}
                      className="w-full h-auto drop-shadow-2xl rounded-3xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
