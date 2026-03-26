"use client";

import React from "react";
import { Button } from "@repo/ui";

interface AddressDetailsCardProps {
  lang: string;
  t: any;
  profileData: any;
  editing: boolean;
  saving: boolean;
  setEditing: (val: boolean) => void;
  handleAddressChange: (index: number, key: string, value: string) => void;
  handleSave: () => void;
}

const AddressDetailsCard: React.FC<AddressDetailsCardProps> = ({
  lang,
  t,
  profileData,
  editing,
  saving,
  setEditing,
  handleAddressChange,
  handleSave,
}) => {
  return (
    <div className="card border-0 shadow-sm rounded-4 mb-4">
      <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
        <h5
          className="fw-bold mb-0"
          style={{
            fontFamily:
              lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
          }}
        >
          <span
            className="me-2 p-2 rounded-circle"
            style={{ backgroundColor: "#e2f8ff", color: "#00b4d8" }}
          >
            <i className="fa-solid fa-location-dot"></i>
          </span>
          {t.addressDetails.title}
        </h5>
        {!editing ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setEditing(true)}
            className="shadow-orange-200"
            style={{
              fontFamily:
                lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
            }}
          >
            <i className="fa-solid fa-location-dot"></i>
            {t.addressDetails.edit}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setEditing(false)}
              style={{
                fontFamily:
                  lang === "hi"
                    ? "'Noto Sans Devanagari', sans-serif"
                    : "inherit",
              }}
            >
              {t.addressDetails.cancel}
            </Button>
            <Button
              variant="success"
              size="md"
              loading={saving}
              onClick={handleSave}
              className="shadow-green-200"
              style={{
                fontFamily:
                  lang === "hi"
                    ? "'Noto Sans Devanagari', sans-serif"
                    : "inherit",
              }}
            >
              {t.addressDetails.save}
            </Button>
          </div>
        )}
      </div>
      <div className="card-body p-4">
        {editing ? (
          <div className="row g-3">
            <div className="col-md-12">
              <label
                className="text-muted small fw-bold text-uppercase mb-1"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.line1}
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.addresses?.[0]?.line1 || ""}
                onChange={(e) => handleAddressChange(0, "line1", e.target.value)}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            </div>
            <div className="col-md-12">
              <label
                className="text-muted small fw-bold text-uppercase mb-1"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.line2}
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.addresses?.[0]?.line2 || ""}
                onChange={(e) => handleAddressChange(0, "line2", e.target.value)}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            </div>
            <div className="col-md-6">
              <label
                className="text-muted small fw-bold text-uppercase mb-1"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.city}
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.addresses?.[0]?.city || ""}
                onChange={(e) => handleAddressChange(0, "city", e.target.value)}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            </div>
            <div className="col-md-6">
              <label
                className="text-muted small fw-bold text-uppercase mb-1"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.state}
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.addresses?.[0]?.state || ""}
                onChange={(e) => handleAddressChange(0, "state", e.target.value)}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            </div>
            <div className="col-md-4">
              <label
                className="text-muted small fw-bold text-uppercase mb-1"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.country}
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.addresses?.[0]?.country || ""}
                onChange={(e) =>
                  handleAddressChange(0, "country", e.target.value)
                }
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            </div>
            <div className="col-md-4">
              <label
                className="text-muted small fw-bold text-uppercase mb-1"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.zipCode}
              </label>
              <input
                type="text"
                className="form-control"
                value={profileData.addresses?.[0]?.zip_code || ""}
                onChange={(e) =>
                  handleAddressChange(0, "zip_code", e.target.value)
                }
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            {profileData.addresses && profileData.addresses.length > 0 ? (
              <div className="d-flex align-items-start gap-3">
                <i className="fa-solid fa-map-location-dot text-muted mt-1"></i>
                <div>
                  <p className="fw-bold mb-0">
                    {profileData.addresses[0]?.line1}
                  </p>
                  {profileData.addresses[0]?.line2 && (
                    <p className="text-muted mb-0">
                      {profileData.addresses[0]?.line2}
                    </p>
                  )}
                  <p
                    className="text-muted mb-0"
                    style={{
                      fontFamily:
                        lang === "hi"
                          ? "'Noto Sans Devanagari', sans-serif"
                          : "inherit",
                    }}
                  >
                    {profileData.addresses[0]?.city},{" "}
                    {profileData.addresses[0]?.state},{" "}
                    {profileData.addresses[0]?.country} -{" "}
                    {profileData.addresses[0]?.zip_code}
                  </p>
                </div>
              </div>
            ) : (
              <p
                className="text-muted italic mb-0"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.addressDetails.noAddress}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressDetailsCard;
