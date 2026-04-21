import { createSafeFetchInstance, ApiError } from "@repo/safe-fetch";

export { ApiError };

/**
 * 🚀 Simplified Admin API Client (Sushant Sir's Standard)
 * - SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '') : "http://localhost:6543");
 * - Headers: JSON by default
 * - Credentials: included by default in safeFetch
 */
// For client-side requests, use relative path to trigger Next.js rewrites (same-domain)
// For server-side, use the full API URL
const isServer = typeof window === "undefined";
const BASE_URL = isServer 
  ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:6543/api/v1")
  : "/api/v1";

console.log(`DEBUG: Initializing API (isServer: ${isServer}) with baseUrl: ${BASE_URL}`);

export const api = createSafeFetchInstance({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  timeoutMs: 30_000,
});

export default api;
