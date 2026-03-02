"use client";

import React, { useEffect, useState } from "react";
import { fetchPlaces, Place } from "@/libs/serp-api";
import PlaceCard from "@/components/features/famous-places/PlaceCard";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";

const FamousPlacesPage = () => {
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

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            <span className="text-lg leading-none">ॐ</span> Spiritual Guide & Local Directory
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 tracking-tight text-white leading-tight">
            Divine Destinations & <br />
            <span className="text-orange drop-shadow-sm">Famous Places</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-body leading-relaxed mb-10">
            Unlock the spiritual energy of Bharat. Explore sacred temples in
            Mohali and Chandigarh, or embark on a life-changing pilgrimage
            across the holiest sites in India.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-semibold flex items-center gap-2">
              <i className="fa-solid fa-om text-orange"></i> Verified Sites
            </div>
            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-semibold flex items-center gap-2">
              <i className="fa-solid fa-map-location-dot text-orange"></i> Local Insights
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
                  Sacred Temples in <span className="text-orange">Mohali & Chandigarh</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-body">
                  Discover peace and tranquility in the finest local temples, known
                  for their architectural beauty and spiritual significance.
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
                  No divine results found at the moment. Please try again.
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
                  Holy Pilgrimage <span className="text-orange">Across India</span>
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-body">
                  Explore the widely revered pilgrimage sites that define
                  India&apos;s rich spiritual heritage and tradition.
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
                  Exploring India&apos;s pilgrimage sites... please check back shortly.
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


