"use client";

import React, { useState, useCallback, FormEvent } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { loginAction } from "@/actions/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { API_CONFIG } from "@/lib/api-config";

const Image = NextImage as any;
const Link = NextLink as any;

const SignInForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clientLogin } = useAuthStore();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  React.useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const message = errorParam === "google_auth_failed" ? "Google login failed." : decodeURIComponent(errorParam);
      toast.error(message);
      // Clean up URL
      router.replace(window.location.pathname);
    }
  }, [searchParams, router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required.");
      return;
    }

    setIsLoading(true);

    try {
      // Use Server Action
      const result = await loginAction(formData);

      if (result.error) {
        toast.error(result.error);
      } else if (result.success) {
        // Cookie already set as HttpOnly by the Server Action
        // Just update the Zustand UI state — NO token passed to client
        clientLogin(result.user);

        toast.success("Sign In successful!");
        // Redirect to callback URL or profile page
        router.push(callbackUrl);
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth — browser handles cookie automatically
    const safeCallback = (!callbackUrl || callbackUrl === "undefined") ? "/profile" : callbackUrl;
    const redirectUri = new URL(
      safeCallback,
      globalThis.window.location.origin,
    ).toString();
    const googleLoginUrl = `${API_CONFIG.AUTH.GOOGLE_LOGIN.url}?role=client&redirect_uri=${encodeURIComponent(redirectUri)}`;
    globalThis.window.location.href = googleLoginUrl;
  };

  return (
    <div className="w-full max-w-[480px] mx-auto bg-white rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-6 md:p-10 mt-0 mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-50">
        <div>
          <h6 className="text-gray-400 text-[10px] uppercase tracking-[0.15em] mb-0.5">
            Welcome to
          </h6>
          <span className="text-xl font-black text-orange block">
            Astrology Bharat
          </span>
        </div>
        <div className="text-left sm:text-right">
          <h6 className="text-gray-400 text-[10px] uppercase tracking-[0.15em] mb-0.5">
            No Account?
          </h6>
          <Link href="/register" className="text-base font-bold text-[#4A1D1F] hover:text-orange transition-all">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-black text-[#301118]">Sign In</h2>
        <p className="text-gray-400 text-sm mt-1 font-medium">Access your personalized cosmic insights</p>
      </div>

      <div className="mb-6">
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-full border-2 border-gray-100 rounded-2xl py-3 px-6 hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer shadow-sm group"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/images/google-color-svgrepo-com.svg"
            alt="Google"
            height={20}
            width={20}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-bold text-gray-600 text-sm">Continue with Google</span>
        </button>
      </div>

      <div className="relative mb-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-50"></div>
        </div>
        <span className="relative px-3 text-[10px] font-black text-gray-300 bg-white uppercase tracking-[0.2em]">OR WITH EMAIL</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-[11px] font-black text-black mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-orange focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-black font-semibold text-sm"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-[11px] font-black text-black mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-orange focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-black font-semibold text-sm"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 border-0 bg-transparent text-gray-300 hover:text-orange transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} text-base`}></i>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-bold text-gray-300 hover:text-orange transition-all"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-orange text-white text-base font-black shadow-[0_8px_20px_rgba(255,107,0,0.2)] hover:shadow-[0_12px_25px_rgba(255,107,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Signing In...
            </span>
          ) : "Sign In Account"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
