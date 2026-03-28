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
            <i className="fa-regular fa-calendar"></i>
          </span>
          {t.astroDetails.title}
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
            <i className="fa-solid fa-moon mr-2 text-sm"></i>
            {t.astroDetails.edit}
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
              {t.astroDetails.cancel}
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
              {t.astroDetails.save}
            </Button>
          </div>
        )}
      </div>
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
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
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
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
              <p className="flex items-center font-bold text-gray-900 m-0">
                <i className="fa-regular fa-calendar mr-2.5 text-orange/70"></i>
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
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
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
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
                value={profileData.time_of_birth || ""}
                onChange={(e) =>
                  handleInputChange("time_of_birth", e.target.value)
                }
              />
            ) : (
              <p className="flex items-center font-bold text-gray-900 m-0">
                <i className="fa-regular fa-clock mr-2.5 text-orange/70"></i>
                {profileData.time_of_birth || t.astroDetails.notSet}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1.5"
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
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 focus:ring-2 focus:ring-orange/20 focus:border-orange outline-none transition-all"
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
                className="flex items-center font-bold text-gray-900 m-0"
                style={{
                  fontFamily:
                    lang === "hi"
                      ? "'Noto Sans Devanagari', sans-serif"
                      : "inherit",
                }}
              >
                <i className="fa-solid fa-location-dot mr-2.5 text-orange/70"></i>
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
