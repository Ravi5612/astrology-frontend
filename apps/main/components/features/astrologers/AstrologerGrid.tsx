"use client";

import React from "react";
import AstrologerCard from "./AstrologerCard";
import { SkeletonCard } from "./SkeletonCard";
import { ClientExpertProfile } from "@/lib/types";

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
    <div className="mt-4">
      <div className="row g-4 justify-content-center">
        {astrologers.length > 0 ? (
          astrologers.map((item) => (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
              <AstrologerCard astrologerData={item} />
            </div>
          ))
        ) : !loading && initialError ? (
          <div className="col-12 text-center py-10">
            <p className="text-red-500 font-semibold mb-2 text-white">
              {lang === "hi"
                ? "ज्योतिषियों को लोड करने में विफल"
                : "Failed to load experts"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-full text-sm"
            >
              {lang === "hi" ? "पुन: प्रयास करें" : "Retry"}
            </button>
          </div>
        ) : !loading && astrologers.length === 0 ? (
          <div className="col-12 text-center py-10">
            <p className="text-gray-500 font-medium">No results found.</p>
          </div>
        ) : (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="col-xl-3 col-lg-4 col-md-6">
              <SkeletonCard />
            </div>
          ))
        )}
      </div>

      {loading && astrologers.length > 0 && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center mt-8 mb-8">
          <button
            onClick={handleLoadMore}
            className="bg-white border border-orange text-orange px-8 py-2.5 rounded-full font-bold hover:bg-orange hover:text-white transition-all duration-300 shadow-md mx-auto"
          >
            {t.astrologerSection.loadMore}
          </button>
        </div>
      )}
    </div>
  );
};

export default AstrologerGrid;
