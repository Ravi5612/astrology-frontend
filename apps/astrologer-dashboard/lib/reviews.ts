import apiClientSafe, { ApiError } from "./apiClientSafe";

export interface Review {
    id: string;
    rating: number;
    comment: string;
    user: {
        name: string;
        avatar?: string;
    };
    created_at: string;
    reply?: string;
}

export const getReviews = async (page: number = 1, limit: number = 10): Promise<[{ reviews: Review[], total: number } | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get(`/expert/reviews?page=${page}&limit=${limit}`);
    if (error) return [null, error];
    const data = (res as any)?.data?.data || (res as any)?.data || res;

    return [{
        reviews: data.items || data.reviews || [],
        total: data.total || 0
    }, null];
};

export const getReviewStats = async (): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get('/expert/reviews/stats');
    if (error) return [null, error];
    const data = (res as any)?.data?.data || (res as any)?.data || res;
    return [data, null];
};

export const replyToReview = async (id: string, reply: string): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.post(`/expert/reviews/${id}/reply`, { reply });
};
