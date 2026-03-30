import http, { SafeFetchResponse } from "../lib/fetch-handler";

export const CartService = {
    getCart: async (): Promise<SafeFetchResponse<any>> => {
        return await http.get("/cart", {
            headers: { "Cache-Control": "no-cache" }
        });
    },

    addToCart: async (productId: number, quantity: number): Promise<SafeFetchResponse<any>> => {
        return await http.post("/cart/add", { productId, quantity });
    },

    updateQuantity: async (productId: number, quantity: number): Promise<SafeFetchResponse<any>> => {
        return await http.put("/cart/update", { productId, quantity });
    },

    removeFromCart: async (productId: number): Promise<SafeFetchResponse<any>> => {
        return await http.del(`/cart/remove/${productId}`);
    }
};
