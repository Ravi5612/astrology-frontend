"use client";

import React from "react";
import { FaMars, FaVenus, FaSpinner, FaChevronRight } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";

type DetailType = {
  name: string;
  date: string;
  time: string;
  lat: string;
  lon: string;
  locationName: string;
};

type Props = {
  boyDetails: DetailType;
  girlDetails: DetailType;
  handleInputChange: (gender: "boy" | "girl", field: string, value: any) => void;
  handleLocationSelect: (gender: "boy" | "girl", location: any) => void;
  handleMatch: () => void;
  loading: boolean;
  error: string | null;
};

const MatchingForm = ({
  boyDetails,
  girlDetails,
  handleInputChange,
  handleLocationSelect,
  handleMatch,
  loading,
  error,
}: Props) => {
  return (
    <section className="space-section light-back">
      <div className="container">
        <div className="row g-4">
          {/* Boy's Details */}
          <div className="col-lg-6">
            <div className="light-card border rounded-4 border-[#fd64102b] p-8 h-100 shadow-xl group transition-all duration-300 hover:shadow-2xl hover:border-[#fd641055]">
              <div className="flex items-center gap-4 mb-8 border-b border-[#fd64101a] pb-4">
                <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <FaMars size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#301118] mb-0">
                    Boy&apos;s Details
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    The Groom&apos;s Profile
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12">
                  <div className="relative group/input">
                    <input
                      type="text"
                      className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-[#fd641022] transition-all"
                      placeholder="Boy's Full Name"
                      value={boyDetails.name}
                      onChange={(e) =>
                        handleInputChange("boy", "name", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative group/input">
                    <input
                      type="date"
                      className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-[#fd641022] transition-all"
                      value={boyDetails.date}
                      onChange={(e) =>
                        handleInputChange("boy", "date", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative group/input">
                    <input
                      type="time"
                      className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-[#fd641022] transition-all"
                      value={boyDetails.time}
                      onChange={(e) =>
                        handleInputChange("boy", "time", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-12">
                  <LocationAutocomplete
                    placeholder="Boy's Birth Place (City, State)"
                    onSelect={(val) => handleLocationSelect("boy", val)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Girl's Details */}
          <div className="col-lg-6">
            <div className="light-card border rounded-4 border-[#fd64102b] p-8 h-100 shadow-xl group transition-all duration-300 hover:shadow-2xl hover:border-[#fd641055]">
              <div className="flex items-center gap-4 mb-8 border-b border-[#fd64101a] pb-4">
                <div className="bg-pink-500/10 p-3 rounded-2xl text-pink-600 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500 shadow-sm">
                  <FaVenus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#301118] mb-0">
                    Girl&apos;s Details
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    The Bride&apos;s Profile
                  </p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-12">
                  <div className="relative group/input">
                    <input
                      type="text"
                      className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-[#fd641022] transition-all"
                      placeholder="Girl's Full Name"
                      value={girlDetails.name}
                      onChange={(e) =>
                        handleInputChange("girl", "name", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative group/input">
                    <input
                      type="date"
                      className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-[#fd641022] transition-all"
                      value={girlDetails.date}
                      onChange={(e) =>
                        handleInputChange("girl", "date", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="relative group/input">
                    <input
                      type="time"
                      className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm shadow-sm focus:bg-white focus:ring-2 focus:ring-[#fd641022] transition-all"
                      value={girlDetails.time}
                      onChange={(e) =>
                        handleInputChange("girl", "time", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-12">
                  <LocationAutocomplete
                    placeholder="Girl's Birth Place (City, State)"
                    onSelect={(val) => handleLocationSelect("girl", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          {error && (
            <p className="text-red-500 font-bold mb-4 animate-bounce">
              {error}
            </p>
          )}
          <button
            disabled={loading}
            onClick={handleMatch}
            className="btn-link py-3 px-4 wfc mx-auto uppercase tracking-[3px] text-sm font-black shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                Analyzing Advanced Data <FaSpinner className="animate-spin" />
              </>
            ) : (
              <>
                Generate Advanced Report <FaChevronRight className="animate-pulse" />
              </>
            )}
          </button>
          <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <MdOutlineSecurity size={14} className="text-[#fd6410]" /> 100%
            Private & Secure Analysis
          </p>
        </div>
      </div>
    </section>
  );
};

export default MatchingForm;
