"use client";
import React, { useState } from "react";

type SortDirection = "none" | "asc" | "desc";

interface SortState {
  experience: SortDirection;
  price: SortDirection;
  rating: SortDirection;
}

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sorts: SortState) => void;
}

const SortModal: React.FC<SortModalProps> = ({ isOpen, onClose, onApply }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleReset = () => {
    setSelected(null);
  };

  const handleApply = () => {
    // build SortState from selected option
    const result: SortState = { experience: "none", price: "none", rating: "none" };
    if (selected) {
      const [field, dir] = selected.split("_") as [keyof SortState, Exclude<SortDirection, "none">];
      result[field] = dir;
    }
    onApply(result);
    onClose();
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
      <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-premium overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        {/* Header */}
        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange/10 text-orange flex items-center justify-center text-xl">
              <i className="fa-solid fa-sort"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 m-0">Sort Astrologers</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Order by preference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-orange hover:text-white transition-all duration-300 hover:rotate-90"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="px-10 py-8">
          <div className="space-y-4">
            {[
              { key: "experience_desc", label: "Experience : High to Low", icon: "fa-briefcase" },
              { key: "price_asc", label: "Price : Low to High", icon: "fa-tag" },
              { key: "rating_desc", label: "Rating : High to Low", icon: "fa-star" },
            ].map((opt) => (
              <label 
                key={opt.key} 
                className={`group flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  selected === opt.key 
                  ? "border-orange bg-orange/5 shadow-lg shadow-orange/10" 
                  : "border-gray-50 bg-gray-50/50 hover:bg-white hover:border-orange/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selected === opt.key ? "bg-orange text-white" : "bg-white text-gray-400 group-hover:text-orange"
                  }`}>
                    <i className={`fa-solid ${opt.icon}`}></i>
                  </div>
                  <span className={`font-black text-sm ${selected === opt.key ? "text-orange" : "text-gray-600"}`}>
                    {opt.label}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    name="sortOption"
                    value={opt.key}
                    checked={selected === opt.key}
                    onChange={() => setSelected(opt.key)}
                    className="peer hidden"
                  />
                  <div className="w-6 h-6 rounded-full border-2 border-gray-200 peer-checked:border-orange flex items-center justify-center transition-all">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </label>
            ))}
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
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;


