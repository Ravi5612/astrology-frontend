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
    <div className="bg-white border-0 shadow-premium rounded-2xl mb-6 overflow-hidden">
      <div className="px-6 py-5 bg-white border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h5
          className="text-lg font-bold text-gray-900 mb-0 flex items-center"
          style={{
            fontFamily:
              lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
          }}
        >
          <span className="w-10 h-10 rounded-full bg-orange/10 text-orange flex items-center justify-center mr-3 flex-shrink-0">
            <i className="fa-regular fa-id-card"></i>
          </span>
          {t.personalDetails.title}
        </h5>
        {!editing ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setEditing(true)}
            className="shadow-gold px-6"
            style={{
              fontFamily:
                lang === "hi" ? "'Noto Sans Devanagari', sans-serif" : "inherit",
            }}
          >
            <i className="fa-solid fa-pen-to-square mr-2"></i>
            {t.personalDetails.edit}
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setEditing(false)}
              className="px-6"
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
              className="px-6 shadow-md"
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
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={{
                fontFamily:
                  lang === "hi"
                    ? "'Noto Sans Devanagari', sans-serif"
                    : "inherit",
              }}
            >
              {t.personalDetails.userId}
            </label>
            <div className="flex items-center gap-3">
              <span
                className="font-bold px-4 py-1.5 rounded-full text-xs"
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
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
                    copied
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"
                  } border`}
                  onClick={handleCopy}
                >
                  <i
                    className={`fa-${copied ? "solid fa-check" : "regular fa-copy"}`}
                  ></i>
                  {copied && (
                    <span
                      style={{
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

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.full_name || ""}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
              />
            ) : (
              <p
                className="font-bold text-gray-900 m-0"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                {profileData.full_name || clientUser?.name || t.personalDetails.notSet}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {t.personalDetails.userName}
            </label>
            {editing ? (
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.username || ""}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
            ) : (
              <p
                className="font-bold text-gray-900 m-0"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                {profileData.username || t.personalDetails.notSet}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {t.personalDetails.email}
            </label>
            <p
              className="font-bold text-gray-900 m-0"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {clientUser?.email || t.personalDetails.notSet}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <label
                className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 m-0"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                {t.personalDetails.phone}
              </label>
              {profileData.phone &&
                (profileData.phone_verified_at ? (
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-600 text-[9px] font-bold"
                    style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                  >
                    <i className="fa-solid fa-circle-check"></i> {t.personalDetails.verified}
                  </span>
                ) : (
                  <span
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-600 text-[9px] font-bold"
                    style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                  >
                    <i className="fa-solid fa-circle-xmark"></i> {t.personalDetails.unverified}
                  </span>
                ))}
            </div>
            {editing ? (
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              <div className="flex items-center gap-3">
                <p className="font-bold text-gray-900 m-0">
                  {profileData.phone || t.personalDetails.notSet}
                </p>
                {profileData.phone && !profileData.phone_verified_at && (
                  <button
                    type="button"
                    onClick={() => setShowPhoneVerify(true)}
                    className="px-3 py-1 bg-orange text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-orange/90 transition-all border-0"
                    style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
                  >
                    {t.personalDetails.verifyNow}
                  </button>
                )}
              </div>
            )}
          </div>
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {t.personalDetails.gender}
            </label>
            {editing ? (
              <select
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.gender || ""}
                onChange={(e) => handleInputChange("gender", e.target.value as any)}
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                <option value="male">{t.personalDetails.genders.male}</option>
                <option value="female">{t.personalDetails.genders.female}</option>
                <option value="other">{t.personalDetails.genders.other}</option>
              </select>
            ) : (
              <p
                className="font-bold text-gray-900 m-0 capitalize"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                {profileData.gender
                  ? t.personalDetails.genders[
                      profileData.gender as keyof typeof t.personalDetails.genders
                    ]
                  : t.personalDetails.notSet}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {t.personalDetails.maritalStatus}
            </label>
            {editing ? (
              <select
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.marital_status || ""}
                onChange={(e) => handleInputChange("marital_status", e.target.value)}
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                <option value="">{t.personalDetails.maritalStatuses.select}</option>
                <option value="single">{t.personalDetails.maritalStatuses.single}</option>
                <option value="married">{t.personalDetails.maritalStatuses.married}</option>
                <option value="divorced">{t.personalDetails.maritalStatuses.divorced}</option>
                <option value="widowed">{t.personalDetails.maritalStatuses.widowed}</option>
                <option value="other">{t.personalDetails.maritalStatuses.other}</option>
              </select>
            ) : (
              <p
                className="font-bold text-gray-900 m-0 capitalize"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                {profileData.marital_status
                  ? t.personalDetails.maritalStatuses[
                      profileData.marital_status as keyof typeof t.personalDetails.maritalStatuses
                    ]
                  : t.personalDetails.notSet}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {t.personalDetails.occupation}
            </label>
            {editing ? (
              <input
                type="text"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.occupation || ""}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
                placeholder={t.personalDetails.occupationPlaceholder}
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              />
            ) : (
              <p
                className="font-bold text-gray-900 m-0"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              >
                {profileData.occupation || t.personalDetails.notSet}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
              style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
            >
              {t.personalDetails.aboutMe}
            </label>
            {editing ? (
              <textarea
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all resize-none"
                rows={3}
                value={profileData.about_me || ""}
                onChange={(e) => handleInputChange("about_me", e.target.value)}
                placeholder={t.personalDetails.aboutMePlaceholder}
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
              />
            ) : (
              <p
                className="font-medium text-gray-600 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200 m-0 leading-relaxed italic"
                style={lang === "hi" ? { fontFamily: "'Noto Sans Devanagari', sans-serif" } : {}}
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
