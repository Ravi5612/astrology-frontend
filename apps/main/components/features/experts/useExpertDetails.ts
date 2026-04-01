"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getExpertReviews, Review } from "@/libs/api-experts";
import { Expert } from "@/lib/types";

export const useExpertDetails = (expertId: string) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'reviews' | 'gallery' | 'videos'>('about');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (activeTab === 'reviews') {
      const fetchReviews = async () => {
        setLoadingReviews(true);
        try {
          const res = await getExpertReviews(expertId);
          setReviews(res.data);
          setTotalReviews(res.total);
        } catch (error) {
          console.error("Failed to load reviews", error);
        } finally {
          setLoadingReviews(false);
        }
      };
      fetchReviews();
    }
  }, [activeTab, expertId]);

  const handleChatClick = () => {
    router.push(`/chat/prep/${expertId}`);
  };

  return {
    isReviewModalOpen, setIsReviewModalOpen,
    selectedVideo, setSelectedVideo,
    selectedImage, setSelectedImage,
    activeTab, setActiveTab,
    reviews, loadingReviews, totalReviews,
    handleChatClick
  };
};


