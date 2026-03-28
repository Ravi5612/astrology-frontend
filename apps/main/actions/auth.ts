"use server";

import { cookies } from "next/headers";
import safeFetch from "@packages/safe-fetch/safeFetch";
import { API_CONFIG } from "@/lib/api-config";

import {
  LoginFormData,
  RegisterFormData,
  AuthResponse,
  AuthActionResponse
} from "@/lib/types";

// ─────────────────────────────────────────────────────────
// LOGIN — Calls backend via safeFetch (Server-Side Only)
// Credentials NEVER appear in the browser Network tab.
// ─────────────────────────────────────────────────────────
export async function loginAction(formData: LoginFormData): Promise<AuthActionResponse> {
  const [data, error] = await safeFetch<AuthResponse>(API_CONFIG.AUTH.LOGIN.url, {
    method: API_CONFIG.AUTH.LOGIN.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (error) {
    return {
      error:
        error.body?.message ||
        error.message ||
        "Login failed. Please check your credentials.",
    };
  }

  // Set HttpOnly cookies on the server — JS on browser can NEVER read these
  const cookieStore = await cookies();

  if (data?.accessToken) {
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  if (data?.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return { success: true, user: data?.user };
}

// ─────────────────────────────────────────────────────────
// LOGOUT — Clears HttpOnly cookies server-side
// ─────────────────────────────────────────────────────────
export async function logoutAction(): Promise<AuthActionResponse> {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return { success: true };
}

// ─────────────────────────────────────────────────────────
// REGISTER — Calls backend via safeFetch (Server-Side Only)
// ─────────────────────────────────────────────────────────
export async function registerAction(registerData: RegisterFormData): Promise<AuthActionResponse> {
  const [data, error] = await safeFetch<AuthResponse>(
    API_CONFIG.AUTH.REGISTER.url,
    {
      method: API_CONFIG.AUTH.REGISTER.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    },
  );

  if (error) {
    return {
      error:
        error.body?.message ||
        error.message ||
        "Registration failed. Please try again.",
    };
  }

  return {
    success: true,
    message:
      data?.message || "Registration successful! Please verify your email.",
  };
}

// ─────────────────────────────────────────────────────────
// VERIFY EMAIL — Calls backend, sets cookies on success
// ─────────────────────────────────────────────────────────
export async function verifyEmailAction(token: string): Promise<AuthActionResponse> {
  const [data, error] = await safeFetch<AuthResponse>(
    `${API_CONFIG.AUTH.VERIFY_EMAIL.url}?token=${encodeURIComponent(token)}`,
    {
      method: API_CONFIG.AUTH.VERIFY_EMAIL.method,
      headers: { "Content-Type": "application/json" },
    },
  );

  if (error) {
    return {
      error:
        error.body?.message ||
        error.message ||
        "Verification failed. The link might be expired.",
    };
  }

  // Set HttpOnly cookies on the server
  const cookieStore = await cookies();

  if (data?.accessToken) {
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }

  if (data?.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  return { success: true, user: data?.user, message: data?.message };
}

