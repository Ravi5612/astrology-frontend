import { useQuery } from "@tanstack/react-query";
import { merchantService } from "@/services/merchant.service";
import { Review } from "@/lib/types/shop";

/**
 * Hook to fetch reviews for a specific merchant
 * @param id Merchant ID
 */
export const useMerchantReviews = (id: string | number | undefined) => {
    return useQuery<Review[], Error>({
        queryKey: ['merchant-reviews', id],
        queryFn: async () => {
            if (!id) return [];
            const [data, error] = await merchantService.getMerchantReviews(id);
            if (error) {
                const message = (error as any).message || "Failed to fetch reviews";
                throw new Error(message);
            }
            return (Array.isArray(data) ? data : []) as Review[];
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
