// refund-management/page.tsx
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@repo/ui";
import { toast } from "react-toastify";

// Components
import { RefundFilters } from "@/app/components/Refund/RefundFilters";
import { RefundStats } from "@/app/components/Refund/RefundStats";
import { RefundCard } from "@/app/components/Refund/RefundCard";
import { EmptyRefunds } from "@/app/components/Refund/EmptyRefunds";
import { DisputeChatModal } from "@/app/components/Refund/DisputeChatModal";

// Services
import { getDisputes, updateDisputeStatus } from "@/src/services/admin.service";

// Config
import { filters } from "@/app/components/Refund/refundsConfig";

export default function RefundManagementPage() {
  const [refunds, setRefunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const fetchRefunds = useCallback(async () => {
    setLoading(true);
    try {
      const [data, error] = await getDisputes();
      if (error) {
        toast.error(error.message || "Failed to fetch refund requests");
        return;
      }
      
      const rawDisputes = Array.isArray(data) ? data : data?.data || data?.items || [];
      
      // Map backend disputes to UI format
      const mappedRefunds = rawDisputes.map((d: any) => {
        const type = d.type || "consultation";
        const itemDetails = d.itemDetails || {};
        
        let typeLabel = "Consultation";
        if (type === "order") typeLabel = "Product Order";
        else if (type === "puja") typeLabel = "Puja Booking";

        // Map status
        let status = "pending";
        if (d.status === "resolved") status = "refunded";
        else if (d.status === "closed") status = "rejected";
        else if (d.status === "pending" || d.status === "open") status = "pending";

        return {
          id: d.id.toString(),
          realId: d.id,
          user: {
            id: d.userId || "N/A",
            name: d.user?.name || "Unknown User",
            avatar: d.user?.profile_picture || d.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.userId}`,
            email: d.user?.email || "N/A"
          },
          expert: {
            id: d.expertId || "N/A",
            name: d.expert?.user?.name || d.itemDetails?.expertName || "System",
            avatar: d.expert?.user?.profile_picture || d.expert?.user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.expertId}`,
            specialty: d.expert?.specialty || "Expert"
          },
          consultation: {
            id: d.consultationId || d.itemId || d.orderId || d.pujaId || "N/A",
            type: typeLabel,
            realType: type,
            duration: d.itemDetails?.duration || 0,
            amount: d.itemDetails?.amount || 0,
            date: new Date(d.itemDetails?.date || d.createdAt)
          },
          reason: d.description || d.category || "No reason provided",
          category: d.category,
          amount: d.itemDetails?.amount || 0,
          requestedAmount: d.itemDetails?.amount || 0,
          status: status,
          priority: d.priority || "medium",
          requestedAt: new Date(d.createdAt),
          attachments: d.attachments || []
        };
      });

      setRefunds(mappedRefunds);
    } catch (err) {
      console.error("Error fetching refunds:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRefunds();
  }, [fetchRefunds]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = refunds.length;
    const pending = refunds.filter(r => r.status === "pending").length;
    const refunded = refunds.filter(r => r.status === "refunded").length;
    const totalAmount = refunds.reduce((sum, r) => sum + r.requestedAmount, 0);

    return [
      {
        title: "Total Requests",
        value: total.toString(),
        icon: RefreshCw,
        iconColor: "text-blue-600",
        iconBgColor: "bg-blue-100",
        trend: { value: "All", isPositive: true, period: "requests" }
      },
      {
        title: "Pending",
        value: pending.toString(),
        icon: RefreshCw,
        iconColor: "text-amber-600",
        iconBgColor: "bg-amber-100",
        trend: { value: "Action", isPositive: true, period: "required" }
      },
      {
        title: "Refunded",
        value: refunded.toString(),
        icon: RefreshCw,
        iconColor: "text-green-600",
        iconBgColor: "bg-green-100",
        trend: { value: "Completed", isPositive: true, period: "requests" }
      },
      {
        title: "Total Value",
        value: `₹${totalAmount.toLocaleString()}`,
        icon: RefreshCw,
        iconColor: "text-purple-600",
        iconBgColor: "bg-purple-100",
        trend: { value: "All time", isPositive: true, period: "total" }
      }
    ];
  }, [refunds]);

  // Filter refunds
  const filteredRefunds = useMemo(() => {
    if (activeFilter === "all") return refunds;
    if (["pending", "refunded", "rejected"].includes(activeFilter)) {
      return refunds.filter(r => r.status === activeFilter);
    }
    return refunds.filter(r => r.priority === activeFilter);
  }, [refunds, activeFilter]);

  // Handlers
  const handleUpdateStatus = async (id: number, status: string) => {
    // Map UI status back to backend status
    let backendStatus = "pending";
    if (status === "refunded") backendStatus = "resolved";
    else if (status === "rejected") backendStatus = "closed";
    else if (status === "pending") backendStatus = "pending";

    const [res, error] = await updateDisputeStatus(id, { status: backendStatus });
    if (error) {
      toast.error(error.message || `Failed to update status to ${status}`);
      return;
    }
    toast.success(`Request marked as ${status}`);
    fetchRefunds();
  };

  const handleViewDetails = (refund: any) => {
    setSelectedRefund(refund);
    setIsChatOpen(true);
  };

  return (
    <main className="space-y-6 px-4 py-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">Refund & Complaint Management</h1>
          <p className="text-gray-600 mt-1">Manage user issues from consultations, orders, and pujas</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Download} onClick={() => window.print()}>
            Export Page
          </Button>
          <Button variant="primary" onClick={fetchRefunds} icon={RefreshCw}>
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats */}
      <RefundStats stats={stats} />

      {/* Filters */}
      <RefundFilters
        filters={[
            { key: "all", label: "All Requests" },
            { key: "pending", label: "Pending" },
            { key: "refunded", label: "Refunded" },
            { key: "rejected", label: "Rejected" },
            { key: "high", label: "High Priority" }
        ]}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Refunds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {loading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
             <RefreshCw className="w-10 h-10 text-orange-500 animate-spin mb-4" />
             <p className="text-gray-500 font-medium">Loading complaints...</p>
          </div>
        ) : filteredRefunds.length === 0 ? (
          <EmptyRefunds />
        ) : (
          filteredRefunds.map((refund) => (
            <RefundCard
              key={refund.id}
              refund={refund}
              onApprove={() => handleUpdateStatus(refund.realId, "refunded")}
              onReject={() => handleUpdateStatus(refund.realId, "rejected")}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>

      {/* Chat Modal */}
      {selectedRefund && (
        <DisputeChatModal 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          dispute={selectedRefund}
          onStatusUpdate={(status) => handleUpdateStatus(selectedRefund.realId, status)}
        />
      )}
    </main>
  );
}




