"use client";

import React from "react";

interface ServiceItem {
  icon: string;
  label: string;
  desc: string;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="text-center mb-5">
          <span
            className="text-uppercase fw-bold small"
            style={{ color: "#f97316", letterSpacing: "2px" }}
          >
            What We Offer
          </span>
          <h2
            className="fw-bold mt-2"
            style={{ fontSize: "2rem", color: "#1a0a00" }}
          >
            Our Astrology Services
          </h2>
        </div>
        <div className="row g-3">
          {services.map((svc, i) => (
            <div key={i} className="col-6 col-md-3">
              <div
                className="rounded-3 p-3 text-center border h-100"
                style={{ background: "#fafafa" }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-2"
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(249,115,22,0.1)",
                  }}
                >
                  <i
                    className={`fa-solid ${svc.icon}`}
                    style={{ color: "#f97316" }}
                  />
                </div>
                <h6 className="fw-bold mb-1 small" style={{ color: "#1a0a00" }}>
                  {svc.label}
                </h6>
                <p
                  className="text-muted mb-0"
                  style={{ fontSize: "11px", lineHeight: 1.5 }}
                >
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
