"use client";

import React from "react";
import ReviewModal from "@/components/ui/modals/ReviewModal";
import ProductSection from "@/components/features/shop/ProductSection";
import ExpertProfileCard from "./ExpertProfileCard";
import ExpertContentSection from "./ExpertContentSection";
import ExpertMediaModals from "./ExpertMediaModals";
import { useExpertDetails } from "./useExpertDetails";
import { Expert, Product } from "@/lib/types";

export default function ExpertDetailsClient({
  expert,
  products = [],
}: {
  expert: Expert;
  products?: Product[];
}) {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    selectedVideo,
    setSelectedVideo,
    selectedImage,
    setSelectedImage,
    activeTab,
    setActiveTab,
    reviews,
    loadingReviews,
    totalReviews,
    handleChatClick,
  } = useExpertDetails(String(expert.id!));

  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <ExpertProfileCard
            expert={expert}
            onChatClick={handleChatClick}
            onVideoClick={(url) => setSelectedVideo(url)}
          />

          <ExpertContentSection
            expert={expert}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviews={reviews}
            loadingReviews={loadingReviews}
            totalReviews={totalReviews}
            onImageClick={(url) => setSelectedImage(url)}
            onVideoClick={(url) => setSelectedVideo(url)}
          />
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={() => setIsReviewModalOpen(false)}
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <ProductSection products={products} />
        </div>
      </section>

      <ExpertMediaModals
        expertName={expert.name}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  );
}
