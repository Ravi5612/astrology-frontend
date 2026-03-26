"use client";

import React from "react";

interface SpecificationItem {
  title: string;
  text: string;
}

interface SpecificationsProps {
  details: SpecificationItem[];
}

const Specifications: React.FC<SpecificationsProps> = ({ details }) => {
  return (
    <section className="mb-5">
      <h3 className="fw-bold mb-4 text-center" style={{ color: "#732882" }}>
        Product Specifications
      </h3>
      <div className="row g-4 justify-content-center">
        {details.map((detail, idx) => (
          <div className="col-md-6 col-lg-3" key={idx}>
            <div
              className="card h-100 border-0 shadow-sm rounded-lg"
              style={{ background: "#f8f8f8" }}
            >
              <div className="card-body">
                <h6 className="fw-bold mb-2" style={{ color: "#732882" }}>
                  {detail.title}
                </h6>
                <p className="text-muted small mb-0">{detail.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Specifications;
