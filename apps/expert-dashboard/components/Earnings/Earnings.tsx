"use client";

import React, { useState, useEffect } from "react";
import EarningsStats from "./EarningsStats";
import EarningsCharts from "./EarningsCharts";
import TopInsights from "./TopInsights";
import { EarningsDashboardData } from "./types";
import { ChevronDown, Calendar as CalendarIcon, Download } from "lucide-react";
import { getEarningsStats } from "@/lib/earnings";
import { Button } from "@repo/ui";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import "./earnings.css";
import { exportElementToPDF } from "@/lib/export-utils";
import { toast } from "react-toastify";
import { StatsSkeleton, ChartSkeleton, InsightsSkeleton } from "../dashboard/DashboardSkeletons";
import { getErrorMessage } from "@repo/lib/utils/error";

export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState("last_6_months");
  const [isExporting, setIsExporting] = useState(false);
  const [data, setData] = useState<EarningsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Custom Date Range State
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempRange, setTempRange] = useState<[Date | null, Date | null]>([null, null]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [stats, error] = await getEarningsStats(
          timeRange, 
          timeRange === 'custom' ? startDate || undefined : undefined,
          timeRange === 'custom' ? endDate || undefined : undefined
        );
        if (error) {
           console.error("[EarningsPage] Failed to load earnings stats:", error);
           toast.error(getErrorMessage(error));
           setData(null);
        } else {
           setData(stats);
        }
      } catch (error) {
        console.error("[EarningsPage] Failed to load earnings stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [timeRange, startDate, endDate]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Small delay to ensure any transient UI states are settled
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const fileName = `Earnings_Report_${timeRangeLabels[timeRange].replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      await exportElementToPDF('earnings-report', fileName);
      
      toast.success("PDF Downloaded Successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(getErrorMessage(error) || "Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Removed early return spinner for skeletons implementation

  const timeRangeLabels: Record<string, string> = {
    "last_6_months": "Last 6 Months",
    "today": "Today",
    "last_month": "Last Month",
    "custom": startDate && endDate 
      ? `${new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${new Date(endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`
      : "Custom Range"
  };

  const handleApplyCustomRange = () => {
    if (tempRange[0] && tempRange[1]) {
      const s = tempRange[0].toISOString().split('T')[0];
      const e = tempRange[1].toISOString().split('T')[0];
      setStartDate(s);
      setEndDate(e);
      setTimeRange("custom");
      setShowDatePicker(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8 relative">
       {/* Subtle Progress Bar for background loading */}
       {loading && data && (
        <div className="absolute top-0 left-0 right-0 h-1 z-50 overflow-hidden bg-orange-50">
          <div className="h-full bg-orange-500 animate-pulse w-full"></div>
        </div>
      )}

      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Revenue & Analytics</h1>
          <p className="text-gray-500 mt-1">Detailed breakdown of your earnings and service performance</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Button
              variant="outline"
              className="bg-white border-gray-200 hover:border-orange-400 text-gray-700 shadow-sm rounded-xl gap-2 font-semibold"
            >
              <CalendarIcon className="w-4 h-4 text-orange-500" />
              {timeRangeLabels[timeRange]}
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>

            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 invisible group-hover:visible z-50 transition-all opacity-0 group-hover:opacity-100">
              {Object.entries(timeRangeLabels).map(([key, label]) => (
                <Button
                  key={key}
                  onClick={() => {
                    if (key === 'custom') {
                      setShowDatePicker(true);
                    } else {
                      setTimeRange(key);
                    }
                  }}
                  variant="ghost"
                  className={`w-full justify-start px-4 py-2 text-sm font-medium hover:bg-orange-50 transition-colors rounded-lg ${timeRange === key ? 'text-orange-600 bg-orange-50' : 'text-gray-600'}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleExport}
            disabled={isExporting}
            loading={isExporting}
            variant="primary"
            className="shadow-md rounded-xl"
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <div 
        id="earnings-report"
        className={`max-w-7xl mx-auto space-y-8 transition-all duration-300 ${loading ? "opacity-60 blur-[0.5px]" : "opacity-100"} bg-gray-50/50 p-4 rounded-3xl`}
      >
        {/* Stats Section */}
        {loading && !data ? (
          <StatsSkeleton />
        ) : (
          data && data.stats && <EarningsStats stats={data.stats} />
        )}

        {/* Charts Section */}
        {loading && !data ? (
          <ChartSkeleton />
        ) : (
          data && (
            <EarningsCharts
              incomeTrends={data.incomeTrends}
              revenueBreakdown={data.revenueBreakdown}
            />
          )
        )}

        {/* Top Insights Section */}
        <div className="pb-12">
          {loading && !data ? (
            <InsightsSkeleton />
          ) : (
            data && (
              <TopInsights
                topUsers={data.topUsers}
                topServices={data.topServices}
              />
            )
          )}
        </div>
      </div>

      {/* Custom Date Range Modal */}
      {showDatePicker && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDatePicker(false)} />
          <div className="bg-white rounded-[2.5rem] shadow-2xl relative z-10 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 bg-[#fd6410] text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black tracking-tight">Select Date Range</h3>
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">Choose start & end dates</p>
              </div>
              <button 
                onClick={() => setShowDatePicker(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="custom-calendar-wrapper">
                <Calendar
                  selectRange={true}
                  onChange={(value: any) => setTempRange(value)}
                  value={tempRange[0] && tempRange[1] ? [tempRange[0], tempRange[1]] : null}
                  className="w-full border-0 shadow-none font-sans"
                />
              </div>

              <div className="mt-8 flex gap-3">
                <Button 
                  className="flex-1 rounded-2xl py-3 font-black text-sm transition-all border-2 border-gray-100 hover:bg-gray-50 text-gray-500"
                  onClick={() => setShowDatePicker(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1 rounded-2xl py-3 font-black text-sm shadow-lg shadow-orange-200"
                  disabled={!tempRange[0] || !tempRange[1]}
                  onClick={handleApplyCustomRange}
                >
                  <Check size={18} className="mr-2" />
                  Apply Range
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}


