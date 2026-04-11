import { createSafeFetchInstance } from '@repo/safe-fetch';
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from 'react-toastify';

/**
 * 🚀 Simplified API Client (Sushant Sir's Standard)
 * - Base URL: http://localhost:6543/api/v1 (Hardcoded for simplicity)
 * - Headers: JSON by default
 * - Credentials: included by default in safeFetch
 */
const getBaseUrl = () => {
  // 1. Server-side: MUST use absolute URL (otherwise fetch fails)
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6543/api/v1';
  }
  
  // 2. Client-side: ALWAYS use relative path to utilize Next.js rewrites/proxy.
  // This bypasses CSP blocks because the request is sent to the "same origin".
  return '/api/v1';
};

export const api = createSafeFetchInstance({
  baseUrl: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeoutMs: 10_000,
  onError: async (error) => {
    // If backend rejects the token (Session Expired)
    if (error.status === 401) {
      if (typeof window !== 'undefined') {
        const state = useAuthStore.getState();
        // Only trigger logout if the user was theoretically authenticated
        // This prevents the infinite loop on initial load when refreshAuth fails with 401
        if (state.isClientAuthenticated) {
            state.clientLogout();
            toast.error("Session expired. Please login again.");
        }
      }
    }
  }
});

export default api;
