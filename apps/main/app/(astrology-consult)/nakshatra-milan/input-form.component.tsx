"use client";

import React from "react";
import { FaMars, FaVenus, FaSpinner, FaChevronRight } from "react-icons/fa";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";

type Props = {
  boyDetails: any;
  girlDetails: any;
  handleInputChange: (gender: "boy" | "girl", field: string, value: any) => void;
  handleLocationSelect: (gender: "boy" | "girl", location: any) => void;
  handleMatch: () => void;
  loading: boolean;
  error: string | null;
};

const InputForm = ({
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
          {/* Boy's Card */}
          <div className="col-lg-6">
            <div className="light-card border rounded-4 border-[#fd64102b] p-8 h-100 shadow-xl group transition-all duration-300 hover:shadow-2xl hover:border-[#fd641055]">
              <div className="flex items-center gap-4 mb-8 border-b border-[#fd64101a] pb-4">
                <div className="bg-blue-500/10 p-3 rounded-2xl text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <FaMars size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#301118] mb-0">
                    Boy&apos;s Details
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Mental & Star Analysis
                  </p>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm focus:bg-white"
                    placeholder="Boy's Full Name"
                    value={boyDetails.name}
                    onChange={(e) =>
                      handleInputChange("boy", "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control rounded-3 py-3 border bg-gray-50 text-sm focus:bg-white"
                    value={boyDetails.date}
                    onChange={(e) =>
                      handleInputChange("boy", "date", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control rounded-3 py-3 border bg-gray-50 text-sm focus:bg-white"
                    value={boyDetails.time}
                    onChange={(e) =>
                      handleInputChange("boy", "time", e.target.value)
                    }
                  />
                </div>
                <div className="col-12">
                  <LocationAutocomplete
                    placeholder="Boy's Birth Place"
                    onSelect={(val) => handleLocationSelect("boy", val)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Girl's Card */}
          <div className="col-lg-6">
            <div className="light-card border rounded-4 border-[#fd64102b] p-8 h-100 shadow-xl group transition-all duration-300 hover:shadow-2xl hover:border-[#fd641055]">
              <div className="flex items-center gap-4 mb-8 border-b border-[#fd64101a] pb-4">
                <div className="bg-pink-500/10 p-3 rounded-2xl text-pink-600 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
                  <FaVenus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#301118] mb-0">
                    Girl&apos;s Details
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Emotional & Star Analysis
                  </p>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control rounded-3 py-3 pl-4 border bg-gray-50 text-sm focus:bg-white"
                    placeholder="Girl's Full Name"
                    value={girlDetails.name}
                    onChange={(e) =>
                      handleInputChange("girl", "name", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control rounded-3 py-3 border bg-gray-50 text-sm focus:bg-white"
                    value={girlDetails.date}
                    onChange={(e) =>
                      handleInputChange("girl", "date", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="time"
                    className="form-control rounded-3 py-3 border bg-gray-50 text-sm focus:bg-white"
                    value={girlDetails.time}
                    onChange={(e) =>
                      handleInputChange("girl", "time", e.target.value)
                    }
                  />
                </div>
                <div className="col-12">
                  <LocationAutocomplete
                    placeholder="Girl's Birth Place"
                    onSelect={(val) => handleLocationSelect("girl", val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
          <button
            disabled={loading}
            onClick={handleMatch}
            className="btn-link py-3 px-8 wfc mx-auto uppercase tracking-[3px] text-sm font-black shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 border-0 disabled:opacity-50"
          >
            {loading ? (
              <>
                Fetching Details <FaSpinner className="animate-spin" />
              </>
            ) : (
              <>
                Compare Star Details <FaChevronRight />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InputForm;
