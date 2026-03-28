"use client";

import React from "react";
import AstrologerCard from "./AstrologerCard";
import { SkeletonCard } from "./SkeletonCard";
import { ClientExpertProfile } from "@/lib/types";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

interface AstrologerGridProps {
  astrologers: ClientExpertProfile[];
  loading: boolean;
  hasMore: boolean;
  initialError?: string;
  lang: string;
  t: any;
  handleLoadMore: () => void;
}

const AstrologerGrid: React.FC<AstrologerGridProps> = ({
  astrologers,
  loading,
  hasMore,
  initialError,
  lang,
  t,
  handleLoadMore,
}) => {
  return (
    <div className="mt-12 w-full">
      {/* Dynamic Grid System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {astrologers.length > 0 ? (
          astrologers.map((item, idx) => (
            <div 
              key={item.id} 
              className="w-full animate-in fade-in slide-in-from-bottom-6 duration-700"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <AstrologerCard astrologerData={item} />
            </div>
          ))
        ) : !loading && initialError ? (
          <div className="col-span-full text-center py-24 bg-red-50/50 rounded-[3rem] border border-red-100/50 backdrop-blur-sm">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 shadow-inner">
               <i className="fa-solid fa-circle-exclamation text-3xl"></i>
            </div>
            <p className="text-xl font-black text-red-950 uppercase tracking-tight mb-6">
              {lang === "hi"
                ? "ज्योतिषियों को लोड करने में विफल"
                : "Failed to load experts"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="group relative px-10 py-4 bg-red-600 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-orange transition-all duration-500 active:scale-95"
            >
              {lang === "hi" ? "पुन: प्रयास करें" : "Retry Analysis"}
            </button>
          </div>
        ) : !loading && astrologers.length === 0 ? (
          <div className="col-span-full text-center py-32 bg-slate-50 rounded-[4rem] border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-sm">
               <i className="fa-solid fa-user-slash text-4xl"></i>
            </div>
            <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2">No experts found</h4>
            <p className="text-slate-400 font-bold italic">Adjust your filters or search criteria.</p>
          </div>
        ) : (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-full h-full opacity-60">
              <SkeletonCard />
            </div>
          ))
        )}
      </div>

      {/* Loading Spinner for Infinite Scroll */}
      {loading && astrologers.length > 0 && (
        <div className="flex justify-center items-center py-16">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
             <div className="relative flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg">
                <FaSpinner className="animate-spin text-primary" />
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Gathering More Profiles</span>
             </div>
          </div>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-16 mb-24 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent -z-10"></div>
          <button
            onClick={handleLoadMore}
            className="group relative px-12 py-6 bg-white border border-slate-200 text-slate-900 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-premium hover:shadow-2xl hover:bg-slate-950 hover:text-white hover:-translate-y-1 active:scale-95 transition-all duration-500"
          >
            <div className="flex items-center gap-4">
               <HiOutlineSparkles className="text-orange shadow-orange/30 shadow-2xl" />
               <span>{t.astrologerSection.loadMore}</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default AstrologerGrid;
