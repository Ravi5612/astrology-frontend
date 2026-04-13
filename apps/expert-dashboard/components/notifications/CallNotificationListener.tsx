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
        const expertId = user.profileId || user.id;
        console.log("[CallSocket] Registering expert with ID:", expertId);
        callSocket.emit('register_expert', { expertId }, (res: any) => {
            console.log("[CallSocket] Registration response:", res);
        });
    }, [user]);

    useEffect(() => {
        if (!isAuthenticated || !user) return;

        if (!callSocket.connected) {
            console.log("[CallSocket] 🔌 Socket not connected, connecting to /call namespace...");
            callSocket.connect();
        } else {
            console.log("[CallSocket] ✅ Socket already connected, registering expert...");
            registerExpert();
        }

        const onConnect = () => {
            console.log("[CallSocket] ✅ CONNECTED to /call namespace. ID:", callSocket.id);
            registerExpert();
        };

        const onReconnect = (attempt: number) => {
            console.log("[CallSocket] 🔄 RECONNECTED to /call namespace after", attempt, "attempts. Re-registering...");
            registerExpert();
        };

        const onConnectError = (err: any) => {
            console.error("[CallSocket] ❌ Connection error:", err.message);
        };

        const handleNewCall = (data: any) => {
            console.log("[CallSocket] 🚨 New CALL request received:", data);
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
            audio.play().catch(() => console.log("Audio play blocked by browser"));
        };

        callSocket.on('connect', onConnect);
        callSocket.on('reconnect', onReconnect);
        callSocket.on('connect_error', onConnectError);
        callSocket.on('new_call_request', handleNewCall);

        return () => {
            console.log("[CallSocket] 🧹 Cleaning up listeners...");
            callSocket.off('connect', onConnect);
            callSocket.off('reconnect', onReconnect);
            callSocket.off('connect_error', onConnectError);
            callSocket.off('new_call_request', handleNewCall);
        };
    }, [isAuthenticated, user, router, registerExpert]);

    return null;
};
