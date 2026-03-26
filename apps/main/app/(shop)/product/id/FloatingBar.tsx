"use client";

import React from "react";

interface FloatingBarProps {
  isSticky: boolean;
  title: string;
  price: number;
}

const FloatingBar: React.FC<FloatingBarProps> = ({ isSticky, title, price }) => {
  return (
    <div
      className="d-none d-md-block"
      style={{
        position: "fixed",
        bottom: isSticky ? "0" : "-150px",
        left: 0,
        width: "100%",
        background: "rgba(252, 252, 251, 0.95)",
        borderTop: "1px solid #eee",
        padding: "1rem",
        boxShadow: "0 -4px 15px rgba(0,0,0,0.1)",
        zIndex: 1000,
        transition: "bottom 0.4s ease-in-out",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h5 className="mb-0 fw-bold me-3 text-dark">{title}</h5>
          <h5 className="mb-0 fw-bold" style={{ color: "#d9a03d" }}>
            ₹{price}
          </h5>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-lg fw-bold px-4"
            style={{ background: "#d9a03d", color: "#fff" }}
          >
            <i className="fas fa-shopping-cart me-2"></i>Add to Cart
          </button>
          <button
            className="btn btn-lg fw-bold px-4"
            style={{ background: "#732882", color: "#fff" }}
          >
            Buy It Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingBar;
