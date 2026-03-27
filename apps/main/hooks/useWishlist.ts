import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWishlistStore } from "@/store/useWishlistStore";
import { WishlistService } from "../services/wishlist.service";
import { toast } from "react-toastify";

export type WishlistType = "expert" | "product";

export const useWishlist = () => {
    const queryClient = useQueryClient();

    const toggleLikeMutation = useMutation({
        mutationFn: async ({
            id,
            type,
            isLiked,
        }: {
            id: number;
            type: WishlistType;
            isLiked: boolean;
        }) => {
            if (type === "expert") {
                return isLiked
                    ? WishlistService.removeExpertFromWishlist(id)
                    : WishlistService.addExpertToWishlist(id);
            } else {
                return isLiked
                    ? WishlistService.removeFromWishlist(id)
                    : WishlistService.addToWishlist(id);
            }
        },
        // Optimistic Update
        onMutate: async ({ id, type, isLiked }) => {
            // Cancel outgoing refetches
            const queryKey = type === "expert" ? ["wishlist", "experts"] : ["wishlist", "products"];
            await queryClient.cancelQueries({ queryKey });

            // Snapshot previous values
            const store = useWishlistStore.getState();
            const previousState = {
                expertWishlistItems: store.expertWishlistItems,
                wishlistItems: store.wishlistItems,
            };

            // Optimistically update Zustand store
            if (type === "expert") {
                if (isLiked) {
                    useWishlistStore.setState((state) => ({
                        expertWishlistItems: state.expertWishlistItems.filter(
                            (item) => Number(item.expertId || item.expert?.id) !== Number(id)
                        ),
                    }));
                } else {
                    useWishlistStore.setState((state) => ({
                        expertWishlistItems: [...state.expertWishlistItems, { expertId: id, expert: { id } } as any],
                    }));
                }
            } else {
                if (isLiked) {
                    useWishlistStore.setState((state) => ({
                        wishlistItems: state.wishlistItems.filter(
                            (item) => Number(item.productId || item.product?.id) !== Number(id)
                        ),
                    }));
                } else {
                    useWishlistStore.setState((state) => ({
                        wishlistItems: [...state.wishlistItems, { productId: id, product: { id } } as any],
                    }));
                }
            }

            return { previousState };
        },
        onError: (err, variables, context) => {
            if (context?.previousState) {
                useWishlistStore.setState(context.previousState);
            }
        },
        onSettled: (data, error, variables) => {
            const queryKey = variables.type === "expert" ? ["wishlist", "experts"] : ["wishlist", "products"];
            queryClient.invalidateQueries({ queryKey });
            // Sync store
            useWishlistStore.getState().fetchWishlist(true);
        },
    });

    return {
        toggleLike: toggleLikeMutation.mutate,
        isPending: toggleLikeMutation.isPending,
    };
};
