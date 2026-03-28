export interface ReviewStat {
  stars: number;
  count: number;
}

export interface Review {
  id: string | number;
  name: string;
  img: string;
  rating: number;
  review: string;
}
export interface ProductReview {
  name: string;
  img: string;
  rating: number;
  text: string;
}

export interface ReviewsProps {
  avgRating: number;
  totalRatings: number;
  reviewStats: ReviewStat[];
}
