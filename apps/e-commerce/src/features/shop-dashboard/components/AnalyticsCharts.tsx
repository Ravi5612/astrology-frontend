"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#fd6410", // Primary Orange
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#6366f1", // Indigo (again, maybe purple)
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#ef4444", // Red
];

function formatDate(date: Date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

// 1. Long term Earning Chart
export function RevenueChart({ data }: { data: any[] }) {
  const chartData = React.useMemo(() => {
    // Generate last 30 days
    const days = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        days.push(formatDate(d));
    }

    if (!data || data.length === 0) {
        return days.map(day => ({ date: day, revenue: 0 }));
    }

    return days.map(day => {
        const found = data.find(d => d.date === day);
        return { date: day, revenue: found ? Number(found.revenue) : 0 };
    });
  }, [data]);

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 h-[450px] flex flex-col">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Revenue Timeline</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Last 30 Days Growth</p>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fd6410" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#fd6410" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} dy={15} interval={4} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px', fontSize: '14px', fontWeight: '900' }}
              formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
            />
            <Area type="monotone" dataKey="revenue" stroke="#fd6410" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" animationDuration={2000} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import { Legend } from "recharts";

// 2. Product Share (Pie Chart)
export function ProductShareChart({ data }: { data: any[] }) {
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [{ name: 'No Data', sales: 1, percentage: 0 }];
    return data;
  }, [data]);

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 h-[450px] flex flex-col">
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Sales Distribution</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">By Product Category</p>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="40%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="sales"
              nameKey="name"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px', fontSize: '12px', fontWeight: '900' }}
            />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle" 
              iconType="circle"
              formatter={(value) => <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider ml-2">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 3. Stock Level (Bar Chart)
export function StockChart({ data }: { data: any[] }) {
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    return data;
  }, [data]);

  return (
    <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-200/40 h-[500px] flex flex-col">
      <div className="mb-10">
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Catalog Inventory Health</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Real-time stock monitoring</p>
      </div>
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 100, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" axisLine={false} tickLine={false} hide />
            <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                width={150} 
            />
            <Tooltip 
                 cursor={{fill: '#fff1f0'}}
                 contentStyle={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: '900' }}
            />
            <Bar dataKey="stock" radius={[0, 15, 15, 0]} barSize={25} animationDuration={2500}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
