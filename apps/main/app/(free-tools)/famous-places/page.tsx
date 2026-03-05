"use client";

import React, { useEffect, useState } from "react";
import { fetchPlaces, Place } from "@/libs/serp-api";
import PlaceCard from "@/components/features/famous-places/PlaceCard";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";
import { useLanguageStore } from "@/store/languageStore";
import { famousPlacesTranslations } from "@/lib/famous-places-translations";

const FamousPlacesPage = () => {
  const { lang, toggleLang } = useLanguageStore();
  const t = famousPlacesTranslations[lang as keyof typeof famousPlacesTranslations] || famousPlacesTranslations.en;

  const [temples, setTemples] = useState<Place[]>([]);
  const [pilgrimages, setPilgrimages] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [mohaliTemples, indianPilgrimages] = await Promise.all([
          fetchPlaces("Best Temples in Mohali and Chandigarh", "Mohali, Punjab, India"),
          fetchPlaces("Famous Holy Pilgrimage sites in India", "India")
        ]);

        setTemples(mohaliTemples);
        setPilgrimages(indianPilgrimages);
      } catch (err) {
        console.error("Failed to fetch places", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const Skeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-border-light"
        >
          <div className="h-56 bg-gray-200"></div>
          <div className="p-5">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Hero Header - Premium Spiritual Design */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-brown text-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange rounded-full blur-[100px]"></div>
        </div>

        {/* Language Switcher — top right inside hero */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
            title={t.switchLangLabel}
          >
            <span className="text-base">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
            {t.switchLang}
          </button>
        </div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            {t.badge}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 tracking-tight text-white leading-tight">
            {t.heroTitle1} <br />
            <span className="text-orange drop-shadow-sm">{t.heroHighlight}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed mb-10">
            {t.heroDesc}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-semibold flex items-center gap-2">
              <i className="fa-solid fa-om text-orange"></i> {t.verifiedSites}
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-semibold flex items-center gap-2">
              <i className="fa-solid fa-map-location-dot text-orange"></i> {t.localInsights}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-20 px-4 space-y-32">
        {/* Mohali/Chandigarh Temples Section */}
        <section
          className="relative p-8 md:p-12 rounded-[40px] overflow-hidden bg-brown/95 shadow-2xl border border-white/5"
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/images/white-background.png')", backgroundSize: 'cover' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brown via-brown/80 to-black/40"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  {t.section1Title1} <span className="text-orange">{t.section1Highlight}</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-body">
                  {t.section1Desc}
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gray-100 mx-8 mb-4"></div>
            </div>

            {loading ? (
              <Skeleton />
            ) : temples.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {temples.map((place, idx) => (
                  <PlaceCard key={idx} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i className="fa-solid fa-om text-gray-300 text-2xl"></i>
                </div>
                <p className="text-gray-500 font-medium">
                  {t.noResults}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Holy Pilgrimage Section */}
        <section
          className="relative p-8 md:p-12 rounded-[40px] overflow-hidden bg-brown/95 shadow-2xl border border-white/5"
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/images/white-background.png')", backgroundSize: 'cover' }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brown via-brown/80 to-black/40"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  {t.section2Title1} <span className="text-orange">{t.section2Highlight}</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-body">
                  {t.section2Desc}
                </p>
              </div>
              <div className="hidden md:block h-px flex-1 bg-gray-100 mx-8 mb-4"></div>
            </div>

            {loading ? (
              <Skeleton />
            ) : pilgrimages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {pilgrimages.map((place, idx) => (
                  <PlaceCard key={idx} place={place} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i className="fa-solid fa-map-location-dot text-gray-300 text-2xl"></i>
                </div>
                <p className="text-gray-500 font-medium">
                  {t.loadingText}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <WhyChooseUs />
      <CTA />
    </div>
  );
};

export default FamousPlacesPage;


