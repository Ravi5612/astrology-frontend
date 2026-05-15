import React from "react";
import ExpertDetailsClient from "@/components/features/experts/ExpertDetailsClient";
import { notFound } from "next/navigation";
import { Product } from "@/lib/types";
import { api } from "@/lib/api";
import { getErrorMessage } from "@repo/lib";

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

  if (!id || typeof id !== "string") {
    return notFound();
  }

  try {
    // Fetch expert details + products in parallel using the centralized api client
    const [
      [data, astroError],
      [pData, productsError]
    ] = await Promise.all([
      api.get<any>(`/expert/details/${id}`, { cache: "no-store" }),
      api.get<any>(`/products`, { cache: "no-store" }),
    ]);

    if (astroError) {
      if (astroError.status === 404) return notFound();
      throw new Error(getErrorMessage(astroError) || "Failed to fetch expert details");
    }

    const expertData = data.data || data;

    // Normalize expert
    const expert = {
      id: expertData.id,
      userId: expertData.user_id || expertData.userId || expertData.user?.id,
      name: expertData.user?.name || expertData.name || "Expert",
      image: expertData.user?.avatar || expertData.avatar || expertData.image || "/images/dummy-expert.jpg",
      expertise: expertData.specialization || expertData.expertise || "",
      experience: expertData.experience_in_years !== undefined ? expertData.experience_in_years : (expertData.experience || 0),
      language: Array.isArray(expertData.languages)
        ? expertData.languages.join(", ")
        : expertData.user?.language || expertData.language || "Hindi, English",
      price: expertData.price || 0,
      video: expertData.video || "https://www.youtube.com/embed/INoPh_oRooU",
      ratings: expertData.rating !== undefined ? Math.round(expertData.rating) : (expertData.ratings ? Math.round(expertData.ratings) : 5),
      bio: expertData.bio || "",
      detailed_experience: expertData.detailed_experience || expertData.detailedExperience || [],
      gallery: expertData.gallery || [],
      videos: expertData.videos || [],
      total_likes: expertData.total_likes || expertData.totalLikes || 0,
      is_available: expertData.isAvailable ?? expertData.is_available ?? false,
    };

    // Normalize products (empty array if fetch failed)
    let products: Product[] = [];
    if (!productsError && pData) {
      const rawList = Array.isArray(pData) ? pData : (Array.isArray(pData?.data) ? pData.data : []);
      products = rawList.map(normalizeProduct).filter((p: Product) => p.name);
    }

    return <ExpertDetailsClient expert={expert} products={products} />;
  } catch (error) {
    console.error("SSR Detail Page Error:", error);
    return (
      <div className="container py-20 text-center">
        <h2>Something went wrong</h2>
        <p>
          We couldn&apos;t load the expert details. Please try again later.
        </p>
      </div>
    );
  }
}
