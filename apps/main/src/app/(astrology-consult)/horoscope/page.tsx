"use client";

import React, { useState } from "react";
import Image from "next/image";

import ChooseYourZodiac from "@/components/layout/main/ChooseYourZodiac";
import { ZodiacSignsData } from "@/components/features/services/homePagaData";
import { horoscopeTranslations } from "@repo/store";
import { useLanguageStore } from "@repo/store";
import HeroComponent from "./hero.component";
import PredictionDetails from "./prediction-details.component";

const HoroscopePage = () => {
  const [selectedSign, setSelectedSign] = useState(ZodiacSignsData[0]);
  const { lang } = useLanguageStore();

  const t = horoscopeTranslations[lang];

  if (!selectedSign) return null;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <HeroComponent selectedSign={selectedSign} />

      <div id="predictions" className="relative -mt-10 z-20">
        <ChooseYourZodiac />
      </div>

      {/* Prediction Details Section */}
      <PredictionDetails selectedSign={selectedSign} lang={lang} t={t} />
    </div>
  );
};

export default HoroscopePage;
