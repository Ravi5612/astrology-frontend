import { api } from "@/lib/api";

/**
 * Service for Merchant Shop Profile Settings
 */
export const settingsService = {
  /**
   * Fetch the currently logged-in merchant's profile
   */
  getProfile: async () => {
    const [response, error] = await api.get<any>('/merchant/profile');
    return [response?.data || null, error];
  },

  /**
   * Update the merchant's profile
   * @param formData Profile data including potential image/video files
   */
  updateProfile: async (formData: FormData) => {
    const [response, error] = await api.patch<any>('/merchant/profile', formData);
    return [response?.data || null, error];
  },

  updateOnlineStatus: async (isOnline: boolean) => {
    const [response, error] = await api.patch<any>('/merchant/profile', { isOnline });
    return [response?.data || null, error];
  },

};
