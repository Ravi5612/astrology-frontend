import React from "react";
import Image from "next/image";
import { GiSnake } from "react-icons/gi";

const HeroComponent = () => {
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
                      Vedic Astrology Analysis
                    </span>
                    <h1>Kaal Sarp Dosh</h1>
                    <h4 className="card-title">
                      Unlock Secrets & Overcome Hurdles
                    </h4>
                    <p>
                      Ketu. An accurate analysis and effective Vedic remedies
                      can help you navigate life&apos;s obstacles and achieve
                      immense success.
                    </p>
                    <ul className="list-check">
                      <li>
                        <i className="fa-solid fa-check"></i> Analyze Rahu-Ketu
                        Position
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Identify 12 Dosh
                        Types
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Life Impact Report
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Powerful Remedies
                      </li>
                    </ul>
                    <button className="btn-link wfc mt-4 mb-4">
                      Check Compatibility Now
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
                  <div className="relative z-10 p-5">
                    <div className="w-[180px] h-[180px] bg-white rounded-full flex items-center justify-center border-4 border-[#fd6410] shadow-2xl mx-auto">
                      <GiSnake className="text-[#fd6410] text-7xl animate-pulse" />
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

export default HeroComponent;
