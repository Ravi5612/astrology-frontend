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
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [showChatModal, setShowChatModal] = useState(false);
    const [expandedSessions, setExpandedSessions] = useState<Record<number, boolean>>({});

    // Orders
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersPage, setOrdersPage] = useState(1);
    const [ordersHasMore, setOrdersHasMore] = useState(true);
    const [loadingMoreOrders, setLoadingMoreOrders] = useState(false);
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
    const loadConsultationHistory = useCallback(async (pageNumber = 1) => {
        if (activeTab === "history" && isClientAuthenticated) {
            if (pageNumber === 1) setLoadingHistory(true);
            else setLoadingMore(true);

            try {
                const limit = 10;
                const offset = (pageNumber - 1) * limit;
                const [result, error] = await getConsultationHistory({ offset, limit }) as any;
                
                if (error) throw error;

                const sessions = result?.data || [];
                const totalCount = result?.meta?.totalCount || 0;
                
                // Check if we have more pages based on totalCount
                if (consultationHistory.length + sessions.length >= totalCount) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }

                // Map backend fields to frontend expected ones for a logic-less UI
                const mappedSessions = sessions.map((s: any) => ({
                    ...s,
                    expert_name: s.expert_name ?? s.expert?.user?.name ?? "Astro Expert",
                    expert_image: s.expert_image ?? s.expert?.user?.avatar ?? s.expert?.user?.profile_picture ?? "/images/dummy-expert.jpg",
                    expert_category: s.expert_category ?? s.expert?.category ?? s.expert?.specialization ?? "Expert Expert",
                    rating: s.rating ?? s.metadata?.rating ?? 0,
                    total_cost: s.amount ?? s.total_cost,
                    createdAt: s.startTime ?? s.createdAt ?? s.created_at,
                    durationString: s.durationString ?? (s.duration ? `${Math.floor(s.duration / 60)}m ${s.duration % 60}s` : "0s")
                }));

                if (pageNumber === 1) {
                    setConsultationHistory(mappedSessions);
                } else {
                    // Prevent duplicates just in case
                    setConsultationHistory(prev => {
                        const existingIds = new Set(prev.map(p => p.id));
                        const newSessions = mappedSessions.filter((s: any) => !existingIds.has(s.id));
                        return [...prev, ...newSessions];
                    });
                }
                setPage(pageNumber);
            } catch (error) {
                console.error("Failed to load consultation history:", error);
                toast.error("Failed to load consultation history");
            } finally {
                setLoadingHistory(false);
                setLoadingMore(false);
            }
        }
    }, [activeTab, isClientAuthenticated]);

    const loadMoreHistory = () => {
        if (!loadingMore && hasMore) {
            loadConsultationHistory(page + 1);
        }
    };

    useEffect(() => {
        loadConsultationHistory();
    }, [loadConsultationHistory]);

    // Load Orders & Disputes
    const loadOrdersAndDisputes = useCallback(async (pageNumber = 1) => {
        if (isClientAuthenticated) {
            if (pageNumber === 1) setLoadingOrders(true);
            else setLoadingMoreOrders(true);

            try {
                const limit = 10;
                const offset = (pageNumber - 1) * limit;

                const [ordersResult, disputesResult] = await Promise.allSettled([
                    getMyOrders({ limit, offset }),
                    getMyDisputes(),
                ]);

                if (ordersResult.status === "fulfilled") {
                    const [ordersData, ordersError] = ordersResult.value as any;
                    if (ordersError) throw ordersError;

                    const myOrders = ordersData?.data || [];
                    const totalCount = ordersData?.meta?.totalCount || 0;

                    console.log("DEBUG Orders Pagination:", {
                        pageNumber,
                        receivedItems: myOrders.length,
                        currentTotalInState: orders.length,
                        totalCountFromBackend: totalCount,
                        hasMoreCalculation: (orders.length + myOrders.length < totalCount)
                    });
                    
                    if (pageNumber === 1) {
                        setOrders(myOrders);
                        setOrdersHasMore(myOrders.length < totalCount);
                    } else {
                        setOrders(prev => {
                            const existingIds = new Set(prev.map(o => o.trackingId));
                            const newOrders = myOrders.filter((o: any) => !existingIds.has(o.trackingId));
                            const updatedList = [...prev, ...newOrders];
                            setOrdersHasMore(updatedList.length < totalCount);
                            return updatedList;
                        });
                    }
                    setOrdersPage(pageNumber);
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
                setLoadingMoreOrders(false);
            }
        }
    }, [isClientAuthenticated, orders.length]);

    const loadMoreOrders = () => {
        if (!loadingMoreOrders && ordersHasMore) {
            loadOrdersAndDisputes(ordersPage + 1);
        }
    };

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
        hasMore,
        loadingMore,
        loadMoreHistory,
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
        ordersHasMore,
        loadingMoreOrders,
        loadMoreOrders,
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
