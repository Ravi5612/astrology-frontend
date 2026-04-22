import React, { useState } from "react";
import { Button } from "@repo/ui";
import { Landmark, Info, AlertCircle } from "lucide-react";

interface WithdrawSectionProps {
    balance: number;
    onWithdraw: (amount: number) => void;
    loading: boolean;
    hasBankDetails: boolean;
}

export const WithdrawSection: React.FC<WithdrawSectionProps> = ({ 
    balance, 
    onWithdraw, 
    loading,
    hasBankDetails 
}) => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount < 500 || numAmount > balance) return;
        onWithdraw(numAmount);
        setAmount("");
    };

    return (
        <div className="group bg-white p-10 rounded-[1.5rem] border border-gray-100 shadow-sm space-y-8 relative overflow-hidden transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-orange-100/50 transition-colors duration-700" />
            
            <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-xl group-hover:rotate-[360deg] transition-transform duration-1000">
                    <Landmark className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Withdraw Funds</h3>
                    <p className="text-sm font-medium text-gray-400">Transfer your earnings directly to your registered bank account.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-end gap-6">
                <div className="w-full lg:w-1/3 space-y-2.5">
                    <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">Amount to Withdraw</label>
                    <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                        <input 
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            className="w-full pl-10 pr-4 py-5 bg-gray-50 border border-gray-200 rounded-2xl text-[15px] font-bold outline-none focus:border-orange-500/20 focus:bg-white transition-all"
                            required
                        />
                    </div>
                    <p className="text-[10px] text-gray-300 font-medium ml-1 flex items-center gap-1">
                        <Info className="w-3 h-3" /> Min. withdrawal ₹500
                    </p>
                </div>

                <div className="w-full lg:w-1/3 space-y-2.5">
                    <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">Select Bank Account</label>
                    {!hasBankDetails ? (
                        <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-500">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p className="text-[11px] font-black uppercase tracking-tight italic">Please add a bank account first</p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-5 bg-green-50 border border-green-100 rounded-2xl text-green-600">
                            <Landmark className="w-4 h-4 shrink-0" />
                            <p className="text-[11px] font-black uppercase tracking-tight">Primary Bank Account Selected</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={loading || !amount || parseFloat(amount) < 500 || parseFloat(amount) > balance || !hasBankDetails}
                        className="rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-xl shadow-orange-500/20 px-12 py-7 h-auto text-white font-black uppercase tracking-widest text-sm transition-all active:scale-95 disabled:grayscale"
                    >
                        {loading ? "Processing..." : "Withdraw Now →"}
                    </Button>

                    <div className="flex items-center gap-2.5 px-5 py-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Secure Payout System</span>
                    </div>
                </div>
            </form>
        </div>
    );
};
