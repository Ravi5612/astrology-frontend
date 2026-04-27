import Link from "next/link";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Skeleton } from "@/components/ui/Skeleton";

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
  iconColor = "text-[#fd6410]",
  iconBgColor = "bg-orange-50",
  trend,
  className,
  href,
  isLoading
}) => {
  const CardContent = (
    <>
      {/* Background Accent Circle */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-50/50 rounded-full group-hover:scale-[2.5] transition-transform duration-700 opacity-50" />
      
      {/* Premium Orange Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#fd6410] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "p-4 rounded-2xl transition-all duration-500", 
            iconBgColor, 
            iconColor, 
            !isLoading && "group-hover:bg-[#fd6410] group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-orange-200"
          )}>
            <Icon className="w-6 h-6" />
          </div>
          {isLoading ? (
            <Skeleton className="h-6 w-16 rounded-lg" />
          ) : trend && (
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-green-100">
                 <ArrowUpRight className="w-3 h-3" /> {trend}
              </span>
            </div>
          )}
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.15em] leading-none mb-1">{title}</p>
        {isLoading ? (
          <Skeleton className="h-9 w-32 mt-1" />
        ) : (
          <h4 className="text-3xl font-black text-gray-900 tracking-tight group-hover:text-[#fd6410] transition-colors duration-300">
            {value}
          </h4>
        )}
      </div>
    </>
  );

  const containerClasses = cn(
    "group relative bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all duration-500 overflow-hidden",
    !isLoading && "hover:shadow-2xl hover:scale-105 cursor-pointer",
    className
  );

  if (href && !isLoading) {
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
