import React from "react";
import { ProgressBarProps } from "@/lib/types";

export const ProgressBar = ({ label, value, max = 100 }: ProgressBarProps) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);

    const percentage = (value / max) * 100;
    
    if (!mounted) return (
        <div className="w-full h-8 bg-gray-100/50 animate-pulse rounded-lg" />
    );
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <p className="m-0 text-[11px] font-black uppercase tracking-[3px] text-[#301118]/50">
                    {label}
                </p>
                <p className="m-0 text-[11px] font-black uppercase tracking-[3px] text-[#d4af37]">
                    {value}
                </p>
            </div>
            <div 
                className="w-full h-3 rounded-full bg-[#d4af37]/10 overflow-hidden border border-yellow-100"
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-label={label}
            >
                <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};
