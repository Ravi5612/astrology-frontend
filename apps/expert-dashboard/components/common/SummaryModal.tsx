"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { useRouter } from "next/navigation";

interface SummaryModalProps {
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    data: {
        totalAmount: number | string;
        platformFee: number | string;
        expertShare: number | string;
        terminatedBy?: string;
    };
}

export const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose, title = "Consultation Ended", data }) => {
    const router = useRouter();

    if (!isOpen) return null;

    const handleBack = () => {
        if (onClose) {
            onClose();
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={handleBack} />
            
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header Section (Premium Orange) */}
                <div className="bg-gradient-to-br from-[#fd6410] to-[#ff8c4a] p-10 text-center relative overflow-hidden">
                    {/* Abstract design elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-xl" />
                    
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5 border border-white/30 backdrop-blur-sm shadow-xl relative z-10">
                        <LucideIcons.CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-black text-white relative z-10 leading-tight">{title}</h3>
                    <p className="text-white/80 font-bold text-xs mt-2 uppercase tracking-[0.3em] relative z-10">Earning Summary</p>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-8 bg-white">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="p-5 bg-neutral-50 rounded-[2rem] border border-neutral-100 shadow-sm transition-all hover:border-orange-100 group">
                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 group-hover:text-neutral-500">Client Paid</p>
                            <p className="text-2xl font-black text-neutral-900 tracking-tight">₹{Number(data.totalAmount || 0).toFixed(2)}</p>
                        </div>
                        <div className="p-5 bg-orange-50/50 rounded-[2rem] border border-orange-100/50 shadow-sm transition-all hover:bg-orange-50">
                            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-2">Platform Fee</p>
                            <p className="text-2xl font-black text-[#fd6410] tracking-tight">₹{Number(data.platformFee || 0).toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="p-8 bg-green-50/50 rounded-[2.5rem] border-2 border-green-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-100/30 rounded-full -mr-10 -mt-10 blur-xl" />
                        
                        <div className="relative z-10 text-center">
                            <p className="text-[11px] font-black text-green-600 uppercase tracking-[0.25em] mb-3">Your Net Earning</p>
                            <p className="text-5xl font-black text-green-700 tracking-tighter mb-4">₹{Number(data.expertShare || 0).toFixed(2)}</p>
                            <div className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-green-100/50 rounded-full w-fit mx-auto">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-[10px] font-black text-green-600 uppercase tracking-widest italic">Credited to wallet</p>
                            </div>
                        </div>
                    </div>
                    {data.terminatedBy && (
                        <div className="flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <LucideIcons.Power size={14} className="text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Session Ended By: <span className="text-slate-900 ml-1">
                                    {data.terminatedBy.toUpperCase() === 'EXPERT' ? 'Expert (You)' : 'Client (User)'}
                                </span>
                            </span>
                        </div>
                    )}

                    <button
                        onClick={handleBack}
                        className="w-full py-5 bg-neutral-900 hover:bg-black text-white rounded-[2rem] font-black text-sm transition-all shadow-xl shadow-neutral-950/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
                    >
                        Back to Dashboard
                        <LucideIcons.ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};
