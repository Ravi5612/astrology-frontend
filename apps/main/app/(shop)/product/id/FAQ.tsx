"use client";

import React, { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="mb-5">
      <h3 className="fw-bold mb-4" style={{ color: "#732882" }}>
        Frequently Asked Questions
      </h3>
      <div className="border rounded-lg overflow-hidden">
        {faqs.map((f, i) => (
          <div key={i} className="border-b last:border-b-0">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium hover:bg-gray-50 transition"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span style={{ color: "#732882" }}>{f.q}</span>
              <i
                className={`fas fa-chevron-${openFaq === i ? "up" : "down"} text-sm text-gray-400`}
              />
            </button>
            {openFaq === i && (
              <div className="px-4 py-3 text-gray-600 bg-gray-50 text-sm">
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
