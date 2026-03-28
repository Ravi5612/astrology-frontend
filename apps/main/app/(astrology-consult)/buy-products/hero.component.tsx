import React from "react";
import Image from "next/image";
import { FaGem } from "react-icons/fa";

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
                      Authentic Vedic Remedies
                    </span>
                    <h1>Astro Marketplace</h1>
                    <h4 className="card-title">
                      Energize Your Life with Gems
                    </h4>
                    <p>
                      Discover a curated collection of lab-certified
                      gemstones, energized yantras, and authentic spiritual
                      products to enhance your cosmic well-being.
                    </p>
                    <ul className="list-check">
                      <li>
                        <i className="fa-solid fa-check"></i> 100% Lab
                        Certified Gemstones
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Energized Vedic
                        Yantras
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Premium
                        Rudraksha Beads
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Pan India
                        Delivery
                      </li>
                    </ul>
                    <button className="btn-link wfc mt-4 mb-4 border-0 bg-transparent text-[#fd6410] font-bold uppercase tracking-widest text-xs">
                      View Products
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
                      <FaGem className="text-[#fd6410] text-7xl animate-pulse" />
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
