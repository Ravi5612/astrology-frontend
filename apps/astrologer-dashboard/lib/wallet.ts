import apiClientSafe, { ApiError } from "./apiClientSafe";
import { WalletStatsData, WalletTransaction } from "../components/Wallet/types";

export const getWalletBalance = async (): Promise<[WalletStatsData | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get('/expert/wallet/balance');
    if (error) return [null, error];
    const data = (res as any)?.data?.data || (res as any)?.data || res;

    // Normalize snake_case to camelCase
    return [{
        availableBalance: data.available_balance ?? data.availableBalance ?? 0,
        totalWithdrawn: data.total_withdrawn ?? data.totalWithdrawn ?? 0,
        pendingWithdrawals: data.pending_withdrawals ?? data.pendingWithdrawals ?? 0,
        balanceTrend: data.balance_trend ?? data.balanceTrend ?? 0
    }, null];
};

export const getWalletTransactions = async (page: number = 1, limit: number = 10): Promise<[{ transactions: WalletTransaction[], total: number } | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get(`/expert/wallet/transactions?page=${page}&limit=${limit}`);
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
    return apiClientSafe.post('/expert/wallet/withdraw', {
        amount: Number(amount),
        bank_account_id: Number(bankAccountId), // Backend expects number and snake_case
    });
};

export const getWithdrawalRequests = async (params?: any): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.get('/expert/wallet/withdrawals', { params });
};

export const getPayoutDetails = async (): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.get('/expert/wallet/payout-details');
};

