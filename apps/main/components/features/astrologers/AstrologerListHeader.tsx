"use client";
import React from "react";

import { AstrologerListHeaderProps, astrologerSpecializations as specializations } from "@/lib/types";

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
    return (
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-8 text-white">
            {/* Search Box */}
            <div className="w-full lg:w-5/12">
                <div className="flex w-full shadow-lg">
                    <input
                        type="text"
                        className="w-full px-6 py-3 border-0 rounded-l-full outline-none text-base bg-white text-black"
                        placeholder="Search Astrologer by Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="button" className="px-8 py-3 bg-orange text-white rounded-r-full font-bold text-base hover:opacity-90 transition-all">
                        Search
                    </button>
                </div>
            </div>

            {/* Filter & Reset */}
            <div className="w-full lg:w-3/12 flex items-center justify-center lg:justify-end gap-6">
                <button
                    type="button"
                    className="flex items-center gap-2 text-white font-medium hover:text-orange transition-all relative"
                    data-bs-toggle="modal"
                    data-bs-target={`#${filterModalId}`}
                >
                    <i className="fa-solid fa-filter text-orange"></i> Filter
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
                        <i className="fa-solid fa-xmark"></i> Reset
                    </button>
                )}
            </div>

            {/* Specialization Slider */}
            <div className="w-full lg:w-4/12 flex items-center gap-2">
                <button
                    onClick={() => scrollTabs("left")}
                    className="text-orange hover:scale-110 transition-transform p-1"
                >
                    <i className="fa-solid fa-chevron-left text-xl"></i>
                </button>
                <div
                    className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap py-2 w-full px-2"
                    id="list-slider"
                    ref={scrollContainerRef}
                >
                    <div
                        onClick={() => setSelectedSpecialization("")}
                        className={`px-6 py-2 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 shadow-md ${selectedSpecialization === "" ? "bg-orange text-white" : "bg-white text-gray-800 hover:bg-orange hover:text-white"}`}
                    >
                        All
                    </div>
                    {specializations.map((spec) => (
                        <div
                            key={spec}
                            onClick={() => setSelectedSpecialization(spec)}
                            className={`px-6 py-2 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 shadow-md ${selectedSpecialization === spec ? "bg-orange text-white" : "bg-white text-gray-800 hover:bg-orange hover:text-white"}`}
                        >
                            {spec}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scrollTabs("right")}
                    className="text-orange hover:scale-110 transition-transform p-1"
                >
                    <i className="fa-solid fa-chevron-right text-xl"></i>
                </button>
            </div>
        </div>
    );
};

export default AstrologerListHeader;


