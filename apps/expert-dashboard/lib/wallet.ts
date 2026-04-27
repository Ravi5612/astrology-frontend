import { api, ApiError } from "./api";
import { WalletStatsData, WalletTransaction } from "@/types/wallet";

export const getWalletBalance = async (): Promise<[WalletStatsData | null, ApiError | null]> => {
    const [res, error] = await api.get('/expert/wallet/balance');
    if (error) return [null, error];
    const data = (res as any)?.data?.data || (res as any)?.data || res;

    // Normalize snake_case to camelCase
    return [{
        availableBalance: data.availableBalance ?? data.available_balance ?? 0,
        totalWithdrawn: data.totalWithdrawn ?? data.total_withdrawn ?? 0,
        pendingApproval: data.pendingAmount ?? data.pending_amount ?? 0,
        processing: (Number(data.processingAmount || 0) + Number(data.approvedAmount || 0)) || 0,
        totalEarnings: data.totalEarnings ?? data.total_earnings ?? 0,
        balanceTrend: data.balance_trend ?? data.balanceTrend ?? 0
    }, null];
};

export const getWalletTransactions = async (page: number = 1, limit: number = 10): Promise<[{ transactions: WalletTransaction[], total: number } | null, ApiError | null]> => {
    const [res, error] = await api.get(`/expert/wallet/transactions?page=${page}&limit=${limit}`);
    if (error) return [null, error];
    const data = (res as any)?.data?.data || (res as any)?.data || res;

    const transactions = (data.items || data.transactions || (Array.isArray(data) ? data : [])).map((tx: any) => ({
        id: tx.id,
        date: tx.created_at || tx.createdAt || tx.date,
        description: tx.description || tx.purpose || "Transaction",
        type: tx.type,
        amount: Number(tx.amount || 0),
        status: tx.status || 'completed',
        bankAccount: tx.bank_account || tx.bankAccount
    }));

    return [{
        transactions,
        total: data.total ?? transactions.length
    }, null];
};

export const requestWithdrawal = async (amount: number, bankAccountId: string): Promise<[any | null, ApiError | null]> => {
    return api.post('/expert/wallet/withdraw', {
        amount: Number(amount),
        bank_account_id: Number(bankAccountId), // Backend expects number and snake_case
    });
};

export const getWithdrawalRequests = async (params?: any): Promise<[any | null, ApiError | null]> => {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return api.get(`/expert/wallet/withdrawals${queryString}`);
};

export const getPayoutDetails = async (): Promise<[any | null, ApiError | null]> => {
    return api.get('/expert/wallet/payout-details');
};
