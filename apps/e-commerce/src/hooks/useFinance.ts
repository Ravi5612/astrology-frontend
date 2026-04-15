import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financeService } from "@/services/finance.service";
import { toast } from "react-toastify";

/**
 * Hook to fetch merchant financial stats
 */
export const useMerchantFinanceStats = () => {
  return useQuery({
    queryKey: ['merchant-finance-stats'],
    queryFn: async () => {
      const [data, error] = await financeService.getStats();
      if (error) {
        throw new Error("Failed to fetch finance stats");
      }
      return data;
    },
  });
};

/**
 * Hook to fetch merchant transactions
 */
export const useMerchantTransactions = (params: any) => {
  return useQuery({
    queryKey: ['merchant-transactions', params],
    queryFn: async () => {
      const [data, error] = await financeService.getTransactions(params);
      if (error) {
        throw new Error("Failed to fetch transactions");
      }
      return data;
    },
  });
};

/**
 * Hook to request a withdrawal
 */
export const useRequestWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      const [data, error] = await financeService.requestWithdrawal(amount);
      if (error) {
        const body = (error as any).body;
        const message = body?.message 
          ? (Array.isArray(body.message) ? body.message[0] : body.message)
          : (error as any).message || "Withdrawal request failed";
        throw new Error(message);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Withdrawal request submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ['merchant-finance-stats'] });
      queryClient.invalidateQueries({ queryKey: ['merchant-transactions'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
};
