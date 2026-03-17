import { api } from "@/src/lib/api";

export const getUsers = async (params?: { page?: number; limit?: number; search?: string }) => {
  const res = await api.get("/admin/users", { params }) as any;
  return res.data;
};

export const getUserStats = async () => {
  const res = await api.get("/admin/users/stats") as any;
  return res.data;
};

export const getUserById = async (id: number) => {
  const res = await api.get(`/admin/users/${id}`) as any;
  return res.data;
};

export const getExperts = async (params?: { page?: number; limit?: number; search?: string; status?: string }) => {
  const res = await api.get("/admin/experts", { params }) as any;
  return res.data;
};

export const getExpertStats = async () => {
  const res = await api.get("/admin/experts/stats") as any;
  return res.data;
};

export const getExpertById = async (id: number) => {
  const res = await api.get(`/admin/experts/${id}`) as any;
  return res.data;
};

export const updateExpertStatus = async (id: number, data: { status: string; reason?: string }) => {
  const res = await api.patch(`/admin/experts/${id}/status`, data) as any;
  return res.data;
};
export const toggleUserBlock = async (id: number, isBlocked: boolean) => {
  const res = await api.patch(`/admin/users/${id}/block`, { isBlocked }) as any;
  return res.data;
};

export const getDashboardStats = async () => {
  try {
    const res = await api.get("/admin/dashboard/stats") as any;
    return res.data;
  } catch (error) {
    console.error("Dashboard stats fetch failed, returning mock fallback", error);
    return null;
  }
};

export const getUserGrowthStats = async (days: number) => {
  const res = await api.get("/admin/analytics/user-growth", { params: { days } }) as any;
  return res.data;
};

// Coupons Management
export const createCoupon = async (data: any) => {
  const res = await api.post("/admin/coupons", data) as any;
  return res.data;
};

export const assignCouponToUser = async (userId: number, couponCode: string) => {
  const res = await api.post(`/admin/coupons/assign/${userId}`, { code: couponCode }) as any;
  return res.data;
};

export const getCoupons = async (params?: any) => {
  const res = await api.get("/admin/coupons", { params }) as any;
  return res.data;
};

export const getCouponStats = async () => {
  const res = await api.get("/admin/coupons/stats") as any;
  return res.data;
};

export const updateCoupon = async (id: string, data: any) => {
  const res = await api.patch(`/admin/coupons/${id}`, data) as any;
  return res.data;
};

export const deleteCoupon = async (id: number) => {
  const res = await api.delete(`/admin/coupons/${id}`) as any;
  return res.data;
};

// Bulk Coupon Assignment
export const assignCouponBulk = async (data: { couponCode: string; filters: any }) => {
  const res = await api.post("/admin/coupons/assign-bulk", data) as any;
  return res.data;
};

// Get count of users matching filters (for preview)
export const getFilteredUsersCount = async (filters: any) => {
  const res = await api.post("/admin/users/filter-count", filters) as any;
  return res.data.count || 0;
};

// Get list of users matching filters (for preview)
export const getFilteredUsers = async (params: any) => {
  const res = await api.post("/admin/users/filtered-list", params) as any;
  return res.data.users || res.data || [];
};

// Disputes / Support Tickets Management
export const getDisputes = async (params?: { page?: number; limit?: number; status?: string }) => {
  try {
    const res = await api.get("/admin/support/disputes", { params }) as any;
    return res.data;
  } catch (err) {
    console.error("Failed to fetch disputes:", err);
    return [];
  }
};

export const getDisputeById = async (id: number) => {
  try {
    const res = await api.get(`/admin/support/disputes/${id}`) as any;
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch dispute ${id}:`, err);
    return null;
  }
};

export const updateDisputeStatus = async (id: number, data: { status: string; notes?: string }) => {
  const res = await api.patch(`/admin/support/disputes/${id}/status`, data) as any;
  return res.data;
};

export const getDisputeStats = async () => {
  try {
    const res = await api.get("/admin/support/disputes/stats") as any;
    return res.data;
  } catch (err) {
    console.error("Failed to fetch dispute stats:", err);
    return {
      total: 0,
      pending: 0,
      underReview: 0,
      resolved: 0,
      rejected: 0,
    };
  }
};

// Chat APIs
export const getDisputeMessages = async (disputeId: number) => {
  try {
    const res = await api.get(`/admin/support/disputes/${disputeId}/messages`) as any;
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch messages for dispute ${disputeId}:`, err);
    return [];
  }
};

export const sendDisputeMessage = async (disputeId: number, data: { message?: string, attachmentUrl?: string, attachmentType?: string }) => {
  try {
    const res = await api.post(`/admin/support/disputes/${disputeId}/messages`, data) as any;
    return res.data;
  } catch (err) {
    console.error(`Failed to send dispute message:`, err);
    throw err;
  }
};

export const markDisputeMessagesRead = async (disputeId: number) => {
  try {
    const res = await api.patch(`/admin/support/disputes/${disputeId}/messages/read`) as any;
    return res.data;
  } catch (err) {
    console.error(`Failed to mark messages as read:`, err);
    return null;
  }
};

// Live Sessions
export const getLiveSessions = async (type?: string, params?: { page?: number; limit?: number }) => {
  const res = await api.get("/admin/live-sessions", { params: { type, ...params } }) as any;
  return res.data;
};


export const getChatHistory = async (id: number) => {
  const res = await api.get(`/admin/live-sessions/${id}/history`) as any;
  return res.data;
};

// Payouts / Withdrawals
export const getPendingWithdrawals = async (params?: { page?: number; limit?: number }) => {
  const res = await api.get("/admin/withdrawals/pending", { params }) as any;
  return res.data;
};

export const updateWithdrawalStatus = async (id: number, data: { status: string; remark?: string }) => {
  const res = await api.patch(`/admin/withdrawals/${id}/status`, data) as any;
  return res.data;
};

export const getWithdrawalStats = async () => {
  const res = await api.get("/admin/withdrawals/stats") as any;
  return res.data;
};




