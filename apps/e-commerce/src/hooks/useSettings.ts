import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "@/services/settings.service";
import { toast } from "react-toastify";

/**
 * Hook to fetch merchant profile settings
 */
export const useMerchantProfile = () => {
  return useQuery({
    queryKey: ['merchant-profile'],
    queryFn: async () => {
      const [data, error] = await settingsService.getProfile();
      if (error) {
        const message = (error as any).message || "Failed to fetch profile";
        throw new Error(message);
      }
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to update merchant profile settings
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const [data, error] = await settingsService.updateProfile(formData);
      if (error) {
        const message = (error as any).message || "Failed to update profile";
        throw new Error(message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['merchant-profile'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};

/**
 * Hook to fetch merchant's products
 */
export const useMerchantProducts = () => {
  return useQuery({
    queryKey: ['merchant-products'],
    queryFn: async () => {
      const [data, error] = await settingsService.getProducts();
      if (error) {
        const message = (error as any).message || "Failed to fetch products";
        throw new Error(message);
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
