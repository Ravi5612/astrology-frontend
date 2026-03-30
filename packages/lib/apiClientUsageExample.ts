// Example: How to use the API client in your components/pages

import apiClientSafe from './apiClientSafe';

/**
 * NEW: The modernized API client (apiClientSafe) uses a [data, error] tuple pattern.
 * This eliminates the need for try/catch blocks and provides type safety for errors.
 */

// Example 1: Fetching data
export const fetchExperts = async () => {
    // No more try/catch needed!
    const [data, error] = await apiClientSafe.get<any>('/expert/profile/list', {
        params: {
            limit: 20,
            offset: 0,
        },
    });

    if (error) {
        console.error('Error fetching experts:', error.message);
        return [];
    }

    return data?.data || data || [];
};

// Example 2: Updating data
export const updateProfile = async (profileData: any) => {
    const [data, error] = await apiClientSafe.put('/user/profile', profileData);

    if (error) {
        console.error('Error updating profile:', error.message);
        return null;
    }

    return data;
};

// Example 3: Deleting data
export const deleteItem = async (itemId: string) => {
    const [data, error] = await apiClientSafe.delete(`/items/${itemId}`);

    if (error) {
        console.error('Error deleting item:', error.message);
        return false;
    }

    return true;
};

// Example 4: Uploading files
export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    // apiClientSafe.upload handles FormData correctly
    const [data, error] = await apiClientSafe.upload<any>('/upload', formData);

    if (error) {
        console.error('Error uploading file:', error.message);
        return null;
    }

    return data;
};

// Example 5: Using in a service class
export class ExpertService {
    static async getAll(params?: { limit?: number; offset?: number }) {
        const [data, error] = await apiClientSafe.get<any>('/expert/profile/list', { params });
        if (error) return [];
        return data?.data || data || [];
    }

    static async getById(id: number) {
        const [data, error] = await apiClientSafe.get(`/expert/profile/${id}`);
        return data;
    }

    static async create(data: any) {
        const [res, error] = await apiClientSafe.post('/expert/profile', data);
        return res;
    }

    static async update(id: number, data: any) {
        return await apiClientSafe.put(`/expert/profile/${id}`, data);
    }

    static async delete(id: number) {
        return await apiClientSafe.delete(`/expert/profile/${id}`);
    }
}

/*
 * REACT COMPONENT USAGE EXAMPLE
 * 
 * Create this in a .tsx file in your app:
 * 
 * "use client";
 * import { useEffect, useState } from 'react';
 * import apiClientSafe from '@/lib/apiClientSafe';
 * 
 * export const ExampleComponent = () => {
 *   const [data, setData] = useState(null);
 *   const [loading, setLoading] = useState(true);
 *   const [errorMsg, setErrorMsg] = useState("");
 * 
 *   useEffect(() => {
 *     const loadData = async () => {
 *       const [result, error] = await apiClientSafe.get('/some-endpoint');
 *       
 *       if (error) {
 *         setErrorMsg(error.message);
 *       } else {
 *         setData(result);
 *       }
 *       setLoading(false);
 *     };
 * 
 *     loadData();
 *   }, []);
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (errorMsg) return <div>Error: {errorMsg}</div>;
 * 
 *   return <div>{JSON.stringify(data)}</div>;
 * };
 */
