"use client";

import { useProfileBaseLogic } from "./hooks/useProfileBaseLogic";
import { useProfileWalletLogic } from "./hooks/useProfileWalletLogic";
import { useProfileOrdersHistoryLogic } from "./hooks/useProfileOrdersHistoryLogic";
import { useProfileOtherLogic } from "./hooks/useProfileOtherLogic";
import { useProfilePujaLogic } from "./hooks/useProfilePujaLogic";

export const useProfileLogic = () => {
    const base = useProfileBaseLogic();
    const wallet = useProfileWalletLogic(
        base.isClientAuthenticated,
        base.profileData,
        base.clientUser,
        base.refreshBalance,
        base.activeTab,
    );
    const orderHistory = useProfileOrdersHistoryLogic(
        base.isClientAuthenticated,
        base.activeTab,
    );
    const other = useProfileOtherLogic(
        base.isClientAuthenticated,
        base.clientUser,
        base.activeTab,
        orderHistory.setOrders,
    );
    const puja = useProfilePujaLogic(
        base.isClientAuthenticated,
        base.activeTab
    );

    return {
        ...base,
        ...wallet,
        ...orderHistory,
        ...other,
        ...puja,
    };
};
