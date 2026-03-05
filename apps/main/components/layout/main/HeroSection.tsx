"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Featured4Cards from "@/components/ui/common/Featured4Cards";
import { useLanguageStore } from "../../../store/languageStore";
import { homeTranslations } from "../../../lib/translations/home";

const HeroSection = () => {
  const { lang } = useLanguageStore();
  const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

  return (
    <section
      className="py-0 overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/white-background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="py-10">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
          {/* contant-hero */}
          <div
            className="bg-[#f7f3ec] rounded-[20px] p-5 md:p-6 overflow-visible"
            style={{ border: "solid 1px rgba(242,107,0,0.17)" }}
          >
            {/* row: flex col-reverse on mobile, row on lg */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-6 overflow-visible">

              {/* Left col — col-lg-7 */}
              <div className="w-full lg:w-[58%]">
                {/* hero-card */}
                <div className="flex flex-col justify-center min-h-[400px]">
                  {/* card-z */}
                  <div className="relative z-[9]">

                    {/* aib-trust-badge */}
                    <span className="inline-block px-[14px] py-[6px] bg-[#fde6d3] text-[#c45a13] text-sm font-semibold rounded-[20px] mb-4">
                      {t.hero.trustBadge}
                    </span>

                    {/* banner-part h1 */}
                    <h1 className="text-[40px] md:text-[50px] font-bold tracking-[1px] text-[#2b1b1b] leading-tight mb-4">
                      {t.hero.title}
                    </h1>

                    {/* card-title */}
                    <h4 className="text-[22px] text-orange font-semibold mt-[15px] mb-[10px]">
                      {t.hero.subtitle}
                    </h4>

                    {/* banner-part p */}
                    <p className="text-[16px] text-[#1a1a1a] mb-[18px]">
                      {t.hero.description}
                    </p>

                    {/* list-check */}
                    <ul className="list-none p-0 m-0">
                      {t.hero.features.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-[16px] text-[#1e1e1e] py-[7px]"
                        >
                          <i
                            className="fa-solid fa-check text-white text-xs flex items-center justify-center rounded-full flex-shrink-0"
                            style={{
                              width: "25px",
                              height: "25px",
                              background: "#ff6e20",
                              border: "2px solid #FF6B00",
                              padding: "2px",
                            }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* wfc — width: fit-content, padding: 15px 23px, letter-spacing: 1px */}
                    <Link
                      href="/our-astrologers"
                      className="mt-4 mb-4 inline-block no-underline bg-orange text-white font-bold rounded-full hover:opacity-90 active:scale-95 transition-all"
                      style={{
                        width: "fit-content",
                        padding: "15px 23px",
                        letterSpacing: "1px",
                      }}
                    >
                      {t.hero.startConsultationBtn}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right col — col-lg-5 */}
              <div className="w-full lg:w-[42%] overflow-visible">
                {/* right-illus */}
                <div className="relative h-[400px] overflow-visible">
                  {/* Astrologer-img-h wrapper — positioned div for width/left, spin on the image */}
                  <div
                    className="absolute"
                    style={{ width: "90%", left: "10%", top: "-160px", bottom: 0, zIndex: 5 }}
                  >
                    <Image
                      src="/images/Astrologer-h.png"
                      alt="Astrologer background"
                      fill
                      unoptimized
                      className="animate-[spin_30s_linear_infinite] object-contain scale-[1.0]"
                      style={{ transformOrigin: "center center" }}
                    />
                  </div>
                  {/* Astrologer-img → z-index 6 */}
                  <Image
                    src="/images/Astrologer.png"
                    alt="Astrologer"
                    fill
                    unoptimized
                    priority
                    className="object-contain scale-[1.4] origin-bottom translate-y-16 -translate-x-2 pointer-events-none"
                    style={{ zIndex: 6 }}
                  />
                </div>
              </div>

            </div>
          </div>

          <Featured4Cards />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
