"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui";

interface PersonalDetailsCardProps {
  lang: string;
  t: any;
  profileData: any;
  clientUser: any;
  editing: boolean;
  saving: boolean;
  setEditing: (val: boolean) => void;
  handleInputChange: (key: string, value: any) => void;
  handleSave: () => void;
  setShowPhoneVerify: (val: boolean) => void;
}

const PersonalDetailsCard: React.FC<PersonalDetailsCardProps> = ({
  lang,
  t,
  profileData,
  clientUser,
  editing,
  saving,
  setEditing,
  handleInputChange,
  handleSave,
  setShowPhoneVerify,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (clientUser?.uid) {
      navigator.clipboard.writeText(clientUser.uid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
            style={{
              backgroundColor: "rgba(242, 94, 10, 0.1)",
              color: "var(--primary)",
            }}
          >
            <i className="fa-regular fa-id-card"></i>
          </span>
          {t.personalDetails.title}
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
            <i className="fa-solid fa-pen-to-square"></i>
            {t.personalDetails.edit}
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
              {t.personalDetails.cancel}
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
              {t.personalDetails.save}
            </Button>
          </div>
        )}
      </div>
      <div className="card-body p-4">
        <div className="row g-4">
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
              {t.personalDetails.userId}
            </label>
            <div className="d-flex align-items-center gap-2">
              <span
                className="fw-bold mb-0 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: "rgba(255,107,0,0.1)",
                  color: "#FF6B00",
                  letterSpacing: "0.05em",
                  fontFamily: "monospace",
                }}
              >
                {clientUser?.uid || t.personalDetails.notAssigned}
              </span>
              {clientUser?.uid && (
                <button
                  type="button"
                  title={
                    copied ? t.personalDetails.copied : t.personalDetails.copyId
                  }
                  className={`btn btn-sm px-2 py-1 ${copied ? "btn-success" : "btn-outline-secondary"}`}
                  style={{ fontSize: "11px", transition: "all 0.2s" }}
                  onClick={handleCopy}
                >
                  <i
                    className={`fa-${copied ? "solid fa-check" : "regular fa-copy"}`}
                  ></i>
                  {copied && (
                    <span
                      className="ms-1"
                      style={{
                        fontSize: "10px",
                        fontFamily:
                          lang === "hi"
                            ? "'Noto Sans Devanagari', sans-serif"
                            : "inherit",
                      }}
                    >
                      {t.personalDetails.copied}
                    </span>
                  )}
                </button>
              )}
            </div>
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
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                className="form-control fw-bold"
                value={profileData.full_name || ""}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
              />
            ) : (
              <p
                className="fw-bold mb-0"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {profileData.full_name ||
                  clientUser?.name ||
                  t.personalDetails.notSet}
              </p>
            )}
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
              {t.personalDetails.userName}
            </label>
            {editing ? (
              <input
                type="text"
                className="form-control fw-bold"
                value={profileData.username || ""}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            ) : (
              <p
                className="fw-bold mb-0"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {profileData.username || t.personalDetails.notSet}
              </p>
            )}
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
              {t.personalDetails.email}
            </label>
            <p
              className="fw-bold mb-0"
              style={{
                fontFamily:
                  lang === "hi"
                    ? "'Noto Sans Devanagari', sans-serif"
                    : "inherit",
              }}
            >
              {clientUser?.email || t.personalDetails.notSet}
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center gap-2 mb-1">
              <label
                className="text-muted small fw-bold text-uppercase mb-0"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {t.personalDetails.phone}
              </label>
              {profileData.phone &&
                (profileData.phone_verified_at ? (
                  <span
                    className="badge px-2 py-1 d-inline-flex align-items-center gap-1"
                    style={{
                      backgroundColor: "rgba(25,135,84,0.1)",
                      color: "#198754",
                      fontSize: "10px",
                      fontFamily:
                        lang === "hi"
                          ? "'Noto Sans Devanagari', sans-serif"
                          : "inherit",
                    }}
                  >
                    <i className="fa-solid fa-circle-check"></i>{" "}
                    {t.personalDetails.verified}
                  </span>
                ) : (
                  <span
                    className="badge px-2 py-1 d-inline-flex align-items-center gap-1"
                    style={{
                      backgroundColor: "rgba(220,53,69,0.1)",
                      color: "#dc3545",
                      fontSize: "10px",
                      fontFamily:
                        lang === "hi"
                          ? "'Noto Sans Devanagari', sans-serif"
                          : "inherit",
                    }}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>{" "}
                    {t.personalDetails.unverified}
                  </span>
                ))}
            </div>
            {editing ? (
              <input
                type="text"
                className="form-control fw-bold"
                value={profileData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              <div className="d-flex align-items-center gap-2">
                <p className="fw-bold mb-0">
                  {profileData.phone || t.personalDetails.notSet}
                </p>
                {profileData.phone && !profileData.phone_verified_at && (
                  <button
                    type="button"
                    onClick={() => setShowPhoneVerify(true)}
                    className="btn btn-sm px-3 py-1 lh-1 text-white fw-bold"
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#fd6410",
                      borderColor: "#fd6410",
                      fontFamily:
                        lang === "hi"
                          ? "'Noto Sans Devanagari', sans-serif"
                          : "inherit",
                    }}
                  >
                    {t.personalDetails.verifyNow}
                  </button>
                )}
              </div>
            )}
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
              {t.personalDetails.gender}
            </label>
            {editing ? (
              <select
                className="form-select fw-bold"
                value={profileData.gender || ""}
                onChange={(e) =>
                  handleInputChange("gender", e.target.value as any)
                }
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                <option value="male">{t.personalDetails.genders.male}</option>
                <option value="female">
                  {t.personalDetails.genders.female}
                </option>
                <option value="other">{t.personalDetails.genders.other}</option>
              </select>
            ) : (
              <p
                className="fw-bold mb-0 text-capitalize"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {profileData.gender
                  ? t.personalDetails.genders[
                      profileData.gender as keyof typeof t.personalDetails.genders
                    ]
                  : t.personalDetails.notSet}
              </p>
            )}
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
              {t.personalDetails.maritalStatus}
            </label>
            {editing ? (
              <select
                className="form-select fw-bold"
                value={profileData.marital_status || ""}
                onChange={(e) =>
                  handleInputChange("marital_status", e.target.value)
                }
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                <option value="">
                  {t.personalDetails.maritalStatuses.select}
                </option>
                <option value="single">
                  {t.personalDetails.maritalStatuses.single}
                </option>
                <option value="married">
                  {t.personalDetails.maritalStatuses.married}
                </option>
                <option value="divorced">
                  {t.personalDetails.maritalStatuses.divorced}
                </option>
                <option value="widowed">
                  {t.personalDetails.maritalStatuses.widowed}
                </option>
                <option value="other">
                  {t.personalDetails.maritalStatuses.other}
                </option>
              </select>
            ) : (
              <p
                className="fw-bold mb-0 text-capitalize"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {profileData.marital_status
                  ? t.personalDetails.maritalStatuses[
                      profileData.marital_status as keyof typeof t.personalDetails.maritalStatuses
                    ]
                  : t.personalDetails.notSet}
              </p>
            )}
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
              {t.personalDetails.occupation}
            </label>
            {editing ? (
              <input
                type="text"
                className="form-control fw-bold"
                value={profileData.occupation || ""}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                placeholder={t.personalDetails.occupationPlaceholder}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            ) : (
              <p
                className="fw-bold mb-0"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {profileData.occupation || t.personalDetails.notSet}
              </p>
            )}
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
              {t.personalDetails.aboutMe}
            </label>
            {editing ? (
              <textarea
                className="form-control fw-bold"
                rows={3}
                value={profileData.about_me || ""}
                onChange={(e) => handleInputChange("about_me", e.target.value)}
                placeholder={t.personalDetails.aboutMePlaceholder}
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              />
            ) : (
              <p
                className="fw-medium mb-0 text-gray-600 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                {profileData.about_me || t.personalDetails.aboutMeFallback}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsCard;
