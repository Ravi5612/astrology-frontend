import http, { SafeFetchResponse } from "../lib/fetch-handler";

export const WishlistService = {

    getWishlist: async (): Promise<SafeFetchResponse<any>> => {
        return await http.get("/product-like");
    },

    addToWishlist: async (productId: number): Promise<SafeFetchResponse<any>> => {
        return await http.post("/product-like/add", { productId });
    },

    removeFromWishlist: async (productId: number): Promise<SafeFetchResponse<any>> => {
        return await http.del(`/product-like/remove/${productId}`);
    },

    getExpertWishlist: async (): Promise<SafeFetchResponse<any>> => {
        return await http.get("/expert-like");
    },

    addExpertToWishlist: async (expertId: number): Promise<SafeFetchResponse<any>> => {
        return await http.post("/expert-like/add", { expertId });
    },

    removeExpertFromWishlist: async (expertId: number): Promise<SafeFetchResponse<any>> => {
        return await http.del(`/expert-like/remove/${expertId}`);
    },
    
    getPujaWishlist: async (): Promise<SafeFetchResponse<any>> => {
        return await http.get("/wishlist/puja");
    },

    togglePujaWishlist: async (pujaId: number): Promise<SafeFetchResponse<any>> => {
        return await http.post(`/wishlist/puja/${pujaId}/toggle`);
    }
};
