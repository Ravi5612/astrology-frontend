"use client";
import React, { Suspense } from "react";
import OrderSummary from "./order-summary.component";
import PaymentMethod from "./payment-method.component";
import { useCheckout } from "./useCheckout";

const CheckoutContent = () => {
  const {
    isOrder,
    loadingProfile,
    address,
    handleAddressChange,
    buyNowInfo,
    directProduct,
    cartItems,
    expertName,
    date,
    time,
    duration,
    couponCode,
    setCouponCode,
    appliedCoupon,
    isApplying,
    availableCoupons,
    handleApplyCoupon,
    handleRemoveCoupon,
    discountAmount,
    total,
    paymentMethod,
    setPaymentMethod,
    balance,
    handlePayment,
    isProcessing,
    handleQuantityChange,
  } = useCheckout();

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-900 border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
             <i className="fa-solid fa-shield-check text-orange text-xs text-orange"></i>
             <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em]">SECURE CHECKOUT ENCRYPTED</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-none tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Finalize Your <span className="text-orange italic">Journey</span>
          </h1>
          <p className="text-gray-400 font-bold max-w-xl mx-auto text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            Complete your payment securely to {isOrder ? "place your order" : "start your personal consultation session"}.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left Column: Order Summary */}
            <div className="w-full lg:w-[400px] shrink-0 sticky top-32">
            <OrderSummary
              isOrder={isOrder}
              loadingProfile={loadingProfile}
              address={address}
              handleAddressChange={handleAddressChange}
              buyNowInfo={buyNowInfo}
              directProduct={directProduct}
              cartItems={cartItems}
              expertName={expertName}
              date={date}
              time={time}
              duration={duration}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              appliedCoupon={appliedCoupon}
              isApplying={isApplying}
              availableCoupons={availableCoupons}
              handleApplyCoupon={handleApplyCoupon}
              handleRemoveCoupon={handleRemoveCoupon}
              discountAmount={discountAmount}
              total={total}
              handleQuantityChange={handleQuantityChange}
            />
          </div>

          {/* Right: Payment */}
          <div className="flex-grow w-full max-w-2xl">
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              balance={balance}
              total={total}
              handlePayment={handlePayment}
              isProcessing={isProcessing}
              isOrder={isOrder}
            />
          </div>
          </div>

          {/* Footer Badges */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-3">
               <i className="fa-brands fa-cc-visa text-3xl"></i>
               <i className="fa-brands fa-cc-mastercard text-3xl"></i>
               <i className="fa-brands fa-cc-apple-pay text-3xl"></i>
               <i className="fa-brands fa-cc-amazon-pay text-3xl"></i>
             </div>
             <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
             <div className="flex items-center gap-2">
               <i className="fa-solid fa-lock text-xl"></i>
               <span className="text-xs font-black uppercase tracking-widest text-gray-900">100% Secure Payments</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-orange/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-orange rounded-full animate-spin"></div>
            </div>
            <div className="flex flex-col items-center gap-2">
               <p className="text-white font-black text-xs uppercase tracking-[0.4em]">Initializing Secure Portal</p>
               <div className="flex gap-1.5">
                  <div className="w-1 h-1 bg-orange rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-orange rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1 h-1 bg-orange rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               </div>
            </div>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
