"use client";

import React from "react";
import { Button } from "@repo/ui";

interface AstroDetailsCardProps {
  lang: string;
  t: any;
  profileData: any;
  editing: boolean;
  saving: boolean;
  setEditing: (val: boolean) => void;
  handleInputChange: (key: string, value: any) => void;
  handleSave: () => void;
}

const AstroDetailsCard: React.FC<AstroDetailsCardProps> = ({
  lang,
  t,
  profileData,
  editing,
  saving,
  setEditing,
  handleInputChange,
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
            style={{ backgroundColor: "#f0f2f5", color: "#333" }}
          >
            <i className="fa-regular fa-calendar"></i>
          </span>
          {t.astroDetails.title}
        </h5>
        {!editing ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setEditing(true)}
            className="bg-purple-500 hover:bg-purple-600 shadow-purple-100"
            style={{
              fontFamily:
                lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
            }}
          >
            <i className="fa-solid fa-moon"></i>
            {t.astroDetails.edit}
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
              {t.astroDetails.cancel}
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
              {t.astroDetails.save}
            </Button>
          </div>
        )}
      </div>
      <div className="card-body p-4">
        <div className="row g-4">
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
              {t.astroDetails.dob}
            </label>
            {editing ? (
              <input
                type="date"
                className="form-control fw-bold"
                value={
                  profileData.date_of_birth
                    ? profileData.date_of_birth.split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  handleInputChange("date_of_birth", e.target.value)
                }
              />
            ) : (
              <p className="fw-bold mb-0 text-dark">
                <i className="fa-regular fa-calendar me-2 text-warning"></i>
                {profileData.date_of_birth
                  ? new Date(profileData.date_of_birth).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : t.astroDetails.notSet}
              </p>
            )}
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
              {t.astroDetails.tob}
            </label>
            {editing ? (
              <input
                type="time"
                className="form-control fw-bold"
                value={profileData.time_of_birth || ""}
                onChange={(e) =>
                  handleInputChange("time_of_birth", e.target.value)
                }
              />
            ) : (
              <p className="fw-bold mb-0 text-dark">
                <i className="fa-regular fa-clock me-2 text-warning"></i>
                {profileData.time_of_birth || t.astroDetails.notSet}
              </p>
            )}
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
              {t.astroDetails.pob}
            </label>
            {editing ? (
              <input
                type="text"
                className="form-control fw-bold"
                value={profileData.place_of_birth || ""}
                onChange={(e) =>
                  handleInputChange("place_of_birth", e.target.value)
                }
                placeholder={t.astroDetails.pobPlaceholder}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            ) : (
              <p
                className="fw-bold mb-0 text-dark"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                <i className="fa-solid fa-location-dot me-2 text-warning"></i>
                {profileData.place_of_birth || t.astroDetails.notSet}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroDetailsCard;
