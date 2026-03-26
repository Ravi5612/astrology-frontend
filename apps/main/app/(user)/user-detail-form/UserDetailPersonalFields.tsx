"use client";

import React from "react";
import { UserDetails } from "@/lib/types";

interface UserDetailPersonalFieldsProps {
  formData: UserDetails;
  errors: Partial<Record<keyof UserDetails, string>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const UserDetailPersonalFields: React.FC<UserDetailPersonalFieldsProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <div className="row g-3 g-md-4">
      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Full Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Enter Your Full Name"
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.name ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        />
        {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Gender <span className="text-danger">*</span>
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className={`form-select ${errors.gender ? "is-invalid" : ""}`}
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.gender ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Date of Birth <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
          className={`form-control ${errors.dateOfBirth ? "is-invalid" : ""}`}
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.dateOfBirth ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        />
        {errors.dateOfBirth && <div className="invalid-feedback d-block">{errors.dateOfBirth}</div>}
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Time of Birth <span className="text-danger">*</span>
        </label>
        <input
          type="time"
          name="timeOfBirth"
          value={formData.timeOfBirth}
          onChange={handleChange}
          className={`form-control ${errors.timeOfBirth ? "is-invalid" : ""}`}
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.timeOfBirth ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        />
        {errors.timeOfBirth && <div className="invalid-feedback d-block">{errors.timeOfBirth}</div>}
      </div>

      <div className="col-12">
        <label className="form-label fw-semibold">
          Birth Location <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="birthLocation"
          value={formData.birthLocation}
          onChange={handleChange}
          className={`form-control ${errors.birthLocation ? "is-invalid" : ""}`}
          placeholder="City, State, Country"
          style={{
            borderRadius: "8px",
            padding: "12px 16px",
            border: errors.birthLocation ? "1px solid #dc3545" : "1px solid #daa23e73",
          }}
        />
        {errors.birthLocation && <div className="invalid-feedback d-block">{errors.birthLocation}</div>}
      </div>
    </div>
  );
};

export default UserDetailPersonalFields;
