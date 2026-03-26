"use client";

import React from "react";

interface AddressDto {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  is_primary?: boolean;
}

interface AddressFieldProps {
  address: AddressDto;
  index: number;
  totalAddresses: number;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleRemoveAddress: (index: number) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({
  address,
  index,
  totalAddresses,
  handleAddressChange,
  handleRemoveAddress,
}) => {
  return (
    <div
      className="border rounded p-3 mb-3"
      style={{
        borderColor: "#daa23e",
        borderWidth: "2px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Address {index + 1}</h6>
        {totalAddresses > 1 && (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => handleRemoveAddress(index)}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>

      <div className="row">
        {/* Address Line 1 (REQUIRED) */}
        <div className="col-md-12 mb-3">
          <label className="form-label">
            Address Line 1 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="line1"
            value={address.line1}
            onChange={(e) => handleAddressChange(e, index)}
            required={index === 0}
            placeholder="Street address, house no., etc."
          />
        </div>

        {/* Address Line 2 */}
        <div className="col-md-12 mb-3">
          <label className="form-label">
            Address Line 2 <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="line2"
            value={address.line2 || ""}
            onChange={(e) => handleAddressChange(e, index)}
            placeholder="Apartment, suite, etc."
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            City <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={address.city}
            onChange={(e) => handleAddressChange(e, index)}
            required={index === 0}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            State <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={address.state}
            onChange={(e) => handleAddressChange(e, index)}
            required={index === 0}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Country <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="country"
            value={address.country}
            onChange={(e) => handleAddressChange(e, index)}
            required={index === 0}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">
            Zip Code <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="zip_code"
            value={address.zip_code}
            onChange={(e) => handleAddressChange(e, index)}
            required={index === 0}
          />
        </div>

        <div className="col-md-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="is_primary"
              checked={address.is_primary || false}
              onChange={(e) => handleAddressChange(e, index)}
              id={`is_primary-${index}`}
            />
            <label
              className="form-check-label"
              htmlFor={`is_primary-${index}`}
            >
              Set as Primary Address
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressField;
