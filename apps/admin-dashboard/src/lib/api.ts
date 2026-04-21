import { createSafeFetchInstance, ApiError } from "@repo/safe-fetch";

export { ApiError };

/**
 * 🚀 Simplified Admin API Client (Sushant Sir's Standard)
 * - Base URL: http://localhost:6543/api/v1 (Hardcoded for simplicity)
 * - Headers: JSON by default
 * - Credentials: included by default in safeFetch
 */
console.log("DEBUG: Initializing API with:", {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "fallback-localhost",
    isProduction: process.env.NODE_ENV === "production"
});

export const api = createSafeFetchInstance({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:6543/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  timeoutMs: 30_000,
});

export default api;
