"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Eye, Download } from "lucide-react";

export interface Order {
  id: string;
  customerName: string;
  email?: string;
  date: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

interface RecentOrdersProps {
  orders?: Order[];
  isLoading?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="py-5 px-4">
        <div className="h-4 bg-gray-100 rounded-full w-3/4" />
      </td>
    ))}
  </tr>
);

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-xl">
            <ShoppingBag className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Orders</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Manage your latest sales</p>
          </div>
        </div>
        <div className="relative w-full sm:w-auto overflow-hidden group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 group-focus-within:text-[#fd6410] transition-colors" />
          <input
            type="text"
            placeholder="Search by ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-200 outline-none w-full sm:w-64 text-sm font-medium transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Order ID</th>
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Customer</th>
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
              <th className="text-left py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Amount</th>
              <th className="text-center py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
              <th className="text-right py-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
            ) : filtered.length > 0 ? (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/30 transition-colors group">
                  <td className="py-5 px-4 font-black text-[#fd6410] tracking-tighter italic">{order.id}</td>
                  <td className="py-5 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{order.customerName}</span>
                      {order.email && <span className="text-[10px] text-gray-400 font-medium">{order.email}</span>}
                    </div>
                  </td>
                  <td className="py-5 px-4 text-gray-500 text-[11px] font-bold italic">
                    {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-5 px-4 font-black text-gray-900 tracking-tight">₹{order.amount.toLocaleString('en-IN')}</td>
                  <td className="py-5 px-4 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-gray-400 hover:text-[#fd6410] transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-100 text-gray-400 hover:text-blue-500 transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-gray-200" />
                    </div>
                    <p className="text-sm font-black text-gray-300 uppercase tracking-widest italic">No orders found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
