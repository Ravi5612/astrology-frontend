"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import { RevenueChart, ProductShareChart, StockChart } from "@/features/shop-dashboard/components/AnalyticsCharts";
import { AnalyticsSkeleton } from "@/features/shop-dashboard/components/AnalyticsSkeleton";
import { BarChart3, TrendingUp, Package, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["merchantAnalytics"],
    queryFn: async () => {
      const [data, error] = await dashboardService.getAnalytics();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  const lowStockCount = analytics?.stockLevels?.filter((p: any) => p.stock < 10 && p.stock > 0).length || 0;
  const outOfStockCount = analytics?.stockLevels?.filter((p: any) => p.stock === 0).length || 0;

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-4">
            <BarChart3 className="w-10 h-10 text-[#fd6410]" />
            Business Insights
          </h2>
          <p className="text-gray-500 font-bold mt-2 text-lg">In-depth analysis of your shop performance and inventory.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-3xl bg-orange-50 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#fd6410]" />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Top Product</p>
            <h4 className="text-xl font-black text-gray-900 mt-1">{analytics?.topProducts?.[0]?.name || "N/A"}</h4>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center">
            <Package className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Inventory</p>
            <h4 className="text-xl font-black text-gray-900 mt-1">{analytics?.stockLevels?.length || 0} Products</h4>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-[2.5rem] border border-red-50 shadow-sm flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-3xl bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Stock Alerts</p>
            <h4 className="text-xl font-black text-gray-900 mt-1">{lowStockCount + outOfStockCount} Urgent</h4>
          </div>
        </motion.div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <RevenueChart data={analytics?.revenueTimeline || []} />
        <ProductShareChart data={analytics?.topProducts || []} />
        <div className="lg:col-span-2">
           <StockChart data={analytics?.stockLevels || []} />
        </div>
      </div>
    </div>
  );
}
