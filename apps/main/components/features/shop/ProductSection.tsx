"use client";

import React, { useState } from "react";
import ProductCarousel from "./ProductCarousel";
import NextImage from "next/image";
import { Search, X } from "lucide-react";

const Image = NextImage as any;
const SearchIcon = Search as any;
const XIcon = X as any;

import { Product } from "@/lib/types";
import { useLanguageStore } from "../../../store/languageStore";
import { homeTranslations } from "../../../lib/translations/home";

interface ProductSectionProps {
    products: Product[];
}

/* 🔹 Skeleton Card */
const ProductSkeleton = () => {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="bg-white rounded-2xl p-3 shadow-[0_10px_25px_rgba(0,0,0,0.08)] h-full animate-pulse flex flex-col">
                <div className="mb-[15px] h-[200px] w-full bg-gray-200 rounded-xl"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="mt-auto">
                    <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded-full w-full"></div>
                </div>
            </div>
        </div>
    );
};

const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
    const { lang } = useLanguageStore();
    const t = homeTranslations[lang as keyof typeof homeTranslations] || homeTranslations.en;
    const [searchQuery, setSearchQuery] = useState("");

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClear = () => {
        setSearchQuery("");
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div className="max-w-2xl">
                    <h2 className="text-[32px] font-semibold mb-[35px] relative pb-[15px] text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#a9a9a92b] after:w-full inline-block md:block">
                        <span className="relative after:content-[''] after:bg-orange after:w-full after:h-[2px] after:absolute after:left-0 after:bottom-[-15px]">
                            {t.products.title}
                        </span>
                    </h2>
                    <p className="text-gray-700 m-0 font-medium">
                        {t.products.subtitle}
                    </p>
                </div>
                <div className="w-full md:w-auto flex justify-start md:justify-end">
                    <div className="w-full max-w-[300px]">
                        {/* 🔹 Local Search Input Implementation */}
                        <div className="relative w-full">
                            <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.products.searchPlaceholder}
                                className="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-10 text-base outline-none transition-all 
                                    hover:border-orange focus:border-orange focus:ring-1 focus:ring-orange placeholder-gray-400 text-gray-700 bg-white"
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClear}
                                    className="absolute top-1/2 -translate-y-1/2 right-3 p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <XIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {products.length === 0 ? (
                    /* 🔥 4 Skeleton Cards for empty initial state */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <ProductSkeleton key={index} />
                        ))}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="w-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 font-medium text-lg">
                            {t.products.noResults.replace("{query}", searchQuery)}
                        </p>
                    </div>
                ) : (
                    <div className="w-full">
                        <ProductCarousel products={filteredProducts} />
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductSection;


