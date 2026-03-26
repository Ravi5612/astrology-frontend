"use client";

import React from "react";

const Features: React.FC = () => {
  const features = [
    {
      icon: "fas fa-gem",
      title: "Authentic Crystals",
      text: "100% natural & certified products.",
    },
    {
      icon: "fas fa-shipping-fast",
      title: "Fast Delivery",
      text: "Safe and quick shipping across India.",
    },
    {
      icon: "fas fa-headset",
      title: "Dedicated Support",
      text: "Always here to help you with queries.",
    },
  ];

  return (
    <section className="mt-5 text-center">
      <h3 className="fw-bold mb-4" style={{ color: "#732882" }}>
        Why Choose Us
      </h3>
      <div className="row g-4 mt-3">
        {features.map((item, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <i
                  className={`${item.icon} fa-2x mb-3`}
                  style={{ color: "#d9a03d" }}
                ></i>
                <h6 className="fw-bold" style={{ color: "#732882" }}>
                  {item.title}
                </h6>
                <p className="text-muted small">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
