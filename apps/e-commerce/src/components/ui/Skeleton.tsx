import SkeletonLoader, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { cn } from "@/lib/utils/cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SkeletonLoader 
      containerClassName={cn("flex-1", className)} 
      className="h-full w-full"
      baseColor="#f3f4f6"
      highlightColor="#e5e7eb"
      {...props} 
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      <div className="h-40 w-full rounded-[2.5rem] bg-gray-100/50 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <Skeleton className="xl:col-span-2 h-96 rounded-[2.5rem]" />
        <Skeleton className="h-96 rounded-[2.5rem]" />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-[1.5rem] border border-gray-100 p-6 shadow-sm flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-12 w-12 rounded-2xl shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number, cols?: number }) {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-10 w-64 rounded-xl" />
      </div>
      <div className="space-y-6">
        <div className={`grid grid-cols-${cols} gap-4 pb-4 border-b border-gray-50`}>
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={`grid grid-cols-${cols} gap-4 py-2 items-center`}>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            {Array.from({ length: cols - 1 }).map((_, j) => (
              <Skeleton key={j} className="h-5 w-full max-w-[120px]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EarningsSkeleton() {
  return (
    <div className="space-y-8">
      <StatsSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <TableSkeleton rows={6} />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <Skeleton className="h-64 rounded-[2.5rem]" />
          <Skeleton className="h-48 rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 space-y-8">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-2 gap-8">
              <Skeleton className="h-48 rounded-[2rem]" />
              <Skeleton className="h-48 rounded-[2rem]" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 rounded-2xl" />)}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-[600px] rounded-[2.5rem]" />
        </div>
      </div>
    </div>
  );
}
