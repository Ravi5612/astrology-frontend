import React from "react";
import Image from "next/image";

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
                    <span className="aib-trust-badge">Advanced Analysis</span>
                    <h1>Detailed Kundali Matching</h1>
                    <h4 className="card-title">
                      Comprehensive Compatibility Report
                    </h4>
                    <p>
                      Get deep insights into relationship harmony with Guna
                      Milan, Ashtakoot Analysis, and detailed Mangal Dosha
                      verification for both partners.
                    </p>
                    <ul className="list-check">
                      <li>
                        <i className="fa-solid fa-check"></i> 8-Point Ashtakoot
                        Milan
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Advanced Mangal
                        Dosha Check
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Dosha Exceptions &
                        Remedies
                      </li>
                      <li>
                        <i className="fa-solid fa-check"></i> Conclusion &
                        Advice
                      </li>
                    </ul>
                    <button
                      className="btn-link wfc mt-4 mb-4"
                      onClick={() =>
                        window.scrollTo({ top: 600, behavior: "smooth" })
                      }
                    >
                      Check Detailed Compatibility
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
                  <div className="relative z-10 p-5 transform hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/images/kundali-matching-hero.png"
                      alt="Kundali Matching"
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

export default HeroComponent;
