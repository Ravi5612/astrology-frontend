"use client";

import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import { aboutTranslations } from "@/lib/translations/about";

const StorySection: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

  const milestones = [
    {
      year: "2022",
      event: t.milestone1,
    },
    {
      year: "2023",
      event: t.milestone2,
    },
    {
      year: "2024",
      event: t.milestone3,
    },
    {
      year: "2025",
      event: t.milestone4,
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <span
              className="text-uppercase fw-bold small"
              style={{ color: "#f97316", letterSpacing: "2px" }}
            >
              {t.storyTag}
            </span>
            <h2
              className="fw-bold mt-2 mb-4"
              style={{ fontSize: "2rem", color: "#1a0a00" }}
            >
              {t.storyTitle}
            </h2>
          </div>
        </div>
        <div className="row align-items-start g-5">
          <div className="col-lg-6">
            <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
              {t.storyDesc1}
            </p>
            <p className="text-muted mb-4" style={{ lineHeight: 1.9 }}>
              {t.storyDesc2}
            </p>
            <p className="text-muted" style={{ lineHeight: 1.9 }}>
              {t.storyDesc3}
            </p>
          </div>
          <div className="col-lg-6">
            <div className="row g-3">
              {milestones.map((item, i) => (
                <div key={i} className="col-12">
                  <div className="d-flex gap-3 align-items-start">
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center fw-black flex-shrink-0"
                      style={{
                        width: 60,
                        height: 44,
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {item.year}
                    </div>
                    <div className="pt-1">
                      <p
                        className="mb-0 text-muted small"
                        style={{ lineHeight: 1.7 }}
                      >
                        {item.event}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
