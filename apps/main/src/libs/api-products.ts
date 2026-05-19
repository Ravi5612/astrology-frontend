import { Product } from "@/lib/types";
import { api } from "@/lib/api";


const normalizeProduct = (raw: any): Product => {
    return {
        id: raw?.id || raw?._id,
        _id: raw?._id,
        name: raw?.name || "",
        description: raw?.description || "",
        price: Number(raw?.price || 0),
        originalPrice: Number(raw?.originalPrice || 0),
        imageUrl: raw?.imageUrl || "",
        percentageOff: Number(raw?.percentageOff || 0),
    };
};

export const getProducts = async (): Promise<Product[]> => {
    try {
        const [data, error] = await api.get("/products", {} as any);

        if (error) {
            console.error("Failed to fetch products:", error);
            return [];
        }

        const raw: any = data;
        if (Array.isArray(raw)) {
            return raw.map(normalizeProduct);
        } else if (raw?.data && Array.isArray(raw.data)) {
            return raw.data.map(normalizeProduct);
        }

        return [];
    } catch (error) {
        console.error("Backend not reachable:", error);
        return [];
    }
};


