"use client";

import React, { useState } from "react";

interface FamousPlacesSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir",
];

const RADIUS_OPTIONS = ["Within 5 km", "Within 10 km", "Within 25 km", "Within 50 km", "Within 100 km"];

const FamousPlacesSearch: React.FC<FamousPlacesSearchProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [radius, setRadius] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build a smart query from dropdowns + text input
    const parts = [query.trim(), city.trim(), district.trim(), state.trim()].filter(Boolean);
    const finalQuery = parts.length > 0 ? parts.join(", ") : "Famous temples in India";
    onSearch(finalQuery);
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      onSearch(`Famous temples near ${latitude.toFixed(4)},${longitude.toFixed(4)}`);
    });
  };

  return (
    <section className="bg-[#FAF5EE] border-b border-orange-100 py-6">
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">

        {/* ── Single White Card Box ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8D5C0] px-6 py-6">
            <form onSubmit={handleSubmit}>

              {/* Row 1: Title + Use My Location */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F26500] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <i className="fa-solid fa-magnifying-glass text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3D1A0B] leading-tight">Search Temples</h2>
                    <p className="text-[13px] text-gray-500 font-medium">Find temples by State, District, City or Area</p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  className="hidden sm:flex items-center gap-2 border border-[#E8D5C0] text-[#D35400] px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-50 transition-colors"
                >
                  <i className="fa-solid fa-crosshairs"></i> Use My Location
                </button>
              </div>

            {/* Row 2: Text Input */}
            <div className="relative mb-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your area name, city or temple name..."
                className="w-full bg-[#FAF5EE] border border-[#E8D5C0] rounded-lg px-4 py-3 pr-12 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fa-solid fa-magnifying-glass text-sm" />
              </div>
            </div>

            {/* Row 3: Dropdowns + Search Button */}
            <div className="flex flex-wrap gap-2">
              {/* Select State */}
              <div className="relative flex-1 min-w-[130px]">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full appearance-none bg-[#FAF5EE] border border-[#E8D5C0] rounded-lg px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-medium pr-8 cursor-pointer"
                >
                  <option value="">Select State</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
              </div>

              {/* Select District */}
              <div className="relative flex-1 min-w-[130px]">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full appearance-none bg-[#FAF5EE] border border-[#E8D5C0] rounded-lg px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-medium pr-8 cursor-pointer"
                >
                  <option value="">Select District</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
              </div>

              {/* Select City/Area */}
              <div className="relative flex-1 min-w-[130px]">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Select City / Area"
                  className="w-full bg-[#FAF5EE] border border-[#E8D5C0] rounded-lg px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-medium"
                />
              </div>

              {/* Within Radius */}
              <div className="relative flex-1 min-w-[130px]">
                <select
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full appearance-none bg-[#FAF5EE] border border-[#E8D5C0] rounded-lg px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all font-medium pr-8 cursor-pointer"
                >
                  <option value="">Within Radius</option>
                  {RADIUS_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold px-7 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm flex-shrink-0 shadow-sm"
              >
                <i className={`fa-solid ${isSearching ? "fa-spinner fa-spin" : "fa-magnifying-glass"}`} />
                Search
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default FamousPlacesSearch;
