"use client";

import React from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import { aboutTranslations } from "@/lib/translations/about";

const HeroSection: React.FC = () => {
  const { lang } = useLanguageStore();
  const t = aboutTranslations[lang as keyof typeof aboutTranslations] || aboutTranslations.en;

  return (
    <section
      className="position-relative overflow-hidden py-5"
      style={{
        background:
          "linear-gradient(135deg, #1a0a00 0%, #301118 50%, #1a0a00 100%)",
        minHeight: "420px",
      }}
    >
      <div
        className="position-absolute rounded-circle"
        style={{
          width: 400,
          height: 400,
          background: "rgba(249,115,22,0.07)",
          top: -100,
          right: -80,
          pointerEvents: "none",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          width: 250,
          height: 250,
          background: "rgba(249,115,22,0.05)",
          bottom: -60,
          left: -60,
          pointerEvents: "none",
        }}
      />

      <div className="container position-relative py-5 text-center text-white">
        <span
          className="badge px-4 py-2 rounded-pill mb-4 d-inline-block fw-semibold"
          style={{
            background: "rgba(249,115,22,0.2)",
            color: "#fb923c",
            border: "1px solid rgba(249,115,22,0.3)",
            fontSize: "13px",
          }}
        >
          <i className="fa-solid fa-om me-2" />
          {t.badgeText}
        </span>
        <h1
          className="display-4 fw-bold mb-4"
          style={{ letterSpacing: "-0.5px" }}
        >
          {t.titleStart} <span style={{ color: "#fb923c" }}>{t.titleHighlight}</span>
        </h1>
        <p
          className="mx-auto mb-5 text-white/80"
          style={{ maxWidth: 640, fontSize: "1.1rem", lineHeight: 1.8 }}
        >
          {t.heroDesc}
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            href="/our-experts"
            className="btn px-5 py-3 fw-bold rounded-pill"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              border: "none",
              boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
            }}
          >
            <i className="fa-solid fa-user-astronaut me-2" />
            {t.btnConsult}
          </Link>
          <Link
            href="/contact"
            className="btn px-5 py-3 fw-bold rounded-pill"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <i className="fa-solid fa-envelope me-2" />
            {t.btnContact}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
