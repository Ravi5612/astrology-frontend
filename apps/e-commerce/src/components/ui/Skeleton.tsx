import SkeletonLoader from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { cn } from "@/lib/utils/cn";

/**
 * 🎨 Premium Skeleton Component
 * Powered by react-loading-skeleton
 */
export function Skeleton({ className, height, width, circle, ...props }: any) {
  return (
    <SkeletonLoader 
      containerClassName={cn("block", className)} 
      className="block h-full w-full"
      height={height}
      width={width}
      circle={circle}
      baseColor="#f3f4f6"
      highlightColor="#e5e7eb"
      {...props} 
    />
  );
}
