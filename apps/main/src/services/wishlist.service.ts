import { api } from "../lib/api";
import { ApiError } from "@repo/safe-fetch";

export const WishlistService = {

    getWishlist: async (): Promise<[any | null, ApiError | null]> => {
        return await api.get("/product-like") as any;
    },

    addToWishlist: async (productId: number): Promise<[any | null, ApiError | null]> => {
        return await api.post("/product-like/add", { productId }) as any;
    },

    removeFromWishlist: async (productId: number): Promise<[any | null, ApiError | null]> => {
        return await api.delete(`/product-like/remove/${productId}`) as any;
    },

    getExpertWishlist: async (): Promise<[any | null, ApiError | null]> => {
        return await api.get("/expert-like") as any;
    },

    addExpertToWishlist: async (expertId: number): Promise<[any | null, ApiError | null]> => {
        return await api.post("/expert-like/add", { expertId }) as any;
    },

    removeExpertFromWishlist: async (expertId: number): Promise<[any | null, ApiError | null]> => {
        return await api.delete(`/expert-like/remove/${expertId}`) as any;
    },
    
    getPujaWishlist: async (): Promise<[any | null, ApiError | null]> => {
        return await api.get("/puja-like") as any;
    },

    addPujaToWishlist: async (pujaId: number): Promise<[any | null, ApiError | null]> => {
        return await api.post("/puja-like/add", { pujaId }) as any;
    },

    removePujaFromWishlist: async (pujaId: number): Promise<[any | null, ApiError | null]> => {
        return await api.delete(`/puja-like/remove/${pujaId}`) as any;
    },

    getMerchantWishlist: async (): Promise<[any | null, ApiError | null]> => {
        return await api.get("/merchant-like") as any;
    },

    addMerchantToWishlist: async (merchantId: number): Promise<[any | null, ApiError | null]> => {
        return await api.post("/merchant-like/add", { merchantId }) as any;
    },

    removeMerchantFromWishlist: async (merchantId: number): Promise<[any | null, ApiError | null]> => {
        return await api.delete(`/merchant-like/remove/${merchantId}`) as any;
    }
};
