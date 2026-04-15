import { api } from "@/src/lib/api";
import type { Agent, AgentListing, Commission, AgentStats } from "@/app/components/agent/agent";
import {
    MOCK_AGENTS,
    MOCK_LISTINGS,
    MOCK_COMMISSIONS,
} from "@/app/components/agent/agentMockData";

// ─── Helpers ──────────────────────────────────────────────────────────────────
/**
 * When the real API is ready, replace the mock return with the api.* call.
 * Keeping both here so switching is a one-liner.
 */

// ─── Agents ───────────────────────────────────────────────────────────────────
export const getAgents = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) => {
    const [data] = await api.get<{ data: Agent[]; total: number }>("/admin/agents", {
        params: {
            page: params?.page,
            limit: params?.limit,
            search: params?.search,
            status: params?.status === "" ? undefined : params?.status
        }
    });
    return data as { data: Agent[]; total: number };
};

export const getAgentStats = async () => {
    const [data] = await api.get<AgentStats>("/admin/agents/stats");
    return data as AgentStats;
};

export const getAgentById = async (id: string | number) => {
    const [data] = await api.get<Agent>(`/admin/agents/${id}`);
    return data as Agent;
};

export const createAgent = async (formData: FormData) => {
    const [data] = await api.upload<any>("/admin/agents", formData);
    return data;
};

export const updateAgentStatus = async (
    id: string | number,
    status: Agent["status"]
) => {
    const [data] = await api.patch<any>(`/admin/agents/${id}`, { status });
    return data;
};

// ─── OTP Verification ─────────────────────────────────────────────────────────
export const sendAgentOtp = async (email: string) => {
    const [data] = await api.post<any>("/admin/agents/send-otp", { email });
    return data;
};

export const verifyAgentOtp = async (email: string, otp: string) => {
    const [data] = await api.post<any>("/admin/agents/verify-otp", { email, otp });
    return data;
};

// ─── Listings ─────────────────────────────────────────────────────────────────
export const getListingsByAgent = async (agent_id: string) => {
    const [data] = await api.get<AgentListing[]>(`/admin/agents/${agent_id}/listings`);
    return data as AgentListing[];
};

export const getAllListings = async (params?: {
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
}) => {
    const [data] = await api.get<{ data: AgentListing[]; total: number; stats: any }>("/admin/listings", {
        params: {
            type: params?.type === "" ? undefined : params?.type,
            search: params?.search,
            page: params?.page,
            limit: params?.limit
        }
    });
    return data;
};

export const updateListingStatus = async (
    id: string | number,
    status: "approved" | "rejected" | "pending",
    reason?: string
) => {
    const [data] = await api.patch<any>(`/admin/listings/${id}/status`, { status, reason });
    return data;
};

// ─── Commissions ──────────────────────────────────────────────────────────────
export const getCommissions = async (params?: {
    agent_id?: string;
    status?: string;
}) => {
    const [data] = await api.get<{ data: Commission[] }>("/admin/commissions", { params });
    return data as { data: Commission[] };
};

export const markCommissionPaid = async (id: number) => {
    const [data] = await api.patch<any>(`/admin/commissions/${id}/pay`);
    return data;
};

// ─── Self-Registered Merchants ────────────────────────────────────────────────
export const getAdminMerchantProfiles = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}) => {
    const [data] = await api.get<{ merchants: any[]; total: number }>("/admin/merchants", {
        params: {
            page: params?.page || 1,
            limit: params?.limit || 10,
            search: params?.search,
            status: params?.status === "" ? undefined : params?.status
        }
    });
    // Return unified structure
    return {
        data: (data as any)?.merchants || (data as any)?.data || [],
        total: (data as any)?.total || 0
    };
};

export const updateMerchantProfileStatus = async (
    id: string | number,
    status: string
) => {
    const [data] = await api.patch<any>(`/admin/merchants/${id}/status`, { status });
    return data;
};
