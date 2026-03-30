import apiClientSafe from "./apiClientSafe";
import { Profile, Todo } from "../components/ProfileManagement/types";
import { ApiError } from "../../../packages/safe-fetch/index";

export const getProfile = async (): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get('/expert');
    if (error) return [null, error];
    const data = (res as any)?.data ?? res;
    return [data, null];
};

export const updateProfile = async (data: Partial<Profile>): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert', data);
};

export const createProfile = async (data: Partial<Profile>): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.post<any>('/expert', data);
};

export const uploadDocument = async (file: File): Promise<[any | null, ApiError | null]> => {
    const formData = new FormData();
    formData.append('file', file);

    const [res, error] = await apiClientSafe.upload('/expert/upload-file', formData);
    if (error) return [null, error];
    const data = (res as any)?.data ?? res;
    return [data, null];
};

// Segmented Updates
export const updatePersonalInfo = async (data: any): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/personal-info', data);
};

export const updatePricing = async (data: any): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/pricing', data);
};

export const updateBankDetails = async (bankDetails: string): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/bank-details', { bank_details: bankDetails });
};

export const updatePortfolio = async (data: any): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/portfolio', data);
};

export const updateCertificates = async (certificates: string[]): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/certificates', { certificates });
};

export const updateDocuments = async (documents: any[]): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/documents', { documents });
};

export const updateExperience = async (experience: any[]): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>('/expert/experience', { detailed_experience: experience });
};

// Bank Account APIs
export const getBankAccounts = async (): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get('/expert/bank-accounts');
    if (error) return [null, error];
    const data = (res as any)?.data ?? res;
    return [data, null];
};

export const addBankAccount = async (data: any): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.post<any>('/expert/bank-accounts', data);
    if (error) return [null, error];
    const respData = (res as any)?.data ?? res;
    return [respData, null];
};

export const updateBankAccount = async (id: string, data: any): Promise<[any | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.patch<any>(`/expert/bank-accounts/${id}`, data);
    if (error) return [null, error];
    const respData = (res as any)?.data ?? res;
    return [respData, null];
};

export const deleteBankAccount = async (id: string): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.delete<any>(`/expert/bank-accounts/${id}`);
};

export const setPrimaryBankAccount = async (id: string): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.patch<any>(`/expert/bank-accounts/${id}/set-primary`);
};

// Todo APIs
export const getTodos = async (): Promise<[Todo[] | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.get('/expert/todos');
    if (error) return [null, error];
    const data = ((res as any)?.data ?? res) as Todo[];
    return [data, null];
};

export const createTodo = async (text: string): Promise<[Todo | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.post<any>('/expert/todos', { text });
    if (error) return [null, error];
    const data = ((res as any)?.data ?? res) as Todo;
    return [data, null];
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<[Todo | null, ApiError | null]> => {
    const [res, error] = await apiClientSafe.patch<any>(`/expert/todos/${id}`, updates);
    if (error) return [null, error];
    const data = ((res as any)?.data ?? res) as Todo;
    return [data, null];
};

export const deleteTodoApi = async (id: number): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.delete<any>(`/expert/todos/${id}`);
};

// Puja APIs
export const upsertPujaApi = async (data: any, id?: number): Promise<[any | null, ApiError | null]> => {
    const url = id ? `/expert/puja?id=${id}` : '/expert/puja';
    const [res, error] = await apiClientSafe.post(url, data);
    if (error) return [null, error];
    const respData = (res as any)?.data ?? res;
    return [respData, null];
};

export const deletePujaApi = async (id: number): Promise<[any | null, ApiError | null]> => {
    return apiClientSafe.delete<any>(`/expert/puja/${id}`);
};
