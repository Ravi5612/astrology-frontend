export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/agent/profile',
    },
    AGENTS: {
        PROFILE: '/agent/profile',
        LISTINGS: '/agent/listings',          // GET + POST
        REFERRED_USERS: '/agent/listings',    // GET – referred users (astrologers + clients)
        DASHBOARD_STATS: '/agent/dashboard/stats',
        REGISTER_USER: '/auth/agent/register', // POST — register expert/client
    },
} as const;
