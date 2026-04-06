"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XSquare,
  User,
  Calendar,
  Download,
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DashboardCard } from "@/features/shop-dashboard/components/DashboardCard";

interface Order {
  id: string;
  orderNumber?: string;
  customerName: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  itemsCount: number;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading } = useQuery({
    queryKey: ['merchant-orders', activeTab, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeTab !== "All") {
        params.append("status", activeTab.toLowerCase());
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }
      
      const res = await fetch(`/api/v1/merchant/orders?${params.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    }
  });

  const orders: Order[] = data?.orders || [];
  const statistics = data?.stats || {
    total: 0,
    pending: 0,
    shipped: 0,
    revenue: 0,
  };

  // Status Update Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const res = await fetch(`/api/v1/merchant/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to update status");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant-orders'] });
    }
  });

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-amber-50 text-amber-700 border-amber-100";
      case "processing": return "bg-orange-50 text-orange-700 border-orange-100";
      case "shipped": return "bg-blue-50 text-blue-700 border-blue-100";
      case "delivered": return "bg-green-50 text-green-700 border-green-100";
      case "cancelled": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending": return <Clock className="w-3.5 h-3.5" />;
      case "processing": return <Clock className="w-3.5 h-3.5" />;
      case "shipped": return <Truck className="w-3.5 h-3.5" />;
      case "delivered": return <CheckCircle2 className="w-3.5 h-3.5" />;
      case "cancelled": return <XSquare className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price || 0);
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const stats = [
    { label: "Total Orders", value: `${statistics.total}`, icon: ShoppingBag, color: "text-[#fd6410]", trend: "+12%" },
    { label: "Pending", value: `${statistics.pending}`, icon: Clock, color: "text-amber-500", trend: null },
    { label: "Shipped", value: `${statistics.shipped}`, icon: Truck, color: "text-blue-500", trend: null },
    { label: "Revenue", value: formatPrice(statistics.revenue), icon: CheckCircle2, color: "text-green-500", trend: "+5%" },
  ];

  const tabs = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
             <ShoppingBag className="w-8 h-8 text-[#fd6410]" />
             <span>Orders Management</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Track and fulfillment customer orders from here.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
          <Download className="w-4 h-4" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Stats Section - Using Unified Component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <DashboardCard
            key={idx}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.color}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Logic Tabs & Search */}
      <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
          <div className="flex p-1.5 bg-white border border-gray-100 rounded-2xl shadow-sm space-x-1 overflow-x-auto max-w-full">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 uppercase tracking-widest text-[10px] whitespace-nowrap",
                  activeTab === tab 
                    ? "bg-[#fd6410] text-white shadow-md" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto text">
            <div className="relative flex-1 sm:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#fd6410] transition-colors" />
              <input 
                type="text" 
                placeholder="Search by Order ID or Name..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">
            <tr>
              <th className="pl-8 pr-4 py-5">Order ID</th>
              <th className="px-4 py-5">Customer</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Total</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-8 py-5 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#fd6410] mb-4" />
                    <span className="text-gray-500 font-medium text-sm">Fetching orders...</span>
                  </div>
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                  No orders found.
                </td>
              </tr>
            ) : orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 group transition-all duration-300">
                <td className="pl-8 pr-4 py-6">
                  <span className="text-sm font-bold text-gray-900 tracking-tight uppercase">{order.orderNumber || order.id.substring(0, 8)}</span>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                       <User className="w-5 h-5 text-[#fd6410]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{order.customerName}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{order.itemsCount} Items</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDate(order.date)}
                  </div>
                </td>
                <td className="px-6 py-6 font-black text-sm text-gray-900">{formatPrice(order.amount)}</td>
                <td className="px-6 py-6">
                  <span className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-max", getStatusStyle(order.status))}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <select 
                       className="text-[10px] font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                       value={order.status.toLowerCase()}
                       onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                       disabled={updateStatusMutation.isPending}
                    >
                       <option value="pending">Pending</option>
                       <option value="processing">Processing</option>
                       <option value="shipped">Shipped</option>
                       <option value="delivered">Delivered</option>
                       <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Helper Footer */}
      <div className="flex items-center justify-between p-6 bg-orange-50/50 rounded-3xl border border-orange-100">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm text-orange-500">
               <AlertCircle className="w-6 h-6" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-gray-900">Need help with fulfillment?</h4>
               <p className="text-xs text-gray-500 mt-0.5">Check out the shipping guide or contact support for courier integration.</p>
            </div>
         </div>
         <button className="px-6 py-3 bg-white text-gray-900 font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md transition-all">
            Open Guide
         </button>
      </div>

    </div>
  );
}
