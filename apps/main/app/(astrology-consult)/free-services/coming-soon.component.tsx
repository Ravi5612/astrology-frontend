import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

const ComingSoonSection = () => {
  return (
    <section className="space-section light-back">
      <div className="container">
        <div className="light-card border border-[#fd64102b] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fd64100d] rounded-full blur-3xl -mr-32 -mt-32"></div>

          <div className="bg-[#fd6410] w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto shadow-xl">
            <HiOutlineSparkles className="text-white text-4xl animate-spin-slow" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#301118] mb-4">
            Under Cosmic Alignment
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">
            Expected Reveal: Coming Soon
          </p>

          <p className="text-gray-500 italic max-w-2xl mx-auto mb-12 leading-relaxed">
            Our team is developing free calculators and reports including
            daily panchang, auspicious timings, and basic kundli analysis for
            everyone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-link py-4 px-12 shadow-xl inline-flex items-center gap-3 no-underline"
            >
              <FaArrowLeft size={12} /> Back to Home
            </Link>
            <button className="bg-[#301118] text-white px-12 py-4 rounded-3 text-sm font-bold hover:bg-[#4a1a25] transition-colors border-0">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
