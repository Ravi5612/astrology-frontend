import { createSafeFetchInstance, ApiError } from '@repo/safe-fetch';

export { ApiError };

/**
 * 🚀 Standardized API Client (Expert Dashboard)
 * - Base URL: http://localhost:6543/api/v1 (Hardcoded for simplicity)
 * - Headers: JSON by default
 * - Credentials: included by default in safeFetch
 */
const IS_SERVER = typeof window === 'undefined';
const API_BASE = IS_SERVER 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6543/api/v1') 
  : '/api/v1';

export const api = createSafeFetchInstance({
  baseUrl: API_BASE,
  headers: {
    // Content-Type: 'application/json' removed to allow FormData requests
    // Standard JSON requests will still work if the library or fetch handles them.
  },
  timeoutMs: 10_000,
});

export default api;
