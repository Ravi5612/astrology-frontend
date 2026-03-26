"use client";

import React from "react";

interface UserDetailBookingFieldsProps {
  bookingDate: string;
  bookingTime: string;
  duration: string;
  errors: Partial<Record<"bookingDate" | "bookingTime", string>>;
  setBookingDate: (date: string) => void;
  setBookingTime: (time: string) => void;
  setDuration: (duration: string) => void;
  clearError: (field: "bookingDate" | "bookingTime") => void;
}

const UserDetailBookingFields: React.FC<UserDetailBookingFieldsProps> = ({
  bookingDate,
  bookingTime,
  duration,
  errors,
  setBookingDate,
  setBookingTime,
  setDuration,
  clearError,
}) => {
  const minsOptions = ["5", "10", "15", "30", "45", "60"];

  return (
    <div className="row g-3 g-md-4 mt-3">
      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Appointment Date <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          className="form-control"
          value={bookingDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => {
            setBookingDate(e.target.value);
            clearError("bookingDate");
          }}
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.bookingDate ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        />
        {errors.bookingDate && <div className="invalid-feedback d-block">{errors.bookingDate}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Appointment Time <span className="text-danger">*</span>
        </label>
        <input
          type="time"
          className="form-control"
          value={bookingTime}
          onChange={(e) => {
            setBookingTime(e.target.value);
            clearError("bookingTime");
          }}
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.bookingTime ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        />
        {errors.bookingTime && <div className="invalid-feedback d-block">{errors.bookingTime}</div>}
      </div>

      <div className="col-12">
        <label className="form-label fw-semibold">Duration (Minutes)</label>
        <div className="d-flex flex-wrap gap-2">
          {minsOptions.map((mins) => (
            <button
              key={mins}
              type="button"
              className={`btn ${duration === mins ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setDuration(mins)}
              style={{
                backgroundColor: duration === mins ? "#732882" : "transparent",
                borderColor: "#732882",
                color: duration === mins ? "#fff" : "#732882",
                minWidth: "80px",
              }}
            >
              {mins} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailBookingFields;
