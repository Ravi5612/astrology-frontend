"use client";
import React, { useState, useMemo, useEffect } from "react";
import { StatsCards, NotFound } from "@repo/ui";
import { CommissionSkeleton } from "../../components/Skeleton";
import type { StatConfig } from "@repo/ui";
import { IndianRupee, CheckCircle, Clock, Filter, BadgeIndianRupee } from "lucide-react";

import { getAgentDashboardStats, getAgentCommissions } from "@/src/services/agent.service";
import type { ReferredUser } from "@/src/services/agent.service";

interface CommissionRow {
    id: number | string;
    type: string;
    listing: string;
    amount: number;
    commissionPercent: number;
    status: "paid" | "pending";
    date: string;
}

const TYPE_BADGE: Record<string, string> = {
    expert: "bg-yellow-100 text-yellow-700",
    mandir: "bg-orange-100 text-orange-700",
    puja_shop: "bg-purple-100 text-purple-700",
    video_call: "bg-pink-100 text-pink-700",
    audio_call: "bg-cyan-100 text-cyan-700",
    chat: "bg-green-100 text-green-700",
    puja_service: "bg-orange-100 text-orange-700",
};
const TYPE_LABEL: Record<string, string> = {
    expert: "Expert",
    mandir: "Mandir",
    puja_shop: "Puja Shop",
    video_call: "Video Call",
    audio_call: "Audio Call",
    chat: "Chat",
    puja_service: "Puja Service",
};

type FilterType = "all" | "paid" | "pending";

function formatDate(dateStr?: string): string {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

export default function CommissionsPage() {
    const [filter, setFilter] = useState<FilterType>("all");
    const [statsData, setStatsData] = useState<any>(null);
    const [commissions, setCommissions] = useState<CommissionRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [[stats, statsError], [commResponse, commError]] = await Promise.all([
                    getAgentDashboardStats(),
                    getAgentCommissions({ limit: 200 }),
                ]);

                if (statsError) console.error("Stats Error:", statsError);
                if (commError) console.error("Commissions Error:", commError);

                setStatsData(stats);

                // Map commission transactions to rows
                const rows: CommissionRow[] = (commResponse?.data || []).map((c: any) => ({
                    id: c.id,
                    type: c.type || "commission",
                    listing: c.listing || "Unknown",
                    amount: c.amount || 0,
                    commissionPercent: c.commissionPercent || 0,
                    status: c.status || "paid",
                    date: formatDate(c.date),
                }));

                setCommissions(rows);
            } catch (error) {
                console.error("Failed to fetch commission data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = useMemo(() =>
        filter === "all" ? commissions : commissions.filter((c) => c.status === filter),
        [filter, commissions]
    );

    const stats: StatConfig[] = useMemo(() => [
        { title: "Total Earned", value: `₹${(statsData?.totalEarned || 0).toLocaleString("en-IN")}`, icon: BadgeIndianRupee, iconColor: "text-blue-600", iconBgColor: "bg-blue-100", valueColor: "text-blue-700" },
        { title: "Commission", value: `₹${(statsData?.commissionEarned || 0).toLocaleString("en-IN")}`, icon: CheckCircle, iconColor: "text-green-600", iconBgColor: "bg-green-100", valueColor: "text-green-700" },
        { title: "Pending", value: `₹${(statsData?.pendingPayout || 0).toLocaleString("en-IN")}`, icon: Clock, iconColor: "text-orange-600", iconBgColor: "bg-orange-100", valueColor: "text-orange-700" },
        { title: "Transactions", value: commissions.length, icon: IndianRupee, iconColor: "text-gray-600", iconBgColor: "bg-gray-100" },
    ], [statsData, commissions]);

    if (loading) return <CommissionSkeleton />;

    return (
        <div className="space-y-6">

            {/* @repo/ui StatsCards */}
            <StatsCards stats={stats} columns={4} />

            {/* Filter + Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Transaction History</h3>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        {(["all", "paid", "pending"] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filter === f
                                    ? "bg-primary text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <BadgeIndianRupee className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Commissions Yet</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto mt-1">
                            Your earnings and referral commissions will appear here once they are generated.
                        </p>
                        <button
                            onClick={() => setFilter("all")}
                            className="mt-6 text-primary font-bold text-sm hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    {["Listing", "Type", "Commission", "Status", "Date"].map((h) => (
                                        <th key={h} className="px-6 py-3 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((c) => (
                                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3.5 font-semibold text-gray-800">{c.listing}</td>
                                        <td className="px-6 py-3.5">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${TYPE_BADGE[c.type] || "bg-gray-100 text-gray-700"}`}>
                                                {TYPE_LABEL[c.type] || c.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 font-black text-gray-900">
                                            ₹{c.amount.toLocaleString("en-IN")}
                                            {c.commissionPercent > 0 && (
                                                <span className="ml-1 text-[10px] font-medium text-gray-400">({c.commissionPercent}%)</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${c.status === "paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                                }`}>
                                                {c.status === "paid" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                {c.status === "paid" ? "Earned" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-gray-500 text-xs font-medium">{c.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
