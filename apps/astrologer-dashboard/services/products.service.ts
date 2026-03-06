export interface Product {
    id?: string;
    _id?: string;
    name: string;
    shortDescription?: string;
    description: string;
    price: number;
    originalPrice: number;
    stock?: number;
    imageUrl: string;
    isActive?: boolean;
}

const fromApiProduct = (raw: any): Product => ({
    id: String(raw?.id ?? raw?._id ?? ""),
    name: raw?.name || "",
    shortDescription: raw?.short_description || raw?.shortDescription || "",
    description: raw?.description || "",
    price: Number(raw?.price ?? 0),
    originalPrice: Number(raw?.original_price ?? raw?.originalPrice ?? 0),
    stock: Number(raw?.stock ?? 0),
    imageUrl: raw?.image_url || raw?.imageUrl || raw?.image || "",
    isActive: raw?.is_active ?? raw?.isActive ?? true,
});

const normalizeFormData = (input: FormData) => {
    const out = new FormData();
    for (const [key, value] of input.entries()) {
        if (key === "originalPrice") { out.append("original_price", value); continue; }
        if (key === "shortDescription") { out.append("short_description", value); continue; }
        if (key === "imageUrl") { out.append("image_url", value); continue; }
        if (key === "isActive") { out.append("is_active", value); continue; }
        out.append(key, value);
    }
    return out;
};

const getCookie = (name: string) => {
    if (typeof document === "undefined") return undefined;
    const v = `; ${document.cookie}`;
    const parts = v.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const authHeaders = (): Record<string, string> => {
    const token = getCookie("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Expert-specific base path — all routes require 'expert' role JWT
const BASE = "/api/v1/expert/products";

export const ProductService = {
    /** Fetch only this expert's own products */
    getProducts: async (): Promise<Product[]> => {
        const res = await fetch(BASE, { headers: authHeaders() });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (Array.isArray(data)) return data.map(fromApiProduct);
        if (Array.isArray(data?.data)) return (data.data as any[]).map(fromApiProduct);
        return [];
    },

    /** Create a new product under this expert */
    createProduct: async (fd: FormData): Promise<any> => {
        const res = await fetch(BASE, {
            method: "POST",
            headers: authHeaders(),
            body: normalizeFormData(fd),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to create product");
        }
        return res.json();
    },

    /** Update an existing product */
    updateProduct: async (id: string, fd: FormData): Promise<any> => {
        const res = await fetch(`${BASE}/${id}`, {
            method: "PATCH",
            headers: authHeaders(),
            body: normalizeFormData(fd),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to update product");
        }
        return res.json();
    },

    /** Delete a product */
    deleteProduct: async (id: string): Promise<any> => {
        const res = await fetch(`${BASE}/${id}`, {
            method: "DELETE",
            headers: authHeaders(),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Failed to delete product");
        }
        return res.json();
    },
};
