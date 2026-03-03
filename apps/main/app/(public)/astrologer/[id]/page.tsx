import React from "react";
import AstrologerDetailsClient from "@/components/features/astrologers/AstrologerDetailsClient";
import { notFound } from "next/navigation";

import { getApiUrl } from "@/utils/api-config";

const API_BASE_URL = getApiUrl();

import { ExpertProfile, Astrologer } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  try {
    const url = `${API_BASE_URL}/expert/${id}`;
    const response = await fetch(url, {
      cache: 'no-store', // Disable caching for real-time updates
    });

    if (!response.ok) {
      if (response.status === 404) return notFound();
      throw new Error("Failed to fetch astrologer details");
    }

    const result = await response.json();
    const data = result.data || result; // Handle potential { success: true, data: { ... } } wrapping

    const astrologer = {
      id: data.id,
      name: data.user?.name || data.name || "Astrologer",
      image: data.user?.avatar || data.avatar || data.image || "/images/dummy-astrologer.jpg",
      expertise: data.specialization || data.expertise || "Vedic Astrology",
      experience: data.experience_in_years !== undefined ? data.experience_in_years : (data.experience || 0),
      language: Array.isArray(data.languages)
        ? data.languages.join(", ")
        : data.user?.language || data.language || "Hindi, English",
      price: data.price || 0,
      video: data.video || "https://www.youtube.com/embed/INoPh_oRooU",
      ratings: data.rating !== undefined ? Math.round(data.rating) : (data.ratings ? Math.round(data.ratings) : 5),
      bio: data.bio || "",
      detailed_experience: data.detailed_experience || data.detailedExperience || [],
      gallery: data.gallery || [],
      videos: data.videos || [],
      total_likes: data.total_likes || data.totalLikes || 0,
      is_available: data.isAvailable ?? data.is_available ?? false,
    };

    return <AstrologerDetailsClient astrologer={astrologer} />;
  } catch (error) {
    console.error("SSR Detail Page Error:", error);
    // Fallback or better error UI
    return (
      <div className="container py-20 text-center">
        <h2>Something went wrong</h2>
        <p>
          We couldn&apos;t load the astrologer details. Please try again later.
        </p>
      </div>
    );
  }
}
