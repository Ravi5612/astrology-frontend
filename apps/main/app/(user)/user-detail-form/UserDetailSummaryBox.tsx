"use client";

import React from "react";

interface UserDetailSummaryBoxProps {
  rate: string;
  duration: string;
  totalAmount: number;
}

const UserDetailSummaryBox: React.FC<UserDetailSummaryBoxProps> = ({
  rate,
  duration,
  totalAmount,
}) => {
  return (
    <div className="col-12 mt-4">
      <div
        className="p-3"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "1px dashed #732882",
        }}
      >
        <div className="d-flex justify-content-between mb-2">
          <span>Rate:</span>
          <strong>₹{rate}/min</strong>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Duration:</span>
          <strong>{duration} mins</strong>
        </div>
        <hr />
        <div className="d-flex justify-content-between text-success">
          <span className="fw-bold">Total Payable:</span>
          <span className="fw-bold fs-5">₹{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetailSummaryBox;
