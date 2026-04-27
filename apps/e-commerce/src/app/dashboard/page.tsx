"use client";

import React, { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { ShoppingBag, Users, TrendingUp, Package, AlertTriangle, CheckCircle, Info, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardCard } from "@/features/shop-dashboard/components/DashboardCard";
import { ActivityFeed } from "@/features/shop-dashboard/components/ActivityFeed";
import { RecentOrders } from "@/features/shop-dashboard/components/RecentOrders";
import { useAuthStore } from "@/store/useAuthStore";
import { useMerchantProfile } from "@/hooks/useSettings";
import { dashboardService } from "@/services/dashboard.service";
import { SalesChart } from "@/features/shop-dashboard/components/SalesChart";
import { DashboardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function DashboardHome() {
  const [currentDate, setCurrentDate] = useState("");
  const { user } = useAuthStore();
  const { data: profileData } = useMerchantProfile();
  
  const status = profileData?.profile?.status ?? (user as any)?.status ?? "pending_verification";

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("en-US", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    }));
  }, []);

  const results = useQueries({
    queries: [
      { queryKey: ["merchantStats"], queryFn: () => dashboardService.getStats() },
      { queryKey: ["merchantOrders"], queryFn: () => dashboardService.getRecentOrders() },
      { queryKey: ["merchantActivity"], queryFn: () => dashboardService.getActivity() },
      { queryKey: ["merchantPerformance"], queryFn: () => dashboardService.getPerformance() },
    ],
  });

  const [statsData, statsLoading] = [results[0].data?.[0], results[0].isLoading];
  const [ordersData, ordersLoading] = [results[1].data?.[0], results[1].isLoading];
  const [activityData, activityLoading] = [results[2].data?.[0], results[2].isLoading];
  const [perfData, perfLoading] = [results[3].data?.[0], results[3].isLoading];

  const isLoadingInitial = statsLoading && ordersLoading;

  const stats = [
    {
      title: "Total Orders",
      value: String(statsData?.totalOrders?.value ?? "0"),
      trend: statsData?.totalOrders?.trend ?? "+0%",
      icon: ShoppingBag, color: "text-blue-600", bgColor: "bg-blue-50",
      href: "/orders"
    },
    {
      title: "Total Products",
      value: String(statsData?.totalProducts?.value ?? "0"),
      trend: statsData?.totalProducts?.trend ?? "+0",
      icon: Package, color: "text-purple-600", bgColor: "bg-purple-50",
      href: "/products"
    },
    {
      title: "Total Earnings",
      value: `₹${Number(statsData?.totalEarnings?.value ?? 0).toLocaleString("en-IN")}`,
      trend: statsData?.totalEarnings?.trend ?? "+0%",
      icon: TrendingUp, color: "text-orange-600", bgColor: "bg-orange-50",
    },
    {
      title: "Monthly Earnings",
      value: `₹${Number(statsData?.monthlyEarnings?.value ?? 0).toLocaleString("en-IN")}`,
      trend: statsData?.monthlyEarnings?.trend ?? "+0%",
      icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-50",
    },
  ];


  if (isLoadingInitial && !statsData) {
    return (
      <div className="space-y-10 pb-20">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100">
           <Skeleton className="h-10 w-64 mb-4" />
           <Skeleton className="h-6 w-96" />
        </div>
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <main className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
        <div className="relative z-10 space-y-2">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd6410] to-orange-400">{(user as any)?.shopName ?? "Shop Owner"}!</span>
          </h2>
          <p className="text-gray-500 font-bold italic underline decoration-orange-100 underline-offset-8 decoration-4 decoration-dashed">
            Manage your inventory and track your spiritual brand growth.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-5 bg-white/80 backdrop-blur-md px-8 py-5 rounded-3xl border border-orange-100 shadow-sm transition-all hover:border-[#fd6410] hover:shadow-orange-500/10">
          <div className="w-14 h-14 bg-gradient-to-br from-[#fd6410] to-orange-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/30">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#fd6410]/70 mb-1">Current Date</p>
            <p className="text-sm font-black text-gray-900 tracking-tighter">{currentDate}</p>
          </div>
        </div>
      </div>

      {/* KYC Status Banners */}
      <AnimatePresence mode="wait">
        {status === "pending_verification" && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-orange-50 border-2 border-orange-100 rounded-[2.5rem] p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-xl shadow-orange-500/20">
              <AlertTriangle className="w-8 h-8 animate-bounce" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-2xl font-black text-orange-900 mb-2 tracking-tight">Shop Verification Pending</h4>
              <p className="text-sm font-bold text-orange-700/80 leading-relaxed mb-6 max-w-2xl italic">
                Our team is reviewing your GST & PAN documents to ensure the highest quality of service on Bharat. This usually takes 24-48 hours.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 bg-white/80 px-4 py-2 rounded-full border border-orange-100 shadow-sm">
                  <Info className="w-4 h-4" /> Reviewing GST Details
                </span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 bg-white/80 px-4 py-2 rounded-full border border-orange-100 shadow-sm">
                  <Info className="w-4 h-4" /> Identity Check In Progress
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.1 }}>
            <DashboardCard 
              title={stat.title} 
              value={stat.value} 
              trend={stat.trend} 
              icon={stat.icon} 
              iconBgColor={stat.bgColor} 
              iconColor={stat.color}
              href={stat.href}
              isLoading={statsLoading}
            />
          </motion.div>
        ))}
      </section>

      {/* Orders Grid - Now Full Width */}
      <section className="grid grid-cols-1 gap-10">
        <div className="space-y-8">
          <RecentOrders orders={ordersData || []} isLoading={ordersLoading} />
        </div>
      </section>

      {/* Dynamic Analytics & Performance Chart - Moved to Bottom */}
      <section className="animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
        <SalesChart data={perfData?.salesData} isLoading={perfLoading} />
      </section>
    </main>
  );
}
