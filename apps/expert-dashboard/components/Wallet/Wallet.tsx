"use client";

import React, { useState, useEffect } from "react";
import WalletStats from "./WalletStats";
import WithdrawMoney from "./WithdrawMoney";
import WalletTable from "./WalletTable";
import { WalletStatsData, WalletTransaction, BankAccount } from "./types";
import { toast } from "react-toastify";
import { getBankAccounts } from "@/lib/profile";
import { getWalletBalance, getWalletTransactions, requestWithdrawal } from "@/lib/wallet";

export default function Wallet() {
    const [stats, setStats] = useState<WalletStatsData | null>(null);
    const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            // Fetch balance
            try {
                const [balance, balanceError] = await getWalletBalance();
                if (balance) setStats(balance);
                if (balanceError) console.error("[Wallet] Balance error:", balanceError);
            } catch (error) {
                console.error("[Wallet] Failed to fetch balance:", error);
            }

            // Fetch transactions
            try {
                const [txData, txError] = await getWalletTransactions();
                if (txData) setTransactions(txData.transactions || []);
                if (txError) console.error("[Wallet] Transaction error:", txError);
            } catch (error) {
                console.error("[Wallet] Failed to fetch transactions:", error);
            }

            // Fetch bank accounts
            try {
                const [accounts, accountsError] = await getBankAccounts();
                if (accountsError) {
                    console.error("[Wallet] Bank accounts error:", accountsError);
                } else if (accounts) {
                    const accountsData = (accounts as any)?.data || accounts;
                    setBankAccounts(Array.isArray(accountsData) ? accountsData : []);
                }
            } catch (error: any) {
                console.error("[Wallet] Failed to fetch bank accounts:", error);
            }
        } catch (error) {
            console.error("Critical error in loadData:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleWithdraw = async (amount: number, bankAccountId: string) => {
        try {
            await toast.promise(
                requestWithdrawal(amount, bankAccountId),
                {
                    pending: 'Submitting withdrawal request...',
                    success: `Withdrawal request for ₹${amount} submitted!`,
                    error: {
                        render({ data }: any) {
                            return data?.response?.data?.message || 'Failed to submit request';
                        }
                    }
                }
            );

            // Refresh data after successful withdrawal
            loadData();
        } catch (error) {
            console.error("Withdrawal error:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    // Default stats if fetch failed
    const displayStats = stats || {
        availableBalance: 0,
        totalWithdrawn: 0,
        pendingWithdrawals: 0
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
            <header className="mb-8 font-outfit">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Wallet</h1>
                <p className="text-gray-500 mt-1">Manage your balance and schedule payouts to your bank account.</p>
            </header>

            <div className="max-w-7xl mx-auto">
                <WalletStats stats={displayStats} />

                <WithdrawMoney
                    availableBalance={displayStats.availableBalance}
                    bankAccounts={bankAccounts}
                    onWithdraw={handleWithdraw}
                />

                <div className="pb-12">
                    <WalletTable transactions={transactions} />
                </div>
            </div>
        </div>
    );
}


