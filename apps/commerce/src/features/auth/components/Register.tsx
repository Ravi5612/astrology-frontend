"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, Store, UserPlus, ShieldCheck, ShoppingBag, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { RegisterSchema, RegisterFormData } from "@/types/auth";
import { merchantRegisterAction } from "@/actions/auth";
import { getErrorMessage } from "@repo/lib";
import { env } from "@/lib/config/env";

// ─── Branding Section (Expert Style) ─────────────────────────────────────────

const BrandingSection = () => (
  <div className="relative hidden lg:block h-full min-h-[600px] overflow-hidden">
    <div className="absolute inset-0 bg-[#fd6410]/95 flex flex-col items-center justify-center text-white p-12 text-center">
      {/* Decorative Circles */}
      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      
      <motion.div 
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-64 h-64 mb-4 drop-shadow-2xl"
      >
        <Image
          src="/images/logo.png"
          alt="Merchant Community"
          fill
          className="object-contain -scale-x-100"
          priority
        />
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl font-black mb-4 tracking-tight"
      >
        Join our Network
      </motion.h1>
      <p className="text-white/80 font-medium max-w-sm">
        Start selling your products to thousands of customers across India. Complete your profile to get started.
      </p>

      <div className="mt-12 space-y-4 w-full max-w-xs">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-left group hover:bg-white/20 transition-all">
             <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                <ShieldCheck className="w-5 h-5" />
             </div>
             <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/50">Secure Platform</p>
                <p className="text-xs font-medium text-white/80">Safe & Trusted Merchant Hub</p>
             </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-left group hover:bg-white/20 transition-all">
             <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                <ShoppingBag className="w-5 h-5" />
             </div>
             <div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/50">Global Reach</p>
                <p className="text-xs font-medium text-white/80">Sell to millions of seekers</p>
             </div>
          </div>
      </div>
    </div>
  </div>
);

// ─── Main Register Component ────────────────────────────────────────────────

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

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
      const result = await merchantRegisterAction({
        shopName: data.shopName,
        email: data.email,
        phone: data.phone,
        password: data.password
      });
      
      if (result.success) {
        toast.success(result.message || "Account created! Welcome to Merchant Hub.");
        router.push("/login?registered=true");
      } else {
        setServerError(result.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Register error:", err);
      setServerError(getErrorMessage(err) || "Could not complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "");
    const redirectUri = typeof window !== "undefined" ? window.location.origin : "";
    window.location.href = `${baseUrl}/api/v1/auth/google/login?role=merchant&redirect_uri=${redirectUri}`;
  };

  return (
    <div className="h-screen bg-[#FFF9F4] flex items-center justify-center p-4 sm:p-6 lg:p-10 font-outfit overflow-hidden">
      <div className="w-full max-w-6xl h-full max-h-[850px] grid grid-cols-1 lg:grid-cols-2 rounded-[40px] shadow-2xl bg-white border border-gray-100 overflow-hidden">
        
        {/* Branding Section */}
        <BrandingSection />

        {/* Form Section */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white overflow-y-auto no-scrollbar">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center lg:text-left"
          >
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Merchant Sign Up</h2>
            <p className="mt-2 text-gray-500 font-medium italic">Create your digital storefront today.</p>
          </motion.div>

          <AnimatePresence>
            {serverError && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-700 font-bold tracking-tight">{serverError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* Shop Name */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Shop Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Store className={`h-4 w-4 transition-colors ${errors.shopName ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-[#fd6410]'}`} />
                </div>
                <input {...register("shopName")} className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border ${errors.shopName ? 'border-rose-300' : 'border-gray-200 group-focus-within:border-[#fd6410]'} rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`} placeholder="My Awesome Shop" />
              </div>
              {errors.shopName && <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase">{errors.shopName.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className={`h-4 w-4 transition-colors ${errors.email ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-[#fd6410]'}`} />
                </div>
                <input {...register("email")} type="email" className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border ${errors.email ? 'border-rose-300' : 'border-gray-200 group-focus-within:border-[#fd6410]'} rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`} placeholder="merchant@business.com" />
              </div>
              {errors.email && <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Mobile Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className={`h-4 w-4 transition-colors ${errors.phone ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-[#fd6410]'}`} />
                </div>
                <input {...register("phone")} className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border ${errors.phone ? 'border-rose-300' : 'border-gray-200 group-focus-within:border-[#fd6410]'} rounded-2xl text-sm focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium`} placeholder="9876543210" />
              </div>
              {errors.phone && <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`h-4 w-4 transition-colors ${errors.password ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-[#fd6410]'}`} />
                    </div>
                    <input {...register("password")} type={showPassword ? "text" : "password"} className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border ${errors.password ? 'border-rose-300' : 'border-gray-200 group-focus-within:border-[#fd6410]'} rounded-2xl text-sm outline-none transition-all font-medium`} placeholder="••••••" />
                  </div>
               </div>
               <div className="space-y-1.5">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Confirm</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <ShieldCheck className={`h-4 w-4 transition-colors ${errors.confirmPassword ? 'text-rose-400' : 'text-gray-300 group-focus-within:text-[#fd6410]'}`} />
                    </div>
                    <input {...register("confirmPassword")} type={showPassword ? "text" : "password"} className={`block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border ${errors.confirmPassword ? 'border-rose-300' : 'border-gray-200 group-focus-within:border-[#fd6410]'} rounded-2xl text-sm outline-none transition-all font-medium`} placeholder="••••••" />
                  </div>
               </div>
            </div>
            {errors.confirmPassword && <p className="text-[10px] font-bold text-rose-500 ml-1 uppercase">{errors.confirmPassword.message}</p>}

            <div className="pt-6 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#fd6410] hover:bg-orange-600 active:scale-95 disabled:opacity-70 text-white py-4.5 rounded-2xl shadow-xl shadow-orange-500/20 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 group transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Merchant Account"}
                {!loading && <UserPlus className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <span className="relative px-4 bg-white text-[10px] font-black uppercase tracking-widest text-gray-400">Or continue with</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 rounded-2xl hover:border-orange-100 hover:bg-orange-50/30 transition-all font-black text-[10px] uppercase tracking-[0.2em] text-gray-500"
              >
                <div className="w-5 h-5 relative">
                   <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    fill
                    className="object-contain"
                  />
                </div>
                Google Account
              </button>
            </div>

            <div className="text-center mt-8">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">
                Already have a shop?{" "}
                <Link href="/login" className="text-[#fd6410] hover:text-orange-700 transition-all underline decoration-[#fd6410]/30 underline-offset-4 decoration-2">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
