"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
    getAllChatSessions,
    getChatHistory,
    getMyOrders,
    getMyDisputes,
} from "@/libs/api-profile";

export const useProfileOrdersHistoryLogic = (
    isClientAuthenticated: boolean,
    activeTab: string,
) => {
    // History
    const [consultationHistory, setConsultationHistory] = useState<any[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [showChatModal, setShowChatModal] = useState(false);
    const [expandedSessions, setExpandedSessions] = useState<Record<number, boolean>>({});

    // Orders
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});
    const [orderDisputes, setOrderDisputes] = useState<Record<number, any>>({});
    const [consultationDisputes, setConsultationDisputes] = useState<Record<number, any>>({});
    const [pujaDisputes, setPujaDisputes] = useState<Record<number, any>>({});
    const [allDisputes, setAllDisputes] = useState<any[]>([]);
    const [selectedDispute, setSelectedDispute] = useState<any>(null);
    const [showDisputeChat, setShowDisputeChat] = useState(false);

    // Report Modal
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportItemType, setReportItemType] = useState<"order" | "consultation" | "puja">("order");
    const [reportItemDetails, setReportItemDetails] = useState<any>(null);

    // Load History
    const loadConsultationHistory = useCallback(async () => {
        if (activeTab === "history" && isClientAuthenticated) {
            setLoadingHistory(true);
            try {
                const [sessions, error] = await getAllChatSessions() as any;
                setConsultationHistory(!error ? sessions : []);
            } catch (error) {
                console.error("Failed to load consultation history:", error);
                toast.error("Failed to load consultation history");
            } finally {
                setLoadingHistory(false);
            }
        }
    }, [activeTab, isClientAuthenticated]);

    useEffect(() => {
        loadConsultationHistory();
    }, [loadConsultationHistory]);

    // Load Orders & Disputes
    const loadOrdersAndDisputes = useCallback(async () => {
        if (isClientAuthenticated) {
            setLoadingOrders(true);
            try {
                const [ordersResult, disputesResult] = await Promise.allSettled([
                    getMyOrders(),
                    getMyDisputes(),
                ]);

                if (ordersResult.status === "fulfilled") {
                    const [ordersData, ordersError] = ordersResult.value as any;
                    const myOrders = ordersData;
                    const orderArray = Array.isArray(myOrders)
                        ? myOrders
                        : myOrders?.items || myOrders?.data || myOrders?.orders || [];
                    setOrders(!ordersError ? orderArray : []);
                } else {
                    throw ordersResult.reason;
                }

                if (disputesResult.status === "fulfilled") {
                    const [disputesData, disputesError] = disputesResult.value as any;
                    const myDisputes = disputesData;
                    const disputes = Array.isArray(myDisputes)
                        ? myDisputes
                        : myDisputes?.data || myDisputes?.items || [];
                    
                    const orderDisputeMap: Record<number, any> = {};
                    const consultationDisputeMap: Record<number, any> = {};
                    const pujaDisputeMap: Record<number, any> = {};

                    (!disputesError ? disputes : []).filter(Boolean).forEach((d: any) => {
                        const oId = d.orderId || d.order_id || d.order?.id;
                        const cId = d.consultationId || d.consultation_id || d.consultation?.id;
                        const pId = d.pujaBookingId || d.puja_booking_id || d.pujaBooking?.id || d.puja_id || d.puja?.id;

                        if (oId) {
                            orderDisputeMap[oId] = d;
                        }
                        if (cId) {
                            consultationDisputeMap[cId] = d;
                        }
                        if (pId) {
                            pujaDisputeMap[pId] = d;
                        }
                    });
                    setOrderDisputes(orderDisputeMap);
                    setConsultationDisputes(consultationDisputeMap);
                    setPujaDisputes(pujaDisputeMap);
                    setAllDisputes(!disputesError ? disputes : []);
                }
            } catch (error: any) {
                console.error("Failed to load orders:", error);
                toast.error("Failed to load orders");
            } finally {
                setLoadingOrders(false);
            }
        }
    }, [isClientAuthenticated]);

    useEffect(() => {
        if ((activeTab === "orders" || activeTab === "disputes") && isClientAuthenticated) {
            loadOrdersAndDisputes();
        }
    }, [activeTab, isClientAuthenticated, loadOrdersAndDisputes]);

    const handleViewChat = async (session: any) => {
        try {
            setSelectedSession(session);
            setShowChatModal(true);
            const [messages, error] = await getChatHistory(session.id) as any;
            if (!error && messages) {
                setChatMessages(messages);
            }
        } catch (error) {
            console.error("Failed to load chat messages:", error);
            toast.error("Failed to load chat messages");
        }
    };

    const toggleOrder = (orderId: number) => {
        setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    const toggleSession = (sessionId: number) => {
        setExpandedSessions((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
    };

    return {
        consultationHistory,
        loadingHistory,
        expandedSessions,
        toggleSession,
        selectedSession,
        chatMessages,
        showChatModal,
        setShowChatModal,
        handleViewChat,
        orders,
        setOrders,
        loadingOrders,
        expandedOrders,
        toggleOrder,
        orderDisputes,
        consultationDisputes,
        pujaDisputes,
        allDisputes,
        selectedDispute,
        setSelectedDispute,
        showDisputeChat,
        setShowDisputeChat,
        reportModalOpen,
        setReportModalOpen,
        reportItemType,
        setReportItemType,
        reportItemDetails,
        setReportItemDetails,
        loadOrdersAndDisputes,
    };
};
