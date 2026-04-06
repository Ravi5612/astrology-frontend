"use server";

import { cookies } from "next/headers";
import { api } from "@/lib/api";

export async function merchantLoginAction(formData: any) {
    const [data, error] = await api.post<any>('/auth/merchant/login', formData);

    if (error) {
        return { error: error.body?.error || error.body?.message || error.message || "Login failed" };
    }

    // Token existence check
    const accessToken = data.accessToken || data.token;
    const refreshToken = data.refreshToken;

    if (!accessToken) {
        return { error: "No access token received" };
    }

    // Set httpOnly cookies
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (refreshToken) {
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });
    }

    return { success: true, user: data.user };
}

export async function setAuthCookies(accessToken: string, refreshToken?: string) {
    const cookieStore = await cookies();
    
    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    if (refreshToken) {
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });
    }
    
    return { success: true };
}

export async function merchantRegisterAction(formData: any) {
    const [data, error] = await api.post<any>('/auth/merchant/register', formData);

    if (error) {
        return { error: error.body?.error || error.body?.message || error.message || "Registration failed" };
    }

    return { success: true, message: data.message || "Registration successful." };
}

export async function merchantLogoutAction() {
    try {
        await api.post<any>('/auth/merchant/logout');
    } catch (err) {
        console.error("Backend logout failed, proceeding with local cleanup:", err);
    }
    
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return { success: true };
}

export async function merchantForgotPasswordAction(email: string) {
    const [data, error] = await api.post<any>(`/auth/merchant/forgot-password`, { email });

    if (error) {
        return { error: error.body?.error || error.body?.message || error.message || "Failed to send reset link" };
    }

    return { success: true, message: data.message || "Password reset link sent successfully" };
}
