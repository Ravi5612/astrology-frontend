import { createSafeFetchInstance } from '@repo/safe-fetch';
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from 'react-toastify';

/**
 * 🚀 Simplified API Client (Sushant Sir's Standard)
 * - Base URL: http://localhost:6543/api/v1 (Hardcoded for simplicity)
 * - Headers: JSON by default
 * - Credentials: included by default in safeFetch
 */
export const api = createSafeFetchInstance({
  baseUrl: 'http://localhost:6543/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeoutMs: 10_000,
  onError: async (error) => {
    // If backend rejects the token (Session Expired)
    if (error.status === 401) {
      if (typeof window !== 'undefined') {
        const logout = useAuthStore.getState().clientLogout;
        logout();
        toast.error("Session expired. Please login again.");
      }
    }
  }
});

export default api;
