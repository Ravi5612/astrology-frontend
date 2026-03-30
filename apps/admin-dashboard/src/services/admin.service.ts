import { api } from "@/src/lib/api";

export const getUsers = async (params?: { page?: number; limit?: number; search?: string }): Promise<[any | null, any | null]> => {
  return await api.get("/admin/users", { params });
};

export const getUserStats = async (): Promise<[any | null, any | null]> => {
  return await api.get("/admin/users/stats");
};

export const getUserById = async (id: number): Promise<[any | null, any | null]> => {
  return await api.get(`/admin/users/${id}`);
};


export const getExperts = async (params?: { page?: number; limit?: number; search?: string; status?: string }): Promise<[any | null, any | null]> => {
  return await api.get("/admin/experts", { params });
};

export const getExpertStats = async (): Promise<[any | null, any | null]> => {
  return await api.get("/admin/experts/stats");
};

export const getExpertById = async (id: number): Promise<[any | null, any | null]> => {
  return await api.get(`/admin/experts/${id}`);
};


export const updateExpertStatus = async (id: number, data: { status: string; reason?: string }): Promise<[any | null, any | null]> => {
  return await api.patch(`/admin/experts/${id}/status`, data);
};

export const toggleUserBlock = async (id: number, isBlocked: boolean): Promise<[any | null, any | null]> => {
  return await api.patch(`/admin/users/${id}/block`, { isBlocked });
};


export const getDashboardStats = async (): Promise<[any | null, any | null]> => {
  return await api.get("/admin/dashboard/stats");
};


export const getUserGrowthStats = async (days: number): Promise<[any | null, any | null]> => {
  return await api.get("/admin/analytics/user-growth", { params: { days } });
};


// Coupons Management
export const createCoupon = async (data: any): Promise<[any | null, any | null]> => {
  return await api.post("/admin/coupons", data);
};

export const assignCouponToUser = async (userId: number, couponCode: string): Promise<[any | null, any | null]> => {
  return await api.post(`/admin/coupons/assign/${userId}`, { code: couponCode });
};

export const getCoupons = async (params?: any): Promise<[any | null, any | null]> => {
  return await api.get("/admin/coupons", { params });
};

export const getCouponStats = async (): Promise<[any | null, any | null]> => {
  return await api.get("/admin/coupons/stats");
};

export const updateCoupon = async (id: string, data: any): Promise<[any | null, any | null]> => {
  return await api.patch(`/admin/coupons/${id}`, data);
};

export const deleteCoupon = async (id: number): Promise<[any | null, any | null]> => {
  return await api.delete(`/admin/coupons/${id}`);
};


// Bulk Coupon Assignment
export const assignCouponBulk = async (data: { couponCode: string; filters: any }): Promise<[any | null, any | null]> => {
  return await api.post("/admin/coupons/assign-bulk", data);
};

// Get count of users matching filters (for preview)
export const getFilteredUsersCount = async (filters: any): Promise<[any | null, any | null]> => {
  return await api.post("/admin/users/filter-count", filters);
};

// Get list of users matching filters (for preview)
export const getFilteredUsers = async (params: any): Promise<[any | null, any | null]> => {
  return await api.post("/admin/users/filtered-list", params);
};


// Disputes / Support Tickets Management
export const getDisputes = async (params?: { page?: number; limit?: number; status?: string }): Promise<[any | null, any | null]> => {
  return await api.get("/admin/support/disputes", { params });
};

export const getDisputeById = async (id: number): Promise<[any | null, any | null]> => {
  return await api.get(`/admin/support/disputes/${id}`);
};

export const updateDisputeStatus = async (id: number, data: { status: string; notes?: string }): Promise<[any | null, any | null]> => {
  return await api.patch(`/admin/support/disputes/${id}/status`, data);
};

export const getDisputeStats = async (): Promise<[any | null, any | null]> => {
  return await api.get("/admin/support/disputes/stats");
};


// Chat APIs
export const getDisputeMessages = async (disputeId: number): Promise<[any | null, any | null]> => {
  return await api.get(`/admin/support/disputes/${disputeId}/messages`);
};

export const sendDisputeMessage = async (disputeId: number, data: { message?: string, attachmentUrl?: string, attachmentType?: string }): Promise<[any | null, any | null]> => {
  return await api.post(`/admin/support/disputes/${disputeId}/messages`, data);
};

export const markDisputeMessagesRead = async (disputeId: number): Promise<[any | null, any | null]> => {
  return await api.patch(`/admin/support/disputes/${disputeId}/messages/read`);
};


// Live Sessions
export const getLiveSessions = async (type?: string, params?: { page?: number; limit?: number }): Promise<[any | null, any | null]> => {
  return await api.get("/admin/live-sessions", { params: { type, ...params } });
};


export const getChatHistory = async (id: number): Promise<[any | null, any | null]> => {
  return await api.get(`/admin/live-sessions/${id}/history`);
};

// Payouts / Withdrawals
export const getPendingWithdrawals = async (params?: { page?: number; limit?: number }): Promise<[any | null, any | null]> => {
  return await api.get("/admin/withdrawals/pending", { params });
};

export const updateWithdrawalStatus = async (id: number, data: { status: string; remark?: string }): Promise<[any | null, any | null]> => {
  return await api.patch(`/admin/withdrawals/${id}/status`, data);
};

export const getWithdrawalStats = async (): Promise<[any | null, any | null]> => {
  return await api.get("/admin/withdrawals/stats");
};





