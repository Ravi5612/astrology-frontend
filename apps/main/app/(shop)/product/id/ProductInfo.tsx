"use client";

import React from "react";

interface ProductInfoProps {
  product: {
    title: string;
    avgRating: number;
    totalRatings: number;
    price: number;
    description: string;
    keyPoints: string[];
  };
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) =>
  Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fas fa-star ${i < rating ? "text-warning" : "text-muted"}`}
    ></i>
  ));

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="col-md-6" id="product-info-section">
      <h1 className="fw-bold mb-3" style={{ color: "#732882" }}>
        {product.title}
      </h1>
      <div className="d-flex align-items-center mb-3">
        <span className="me-2 fw-bold" style={{ color: "#d9a03d" }}>
          <StarRating rating={Math.round(product.avgRating)} />
        </span>
        <span className="text-muted">
          ({product.totalRatings.toLocaleString()} ratings)
        </span>
      </div>
      <h2 className="fw-bold my-3" style={{ color: "#d9a03d" }}>
        ₹{product.price}
      </h2>

      <p className="text-secondary">{product.description}</p>

      {/* Key Points */}
      <ul className="mt-4 list-unstyled" style={{ color: "#732882" }}>
        {product.keyPoints.map((point, i) => (
          <li key={i} className="mb-2">
            <i
              className="fas fa-check-circle me-2"
              style={{ color: "#d9a03d" }}
            ></i>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* Coupon */}
      <div
        className="p-3 rounded my-4"
        style={{ background: "#fdf4e5", border: "1px dashed #d9a03d" }}
      >
        <i className="fas fa-tag me-2" style={{ color: "#d9a03d" }}></i>
        Use code <strong>SAVE10</strong> for 10% off!
      </div>

      {/* Quantity & Buttons */}
      <div className="d-flex flex-column gap-3 mb-3">
        <div className="d-flex align-items-center">
          <label className="me-3 fw-bold">Quantity:</label>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="form-control"
            style={{ width: "90px" }}
          />
        </div>
        <button
          className="btn fw-bold py-2"
          style={{ background: "#d9a03d", color: "#fff" }}
        >
          <i className="fas fa-shopping-cart me-2"></i>Add to Cart
        </button>
        <button
          className="btn fw-bold py-2"
          style={{ background: "#732882", color: "#fff" }}
        >
          Buy It Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
