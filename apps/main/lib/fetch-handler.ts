import safeFetch, { ApiError } from "@packages/safe-fetch/safeFetch";
import { getBasePath } from "../utils/api-config";

const isServer = typeof window === "undefined";

/**
 * Builds the appropriate URL based on the environment (Server vs Client).
 */
function buildUrl(path: string): string {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const apiPath = normalizedPath.startsWith("/api/v1") ? normalizedPath : `/api/v1${normalizedPath}`;

    if (isServer) {
        return `${getBasePath()}${apiPath}`;
    }
    return apiPath;
}

// deduplication state for token refresh
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * Standard fetch options for our backend.
 */
interface FetchOptions extends Omit<RequestInit, "body"> {
    body?: any;
    timeoutMs?: number;
    _retry?: boolean;
}

export type SafeFetchResponse<T> = [T | null, ApiError | null];

/**
 * The core wrapper that handles authentication, URL building, and token refresh.
 */
async function fetchWithAuth<T>(path: string, options: FetchOptions = {}): Promise<SafeFetchResponse<T>> {
    const { body, _retry = false, ...rest } = options;
    const url = buildUrl(path);

    const fetchOptions: any = {
        credentials: "include",
        headers: {
            ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
            ...(rest.headers || {}),
        },
        ...rest,
    };

    if (body) {
        fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    try {
        const [data, error] = await safeFetch<T>(url, fetchOptions);

        if (error) {
            // Handle Token Refresh (401)
            if (error.status === 401 && !_retry) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    const refreshUrl = buildUrl("/auth/refresh"); // Standard endpoint
                    refreshPromise = safeFetch(refreshUrl, {
                        method: "POST",
                        credentials: "include",
                    } as any).then(([, refreshError]) => {
                        isRefreshing = false;
                        refreshPromise = null;
                        return !refreshError;
                    });
                }

                const refreshSuccess = await refreshPromise;
                if (refreshSuccess) {
                    return fetchWithAuth<T>(path, { ...options, _retry: true });
                }
            }
            
            console.error(`[API ERROR] ${options.method || "GET"} ${path}`, error.body?.message || error.message, error);
            return [null, error];
        }

        return [data as T, null];
    } catch (err: any) {
        const networkError = new ApiError(0, err.message || "Network Error");
        console.error(`[API FATAL] ${options.method || "GET"} ${path}`, networkError);
        return [null, networkError];
    }
}

/**
 * Helper methods for common HTTP verbs.
 */
export const apiClientSafe = {
    get: <T>(path: string, opts?: FetchOptions) => 
        fetchWithAuth<T>(path, { ...opts, method: "GET" }),
    
    post: <T>(path: string, body?: any, opts?: FetchOptions) => 
        fetchWithAuth<T>(path, { ...opts, method: "POST", body }),
    
    put: <T>(path: string, body?: any, opts?: FetchOptions) => 
        fetchWithAuth<T>(path, { ...opts, method: "PUT", body }),
    
    patch: <T>(path: string, body?: any, opts?: FetchOptions) => 
        fetchWithAuth<T>(path, { ...opts, method: "PATCH", body }),
    
    del: <T>(path: string, opts?: FetchOptions) => 
        fetchWithAuth<T>(path, { ...opts, method: "DELETE" }),
};

export default apiClientSafe;

