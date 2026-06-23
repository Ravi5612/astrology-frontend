"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import ChooseYourZodiac from "@/components/layout/main/ChooseYourZodiac";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import { horoscopeTranslations } from "@repo/store";
import { useLanguageStore } from "@repo/store";
import HeroComponent from "./hero.component";
import PredictionDetails from "./prediction-details.component";
import CTABanner from "./cta-banner.component";
import TrustFeatures from "./trust-features.component";
import HoroscopeInfo from "./horoscope-info.component";
import { HoroscopeService } from "@/services/horoscope.service";

const HoroscopePage = () => {
  const [selectedSign, setSelectedSign] = useState(ZodiacSignsData[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [horoscopeData, setHoroscopeData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useLanguageStore();

  const t = horoscopeTranslations[lang];

  useEffect(() => {
    const fetchHoroscope = async () => {
      setIsLoading(true);
      const [data, error] = await HoroscopeService.getDailyHoroscope(selectedSign.title);
      
      if (!error && data) {
        setHoroscopeData(data);
      } else {
        console.error("Failed to fetch horoscope:", error);
      }
      setIsLoading(false);
    };

    if (selectedSign) {
      fetchHoroscope();
    }
  }, [selectedSign]);

  if (!selectedSign) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroComponent 
        selectedSign={selectedSign} 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div id="predictions" className="relative z-20">
        <ChooseYourZodiac 
          selectedSignId={selectedSign.id} 
          onSelectSign={(sign: any) => setSelectedSign(sign)} 
          isDark={true}
        />
      </div>

      {/* Prediction Details Section */}
      <PredictionDetails 
        selectedSign={selectedSign} 
        lang={lang} 
        t={t} 
        data={horoscopeData}
        isLoading={isLoading}
      />
      
      <HoroscopeInfo />
      <CTABanner />
      <TrustFeatures />
    </div>
  );
};

export default HoroscopePage;
