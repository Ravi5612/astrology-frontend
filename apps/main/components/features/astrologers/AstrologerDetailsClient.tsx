"use client";

import React from "react";
import ReviewModal from "@/components/ui/modals/ReviewModal";
import ProductSection from "@/components/features/shop/ProductSection";
import AstrologerProfileCard from "./AstrologerProfileCard";
import AstrologerContentSection from "./AstrologerContentSection";
import AstrologerMediaModals from "./AstrologerMediaModals";
import { useAstrologerDetails } from "./useAstrologerDetails";
import { Astrologer, Product } from "@/lib/types";

export default function AstrologerDetailsClient({
  astrologer,
  products = [],
}: {
  astrologer: Astrologer;
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
  } = useAstrologerDetails(astrologer.id!);

  return (
    <>
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <AstrologerProfileCard
            astrologer={astrologer}
            onChatClick={handleChatClick}
            onVideoClick={(url) => setSelectedVideo(url)}
          />

          <AstrologerContentSection
            astrologer={astrologer}
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

      <AstrologerMediaModals
        astrologerName={astrologer.name}
        selectedVideo={selectedVideo}
        setSelectedVideo={setSelectedVideo}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  );
}
