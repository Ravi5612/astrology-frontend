"use client";

import React from "react";
import {
  FaMars,
  FaCheckCircle,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";

type Props = {
  resultsRef: React.RefObject<HTMLDivElement | null>;
  result: any;
};

// Helper inside component to maintain parity with original code
const renderContent = (content: any): React.ReactNode => {
  if (content === null || content === undefined) return "";
  if (typeof content === "string" || typeof content === "number")
    return content;
  if (Array.isArray(content)) {
    return content.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && ", "}
        {renderContent(item)}
      </React.Fragment>
    ));
  }
  if (typeof content === "object") {
    if (content.description) return content.description;
    if (content.name) return content.name;
    if (content.title) return content.title;
    return JSON.stringify(content);
  }
  return String(content);
};

const ResultsSection = ({ resultsRef, result }: Props) => {
  return (
    <section ref={resultsRef} className="space-section bg-white pt-5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#fff9f6] rounded-[3rem] shadow-[0_20px_50px_rgba(253,100,16,0.1)] border border-orange-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-[#fd641012] text-[#fd6410] px-6 py-2 rounded-full text-[12px] font-black uppercase tracking-[3px] mb-6">
                  Analysis Report
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-[#301118] mb-4">
                  Your Mangal Dosha{" "}
                  <span className="text-[#fd6410]">Status</span>
                </h2>
                <p className="text-gray-500 max-w-lg mx-auto">
                  Based on the birth details provided, here is the detailed
                  analysis of Mars position in your horoscope.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-stretch mb-8">
                {/* Status Card */}
                <div className="flex-1">
                  <div
                    className={`h-full rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden ${
                      result.has_dosha
                        ? "bg-red-50 border border-red-100"
                        : "bg-green-50 border border-green-100"
                    }`}
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl ${
                        result.has_dosha
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {result.has_dosha ? (
                        <FaMars size={40} className="animate-pulse" />
                      ) : (
                        <FaCheckCircle size={40} />
                      )}
                    </div>
                    <h3
                      className={`text-2xl font-black uppercase tracking-wider mb-2 ${
                        result.has_dosha ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {result.has_dosha
                        ? "Manglik Dosha Present"
                        : "No Mangal Dosha"}
                    </h3>
                    <p
                      className={`font-bold text-sm uppercase tracking-widest ${
                        result.has_dosha ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {result.has_dosha
                        ? "Requires Attention"
                        : "Favorable Chart"}
                    </p>
                    {result.type && (
                      <div className="mt-4 px-4 py-1.5 bg-white/50 rounded-full text-xs font-bold text-gray-600 border border-gray-100">
                        Type: {renderContent(result.type)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description Card */}
                <div className="flex-[1.5]">
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-orange-50 h-full flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-[#301118] mb-4 flex items-center gap-2">
                      <FaChartLine className="text-[#fd6410]" /> Detailed
                      Analysis
                    </h4>
                    <p className="text-gray-600 leading-loose italic mb-6">
                      &quot;{renderContent(result.description)}&quot;
                    </p>

                    {!result.has_dosha && (
                      <div className="bg-green-50 p-4 rounded-2xl border border-green-100 flex gap-3 items-start">
                        <FaCheckCircle className="text-green-500 mt-1 shrink-0" />
                        <p className="text-green-800 text-sm m-0 font-medium">
                          Your chart is free from the adverse effects of
                          Mars. This is considered auspicious for marriage
                          and partnerships.
                        </p>
                      </div>
                    )}

                    {result.has_dosha && (
                      <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex gap-3 items-start">
                        <FaExclamationTriangle className="text-red-500 mt-1 shrink-0" />
                        <p className="text-red-800 text-sm m-0 font-medium">
                          Since Mangal Dosha is present, it is highly
                          recommended to consult with an astrologer for
                          Kumbh Vivah or other remedies before marriage.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Exceptions & Remedies Section */}
              {(result.exceptions?.length > 0 ||
                result.remedies?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {result.exceptions?.length > 0 && (
                    <div className="bg-orange-50 rounded-[2rem] p-8 border border-orange-100">
                      <h4 className="text-lg font-bold text-[#301118] mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-[#fd6410]" />{" "}
                        Exceptions Found
                      </h4>
                      <ul className="space-y-2">
                        {result.exceptions.map((ex: any, idx: number) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-700 list-disc list-inside"
                          >
                            {renderContent(ex)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.remedies?.length > 0 && (
                    <div className="bg-[#301118] text-white rounded-[2rem] p-8 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <GiMeditation className="text-[#fd6410]" />{" "}
                        Recommended Remedies
                      </h4>
                      <ul className="space-y-2">
                        {result.remedies.map((rem: any, idx: number) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-300 list-disc list-inside"
                          >
                            {renderContent(rem)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
