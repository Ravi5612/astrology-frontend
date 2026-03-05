"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NextImage from "next/image";
const Image = NextImage as any;
import NextLink from "next/link";
const Link = NextLink as any;
import {
  FaHeart as FaH,
  FaBriefcase as FaB,
  FaLeaf as FaL,
  FaPlane as FaP,
  FaStar as FaS,
  FaCalendarAlt as FaC,
  FaClock as FaCl,
  FaMapMarkerAlt as FaM,
} from "react-icons/fa";
const FaHeart = FaH as any;
const FaBriefcase = FaB as any;
const FaLeaf = FaL as any;
const FaPlane = FaP as any;
const FaStar = FaS as any;
const FaCalendarAlt = FaC as any;
const FaClock = FaCl as any;
const FaMapMarkerAlt = FaM as any;

import { HiOutlineSparkles as HiOs } from "react-icons/hi";
const HiOutlineSparkles = HiOs as any;

import { ZodiacSignsData } from "@/components/features/services/zodiac";
import CTA from "@/components/layout/main/CTA";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";

export default function ZodiacDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [horoscope, setHoroscope] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">("en");

  const signData = ZodiacSignsData.find(
    (s) => s.title.toLowerCase() === slug?.toLowerCase()
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/horoscope?sign=${slug}&lang=${lang}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        if (json.data && json.data.daily_predictions) {
          setHoroscope(json.data.daily_predictions[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug, lang]);

  const getIcon = (type: string) => {
    switch (type) {
      case "Health":
        return <FaLeaf className="text-green-500" />;
      case "Career":
        return <FaBriefcase className="text-blue-500" />;
      case "Love":
        return <FaHeart className="text-danger" />;
      default:
        return <FaPlane className="text-primary" />;
    }
  };

  const getPredictionCategory = (type: string) => {
    switch (type) {
      case "Health":
        return { label: "Health & Wellbeing", bg: "bg-green-50", border: "border-green-100/50" };
      case "Career":
        return { label: "Career & Finance", bg: "bg-blue-50", border: "border-blue-100/50" };
      case "Love":
        return { label: "Love & Relations", bg: "bg-danger/5", border: "border-danger/10" };
      default:
        return { label: type + " Forecast", bg: "bg-primary/5", border: "border-primary/10" };
    }
  };

  if (!signData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light p-6">
        <div className="text-center p-12 bg-white rounded-3xl shadow-premium border border-primary/10 max-w-lg">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            🔮
          </div>
          <h2 className="text-3xl font-black text-secondary leading-tight mb-4">
            Zodiac Sign <span className="text-primary italic">Not Found</span>
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            The destiny of this sign is still being written by the stars.
          </p>
          <Link href="/horoscope" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold no-underline transition-transform hover:scale-105">
            Back to Horoscopes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-wrapper bg-bg-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-secondary text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/15 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Language Switcher */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
          >
            <span className="text-base">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>

        <div className="container relative z-10">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="max-w-2xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-xs mb-6 border border-primary/30 tracking-widest uppercase">
                  {signData.date} • Daily Guide
                </span>
                <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
                  {signData.title} <span className="text-primary italic">Daily</span> Predictions
                </h1>
                <p className="text-lg text-white/70 mb-8 leading-relaxed font-medium">
                  {signData.title}, the stars are aligning for you today. Explore how planetary movements are influencing your personal and professional life with our expert Vedic analysis.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                  <span className="text-sm font-bold text-white/50 tracking-widest uppercase">Ancient Wisdom • Modern Guidance</span>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="relative group flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/30 transition-all duration-700"></div>
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <Image
                    src="/images/horoscope-round2.png"
                    alt="Zodiac Wheel"
                    fill
                    className="animate-[spin_40s_linear_infinite] opacity-30 object-contain p-4"
                  />
                  <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center p-8">
                    <Image
                      src={signData.image}
                      alt={signData.title}
                      width={280}
                      height={280}
                      className="object-contain drop-shadow-[0_0_40px_rgba(255,107,0,0.4)] transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Predictions */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="container">
          {loading ? (
            <div className="bg-white rounded-3xl p-20 text-center shadow-premium border border-primary/5">
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-8 shadow-sm"></div>
              <h3 className="text-2xl font-black text-secondary animate-pulse tracking-tight">
                Consulting the heavens for <span className="text-primary">{signData.title}</span>...
              </h3>
              <p className="text-gray-400 mt-2 font-medium italic">Wait for the cosmic alignment</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl p-20 text-center shadow-premium border border-danger/10">
              <div className="text-6x?l mb-6">✨</div>
              <h3 className="text-xl font-bold text-secondary mb-3">The stars are currently veiled</h3>
              <p className="text-gray-500 italic max-w-sm mx-auto">Our connection with the cosmic data is momentarily disrupted. Please check back soon.</p>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              <div className="col-lg-10">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-premium border border-primary/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <HiOutlineSparkles className="text-9xl text-primary" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10">
                        <Image
                          src={signData.image}
                          alt={signData.title}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-black text-secondary uppercase tracking-tight mb-1">
                          {signData.title} <span className="text-primary">Horoscope</span>
                        </h2>
                        <div className="flex items-center gap-3">
                          <p className="text-gray-500 text-sm font-bold m-0 tracking-widest uppercase">
                            {new Date().toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-secondary text-white px-5 py-2.5 rounded-full shadow-lg shadow-secondary/20">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-xs font-black tracking-widest uppercase">Live Forecast</span>
                    </div>
                  </div>

                  {/* Prediction Cards Grid */}
                  <div className="row g-4 mb-16">
                    {horoscope.predictions.map((p: any, idx: number) => {
                      const cat = getPredictionCategory(p.type);
                      return (
                        <div key={idx} className="col-md-6">
                          <div
                            className={`p-10 rounded-3xl border border-gray-100 hover:border-primary/20 h-100 transition-all duration-500 hover:shadow-premium group flex flex-col relative overflow-hidden`}
                          >
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.type === 'Love' ? 'from-danger' : p.type === 'Career' ? 'from-blue-500' : 'from-primary'} to-transparent opacity-30`}></div>

                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-md">
                              {getIcon(p.type)}
                            </div>

                            <h4 className="text-lg font-black text-secondary uppercase mb-4 tracking-tight flex items-center justify-between">
                              {cat.label}
                              <i className="fa-solid fa-chevron-right text-[10px] text-gray-200 group-hover:text-primary transition-colors"></i>
                            </h4>

                            <p className="text-gray-600 text-sm leading-relaxed mb-0 font-medium italic opacity-90 border-l-2 border-primary/10 pl-4 py-1">
                              "{p.prediction}"
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Cosmic Tip Section */}
                  <div className="relative rounded-[2.5rem] bg-secondary p-10 lg:p-14 shadow-2xl overflow-hidden group">
                    {/* Decorative background glow */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/30 transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                      <div className="lg:w-2/3">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full">Pro Tip</div>
                          <h3 className="text-3xl font-black text-white mb-0 tracking-tight">Today's Spiritual <span className="text-primary italic">Alignment</span></h3>
                        </div>
                        <p className="text-white/70 text-lg lg:text-xl font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                          "Patience will be your greatest ally. The cosmic energies favor thoughtful decisions. Wear colors that resonate with your spirit and meditate for 10 minutes to align your energy with the universe."
                        </p>
                      </div>

                      <div className="lg:w-1/3 w-full">
                        <Link href="/our-astrologers" className="block w-full text-center bg-white hover:bg-primary text-secondary hover:text-white px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-widest no-underline transition-all shadow-xl hover:-translate-y-1">
                          Consult Astrologer
                          <i className="fa-solid fa-arrow-right ml-3"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation for other Signs */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-secondary uppercase tracking-tighter mb-4">
              Explore Our <span className="text-primary italic">Zodiac</span> Constellations
            </h2>
            <div className="w-20 h-1.5 bg-primary/20 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
            {ZodiacSignsData.map((sign) => (
              <Link
                key={sign.id}
                href={`/horoscope/${sign.title.toLowerCase()}`}
                className={`p-4 rounded-[2rem] text-center border transition-all duration-500 no-underline flex flex-col items-center justify-center group ${slug?.toLowerCase() === sign.title.toLowerCase()
                  ? "border-primary bg-primary/5 shadow-premium scale-110 relative z-10"
                  : "border-gray-50 hover:border-primary/20 hover:bg-primary/5 hover:-translate-y-2"
                  }`}
              >
                <div className="relative w-12 h-12 mb-3">
                  <Image
                    src={sign.image}
                    alt={sign.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                  />
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest ${slug?.toLowerCase() === sign.title.toLowerCase() ? "text-primary" : "text-secondary opacity-60 group-hover:opacity-100"}`}
                >
                  {sign.title}
                </span>

                {slug?.toLowerCase() === sign.title.toLowerCase() && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </div>
  );
}
