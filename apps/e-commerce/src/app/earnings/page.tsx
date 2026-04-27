"use client";

import React, { useState } from "react";
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Search,  
  Download,
  Calendar,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DashboardCard } from "@/features/shop-dashboard/components/DashboardCard";
import { 
  useMerchantFinanceStats, 
  useMerchantTransactions 
} from "@/hooks/useFinance";
import { WithdrawFundsModal } from "@/features/shop-dashboard/components/WithdrawFundsModal";
import { EarningsSkeleton } from "@/components/ui/Skeleton";

interface Transaction {
  id: string;
  orderId?: string;
  date: string;
  amount: number;
  type: "sale" | "fee" | "withdrawal";
  status: "paid" | "pending" | "completed";
}

export default function EarningsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // Fetch Finance Stats via Hook
  const { data: statsData, isLoading: statsLoading } = useMerchantFinanceStats();

  // Fetch Transactions List via Hook
  const { data: txData, isLoading: txLoading } = useMerchantTransactions({
    page,
    limit,
    search: searchTerm || undefined
  });

  const transactions: Transaction[] = txData?.transactions || [];
  const availableBalance = statsData?.availableBalance || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.abs(price || 0));
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const formatTime = (isoDate: string) => {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleTimeString("en-IN", {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = [
    { label: "Total Earnings", value: formatPrice(statsData?.totalEarnings), icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50", trend: "+12.5%" },
    { label: "Available Balance", value: formatPrice(statsData?.availableBalance), icon: Wallet, color: "text-green-600", bg: "bg-green-50", trend: null },
    { label: "Pending Payout", value: formatPrice(statsData?.pendingPayout), icon: Clock, color: "text-amber-600", bg: "bg-amber-50", trend: null },
    { label: "Total Payouts", value: formatPrice(statsData?.totalPayouts), icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50", trend: null },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
      <WithdrawFundsModal 
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={availableBalance}
      />

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
             <Wallet className="w-8 h-8 text-[#fd6410]" />
             <span>Earnings & Payouts</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Manage your revenue, track payments, and request withdrawals.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95">
             <Download className="w-4 h-4" />
             <span>Statement</span>
          </button>
          <button 
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex items-center justify-center space-x-2 bg-[#fd6410] text-white px-8 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20 active:scale-95"
          >
             <span>Withdraw Funds</span>
          </button>
        </div>
      </div>

      {statsLoading && txLoading && page === 1 ? (
        <EarningsSkeleton />
      ) : (
        <>
          {/* Financial Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <DashboardCard
            key={idx}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.color}
            iconBgColor={stat.bg}
            trend={stat.trend}
            isLoading={statsLoading}
          />
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Transaction History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
             <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Transactions</h3>
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#fd6410]" />
                <input 
                  type="text" 
                  placeholder="Txn ID..."
                  className="pl-9 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs focus:outline-none w-40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden min-h-[300px] flex flex-col">
             <div className="flex-1 max-h-[600px] overflow-y-auto custom-scrollbar" data-lenis-prevent>
               <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] sticky top-0 z-10 backdrop-blur-md">
                    <tr>
                      <th className="pl-6 py-4 px-4 bg-gray-50/80">Transaction Details</th>
                      <th className="px-4 py-4 text-center bg-gray-50/80">Type</th>
                      <th className="px-4 py-4 text-right bg-gray-50/80">Amount</th>
                      <th className="pr-6 py-4 text-right bg-gray-50/80">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-gray-400 italic text-sm">No transactions found.</td>
                      </tr>
                    ) : transactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50/80 transition-all cursor-default group hover:scale-[1.002] active:scale-[0.998] duration-300">
                        <td className="pl-6 py-5">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-gray-900 group-hover:text-[#fd6410] transition-colors">{txn.id}</span>
                             <span className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                <Calendar className="w-2.5 h-2.5" /> {formatDate(txn.date)} • {formatTime(txn.date)}
                             </span>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-center">
                           <span className={cn(
                             "text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg",
                             txn.type === "sale" ? "text-green-600 bg-green-50" : txn.type === "withdrawal" ? "text-blue-600 bg-blue-50" : "text-gray-600 bg-gray-50"
                           )}>
                              {txn.type}
                           </span>
                        </td>
                        <td className={cn(
                          "px-4 py-5 text-right font-black text-sm tracking-tight",
                          txn.type === "sale" ? "text-green-600" : "text-gray-900"
                        )}>
                           {txn.type === "sale" ? "+" : "-"} {formatPrice(txn.amount)}
                        </td>
                        <td className="pr-6 py-5 text-right">
                           <span className={cn(
                             "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border",
                             txn.status === "paid" || txn.status === "completed" ? "text-green-700 bg-green-50 border-green-100" : txn.status === "pending" ? "text-amber-700 bg-amber-50 border-amber-100" : "text-gray-700 bg-gray-50 border-gray-100"
                           )}>
                              {txn.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>

             {/* Pagination Controls */}
             {txData?.total > limit && (
               <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   Showing {((page - 1) * limit) + 1} - {Math.min(page * limit, txData.total)} of {txData.total}
                 </p>
                 <div className="flex items-center gap-2">
                   <button 
                     onClick={() => setPage(p => Math.max(1, p - 1))}
                     disabled={page === 1 || txLoading}
                     className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#fd6410] disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
                   >
                     <ChevronLeft className="w-4 h-4" />
                   </button>
                   <button 
                     onClick={() => setPage(p => p + 1)}
                     disabled={page * limit >= txData?.total || txLoading}
                     className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-[#fd6410] disabled:opacity-30 disabled:hover:text-gray-400 transition-all shadow-sm"
                   >
                     <ChevronRight className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Right Column: Mini Payout Dashboard */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-900/10">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-20" />
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/5">
                    <Clock className="w-6 h-6 text-orange-400" />
                 </div>
                 <h4 className="text-lg font-bold tracking-tight">Next Payout</h4>
                 <p className="text-white/50 text-xs mt-1">Automatically scheduled for:</p>
                 <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
                    <div>
                       <span className="text-3xl font-black">{formatPrice(statsData?.pendingPayout)}</span>
                       <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mt-1 italic">
                         Expected by {formatDate(statsData?.nextPayoutDate)}
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-orange-50 rounded-lg text-[#fd6410]">
                    <AlertCircle className="w-5 h-5" />
                 </div>
                 <h4 className="text-sm font-bold text-gray-900">Payout Help</h4>
              </div>
              <ul className="space-y-3">
                 <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl cursor-not-allowed group">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 group-hover:bg-[#fd6410] transition-colors" />
                    <div>
                       <p className="text-xs font-bold text-gray-700">Set Bank Account</p>
                       <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">Must verify KYC first.</p>
                    </div>
                 </li>
                 <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl cursor-not-allowed opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" />
                    <p className="text-xs font-bold text-gray-700">Withdraw Limits</p>
                 </li>
              </ul>
           </div>
        </div>

      </div>

        </>
      )}
    </div>
  );
}
