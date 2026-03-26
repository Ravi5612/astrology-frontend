"use client";

import React from "react";
import { purpose } from "@/components/features/services/homePagaData";

const ShopByPurpose: React.FC = () => {
  return (
    <section className="mb-5">
      <h3 className="fw-bold mb-4" style={{ color: "#732882" }}>
        Shop By Purpose
      </h3>
      <div className="product-slider-container">
        <div className="row">
          {purpose.map((item) => (
            <div key={item.id} className="col-lg-2 col-md-4 col-sm-6">
              <div className="vert-move">
                <img
                  src={item.image}
                  alt="Image Not Found"
                  className="services-img w-100 mb-3"
                  style={{ height: "160px", objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByPurpose;
