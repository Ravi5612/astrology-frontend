import { useQuery } from "@tanstack/react-query";
import { merchantService } from "@/services/merchant.service";
import { Product } from "@/lib/types";

/**
 * Hook to fetch products for a specific merchant
 * @param id Merchant ID
 */
export const useMerchantProducts = (id: string | number | undefined, page = 1, limit = 20) => {
    return useQuery<Product[]>({
        queryKey: ['merchant-products', id, page, limit],
        queryFn: async () => {
            if (!id) return [];
            const [data, error] = await merchantService.getMerchantProducts(id, page, limit);
            if (error) throw new Error(error.message || "Failed to fetch products");
            return data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
