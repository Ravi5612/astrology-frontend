"use client";

import React, { useState, useEffect } from "react";
import NextLink from "next/link";
const Link = NextLink as any;
import { Loader2 } from "lucide-react";
import http from "@/lib/fetch-handler";
import { API_ROUTES } from "@/lib/api-routes";
import { ExpertPuja } from "@/lib/types/puja";
import { PujaCard } from "./PujaCard";
import { useLanguageStore } from "@/store/languageStore";
import { Swiper as SwiperComp, SwiperSlide as SwiperSlideComp } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Swiper = SwiperComp as any;
const SwiperSlide = SwiperSlideComp as any;

const PujaListSection = () => {
    const { lang } = useLanguageStore();
    const [pujas, setPujas] = useState<ExpertPuja[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPujasItems = async () => {
            setLoading(true);
            const [res, error] = await http.get<ExpertPuja[]>(API_ROUTES.EXPERT.GET_ALL_PUJAS);
            
            if (error) {
                console.error("Failed to fetch pujas:", error);
                setPujas([]);
            } else {
                // Determine how many pujas to show on the front page, e.g., tops 6
                setPujas(res ? res.slice(0, 6) : []);
            }
            setLoading(false);
        };
        fetchPujasItems();
    }, []);

    return (
        <section
            className="py-[50px] relative overflow-hidden"
            style={{
                backgroundColor: "#301118",
                backgroundImage: "url(/images/bg-dark.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 lg:px-16">
                <div className="relative mb-10 flex flex-col md:flex-row items-center justify-between">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Book Sacred Pujas
                        </h2>
                        <div className="w-48 h-1 bg-orange-600"></div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                        <p className="text-orange-200/40 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Loading Pujas</p>
                    </div>
                ) : pujas.length === 0 ? (
                    <div className="text-center py-20 bg-black/20 rounded-3xl border border-white/5 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">No Pujas Available</h2>
                        <p className="text-gray-500">Please check back later.</p>
                    </div>
                ) : (
                    <div className="relative puja-swiper-wrapper mt-4 md:px-12 mb-8">
                      <Swiper
                        modules={[Navigation, Autoplay]}
                        speed={800}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                          nextEl: ".puja-next",
                          prevEl: ".puja-prev",
                        }}
                        breakpoints={{
                          480: { slidesPerView: 1.2, spaceBetween: 15 },
                          640: { slidesPerView: 2, spaceBetween: 20 },
                          992: { slidesPerView: 3, spaceBetween: 20 },
                          1200: { slidesPerView: 3, spaceBetween: 24 },
                        }}
                        className="py-4 !pb-8"
                      >
                        {pujas.map((puja) => (
                           <SwiperSlide key={puja.id} className="h-auto">
                               <PujaCard puja={puja} />
                           </SwiperSlide>
                        ))}
                      </Swiper>
                      
                      <button className="puja-prev absolute top-1/2 -translate-y-1/2 left-0 w-10 h-10 hidden md:flex items-center justify-center text-orange-600 bg-white shadow-lg rounded-full hover:scale-110 transition cursor-pointer z-10 p-0 border-0">
                        <i className="fa-solid fa-chevron-left fa-lg"></i>
                      </button>
                      <button className="puja-next absolute top-1/2 -translate-y-1/2 right-0 w-10 h-10 hidden md:flex items-center justify-center text-orange-600 bg-white shadow-lg rounded-full hover:scale-110 transition cursor-pointer z-10 p-0 border-0">
                        <i className="fa-solid fa-chevron-right fa-lg"></i>
                      </button>
                    </div>
                )}

                {!loading && pujas.length > 0 && (
                    <div className="view-all mt-8 text-center">
                        <Link
                            href="/online-puja"
                            className="no-underline bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition-all mx-auto flex items-center justify-center gap-2 w-fit active:scale-95 shadow-orange-900/40 hover:translate-y-[-2px]"
                        >
                            <i className="fa-solid fa-om text-lg"></i>
                            View All Sacred Rituals
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PujaListSection;
