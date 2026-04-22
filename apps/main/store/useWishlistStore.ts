import { create } from "zustand";
import { toast } from "react-toastify";
import { WishlistService } from "../services/wishlist.service";

export interface WishlistItem {
    id: number;
    productId?: number;
    expertId?: number;
    product?: {
        id: number;
        name: string;
        price: number;
        imageUrl?: string;
        image?: string;
        image_url?: string;
        description?: string;
        sale_price?: number;
        original_price?: number;
    };
    expert?: {
        id: number;
        user: {
            id: number;
            name: string;
            avatar?: string;
        };
        specialization: string;
        experience_in_years: number;
        rating: number;
        languages?: string[];
        price?: number;
        chat_price?: number;
        call_price?: number;
        video_call_price?: number;
        video?: string;
        is_available?: boolean;
        total_likes?: number;
    };
    puja?: {
        id: number;
        name: string;
        total_likes: number;
    };
    merchantId?: number;
    merchant?: {
        id: number;
        name: string;
        image?: string;
        city?: string;
    };
}

interface WishlistState {
    wishlistItems: WishlistItem[];
    expertWishlistItems: WishlistItem[];
    pujaWishlistItems: WishlistItem[];
    merchantWishlistItems: WishlistItem[];
    isLoading: boolean;

    // Actions
    fetchWishlist: (isClientAuthenticated: boolean) => Promise<void>;
    addToWishlist: (productId: number, isClientAuthenticated: boolean) => Promise<void>;
    removeFromWishlist: (productId: number) => Promise<void>;
    isInWishlist: (productId: number) => boolean;

    // Expert Actions
    addExpertToWishlist: (expertId: number, isClientAuthenticated: boolean) => Promise<void>;
    removeExpertFromWishlist: (expertId: number) => Promise<void>;
    isExpertInWishlist: (expertId: number) => boolean;
    toggleExpertWishlist: (expertId: number, isClientAuthenticated: boolean) => Promise<void>;

    // Puja Actions
    isPujaInWishlist: (pujaId: number) => boolean;
    togglePujaWishlist: (pujaId: number, isClientAuthenticated: boolean) => Promise<void>;

    // Merchant Actions
    isMerchantInWishlist: (merchantId: number) => boolean;
    addMerchantToWishlist: (merchantId: number, isClientAuthenticated: boolean) => Promise<void>;
    removeMerchantFromWishlist: (merchantId: number) => Promise<void>;
    toggleMerchantWishlist: (merchantId: number, isClientAuthenticated: boolean) => Promise<void>;

    // Reset
    resetWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
    wishlistItems: [],
    expertWishlistItems: [],
    pujaWishlistItems: [],
    merchantWishlistItems: [],
    isLoading: false,

    fetchWishlist: async (isClientAuthenticated: boolean) => {
        if (!isClientAuthenticated) {
            set({ wishlistItems: [], expertWishlistItems: [], pujaWishlistItems: [], merchantWishlistItems: [] });
            return;
        }

        set({ isLoading: true });
        try {
            const [[pData], [eData], [pujaData], [merchantData]] = await Promise.all([
                WishlistService.getWishlist(),
                WishlistService.getExpertWishlist(),
                WishlistService.getPujaWishlist(),
                WishlistService.getMerchantWishlist()
            ]);

            const pItems = (Array.isArray(pData) ? pData : ((pData as any)?.items || (pData as any)?.data || (pData as any)?.wishlist || [])).filter(Boolean);
            const eItems = (Array.isArray(eData) ? eData : ((eData as any)?.items || (eData as any)?.data || (eData as any)?.wishlist || [])).filter(Boolean);
            const pujaItems = (Array.isArray(pujaData) ? pujaData : ((pujaData as any)?.items || (pujaData as any)?.data || (pujaData as any)?.wishlist || [])).filter(Boolean);
            const mItems = (Array.isArray(merchantData) ? merchantData : ((merchantData as any)?.merchants || (merchantData as any)?.data || (merchantData as any)?.items || [])).filter(Boolean);

            set({
                wishlistItems: pItems,
                expertWishlistItems: eItems,
                pujaWishlistItems: pujaItems,
                merchantWishlistItems: mItems
            });
        } catch {
            // Silent fail — wishlist is non-critical
        } finally {
            set({ isLoading: false });
        }
    },

    addToWishlist: async (productId: number, isClientAuthenticated: boolean) => {
        if (!isClientAuthenticated) {
            toast.error("Please login to use wishlist");
            return;
        }

        try {
            await WishlistService.addToWishlist(productId);
            toast.success("Added to wishlist");
            await get().fetchWishlist(true);
        } catch (error: any) {
            if (error.status === 409) {
                toast.info("Already in wishlist");
                await get().fetchWishlist(true);
            } else {
                toast.error("Failed to add to wishlist");
            }
        }
    },

    removeFromWishlist: async (productId: number) => {
        try {
            await WishlistService.removeFromWishlist(productId);
            toast.success("Removed from wishlist");
            await get().fetchWishlist(true);
        } catch {
            toast.error("Failed to remove from wishlist");
        }
    },

    isInWishlist: (productId: number) => {
        const { wishlistItems } = get();
        return wishlistItems.some(item => (Number(item.productId) === Number(productId) || Number(item.product?.id) === Number(productId)));
    },

    addExpertToWishlist: async (expertId: number, isClientAuthenticated: boolean) => {
        if (!isClientAuthenticated) {
            toast.error("Please login to use wishlist");
            return;
        }

        try {
            await WishlistService.addExpertToWishlist(expertId);
            toast.success("Added to liked experts");
            await get().fetchWishlist(true);
        } catch (error: any) {
            if (error.status === 409) {
                toast.info("Already in liked list");
                await get().fetchWishlist(true);
            } else {
                toast.error("Failed to add to liked list");
            }
        }
    },

    removeExpertFromWishlist: async (expertId: number) => {
        try {
            await WishlistService.removeExpertFromWishlist(expertId);
            toast.success("Removed from liked list");
            await get().fetchWishlist(true);
        } catch {
            toast.error("Failed to remove from liked list");
        }
    },

    isExpertInWishlist: (expertId: number) => {
        const { expertWishlistItems } = get();
        return expertWishlistItems.some(item =>
            item != null && (
                Number(item.expertId) === Number(expertId) ||
                Number(item.expert?.id) === Number(expertId) ||
                (item.expert?.user && Number((item.expert.user as any).id) === Number(expertId))
            )
        );
    },

    toggleExpertWishlist: async (expertId: number, isClientAuthenticated: boolean) => {
        const { isExpertInWishlist, removeExpertFromWishlist, addExpertToWishlist } = get();
        if (isExpertInWishlist(expertId)) {
            await removeExpertFromWishlist(expertId);
        } else {
            await addExpertToWishlist(expertId, isClientAuthenticated);
        }
    },

    isPujaInWishlist: (pujaId: number) => {
        const { pujaWishlistItems } = get();
        return pujaWishlistItems.some(item => (Number((item as any).pujaId) === Number(pujaId) || Number((item as any).puja?.id) === Number(pujaId)));
    },

    togglePujaWishlist: async (pujaId: number, isClientAuthenticated: boolean) => {
        const { isPujaInWishlist, fetchWishlist } = get();
        if (!isClientAuthenticated) {
            toast.error("Please login to like puja");
            return;
        }

        try {
            if (isPujaInWishlist(pujaId)) {
                await WishlistService.removePujaFromWishlist(pujaId);
                toast.success("Removed from liked pujas");
            } else {
                await WishlistService.addPujaToWishlist(pujaId);
                toast.success("Added to liked pujas");
            }
            await fetchWishlist(true);
        } catch (error: any) {
            if (error.status === 409) {
                toast.info("Already liked");
                await fetchWishlist(true);
            } else {
                toast.error("Failed to update liked pujas");
            }
        }
    },

    isMerchantInWishlist: (merchantId: number) => {
        const { merchantWishlistItems } = get();
        return merchantWishlistItems.some(item =>
            item != null && (
                Number(item.merchantId) === Number(merchantId) ||
                Number(item.merchant?.id) === Number(merchantId) ||
                Number(item.id) === Number(merchantId) // Backend might return direct merchant objects
            )
        );
    },

    addMerchantToWishlist: async (merchantId: number, isClientAuthenticated: boolean) => {
        if (!isClientAuthenticated) {
            toast.error("Please login to like this store");
            return;
        }

        try {
            await WishlistService.addMerchantToWishlist(merchantId);
            toast.success("Store added to your favorites");
            await get().fetchWishlist(true);
        } catch (error: any) {
            if (error.status === 409) {
                toast.info("Already in your favorites");
                await get().fetchWishlist(true);
            } else {
                toast.error("Failed to like store");
            }
        }
    },

    removeMerchantFromWishlist: async (merchantId: number) => {
        try {
            await WishlistService.removeMerchantFromWishlist(merchantId);
            toast.success("Store removed from favorites");
            await get().fetchWishlist(true);
        } catch {
            toast.error("Failed to unlike store");
        }
    },

    toggleMerchantWishlist: async (merchantId: number, isClientAuthenticated: boolean) => {
        const { isMerchantInWishlist, removeMerchantFromWishlist, addMerchantToWishlist } = get();
        if (isMerchantInWishlist(merchantId)) {
            await removeMerchantFromWishlist(merchantId);
        } else {
            await addMerchantToWishlist(merchantId, isClientAuthenticated);
        }
    },

    resetWishlist: () => {
        set({ wishlistItems: [], expertWishlistItems: [], pujaWishlistItems: [], merchantWishlistItems: [] });
    }
}));
