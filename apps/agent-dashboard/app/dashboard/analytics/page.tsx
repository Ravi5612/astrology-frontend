"use client";
import React, { useState, useEffect } from "react";
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from "recharts";
import { 
    TrendingUp, Users, Target, Award,
    Calendar, Filter, Download, ArrowUpRight
} from "lucide-react";
import { getAgentDashboardStats } from "@/src/services/agent.service";

// Mock data for charts
const REVENUE_DATA = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
];

const CATEGORY_DATA = [
    { name: "Astrologers", value: 45, color: "#F25E0A" },
    { name: "Numerologists", value: 25, color: "#800000" },
    { name: "Tarot Readers", value: 20, color: "#FFB800" },
    { name: "Other", value: 10, color: "#4B5563" },
];

const REGISTRATION_DATA = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 18 },
    { day: "Wed", count: 15 },
    { day: "Thu", count: 25 },
    { day: "Fri", count: 20 },
    { day: "Sat", count: 30 },
    { day: "Sun", count: 22 },
];

export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const [data, error] = await getAgentDashboardStats();
            if (data) setStats(data);
            setLoading(false);
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Performance Analytics</h1>
                    <p className="text-sm font-medium text-gray-500">Real-time insights and growth metrics for your agent network.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest shadow-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F25E0A] rounded-xl text-xs font-black text-white hover:bg-[#d45209] transition-all uppercase tracking-widest shadow-lg shadow-orange-500/20">
                        <Download className="w-3.5 h-3.5" />
                        Export
                    </button>
                </div>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Revenue", value: "₹45,280", trend: "+12.5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "Total Referrals", value: stats?.totalUsers || "128", trend: "+8.2%", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Success Rate", value: "94.2%", trend: "+2.1%", icon: Target, color: "text-orange-500", bg: "bg-orange-50" },
                    { label: "Agent Rank", value: "#14", trend: "Top 5%", icon: Award, color: "text-purple-500", bg: "bg-purple-50" },
                ].map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-500 group cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 ${card.bg} rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                                <card.icon className={`w-5 h-5 ${card.color}`} />
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-500">{card.trend}</span>
                        </div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-gray-600 transition-colors">{card.label}</h4>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-[#F25E0A] transition-colors">{card.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Growth Chart */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6 hover:shadow-[0_40px_80px_-20px_rgba(242,94,10,0.08)] hover:-translate-y-1 transition-all duration-700 group/chart relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover/chart:bg-orange-100/30 transition-colors" />
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase group-hover/chart:text-[#F25E0A] transition-colors">Revenue Growth</h3>
                            <p className="text-xs font-bold text-gray-400">Monthly earnings trend from referrals.</p>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-500">
                            <ArrowUpRight className="w-4 h-4" />
                            <span className="text-xs font-black">+18%</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={REVENUE_DATA}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F25E0A" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#F25E0A" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}} 
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#F25E0A" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Breakdown Chart */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6 hover:shadow-[0_40px_80px_-20px_rgba(128,0,0,0.06)] hover:-translate-y-1 transition-all duration-700 group/pie">
                    <div>
                        <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase group-hover/pie:text-[#800000] transition-colors">Network Composition</h3>
                        <p className="text-xs font-bold text-gray-400">Distribution of registered expert categories.</p>
                    </div>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Legend 
                                    verticalAlign="bottom" 
                                    height={36}
                                    formatter={(value) => <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider ml-2">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Registration Activity Bar Chart */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6 lg:col-span-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-700 group/bar">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase group-hover/bar:text-gray-800 transition-colors">Registration Activity</h3>
                            <p className="text-xs font-bold text-gray-400">Daily registration volume for the current week.</p>
                        </div>
                        <div className="px-3 py-1.5 bg-orange-50 rounded-lg group-hover/bar:bg-orange-100 transition-colors">
                            <span className="text-[10px] font-black text-[#F25E0A] tracking-widest uppercase">Weekly Goal: 150</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={REGISTRATION_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fontWeight: 700, fill: '#9CA3AF'}}
                                />
                                <Tooltip 
                                    cursor={{fill: '#F9FAFB'}}
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                                    {REGISTRATION_DATA.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.count > 20 ? "#F25E0A" : "#800000"} 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
