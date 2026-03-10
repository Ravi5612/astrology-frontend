import React from "react";
import AstrologerDetailsClient from "@/components/features/astrologers/AstrologerDetailsClient";
import { notFound } from "next/navigation";
import { getApiUrl } from "@/utils/api-config";
import { Product } from "@/lib/types";


const normalizeProduct = (raw: any): Product => {
  const images = Array.isArray(raw?.images) ? raw.images : [];
  const firstImage = images[0];
  const firstImageUrl =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.secure_url || firstImage?.url || firstImage?.image || "";

  return {
    id: raw?.id ?? raw?._id,
    _id: raw?._id,
    name: raw?.name || "",
    description: raw?.description || "",
    price: Number(raw?.price ?? raw?.sale_price ?? 0),
    originalPrice: Number(raw?.originalPrice ?? raw?.original_price ?? raw?.price ?? 0),
    imageUrl: raw?.secure_url || raw?.imageUrl || raw?.image_url || raw?.image || firstImageUrl || "",
    percentageOff: Number(raw?.percentageOff ?? raw?.percentage_off ?? 0),
  };
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const API_BASE_URL = getApiUrl();

  if (!id || typeof id !== "string") {
    return notFound();
  }

  try {
    // Fetch astrologer details + products in parallel
    const [astrologerRes, productsRes] = await Promise.allSettled([
      fetch(`${API_BASE_URL}/expert/details/${id}`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/products`, { cache: "no-store" }),
    ]);

    if (astrologerRes.status === "rejected" || !astrologerRes.value.ok) {
      if (astrologerRes.status === "fulfilled" && astrologerRes.value.status === 404)
        return notFound();
      throw new Error("Failed to fetch astrologer details");
    }

    const result = await astrologerRes.value.json();
    const data = result.data || result;

    // Normalize astrologer
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

    // Normalize products (empty array if fetch failed)
    let products: Product[] = [];
    if (productsRes.status === "fulfilled" && productsRes.value.ok) {
      const pData = await productsRes.value.json();
      const rawList = Array.isArray(pData) ? pData : (Array.isArray(pData?.data) ? pData.data : []);
      products = rawList.map(normalizeProduct).filter((p: Product) => p.name);
    }

    return <AstrologerDetailsClient astrologer={astrologer} products={products} />;
  } catch (error) {
    console.error("SSR Detail Page Error:", error);
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
