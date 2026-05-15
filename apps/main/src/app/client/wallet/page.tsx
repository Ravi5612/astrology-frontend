"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";
import { api as http } from "@/lib/api";
import * as LucideIcons from "lucide-react";
import { getErrorMessage } from "@repo/lib/utils/error";
import { PATHS } from "@repo/routes";
import { loadRazorpay } from "@/libs/razorpay";
import { motion, AnimatePresence } from "framer-motion";

const {
    Wallet, Plus, History, CreditCard, ChevronRight, AlertCircle, TrendingUp, CheckCircle2, ShieldCheck, Zap
} = LucideIcons as any;

export default function UserWalletPage() {
    const { 
        balance, 
        refreshBalance, 
        isAuthenticated, 
        loading,
        user 
    } = useAuthStore();
    const [rechargeAmount, setRechargeAmount] = useState<number>(500);
    const [isProcessing, setIsProcessing] = useState(false);

    const rechargeOptions = [100, 200, 500, 1000, 2000, 5000];

    useEffect(() => {
        if (isAuthenticated) {
            refreshBalance();
        }
    }, [isAuthenticated, refreshBalance]);

    const handleRecharge = async () => {
        if (rechargeAmount < 100) {
            toast.error("Minimum recharge amount is ₹100");
            return;
        }

        setIsProcessing(true);
        
        const isSDKLoaded = await loadRazorpay();
        if (!isSDKLoaded) {
            toast.error("Payment system failed to load. Please check your connection.");
            setIsProcessing(false);
            return;
        }

        const [orderRes, orderError] = await http.post<any>("/payment/orders/create", {
            amount: rechargeAmount,
            type: "wallet_recharge",
        });

        if (orderError) {
            toast.error(getErrorMessage(orderError) || "Failed to initiate payment. Please try again.");
            setIsProcessing(false);
            return;
        }

        const orderPayload = (orderRes as any)?.data ?? orderRes;
        const { id: order_id, amount, currency, key_id } = orderPayload || {};

        if (!order_id) {
            toast.error("Invalid response from payment server.");
            setIsProcessing(false);
            return;
        }

        const options = {
            key: key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount,
            currency: currency,
            name: "Astrology in Bharat",
            description: `Wallet Recharge: ₹${rechargeAmount}`,
            order_id: order_id,
            handler: async (response: any) => {
                const [verifyRes, verifyError] = await http.post<any>("/payment/orders/verify", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                });

                if (verifyError) {
                    toast.error(getErrorMessage(verifyError) || "Payment verification failed. Please contact support.");
                } else {
                    const verifyPayload = (verifyRes as any)?.data ?? verifyRes;
                    if (verifyPayload?.success) {
                        toast.success(`Wallet successfully recharged with ₹${rechargeAmount}!`);
                        refreshBalance();
                    } else {
                        toast.error(getErrorMessage(verifyRes) || "Payment could not be verified.");
                    }
                }
                setIsProcessing(false);
            },
            prefill: {
                name: user?.name || "",
                email: user?.email || "",
            },
            theme: { color: "#FF6B00" },
            modal: {
                ondismiss: () => setIsProcessing(false),
            },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="relative"
                >
                   <div className="w-20 h-20 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                       <Wallet className="w-6 h-6 text-primary" />
                   </div>
                </motion.div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 max-w-md p-10 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10"
                >
                    <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Access Restricted</h1>
                    <p className="text-gray-400">Please login to access your secure Astro-Wallet and consultation history.</p>
                    <button
                        onClick={() => window.location.href = PATHS.SIGN_IN}
                        className="w-full px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Login to Continue
                    </button>
                </motion.div>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30 scrollbar-hide">
            {/* Celestial Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[100px] rounded-full"></div>
                <div className="absolute top-[20%] left-[10%] w-px h-px bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] animate-twinkle"></div>
                <div className="absolute top-[40%] right-[30%] w-px h-px bg-white shadow-[0_0_10px_1px_rgba(255,255,255,0.6)] animate-twinkle-delayed"></div>
            </div>

            {/* Header Section */}
            <div className="relative pt-32 pb-48 px-6 md:px-12">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    <motion.div variants={itemVariants} className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                            <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Secure Astro-Earning</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                            Celestial <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-200">Wallet</span>
                        </h1>
                        <p className="text-white/40 font-medium max-w-sm leading-relaxed text-sm md:text-base">
                            Experience zero-friction consultations with India's most trusted astrology experts.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-orange-600 rounded-[3.5rem] blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-[#141414]/80 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl min-w-[320px]">
                            <div className="space-y-1 mb-8">
                                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Available Funds</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-primary">₹</span>
                                    <motion.span 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-7xl font-black tabular-nums tracking-tighter"
                                    >
                                        {balance?.toLocaleString() || '0'}
                                    </motion.span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 py-3 px-4 bg-white/5 rounded-2xl border border-white/5 transition-colors group-hover:bg-white/10">
                                <ShieldCheck className="w-5 h-5 text-green-400" />
                                <span className="text-xs font-bold text-white/50 tracking-tight">Bank-Grade encrypted transactions</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 -mt-24 pb-24 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* Recharge Card */}
                    <div className="lg:col-span-12">
                        <div className="bg-[#141414] rounded-[4rem] p-10 md:p-16 border border-white/5 shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 px-4">
                                <div className="space-y-3">
                                    <h2 className="text-4xl font-black tracking-tight">Add Credits</h2>
                                    <p className="text-white/30 text-sm font-medium uppercase tracking-[0.1em]">Instant Top-up in under 30 seconds</p>
                                </div>
                                
                                <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10 min-w-[320px] focus-within:border-primary/50 transition-all focus-within:scale-[1.02]">
                                    <span className="text-3xl font-black text-white/20">₹</span>
                                    <input
                                        type="number"
                                        value={rechargeAmount}
                                        onChange={(e) => setRechargeAmount(parseInt(e.target.value) || 0)}
                                        className="bg-transparent border-none outline-none text-4xl font-black w-full text-white placeholder-white/10"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                                {rechargeOptions.map((amt, idx) => (
                                    <motion.button
                                        key={amt}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + (idx * 0.05) }}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setRechargeAmount(amt)}
                                        className={`relative group h-32 rounded-3xl font-bold flex flex-col items-center justify-center gap-1 transition-all overflow-hidden ${
                                            rechargeAmount === amt
                                            ? 'bg-primary text-white shadow-2xl shadow-primary/30 ring-2 ring-primary/50'
                                            : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/30'
                                        }`}
                                    >
                                        <span className="text-[9px] uppercase tracking-[0.2em] mb-1 opacity-50">Standard</span>
                                        <span className="text-3xl font-black tracking-tighter">₹{amt}</span>
                                        {rechargeAmount === amt && (
                                            <motion.div 
                                                layoutId="selected-ring"
                                                className="absolute inset-0 bg-white/10"
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleRecharge}
                                disabled={isProcessing}
                                className="relative w-full py-7 group overflow-hidden bg-primary text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-primary/20 disabled:opacity-50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                <div className="relative flex items-center justify-center gap-4">
                                    {isProcessing ? (
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Plus className="w-8 h-8" />
                                            <span>ACTIVATE CREDITS</span>
                                        </>
                                    )}
                                </div>
                            </motion.button>

                            <div className="mt-12 flex flex-wrap items-center justify-center gap-12 text-white/20">
                                {['Secure Sockets', 'Instant Audit', 'PCI Compliant'].map(text => (
                                    <div key={text} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Secondary Cards */}
                    <div className="lg:col-span-8">
                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="bg-[#141414] rounded-[3rem] p-12 border border-white/5 shadow-xl flex flex-col md:flex-row items-center gap-12"
                        >
                            <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center shrink-0 border border-primary/20">
                                <History className="w-10 h-10 text-primary" />
                            </div>
                            <div className="space-y-3 text-center md:text-left">
                                <h3 className="text-2xl font-black tracking-tight">Audit Trail</h3>
                                <p className="text-white/30 text-base leading-relaxed font-medium">Reconcile your consultations and credit history anytime. All data is real-time and cryptographically signed.</p>
                                <button
                                    onClick={() => window.location.href = PATHS.SESSION_HISTORY}
                                    className="text-primary font-black text-sm flex items-center gap-2 hover:gap-4 transition-all pt-4"
                                >
                                    OPEN HISTORY <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="h-full bg-gradient-to-br from-primary to-orange-700 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col justify-end"
                        >
                            <div className="absolute top-12 left-12 w-24 h-24 bg-white/20 rounded-full blur-3xl opacity-50"></div>
                            <CreditCard className="w-16 h-16 mb-12 opacity-50" />
                            <h3 className="text-3xl font-black tracking-tighter mb-3">Priority <br/> Support</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-10 font-bold">Encrypted assistance for financial queries 24/7.</p>
                            <button
                                onClick={() => window.location.href = PATHS.HELP}
                                className="w-full bg-white text-primary py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-colors"
                            >
                                CONTACT CONCIERGE
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .animate-twinkle {
                    animation: twinkle 4s infinite ease-in-out;
                }
                .animate-twinkle-delayed {
                    animation: twinkle 5s infinite ease-in-out 1.5s;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
