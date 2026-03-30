import { safeFetch, type ApiError } from "../../../packages/safe-fetch/index";
export type { ApiError };
import { BACKEND_URL } from "./config";

const isServer = typeof window === "undefined";

function isPublicAuthPath(): boolean {
    if (typeof window === "undefined") return false;
    const path = window.location.pathname;
    return path === "/" || path === "/sign-up" || path === "/forgot-password";
}

function buildUrl(path: string): string {
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (isServer) {
        const base = (BACKEND_URL || "").replace(/\/+$/, "").replace(/\/api\/v1\/?$/i, "");
        return `${base}/api/v1${cleanPath}`;
    }
    return `/api/v1${cleanPath}`;
}

async function request<T>(path: string, options: any = {}): Promise<[T | null, ApiError | null]> {
    const { method = "GET", body = null, headers = {}, timeoutMs = 10000 } = options;
    const url = buildUrl(path);

    const [data, error] = await safeFetch<T>(url, {
        method,
        credentials: "include",
        headers: {
            ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
            ...headers,
        },
        ...(body ? { body: body instanceof FormData ? body : JSON.stringify(body) } : {}),
        timeoutMs,
    } as any);

    if (error && (error as any)?.status === 401) {
        const backendMessage = (error as any)?.body?.message || (error as any)?.data?.message;
        if (backendMessage && typeof backendMessage === "string" && !isPublicAuthPath()) {
            if (!isServer) {
                import("react-toastify").then(({ toast }) => {
                    toast.error(backendMessage, { toastId: "auth-error" });
                }).catch(() => { });
            }
        }
    }

    return [data, error];
}

/**
 * Standard fetch options for our backend.
 */
export const apiClientSafe = {
    get: <T>(path: string, options?: any) => request<T>(path, { ...options, method: 'GET' }),
    post: <T>(path: string, body?: any, options?: any) => request<T>(path, { ...options, method: 'POST', body }),
    put: <T>(path: string, body?: any, options?: any) => request<T>(path, { ...options, method: 'PUT', body }),
    patch: <T>(path: string, body?: any, options?: any) => request<T>(path, { ...options, method: 'PATCH', body }),
    delete: <T>(path: string, options?: any) => request<T>(path, { ...options, method: 'DELETE' }),
    upload: <T>(path: string, body: FormData, options?: any) => request<T>(path, { ...options, method: 'POST', body }),
};


export default apiClientSafe;
