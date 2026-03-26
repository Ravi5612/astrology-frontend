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
  astrologerName: string;
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
};

const OrderSummary = ({
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
}: Props) => {
  return (
    <div className="col-lg-5 mb-4 d-flex flex-column gap-4">
      {/* Shipping Address - Only for Products */}
      {isOrder && (
        <div className="leftcard border-0 shadow-lg" style={{ borderRadius: "15px" }}>
          <div className="card-body p-4">
            <h5 className="mb-4 fw-bold" style={{ color: "#732882" }}>
              Shipping Address
              {loadingProfile && <span className="spinner-border spinner-border-sm ms-2" role="status"></span>}
            </h5>

            <div className="row g-3">
              <div className="col-12">
                <label className="form-label small fw-bold">Address Line 1*</label>
                <input
                  type="text"
                  name="line1"
                  className="form-control"
                  placeholder="House No., Street Name"
                  value={address.line1}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label small fw-bold">Address Line 2</label>
                <input
                  type="text"
                  name="line2"
                  className="form-control"
                  placeholder="Apartment, Landmark"
                  value={address.line2}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">City*</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={address.city}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">State*</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={address.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">Pincode*</label>
                <input
                  type="text"
                  name="zip_code"
                  className="form-control"
                  value={address.zip_code}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="col-6">
                <label className="form-label small fw-bold">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={address.country}
                  disabled
                />
              </div>
            </div>
            <small className="text-muted mt-3 d-block">
              <i className="fa-solid fa-truck-fast me-1"></i>
              Your order will be delivered to this address.
            </small>
          </div>
        </div>
      )}

      <div
        className="leftcard border-0 shadow-lg"
        style={{ borderRadius: "15px" }}
      >
        <div className="card-body p-4">
          <h5 className="mb-4 fw-bold" style={{ color: "#732882" }}>
            Order Summary
          </h5>

          {isOrder ? (
            /* Product Summary */
            <div className="mb-3">
              {buyNowInfo ? (
                /* Direct Product Buy Summary */
                directProduct ? (
                  <div className="d-flex justify-content-between mb-2 small">
                    <span>{directProduct.name} x {buyNowInfo.quantity}</span>
                    <span className="fw-semibold">₹{(Number(directProduct.sale_price || directProduct.price || 0)) * buyNowInfo.quantity}</span>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <span className="spinner-border spinner-border-sm text-secondary"></span>
                  </div>
                )
              ) : (
                /* Full Cart Summary */
                cartItems.map((item, idx) => (
                  <div key={idx} className="d-flex justify-content-between mb-2 small">
                    <span>{item.product?.name} x {item.quantity}</span>
                    <span className="fw-semibold">₹{(item.product?.sale_price || item.product?.price || 0) * item.quantity}</span>
                  </div>
                ))
              )}
              <hr />
            </div>
          ) : (
            /* Consultation Summary */
            <div className="d-flex align-items-center mb-4">
              <div
                className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "60px",
                  height: "60px",
                  border: "2px solid #daa23e",
                }}
              >
                <i
                  className="fa-solid fa-user-astronaut"
                  style={{ fontSize: "24px", color: "#732882" }}
                ></i>
              </div>
              <div className="ms-3">
                <h6 className="mb-1 fw-bold">{astrologerName}</h6>
                <small className="text-muted">
                  Personal Consultation
                </small>
              </div>
            </div>
          )}

          <ul className="list-group list-group-flush mb-3">
            {!isOrder && (
              <>
                <li className="list-group-item d-flex justify-content-between bg-transparent px-0">
                  <span>Date</span>
                  <span className="fw-semibold">{date}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-transparent px-0">
                  <span>Time</span>
                  <span className="fw-semibold">{time}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-transparent px-0">
                  <span>Duration</span>
                  <span className="fw-semibold">{duration} Mins</span>
                </li>
              </>
            )}
            <li className="list-group-item bg-transparent px-0 py-3">
              <div className="flex flex-col gap-2">
                <label className="small fw-bold text-muted uppercase tracking-wider">Have a coupon?</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Enter Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={!!appliedCoupon || isApplying}
                  />
                  {appliedCoupon ? (
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={handleRemoveCoupon}
                      type="button"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark btn-sm px-3"
                      onClick={handleApplyCoupon}
                      disabled={isApplying || !couponCode}
                      type="button"
                    >
                      {isApplying ? <span className="spinner-border spinner-border-sm"></span> : "Apply"}
                    </button>
                  )}
                </div>
                {appliedCoupon && (
                  <small className="text-success fw-bold animate-pulse">
                    <i className="fa-solid fa-check-circle me-1"></i>
                    Coupon Applied Successfully!
                  </small>
                )}
              </div>
            </li>

            {discountAmount > 0 && (
              <li className="list-group-item d-flex justify-content-between bg-transparent px-0 text-success">
                <span>Coupon Discount</span>
                <span className="fw-semibold">-₹{discountAmount}</span>
              </li>
            )}

            <li
              className="list-group-item d-flex justify-content-between bg-transparent px-0 fw-bold fs-5 pt-3 border-top"
              style={{ color: "#732882" }}
            >
              <span>Total Amount</span>
              <span>₹{total}</span>
            </li>
          </ul>

          <div
            className="alert alert-warning"
            role="alert"
            style={{ fontSize: "0.85rem" }}
          >
            <i className="fa-solid fa-circle-info me-2"></i>
            {isOrder ? "Order confirmation will be sent to your email." : "Session will start automatically after payment."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
