"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Users, TrendingUp, Package, AlertTriangle, CheckCircle, Info, Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardCard } from "@/features/shop-dashboard/components/DashboardCard";
import { ActivityFeed } from "@/features/shop-dashboard/components/ActivityFeed";
import { RecentOrders } from "@/features/shop-dashboard/components/RecentOrders";
import { ReviewsOverview } from "@/features/shop-dashboard/components/ReviewsOverview";
import { useAuthStore } from "@/store/useAuthStore";

async function fetchStats() {
  const res = await fetch("/api/v1/merchant/stats", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}

async function fetchOrders() {
  const res = await fetch("/api/v1/merchant/orders/recent", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}

async function fetchActivity() {
  const res = await fetch("/api/v1/merchant/activity", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}

async function fetchPerformance() {
  const res = await fetch("/api/v1/merchant/performance", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}

export default function DashboardHome() {
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useAuthStore();
  const kycStatus = (user as any)?.kycStatus ?? "pending";

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("en-US", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }));
  }, []);

  const { data: statsData, isLoading: statsLoading } = useQuery({ queryKey: ["merchantStats"], queryFn: fetchStats });
  const { data: ordersData, isLoading: ordersLoading } = useQuery({ queryKey: ["merchantOrders"], queryFn: fetchOrders });
  const { data: activityData, isLoading: activityLoading } = useQuery({ queryKey: ["merchantActivity"], queryFn: fetchActivity });
  const { data: perfData, isLoading: perfLoading } = useQuery({ queryKey: ["merchantPerformance"], queryFn: fetchPerformance });

  const stats = [
    {
      title: "Today's Orders",
      value: statsLoading ? "..." : String(statsData?.todayOrders?.value ?? "0"),
      trend: statsData?.todayOrders?.trend ?? "+0%",
      icon: ShoppingBag, color: "text-blue-600", bgColor: "bg-blue-100",
    },
    {
      title: "Total Products",
      value: statsLoading ? "..." : String(statsData?.totalProducts?.value ?? "0"),
      trend: statsData?.totalProducts?.trend ?? "+0",
      icon: Package, color: "text-purple-600", bgColor: "bg-purple-100",
    },
    {
      title: "Shop Followers",
      value: statsLoading ? "..." : String(statsData?.shopFollowers?.value ?? "0"),
      trend: statsData?.shopFollowers?.trend ?? "+0",
      icon: Users, color: "text-orange-600", bgColor: "bg-orange-100",
    },
    {
      title: "Monthly Earnings",
      value: statsLoading ? "..." : `₹${Number(statsData?.monthlyEarnings?.value ?? 0).toLocaleString("en-IN")}`,
      trend: statsData?.monthlyEarnings?.trend ?? "+0%",
      icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100",
    },
  ];

  const weeklyProgress = perfData?.weeklyTargetProgress ?? 0;
  const merchantTier = perfData?.currentTier ?? "Silver";

  return (
    <main className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome back, <span className="text-[#fd6410]">{(user as any)?.shopName ?? "Shop Owner"}!</span>
          </h2>
          <p className="text-gray-500 font-medium italic underline decoration-orange-100 underline-offset-4 decoration-4">
            Manage your inventory, track orders, and grow your spiritual brand.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-orange-50/50 px-6 py-3 rounded-2xl border border-orange-100/50">
          <div className="w-10 h-10 bg-[#fd6410] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#fd6410]/60">Current Date</p>
            <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">{currentDate}</p>
          </div>
        </div>
      </div>

      {/* KYC Status Banners */}
      <AnimatePresence>
        {kycStatus === "pending" && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-orange-50 border-2 border-orange-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-xl shadow-orange-500/20">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xl font-black text-orange-900 mb-1 tracking-tight">Shop Verification Pending</h4>
              <p className="text-sm font-bold text-orange-700/80 leading-relaxed mb-4 max-w-2xl italic">
                Our team is reviewing your shop documents. Some features may be restricted until verification is complete. Expected time: 24-48 hours.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 bg-white/80 px-3 py-1.5 rounded-full border border-orange-100 w-fit">
                <Info className="w-3.5 h-3.5" />
                <span>Reviewing GST &amp; Pan Details</span>
              </div>
            </div>
            <button className="px-8 py-3.5 rounded-2xl bg-white border-2 border-orange-100 text-[#fd6410] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-md active:scale-95">
              Check Status
            </button>
          </motion.div>
        )}
        {kycStatus === "active" && (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-emerald-50 border-2 border-emerald-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xl shadow-emerald-500/20">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-xl font-black text-emerald-900 mb-1 tracking-tight">Your Shop is Verified!</h4>
              <p className="text-sm font-bold text-emerald-700/80 leading-relaxed mb-4 max-w-2xl">
                Congratulations! Your spiritual storefront is now live and visible to all customers across Bharat.
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-white/80 px-4 py-1.5 rounded-full border border-emerald-100 w-fit">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Active &amp; Visible</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
            <DashboardCard title={stat.title} value={stat.value} trend={stat.trend} icon={stat.icon} iconBgColor={stat.bgColor} iconColor={stat.color} />
          </motion.div>
        ))}
      </section>

      {/* Activity & Orders Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-8">
          <RecentOrders orders={ordersData?.orders ?? []} isLoading={ordersLoading} />
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#fd6410] p-8 rounded-[2rem] text-white shadow-xl shadow-orange-500/20 group cursor-pointer overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <TrendingUp className="w-48 h-48" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Weekly Target</p>
              <div className="flex items-center justify-between mt-2">
                <h5 className="text-3xl font-black italic tracking-tighter">{weeklyProgress}% Reached</h5>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="mt-6 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${weeklyProgress}%` }} />
              </div>
            </div>
            <div className="bg-gray-900 p-8 rounded-[2rem] text-white shadow-xl shadow-gray-900/10 group cursor-pointer overflow-hidden relative">
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <Users className="w-48 h-48" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Merchant Tier</p>
              <div className="flex items-center justify-between mt-2">
                <h5 className="text-3xl font-black italic tracking-tighter uppercase underline decoration-orange-500 decoration-4 underline-offset-4">{merchantTier} Seller</h5>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[10px] font-bold text-gray-500 mt-6 uppercase tracking-widest italic group-hover:text-white/80">Real-time tier</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <ActivityFeed activities={activityData?.activities ?? []} isLoading={activityLoading} />
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 text-center hover:shadow-lg transition-all">
            <div className="w-20 h-20 bg-orange-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-[#fd6410] animate-bounce duration-[3s]">
              <Package className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-gray-900 italic tracking-tight">Need a boost?</h4>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 px-4 leading-relaxed">Promote your spiritually crafted products to reach top seekers.</p>
            <button className="mt-8 w-full py-4 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 hover:bg-[#fd6410] hover:text-white transition-all shadow-sm">
              Create Ad Campaign
            </button>
          </div>
        </div>
      </section>

      <section>
        <ReviewsOverview data={perfData} isLoading={perfLoading} />
      </section>
    </main>
  );
}
