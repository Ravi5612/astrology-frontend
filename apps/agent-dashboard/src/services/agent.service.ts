import { api } from "../lib/api";
import { ApiError } from "@repo/safe-fetch";
import { API_ROUTES } from "../lib/api-routes";

// ── Profile ──────────────────────────────────────────────────────────────────
export const getAgentProfile = async (): Promise<[any | null, ApiError | null]> => {
    return api.get(API_ROUTES.AGENTS.PROFILE);
};

export const updateAgentProfile = async (payload: any): Promise<[any | null, ApiError | null]> => {
    return api.patch(API_ROUTES.AGENTS.PROFILE, payload);
};

// ── Listings ─────────────────────────────────────────────────────────────────
export interface ListingParams {
    page?: number;
    limit?: number;
    type?: string; // 'expert' | 'mandir' | 'puja_shop'
    search?: string;
}

export interface CreateListingPayload {
    type: "mandir" | "expert" | "puja_shop";
    name: string;
    location?: string;
    phone?: string;
    deity?: string;          // mandir
    specialization?: string; // expert
    items?: string;          // puja_shop
}

export interface ListingItem {
    id?: string;
    _id?: string;
    name: string;
    status: string;
    specialization?: string;
    location?: string;
    phone?: string;
    createdAt?: string;
    [key: string]: any;
}

export interface ListingsResponse {
    data: ListingItem[];
    total?: number;
    page?: number;
    limit?: number;
}

export const getAgentListings = async (params?: ListingParams): Promise<[ListingsResponse | null, ApiError | null]> => {
    return api.get<ListingsResponse>(API_ROUTES.AGENTS.LISTINGS, params as Record<string, any>);
};

export interface ReferredUser {
    id: number | string;
    name: string;
    email: string | null;
    phone: string | null;
    status: string;
    type: 'expert' | 'client' | 'merchant' | 'mandir' | 'puja_shop';
    avatar: string | null;
    createdAt: string;
    location?: string | null;
    deity?: string | null;
    items?: string | null;
    commission?: number;
    commissionPercent?: number;
    totalSpending?: number | null;
    totalEarning?: number | null;
}

export interface ReferredUsersResponse {
    data: ReferredUser[];
    total: number;
    page: number;
    limit: number;
}

export interface ReferredUsersParams {
    type?: 'expert' | 'client' | 'merchant' | 'mandir' | 'puja_shop';
    search?: string;
    page?: number;
    limit?: number;
}

export interface CommissionResponse {
    data: any[];
    total: number;
    page: number;
    limit: number;
}

export const getReferredUsers = async (params?: ReferredUsersParams): Promise<[ReferredUsersResponse | null, ApiError | null]> => {
    return api.get<ReferredUsersResponse>(API_ROUTES.AGENTS.REFERRED_USERS, params as Record<string, any>);
};

export const getAgentCommissions = async (params?: { page?: number; limit?: number }): Promise<[CommissionResponse | null, ApiError | null]> => {
    return api.get<CommissionResponse>(API_ROUTES.AGENTS.COMMISSIONS, params as Record<string, any>);
};


export const createListing = async (payload: CreateListingPayload): Promise<[any | null, ApiError | null]> => {
    return api.post(API_ROUTES.AGENTS.LISTINGS, payload as Record<string, any>);
};

// ── Register User/Expert ─────────────────────────────────────────────────────
export interface RegisterUserPayload {
    name: string;
    email: string;
    phone: string;
    userType: "expert" | "client" | "merchant";
}

export interface RegisterUserResponse {
    success: boolean;
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        referredByAgentId: string;
    };
    tempPassword: string; // ⚠️ Show once only — never store
    emailSent?: boolean;
    emailError?: string;
}

export const registerUserByAgent = async (payload: RegisterUserPayload): Promise<[RegisterUserResponse | null, ApiError | null]> => {
    const { userType, ...rest } = payload;
    const body = {
        ...rest,
        roles: [userType], // 'expert', 'client', or 'merchant'
    };
    return api.post<RegisterUserResponse>(API_ROUTES.AGENTS.REGISTER_USER, body as Record<string, any>);
};

// ── Dashboard Stats ──────────────────────────────────────────────────────────
export const getAgentDashboardStats = async (): Promise<[any | null, ApiError | null]> => {
    const [data, error] = await api.get(API_ROUTES.AGENTS.DASHBOARD_STATS);
    if (error) {
        // Return null data and any default object if needed by UI, 
        // but here we stick to the tuple pattern.
        return [null, error];
    }
    return [data, null];
};

// ── Wallet ───────────────────────────────────────────────────────────────────
export const getAgentWalletBalance = async (): Promise<[any | null, ApiError | null]> => {
    return api.get(API_ROUTES.AGENTS.WALLET.BALANCE);
};

export const getAgentWithdrawals = async (): Promise<[any | null, ApiError | null]> => {
    return api.get(API_ROUTES.AGENTS.WALLET.WITHDRAWALS);
};

export const requestAgentWithdrawal = async (amount: number): Promise<[any | null, ApiError | null]> => {
    return api.post(API_ROUTES.AGENTS.WALLET.WITHDRAW, { amount });
};

export const settleAgentCommissions = async (): Promise<[any | null, ApiError | null]> => {
    return api.post(API_ROUTES.AGENTS.WALLET.SETTLE, {});
};
