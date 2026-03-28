"use client";

import React, { useState } from "react";
import safeFetch from "@packages/safe-fetch/safeFetch";
import { API_CONFIG } from "@/lib/api-config";
import HeroComponent from "./hero.component";
import MatchingForm from "./matching-form.component";
import ResultComponent from "./result.component";
import EducationalContent from "./educational-content.component";

const KundaliMatchingByNamePage = () => {
  const [boyDetails, setBoyDetails] = useState({
    name: "",
    date: "",
    time: "",
    lat: "",
    lon: "",
    locationName: "",
  });

  const [girlDetails, setGirlDetails] = useState({
    name: "",
    date: "",
    time: "",
    lat: "",
    lon: "",
    locationName: "",
  });

  const [loading, setLoading] = useState(false);
  const [matchingResult, setMatchingResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (
    gender: "boy" | "girl",
    field: string,
    value: any,
  ) => {
    if (gender === "boy") {
      setBoyDetails((prev) => ({ ...prev, [field]: value }));
    } else {
      setGirlDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleLocationSelect = (
    gender: "boy" | "girl",
    location: { name: string; lat: string; lon: string },
  ) => {
    if (gender === "boy") {
      setBoyDetails((prev) => ({
        ...prev,
        locationName: location.name,
        lat: location.lat,
        lon: location.lon,
      }));
    } else {
      setGirlDetails((prev) => ({
        ...prev,
        locationName: location.name,
        lat: location.lat,
        lon: location.lon,
      }));
    }
  };

  const handleMatch = async () => {
    setError(null);
    if (
      !boyDetails.date ||
      !boyDetails.time ||
      !boyDetails.lat ||
      !girlDetails.date ||
      !girlDetails.time ||
      !girlDetails.lat
    ) {
      setError("Please fill in all birth details for both individuals.");
      return;
    }

    setLoading(true);
    try {
      const query = new URLSearchParams({
        boy_dob: `${boyDetails.date}T${boyDetails.time}:00+05:30`,
        boy_lat: boyDetails.lat,
        boy_lon: boyDetails.lon,
        girl_dob: `${girlDetails.date}T${girlDetails.time}:00+05:30`,
        girl_lat: girlDetails.lat,
        girl_lon: girlDetails.lon,
      }).toString();

      const [rawData, fetchErr] = await safeFetch<any>(
        `${API_CONFIG.ASTROLOGY.KUNDLI_MATCHING.url}?${query}`,
      );

      if (fetchErr) {
        const errMsg = fetchErr?.message || "Failed to generate report.";
        setError(typeof errMsg === "string" ? errMsg : JSON.stringify(errMsg));
        return;
      }

      let finalData = rawData?.data ?? rawData;

      if (finalData) {
        setMatchingResult(finalData);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      } else {
        setError("Received incomplete data from the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <HeroComponent />

      <MatchingForm
        boyDetails={boyDetails}
        girlDetails={girlDetails}
        handleInputChange={handleInputChange}
        handleLocationSelect={handleLocationSelect}
        handleMatch={handleMatch}
        loading={loading}
        error={error}
      />

      {matchingResult && (
        <ResultComponent
          resultsRef={resultsRef}
          matchingResult={matchingResult}
          boyDetails={boyDetails}
          girlDetails={girlDetails}
        />
      )}

      <EducationalContent />
    </div>
  );
};

export default KundaliMatchingByNamePage;
