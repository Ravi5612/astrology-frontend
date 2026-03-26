"use client";

import React from "react";
import AddressField from "./AddressField";
import { useCompleteProfile } from "./useCompleteProfile";

interface CompleteProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
}

const CompleteProfileModal: React.FC<CompleteProfileModalProps> = ({
  isOpen,
  onClose,
  onSkip,
}) => {
  const {
    formData,
    isLoading,
    error,
    successMessage,
    handleInputChange,
    handleAddressChange,
    handleAddAddress,
    handleRemoveAddress,
    handleSubmit,
    handleReset,
  } = useCompleteProfile(onClose);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ display: "block", zIndex: 1040 }}
      ></div>

      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1050 }}
        tabIndex={-1}
        aria-labelledby="completeProfileModalLabel"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          style={{ maxWidth: "800px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="completeProfileModalLabel">
                <i
                  className="fa-solid fa-user-edit me-2"
                  style={{ color: "#daa23e" }}
                ></i>
                Complete Your Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div
              className="modal-body"
              style={{ maxHeight: "70vh", overflowY: "auto" }}
            >
              <form onSubmit={handleSubmit} id="profile-form">
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Date of Birth <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_of_birth"
                    value={formData.date_of_birth || ""}
                    onChange={handleInputChange}
                    style={{ borderColor: "#daa23e", borderWidth: "2px" }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    style={{ borderColor: "#daa23e", borderWidth: "2px" }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Preferences <span className="text-muted">(Optional)</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="preferences"
                    rows={3}
                    value={formData.preferences || ""}
                    onChange={handleInputChange}
                    placeholder="Enter your astrology preferences..."
                    style={{ borderColor: "#daa23e", borderWidth: "2px" }}
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <label className="form-label fw-bold mb-0">
                      Address <span className="text-muted">(Optional)</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={handleAddAddress}
                      style={{
                        background: "linear-gradient(45deg, #daa23e, #e0a800)",
                        color: "white",
                        border: "none",
                      }}
                    >
                      <i className="fa-solid fa-plus me-1"></i> Add Address
                    </button>
                  </div>

                  {formData.addresses?.map((address, index) => (
                    <AddressField
                      key={index}
                      address={address}
                      index={index}
                      totalAddresses={formData.addresses?.length || 0}
                      handleAddressChange={handleAddressChange}
                      handleRemoveAddress={handleRemoveAddress}
                    />
                  ))}
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    <i className="fa-solid fa-check-circle me-2"></i>
                    {successMessage}
                  </div>
                )}
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleReset}
                disabled={isLoading}
              >
                <i className="fa-solid fa-rotate-left me-2"></i> Reset
              </button>
              <button
                type="button"
                className="btn"
                onClick={onSkip}
                disabled={isLoading}
                style={{ backgroundColor: "#f0f0f0", color: "#333", border: "none" }}
              >
                Skip
              </button>
              <button
                type="submit"
                form="profile-form"
                className="btn"
                disabled={isLoading}
                style={{
                  background: "linear-gradient(45deg, #daa23e, #e0a800)",
                  color: "white",
                  border: "none",
                }}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-save me-2"></i> Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfileModal;
