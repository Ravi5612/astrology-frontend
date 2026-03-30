import apiClientSafe, { SafeFetchResponse } from "../lib/fetch-handler";
import { API_ROUTES } from "../lib/api-routes";

export interface ClientUser {
    id: number;
    name?: string;
    email?: string;
    role?: string;
    roles?: string[];
    avatar?: string;
    profile_picture?: string;
    phone?: string;
}

export const AuthService = {
    logout: async (): Promise<SafeFetchResponse<any>> => {
        return await apiClientSafe.post(API_ROUTES.AUTH.LOGOUT);
    },

    fetchProfile: async (serverHeaders?: any): Promise<SafeFetchResponse<any>> => {
        return await apiClientSafe.get(API_ROUTES.AUTH.ME, {
            headers: {
                ...serverHeaders,
            }
        });
    },

    fetchBalance: async (): Promise<SafeFetchResponse<any>> => {
        return await apiClientSafe.get(API_ROUTES.WALLET.BALANCE);
    }
};

