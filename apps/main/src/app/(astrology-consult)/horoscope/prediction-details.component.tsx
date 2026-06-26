"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiSun, FiHeart, FiBriefcase, FiDollarSign, FiPlus, FiTarget, FiDroplet, FiClock, FiHexagon } from "react-icons/fi";
import { FaRupeeSign, FaStar, FaHeart, FaBriefcase, FaPlusSquare } from "react-icons/fa";
import { ZodiacData } from "@/components/features/services/zodiac";

import { 
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer, 
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio, 
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces 
} from "react-icons/tb";

interface PredictionDetailsProps {
  selectedSign: ZodiacData;
  lang: string;
  t: any;
  data?: any;
  isLoading?: boolean;
}

const ZodiacIcon = ({ title, className }: { title: string, className?: string }) => {
  switch (title.toLowerCase()) {
    case 'aries': return <TbZodiacAries className={className} strokeWidth={1.5} />;
    case 'taurus': return <TbZodiacTaurus className={className} strokeWidth={1.5} />;
    case 'gemini': return <TbZodiacGemini className={className} strokeWidth={1.5} />;
    case 'cancer': return <TbZodiacCancer className={className} strokeWidth={1.5} />;
    case 'leo': return <TbZodiacLeo className={className} strokeWidth={1.5} />;
    case 'virgo': return <TbZodiacVirgo className={className} strokeWidth={1.5} />;
    case 'libra': return <TbZodiacLibra className={className} strokeWidth={1.5} />;
    case 'scorpio': return <TbZodiacScorpio className={className} strokeWidth={1.5} />;
    case 'sagittarius': return <TbZodiacSagittarius className={className} strokeWidth={1.5} />;
    case 'capricorn': return <TbZodiacCapricorn className={className} strokeWidth={1.5} />;
    case 'aquarius': return <TbZodiacAquarius className={className} strokeWidth={1.5} />;
    case 'pisces': return <TbZodiacPisces className={className} strokeWidth={1.5} />;
    default: return <TbZodiacAries className={className} strokeWidth={1.5} />;
  }
};

const PredictionDetails = ({ selectedSign, lang, t, data, isLoading }: PredictionDetailsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const defaultCategories = [
    { title: "General", icon: <FaStar />, content: "No data available." },
    { title: "Love", icon: <FaHeart />, content: "No data available." },
    { title: "Career", icon: <FaBriefcase />, content: "No data available." },
    { title: "Health", icon: <FaPlusSquare />, content: "No data available." },
    { title: "Finance", icon: <FaRupeeSign />, content: "No data available." },
  ];

  // The API returns { status: "ok", data: { daily_predictions: [...] } }
  // Since we passed the whole response to data prop, we need to access data?.data
  const predictionsArray = data?.data?.daily_predictions?.[0]?.predictions || [];
  
  // Helper to find prediction by type
  const getPredictionText = (type: string) => {
    const item = predictionsArray.find((p: any) => p.type === type);
    return item ? item.prediction : "No data available.";
  };

  const mappedCategories = [
    { title: "General", icon: <FaStar />, content: getPredictionText("General") },
    { title: "Love", icon: <FaHeart />, content: getPredictionText("Love") },
    { title: "Career", icon: <FaBriefcase />, content: getPredictionText("Career") },
    { title: "Health", icon: <FaPlusSquare />, content: getPredictionText("Health") },
    { title: "Finance", icon: <FaRupeeSign />, content: getPredictionText("Finance") },
  ];

  const categories = predictionsArray.length > 0 
    ? mappedCategories.filter(cat => cat.content !== "No data available.")
    : defaultCategories;

  // The backend Prokerala API does not provide lucky numbers/colors for this endpoint
  const luckyDetails = [
    { label: "Lucky Number", value: "-", icon: <FiTarget className="w-7 h-7" strokeWidth={1.5} /> },
    { label: "Lucky Color", value: "-", icon: <FiDroplet className="w-7 h-7" strokeWidth={1.5} /> },
    { label: "Lucky Time", value: "-", icon: <FiClock className="w-7 h-7" strokeWidth={1.5} /> },
    { label: "Lucky Gemstone", value: "-", icon: <FiHexagon className="w-7 h-7" strokeWidth={1.5} /> },
  ];

  return (
    <section className="pt-4 pb-12 bg-[#FAF8F5]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="bg-white rounded-[20px] border border-orange-200 shadow-sm p-6 md:p-8 lg:p-10 relative overflow-hidden">
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Left Column - Zodiac Info */}
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center bg-orange-50/50 rounded-2xl border border-orange-100 py-8 px-4">
              <div className="relative w-48 h-48 mb-6 flex items-center justify-center bg-white rounded-full border border-orange-200 p-8 shadow-md">
                <ZodiacIcon title={selectedSign.title} className="w-full h-full text-[#FF6B00]" />
              </div>
              <div className="text-center">
                <h2 className="text-[20px] font-black text-black leading-none mb-2">
                  {selectedSign.title} ({t.title || selectedSign.title})
                </h2>
                <p className="text-[13px] text-black font-medium">
                  {selectedSign.date}
                </p>
              </div>
            </div>

            {/* Right Column - Predictions */}
            <div className="w-full lg:w-2/3">
              <div className="text-black mb-6" style={{ '--heading-border-color': 'rgba(255,107,0,0.2)' } as any}>
                <h3 className="section-heading-premium uppercase mb-0">
                  <span style={{ fontSize: '1.25rem' }}>
                    Today's Horoscope - {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </h3>
              </div>
              
              <div 
                className="flex flex-col max-h-[400px] lg:max-h-[480px] overflow-y-auto pr-2 md:pr-4" 
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#FF6B00 transparent' }}
                data-lenis-prevent="true"
              >
                {categories.map((category, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-4 py-4 ${
                      index !== categories.length - 1 ? "border-b border-dashed border-orange-200/70" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-orange-200 flex items-center justify-center bg-orange-50 mt-0.5 text-[#FF6B00] text-[20px] shadow-sm">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-black mb-1">
                        {category.title}
                      </h4>
                      <p className="text-[13px] text-black leading-relaxed">
                        {category.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>



      </div>
    </section>
  );
};

export default PredictionDetails;
