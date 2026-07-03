"use client";

import React from "react";
import Image from "next/image";

type Props = {
  paymentMethod: string;
  setPaymentMethod: (val: string) => void;
  balance: number;
  total: number;
  handlePayment: () => void;
  isProcessing: boolean;
  isOrder: boolean;
  // Split Payment
  useSplitPayment: boolean;
  setUseSplitPayment: (val: boolean) => void;
  walletAmountToUse: number;
  setWalletAmountToUse: (val: number) => void;
};

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  balance,
  total,
  handlePayment,
  isProcessing,
  isOrder,
  useSplitPayment,
  setUseSplitPayment,
  walletAmountToUse,
  setWalletAmountToUse,
}: Props) => {
  const canPayFullWallet = balance >= total;
  const canSplitPay = balance > 0 && balance < total && isOrder;
  const razorpayDue = total - walletAmountToUse;
  const maxWalletUse = Math.min(balance, total - 1);

  return (
    <div className="flex-grow">
      <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden h-full relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

        <div className="p-8 md:p-12 relative z-10">
          <div className="mb-10">
            <h5 className="text-2xl font-black text-gray-900 mb-2">Select Payment Method</h5>
            <p className="text-gray-400 font-bold text-sm tracking-wide">Choose your preferred way to pay securely</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Wallet */}
            <label className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
              paymentMethod === "wallet" && !useSplitPayment ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" : "border-gray-100 bg-white hover:border-gray-200"
            } ${!canPayFullWallet ? "opacity-40 grayscale cursor-not-allowed" : ""}`}>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === "wallet" && !useSplitPayment}
                onChange={() => { setPaymentMethod("wallet"); setUseSplitPayment(false); }} disabled={!canPayFullWallet} />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${paymentMethod === "wallet" && !useSplitPayment ? "bg-orange text-white" : "bg-gray-50 text-orange"}`}>
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "wallet" && !useSplitPayment ? "border-orange bg-orange" : "border-gray-200"}`}>
                  {paymentMethod === "wallet" && !useSplitPayment && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div>
                <span className="block text-lg font-black text-gray-900 mb-1">Wallet Credits</span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${!canPayFullWallet ? "text-red-500" : "text-emerald-500"}`}>
                  Balance: ₹{balance?.toLocaleString() || '0'}
                </span>
                {!canPayFullWallet && <span className="block text-[10px] font-black text-red-400 uppercase tracking-widest mt-1">Insufficient Funds</span>}
              </div>
            </label>

            {/* UPI */}
            <label className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
              paymentMethod === "upi" && !useSplitPayment ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" : "border-gray-100 bg-white hover:border-gray-200"
            }`}>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === "upi" && !useSplitPayment}
                onChange={() => { setPaymentMethod("upi"); setUseSplitPayment(false); }} />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${paymentMethod === "upi" && !useSplitPayment ? "bg-orange text-white" : "bg-gray-50 text-emerald-500"}`}>
                  <i className="fa-solid fa-mobile-screen-button"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "upi" && !useSplitPayment ? "border-orange bg-orange" : "border-gray-200"}`}>
                  {paymentMethod === "upi" && !useSplitPayment && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-lg font-black text-gray-900 mb-1 leading-none">UPI / QR</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Instant Payment</span>
                </div>
                <Image src="https://cdn-icons-png.flaticon.com/512/10109/10109919.png" alt="upi" width={24} height={24} className="object-contain grayscale brightness-125" />
              </div>
            </label>

            {/* Card */}
            <label className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
              paymentMethod === "card" && !useSplitPayment ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" : "border-gray-100 bg-white hover:border-gray-200"
            }`}>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === "card" && !useSplitPayment}
                onChange={() => { setPaymentMethod("card"); setUseSplitPayment(false); }} />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${paymentMethod === "card" && !useSplitPayment ? "bg-orange text-white" : "bg-gray-50 text-blue-500"}`}>
                  <i className="fa-solid fa-credit-card"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "card" && !useSplitPayment ? "border-orange bg-orange" : "border-gray-200"}`}>
                  {paymentMethod === "card" && !useSplitPayment && <div className="w-2 h-2 rounded-full bg-white"></div>}
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
            <label className={`group relative flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
              paymentMethod === "netbanking" && !useSplitPayment ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" : "border-gray-100 bg-white hover:border-gray-200"
            }`}>
              <input type="radio" name="payment" className="hidden" checked={paymentMethod === "netbanking" && !useSplitPayment}
                onChange={() => { setPaymentMethod("netbanking"); setUseSplitPayment(false); }} />
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all ${paymentMethod === "netbanking" && !useSplitPayment ? "bg-orange text-white" : "bg-gray-50 text-purple-500"}`}>
                  <i className="fa-solid fa-building-columns"></i>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "netbanking" && !useSplitPayment ? "border-orange bg-orange" : "border-gray-200"}`}>
                  {paymentMethod === "netbanking" && !useSplitPayment && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </div>
              <div>
                <span className="block text-lg font-black text-gray-900 mb-1 leading-none">Net Banking</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Secure Bank Portal</span>
              </div>
            </label>
          </div>

          {/* ── Split Payment Option (only shown when wallet has some but not enough balance) ── */}
          {canSplitPay && (
            <div className={`mt-6 rounded-[2rem] border-2 transition-all duration-300 overflow-hidden ${
              useSplitPayment ? "border-orange bg-orange/[0.02] shadow-xl shadow-orange/5" : "border-dashed border-orange/40 bg-orange/[0.01]"
            }`}>
              <div
                className="flex items-start gap-4 p-6 cursor-pointer"
                onClick={() => {
                  const next = !useSplitPayment;
                  setUseSplitPayment(next);
                  if (next) setWalletAmountToUse(Math.floor(maxWalletUse));
                }}
              >
                <div className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${useSplitPayment ? "border-orange bg-orange" : "border-gray-300"}`}>
                  {useSplitPayment && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <i className="fa-solid fa-wallet text-orange text-sm"></i>
                    <i className="fa-solid fa-plus text-gray-400 text-xs"></i>
                    <i className="fa-solid fa-mobile-screen-button text-emerald-500 text-sm"></i>
                    <span className="text-lg font-black text-gray-900 ml-1">Split Payment</span>
                    <span className="text-[9px] font-black bg-orange text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Smart</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Use your ₹{balance?.toLocaleString()} wallet balance + pay ₹{(total - balance)?.toLocaleString()} via Razorpay
                  </p>
                </div>
              </div>

              {/* Slider & Breakdown */}
              {useSplitPayment && (
                <div className="px-6 pb-6 space-y-4">
                  <div className="h-px bg-orange/10 mb-4"></div>
                  <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                    <span>Adjust Wallet Amount</span>
                    <span className="text-orange font-black">₹{walletAmountToUse.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={maxWalletUse}
                    value={walletAmountToUse}
                    onChange={(e) => setWalletAmountToUse(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange"
                  />
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                        <i className="fa-solid fa-wallet mr-1"></i> From Wallet
                      </p>
                      <p className="text-xl font-black text-emerald-700">₹{walletAmountToUse.toLocaleString()}</p>
                    </div>
                    <div className="bg-orange/5 border border-orange/10 rounded-2xl p-4 text-center">
                      <p className="text-[10px] font-black text-orange uppercase tracking-widest mb-1">
                        <i className="fa-solid fa-mobile-screen-button mr-1"></i> Via Razorpay
                      </p>
                      <p className="text-xl font-black text-orange">₹{razorpayDue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pay Button */}
          <div className="mt-12 space-y-6">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="group relative w-full py-4 md:py-6 bg-orange text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-widest md:tracking-[0.3em] shadow-premium hover:shadow-2xl hover:shadow-orange/20 overflow-hidden transition-all duration-500 active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center gap-2 md:gap-4 px-2">
                {isProcessing ? (
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-solid fa-lock-keyhole text-xs md:text-sm"></i>
                )}
                <span className="text-[11px] md:text-sm leading-tight text-center">
                  {useSplitPayment
                    ? `Pay ₹${walletAmountToUse} Wallet + ₹${razorpayDue} Razorpay`
                    : isOrder ? `Pay ₹${total} & Place Order` : `Pay ₹${total} & Start Session`}
                </span>
              </div>
            </button>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-check text-emerald-500 text-sm"></i>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">PCI DSS Compliant</span>
              </div>
              <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lock text-gray-400 text-xs"></i>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
