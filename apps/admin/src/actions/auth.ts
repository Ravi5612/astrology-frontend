"use server";

import { cookies } from "next/headers";
import { createSafeFetchInstance } from "@repo/safe-fetch";
import { getErrorMessage } from "@repo/lib";

export const api = createSafeFetchInstance({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:6543/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  timeoutMs: 30_000,
});

export async function adminLoginAction(formData: any) {
    const [data, error] = await api.post<any>(`/auth/email/login`, formData);

    if (error) {
        return { error: getErrorMessage(error) };
    }

    // Admin role check — supports both new JWT (role) and legacy (roles[])
    const isAdmin =
        data?.user?.role === 'admin' ||
        data?.user?.roles?.some(
            (r: any) => (typeof r === 'string' ? r : r.name).toUpperCase() === "ADMIN"
        );

    if (!isAdmin) {
        return { error: "Access denied: Not an administrator" };
    }

    // Set httpOnly cookies
    const cookieStore = await cookies();

    if (data.accessToken) {
        cookieStore.set("accessToken", data.accessToken, {
            httpOnly: true,
            secure: true, // Required for SameSite=None
            sameSite: "none", // Allow cross-domain cookies
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    }

    if (data.refreshToken) {
        cookieStore.set("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    return { success: true, user: data.user };
}

export async function adminLogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("adminAccessToken"); // Cleanup legacy
    cookieStore.delete("adminRefreshToken"); // Cleanup legacy
    return { success: true };
}
