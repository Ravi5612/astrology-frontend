"use client";

import React from "react";

type Props = {
  isOrder: boolean;
  loadingProfile: boolean;
  address: any;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buyNowInfo: any;
  directProduct: any;
  cartItems: any[];
  expertName: string;
  date: string;
  time: string;
  duration: string;
  couponCode: string;
  setCouponCode: (val: string) => void;
  appliedCoupon: any;
  isApplying: boolean;
  handleApplyCoupon: () => void;
  handleRemoveCoupon: () => void;
  discountAmount: number;
  total: number;
  handleQuantityChange?: (qty: number) => void;
  availableCoupons?: any[];
};

const OrderSummary = ({
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
  handleApplyCoupon,
  handleRemoveCoupon,
  discountAmount,
  total,
  handleQuantityChange,
  availableCoupons = [],
}: Props) => {
  return (
    <div className="w-full lg:w-[400px] shrink-0 space-y-6">
      {/* Shipping Address - Only for Products */}
      {isOrder && (
        <div className="bg-white rounded-[2rem] shadow-premium border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h5 className="text-lg font-black text-gray-900 mb-6 flex items-center justify-between">
              Shipping Details
              {loadingProfile && (
                <div className="w-4 h-4 border-2 border-orange/20 border-t-orange rounded-full animate-spin"></div>
              )}
            </h5>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address Line 1*</label>
                <input
                  type="text"
                  name="line1"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-gray-900"
                  placeholder="House No., Street Name"
                  value={address.line1}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Address Line 2</label>
                <input
                  type="text"
                  name="line2"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-gray-900"
                  placeholder="Apartment, Landmark"
                  value={address.line2}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City*</label>
                <input
                  type="text"
                  name="city"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-gray-900"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State*</label>
                <input
                  type="text"
                  name="state"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-gray-900"
                  value={address.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pincode*</label>
                <input
                  type="text"
                  name="zip_code"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange/30 focus:ring-4 focus:ring-orange/5 transition-all outline-none text-sm font-bold text-gray-900"
                  value={address.zip_code}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                <input
                  type="text"
                  name="country"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-100 outline-none text-sm font-bold text-gray-400 cursor-not-allowed"
                  value={address.country}
                  disabled
                />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
              <i className="fa-solid fa-truck-fast text-blue-500 text-xs text-blue-500"></i>
              <p className="text-[10px] font-black text-blue-500/80 uppercase tracking-widest">Express Delivery to this address</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-premium border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="p-8 relative z-10">
          <h5 className="text-lg font-black text-gray-900 mb-6">
            Order Summary
          </h5>

          {isOrder ? (
            /* Product Summary */
            <div className="space-y-4 mb-6">
              {buyNowInfo ? (
                /* Direct Product Buy Summary */
                directProduct ? (
                  <div className="flex justify-between items-center group bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-orange/20 transition-all">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900 uppercase tracking-tight">{directProduct.name}</span>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity:</span>
                        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1 shadow-sm">
                          <button 
                            onClick={() => handleQuantityChange?.(buyNowInfo.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-orange transition-all active:scale-90 disabled:opacity-30"
                            disabled={buyNowInfo.quantity <= 1}
                          >
                            <i className="fa-solid fa-minus text-[8px]"></i>
                          </button>
                          <span className="w-8 text-center text-xs font-black text-gray-900">{buyNowInfo.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange?.(buyNowInfo.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-orange transition-all active:scale-90"
                          >
                            <i className="fa-solid fa-plus text-[8px]"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-black text-gray-900 italic">₹{(Number(directProduct.sale_price || directProduct.price || 0)) * buyNowInfo.quantity}</span>
                  </div>
                ) : (
                  <div className="flex justify-center py-4">
                    <div className="w-5 h-5 border-2 border-gray-100 border-t-orange rounded-full animate-spin"></div>
                  </div>
                )
              ) : (
                /* Full Cart Summary */
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className="text-sm font-black text-gray-500 group-hover:text-gray-900 transition-colors uppercase tracking-tight">{item.product?.name} <span className="text-orange mx-1 text-xs">x{item.quantity}</span></span>
                    <span className="text-sm font-black text-gray-900 italic">₹{(item.product?.sale_price || item.product?.price || 0) * item.quantity}</span>
                  </div>
                ))
              )}
              <div className="h-px w-full bg-gray-50"></div>
            </div>
          ) : (
            /* Consultation Summary */
            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-orange shadow-sm border border-gray-100 italic font-black text-xl">
                <i className="fa-solid fa-user-astronaut"></i>
              </div>
              <div>
                <h6 className="text-[10px] font-black text-orange uppercase tracking-widest mb-0.5">Expert Consulting</h6>
                <p className="font-black text-gray-900">{expertName}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {!isOrder && (
              <div className="space-y-3 pb-4 border-b border-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Date</span>
                  <span className="text-sm font-black text-gray-900">{date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Time</span>
                  <span className="text-sm font-black text-gray-900">{time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Duration</span>
                  <span className="text-sm font-black text-gray-900">{duration} Mins</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Have a coupon?</label>
              <div className="flex items-stretch gap-2">
                <input
                  type="text"
                  className="flex-grow px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-orange/30 transition-all outline-none text-xs font-black uppercase tracking-widest disabled:opacity-50"
                  placeholder="PROMO CODE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  disabled={!!appliedCoupon || isApplying}
                />
                {appliedCoupon ? (
                  <button
                    className="px-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                    onClick={handleRemoveCoupon}
                    type="button"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                ) : (
                  <button
                    className="px-6 bg-gray-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange transition-all disabled:opacity-50"
                    onClick={handleApplyCoupon}
                    disabled={isApplying || !couponCode}
                    type="button"
                  >
                    {isApplying ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : "Apply"}
                  </button>
                )}
              </div>
              {appliedCoupon && (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg animate-in fade-in slide-in-from-top-1">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Coupon Applied!</span>
                </div>
              )}
            </div>

            {availableCoupons && availableCoupons.length > 0 && !appliedCoupon && (
              <div className="mt-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Available Rewards</p>
                <div className="flex flex-wrap gap-2">
                  {availableCoupons.map((c: any, index: number) => {
                    const coupon = c.coupon || c;
                    if (!coupon || !coupon.code) return null;
                    return (
                      <button
                        key={coupon.id || index}
                        onClick={() => setCouponCode(coupon.code)}
                        className="px-3 py-1.5 bg-orange/10 text-orange border border-orange/20 hover:bg-orange hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all text-left"
                        type="button"
                        title={coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                      >
                        {coupon.code} <span className="opacity-75 lowercase italic text-[9px]">({coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-6">
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-emerald-500 font-black">
                  <span className="text-xs uppercase tracking-widest">Coupon Discount</span>
                  <span className="text-sm italic">-₹{discountAmount}</span>
                </div>
              )}

              <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Grand Total</p>
                  <p className="text-4xl font-black text-gray-900 italic tracking-tighter leading-none">₹{total}</p>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-500 rounded-md mb-1">
                    <i className="fa-solid fa-shield-check text-[10px]"></i>
                    <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                  </div>
                  <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Included all taxes</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-orange/5 rounded-2xl border border-orange/10 flex items-center gap-3">
             <i className="fa-solid fa-circle-info text-orange text-sm shrink-0"></i>
             <p className="text-[10px] font-black text-orange/80 uppercase tracking-widest leading-relaxed">
               {isOrder ? "Order confirmation will be sent to your email." : "Session will start automatically after payment."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
