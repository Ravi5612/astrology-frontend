"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    Star, Users, Building2, ShoppingBag, LayoutList,
    Mail, Phone, Calendar, Search, X, UserCheck, UserX,
    Clock, RefreshCw,
} from "lucide-react";
import { getReferredUsers, type ReferredUser } from "@/src/services/agent.service";
import { toast } from "react-toastify";

// ── Tab config ───────────────────────────────────────────────────────────────

type TabId = "all" | "astrologer" | "client" | "mandir" | "puja_shop";

interface Tab {
    id: TabId;
    label: string;
    icon: React.ElementType;
    color: string;
    activeBg: string;
    activeText: string;
    badgeBg: string;
    live: boolean; // false = coming soon
}

const TABS: Tab[] = [
    {
        id: "all",
        label: "All",
        icon: LayoutList,
        color: "text-gray-600",
        activeBg: "bg-primary",
        activeText: "text-white",
        badgeBg: "bg-gray-100 text-gray-700",
        live: true,
    },
    {
        id: "astrologer",
        label: "Astrologer",
        icon: Star,
        color: "text-yellow-600",
        activeBg: "bg-yellow-500",
        activeText: "text-white",
        badgeBg: "bg-yellow-100 text-yellow-700",
        live: true,
    },
    {
        id: "client",
        label: "Clients",
        icon: Users,
        color: "text-blue-600",
        activeBg: "bg-blue-500",
        activeText: "text-white",
        badgeBg: "bg-blue-100 text-blue-700",
        live: true,
    },
    {
        id: "mandir",
        label: "Mandirs",
        icon: Building2,
        color: "text-orange-600",
        activeBg: "bg-orange-500",
        activeText: "text-white",
        badgeBg: "bg-orange-100 text-orange-700",
        live: false,
    },
    {
        id: "puja_shop",
        label: "Puja Shop",
        icon: ShoppingBag,
        color: "text-purple-600",
        activeBg: "bg-purple-500",
        activeText: "text-white",
        badgeBg: "bg-purple-100 text-purple-700",
        live: false,
    },
];

// ── Avatar helper ────────────────────────────────────────────────────────────
function UserAvatar({ user }: { user: ReferredUser }) {
    const initials = (user.name ?? "?")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    const isAstrologer = user.type === "astrologer";

    if (user.avatar) {
        return (
            <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
            />
        );
    }

    return (
        <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-sm ${
                isAstrologer
                    ? "bg-gradient-to-br from-yellow-400 to-amber-600"
                    : "bg-gradient-to-br from-blue-400 to-indigo-600"
            }`}
        >
            {initials}
        </div>
    );
}

// ── Type Badge ───────────────────────────────────────────────────────────────
function TypeBadge({ type }: { type: ReferredUser["type"] }) {
    if (type === "astrologer") {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                <Star className="w-2.5 h-2.5" />
                Astrologer
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">
            <Users className="w-2.5 h-2.5" />
            Client
        </span>
    );
}

// ── User Card ────────────────────────────────────────────────────────────────
function UserCard({ user }: { user: ReferredUser }) {
    const joined = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "—";

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 p-5 flex flex-col gap-4">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    <UserAvatar user={user} />
                    <div className="min-w-0">
                        <p className="font-black text-gray-900 text-sm truncate leading-tight">
                            {user.name ?? "Unknown"}
                        </p>
                        <div className="mt-1">
                            <TypeBadge type={user.type} />
                        </div>
                    </div>
                </div>
                {/* Status dot */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">Active</span>
                </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
                {user.email && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Mail className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        <span className="truncate">{user.email}</span>
                    </div>
                )}
                {user.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        <span>{user.phone}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Joined {joined}</span>
                </div>
            </div>
        </div>
    );
}

// ── Coming Soon placeholder ──────────────────────────────────────────────────
function ComingSoon({ tab }: { tab: Tab }) {
    const Icon = tab.icon;
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className={`w-20 h-20 rounded-3xl ${tab.activeBg} bg-opacity-10 flex items-center justify-center mb-5 shadow-inner`}
                style={{ background: "rgba(0,0,0,0.04)" }}>
                <Icon className={`w-9 h-9 ${tab.color}`} />
            </div>
            <h3 className="text-lg font-black text-gray-800 mb-2">{tab.label} Listings</h3>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                {tab.label} listing API is coming soon. Once it&apos;s ready, all your{" "}
                {tab.label.toLowerCase()} registrations will appear here.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest">
                <Clock className="w-3.5 h-3.5" /> Coming Soon
            </span>
        </div>
    );
}

// ── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ search, onClear }: { search: string; onClear: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <UserX className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-black text-gray-700 mb-1">No listings found</p>
            <p className="text-sm text-gray-400 mb-4">
                {search ? `No results for "${search}"` : "You haven't registered anyone yet."}
            </p>
            {search && (
                <button
                    onClick={onClear}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors"
                >
                    <X className="w-4 h-4" /> Clear Search
                </button>
            )}
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ListingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>("all");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [data, setData] = useState<ReferredUser[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    // Debounce search
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    const currentTab = TABS.find((t) => t.id === activeTab)!;
    const isLive = currentTab.live;

    // Fetch referred users (only for live tabs)
    const fetchData = useCallback(async () => {
        if (!isLive) return;
        setLoading(true);
        try {
            const params: { type?: "astrologer" | "client"; search?: string } = {};
            if (activeTab === "astrologer" || activeTab === "client") {
                params.type = activeTab;
            }
            if (debouncedSearch.trim()) {
                params.search = debouncedSearch.trim();
            }
            const res = await getReferredUsers(params);
            setData(res?.data ?? []);
            setTotal(res?.total ?? 0);
        } catch {
            toast.error("Failed to load listings");
        } finally {
            setLoading(false);
        }
    }, [activeTab, debouncedSearch, isLive, refreshKey]);

    useEffect(() => {
        if (isLive) {
            fetchData();
        }
    }, [fetchData, isLive]);

    // Per-tab counts from live data (when tab = all)
    const astrologerCount = useMemo(() => data.filter((u) => u.type === "astrologer").length, [data]);
    const clientCount = useMemo(() => data.filter((u) => u.type === "client").length, [data]);

    // Badge counts per tab button
    const getTabCount = (tab: Tab): number | null => {
        if (!tab.live) return null;
        if (tab.id === "all") return total;
        if (tab.id === "astrologer") return activeTab === "all" ? astrologerCount : total;
        if (tab.id === "client") return activeTab === "all" ? clientCount : total;
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-black text-gray-900">Listings</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                        All registrations made by you
                    </p>
                </div>
                <button
                    onClick={() => setRefreshKey((k) => k + 1)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors text-xs font-bold shadow-sm"
                    title="Refresh listings"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {/* 5 Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const count = getTabCount(tab);
                    return (
                        <button
                            key={tab.id}
                            id={`listing-tab-${tab.id}`}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearch("");
                            }}
                            className={`
                                relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold
                                border transition-all duration-200 shadow-sm focus:outline-none
                                focus:ring-2 focus:ring-offset-1 focus:ring-primary/40
                                ${
                                    isActive
                                        ? `${tab.activeBg} ${tab.activeText} border-transparent shadow-md scale-[1.03]`
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                }
                            `}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? "text-white" : tab.color}`} />
                            <span>{tab.label}</span>
                            {count !== null && (
                                <span
                                    className={`
                                        ml-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5
                                        rounded-full text-[10px] font-black
                                        ${isActive ? "bg-white/20 text-white" : tab.badgeBg}
                                    `}
                                >
                                    {count}
                                </span>
                            )}
                            {!tab.live && (
                                <span className="ml-1 text-[9px] font-black text-orange-500 bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                    Soon
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            {!isLive ? (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <ComingSoon tab={currentTab} />
                </div>
            ) : (
                <>
                    {/* Search bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            id="listings-search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email…"
                            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 shadow-sm transition-all"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Summary strip */}
                    {!loading && data.length > 0 && (
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-4 py-2 shadow-sm">
                                <UserCheck className="w-4 h-4 text-green-500" />
                                <span className="text-xs font-bold text-gray-700">
                                    {total} total
                                </span>
                            </div>
                            {activeTab === "all" && (
                                <>
                                    <div className="flex items-center gap-2 bg-yellow-50 rounded-xl border border-yellow-200 px-4 py-2 shadow-sm">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-xs font-bold text-yellow-700">
                                            {astrologerCount} astrologers
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-blue-50 rounded-xl border border-blue-200 px-4 py-2 shadow-sm">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        <span className="text-xs font-bold text-blue-700">
                                            {clientCount} clients
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Grid */}
                    {loading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl border border-gray-200 p-5 h-44 animate-pulse"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-gray-200" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 bg-gray-200 rounded w-32" />
                                            <div className="h-2.5 bg-gray-100 rounded w-20" />
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="h-2.5 bg-gray-100 rounded w-full" />
                                        <div className="h-2.5 bg-gray-100 rounded w-3/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : data.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <EmptyState search={search} onClear={() => setSearch("")} />
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {data.map((user) => (
                                <UserCard key={user.id} user={user} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
