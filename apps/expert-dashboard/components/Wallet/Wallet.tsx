"use client";

import React from "react";
import WalletStats from "./WalletStats";
import WithdrawMoney from "./WithdrawMoney";
import WalletTable from "./WalletTable";
import { useWallet } from "@/src/hooks/useWallet";

export default function Wallet() {
    const { 
        stats, 
        transactions, 
        bankAccounts, 
        isLoading, 
        handleWithdraw,
        isWithdrawing 
    } = useWallet();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    // Default stats if fetch failed or loading
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
                    isLoading={isWithdrawing}
                />

                <div className="pb-12">
                    <WalletTable transactions={transactions} />
                </div>
            </div>
        </div>
    );
}


