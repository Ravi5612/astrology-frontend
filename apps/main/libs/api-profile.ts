import http, { SafeFetchResponse } from "../lib/fetch-handler";
import { ClientProfileData, AddressDto, SupportSettings, CreateDisputeDto } from "../lib/types";

export type { SupportSettings, CreateDisputeDto, ClientProfileData, AddressDto };

/**
 * All functions now return [data, error] tuples instead of throwing.
 */

export const getClientProfile = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/client/profile');
};

export const updateClientProfile = async (data: Partial<ClientProfileData>): Promise<SafeFetchResponse<any>> => {
    return await http.patch('/client/profile', data);
};

export const createClientProfile = async (data: Partial<ClientProfileData>): Promise<SafeFetchResponse<any>> => {
    return await http.post('/client/profile', data);
};

export const uploadClientDocument = async (file: File): Promise<SafeFetchResponse<{ url: string; message: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    return await http.post('/client/profile/upload-document', formData);
};

export const getActiveChatSessions = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/chat/sessions/pending');
};

export const getPendingChatSessions = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/chat/sessions/pending');
};

export const endChatSession = async (sessionId: number): Promise<SafeFetchResponse<any>> => {
    return await http.post(`/chat/end/${sessionId}`);
};

export const getAllChatSessions = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/chat/sessions/my-sessions');
};

export const getChatHistory = async (sessionId: number): Promise<SafeFetchResponse<any>> => {
    return await http.get(`/chat/history/${sessionId}`);
};

export const getMyOrders = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/orders/my-orders');
};

export const getWalletTransactions = async (params?: { purpose?: string, page?: number, limit?: number }): Promise<SafeFetchResponse<any>> => {
    return await http.get('/wallet/transactions', { params } as any);
};

export const getNotifications = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/notifications');
};

export const getUnreadCount = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/notifications/unread-count');
};

export const markNotificationAsRead = async (id: number): Promise<SafeFetchResponse<any>> => {
    return await http.patch(`/notifications/${id}/read`);
};

export const deleteNotification = async (id: number): Promise<SafeFetchResponse<any>> => {
    return await http.del(`/notifications/${id}`);
};

export const clearAllNotifications = async (): Promise<SafeFetchResponse<any>> => {
    return await http.del('/notifications/all');
};

// Rewards & Coupons
export const getMyRewards = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/coupons/my-rewards');
};

export const applyCoupon = async (code: string, amount: number, serviceType: string): Promise<SafeFetchResponse<any>> => {
    return await http.post('/coupons/apply', {
        code,
        couponCode: code,
        amount,
        orderValue: amount,
        serviceType
    });
};

export const getSupportSettings = async (): Promise<SafeFetchResponse<SupportSettings>> => {
    const [data, error] = await http.get('/settings/support');
    
    // Fallback if backend API is not yet available
    if (error || !data) {
        return [{
            email: "support@astrologyinbharat.com",
            phone: "+91-9999999999",
            whatsapp: "+91-9999999999"
        }, null];
    }
    
    return [data, null];
};

// Disputes / Support Tickets
export const createDispute = async (data: CreateDisputeDto): Promise<SafeFetchResponse<any>> => {
    return await http.post('/support/disputes', data);
};

export const getMyDisputes = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/support/disputes');
};

export const getDisputeById = async (disputeId: number): Promise<SafeFetchResponse<any>> => {
    return await http.get(`/support/disputes/${disputeId}`);
};

export const getDisputeMessages = async (disputeId: number): Promise<SafeFetchResponse<any>> => {
    return await http.get(`/support/disputes/${disputeId}/messages`);
};

export const sendDisputeMessage = async (disputeId: number, data: { message?: string, attachmentUrl?: string, attachmentType?: string }): Promise<SafeFetchResponse<any>> => {
    return await http.post(`/support/disputes/${disputeId}/messages`, data);
};

export const markDisputeMessagesRead = async (disputeId: number): Promise<SafeFetchResponse<any>> => {
    return await http.patch(`/support/disputes/${disputeId}/messages/read`);
};

// Puja Bookings
export const getMyPujaAppointments = async (): Promise<SafeFetchResponse<any>> => {
    return await http.get('/puja-appointments/user');
};

export const updatePujaAppointmentStatus = async (id: number, data: any): Promise<SafeFetchResponse<any>> => {
    return await http.patch(`/puja-appointments/${id}/status`, data);
};

// For backward compatibility during migration, export http as default
export default http;
