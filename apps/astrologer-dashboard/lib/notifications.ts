import apiClientSafe, { ApiError } from "./apiClientSafe";


export interface Notification {
    id: string;
    title: string;
    message: string;
    created_at: string;
    read: boolean;
    type: string;
}

export const getNotifications = async (): Promise<[Notification[] | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get('/notifications');
    if (error) return [null, error];
    const data = ((res as any)?.data ?? res) as Notification[];
    return [data, null];
};

export const markAsRead = async (id: string): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.patch(`/notifications/${id}/read`);
    if (error) return [null, error];
    const data = (res as any)?.data ?? res;
    return [data, null];
};

export const deleteNotification = async (id: string): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.delete(`/notifications/${id}`);
    if (error) return [null, error];
    const data = (res as any)?.data ?? res;
    return [data, null];
};
