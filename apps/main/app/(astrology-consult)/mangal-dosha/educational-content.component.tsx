"use client";

import React from "react";
import {
  FaHeartBroken,
  FaChartLine,
  FaHospital,
  FaChevronRight,
  FaUser,
  FaComments,
  FaPhoneAlt,
} from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import WhyChooseUs from "@/components/layout/main/WhyChooseUs";
import CTA from "@/components/layout/main/CTA";

const EducationalContent = () => {
  return (
    <>
      <section className="space-section bg-[#301118] text-white">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="text-3xl font-bold mb-6">
                Effects of Mangal Dosha
              </h2>
              <div className="text-gray-300 space-y-4 leading-relaxed italic">
                <p>
                  In Vedic Astrology, Mars represents drive, ego, and energy.
                  When malefic, it creates Mangal Dosha, potentially causing
                  disharmony in married life if both partners aren&apos;t
                  aligned.
                </p>
                <p>
                  However, various cancellations (Mangal Dosha Bhanga) exist.
                  Our advanced calculator checks these exceptions before giving
                  a final verdict.
                </p>
              </div>
              <button className="btn-link py-3 px-12 mt-8 inline-flex wfc uppercase tracking-widest text-[11px]">
                Consult remedies <FaChevronRight className="ms-2" size={10} />
              </button>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  {
                    icon: <FaHeartBroken />,
                    title: "Marriage",
                    color: "bg-red-500",
                    desc: "Delays or clashes",
                  },
                  {
                    icon: <FaChartLine />,
                    title: "Career",
                    color: "bg-blue-500",
                    desc: "Impulsivity",
                  },
                  {
                    icon: <FaHospital />,
                    title: "Health",
                    color: "bg-green-500",
                    desc: "Energy levels",
                  },
                  {
                    icon: <GiMeditation />,
                    title: "Peace",
                    color: "bg-purple-500",
                    desc: "Restlessness",
                  },
                ].map((effect, i) => (
                  <div key={i} className="col-6">
                    <div className="bg-white p-6 rounded-4 text-center group hover:-translate-y-2 transition-transform h-full">
                      <div
                        className={`w-12 h-12 ${effect.color} rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        {effect.icon}
                      </div>
                      <h4 className="text-black font-bold text-sm mb-1">
                        {effect.title}
                      </h4>
                      <p className="text-[10px] text-gray-600 font-semibold uppercase">
                        {effect.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-section light-back">
        <div className="container">
          <h2 className="title-line mb-12 text-center">
            <span>Talk to Mangal Dosha Experts</span>
          </h2>
          <div className="row g-4">
            {[
              { name: "Pandit Sharma", exp: "21 Years", spec: "Vedic | Dosha" },
              { name: "Acharya Priya", exp: "15 Years", spec: "Numerology" },
              { name: "Dr. Rakesh", exp: "25 Years", spec: "Vedic | Prashna" },
              { name: "Meera Devi", exp: "10 Years", spec: "Tarot Expert" },
            ].map((ast, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="light-card border border-[#fd64102b] p-6 text-center group hover:shadow-2xl transition-all">
                  <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-[#fd641054] group-hover:scale-105 transition-transform">
                    <FaUser className="text-[#fd6410] text-4xl" />
                  </div>
                  <h4 className="text-[#301118] font-bold mb-1">{ast.name}</h4>
                  <p className="text-[#fd6410] text-[10px] font-bold uppercase tracking-widest">
                    {ast.spec}
                  </p>
                  <p className="text-gray-400 text-[11px] mb-3">
                    Exp: {ast.exp}
                  </p>
                  <div className="flex gap-2">
                    <button className="btn-link flex-1 py-2 text-[10px] uppercase shadow-sm">
                      <FaComments className="inline me-1" /> Chat
                    </button>
                    <button className="btn-link flex-1 py-2 text-[10px] uppercase bg-white text-[#301118] border-0 shadow-sm">
                      <FaPhoneAlt className="inline me-1" /> Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="btn-link px-8 py-3 inline-flex wfc border-0 bg-transparent text-[#fd6410] hover:text-[#301118] mx-auto">
              View All Experts <FaChevronRight className="ms-2" size={10} />
            </button>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <CTA />
    </>
  );
};

export default EducationalContent;
