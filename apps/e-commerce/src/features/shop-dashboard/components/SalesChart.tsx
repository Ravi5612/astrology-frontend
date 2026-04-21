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
} from "recharts";
import { motion } from "framer-motion";

const defaultData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

interface SalesChartProps {
  data?: { date: string; sales: number }[];
  isLoading?: boolean;
}

export function SalesChart({ data, isLoading }: SalesChartProps) {
  const chartData = data?.map(d => ({ name: d.date, sales: d.sales })) || defaultData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col h-[400px]"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-gray-900 tracking-tight">Sales Over Time</h3>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Weekly performance analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#fd6410] shadow-sm" />
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-600">Total Revenue</span>
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fd6410" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#fd6410" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 800, fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '800'
              }}
              cursor={{ stroke: '#fd6410', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#fd6410"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorSales)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
