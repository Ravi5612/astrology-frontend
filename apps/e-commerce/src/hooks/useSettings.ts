import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsService } from "@/services/settings.service";
import { toast } from "react-toastify";

/**
 * Hook to fetch merchant profile settings
 */
export const useMerchantProfile = (options = {}) => {
  return useQuery({
    queryKey: ['merchant-profile'],
    queryFn: async () => {
      const [data, error] = await settingsService.getProfile();
      if (error) {
        const body = (error as any).body;
        const message = body?.message 
          ? (Array.isArray(body.message) ? body.message[0] : body.message)
          : (error as any).message || "Failed to fetch profile";
        throw new Error(message);
      }
      return {
        profile: data?.data,
        exists: data?.exists ?? false
      };
    },
    staleTime: 0, // Ensure real-time status updates are reflected
    ...options
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
        const body = (error as any).body;
        const message = body?.message 
          ? (Array.isArray(body.message) ? body.message[0] : body.message)
          : (error as any).message || "Failed to update profile";
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
 * Hook to toggle merchant online status
 */
export const useUpdateOnlineStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isOnline: boolean) => {
      console.log(`📤 Sending Online Toggle: ${isOnline}`);
      const [data, error] = await settingsService.updateOnlineStatus(isOnline);
      if (error) {
        console.error("❌ Online Toggle API Error:", error);
        const body = (error as any).body;
        const message = body?.message 
          ? (Array.isArray(body.message) ? body.message[0] : body.message)
          : (error as any).message || "Failed to update online status";
        throw new Error(message);
      }
      console.log("✅ Online Toggle API Success:", data);
      return data;
    },
    onSuccess: (_, isOnline) => {
      toast.success(`You are now ${isOnline ? 'Online' : 'Offline'}`);
      queryClient.invalidateQueries({ queryKey: ["merchant-profile"] });
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
        const body = (error as any).body;
        const message = body?.message 
          ? (Array.isArray(body.message) ? body.message[0] : body.message)
          : (error as any).message || "Failed to fetch products";
        throw new Error(message);
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
