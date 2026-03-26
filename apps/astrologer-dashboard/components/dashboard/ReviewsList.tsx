"use client";

import React, { useState, useCallback } from "react";
import { Star, User, Loader2, ChevronDown } from "lucide-react";
import { Review, getExpertReviews } from "@/lib/reviews";

const PAGE_SIZE = 10;

interface ReviewsListProps {
    expertId: number;
    initialReviews?: Review[];
    initialTotal?: number;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({
    expertId,
    initialReviews = [],
    initialTotal = 0,
}) => {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [total, setTotal] = useState(initialTotal);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const hasMore = reviews.length < total;

    const handleLoadMore = useCallback(async () => {
        if (loadingMore) return;
        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const res = await getExpertReviews(expertId, nextPage, PAGE_SIZE);
            const newReviews: Review[] = res?.data || [];
            setReviews(prev => {
                const existingIds = new Set(prev.map(r => r.id));
                const unique = newReviews.filter(r => !existingIds.has(r.id));
                return [...prev, ...unique];
            });
            setTotal(res?.total ?? total);
            setPage(nextPage);
        } catch (err) {
            console.error("Failed to load more reviews", err);
        } finally {
            setLoadingMore(false);
        }
    }, [expertId, page, loadingMore]);

    if (reviews.length === 0) {
        return (
            <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500">No reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Recent Reviews</h4>
                {total > 0 && (
                    <span className="text-xs text-gray-400 font-medium">
                        Showing {reviews.length} of {total}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-100 flex-shrink-0">
                                    {review.user.avatar ? (
                                        <img
                                            src={review.user.avatar}
                                            alt={review.user.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as any).src = "";
                                                (e.target as any).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <User className="w-4 h-4 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{review.user.name}</p>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                className={`w-3 h-3 ${s <= review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-400">
                                {new Date((review as any).created_at || review.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 italic">
                            "{review.comment || "No comment provided."}"
                        </p>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-2">
                    <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                    >
                        {loadingMore ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                Load More Reviews
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};
