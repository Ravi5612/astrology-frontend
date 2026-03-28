"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TeamMember, ExpertSectionProps } from "@/lib/types";

const ExpertSection: React.FC<ExpertSectionProps> = ({ team }) => {
  return (
    <section className="py-5" style={{ background: "#fafafa" }}>
      <div className="container py-4">
        <div className="text-center mb-5">
          <span
            className="text-uppercase fw-bold small"
            style={{ color: "#f97316", letterSpacing: "2px" }}
          >
            Meet Our Experts
          </span>
          <h2
            className="fw-bold mt-2"
            style={{ fontSize: "2rem", color: "#1a0a00" }}
          >
            Trusted Astrologers
          </h2>
          <p className="text-muted mx-auto mt-2" style={{ maxWidth: 500 }}>
            Each astrologer on our platform goes through rigorous verification
            to ensure authentic and accurate guidance.
          </p>
        </div>
        <div className="row g-4 justify-content-center">
          {team.map((member, i) => (
            <div key={i} className="col-sm-6 col-lg-3">
              <div
                className="rounded-4 p-4 text-center bg-white border h-100"
                style={{ borderColor: "rgba(0,0,0,0.06) !important" }}
              >
                <div className="position-relative d-inline-block mb-3">
                  <div className="rounded-circle border overflow-hidden position-relative" style={{ width: 80, height: 80, borderColor: "#fed7aa", borderWidth: "3px" }}>
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: 22,
                      height: 22,
                      background: "#22c55e",
                      border: "2px solid white",
                    }}
                  >
                    <i
                      className="fa-solid fa-check"
                      style={{ color: "white", fontSize: "8px" }}
                    />
                  </div>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: "#1a0a00" }}>
                  {member.name}
                </h6>
                <p className="small mb-1" style={{ color: "#f97316" }}>
                  {member.role}
                </p>
                <p className="text-muted small mb-2">{member.exp}</p>
                <span
                  className="badge rounded-pill px-3 py-1 small"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    color: "#ea580c",
                  }}
                >
                  {member.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="/our-astrologers"
            className="btn px-5 py-2 rounded-pill fw-bold"
            style={{
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              border: "none",
            }}
          >
            View All Astrologers <i className="fa-solid fa-arrow-right ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExpertSection;
