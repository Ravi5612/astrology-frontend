import { api } from "@/lib/api";

export const financeService = {
  getStats: () => api.get<any>("/merchant/finance/stats"),
  getTransactions: (params: any) => api.get<any>("/merchant/finance/transactions", { params }),
  requestWithdrawal: (amount: number) => api.post<any>("/merchant/finance/withdraw", { amount }),
};
