import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { socket } from "@/lib/socket";
import { getNotifications, deleteAllNotifications } from "@/lib/notifications";
import { useAuthStore } from "@/store/useAuthStore";

export const useHeaderState = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showKycNotice, setShowKycNotice] = useState(true);

  const isHoveringIcon = useRef(false);
  const isHoveringPopup = useRef(false);

  // Sync online status with user data
  useEffect(() => {
    if (user?.isAvailable !== undefined) {
      setIsOnline(user.isAvailable);
    }
  }, [user]);

  // Load notifications
  const loadNotifications = useCallback(async () => {
    if (!isAuthenticated) return;

    const [data, error] = await getNotifications();
    if (error) {
      console.error("Failed to fetch notifications:", error);
      return;
    }

    const mapped = (data || []).map((n: any) => ({
      id: n.id,
      message: n.message || n.title,
      time: n.created_at
        ? new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : "Just now",
      type: n.type || 'info'
    }));

    if (showKycNotice) {
      const status = (user?.kycStatus || "").toLowerCase();
      if (status === 'rejected') {
        mapped.unshift({
          id: 'kyc-rejected',
          message: "❌ Profile Rejected: " + (user?.rejectionReason || "Check profile"),
          time: "Status",
          type: 'error'
        });
      } else if (status === 'active' || status === 'approved') {
        mapped.unshift({
          id: 'kyc-active',
          message: "✅ Account Approved!",
          time: "Status",
          type: 'success'
        });
      }
    }

    setNotifications(mapped);
  }, [isAuthenticated, showKycNotice, user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Socket Listeners
  useEffect(() => {
    const handleStatusSync = (data: any) => {
      const expertId = data.expert_id || data.userId || data.id;
      const isAvailable = data.is_available !== undefined
        ? data.is_available
        : (data.status === 'online');

      const currentExpertId = user?.id || user?.userId;
      if (String(currentExpertId) === String(expertId)) {
        setIsOnline(isAvailable);
      }
    };

    const handleKycUpdate = (data: any) => {
      const expertId = data.expert_id || data.id || data.userId;
      const currentExpertId = user?.id || user?.profileId;

      if (String(currentExpertId) === String(expertId)) {
        toast.info(`Profile Update: Your status is now ${data.status}`);
        loadNotifications();
        if (data.status === 'rejected' || data.status === 'active') {
          setTimeout(() => window.location.reload(), 3000);
        }
      }
    };

    socket.on("expert_status_changed", handleStatusSync);
    socket.on("kyc_status_updated", handleKycUpdate);

    // Presence registration
    const actualUserId = user?.userId || user?.id;
    if (isAuthenticated && actualUserId) {
      socket.emit("expert_online", { userId: actualUserId });
    }

    const handleReconnection = () => {
      if (isAuthenticated && actualUserId) {
        socket.emit("expert_online", { userId: actualUserId });
      }
    };
    socket.on("connect", handleReconnection);

    return () => {
      socket.off("expert_status_changed", handleStatusSync);
      socket.off("kyc_status_updated", handleKycUpdate);
      socket.off("connect", handleReconnection);
    };
  }, [user, isAuthenticated, loadNotifications]);

  // Actions
  const handleToggleAvailability = async () => {
    setLoading(true);
    const newStatus = !isOnline;

    const [_, error] = await api.patch<{ is_available: boolean }>('/expert/status', { is_available: newStatus });

    if (error) {
      const errBody = (error as any)?.body || (error as any)?.data;
      const message = errBody?.message || "Failed to update status";
      toast.error(Array.isArray(message) ? message.join(", ") : message);
      setLoading(false);
      return;
    }

    setIsOnline(newStatus);
    const actualUserId = user?.userId || user?.id;
    if (actualUserId) {
      socket.emit(newStatus ? "expert_online" : "expert_offline", { userId: actualUserId });
    }

    toast.success(`You are now ${newStatus ? 'Online' : 'Offline'}`);
    setLoading(false);
  };

  const handleClearNotifications = async () => {
    const [_, error] = await deleteAllNotifications();
    if (error) {
      toast.error("Failed to clear notifications");
      return;
    }
    setNotifications([]);
    setShowKycNotice(false);
    setIsNotificationOpen(false);
    toast.success("Notifications cleared");
  };

  const checkClosePopup = () => {
    if (!isHoveringIcon.current && !isHoveringPopup.current) {
      setIsNotificationOpen(false);
    }
  };

  return {
    isOnline,
    loading,
    searchQuery,
    setSearchQuery,
    notifications,
    isNotificationOpen,
    setIsNotificationOpen,
    isHoveringIcon,
    isHoveringPopup,
    handleToggleAvailability,
    handleClearNotifications,
    checkClosePopup,
    user,
  };
};
