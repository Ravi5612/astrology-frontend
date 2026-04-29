import Link from "next/link";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: string | null;
  className?: string;
  href?: string;
  isLoading?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-white",
  iconBgColor = "bg-[#fd6410]",
  trend,
  className,
  href,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className={cn("bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 animate-pulse z-10", className)}>
        <div className="flex justify-between items-start">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl" />
          <div className="w-16 h-6 bg-gray-100 rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="w-24 h-3 bg-gray-100 rounded-full" />
          <div className="w-32 h-10 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  const CardContent = (
    <div className="relative h-full flex flex-col justify-between">
      {/* Top Section: Icon & Trend */}
      <div className="flex items-center justify-between mb-8">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg shadow-orange-200", 
          iconBgColor, 
          iconColor, 
          "group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-orange-400/40"
        )}>
          <Icon className="w-8 h-8" />
        </div>
        
        {trend && (
          <div className="flex flex-col items-end">
            <span className={cn(
              "text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm border",
              trend.startsWith('+') ? "text-green-600 bg-green-50 border-green-100" : "text-blue-600 bg-blue-50 border-blue-100"
            )}>
               <ArrowUpRight className="w-3.5 h-3.5" /> {trend}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Section: Title & Value */}
      <div className="space-y-1">
        <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.25em] mb-2">
          {title}
        </p>
        <h4 className="text-4xl font-black text-gray-900 tracking-tighter group-hover:text-[#fd6410] transition-colors duration-300">
          {value}
        </h4>
      </div>

      {/* Subtle Hover Gradient */}
      <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[3rem] -z-10" />
    </div>
  );

  const containerClasses = cn(
    "group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 z-10",
    "hover:shadow-2xl hover:shadow-orange-200/50 hover:-translate-y-2 cursor-pointer",
    className
  );

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {CardContent}
    </div>
  );
};
