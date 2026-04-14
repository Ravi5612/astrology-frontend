"use client";

import React, { useState, useMemo } from "react";
import { StoreCard } from "./StoreCard";
import { Store as StoreIcon, Sparkles, ChevronLeft, ChevronRight, Search, ChevronDown, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useAllMerchants } from "@/hooks/useAllMerchants";
import { useMerchantCities } from "@/hooks/useMerchantCities";
import { useDebounce } from "@/hooks/useDebounce";
import { useLanguageStore } from "@/store/languageStore";
import { homeTranslations } from "@/lib/translations/home";

import "swiper/css";
import "swiper/css/navigation";

const StoreCardSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-100"></div>
        <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="space-y-2 pt-4">
               <div className="h-10 bg-gray-100 rounded-2xl w-full"></div>
            </div>
        </div>
    </div>
);

const StoreSection = () => {
    const { lang } = useLanguageStore();
    const translationSet = (homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en) as any;
    const t = translationSet.storeSection;
    const fontStyle = lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {};

    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCity, setSelectedCity] = useState(t.allCities);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Debounce search to avoid too many API calls
    const debouncedSearch = useDebounce(searchQuery, 500);

    // Fetch cities from backend
    const { data: citiesData = [] } = useMerchantCities();
    const cities = useMemo(() => [t.allCities, ...(Array.isArray(citiesData) ? citiesData : [])], [citiesData, t.allCities]);

    // Update selected city if language changes and it was 'All Cities'
    React.useEffect(() => {
        if (selectedCity === "All Cities" || selectedCity === "सभी शहर") {
            setSelectedCity(t.allCities);
        }
    }, [lang, t.allCities]);

    // Fetch filtered merchants from backend
    const { 
        data: stores = [], 
        isLoading: isStoresLoading,
        isFetching: isStoresFetching 
    } = useAllMerchants({
        search: debouncedSearch,
        city: (selectedCity === t.allCities || selectedCity === "All Cities" || selectedCity === "सभी शहर") ? undefined : selectedCity,
        limit: 10
    });

    React.useEffect(() => {
        // StoreSection initialization logic if needed
    }, []);

    return (
        <section
            className="py-[80px] relative overflow-hidden font-outfit"
            style={{
                backgroundColor: "#301118",
                backgroundImage: "url(/images/bg-dark.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
                <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 shadow-sm">
                            <Sparkles className="w-4 h-4 text-orange animate-pulse" />
                            <span className="text-[11px] font-black text-orange-400 uppercase tracking-[0.2em] leading-none" style={fontStyle}>{t.badge}</span>
                        </div>

                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight" style={fontStyle}>
                                {t.title}
                            </h2>
                            <div className="w-48 h-1 bg-orange-600"></div>
                        </div>

                        <p className="text-gray-400 font-bold text-sm italic max-w-2xl" style={fontStyle}>
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0 relative z-50">
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-64">
                            {isStoresFetching ? (
                                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500 animate-spin" />
                            ) : (
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500/50" />
                            )}
                            <input 
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 text-white rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-sm placeholder:text-gray-500"
                                style={fontStyle}
                            />
                        </div>

                        {/* City Dropdown */}
                        <div className="relative w-full sm:w-56">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-black/40 border border-white/10 rounded-2xl focus:ring-2 focus:ring-orange-500/20 outline-none text-sm font-bold text-gray-300 transition-all hover:border-white/20"
                                style={fontStyle}
                            >
                                <span className="truncate pr-2">{selectedCity}</span>
                                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} />
                            </button>
                            
                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                    <div className="absolute top-[calc(100%+8px)] right-0 w-full md:w-64 bg-[#301118] border border-white/10 rounded-2xl shadow-2xl py-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200 z-50 backdrop-blur-xl">
                                        {cities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() => {
                                                    setSelectedCity(city);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-600 hover:text-white transition-colors ${selectedCity === city ? 'text-orange-500 bg-black/20 font-bold' : 'text-gray-400 font-medium'}`}
                                                style={fontStyle}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="relative group px-4 md:px-12">
                    {isStoresLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
                            {[1, 2, 3].map((i) => <StoreCardSkeleton key={i} />)}
                        </div>
                    ) : stores.length > 0 ? (
                        <Swiper
                            onSwiper={setSwiperInstance}
                            modules={[Navigation, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            speed={800}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            navigation={{
                                nextEl: ".store-next",
                                prevEl: ".store-prev",
                            }}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 24 },
                                1024: { slidesPerView: 3, spaceBetween: 30 },
                                1280: { slidesPerView: 3, spaceBetween: 40 },
                            }}
                            className="py-10 !pb-14"
                        >
                            {stores.map((store) => (
                                <SwiperSlide key={store.id || (store as any)._id} className="h-auto">
                                    <StoreCard store={store} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center py-24 bg-black/20 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-md">
                            <StoreIcon className="w-16 h-16 text-orange-500/30 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight" style={fontStyle}>{t.noResults}</h3>
                            <p className="text-gray-500 font-medium" style={fontStyle}>{t.noResultsDesc}</p>
                            <button 
                                onClick={() => { setSearchQuery(""); setSelectedCity(t.allCities); }}
                                className="mt-8 text-orange-500 font-black uppercase text-[10px] tracking-widest hover:text-orange-400 transition-colors"
                                style={fontStyle}
                            >
                                {t.btnClear}
                            </button>
                        </div>
                    )}

                    {stores.length > 0 && !isStoresLoading && (
                        <>
                            {/* Navigation Buttons */}
                            <button className="store-prev absolute top-1/2 -translate-y-1/2 -left-2 md:-left-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-orange hover:bg-orange hover:text-white transition-all duration-300 z-20 active:scale-90 group-hover:scale-110">
                                <ChevronLeft className="w-5 h-5 stroke-[3]" />
                            </button>
                            <button className="store-next absolute top-1/2 -translate-y-1/2 -right-2 md:-right-2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-orange hover:bg-orange hover:text-white transition-all duration-300 z-20 active:scale-90 group-hover:scale-110">
                                <ChevronRight className="w-5 h-5 stroke-[3]" />
                            </button>
                        </>
                    )}
                </div>

                <div className="mt-10 text-center">
                    <button 
                        className="inline-flex items-center gap-4 px-12 py-5 bg-white border-2 border-slate-900 text-slate-900 rounded-[2rem] font-black text-[12px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-xl shadow-slate-100 hover:shadow-2xl"
                        style={fontStyle}
                    >
                        <StoreIcon className="w-5 h-5" />
                        <span>{t.btnDiscoverAll}</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StoreSection;
