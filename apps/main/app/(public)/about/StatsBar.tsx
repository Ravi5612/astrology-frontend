"use client";

import React from "react";

interface StatItem {
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatItem[];
}

const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  return (
    <section style={{ background: "#fff7f0", borderBottom: "1px solid #ffe8d6" }}>
      <div className="container py-4">
        <div className="row g-3 text-center">
          {stats.map((s, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="py-3">
                <div
                  className="fw-black mb-1"
                  style={{ fontSize: "2rem", color: "#f97316", lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div className="text-muted small fw-semibold">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
