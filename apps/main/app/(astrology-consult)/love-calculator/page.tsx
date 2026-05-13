"use client";
import React, { useState, useRef } from "react";

import { api } from "@/lib/api";
import { toast } from "react-toastify";
import { useLanguageStore } from "@/store/languageStore";
import { loveCalculatorTranslations } from "@/lib/translations/calculators/love-calculator";
import { getErrorMessage } from "@repo/lib/utils/error";

import HeroComponent from "./hero.component";
import SimpleForm from "./simple-form.component";
import AdvancedForm from "./advanced-form.component";
import Result from "./result.component";
import Educational from "./educational.component";
import MoreServices from "./more-services.component";
import {
  ConsultPersonDetails,
  LoveCalculatorResult,
  LoveCalculatorSimpleData,
} from "@/lib/types";

const LoveCalculatorPage = () => {
  const { lang } = useLanguageStore();
  const t =
    loveCalculatorTranslations[
      lang as keyof typeof loveCalculatorTranslations
    ] || loveCalculatorTranslations.en;

  const [activeMode, setActiveMode] = useState<"simple" | "advanced">("simple");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoveCalculatorResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Simple Mode State
  const [simpleData, setSimpleData] = useState<LoveCalculatorSimpleData>({
    p1Name: "",
    p1Gender: "male",
    p2Name: "",
    p2Gender: "female",
  });

  // Advanced Mode State
  const [advancedData, setAdvancedData] = useState<{
    boy: ConsultPersonDetails;
    girl: ConsultPersonDetails;
  }>({
    boy: {
      name: "",
      date: "",
      time: "",
      lat: "",
      lon: "",
      tz: 5.5,
      locationName: "",
    },
    girl: {
      name: "",
      date: "",
      time: "",
      lat: "",
      lon: "",
      tz: 5.5,
      locationName: "",
    },
  });

  const handleSimpleInputChange = (
    field: keyof LoveCalculatorSimpleData,
    value: string,
  ) => {
    setSimpleData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdvancedInputChange = (
    gender: "boy" | "girl",
    field: keyof ConsultPersonDetails,
    value: string | number,
  ) => {
    setAdvancedData((prev) => ({
      ...prev,
      [gender]: { ...prev[gender], [field]: value },
    }));
  };

  const handleLocationSelect = (
    gender: "boy" | "girl",
    location: { name: string; lat: string; lon: string },
  ) => {
    handleAdvancedInputChange(gender, "locationName", location.name);
    handleAdvancedInputChange(gender, "lat", location.lat);
    handleAdvancedInputChange(gender, "lon", location.lon);
  };

  const calculateSimpleLove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simpleData.p1Name || !simpleData.p2Name) {
      toast.error(t.form.errors.bothNames);
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const [data, err] = await api.post<any>(
        "/matchmaking/love-calculator",
        {
          yourName: simpleData.p1Name,
          partnerName: simpleData.p2Name,
        },
      );

      if (err || !data) {
        toast.error(getErrorMessage(err) || t.form.errors.failedScore);
      } else if (data.success) {
        setResult({ type: "simple", ...data.data });
        toast.success(t.results.success.score);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      } else {
        toast.error(getErrorMessage(data) || t.form.errors.failedScore);
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateAdvancedMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const { boy, girl } = advancedData;
    if (
      !boy.date ||
      !boy.time ||
      !boy.lat ||
      !girl.date ||
      !girl.time ||
      !girl.lat
    ) {
      toast.error(t.form.errors.birthDetails);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const [data, err] = await api.post<any>(
        "/matchmaking/guna-milan",
        {
          girl: {
            name: girl.name || "Girl",
            datetime: `${girl.date}T${girl.time}:00Z`,
            location: {
              lat: parseFloat(girl.lat),
              lon: parseFloat(girl.lon),
              tz: girl.tz,
            },
          },
          boy: {
            name: boy.name || "Boy",
            datetime: `${boy.date}T${boy.time}:00Z`,
            location: {
              lat: parseFloat(boy.lat),
              lon: parseFloat(boy.lon),
              tz: boy.tz,
            },
          },
        },
      );

      if (err || !data) {
        toast.error(getErrorMessage(err) || t.form.errors.generic);
      } else if (data.success) {
        setResult({ type: "advanced", data: data.data });
        toast.success(t.results.success.guna);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      } else {
        toast.error(getErrorMessage(data) || t.form.errors.failedMatch);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F4] selection:bg-orange/20 overflow-hidden font-outfit">
      
      <HeroComponent activeMode={activeMode} setActiveMode={setActiveMode} />

      <section className="py-24 relative">
        {/* Decorative Background for Section */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#301118]/10 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-1 md:p-2 shadow-[0_40px_100px_rgba(48,17,24,0.05)] border border-slate-100 relative overflow-hidden">
             {/* Glowing Border effect */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400"></div>
             
             <div className="p-8 md:p-20">
                {activeMode === "simple" ? (
                  <SimpleForm
                    t={t}
                    loading={loading}
                    simpleData={simpleData}
                    handleSimpleInputChange={handleSimpleInputChange}
                    calculateSimpleLove={calculateSimpleLove}
                  />
                ) : (
                  <AdvancedForm
                    t={t}
                    loading={loading}
                    advancedData={advancedData}
                    handleAdvancedInputChange={handleAdvancedInputChange}
                    handleLocationSelect={handleLocationSelect}
                    calculateAdvancedMatch={calculateAdvancedMatch}
                  />
                )}
             </div>
          </div>
        </div>
      </section>

      <div ref={resultsRef} className="scroll-mt-24">
        <Result result={result} t={t} />
      </div>

      <Educational t={t} />
      <MoreServices t={t} />
    </div>
  );
};

export default LoveCalculatorPage;
