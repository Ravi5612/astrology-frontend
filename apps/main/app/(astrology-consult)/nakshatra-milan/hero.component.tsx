"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

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
                    <span className="aib-trust-badge">Vedic Analysis</span>
                    <h1>Nakshatra Milan</h1>
                    <h4 className="card-title">Star Compatibility Checker</h4>
                    <p>
                      Analyze the birth stars (Nakshatras) of both partners to
                      determine their emotional, mental, and spiritual
                      compatibility based on ancient Vedic astrology.
                    </p>
                    <ul className="list-check">
                      <li>
                        <i className="fa-solid fa-check"></i> Nakshatra
                        Analysis
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Chandra Rashi
                        Check
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Birth Star
                        Details
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Professional
                        Report
                      </li>
                    </ul>
                    <button
                      className="btn-link wfc mt-4 mb-4"
                      onClick={() =>
                        window.scrollTo({ top: 600, behavior: "smooth" })
                      }
                    >
                      Check Star Details
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
                    className="w-[90%] mx-auto absolute z-0 left-[10%] top-0 animate-[spin_25s_linear_infinite] opacity-30"
                  />
                  <div className="relative z-10 ">
                    <div className="w-[180px] h-[180px] bg-white rounded-full flex items-center justify-center border-4 border-[#fd6410] shadow-2xl mx-auto">
                      <FaStar className="text-[#fd6410] text-7xl animate-pulse" />
                    </div>
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
