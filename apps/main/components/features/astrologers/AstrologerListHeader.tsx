"use client";
import React, { useState } from "react";

import { AstrologerListHeaderProps, astrologerSpecializations as rawSpecializations } from "@/lib/types";
import { useLanguageStore } from "../../../store/languageStore";
import { homeTranslations } from "../../../lib/translations/home";

const ITEMS_PER_PAGE = 2;

const AstrologerListHeader: React.FC<AstrologerListHeaderProps> = ({
    searchQuery,
    setSearchQuery,
    selectedSpecialization,
    setSelectedSpecialization,
    hasActiveFilters,
    filterModalId,
    sortModalId,
    resetFilters,
    scrollTabs,
    scrollContainerRef,
}) => {
    const { lang } = useLanguageStore();
    const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;

    const specializations = [
        { key: "numerology", value: "Numerology" },
        { key: "vedic", value: "Vedic" },
        { key: "zodiacCompatibility", value: "Zodiac Compatibility" },
        { key: "astrocartography", value: "Astrocartography" },
        { key: "lunarNodeAnalysis", value: "Lunar Node Analysis" },
        { key: "loveProblem", value: "Love Problem Solution" },
        { key: "marriageProblem", value: "Marriage Problem" },
        { key: "divorceProblem", value: "Divorce Problem Solution" },
        { key: "breakupProblem", value: "Breakup Problem Solution" },
        { key: "exLoveBack", value: "Get Your Ex Love Back" },
        { key: "familyProblem", value: "Family Problem Solution" },
        { key: "disputeSolution", value: "Dispute Solution" },
        { key: "childlessCouple", value: "Childless Couple Solution" }
    ];

    // Build full list: "All" + specializations
    const allItems = [
        { key: "__all__", value: "" },
        ...specializations,
    ];

    const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
    const [page, setPage] = useState(0);

    const visibleItems = allItems.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const goLeft = () => {
        setPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
    };

    const goRight = () => {
        setPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
    };

    return (
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-8 text-white">
            {/* Search Box */}
            <div className="w-full lg:w-5/12">
                <div className="flex w-full shadow-lg">
                    <input
                        type="text"
                        className="w-full px-6 py-3 border-0 rounded-l-full outline-none text-base bg-white text-black"
                        placeholder={t.astrologerSection.searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="button" className="px-8 py-3 bg-orange text-white rounded-r-full font-bold text-base hover:opacity-90 transition-all">
                        {t.astrologerSection.searchBtn}
                    </button>
                </div>
            </div>

            {/* Filter & Reset */}
            <div className="w-full lg:w-2/12 flex items-center justify-center lg:justify-end gap-6">
                <button
                    type="button"
                    className="flex items-center gap-2 text-white font-medium hover:text-orange transition-all relative"
                    data-bs-toggle="modal"
                    data-bs-target={`#${filterModalId}`}
                >
                    <i className="fa-solid fa-filter text-orange"></i> {t.astrologerSection.filterBtn}
                    {hasActiveFilters && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange rounded-full"></span>
                    )}
                </button>

                {hasActiveFilters && (
                    <button
                        type="button"
                        className="flex items-center gap-2 text-red-400 font-medium hover:text-red-500 transition-all text-sm"
                        onClick={resetFilters}
                    >
                        <i className="fa-solid fa-xmark"></i> {t.astrologerSection.applyBtns.resetAll}
                    </button>
                )}
            </div>

            {/* Specialization Paginated Slider */}
            <div className="w-full lg:w-[43.33%] flex items-center gap-2">
                <button
                    onClick={goLeft}
                    className="text-orange hover:scale-110 transition-transform p-1 shrink-0"
                >
                    <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <div className="flex gap-3 py-2 w-full justify-center">
                    {visibleItems.map((item) => {
                        const isAll = item.key === "__all__";
                        const label = isAll
                            ? t.astrologerSection.all
                            : ((t.astrologerSection as any).specializations?.[item.key] || item.value);
                        const isActive = isAll
                            ? selectedSpecialization === ""
                            : selectedSpecialization === item.value;

                        return (
                            <div
                                key={item.key}
                                onClick={() => setSelectedSpecialization(item.value)}
                                className={`px-6 py-2 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 shadow-md shrink-0 whitespace-nowrap ${isActive ? "bg-orange text-white" : "bg-white text-gray-800 hover:bg-orange hover:text-white"}`}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>
                <button
                    onClick={goRight}
                    className="text-orange hover:scale-110 transition-transform p-1 shrink-0"
                >
                    <i className="fa-solid fa-chevron-right text-xl"></i>
                </button>
            </div>
        </div>
    );
};

export default AstrologerListHeader;
