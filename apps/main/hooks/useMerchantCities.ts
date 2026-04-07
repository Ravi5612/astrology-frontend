import { useQuery } from "@tanstack/react-query";
import { merchantService } from "@/services/merchant.service";

/**
 * Hook to fetch the list of unique cities for active merchants
 */
export const useMerchantCities = () => {
    return useQuery<string[], Error>({
        queryKey: ['merchant-cities'],
        queryFn: async () => {
            const [data, error] = await merchantService.getMerchantCities();
            if (error) {
                const message = (error as any).message || "Failed to fetch cities";
                throw new Error(message);
            }
            return data as string[];
        },
        staleTime: 1000 * 60 * 30, // 30 minutes (cities don't change often)
    });
};
