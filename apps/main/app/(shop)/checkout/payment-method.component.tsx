"use client";

import React from "react";
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
    <div className="col-lg-7">
      <div
        className="leftcard border-0 shadow-lg h-100"
        style={{ borderRadius: "15px" }}
      >
        <div className="card-body p-4 p-md-5">
          <h5 className="mb-4 fw-bold" style={{ color: "#732882" }}>
            Select Payment Method
          </h5>

          <div className="payment-options d-flex flex-column gap-3">
            {/* Wallet */}
            <label
              className={`payment-option p-3 rounded border d-flex align-items-center cursor-pointer ${paymentMethod === "wallet" ? "border-primary bg-light" : ""} ${clientBalance < total ? "opacity-50 grayscale" : ""}`}
              style={{
                borderColor: paymentMethod === "wallet" ? "#732882" : "#dee2e6",
                cursor: clientBalance < total ? "not-allowed" : "pointer",
              }}
            >
              <input
                type="radio"
                name="payment"
                className="form-check-input me-3"
                checked={paymentMethod === "wallet"}
                onChange={() => setPaymentMethod("wallet")}
                disabled={clientBalance < total}
                style={{ accentColor: "#732882" }}
              />
              <div className="d-flex align-items-center grow">
                <span className="me-2">
                  <i className="fa-solid fa-wallet text-orange-500"></i>
                </span>
                <div className="flex flex-col">
                  <span className="fw-semibold">Wallet Payment</span>
                  <small className={clientBalance < total ? "text-danger" : "text-success"}>
                    Available Balance: ₹{clientBalance?.toLocaleString() || '0'}
                    {clientBalance < total && " (Insufficient)"}
                  </small>
                </div>
              </div>
              <LucideIcons.Wallet className="w-6 h-6 text-gray-400" />
            </label>

            {/* UPI */}
            <label
              className={`payment-option p-3 rounded border d-flex align-items-center cursor-pointer ${paymentMethod === "upi" ? "border-primary bg-light" : ""}`}
              style={{
                borderColor:
                  paymentMethod === "upi" ? "#732882" : "#dee2e6",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="payment"
                className="form-check-input me-3"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
                style={{ accentColor: "#732882" }}
              />
              <div className="d-flex align-items-center grow">
                <span className="me-2">
                  <i className="fa-solid fa-mobile-screen-button text-success"></i>
                </span>
                <span className="fw-semibold">UPI / QR Code</span>
              </div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/10109/10109919.png"
                alt="upi"
                width="30"
              />
            </label>

            {/* Card */}
            <label
              className={`payment-option p-3 rounded border d-flex align-items-center cursor-pointer ${paymentMethod === "card" ? "border-primary bg-light" : ""}`}
              style={{
                borderColor:
                  paymentMethod === "card" ? "#732882" : "#dee2e6",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="payment"
                className="form-check-input me-3"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                style={{ accentColor: "#732882" }}
              />
              <div className="d-flex align-items-center grow">
                <span className="me-2">
                  <i className="fa-solid fa-credit-card text-primary"></i>
                </span>
                <span className="fw-semibold">Credit / Debit Card</span>
              </div>
              <div className="d-flex gap-2">
                <i className="fa-brands fa-cc-visa fa-lg"></i>
                <i className="fa-brands fa-cc-mastercard fa-lg"></i>
              </div>
            </label>

            {/* Net Banking */}
            <label
              className={`payment-option p-3 rounded border d-flex align-items-center cursor-pointer ${paymentMethod === "netbanking" ? "border-primary bg-light" : ""}`}
              style={{
                borderColor:
                  paymentMethod === "netbanking"
                    ? "#732882"
                    : "#dee2e6",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="payment"
                className="form-check-input me-3"
                checked={paymentMethod === "netbanking"}
                onChange={() => setPaymentMethod("netbanking")}
                style={{ accentColor: "#732882" }}
              />
              <div className="d-flex align-items-center grow">
                <span className="me-2">
                  <i className="fa-solid fa-building-columns text-secondary"></i>
                </span>
                <span className="fw-semibold">Net Banking</span>
              </div>
            </label>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn w-100 mt-5 text-white fw-bold py-3"
            style={{
              background: "linear-gradient(45deg, #732882, #8a3399)",
              borderRadius: "50px",
              boxShadow: "0 4px 15px rgba(115, 40, 130, 0.3)",
              opacity: isProcessing ? 0.7 : 1
            }}
          >
            {isProcessing ? (
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            ) : null}
            {isOrder ? `Pay ₹${total} & Place Order` : `Pay ₹${total} & Start Session`}
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="fa-solid fa-lock me-1"></i> 100% Safe &
              Secure Payment
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
