"use client";
import React, { useState } from "react";
import { CloseButton } from "@repo/ui";

interface FilterState {
  location: string;
  language: string;
  rating: number;
  price: number;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    language: "",
    rating: 1,
    price: 50,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      rating: parseInt(e.target.value),
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      price: parseInt(e.target.value),
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      location: "",
      language: "",
      rating: 1,
      price: 50,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-premium overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center text-xl">
              <i className="fa-solid fa-filter"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 m-0">Filter Experts</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Refine your search</p>
            </div>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        {/* Body */}
        <div className="px-10 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Location */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                Location
              </label>
              <div className="relative group">
                <i className="fa-solid fa-location-dot absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange transition-colors"></i>
                <input
                  type="text"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all outline-none font-bold text-sm"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Delhi, Mumbai"
                />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">
                Language
              </label>
              <div className="relative group">
                <i className="fa-solid fa-language absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange transition-colors"></i>
                <input
                  type="text"
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-orange focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all outline-none font-bold text-sm"
                  name="language"
                  value={filters.language}
                  onChange={handleInputChange}
                  placeholder="e.g. Hindi, English"
                />
              </div>
            </div>

            {/* Rating Range */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
                  Minimum Rating
                </label>
                <span className="px-3 py-1 bg-orange/10 text-orange rounded-lg text-sm font-black">
                  {filters.rating} ★
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="0.5"
                name="rating"
                value={filters.rating}
                onChange={handleRatingChange}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest px-1">
                <span>1 Star</span>
                <span>5 Stars</span>
              </div>
            </div>

            {/* Price Range */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-500 uppercase tracking-widest">
                  Maximum Price
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-400">Up to</span>
                  <span className="px-3 py-1 bg-orange/10 text-orange rounded-lg text-sm font-black text-orange">
                    ₹{filters.price} / min
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                name="price"
                value={filters.price}
                onChange={handlePriceChange}
                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest px-1">
                <span>₹1</span>
                <span>₹100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-gray-100 bg-gray-50/30 flex items-center gap-4">
          <button
            type="button"
            className="flex-1 px-6 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-orange hover:text-orange transition-all flex items-center justify-center gap-2"
            onClick={handleReset}
          >
            <i className="fa-solid fa-rotate-left"></i>
            Reset
          </button>
          
          <button
            type="button"
            className="flex-[1.5] px-6 py-4 bg-orange text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-2xl hover:bg-orange/90 transition-all flex items-center justify-center gap-2"
            onClick={handleApply}
          >
            <i className="fa-solid fa-check"></i>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;


