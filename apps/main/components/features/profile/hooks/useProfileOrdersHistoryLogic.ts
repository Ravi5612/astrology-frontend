"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
    getAllChatSessions,
    getConsultationHistory,
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
    
    // Review Modal
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedReviewTarget, setSelectedReviewTarget] = useState<{ merchantId: any, orderId: any } | null>(null);

    // Report Modal
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportItemType, setReportItemType] = useState<"order" | "consultation" | "puja">("order");
    const [reportItemDetails, setReportItemDetails] = useState<any>(null);

    // Load History
    const loadConsultationHistory = useCallback(async () => {
        if (activeTab === "history" && isClientAuthenticated) {
            setLoadingHistory(true);
            try {
                const [result, error] = await getConsultationHistory({ limit: 50 }) as any;
                let sessions = Array.isArray(result) ? result : (result?.items || result?.data || []);
                
                // Map backend fields to frontend expected ones for a logic-less UI
                sessions = sessions.map((s: any) => ({
                    ...s,
                    expert_name: s.expert_name ?? s.expert?.user?.name ?? "Astro Expert",
                    expert_image: s.expert_image ?? s.expert?.user?.avatar ?? s.expert?.user?.profile_picture ?? "/images/dummy-expert.jpg",
                    expert_category: s.expert_category ?? s.expert?.category ?? s.expert?.specialization ?? "Expert Expert",
                    rating: s.rating ?? s.metadata?.rating ?? 0,
                    total_cost: s.amount ?? s.total_cost,
                    createdAt: s.startTime ?? s.createdAt ?? s.created_at,
                    durationString: s.durationString ?? (s.duration ? `${Math.floor(s.duration / 60)}m ${s.duration % 60}s` : "0s")
                }));

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
            
            // Only fetch chat history if it's a CHAT session
            if (session.type === 'CHAT' || session.session_type === 'chat' || !session.type) {
                const [messages, error] = await getChatHistory(session.id) as any;
                if (error) {
                    console.error("Error fetching chat history:", error);
                    setChatMessages([]);
                } else {
                    setChatMessages(messages || []);
                }
            } else {
                // For calls, clear messages as there are none
                setChatMessages([]);
            }
        } catch (err) {
            console.error("Error in handleViewChat:", err);
        }
    };

    const toggleOrder = (orderId: number) => {
        setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
    };

    const toggleSession = (sessionId: number) => {
        setExpandedSessions((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
    };

    const handleOpenReviewModal = (merchantId: any, orderId: any) => {
        setSelectedReviewTarget({ merchantId, orderId });
        setReviewModalOpen(true);
    };

    const handleReviewSubmit = async (data: { rating: number; review: string; name: string }) => {
        if (!selectedReviewTarget) return;

        console.log("Submitting review for target:", selectedReviewTarget, data);
        
        const [res, error] = await (await import("@/services/merchant.service")).merchantService.submitMerchantReview({
            merchantId: selectedReviewTarget.merchantId,
            orderId: selectedReviewTarget.orderId,
            rating: data.rating,
            comment: data.review
        });
        
        if (error) {
            toast.error((error as any).message || "Failed to submit review. Please try again.");
            return;
        }

        toast.success("Thank you! Your review has been submitted successfully.");
        setReviewModalOpen(false);
        setSelectedReviewTarget(null);
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
        reviewModalOpen,
        setReviewModalOpen,
        selectedReviewTarget,
        handleOpenReviewModal,
        handleReviewSubmit
    };
};
