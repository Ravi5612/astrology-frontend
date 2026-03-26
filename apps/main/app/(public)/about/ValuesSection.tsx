"use client";

import React from "react";

interface ValueItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
  bg: string;
}

interface ValuesSectionProps {
  values: ValueItem[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
  return (
    <section className="py-5" style={{ background: "#fafafa" }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span
            className="text-uppercase fw-bold small"
            style={{ color: "#f97316", letterSpacing: "2px" }}
          >
            Our Values
          </span>
          <h2
            className="fw-bold mt-2"
            style={{ fontSize: "2rem", color: "#1a0a00" }}
          >
            What We Stand For
          </h2>
        </div>
        <div className="row g-4">
          {values.map((v, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div
                className="rounded-4 p-4 h-100 border"
                style={{
                  background: "white",
                  borderColor: "rgba(0,0,0,0.06) !important",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: 52, height: 52, background: v.bg }}
                >
                  <i className={`${v.icon} fa-lg`} style={{ color: v.color }} />
                </div>
                <h5 className="fw-bold mb-2" style={{ color: "#1a0a00" }}>
                  {v.title}
                </h5>
                <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
