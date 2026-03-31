export const API_ROUTES = {
    AUTH: {
        LOGIN: '/auth/email/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/client/profile',
    },
    WALLET: {
        BALANCE: '/wallet/balance',
    },
    EXPERT: {
        GET_ALL_PUJAS: '/expert/pujas/all',
        GET_PUJA_BY_ID: '/expert/puja/info/:id',
    },
    WISHLIST: {
        PUJA_TOGGLE: '/wishlist/puja/:id/toggle',
    },
    PUJA: {
        BOOKING: '/puja-appointments',
        GET_USER_APPOINTMENTS: '/puja-appointments/user',
    },
} as const;
