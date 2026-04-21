import { cn } from "@/lib/utils/cn";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200/60 dark:bg-gray-800/60", className)}
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
