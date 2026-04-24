"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAgentWalletBalance, getAgentWithdrawals, requestAgentWithdrawal, getAgentDashboardStats } from "@/src/services/agent.service";
import { useAgentAuthStore } from "@/src/store/useAgentAuthStore";

// Components
import { WalletSkeleton } from "../../components/Skeleton";
import { Wallet, Landmark, Clock } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { WithdrawSection } from "./components/WithdrawSection";
import { TransactionTable } from "./components/TransactionTable";

export default function WalletPage() {
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [totalWithdrawn, setTotalWithdrawn] = useState(0);
    const [processing, setProcessing] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);
    const { agent } = useAgentAuthStore() as any;

    const fetchData = async () => {
        try {
            const [balanceRes, balanceErr] = await getAgentWalletBalance();
            const [txRes, txErr] = await getAgentWithdrawals();
            const [statsRes, statsErr] = await getAgentDashboardStats();

            if (balanceRes) setBalance(balanceRes.balance || 0);
            
            if (statsRes) {
                setTotalWithdrawn(statsRes.totalWithdrawn || 0);
                setProcessing(statsRes.processingWithdrawals || 0);
            }

            if (txRes) {
                const formattedTxs = txRes.map((tx: any) => ({
                    id: tx._id || tx.id,
                    amount: tx.amount,
                    status: tx.status,
                    createdAt: tx.createdAt,
                    type: tx.type || 'withdrawal', // 'credit' | 'withdrawal'
                    info: tx.remark || (tx.type === 'credit' ? 'Consultation' : 'Payout')
                }));
                setTransactions(formattedTxs);
            }
        } catch (error) {
            console.error("Failed to fetch wallet data", error);
            toast.error("Failed to load wallet details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleWithdrawalRequest = async (amount: number) => {
        setRequestLoading(true);
        try {
            const [res, err] = await requestAgentWithdrawal(amount);
            if (err) {
                toast.error(err.message || "Failed to submit request");
            } else {
                toast.success("Withdrawal request submitted successfully!");
                fetchData(); // Refresh data
            }
        } catch (error) {
            toast.error("An error occurred during request");
        } finally {
            setRequestLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-transparent p-4 md:p-10 lg:p-12">
            <div className="max-w-7xl mx-auto">
                <WalletSkeleton />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-10 lg:p-12 animate-in fade-in duration-1000">
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Wallet</h1>
                    <p className="text-sm font-medium text-gray-500">Manage your balance and schedule payouts to your bank account.</p>
                </div>

                {/* Top Stat Triplets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                        label="Available Balance" 
                        value={balance} 
                        sub="Ready to Withdraw" 
                        subColor="text-green-500"
                        icon={Wallet} 
                        iconBg="bg-green-50" 
                        iconColor="text-green-500" 
                    />
                    <StatCard 
                        label="Total Withdrawn" 
                        value={totalWithdrawn} 
                        sub="To Bank Account" 
                        subColor="text-primary"
                        icon={Landmark} 
                        iconBg="bg-blue-50" 
                        iconColor="text-blue-500" 
                    />
                    <StatCard 
                        label="Processing" 
                        value={processing} 
                        sub="In Progress" 
                        subColor="text-red-500"
                        icon={Clock} 
                        iconBg="bg-orange-50" 
                        iconColor="text-orange-500" 
                    />
                </div>

                {/* Inline Withdrawal Section */}
                <WithdrawSection 
                    balance={balance} 
                    onWithdraw={handleWithdrawalRequest} 
                    loading={requestLoading}
                    agent={agent}
                />

                {/* Transaction Table */}
                <TransactionTable transactions={transactions} />
            </div>
        </div>
    );
}


