import { create } from "zustand";
import { AuthService, ClientUser } from "../services/auth.service";
import { api } from "../lib/api";

interface AuthState {
    clientUser: ClientUser | null;
    clientBalance: number;
    clientLoading: boolean;
    isClientAuthenticated: boolean;

    // Actions
    clientLogin: (userData?: ClientUser) => void;
    clientLogout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
    refreshBalance: () => Promise<void>;
    updateClientUser: (data: Partial<ClientUser>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    clientUser: null,
    clientBalance: 0,
    clientLoading: true,
    isClientAuthenticated: false,

    // ── NOTE: Token is NEVER passed here. ──────────────────────────────
    // HttpOnly cookie is already set by the Server Action (actions/auth.ts).
    // Frontend's job: just update UI state.
    // ───────────────────────────────────────────────────────────────────
    clientLogin: (userData?: ClientUser) => {
        if (userData) {
            set({ clientUser: userData, isClientAuthenticated: true, clientLoading: false });
        }
        set({ isClientAuthenticated: true, clientLoading: false });

        // Fetch balance after login
        get().refreshBalance();

        // Load full profile if user data is incomplete
        if (!userData) {
            get().refreshAuth();
        }
    },

    clientLogout: async () => {
        // Guard to prevent multiple simultaneous logout calls or redundant loops
        if (!get().isClientAuthenticated && !get().clientUser) {
            return;
        }

        // Reset Zustand state IMMEDIATELY — prevents interceptors from triggering logout again
        set({
            clientUser: null,
            isClientAuthenticated: false,
            clientLoading: false,
            clientBalance: 0,
        });

        // 1. Tell the backend to invalidate the session (best-effort)
        // Since isClientAuthenticated is now false, any 401 here won't trigger recursion.
        await AuthService.logout();

        // 2. Clear HttpOnly cookies via a dedicated API route
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch {
            // Silently fail logout cleanup
        }

        // 3. Full page redirect — forces server to re-render with cleared cookies
        if (typeof window !== "undefined") {
            window.location.href = "/?_logout=1"; // cache-busting param
        }
    },

    refreshBalance: async () => {
        const [res, error] = await AuthService.fetchBalance();
        if (error) {
            // Silently fail — balance is non-critical
            return;
        }

        const raw = res?.data ?? res;

        let parsed = 0;
        if (typeof raw === "number") {
            parsed = raw;
        } else if (typeof raw === "string") {
            const n = Number(raw);
            parsed = Number.isFinite(n) ? n : 0;
        } else if (raw && typeof raw === "object") {
            const candidate = raw.balance ?? raw.amount ?? raw.walletBalance;
            const n = Number(candidate);
            parsed = Number.isFinite(n) ? n : 0;
        }

        set({ clientBalance: parsed });
    },

    refreshAuth: async () => {
        if (!get().isClientAuthenticated) {
            set({ clientLoading: true });
        }

        // Priority: Try fetching the more detailed client profile first
        let [res, error] = await api.get<any>('/client/profile');
        if (error) {
            const [profileRes, profileError] = await AuthService.fetchProfile();
            res = profileRes;
            error = profileError;
        }

        if (error) {
            set({
                isClientAuthenticated: false,
                clientUser: null,
                clientLoading: false
            });
            return;
        }

        // Support both shapes:
        // 1) direct payload (api instance result)
        // 2) wrapped payload { status, data }
        const raw = res?.data ?? res;

        let user: ClientUser | null = null;
        

        if (raw?.user?.id) {
            user = {
                id: raw.user.id,
                name: raw.user.name,
                email: raw.user.email,
                roles: raw.user.roles || [],
                profile_picture: raw.profile_picture,
                avatar: raw.profile_picture,
            };
        } else if (raw?.id) {
            user = {
                id: raw.id,
                name: raw.full_name || raw.name || "User",
                email: raw.email || "",
                roles: raw.roles || [],
                profile_picture: raw.profile_picture,
                avatar: raw.profile_picture,
            };
        }

        if (user) {
            set({
                clientUser: {
                    ...(get().clientUser || {}),
                    ...user
                } as ClientUser,
                isClientAuthenticated: true,
                clientLoading: false
            });
            get().refreshBalance();
        } else {
            set({
                isClientAuthenticated: false,
                clientUser: null,
                clientLoading: false
            });
        }
    },

    updateClientUser: (data: Partial<ClientUser>) => {
        const current = get().clientUser;
        if (current) {
            set({ clientUser: { ...current, ...data } });
        }
    },
}));
