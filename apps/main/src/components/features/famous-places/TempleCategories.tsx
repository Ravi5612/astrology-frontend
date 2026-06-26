"use client";

import React from "react";
import { TEMPLE_CATEGORIES } from "./constants";
import { Place } from "@/libs/serp-api";
import Image from "next/image";
interface TemplateCategoriesProps {
  activeCategory: string | null;
  loading: boolean;
  results: Place[];
  onSelect: (cat: typeof TEMPLE_CATEGORIES[number]) => void;
  onClear: () => void;
}

import PlaceCard from "./PlaceCard";

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow border border-gray-100">
    <div className="h-44 bg-gray-200" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const TempleCategories: React.FC<TemplateCategoriesProps> = ({
  activeCategory,
  loading,
  results,
  onSelect,
  onClear,
}) => (
  <section className="mt-14 mb-10 w-full relative rounded-2xl overflow-hidden shadow-sm border border-orange-50">
    {/* Background Banner */}
    <div className="absolute inset-0 z-0">
      <Image 
        src="/images/temple-categories-banner.png" 
        alt="Explore Temples Banner Background" 
        fill
        className="object-cover object-center"
      />
    </div>

    {/* Content on top of banner */}
    <div className="relative z-10 py-6 md:py-8 px-4">
      {/* Title */}
      <h2 className="text-xl md:text-[28px] font-serif font-black text-[#3D1A0B] mb-6 md:mb-8 text-center">
        Explore Temples by Categories
      </h2>

      {/* Category pills styled as circles */}
      <div className="flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-14">
        {TEMPLE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => onSelect(cat)}
              className="flex flex-col items-center gap-3 group transition-transform hover:-translate-y-1"
            >
              <div
                className={`w-[65px] h-[65px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center border transition-all ${
                  isActive
                    ? "border-orange-500 bg-white shadow-md scale-105"
                    : "border-orange-200 bg-white/70 hover:bg-white hover:border-orange-400 shadow-sm"
                }`}
              >
                <i className={`fa-solid ${cat.icon} text-[24px] md:text-[30px] ${isActive ? "text-orange-500" : "text-[#F26500]"}`} />
              </div>
              <span className={`text-[12px] md:text-[14px] font-bold ${isActive ? "text-orange-600" : "text-[#3D1A0B]"}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>

    {/* Category results */}
    {activeCategory && (
      <div className="px-4 md:px-8 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-black text-gray-900">
            {activeCategory} <span className="text-orange-500">Results</span>
          </h3>
          <button
            onClick={onClear}
            className="text-xs text-gray-400 hover:text-orange-500 font-medium flex items-center gap-1"
          >
            <i className="fa-solid fa-xmark" /> Clear
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {results.map((place, idx) => (
              <PlaceCard key={place.id || `cat-${idx}`} place={place} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm font-medium">No results found for this category.</p>
          </div>
        )}
      </div>
    )}
  </section>
);

export default TempleCategories;
