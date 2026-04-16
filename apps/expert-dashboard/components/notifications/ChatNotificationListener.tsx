"use client";

import React, { useEffect, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import { chatSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const ChatNotificationListener: React.FC = () => {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    const registerExpert = useCallback(() => {
        if (!user) return;
        const registrationId = user.profileId || user.id;
        chatSocket.emit('register_expert', { expertId: registrationId });
    }, [user]);

    useEffect(() => {
        if (!isAuthenticated || !user) {
            return;
        }

        const setupSocket = () => {

            if (!chatSocket.connected) {
                chatSocket.connect();
            } else {
                registerExpert();
            }
        };

        setupSocket();

        const onConnect = () => {
            registerExpert();
        };

        const handleNewRequest = (session: any) => {

            const isFree = !!session.isFree;

            toast.info(
                (<div>
                    <div className="flex items-center justify-between">
                        <p className="font-bold flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" /> New Chat Request!
                        </p>
                        {isFree && (
                            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border border-green-200">
                                FREE
                            </span>
                        )}
                    </div>
                    <p className="text-xs mt-1">
                        {isFree
                            ? "A client has initiated their FIRST FREE consultation!"
                            : "A client is waiting for you to join the session."}
                    </p>
                    {session.expiresAt && (
                        <p className="text-[10px] text-red-500 font-bold mt-1 animate-pulse">
                            ⏳ Be quick! This request expires soon.
                        </p>
                    )}
                    <button
                        onClick={() => {
                            toast.dismiss();
                            router.push(`/dashboard/chat/${session.id}`);
                        }}
                        className="mt-2 w-full bg-orange-600 text-white px-3 py-2 rounded text-[10px] font-bold uppercase transition hover:bg-orange-700 shadow-sm"
                    >
                        Accept & Start Chat
                    </button>
                </div>),
                {
                    position: "bottom-right",
                    autoClose: false,
                    closeOnClick: false,
                    draggable: false,
                }
            );
        };

        const handleSessionEnded = (data: any) => {
            
            // If already on the chat page, let the page handle the detailed modal
            if (window.location.pathname.includes(`/dashboard/chat/${data.id || data.sessionId}`)) {
                return;
            }

            const total = data?.split?.totalAmount || data?.total_cost || 0;
            const expertShare = data?.split?.expertShare || (total * 0.8);

            toast.success(
                (<div>
                    <p className="font-bold flex items-center gap-2">
                         Chat Consultation Ended
                    </p>
                    <div className="mt-2 p-2 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex justify-between text-[10px] font-bold text-green-700">
                            <span>Client Paid:</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between text-xs font-black text-green-800 mt-1">
                            <span>Your Earning:</span>
                            <span>₹{expertShare}</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 italic">Credited to your wallet.</p>
                </div>),
                {
                    position: "top-right",
                    autoClose: 10000,
                }
            );
        };

        chatSocket.on('connect', onConnect);
        chatSocket.on('new_chat_request', handleNewRequest);
        chatSocket.on('session_ended', handleSessionEnded);

        return () => {
            chatSocket.off('new_chat_request', handleNewRequest);
            chatSocket.off('session_ended', handleSessionEnded);
            chatSocket.off('connect', onConnect);
        };
    }, [isAuthenticated, user, router, registerExpert]);

    return null;
};


