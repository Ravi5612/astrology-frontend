"use client";

import React from "react";

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-10 pb-20 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="h-10 w-64 bg-gray-200 rounded-2xl mb-4" />
          <div className="h-6 w-96 bg-gray-100 rounded-xl" />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-32" />
        ))}
      </div>

      {/* Main Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-[400px]" />
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 h-[400px]" />
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 h-[400px]" />
      </div>
    </div>
  );
}
