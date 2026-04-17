"use client";
import React, { useState, useEffect, useMemo } from "react";
import { StatsCards, Loading } from "@repo/ui";
import type { StatConfig } from "@repo/ui";
import { 
    Wallet, 
    ArrowUpCircle, 
    Clock, 
    CheckCircle, 
    XCircle, 
    AlertCircle,
    IndianRupee,
    ArrowRight
} from "lucide-react";
import { toast } from "react-toastify";
import { 
    getAgentWalletBalance, 
    getAgentWithdrawals, 
    requestAgentWithdrawal,
    getAgentProfile
} from "@/src/services/agent.service";

interface PayoutRequest {
    id: number;
    amount: number;
    status: "pending" | "completed" | "rejected" | "failed" | "cancelled";
    created_at: string;
    remark?: string;
    merchant_bank_name?: string;
    merchant_account_number?: string;
}

const STATUS_COLOR: Record<string, string> = {
    pending: "bg-orange-100 text-orange-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    failed: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-700",
};

export default function PayoutPage() {
    const [balance, setBalance] = useState<number>(0);
    const [withdrawals, setWithdrawals] = useState<PayoutRequest[]>([]);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [amount, setAmount] = useState<string>("");

    const fetchData = async () => {
        try {
            const [
                [balData, balErr],
                [wdData, wdErr],
                [profData, profErr]
            ] = await Promise.all([
                getAgentWalletBalance(),
                getAgentWithdrawals(),
                getAgentProfile()
            ]);

            if (balErr) toast.error("Failed to load balance");
            if (wdErr) toast.error("Failed to load payouts");
            
            if (balData) setBalance(Number(balData.balance || 0));
            if (wdData) setWithdrawals(wdData);
            if (profData) setProfile(profData);
        } catch (error) {
            console.error("Error fetching payout data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const stats: StatConfig[] = useMemo(() => {
        const totalWithdrawn = withdrawals
            .filter(w => w.status === "completed")
            .reduce((sum, w) => sum + Number(w.amount), 0);
        
        const pendingPayout = withdrawals
            .filter(w => w.status === "pending")
            .reduce((sum, w) => sum + Number(w.amount), 0);

        return [
            { 
                title: "Available Balance", 
                value: `₹${balance.toLocaleString("en-IN")}`, 
                icon: Wallet, 
                iconColor: "text-blue-600", 
                iconBgColor: "bg-blue-100", 
                valueColor: "text-blue-700" 
            },
            { 
                title: "Total Withdrawn", 
                value: `₹${totalWithdrawn.toLocaleString("en-IN")}`, 
                icon: CheckCircle, 
                iconColor: "text-green-600", 
                iconBgColor: "bg-green-100", 
                valueColor: "text-green-700" 
            },
            { 
                title: "Pending Payout", 
                value: `₹${pendingPayout.toLocaleString("en-IN")}`, 
                icon: Clock, 
                iconColor: "text-orange-600", 
                iconBgColor: "bg-orange-100", 
                valueColor: "text-orange-700" 
            },
            { 
                title: "Payout Requests", 
                value: withdrawals.length.toString(), 
                icon: ArrowUpCircle, 
                iconColor: "text-purple-600", 
                iconBgColor: "bg-purple-100", 
                valueColor: "text-purple-700" 
            },
        ];
    }, [balance, withdrawals]);

    const handleRequestPayout = async (e: React.FormEvent) => {
        e.preventDefault();
        const amt = parseFloat(amount);
        
        if (isNaN(amt) || amt < 500) {
            toast.error("Minimum payout amount is ₹500");
            return;
        }

        if (amt > balance) {
            toast.error("Insufficient balance");
            return;
        }

        if (!profile?.bank_name || !profile?.account_number) {
            toast.error("Please update your bank details in profile first");
            return;
        }

        setSubmitting(true);
        try {
            const [res, err] = await requestAgentWithdrawal(amt);
            if (err) {
                toast.error(err.message || "Failed to request payout");
            } else {
                toast.success("Payout request submitted successfully");
                setAmount("");
                fetchData();
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Loading fullScreen text="Loading Payouts..." />;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Header */}
            <StatsCards stats={stats} columns={4} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Request Payout Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
                        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-primary-hover">
                            <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                <ArrowUpCircle className="w-5 h-5" />
                                Request Payout
                            </h3>
                            <p className="text-white/70 text-xs mt-1">Withdraw your earnings to bank</p>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleRequestPayout} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">
                                        Amount to Withdraw
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-400 font-bold">₹</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Min. 500"
                                            className="block w-full pl-8 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-300"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-[10px] font-bold text-gray-400">INR</span>
                                        </div>
                                    </div>
                                    <p className="mt-2 text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                                        <AlertCircle className="w-3 h-3" />
                                        Max daily limit: ₹10,000
                                    </p>
                                </div>

                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-2">Destination Account</h4>
                                    {profile?.bank_name ? (
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-gray-800">{profile.bank_name}</p>
                                            <p className="text-xs text-gray-500 font-medium">A/C: {profile.account_number.replace(/.(?=.{4})/g, '*')}</p>
                                            <p className="text-xs text-gray-500 font-medium uppercase">IFSC: {profile.ifsc_code}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center py-2">
                                            <p className="text-xs text-red-500 font-medium mb-2">No bank details found</p>
                                            <button 
                                                type="button"
                                                onClick={() => window.location.href = '/dashboard/profile'}
                                                className="text-[10px] font-black text-primary uppercase hover:underline"
                                            >
                                                Add Bank Details
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting || balance < 500}
                                    className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all ${
                                        submitting || balance < 500
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-primary text-white hover:bg-primary-hover hover:shadow-primary/20 active:scale-[0.98]"
                                    }`}
                                >
                                    {submitting ? "Processing..." : balance < 500 ? "Minimum ₹500 required" : "Initiate Payout"}
                                    {!submitting && balance >= 500 && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Payout History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-400" />
                                Payout History
                            </h3>
                        </div>

                        {withdrawals.length === 0 ? (
                            <div className="p-16 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                    <IndianRupee className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No Payouts Yet</h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto mt-1">
                                    When you request a payout, it will appear here with its current status.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50/50">
                                            {["Date", "Amount", "Destination", "Status"].map((h) => (
                                                <th key={h} className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {withdrawals.map((w) => (
                                            <tr key={w.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-gray-900">
                                                        {new Date(w.created_at).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-medium">
                                                        {new Date(w.created_at).toLocaleTimeString("en-IN", {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-lg font-black text-gray-900">
                                                        ₹{Number(w.amount).toLocaleString("en-IN")}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-bold text-gray-700">{w.merchant_bank_name || 'Bank Account'}</p>
                                                    <p className="text-[10px] text-gray-500 font-medium">A/C: {w.merchant_account_number?.replace(/.(?=.{4})/g, '*') || '••••'}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${STATUS_COLOR[w.status] || "bg-gray-100"}`}>
                                                        {w.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                                                        {w.status === 'pending' && <Clock className="w-3 h-3" />}
                                                        {(w.status === 'rejected' || w.status === 'failed') && <XCircle className="w-3 h-3" />}
                                                        {w.status}
                                                    </span>
                                                    {w.remark && (
                                                        <p className="mt-1 text-[10px] text-gray-400 italic max-w-[150px] truncate" title={w.remark}>
                                                            "{w.remark}"
                                                        </p>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
