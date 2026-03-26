"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import apiClient, { getWalletTransactions } from "@/libs/api-profile";
import { loadRazorpay } from "@/libs/razorpay";

export const useProfileWalletLogic = (
    isClientAuthenticated: boolean,
    profileData: any,
    clientUser: any,
    refreshBalance: () => void,
    activeTab: string,
) => {
    const [rechargeAmount, setRechargeAmount] = useState<number>(500);
    const [isProcessing, setIsProcessing] = useState(false);
    const rechargeOptions = [100, 200, 500, 1000, 2000, 5000];
    const [walletTransactions, setWalletTransactions] = useState<any[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [walletView, setWalletView] = useState<"recharge" | "history">(
        "recharge",
    );
    const [walletPurpose, setWalletPurpose] = useState<string | undefined>(
        undefined,
    );

    useEffect(() => {
        const savedView = localStorage.getItem("profileWalletView");
        if (savedView === "history" || savedView === "recharge") {
            setWalletView(savedView as any);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("profileWalletView", walletView);
    }, [walletView]);

    const loadTransactions = useCallback(async () => {
        if (isClientAuthenticated) {
            setLoadingTransactions(true);
            try {
                const params = walletPurpose ? { purpose: walletPurpose } : {};
                const transactions = await getWalletTransactions(params);
                const txArray = Array.isArray(transactions)
                    ? transactions
                    : transactions?.items ||
                      transactions?.transactions ||
                      transactions?.data ||
                      [];
                setWalletTransactions(txArray);
            } catch (error) {
                console.error("Failed to load wallet transactions:", error);
            } finally {
                setLoadingTransactions(false);
            }
        }
    }, [isClientAuthenticated, walletPurpose]);

    useEffect(() => {
        if (activeTab === "wallet") {
            loadTransactions();
        }
    }, [activeTab, loadTransactions]);

    const handleRecharge = async () => {
        if (rechargeAmount < 100) {
            toast.error("Minimum recharge amount is ₹100");
            return;
        }

        setIsProcessing(true);
        try {
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                toast.error("Razorpay SDK failed to load.");
                return;
            }

            const orderRes = await apiClient.post("/payment/orders/create", {
                amount: rechargeAmount,
                type: "wallet_recharge",
            });

            const orderPayload: any = (orderRes as any)?.data ?? orderRes;
            const { id: order_id, amount, currency, key_id } = orderPayload || {};
            if (!order_id || !amount || !currency) {
                throw new Error("Invalid payment order response");
            }

            const options = {
                key: key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: "Astrology in Bharat",
                description: "Wallet Recharge",
                order_id: order_id,
                handler: async (response: any) => {
                    try {
                        const verifyRes = await apiClient.post(
                            "/payment/orders/verify",
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                        );
                        const verifyPayload: any =
                            (verifyRes as any)?.data ?? verifyRes;
                        if (verifyPayload?.success) {
                            toast.success(`Successfully recharged ₹${rechargeAmount}!`);
                            refreshBalance();
                            loadTransactions();
                            setWalletView("history");
                        } else {
                            toast.error("Payment verification failed!");
                        }
                    } catch (err: any) {
                        console.error("Verification error:", err);
                        toast.error("Error verifying payment.");
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: profileData.full_name || clientUser?.name || "",
                    email: clientUser?.email || "",
                },
                theme: { color: "#f25e0a" },
                modal: { ondismiss: () => setIsProcessing(false) },
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
        } catch (err: any) {
            console.error("Recharge error:", err);
            const backendMessage =
                err?.body?.message || err?.response?.data?.message || err?.message;
            toast.error(
                Array.isArray(backendMessage)
                    ? backendMessage.join(", ")
                    : backendMessage || "Recharge failed. Please try again.",
            );
            setIsProcessing(false);
        }
    };

    return {
        rechargeAmount,
        setRechargeAmount,
        isProcessing,
        rechargeOptions,
        walletTransactions,
        loadingTransactions,
        walletView,
        setWalletView,
        walletPurpose,
        setWalletPurpose,
        handleRecharge,
        loadTransactions,
    };
};
