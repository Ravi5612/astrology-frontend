"use client";
import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";

// Components
import { StatsCards } from "@repo/ui";
import { DataTable } from "@/app/components/admin/DataTable";
import { DisputeModal } from "@/app/components/dispute/DisputeModal";

// Services
import { getDisputes, getDisputeStats } from "@/src/services/admin.service";

// Data config and types
import { getStatsConfig, getColumns } from "@/app/components/dispute/disputesConfig";
import type { Dispute } from "@/app/components/dispute/dispute";

export default function DisputesPage() {
  // State
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    resolved: 0,
    rejected: 0,
  });

  // Fetch disputes from backend
  const fetchDisputes = async () => {
    setLoading(true);
    const [data, error] = await getDisputes();

    if (error) {
      console.error("Error fetching disputes:", error);
      toast.error("Failed to load disputes");
      setDisputes([]);
      setLoading(false);
      return;
    }

    // Handle different response structures
    const disputesData = (data as any)?.data || (data as any)?.disputes || data || [];
    setDisputes(disputesData);
    setLoading(false);
  };

  const fetchStats = async () => {
    const [data, error] = await getDisputeStats();
    if (error) {
      console.warn("⚠️ Dispute stats API failed, using defaults.");
      return;
    }

    if (data) {
      // Handle snake_case from backend by normalizing to camelCase
      setStats({
        total: (data as any).total ?? 0,
        pending: (data as any).pending ?? 0,
        underReview: (data as any).underReview ?? (data as any).under_review ?? 0,
        resolved: (data as any).resolved ?? 0,
        rejected: (data as any).rejected ?? 0,
      });
    }
  };


  // Load data on mount
  useEffect(() => {
    fetchDisputes();
    fetchStats();
  }, []);

  // Get stats config (Total, Pending, Under Review, Resolved)
  const statsConfig = useMemo(() => getStatsConfig(disputes, stats), [disputes, stats]);

  // Get table columns with custom renders (memoized)
  const columns = useMemo(() => getColumns(), []);

  return (
    <main className="space-y-6 overflow-hidden">
      {/* Page header */}
      <header>
        <h1 className="text-3xl font-bold text-gray-800">Dispute Resolution</h1>
        <p className="text-gray-600 mt-1">Manage user-reported issues and complaints</p>
      </header>

      {/* Stats cards - Total, Pending, Under Review, Resolved */}
      <StatsCards stats={statsConfig} columns={4} />

      {/* Disputes table with search and pagination */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <DataTable
          data={disputes}
          columns={columns}
          searchKeys={["disputeId", "dispute_id", "user", "expert", "subject", "category", "status"]}
          title="All Disputes"
          itemsPerPage={10}
          onViewDetails={setSelectedDispute}
        />
      )}

      {/* Dispute details modal (shows when dispute is selected) */}
      {selectedDispute && (
        <DisputeModal
          dispute={selectedDispute}
          onClose={() => {
            setSelectedDispute(null);
            fetchDisputes(); // Refresh data after closing modal
            fetchStats();
          }}
        />
      )}
    </main>
  );
}



