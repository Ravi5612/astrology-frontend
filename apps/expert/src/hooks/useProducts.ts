import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/products.service";
import { Product } from "@/types/product";
import { toast } from "react-toastify";
import { getErrorMessage } from "@repo/lib";

export const useProducts = () => {
    const queryClient = useQueryClient();

    // 1. Fetch Products Query
    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: () => ProductService.getProducts(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // 2. Create Product Mutation
    const createMutation = useMutation({
        mutationFn: (formData: FormData) => ProductService.createProduct(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product created successfully!");
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error) || "Failed to create product");
        },
    });

    // 3. Update Product Mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            ProductService.updateProduct(id, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product updated successfully!");
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error) || "Failed to update product");
        },
    });

    // 4. Delete Product Mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => ProductService.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted successfully!");
        },
        onError: (error: Error) => {
            toast.error(getErrorMessage(error) || "Failed to delete product");
        },
    });

    return {
        products: productsQuery.data || [],
        isLoading: productsQuery.isLoading,
        isRefetching: productsQuery.isRefetching,
        error: productsQuery.error,
        createProduct: createMutation.mutateAsync,
        updateProduct: updateMutation.mutateAsync,
        deleteProduct: deleteMutation.mutateAsync,
        isSubmitting: createMutation.isPending || updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
};
