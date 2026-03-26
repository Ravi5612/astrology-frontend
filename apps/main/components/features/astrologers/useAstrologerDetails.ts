"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getExpertReviews, Review } from "@/libs/api-experts";
import { Astrologer } from "@/lib/types";

export const useAstrologerDetails = (astrologerId: string) => {
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
          const res = await getExpertReviews(astrologerId);
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
  }, [activeTab, astrologerId]);

  const handleChatClick = () => {
    router.push(`/chat/prep/${astrologerId}`);
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

export const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
  }
  return stars;
};
