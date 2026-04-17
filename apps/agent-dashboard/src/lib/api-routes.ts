export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/agent/profile',
    },
    AGENTS: {
        PROFILE: '/agent/profile',
        LISTINGS: '/agent/listings',          // GET (all types) + POST (create mandir/puja_shop)
        REFERRED_USERS: '/agent/listings',    // GET – referred users + place listings
        COMMISSIONS: '/agent/commissions',    // GET – individual commission transactions
        DASHBOARD_STATS: '/agent/dashboard/stats',
        REGISTER_USER: '/auth/agent/register', // POST — register expert/client
        WALLET: {
            BALANCE: '/agent/wallet/balance',
            WITHDRAWALS: '/agent/wallet/withdrawals',
            WITHDRAW: '/agent/wallet/withdraw',
        }
    },
} as const;

