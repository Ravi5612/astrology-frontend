import apiClient from "./apiClient";
import { WalletStatsData, WalletTransaction } from "../components/Wallet/types";

export const getWalletBalance = async (): Promise<WalletStatsData> => {
    try {
        const response: any = await apiClient.get('/expert/wallet/balance');
        const data = response?.data?.data || response?.data || response;

        // Normalize snake_case to camelCase
        return {
            availableBalance: data.available_balance ?? data.availableBalance ?? 0,
            totalWithdrawn: data.total_withdrawn ?? data.totalWithdrawn ?? 0,
            pendingWithdrawals: data.pending_withdrawals ?? data.pendingWithdrawals ?? 0,
            balanceTrend: data.balance_trend ?? data.balanceTrend ?? 0
        };
    } catch (error) {
        console.error("[Wallet] Failed to fetch balance:", error);
        throw error;
    }
};

export const getWalletTransactions = async (page: number = 1, limit: number = 10): Promise<{ transactions: WalletTransaction[], total: number }> => {
    try {
        const response: any = await apiClient.get(`/expert/wallet/transactions?page=${page}&limit=${limit}`);
        const data = response?.data?.data || response?.data || response;

        const transactions = (data.items || data.transactions || (Array.isArray(data) ? data : [])).map((tx: any) => ({
            id: tx.id,
            date: tx.created_at || tx.createdAt || tx.date,
            description: tx.description || tx.purpose || "Transaction",
            type: tx.type,
            amount: Number(tx.amount || 0),
            status: tx.status || 'completed',
            bankAccount: tx.bank_account || tx.bankAccount
        }));

        return {
            transactions,
            total: data.total ?? transactions.length
        };
    } catch (error) {
        console.error("[Wallet] Failed to fetch transactions:", error);
        throw error;
    }
};

export const requestWithdrawal = async (amount: number, bankAccountId: string) => {
    try {
        const response: any = await apiClient.post('/expert/wallet/withdraw', {
            amount: Number(amount),
            bank_account_id: Number(bankAccountId), // Backend expects number and snake_case
        });
        return response?.data ?? response;
    } catch (error) {
        console.error("[Wallet] Withdrawal request failed:", error);
        throw error;
    }
};


