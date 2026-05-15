"use client";

import React, { useEffect, useState } from "react";
import { fetchPlaces, Place } from "@/libs/serp-api";
import PlaceCard from "@/components/features/famous-places/PlaceCard";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";
import { useLanguageStore } from "@repo/store";
import { famousPlacesTranslations } from "@/lib/famous-places-translations";

const FamousPlacesPage = () => {
  const { lang, toggleLang } = useLanguageStore();
  const t = famousPlacesTranslations[lang as keyof typeof famousPlacesTranslations] || famousPlacesTranslations.en;

  const [temples, setTemples] = useState<Place[]>([]);
  const [pilgrimages, setPilgrimages] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Section-Specific Search State
  const [templeSearchQuery, setTempleSearchQuery] = useState("");
  const [isSearchingTemples, setIsSearchingTemples] = useState(false);
  const [pilgrimageSearchQuery, setPilgrimageSearchQuery] = useState("");
  const [isSearchingPilgrimages, setIsSearchingPilgrimages] = useState(false);

  const handleTempleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = templeSearchQuery.trim();
    if (!query) {
      try {
        setLoading(true);
        const res = await fetchPlaces("Best Temples in Mohali and Chandigarh", "Mohali, Punjab, India");
        setTemples(res);
      } catch (err) {
        console.error("Failed to reload default temples:", err);
      } finally {
        setLoading(false);
      }
      return;
    }

    setIsSearchingTemples(true);
    try {
      const semanticQuery = query.toLowerCase().includes("temple") ? query : `${query} temples`;
      const results = await fetchPlaces(semanticQuery, "Mohali, Punjab, India");
      setTemples(results);
    } catch (err) {
      console.error("Temple search failed", err);
    } finally {
      setIsSearchingTemples(false);
    }
  };

  const handlePilgrimageSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = pilgrimageSearchQuery.trim();
    if (!query) {
      try {
        setLoading(true);
        const res = await fetchPlaces("Famous Holy Pilgrimage sites in India", "India");
        setPilgrimages(res);
      } catch (err) {
        console.error("Failed to reload pilgrimages:", err);
      } finally {
        setLoading(false);
      }
      return;
    }

    setIsSearchingPilgrimages(true);
    try {
      const semanticQuery = query.toLowerCase().includes("pilgrimage") || query.toLowerCase().includes("temple") ? query : `${query} pilgrimage sites`;
      const results = await fetchPlaces(semanticQuery, "India");
      setPilgrimages(results);
    } catch (err) {
      console.error("Pilgrimage search failed", err);
    } finally {
      setIsSearchingPilgrimages(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const semanticQuery = searchQuery.toLowerCase().includes("temple") || searchQuery.toLowerCase().includes("place") ? searchQuery : `${searchQuery} famous places`;
      const results = await fetchPlaces(semanticQuery, "India");
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  };

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

  const isFirstMountTemple = React.useRef(true);
  useEffect(() => {
    if (isFirstMountTemple.current) {
      isFirstMountTemple.current = false;
      return;
    }
    const timer = setTimeout(() => {
      handleTempleSearch();
    }, 600);
    return () => clearTimeout(timer);
  }, [templeSearchQuery]);

  const isFirstMountPilgrim = React.useRef(true);
  useEffect(() => {
    if (isFirstMountPilgrim.current) {
      isFirstMountPilgrim.current = false;
      return;
    }
    const timer = setTimeout(() => {
      handlePilgrimageSearch();
    }, 600);
    return () => clearTimeout(timer);
  }, [pilgrimageSearchQuery]);

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
        {/* Search Results Section - Conditional */}
        {searchResults.length > 0 && (
          <section
            id="search-results"
            className="relative p-8 md:p-12 rounded-[40px] overflow-hidden bg-white shadow-2xl border border-orange/10 scroll-mt-20"
          >
            {/* Soft Glow Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20 text-orange text-[10px] font-bold uppercase tracking-widest mb-4">
                    {searchResults.length} {t.verifiedSites}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-brown mb-4">
                    {t.searchResultsTitle} <span className="text-orange">{t.searchResultsHighlight}</span>
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed font-body">
                    {t.searchResultsDesc}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSearchResults([]);
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-orange transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                  <i className="fa-solid fa-xmark"></i> Clear Results
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {searchResults.map((place, idx) => (
                  <PlaceCard key={place.id || `search-${idx}`} place={place} />
                ))}
              </div>
            </div>
          </section>
        )}

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
                  {templeSearchQuery.trim() ? (
                    <>Search results for <span className="text-orange">"{templeSearchQuery}"</span></>
                  ) : (
                    <>{t.section1Title1} <span className="text-orange">{t.section1Highlight}</span></>
                  )}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-body">
                  {t.section1Desc}
                </p>
              </div>
              
              {/* Inline Search Bar - Mohali Section */}
              <div className="flex-1 max-w-sm md:mx-8 mb-4">
                <form 
                  onSubmit={handleTempleSearch}
                  className="relative group w-full"
                >
                  <div className="absolute inset-0 bg-white rounded-2xl border-2 border-transparent group-focus-within:border-orange transition-all duration-300 shadow-2xl group-focus-within:shadow-orange/30"></div>
                  <div className="relative h-14 flex items-center px-2 gap-3">
                    <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center bg-orange/10 rounded-xl ml-1 text-orange transition-transform group-focus-within:scale-105">
                      <i className={`fa-solid ${isSearchingTemples ? 'fa-spinner fa-spin' : 'fa-magnifying-glass'}`}></i>
                    </div>
                    <input
                      type="text"
                      placeholder={t.section1SearchPlaceholder as string}
                      value={templeSearchQuery}
                      onChange={(e) => setTempleSearchQuery(e.target.value)}
                      className="flex-1 w-full bg-transparent border-none outline-none text-brown placeholder:text-gray-400 text-sm font-bold tracking-wide"
                    />
                    {templeSearchQuery && (
                      <button 
                        type="button"
                        onClick={async () => {
                          setTempleSearchQuery("");
                          setLoading(true);
                          const res = await fetchPlaces("Best Temples in Mohali and Chandigarh", "Mohali, Punjab, India");
                          setTemples(res);
                          setLoading(false);
                        }}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-orange hover:bg-orange/10 rounded-full transition-colors mr-1"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {loading ? (
              <Skeleton />
            ) : temples.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {temples.map((place, idx) => (
                  <PlaceCard key={place.id || `temple-${idx}`} place={place} />
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
                  {pilgrimageSearchQuery.trim() ? (
                    <>Search results for <span className="text-orange">"{pilgrimageSearchQuery}"</span></>
                  ) : (
                    <>{t.section2Title1} <span className="text-orange">{t.section2Highlight}</span></>
                  )}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed font-body">
                  {t.section2Desc}
                </p>
              </div>
              
              {/* Inline Search Bar - Pilgrimage Section */}
              <div className="flex-1 max-w-sm md:mx-8 mb-4">
                <form 
                  onSubmit={handlePilgrimageSearch}
                  className="relative group w-full"
                >
                  <div className="absolute inset-0 bg-white rounded-2xl border-2 border-transparent group-focus-within:border-orange transition-all duration-300 shadow-2xl group-focus-within:shadow-orange/30"></div>
                  <div className="relative h-14 flex items-center px-2 gap-3">
                    <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center bg-orange/10 rounded-xl ml-1 text-orange transition-transform group-focus-within:scale-105">
                      <i className={`fa-solid ${isSearchingPilgrimages ? 'fa-spinner fa-spin' : 'fa-magnifying-glass'}`}></i>
                    </div>
                    <input
                      type="text"
                      placeholder={t.sectionSearchPlaceholder as string}
                      value={pilgrimageSearchQuery}
                      onChange={(e) => setPilgrimageSearchQuery(e.target.value)}
                      className="flex-1 w-full bg-transparent border-none outline-none text-brown placeholder:text-gray-400 text-sm font-bold tracking-wide"
                    />
                    {pilgrimageSearchQuery && (
                      <button 
                        type="button"
                        onClick={async () => {
                          setPilgrimageSearchQuery("");
                          setLoading(true);
                          const res = await fetchPlaces("Famous Holy Pilgrimage sites in India", "India");
                          setPilgrimages(res);
                          setLoading(false);
                        }}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-orange hover:bg-orange/10 rounded-full transition-colors mr-1"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {loading ? (
              <Skeleton />
            ) : pilgrimages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {pilgrimages.map((place, idx) => (
                  <PlaceCard key={place.id || `pilgrim-${idx}`} place={place} />
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


