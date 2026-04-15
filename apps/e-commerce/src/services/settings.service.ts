import { api } from "@/lib/api";

/**
 * Service for Merchant Shop Profile Settings
 */
export const settingsService = {
  /**
   * Fetch the currently logged-in merchant's profile
   */
  getProfile: async () => {
    const [data, error] = await api.get<any>('/merchant/profile');
    // The backend now returns { success: true, exists: boolean, data: { ... } }
    return [data, error];
  },

  /**
   * Update the merchant's profile
   * @param formData Profile data including potential image/video files
   */
  updateProfile: async (formData: FormData) => {
    // We use .patch (as per our backend plan) and pass FormData directly
    // safe-fetch will handle the multipart headers automatically if it's FormData
    const [data, error] = await api.patch<any>('/merchant/profile', formData);
    return [data?.data || data, error];
  },

  /**
   * Specifically toggle the online status via JSON
   */
  updateOnlineStatus: async (isOnline: boolean) => {
    const [data, error] = await api.patch<any>('/merchant/profile', { isOnline });
    return [data?.data || data, error];
  },

  /**
   * Fetch all products for the logged-in merchant
   */
  getProducts: async () => {
    const [data, error] = await api.get<any>('/merchant/products');
    console.log('Merchant Products API Response:', data);
    // Usually returns { data: [...] } or { data: { data: [...] } }
    return [data?.data?.data || data?.data || data, error];
  }
};
