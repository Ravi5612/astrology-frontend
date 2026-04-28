import { api } from '@/lib/api';
import { ApiResponse } from '@/types/dashboard';

export interface Order {
  id: string;
  orderId?: string;
  orderNumber?: string;
  customerName: string;
  amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  date: string;
  itemsCount: number;
}

export interface OrderStats {
  total: number;
  pending: number;
  shipped: number;
  revenue: number;
}

export const orderService = {
  getOrders: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    const [response, error] = await api.get<ApiResponse<{ orders: Order[], stats: OrderStats }>>(`/merchant/orders${query}`);
    return [response?.data || { orders: [], stats: { total: 0, pending: 0, shipped: 0, revenue: 0 } }, error] as const;
  },

  updateStatus: async (id: string | number, status: string, cancellationReason?: string) => {
    const [response, error] = await api.patch<ApiResponse<any>>(`/merchant/orders/${id}/status`, { status, cancellationReason });
    return [response?.data, error] as const;
  },

  verifyOtp: async (id: string | number, otp: string) => {
    const [response, error] = await api.post<ApiResponse<any>>(`/merchant/orders/${id}/verify-otp`, { otp });
    return [response?.data, error] as const;
  },
  sendOtp: async (id: string | number) => {
    const [response, error] = await api.post<ApiResponse<any>>(`/merchant/orders/${id}/send-otp`);
    return [response?.data, error] as const;
  }
};
