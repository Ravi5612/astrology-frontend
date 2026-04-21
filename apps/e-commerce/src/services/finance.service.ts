import { api } from "@/lib/api";

export const financeService = {
  getStats: async () => {
    const [res, err] = await api.get<any>("/merchant/finance/stats");
    return [res?.data || null, err];
  },
  getTransactions: async (params: any) => {
    const [res, err] = await api.get<any>("/merchant/finance/transactions", { params });
    return [res?.data || [], err];
  },
  requestWithdrawal: async (amount: number) => {
    const [res, err] = await api.post<any>("/merchant/finance/withdraw", { amount });
    return [res?.data || null, err];
  },
};
