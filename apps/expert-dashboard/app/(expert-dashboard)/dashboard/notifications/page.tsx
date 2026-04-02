"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Bell, BellOff, Check, Clock, Inbox, Mail, MailOpen, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import type { FC } from "react";
import { getNotifications, markAsRead, deleteNotification, deleteAllNotifications, Notification as ApiNotification } from "@/lib/notifications";
import { toast } from "react-toastify";
import { format, isToday } from "date-fns";

interface Notification {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    read: boolean;
}

const NotificationItem: FC<{
    notification: Notification;
    onMarkRead: (id: string) => void;
    onDelete: (id: string) => void;
}> = ({ notification, onMarkRead, onDelete }) => {
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            onClick={() => !notification.read && onMarkRead(notification.id)}
            className={cn(
                "p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex justify-between items-start gap-4",
                notification.read
                    ? "bg-white border-gray-100 opacity-70 hover:opacity-100"
                    : "bg-orange/5 border-orange/10 shadow-sm hover:shadow-md hover:bg-orange/10"
            )}
        >
            <div className="flex gap-4 flex-1 min-w-0">
                <div
                    className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110 shrink-0",
                        notification.read
                            ? "bg-gray-100 text-gray-400"
                            : "bg-orange text-white"
                    )}
                >
                    {notification.read ? (
                        <MailOpen className="w-5 h-5" />
                    ) : (
                        <Mail className="w-5 h-5" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h6
                        className={cn(
                            "text-base mb-1 truncate",
                            notification.read ? "text-gray-600" : "text-gray-900 font-bold"
                        )}
                    >
                        {notification.title}
                    </h6>
                    <p
                        className="text-gray-500 text-sm mb-3 leading-relaxed line-clamp-2"
                        style={{ lineHeight: "1.5" }}
                    >
                        {notification.description}
                    </p>
                    <span className="flex items-center gap-2 text-[10px] text-orange font-bold uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(notification.createdAt || Date.now()).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
                {!notification.read && (
                    <div className="relative flex items-center justify-center w-6 h-6">
                        <span className="absolute w-3 h-3 rounded-full bg-orange animate-ping opacity-75"></span>
                        <span className="relative w-2.5 h-2.5 rounded-full bg-orange shadow-lg shadow-orange/50"></span>
                    </div>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(notification.id);
                    }}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    title="Delete"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    );
};

const NotificationPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    const fetchNotifications = async () => {
        setIsLoading(true);
        const [data, error] = await getNotifications();
        
        if (error) {
            toast.error("Failed to load notifications");
            setNotifications([]);
            setIsLoading(false);
            return;
        }

        const mapped: Notification[] = (data || []).map((n: ApiNotification) => ({
            id: n.id,
            title: n.title,
            description: n.message,
            createdAt: n.created_at,
            read: n.read
        }));

        setNotifications(mapped);
        setIsLoading(false);
    };

    useEffect(() => {
        setIsMounted(true);
        fetchNotifications();
    }, []);

    const handleMarkRead = async (id: string) => {
        const [_, error] = await markAsRead(id);
        if (error) return;
        setNotifications((prev) =>
            prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
        );
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this notification?")) return;
        const [_, error] = await deleteNotification(id);
        if (error) return;
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleClearAll = async () => {
        if (notifications.length === 0) return;
        if (!confirm("Clear all notifications?")) return;
        const [_, error] = await deleteAllNotifications();
        if (error) return;
        setNotifications([]);
    };

    const groupedNotifications = useMemo(() => {
        const sorted = [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const today: Notification[] = [];
        const earlier: Notification[] = [];
        
        sorted.forEach(n => {
            if (isToday(new Date(n.createdAt))) today.push(n);
            else earlier.push(n);
        });
        
        return { today, earlier };
    }, [notifications]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#FFF9F4] pb-12 font-poppins">
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="bg-white border-0 shadow-premium rounded-[32px] overflow-hidden mb-6">
                    <div className="px-8 py-7 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h5 className="text-xl font-bold text-gray-900 mb-0 flex items-center">
                            <span className="w-12 h-12 rounded-full bg-orange/10 text-orange flex items-center justify-center mr-4 flex-shrink-0 shadow-inner">
                                <Bell className="w-6 h-6" />
                            </span>
                            Notifications
                        </h5>
                        {notifications.length > 0 && (
                            <button
                                onClick={handleClearAll}
                                className="px-5 py-2.5 text-red-500 hover:text-red-600 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-2xl transition-all flex items-center gap-2 border-0 shadow-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="p-8">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-24">
                                <div className="relative w-14 h-14 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-orange/10 border-t-orange animate-spin"></div>
                                </div>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                                    Fetching Updates
                                </p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center mb-8 border border-gray-100 shadow-inner rotate-12">
                                    <BellOff className="w-12 h-12 text-gray-300" />
                                </div>
                                <h6 className="font-bold text-gray-900 text-2xl mb-3 tracking-tight">
                                    Inbox Zero!
                                </h6>
                                <p className="text-gray-500 text-sm max-w-[240px] m-0 leading-relaxed font-medium">
                                    We'll notify you when something important happens.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {groupedNotifications.today.length > 0 && (
                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Today</span>
                                            <div className="h-px flex-1 bg-gray-100/50"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <AnimatePresence mode='popLayout'>
                                                {groupedNotifications.today.map((n) => (
                                                    <NotificationItem
                                                        key={n.id}
                                                        notification={n}
                                                        onMarkRead={handleMarkRead}
                                                        onDelete={handleDelete}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </section>
                                )}

                                {groupedNotifications.earlier.length > 0 && (
                                    <section>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Earlier</span>
                                            <div className="h-px flex-1 bg-gray-100/50"></div>
                                        </div>
                                        <div className="space-y-4">
                                            <AnimatePresence mode='popLayout'>
                                                {groupedNotifications.earlier.map((n) => (
                                                    <NotificationItem
                                                        key={n.id}
                                                        notification={n}
                                                        onMarkRead={handleMarkRead}
                                                        onDelete={handleDelete}
                                                    />
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationPage;


