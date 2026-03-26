"use client";

import React from "react";
import Image from "next/image";
import { FaCalendarAlt, FaChevronRight, FaSpinner, FaCheck } from "react-icons/fa";
import LocationAutocomplete from "@/components/ui/LocationAutocomplete";

type Props = {
  details: any;
  handleInputChange: (field: string, value: any) => void;
  handleLocationSelect: (location: any) => void;
  handleAnalyze: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
};

const InputForm = ({
  details,
  handleInputChange,
  handleLocationSelect,
  handleAnalyze,
  loading,
  error,
}: Props) => {
  return (
    <section className="space-section light-back">
      <div className="container">
        <div className="row g-5">
          {/* Form Area */}
          <div className="col-lg-7">
            <div className="light-card border border-[#fd64102b] p-8 md:p-10 shadow-2xl h-full">
              <div className="flex items-center gap-4 mb-8 border-b border-[#fd64101a] pb-4">
                <div className="bg-[#fd6410] text-white p-3 rounded-3 shadow-lg">
                  <FaCalendarAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#301118] mb-0">
                    Enter Birth Details
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Free Personal Analysis
                  </p>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleAnalyze}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-3 border-0 shadow-sm bg-gray-50"
                      placeholder="Enter name"
                      value={details.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">
                      Gender
                    </label>
                    <select
                      className="form-select rounded-3 py-3 border-0 shadow-sm bg-gray-50 text-sm"
                      value={details.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">
                      Birth Date
                    </label>
                    <input
                      type="date"
                      className="form-control rounded-3 py-3 border-0 shadow-sm bg-gray-50"
                      value={details.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">
                      Birth Time
                    </label>
                    <input
                      type="time"
                      className="form-control rounded-3 py-3 border-0 shadow-sm bg-gray-50"
                      value={details.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">
                      Birth Place
                    </label>
                    <LocationAutocomplete
                      placeholder="City"
                      onSelect={handleLocationSelect}
                      initialValue={details.locationName}
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm font-bold mt-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-link py-4 mt-6 uppercase tracking-widest text-[12px] font-bold w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      Analyzing <FaSpinner className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Analyze Mangal Dosha Now <FaChevronRight size={10} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="col-lg-5">
            <div className="space-y-6">
              <div className="rounded-4 overflow-hidden relative h-64 group shadow-xl border border-[#fd64102b]">
                <Image
                  src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80"
                  alt="Meditation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#301118] to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">
                    What is Mangal Dosha?
                  </h3>
                  <p className="text-sm text-gray-200 italic mb-0">
                    Occurs when Mars occupies 1st, 4th, 7th, 8th or 12th house
                    in birth chart.
                  </p>
                </div>
              </div>

              <div className="light-card border border-[#fd64102b] p-6 shadow-xl">
                <h3 className="text-lg font-bold text-[#301118] mb-4 border-b border-[#fd64101a] pb-2">
                  Why Analyze Now?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Check marriage compatibility issues.",
                    "Find effective Vedic remedies.",
                    "Clarity on career hurdles.",
                    "Plan auspicious life events.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1" size={12} />
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputForm;
