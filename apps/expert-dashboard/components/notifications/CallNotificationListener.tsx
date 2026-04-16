"use client";

import React, { useEffect, useCallback } from "react";
import { Phone, Video } from "lucide-react";
import { callSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const CallNotificationListener: React.FC = () => {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();

    const registerExpert = useCallback(() => {
        if (!user) return;
        const expertId = Number(user.profileId || user.id);
        if (!expertId) return;
        callSocket.emit('register_expert', { expertId });
    }, [user]);

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (!callSocket.connected) {
            callSocket.connect();
        } else {
            registerExpert();
        }

        const onConnect = () => {
            registerExpert();
        };

        const onReconnect = (attempt: number) => {
            registerExpert();
        };

        const onConnectError = (err: any) => {
            console.error("[CallSocket] ❌ Connection error:", err.message);
        };

        const handleNewCall = (data: any) => {
            const { session } = data;
            const callerName = session.user?.name || "A Client";
            const callType = session.type || 'audio';

            toast.info(
                (<div className="p-1">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                            {callType === 'video' ? <Video className="text-primary" /> : <Phone className="text-primary" />}
                        </div>
                        <div>
                            <p className="font-black text-sm uppercase tracking-wider text-neutral-800">Incoming {callType} Call</p>
                            <p className="text-xs font-bold text-neutral-500">{callerName} is calling...</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                toast.dismiss();
                                const route = callType === 'video'
                                    ? `/dashboard/video/${session.id}`
                                    : `/dashboard/call/${session.id}`;
                                router.push(route);
                            }}
                            className="flex-1 bg-primary text-white py-2.5 rounded-xl font-black text-[10px] uppercase shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                        >
                            Accept & Join
                        </button>
                        <button
                            onClick={() => toast.dismiss()}
                            className="px-4 py-2.5 rounded-xl border-2 border-neutral-100 font-bold text-neutral-400 text-[10px] uppercase hover:bg-neutral-50 transition-all"
                        >
                            Ignore
                        </button>
                    </div>
                </div>),
                {
                    position: "bottom-right",
                    autoClose: false,
                    closeOnClick: false,
                    draggable: false,
                    className: "rounded-3xl shadow-2xl border border-primary/10 p-0 overflow-hidden",
                }
            );

            const audio = new Audio('/sounds/ringtone.mp3');
            audio.play().catch(() => {});
        };

        const handleAutoDismiss = (data: any) => {
            toast.dismiss();
        };

        callSocket.on('connect', onConnect);
        callSocket.on('reconnect', onReconnect);
        callSocket.on('connect_error', onConnectError);
        callSocket.on('new_call_request', handleNewCall);
        callSocket.on('call_accepted', handleAutoDismiss);
        callSocket.on('call_ended', handleAutoDismiss);

        return () => {
            callSocket.off('connect', onConnect);
            callSocket.off('reconnect', onReconnect);
            callSocket.off('connect_error', onConnectError);
            callSocket.off('new_call_request', handleNewCall);
            callSocket.off('call_accepted', handleAutoDismiss);
            callSocket.off('call_ended', handleAutoDismiss);
        };
    }, [isAuthenticated, !!user, router, registerExpert]);

    return null;
};
