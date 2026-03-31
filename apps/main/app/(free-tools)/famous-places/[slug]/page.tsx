"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchPlaceImages, getPlaceBySlug } from "@/libs/serp-api";
import { Place } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { famousPlacesTranslations } from "@/lib/famous-places-translations";

const PlaceDetailPage = () => {
  const { lang, toggleLang } = useLanguageStore();
  const t = famousPlacesTranslations[lang as keyof typeof famousPlacesTranslations] || famousPlacesTranslations.en;

  const { slug } = useParams();
  const [place, setPlace] = useState<Place | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getPlaceBySlug(slug as string);
      
      if (!data) {
        setLoading(false);
        return;
      }

      setPlace(data);

      const imgs = await fetchPlaceImages(data.title);
      setImages(imgs);
      setLoading(false);
    };

    if (slug) {
      loadData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center p-6 bg-white rounded-lg border border-slate-200 max-w-sm">
          <h2 className="text-base font-bold text-brown mb-1">{t.detail.notFound}</h2>
          <Link
            href="/famous-places"
            className="text-xs font-bold text-orange"
          >
            {t.detail.returnDirectory}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* 1. Full-Width Hero Section */}
      <section className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden bg-brown">
        {images.length > 0 ? (
          images.map((img, idx) => (
            <Image
              key={img}
              src={img}
              alt={`${place.title} view ${idx + 1}`}
              fill
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={idx === 0}
            />
          ))
        ) : (
          <Image
            src={place.thumbnailUrl ? place.thumbnailUrl : "/images/image-not-found.png"}
            alt={place.title}
            fill
            className="w-full h-full object-cover"
            priority
          />
        )}
        {/* Dark Overlays for Text Legibility */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

        {/* Navigation Over Hero */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              href="/famous-places"
              className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2 no-underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t.detail.directory}
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
                title={t.switchLangLabel}
              >
                <span className="text-sm">{lang === "en" ? "🇮🇳" : "🇬🇧"}</span>
                {t.switchLang}
              </button>

              <div className="px-4 py-2 rounded-md bg-orange/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-widest shadow-lg">
                {place.category || t.card.sacredSite}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Title Container */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-block bg-black/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 opacity-100">
                <div className="flex items-center text-orange bg-orange/10 px-3 py-1.5 rounded-full border border-orange/20">
                  <svg className="w-4 h-4 fill-current drop-shadow-md" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[13px] font-black ml-1.5 text-white">
                    {place.rating || "4.8"}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                  {t.detail.verifiedSite}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight tracking-tight text-white drop-shadow-xl">
                {place.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Details Section */}
      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="flex-1 space-y-12">
            {/* Address Block - Prominent yet compact */}
            <div className="inline-flex items-start gap-3.5 p-4 bg-white rounded-xl border border-slate-200/60 shadow-sm w-full max-w-2xl">
              <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="pr-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  {t.detail.location}
                </span>
                <p className="text-[13px] text-brown leading-relaxed font-semibold">
                  {place.address || t.card.noAddress}
                </p>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {t.detail.visuals}
                </span>
                <div className="flex-1 h-px bg-slate-100"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {images.slice(1).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm"
                  >
                    <Image
                      src={img}
                      alt={`${place.title} visual ${i + 1}`}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Significance Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-orange uppercase tracking-widest">
                  {t.detail.heritage}
                </span>
                <div className="flex-1 h-px bg-slate-100"></div>
              </div>
              <div className="grid md:grid-cols-5 gap-6">
                <div className="md:col-span-3">
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    {t.detail.descriptionTemplate.replace("{title}", place.title)}
                  </p>
                </div>
                <div className="md:col-span-2 bg-slate-50/50 rounded-lg p-5 border border-slate-100/50">
                  <div className="space-y-3">
                    {t.detail.guidelines.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-[11px] font-bold text-[#301118]/70"
                      >
                        <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Integrated & Sticky */}
          <div className="w-full md:w-80 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Timing Card */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
                <div className="bg-brown px-6 py-3.5 flex justify-between items-center text-white">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest">
                    {t.detail.planTitle}
                  </h4>
                  <svg
                    className="w-3 h-3 text-orange"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-3.5 pb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        {t.detail.timings}
                      </span>
                      <span className="text-[12px] font-bold text-brown">
                        05:00 - 21:00
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        {t.detail.aarti}
                      </span>
                      <span className="text-[12px] font-bold text-brown">
                        06:30 & 19:30
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        {t.detail.fee}
                      </span>
                      <span className="text-[12px] font-bold text-green-600">
                        {t.detail.free}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + " " + place.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-orange hover:bg-brown text-white py-3 rounded-xl font-bold text-[11px] text-center no-underline transition-all uppercase tracking-widest"
                  >
                    {t.detail.directions}
                  </a>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-[#FFF9F5] p-6 rounded-2xl border border-primary/10 border-dashed">
                <h4 className="text-[10px] font-bold text-brown uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  {t.detail.needGuidance}
                </h4>
                <p className="text-[12px] text-slate-500 mb-5 leading-relaxed">
                  {t.detail.supportDesc}
                </p>
                <button className="w-full bg-white border border-brown text-brown hover:bg-brown hover:text-white py-2.5 rounded-lg font-bold text-[11px] transition-all uppercase tracking-widest">
                  {t.detail.consultNow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceDetailPage;
