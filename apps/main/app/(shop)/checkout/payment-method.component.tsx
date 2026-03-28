"use client";

import React from "react";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

type Props = {
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  clientBalance: number;
  total: number;
  handlePayment: () => void;
  isProcessing: boolean;
  isOrder: boolean;
};

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  clientBalance,
  total,
  handlePayment,
  isProcessing,
  isOrder,
}: Props) => {
  return (
    <div className="flex-grow">
      <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden h-full relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="p-8 md:p-12 relative z-10">
          <div className="mb-10">
            <h5 className="text-2xl font-black text-gray-900 mb-2">
              Select Payment Method
            </h5>
            <p className="text-gray-400 font-bold text-sm tracking-wide">Choose your preferred way to pay securely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wallet */}
            <label
              className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
                paymentMethod === "wallet" 
                  ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" 
                  : "border-gray-100 bg-white hover:border-gray-200"
              } ${clientBalance < total ? "opacity-40 grayscale cursor-not-allowed" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                className="hidden"
                checked={paymentMethod === "wallet"}
                onChange={() => setPaymentMethod("wallet")}
                disabled={clientBalance < total}
              />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  paymentMethod === "wallet" ? "bg-orange text-white" : "bg-gray-50 text-orange"
                }`}>
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === "wallet" ? "border-orange bg-orange" : "border-gray-200"
                }`}>
                  {paymentMethod === "wallet" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div>
                <span className="block text-lg font-black text-gray-900 mb-1">Wallet Credits</span>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${clientBalance < total ? "text-red-500" : "text-emerald-500"}`}>
                    Balance: ₹{clientBalance?.toLocaleString() || '0'}
                  </span>
                  {clientBalance < total && (
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-1">Insufficient Funds</span>
                  )}
                </div>
              </div>
            </label>

            {/* UPI */}
            <label
              className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
                paymentMethod === "upi" 
                  ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" 
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                className="hidden"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  paymentMethod === "upi" ? "bg-orange text-white" : "bg-gray-50 text-emerald-500"
                }`}>
                  <i className="fa-solid fa-mobile-screen-button"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === "upi" ? "border-orange bg-orange" : "border-gray-200"
                }`}>
                  {paymentMethod === "upi" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-lg font-black text-gray-900 mb-1 leading-none">UPI / QR</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Instant Payment</span>
                </div>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/10109/10109919.png"
                  alt="upi"
                  width={24}
                  height={24}
                  className="object-contain grayscale brightness-125"
                />
              </div>
            </label>

            {/* Card */}
            <label
              className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
                paymentMethod === "card" 
                  ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" 
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                className="hidden"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  paymentMethod === "card" ? "bg-orange text-white" : "bg-gray-50 text-blue-500"
                }`}>
                  <i className="fa-solid fa-credit-card"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === "card" ? "border-orange bg-orange" : "border-gray-200"
                }`}>
                  {paymentMethod === "card" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-lg font-black text-gray-900 mb-1 leading-none">Credit / Debit</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">All cards accepted</span>
                </div>
                <div className="flex gap-1.5 text-gray-300">
                  <i className="fa-brands fa-cc-visa text-xl"></i>
                  <i className="fa-brands fa-cc-mastercard text-xl"></i>
                </div>
              </div>
            </label>

            {/* Net Banking */}
            <label
              className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
                paymentMethod === "netbanking" 
                  ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" 
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment"
                className="hidden"
                checked={paymentMethod === "netbanking"}
                onChange={() => setPaymentMethod("netbanking")}
              />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${
                  paymentMethod === "netbanking" ? "bg-orange text-white" : "bg-gray-50 text-purple-500"
                }`}>
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === "netbanking" ? "border-orange bg-orange" : "border-gray-200"
                }`}>
                  {paymentMethod === "netbanking" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div>
                <span className="block text-lg font-black text-gray-900 mb-1 leading-none">Net Banking</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Secure Bank Portal</span>
              </div>
            </label>
          </div>

          <div className="mt-12 space-y-6">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="group relative w-full py-6 bg-orange text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-premium hover:shadow-2xl hover:shadow-orange/20 overflow-hidden transition-all duration-500 active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-4">
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-solid fa-lock-keyhole text-sm"></i>
                )}
                <span className="text-sm">
                  {isOrder ? `Pay ₹${total} & Place Order` : `Pay ₹${total} & Start Session`}
                </span>
              </div>
            </button>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-check text-emerald-500 text-sm"></i>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-[8px]">PCI DSS Compliant</span>
              </div>
              <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lock text-gray-400 text-xs text-[8px]"></i>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-[8px]">Secure 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
