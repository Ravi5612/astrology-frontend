"use client";

import React from "react";
import NextLink from "next/link";
const Link = NextLink as any;
import { useLanguageStore } from "../../../store/languageStore";
import { homeTranslations } from "../../../lib/translations/home";
import ExpertListHeader from "./ExpertListHeader";
import ExpertFilterModal from "./ExpertFilterModal";
import ExpertSortModal from "./ExpertSortModal";
import ExpertSlider from "./ExpertSlider";
import ExpertGrid from "./ExpertGrid";
import { useExpertListLogic } from "./useExpertListLogic";
import { ExpertProfile } from "@/lib/types";

interface ExpertListProps {
  initialExperts: ExpertProfile[];
  initialPagination?: {
    total: number;
    hasMore: boolean;
  };
  initialError?: string;
  layout?: "slider" | "grid";
  title?: string;
}

const ExpertList: React.FC<ExpertListProps> = ({
  initialExperts,
  initialPagination,
  initialError,
  layout = "slider",
  title,
}) => {
  const { lang } = useLanguageStore();
  const t =
    homeTranslations[lang as keyof typeof homeTranslations] ||
    homeTranslations.en;

  const {
    experts,
    loading,
    hasMore,
    searchQuery,
    setSearchQuery,
    selectedSpecialization,
    setSelectedSpecialization,
    filterState,
    setFilterState,
    localFilter,
    setLocalFilter,
    hasActiveFilters,
    scrollTabs,
    scrollContainerRef,
    handleLoadMore,
    applyFilters,
    resetFilters,
  } = useExpertListLogic(
    initialExperts,
    initialPagination,
    initialError,
    lang,
    t,
  );

  const filterModalId = "expertListFilterModal";
  const sortModalId = "expertListSortModal";

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
        <div className="relative mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title || t.expertSection.title}
          </h2>
          <div className="w-48 h-1 bg-orange"></div>
        </div>

        <ExpertListHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
          hasActiveFilters={hasActiveFilters}
          filterModalId={filterModalId}
          sortModalId={sortModalId}
          resetFilters={resetFilters}
          scrollTabs={scrollTabs}
          scrollContainerRef={scrollContainerRef}
        />

        <ExpertFilterModal
          modalId={filterModalId}
          localFilter={localFilter}
          setLocalFilter={setLocalFilter}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
        />

        <ExpertSortModal
          modalId={sortModalId}
          sortBy={filterState.sortBy}
          setSortBy={(val) => setFilterState({ ...filterState, sortBy: val })}
          applySort={() => {}}
        />

        {layout === "slider" ? (
          <ExpertSlider
            experts={experts}
            loading={loading}
            initialError={initialError}
            lang={lang}
          />
        ) : (
          <ExpertGrid
            experts={experts}
            loading={loading}
            hasMore={hasMore}
            initialError={initialError}
            lang={lang}
            t={t}
            handleLoadMore={handleLoadMore}
          />
        )}

        {layout === "slider" && (
          <div className="view-all mt-4">
            <Link
              href="/our-experts"
              className="no-underline bg-orange hover:opacity-90 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all mx-auto flex items-center justify-center gap-2 w-fit"
            >
              <i className="fa-regular fa-user"></i>{" "}
              {t.expertSection.viewAllExperts}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpertList;
