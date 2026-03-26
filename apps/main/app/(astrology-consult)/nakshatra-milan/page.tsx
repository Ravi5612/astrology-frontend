"use client";

import React, { useState } from "react";
import safeFetch from "@packages/safe-fetch/safeFetch";

import HeroSection from "./hero.component";
import InputForm from "./input-form.component";
import ResultsSection from "./results.component";
import EducationalContent from "./educational-content.component";

const NakshatraMilanPage = () => {
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
  const [results, setResults] = useState<{
    boy: any;
    girl: any;
    match: any;
  } | null>(null);
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
      const boyQuery = new URLSearchParams({
        datetime: `${boyDetails.date}T${boyDetails.time}:00+05:30`,
        lat: boyDetails.lat,
        lon: boyDetails.lon,
      }).toString();
      const girlQuery = new URLSearchParams({
        datetime: `${girlDetails.date}T${girlDetails.time}:00+05:30`,
        lat: girlDetails.lat,
        lon: girlDetails.lon,
      }).toString();
      const matchQuery = new URLSearchParams({
        boy_dob: `${boyDetails.date}T${boyDetails.time}:00+05:30`,
        boy_lat: boyDetails.lat,
        boy_lon: boyDetails.lon,
        girl_dob: `${girlDetails.date}T${girlDetails.time}:00+05:30`,
        girl_lat: girlDetails.lat,
        girl_lon: girlDetails.lon,
      }).toString();

      const [[boyData, boyErr], [girlData, girlErr], [matchData, matchErr]] =
        await Promise.all([
          safeFetch<any>(`/api/birth-details?${boyQuery}`),
          safeFetch<any>(`/api/birth-details?${girlQuery}`),
          safeFetch<any>(`/api/kundali-matching?${matchQuery}`),
        ]);

      if (boyErr || girlErr || matchErr) {
        setError("Failed to fetch birth details. Please check your inputs.");
      } else {
        setResults({
          boy: boyData?.data || boyData,
          girl: girlData?.data || girlData,
          match: matchData?.data || matchData,
        });
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <HeroSection />

      <InputForm
        boyDetails={boyDetails}
        girlDetails={girlDetails}
        handleInputChange={handleInputChange}
        handleLocationSelect={handleLocationSelect}
        handleMatch={handleMatch}
        loading={loading}
        error={error}
      />

      {results && (
        <ResultsSection
          resultsRef={resultsRef}
          results={results}
          boyName={boyDetails.name}
          girlName={girlDetails.name}
        />
      )}

      <EducationalContent />
    </div>
  );
};

export default NakshatraMilanPage;
