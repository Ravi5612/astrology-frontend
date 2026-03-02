import apiClient from './apiClient';

export interface Notification {
    id: string;
    title: string;
    message: string;
    description?: string;
    createdAt: string;
    isRead: boolean;
    type: string;
}

export const getNotifications = async () => {
    const response: any = await apiClient.get('/notifications');
    return response?.data ?? response;
};

export const markAsRead = async (id: string) => {
    const response: any = await apiClient.patch(`/notifications/${id}/read`);
    return response?.data ?? response;
};

export const deleteNotification = async (id: string) => {
    const response: any = await apiClient.delete(`/notifications/${id}`);
    return response?.data ?? response;
};


