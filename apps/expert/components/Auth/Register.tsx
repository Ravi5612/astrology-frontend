"use client";
import React, { useState } from "react";
import Head from "next/head";
import { Lock, User, Mail, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button, VerificationPopup } from "@repo/ui";
import { RegisterSchema, RegisterFormData } from "@/types/auth";
import { expertRegisterAction } from "@/src/actions/auth";
import { CLIENT_API_URL } from "@/lib/config";

const API_URL = CLIENT_API_URL;

// ─── Sub-Components ──────────────────────────────────────────────────────────

const BrandingSection = () => (
  <div className="relative hidden lg:block h-full min-h-[600px]">
    <div className="absolute inset-0 bg-orange-600/90 flex flex-col items-center justify-center text-white p-12 text-center">
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 mb-8 drop-shadow-2xl"
      >
        <Image
          src="/images/Expert.png"
          alt="Expert Community"
          fill
          sizes="256px"
          className="object-contain -scale-x-100"
          priority
        />
      </motion.div>
      <h1 className="text-4xl font-black mb-6 tracking-tight leading-tight">
        Join Our <br /> Expert Community
      </h1>
      <p className="text-lg text-white/80 font-medium max-w-sm">
        Register today to start providing your astrology expertise to thousands of seeking clients.
      </p>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-12 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute top-12 right-12 w-32 h-32 bg-black/10 rounded-full blur-3xl"></div>
    </div>
  </div>
);

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError("");

    try {
      const result = await expertRegisterAction({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        setRegisteredEmail(data.email);
        setShowVerification(true);
        toast.success("Registration successful! Please verify your email.");
      } else {
        setServerError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setServerError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = API_URL.replace(/\/api\/v1\/?$/, "");
    const redirectUri = typeof window !== "undefined" ? window.location.origin : "";
    window.location.href = `${baseUrl}/api/v1/auth/google/login?role=expert&redirect_uri=${redirectUri}`;
  };

  return (
    <div className="flex min-h-screen bg-[#FFF9F4] items-center justify-center p-4 sm:p-6 lg:p-10 font-poppins">
      <Head>
        <title>Expert Sign Up | Astrology in Bharat</title>
      </Head>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden shadow-premium bg-white border border-gray-100">
        <BrandingSection />

        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
            <p className="mt-2 text-gray-500 font-medium">Step into your professional journey</p>
          </div>

          {serverError && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <Mail className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900">Registration Failed</p>
                <p className="text-xs text-red-700 font-medium">{serverError}</p>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 transition-colors ${errors.name ? 'text-red-400' : 'text-gray-400 group-focus-within:text-orange-600'}`} />
                </div>
                <input
                  {...register("name")}
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border ${errors.name ? 'border-red-300' : 'border-gray-200 group-focus-within:border-orange-500'} rounded-2xl text-gray-900 text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`}
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight">{errors.name.message}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-orange-600'}`} />
                </div>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border ${errors.email ? 'border-red-300' : 'border-gray-200 group-focus-within:border-orange-500'} rounded-2xl text-gray-900 text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`}
                  placeholder="expert@example.com"
                />
              </div>
              {errors.email && <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-orange-600'}`} />
                </div>
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className={`block w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border ${errors.password ? 'border-red-300' : 'border-gray-200 group-focus-within:border-orange-500'} rounded-2xl text-gray-900 text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`}
                  placeholder="Min. 6 chars (A-Z, 0-9)"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-orange-600'}`} />
                </div>
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className={`block w-full pl-12 pr-12 py-3.5 bg-gray-50/50 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200 group-focus-within:border-orange-500'} rounded-2xl text-gray-900 text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-2 text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight">{errors.confirmPassword.message}</p>}
            </div>

            <div className="pt-4 space-y-4">
              <Button
                type="submit"
                loading={loading}
                fullWidth
                variant="primary"
                className="bg-orange-600 hover:bg-orange-700 py-4 rounded-2xl shadow-lg shadow-orange-600/20 transform active:scale-95 transition-all font-black text-sm uppercase tracking-widest"
              >
                Create Account
              </Button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <span className="relative bg-white px-4 text-xs font-black text-gray-400 uppercase tracking-tighter">Or Connect With</span>
              </div>

              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                fullWidth
                className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 py-4 rounded-2xl transform active:scale-95 transition-all shadow-sm font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <div className="relative w-5 h-5">
                  <Image src="/images/google-color-svgrepo-com.svg" alt="Google" fill />
                </div>
                Sign up with Google
              </Button>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{" "}
                <Link href="/" className="text-orange-600 hover:text-orange-700 font-black border-b-2 border-orange-600/20 hover:border-orange-600 transition-all ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <VerificationPopup
        isOpen={showVerification}
        email={registeredEmail}
        onClose={() => {
          setShowVerification(false);
          router.push("/");
        }}
      />
    </div>
  );
};

export default RegisterPage;


