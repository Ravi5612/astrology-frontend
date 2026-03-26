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
    astrologerName,
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
    paymentMethod,
    setPaymentMethod,
    clientBalance,
    handlePayment,
    isProcessing,
  } = useCheckout();

  return (
    <>
      <section className="banner-part">
        <div className="overlay-hero">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 text-center">
                <h1 className="mb-3">
                  Secure <span style={{ color: "#daa23e" }}>Checkout</span>
                </h1>
                <p className="text-white" style={{ fontSize: "18px" }}>
                  Complete your payment to start the session
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" style={{ background: "#ffe3b852" }}>
        <div className="container">
          <div className="row justify-content-center">
            <OrderSummary
              isOrder={isOrder}
              loadingProfile={loadingProfile}
              address={address}
              handleAddressChange={handleAddressChange}
              buyNowInfo={buyNowInfo}
              directProduct={directProduct}
              cartItems={cartItems}
              astrologerName={astrologerName}
              date={date}
              time={time}
              duration={duration}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              appliedCoupon={appliedCoupon}
              isApplying={isApplying}
              handleApplyCoupon={handleApplyCoupon}
              handleRemoveCoupon={handleRemoveCoupon}
              discountAmount={discountAmount}
              total={total}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              clientBalance={clientBalance}
              total={total}
              handlePayment={handlePayment}
              isProcessing={isProcessing}
              isOrder={isOrder}
            />
          </div>
        </div>
      </section>
    </>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense
      fallback={
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
