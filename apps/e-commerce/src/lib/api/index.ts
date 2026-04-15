import { createSafeFetchInstance, ApiError } from '@repo/safe-fetch';

/**
 * 🚀 Standardized API Client (Merchant E-Commerce Dashboard)
 * - Base URL: http://localhost:6543/api/v1 (Hardcoded for simplicity)
 * - Headers: JSON by default
 * - Credentials: included by default in safeFetch
 * - Silent Refresh: Automatically handles 401s by calling /auth/refresh
 */
const baseApi = createSafeFetchInstance({
  baseUrl: 'http://localhost:6543/api/v1',
  credentials: 'include',
  timeoutMs: 15_000,
});

// Prevent infinite refresh loops
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const handleRefresh = async (): Promise<boolean> => {
    if (isRefreshing && refreshPromise) return refreshPromise;
    
    isRefreshing = true;
    refreshPromise = (async () => {
        try {
            const [data, error] = await baseApi.post('/auth/refresh');
            return !error;
        } catch (err) {
            return false;
        } finally {
            isRefreshing = false;
            refreshPromise = null;
        }
    })();
    
    return refreshPromise;
};

// Wrapper function to handle 401 and retry
const requestWrapper = async <T>(method: any, url: string, ...args: any[]): Promise<[T | null, ApiError | null]> => {
    const [data, error] = await method(url, ...args);

    // If 401 Unauthorized
    if (error?.status === 401) {
        const isAuthRequest = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
        const isAlreadyOnLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';

        // Don't attempt refresh if it's already an auth request or if we are already on the login page
        if (isAuthRequest || isAlreadyOnLoginPage) {
            return [data, error];
        }

        console.warn(`[API] 401 Unauthorized on ${url}. Attempting silent refresh...`);
        
        const success = await handleRefresh();
        if (success) {
            console.log(`[API] Refresh successful. Retrying ${url}...`);
            return method(url, ...args); // Retry original request
        }

        console.error(`[API] Refresh failed. Redirecting to login.`);
        if (typeof window !== 'undefined') {
            // Important: only redirect if not already there to prevent loops
            if (window.location.pathname !== '/login') {
                window.location.href = '/login?session_expired=true';
            }
        }
    }

    return [data, error];
};

export const api = {
    get: <T>(url: string, init?: any) => requestWrapper<T>(baseApi.get, url, init),
    post: <T>(url: string, body?: any, init?: any) => requestWrapper<T>(baseApi.post, url, body, init),
    put: <T>(url: string, body?: any, init?: any) => requestWrapper<T>(baseApi.put, url, body, init),
    patch: <T>(url: string, body?: any, init?: any) => requestWrapper<T>(baseApi.patch, url, body, init),
    delete: <T>(url: string, init?: any) => requestWrapper<T>(baseApi.delete, url, init),
    // Standard function call also works
    request: <T>(url: string, init?: any) => requestWrapper<T>(baseApi, url, init),
};

export { ApiError };
export default api;
