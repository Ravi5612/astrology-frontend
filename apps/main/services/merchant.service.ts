import { api } from "@/lib/api";
import { Store } from "@/lib/types/shop";
import { Product } from "@/lib/types";



export const merchantService = {
    /**
     * Fetch all merchants with optional pagination, search and city filters
     */
    getAllMerchants: async (params: { search?: string, city?: string, page?: number, limit?: number } = {}) => {
        const { search = '', city = '', page = 1, limit = 10 } = params;
        
        let url = `/merchants?page=${page}&limit=${limit}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (city && city !== "All Cities") url += `&city=${encodeURIComponent(city)}`;
        
        const [data, error] = await api.get<any>(url);
        // Backend should return { merchants: [...] }
        const merchants = data?.data?.merchants || data?.merchants || data?.data || data;
        return [Array.isArray(merchants) ? merchants : [], error];
    },

    /**
     * Fetch list of unique cities where merchants are active
     */
    getMerchantCities: async () => {
        const [data, error] = await api.get<any>('/merchants/cities');
        // console.log('Main App Cities API Response:', data);
        // Backend might return { cities: [] } or { data: [] }
        const cities = data?.data?.cities || data?.cities || data?.data || data;
        return [Array.isArray(cities) ? cities : [], error];
    },

    /**
     * Fetch a single merchant by ID
     */
    getMerchantById: async (id: string | number) => {
        const [data, error] = await api.get<any>(`/merchants/${id}`);
        // If the backend wraps the response in a 'data' field, use it. Otherwise use the object itself.
        const merchantData = data?.data || data;
        return [merchantData as Store, error];
    },

    /**
     * Fetch products for a specific merchant
     */
    getMerchantProducts: async (id: string | number, page = 1, limit = 20) => {
        const [data, error] = await api.get<any>(`/products?merchantId=${id}&page=${page}&limit=${limit}`);
        // console.log('Raw Store products API Response:', data);
        // Extract array from various possible keys
        const products = data?.data?.products || data?.products || data?.data || data;
        return [Array.isArray(products) ? products : [], error];
    },

    /**
     * Fetch reviews for a specific merchant
     */
    getMerchantReviews: async (id: string | number) => {
        const [data, error] = await api.get<any>(`/reviews/merchant/${id}`);
        return [data?.data || data || [], error];
    },

    /**
     * Submit a review for a merchant
     */
    submitMerchantReview: async (payload: { merchantId: number | string, orderId: number | string, rating: number, comment: string }) => {
        // Based on backend plan: POST /api/v1/reviews
        const body = {
            merchantId: Number(payload.merchantId),
            orderId: Number(payload.orderId),
            rating: Number(payload.rating),
            comment: payload.comment
        };
        
        const [data, error] = await api.post<any>('/reviews', body);
        return [data, error];
    }
};
