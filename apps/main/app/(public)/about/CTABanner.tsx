"use client";

import React from "react";
import Link from "next/link";

const CTABanner: React.FC = () => {
  return (
    <section
      className="py-5 text-center text-white"
      style={{
        background:
          "linear-gradient(135deg, #1a0a00 0%, #301118 50%, #1a0a00 100%)",
      }}
    >
      <div className="container py-4">
        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
          style={{
            width: 72,
            height: 72,
            background: "rgba(249,115,22,0.15)",
            fontSize: "2rem",
          }}
        >
          🌟
        </div>
        <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
          Start Your Cosmic Journey Today
        </h2>
        <p
          className="mb-4 mx-auto"
          style={{ maxWidth: 500, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}
        >
          Connect with a verified astrologer right now and get personalized
          guidance for life&apos;s most important questions.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            href="/our-astrologers"
            className="btn px-5 py-3 fw-bold rounded-pill"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              border: "none",
              boxShadow: "0 8px 24px rgba(249,115,22,0.4)",
            }}
          >
            <i className="fa-solid fa-star me-2" />
            Talk to an Astrologer
          </Link>
          <Link
            href="/calculator"
            className="btn px-5 py-3 fw-bold rounded-pill"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <i className="fa-solid fa-calculator me-2" />
            Free Calculators
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
